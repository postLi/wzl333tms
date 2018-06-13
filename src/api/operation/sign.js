import fetch from '../../utils/fetch'
/**
 * 自提签收列表
 * @returns {Promise<AxiosResponse<any>>}
 * {
	"currentPage":1,
	"pageSize":10000,
	"vo":{
	}
}
*/
export function postPickuplist(params) {
  return fetch.post('/api-order/order/sign/v1/pickupList', params).then(res => {
    return res.data || {}
  })
}
/**
 * 送货签收列表
 * {
	"currentPage":1,
	"pageSize":10000,
	"vo":{
	}
}
 */
export function postDeliveryList(params) {
  return fetch.post('/api-order/order/sign/v1/deliveryList', params).then(res => {
    return res.data || {}
  })
}

/**
 * 中转签收列表
 * {
	"currentPage":1,
	"pageSize":10000,
	"vo":{	
	}
}
 */
export function postTransferList(params) {
  return fetch.post('/api-order/order/sign/v1/transferList', params).then(res => {
    return res.data || {}
  })
}