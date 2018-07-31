import fetch from '../../utils/fetch'

/**
 * 根据运单ID打印信息
 */
export function getPrintOrderItems(shipId) {
  return fetch.get('/api-order/order/print/v1/printOrderItems/' + shipId).then(res => {
  	return res.data
  })
}
/**
 * 根据运单ID打印运单标签信息
 */
export function getPrintLibItems(shipId) {
  return fetch.get('/api-order/order/printlib/v1/printLibItems/' + shipId).then(res => {
  	return res.data
  })
}