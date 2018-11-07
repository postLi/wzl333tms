import fetch from '../../utils/fetch'

/**
 * 获取财务日记账汇总列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */

export function postBillRecordList(params) {
	return fetch.post('/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordList/', params).then(res => {
		return res.data
	})
}
/**
 * 财务日记账明细表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function postBillRecordDetailList(params) {
	return fetch.post('/api-finance/finance/tmsfinancebillrecorddetail/v1.3/getBillRecordDetailList/', params).then(res => {
		return res.data
	})
}
/**
 * 记账核销基本信息
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function postVerificationBaseInfo(params) {
	return fetch.post('/api-finance/finance/tmsfinancebillrecord/v1.3/getVerificationBaseInfo/', params).then(res => {
		return res.data
	})
}
/**
 * 财务日记账记收入记支出
 */
export function postAddIncome(params) {
	return fetch.post('/api-finance/finance/tmsfinancebillrecord/v1.3/addIncome/', params).then(res => {
		return res.data
	})
}