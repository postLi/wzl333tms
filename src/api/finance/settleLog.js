import fetch from '../../utils/fetch'

/**************************************
 *             资金流水汇总
 **************************************/
/**
 * 查询资金流水汇总列表
 */
export function postFindLowList(data) {
  return fetch.post('/api-finance/finance/tmsfinancecapitalflow/v1/list/', data).then(res => {
    return res.data
  })
}
/**
 * 查询记收入或支出费用信息
 */
export function getFeeInfo(orgId, paymentsType) {
  return fetch.get('/api-finance/finance/tmsfinancecapitalflow/v1/getFeeInfo?orgId=' + orgId + '&paymentsType=' + paymentsType)
    .then(res => {
      return res.data
    })
}
/**
 * 记收入运单信息
 */
export function getOrderShipList(orgId, incomePayType) {
  return fetch.get('/api-finance/finance/tmsfinancecapitalflow/v1/getOrderShipList?orgId=' + orgId + '&incomePayType =' + incomePayType)
    .then(res => {
      return res.data
    })
}
/**
 * 取消结算
 */
export function postCancelSettlement(data) {
  return fetch.get('/api-finance/finance/tmsfinancecapitalflow/v1/cancelSettlement?flowId=' + data.flowId + '&detailFlowId=' + data.detailFlowId)
}
/**************************************
 *             资金流水明细
 **************************************/
/**
 * 资金流水明细
 */
export function postDetailList (data) {
	return fetch.post('/api-finance/finance/tmsfinancecapitalflowdetail/v1/list/', data).then(res => {
		return res.data
	})
}