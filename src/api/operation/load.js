import fetch from '../../utils/fetch'
/**
 * 新增配载
 */
/**
 * 获得配载批次号
 */
export function getBatchNo(id, loadTypeId) {
  return fetch.get('/api-order/order/load/v1/getBatchNo/', {
    params: {
      orgId: id,
      loadTypeId: loadTypeId
    }
  })
}
/**
 * 插入配载信息
 */
export function postLoadInfo(data) {
  return fetch.post('/api-order/order/load/v1/', data)
}
/**
 * 修改配载信息
 */
export function putLoadInfo(data) {
  return fetch.put('/api-order/order/load/v1/', data)
}
/**
 * 新增时配载左边的库存列表
 */
export function getSelectAddLoadRepertoryList(id) {
  return fetch.get('/api-order/order/load/v1/selectAddLoadRepertoryList/', {
    params: {
      orgId: id
    }
  })
}
/**
 * 修改时配载左边的库存列表
 */
export function getUpdateRepertoryLeft(orgid, loadid) {
  return fetch.get('/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId=' + orgid + '&loadId=' + loadid)
}
/**
 * 修改时配载右边的库存列表
 */
export function getUpdateRepertoryRight(orgid, loadid) {
  return fetch.get('/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId=' + orgid + '&loadId=' + loadid)
}
/**
 * 配载批次详情列表
 */
export function getSelectLoadDetailList(loadid) {
  return fetch.get('/api-order/order/load/v1/selectLoadDetailList/', {
    params: {
      loadId: loadid
    }
  })
}
/**
 * 查询配载主信息及费用记录列表
 */
export function selectLoadMainInfoList(data) {
  return fetch.post('/api-order/order/load/v1/selectLoadMainInfoList/', data).then(data => {
    return data.list
  })
}
/**
 * 配载发车(批量)
 */
export function putLoadDepart(params) {
  return fetch.put('/api-order/order/load/v1/loadDepart/', {
    params: {
      loadTypeId: params.loadTypeId,
      loadIds: params.loadIds
    }
  })
}
/**
 * 获取公司车辆及其对应司机
 */
export function getTrucK() {
  return fetch.get('/api-system/system/trunk/v1/findCarAndDriver/').then(data => {
    return data
  })
}
/**
 * 获取公司司机及其对应车辆
 */
export function getDrivers() {
  return fetch.get('/api-system/system/trunk/v1/findDriverAndCar/').then(data => {
    return data
  })
}
/**
 * 获取终端
 */
export function getOrdertrailterminal(params) {
  return fetch.post('/api-order/order/tmsordertrailterminal/v1/list', params).then(data => {
    return data.data
  })
}