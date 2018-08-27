import fecth from '../../utils/fetch'

/**
 * 应收应付汇总表
 */
export function reportSettleRecordTotal (params) {
  return fecth.get('/api-finance/finance/report/v1/FeeAggregation?orgId='+params.orgId+'&startTime='+params.startTime+'&endTime='+params.endTime+'&typeIds='+params.typeIds+'&senderId='+params.senderId).then(res => {
  	return res.data || { list: [], totalCount: 0 }
  })
}