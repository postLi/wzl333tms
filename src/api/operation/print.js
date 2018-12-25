import fetch from '../../utils/fetch'

/**
 * 根据运单ID打印运单信息
 */
export function getPrintOrderItems(shipId) {
  return fetch.get('/api-order/order/print/v1/printOrderItems/' + shipId).then(res => {
    return res.data
  })
}
/**
 * 根据运单ID打印运单标签信息
 */
export function getPrintLibItems(shipId) {
  return fetch.get('/api-order/order/printlib/v1/printLibItems/' + shipId).then(res => {
    return res.data
  })
}
/**
 * 查询公司运单配置信息
 */
export function getSettingCompanyOrder() {
  return fetch.get('/api-order/order/print/v1/setting').then(res => {
    return res.data
  })
}
/**
 * 修改公司运单配置信息
 */
export function putSettingCompanyOrder(data) {
  return fetch.put('/api-order/order/print/v1/', data).then(res => {
    return res.data
  })
}

/**
 * 查询公司运单标签配置信息
 */
export function getSettingCompanyLi() {
  return fetch.get('/api-order/order/printlib/v1/setting').then(res => {
    return res.data
  })
}
/**
 * 修改公司运单标签配置信息
 */
export function putSettingCompanyLi(data) {
  return fetch.put('/api-order/order/printlib/v1/', data).then(res => {
    return res.data
  })
}
/**
 * 未保存就打印标签
 */
export function getEnableLibSetting() {
  return fetch.get('/api-order/order/printlib/v1/getEnableLibSetting/').then(res => {
    return res.data
  })
}
/**
 * 未保存就打印运单
 */
export function getEnableOrderSetting() {
  return fetch.get('/api-order/order/print/v1/findEnableOrderSettingByCompanyId/').then(res => {
    return res.data
  })
}
/**
 * 获取运单-系统所有打印字段
 */
export function getCommonSettingOrder() {
  return fetch.get('/api-order/order/print//v1/getCommon').then(res => {
    return res.data
  })
}
/**
 * 获取标签-系统所有打印字段
 */
export function getCommonSettingLib() {
  return fetch.get('/api-order/order/libprint/v1/').then(res => {
    return res.data
  })
}