import fetch from '../../utils/fetch'

/**
 * order/load/v1/list
 *根据配载类型组织机构查询到货列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export function postArtList(params) {
  return fetch.post('/api-order/order/load/v1/list', params).then(res => {
    return res.data || {}
  })
}

/**
 * order/load/v1/getBatchNo
 * 获得配载批次号
 * @returns {AxiosPromise<any>}
 */
export function getBatchNoId(orgid,loadTypeId) {
  return fetch.get('/api-order/order/load/v1/getBatchNo/?orgId=' + orgid + '&loadTypeId=' + loadTypeId)
}

///order/load/v1/confirmToCar/{id}
// /confirmToCar/{id}
/**
 * order/load/v1/confirmToCar/{id}
 // /confirmToCar/{id}
 * 配载单到车确认(typeId等于49为短驳到车确认，等于54为干线到车确认)
 * Name	Description
 id *
 integer
 (path)
 id

 typeId *
 integer
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function postConfirmToCar(params) {
  return fetch.post('/api-order/order/load/v1/confirmToCar', params).then(res => {
    return res.data || {}
  })
}


/**
 * // 根据配载单ID配载类型取消到车
 * @param id
 * @param loadTypeId
 * @returns {AxiosPromise<any>}
 */
export function postCancelLoad(id,loadTypeId) {
  return fetch.post('/api-order/order/load/v1/cancelLoad/?id=' + id + '&loadTypeId=' + loadTypeId)
}
/**
 * 根据配载单ID配载类型取消入库
 * @param id
 * @param loadTypeId
 * @returns {AxiosPromise<any>}
 */
export function postCancelPut(id,loadTypeId) {
  return fetch.post('/api-order/order/load/v1/cancelPut/?id=' + id + '&loadTypeId=' + loadTypeId)
}
