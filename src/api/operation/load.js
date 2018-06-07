import fetch from '../../utils/fetch'
/**
 * 新增配载
 */
/**
 * 获得配载批次号
 */
export function getBatchNo(id) {
  return fetch.get('/api-order/order/load/v1/getBatchNo', {
    params: {
      orgId: id
    }
  })
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
 * 插入配载信息
 */
export function postLoadInfo(data) {
  return fetch.post('/api-order/order/load/v1/', data)
}
