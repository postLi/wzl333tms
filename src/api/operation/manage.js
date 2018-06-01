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
// 客户订单列表
