import fetch from '../../utils/fetch'

/**
 * 获取回单列表
 * @param {*} params 
 * {
  "currentPage":1,
  "pageSize":10,
  "vo":{
    "pageType":1
  }
}
 */
export function postReceipt(params) {
  return fetch.post('/api-order/order/receipt/v1/list', params).then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })

}

/**
 *修改回单
 * @param {*} params 
 * {
    "status": 100,
    "data": null,
    "text": "fail",
    "errorInfo": null
}
 */
export function postUpdateReceip(id) {
  return fetch.post('/api-order/order/receipt/v1/updateReceip' + id).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })

}
/**
 * 取消回单
 * @param {*} params 
 * 
 */
export function postCancelReceipt(id) {
  return fetch.post('/api-order/order/receipt/v1/updateCancelReceipt' + id).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })

}
