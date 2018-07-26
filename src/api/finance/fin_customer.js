import fetch from '../../utils/fetch'

/**
 /finance/customerdetail/v1/
 查询客户对账表分页信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCustomerdetailList(params) {
  return fetch.post('/api-finance/finance/customerdetail/v1/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**对账明细列表
 *http://192.168.1.78:7010/yuwen/finance/tmsfinancebillcheck/v1/getCustomerDetailList?access_token={{access_token
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCFinancebillcheckList(params) {
  return fetch.post('/api-finance/finance/tmsfinancebillcheck/v1/getCustomerDetailList/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**对账明细列表
 *
 /finance/customerdetail/v1/initialize
 初始化客户对账明细
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCFinanceinitialize(params) {
  return fetch.post('/api-finance/finance/customerdetail/v1/initialize/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**对账明细列表
 *

 /finance/customerdetail/v1/saveCustomerDetail
 保存或修改客户对账
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCSaveCustomerDetail(params) {
  return fetch.post('/api-finance/finance/customerdetail/v1/saveCustomerDetail/', params).then(res => {
    return res.data
  })
}
/**
 * http://192.168.1.78:7010/yuwen/finance/customerdetail/v1/1016947217178558464?access_token={{access_token
 修改查看客户对账表信息
 * @param id
 * @returns {*}
 */
export function postCustomerdetail(id) {
  return fetch.post('/api-finance/finance/customerdetail/v1/' + id )
}


/**
 * /finance/tmsfinancebillcheck/v1/updateBillCheckSelective
 1.对账完成
 { "id": "1", "checkStatus": 0}
 2.取消对账
 { "id": "1", "checkStatus": 1}
 对账完成
 * @param id
 * @returns {*}
 */
export function postCompletion(params) {
  return fetch.post('/api-finance/finance/tmsfinancebillcheck/v1/updateBillCheckSelective/' + params )
}
