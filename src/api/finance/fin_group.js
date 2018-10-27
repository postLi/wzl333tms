import fetch from '../../utils/fetch'

/**

 /finance/orgdetail/v1/list
 查询网点对账明细分页信息  首页
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postGroupList(params) {
  return fetch.post('/api-finance/finance/orgdetail/v1/list', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 /finance/tmsfinancebillcheck/v1/getOrgDetailList
 查询获取网点对账明细分页信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postGroupDetailList(params) {
  return fetch.post('/api-finance/finance/tmsfinancebillcheck/v1/getOrgDetailList', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 /finance/orgdetail/v1/initialize
 初始化创建网点账明细页面
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postGroupInitialize(params) {
  return fetch.post('/api-finance/finance/orgdetail/v1/initialize/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 /finance/orgdetail/v1/saveOrgDetail
 保存或修改对账
 {"orgId": 1, "checkBillCode": "DZ1805210004","payDetailList":[{"arrSendPay":100},{"arrSendPay":10}],"hadPayDetailList":[{"arrSendPay":101},{"arrSendPay":10}]}
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCreatesaveGroup(params) {
  return fetch.post('/api-finance/finance/orgdetail/v1/saveOrgDetail', params).then(res => {
    return res.data
  })
}

/**
 *
 /finance/carrierdetail/v1/{id}
 根据ID删除承运商对账信息
 * @param id
 * @returns {*}
 */
export function deleteCarrierdetail(id) {
  return fetch.delete('/api-finance/finance/carrierdetail/v1/' + id)
}

/**

 /finance/orgdetail/v1/{id}
 查询详情/修改页面 根据主表checkId查询明细表的所有数据
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function getGroupOrgdetail(id) {
  return fetch.get('/api-finance/finance/orgdetail/v1/' + id)
}

/**

 /finance/carrierdetail/v1/{id}
 根据ID查询承运商对账信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function getCarriercarrierdetail(id) {
  return fetch.get('/api-finance/finance/carrierdetail/v1/' + id)
}

/**
 /finance/carrierdetail/v1/{id}
 根据ID修改承运商对账信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function putCarriercarrierdetail(id) {
  return fetch.put('/api-finance/finance/carrierdetail/v1/' + id)
}
// 备用
export function postCreatesaveCustomerDetail(params) {
  return fetch.post('/api-finance/finance/carrierdetail/v1/saveCarrierDetail', params).then(res => {
    return res.data
  })
}
