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

/**
 * 打印列表设置
 * "companyId": 1,
   "printType": 0 清单 1运输合同
 */
export function getPrintSetting(data) {
  return fetch.post('/api-system/system/tmssystemsettingprint/v1.4/getSystemSettingPrintList', data)
}

/**
 * 修改打印列表设置
 */
export function putPrintSetting(data) {
  return fetch.put('/api-system/system/tmssystemsettingprint/v1.4/updateSystemSettingPrints', data)
}

/** *********************************************
 *
 *
 *            标签多模板功能
 *
 *            ·获取标签模板接口
 *            ·获取pc端默认标签打印模板接口
 *            ·点击保存新增与修改模板及对应模板信息
 *            ·删除模板
 *
 *
 ***********************************************/

/**
 * 获取标签模板列表接口
 */
export function getLiModel() {
  return fetch.get('/api-order/order/tmscommonmodellib/v1/model').then(res => {
    return res.data
  })
}
/**
 * 获取pc端默认标签打印模板接口
 */
export function getLiSetting() {
  return fetch.get('/api-order/order/printlib/v1/setting').then(res => {
    return res.data
  })
}
/**
 * 点击保存新增与修改模板及对应模板信息
 */
export function postLiUpdate(data) {
  return fetch.post('/api-order/order/tmscommonmodellib/v1/', data).then(res => {
    return res.data
  })
}
/**
 * 删除模板
 */
export function deleteLiModel(id) {
  return fetch.delete('/api-order/order/tmscommonmodellib/v1/' + id).then(res => {
    return res.data
  })
}
/**
 * 查看模板
 */
export function viewLiModel(modelId) {
  return fetch.get('/api-order/order/printlib/v1/setting/' + modelId).then(res => {
    return res.data
  })
}
/**
 * 修改模板列表
 */
export function getUpdateModel(data) {
  return fetch.get('/api-order/order/tmscommonmodellib/v1/update?id='+data.id+'&type='+data.type+ '&companyId='+data.companyId).then(res => {
    return res.data
  })
}