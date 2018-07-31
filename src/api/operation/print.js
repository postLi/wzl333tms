import fetch from '../../utils/fetch'

/**
 * 根据运单ID打印信息
 */
export function getPrintOrderItems(shipId) {
  return fetch.get('/api-order/order/print/v1/printOrderItems/' + shipId).then(data => {
  	return res.data
  })
}
