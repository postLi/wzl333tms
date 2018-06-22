import fetch from '../../utils/fetch'
/**
 * order/load/v1/list
 *根据配载类型组织机构查询到货列表
 * @returns {Promise<AxiosResponse<any>>}
 */
export function postSelectLoadMainInfoList(params) {
  return fetch.post('/api-order/order/load/v1/selectLoadMainInfoList', params).then(res => {
    return res.data || {}
  })
}
