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
  return fetch.put('/api-order/aitransport/tmsstandardcar/v1/?loadIds=' + loadIds + '&loadTypeId=' + loadTypeId)
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

//智能配载

export function getIntnteSMainInfoList(params) {
  return fetch.get('/api-order/aitransport/tmsstandardcar/v1/', params).then(res => {
    return res.data
  })
}

export function getIntnteInit(params) {
  return fetch.post('/api-order/aitransport/intelligen/v1/init', params).then(res => {
    return res.data
  })
}

export function postIntnteSmartLoad(params) {
  return fetch.post('/api-order/order/load/v1/smartLoad', params)
}
