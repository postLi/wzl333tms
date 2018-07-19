import fetch from '../../utils/fetch'

/**
 /finance/carrierdetail/v1/
 插入承运商对账信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCarrierdetailList(params) {
  return fetch.post('/api-finance/finance/tmsfinancebillcheck/v1/getCarrierDetailList', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**


 /finance/carrierdetail/v1/carrierList
 查询承运商对账分页信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCarrierCarrierList(params) {
  return fetch.post('/tmsfinanceservice/finance/carrierdetail/v1/carrierList', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 /finance/carrierdetail/v1/initialize
 初始化创建客户对账明细页面
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCarrierCreatinitialize(params) {
  return fetch.post('/tmsfinanceservice/finance/carrierdetail/v1/initialize/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}


/**
 http://localhost:7010/tmsfinanceservice/finance/tmsfinancebillcheck/v1/createBillCheckCarInfo?access_token={{access_token}}
 {"orgId": 1, "checkBillCode": "DZ1805210004","payDetailList":[{"arrSendPay":100},{"arrSendPay":10}],"hadPayDetailList":[{"arrSendPay":101},{"arrSendPay":10}]}
 车费创建对账单应付 已付
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCreateBillCheckCarInfo(params) {
  return fetch.post('/tmsfinanceservice/finance/tmsfinancebillcheck/v1/createBillCheckCarInfo', params).then(res => {
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
  return fetch.delete('/api-finance/finance/carrierdetail/v1/' + id )
}



/**

 /finance/carrierdetail/v1/{id}
 根据ID查询承运商对账信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function getCarriercarrierdetail(id) {
  return fetch.get('/tmsfinanceservice/finance/carrierdetail/v1/' + id)
}

/**
 /finance/carrierdetail/v1/{id}
 根据ID修改承运商对账信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function putCarriercarrierdetail(id) {
  return fetch.put('/tmsfinanceservice/finance/carrierdetail/v1/' + id)
}
