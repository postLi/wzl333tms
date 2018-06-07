import fetch from '../../utils/fetch'

/**客户订单列表
 * getPostlist
 * @returns {Promise<AxiosResponse<any>>}
 */

export function getPostlist(params) {
  return fetch.post('/api-order/order/pre/v1/list', params).then(res => {
    return res.data || {}
  })
}
/**
 * 根据id查询订单
 * @param id
 */
export function getSearchOrder(id) {
  return fetch.get('/api-order/order/pre/v1/'+id)
}

/**
 * 拒绝按钮
 * @param ids
 * @returns {AxiosPromise<any>}
 */
export function putRefuse(ids) {
  return fetch.put('/api-order/order/pre/v1/refuse/'+ids)
}

/**
 * 作废
 * @param ids
 * @returns {AxiosPromise<any>}
 */
export function deletebatchDelete(ids) {
  return fetch.put('/api-order/order/pre/v1/refuse/'+ids)
}

/**
 * 插入客户订单
 * @param params
 * {
  "tmsOrderCargoList": [{
    "cargoName": "牙刷"
  }, {
    "cargoName": "牙膏"
  }],
  "customerList": [{
    "customerName": "安发",
    "customerType":1
  }, {
    "customerName": "前端",
    "customerType":2
  }],
  "tmsOrderPre":{"orderSn":"123213"}

}
 */
export function postAddOrder(params) {
  return fetch.post('/api-order/order/pre/v1/', params).then(res => {
    return res.data || {}
  })
}

/**
 * 修改客户订单
 *{
  "tmsOrderCargoList": [{
  	"id": 1,
    "cargoName": "牙刷"
  }],
  "customerList": [{
  	"customerId": 1,
    "customerName": "安发",
    "customerType": 1
  }, {
  	"customerId": 1,
    "customerName": "前端",
    "customerType": 2
  }],
  "tmsOrderPre":{
  	"id":1,
  	"orderSn":"123213"
  }
}
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */

export function postModifyOrder(params) {
  return fetch.post('/api-order/order/pre/v1', params).then(res => {
    return res.data || {}
  })
}
