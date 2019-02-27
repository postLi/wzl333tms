import fecth from '../../utils/fetch'

/**
 * 应收应付汇总表
 */
export function reportSettleRecordTotal(params) {
  return fecth.get('/api-finance/finance/report/v1/FeeAggregation?orgId=' + params.orgId + '&startTime=' + params.startTime + '&endTime=' + params.endTime + '&typeIds=' + params.typeIds + '&senderId=' + params.senderId).then(res => {
    return res.data || {
      list: [],
      totalCount: 0
    }
  })
}
/**
 * 营业额日报表
 */
export function reportTurnoverDaily(params) {
  return fecth.get('/api-finance/finance/report/v1/dateReport?currentPage=' + params.currentPage +
      '&pageSize=' + params.pageSize + '&createTimeStart=' + params.createTimeStart +
      '&createTimeEnd=' + params.createTimeEnd + '&shipFromOrgid=' + params.shipFromOrgid +
      '&senderCustomerName=' + params.senderCustomerName + '&shipToOrgid=' + params.shipToOrgid +
      '&shipToCityName=' + params.shipToCityName + '&shipFromCityName=' + params.shipFromCityName)
    .then(res => {
      return res.data
    })
}
/**
 * 营业额汇总表
 */
export function reportTurnoverTotal(params) {
  return fecth.get('/api-finance/finance/report/v1/turnoverReport?createTimeStart=' + params.createTimeStart + '&createTimeEnd=' + params.createTimeEnd + '&shipFromOrgid=' + params.shipFromOrgid)
    .then(res => {
      return res.data
    })
}
/**
 * 营运统计分析
 */
export function reportOperation(params) {
  return fecth.get('/api-finance/finance/report/v1/findOperationReport?startTime=' + params.startTime + '&endTime=' + params.endTime + '&orgId=' + params.orgId + '&selectType=' + params.selectType + '&shipToCityName=' + params.shipToCityName + '&businessType=' + params.businessType)
    .then(res => {
      return res.data
    })
}
/**
 * 收入统计
 */
export function reportIncomeTotal(params) {
  return fecth.get('/api-finance/finance/report/v1/findDetail?startCreatTime=' + params.startCreatTime + '&endCreatTime=' + params.endCreatTime + '&shipFromOrgid=' + params.shipFromOrgid)
    .then(res => {
      return res.data
    })
}