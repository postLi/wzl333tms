import fecth from '../../utils/fetch'

/**
 * 分页查询库存列表
 */
export function postAllOrderRepertory (params) {
  return fecth.post('/api-order/order/repertory/v1/list', params).then(res => {
  	return res.data || { list: [], totalCount: 0 }
  })
}