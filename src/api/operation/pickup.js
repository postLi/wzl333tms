import fetch from '../../utils/fetch'

/**提货单列表
 * getPostlist
 * @returns {Promise<AxiosResponse<any>>}
 */

export function fetchPostlist(params) {
  return fetch.post('/api-order//order/pickup/v1/list', params).then(res => {
    return res.data || {}
  })
}
