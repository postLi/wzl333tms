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
/**
 * 财务日记账反核销(汇总&明细)
 * 汇总
 * {
	"id":"1060428169581953024",
	"recordDetailId":""
    }
    明细
    {
	"id":"1",
	"recordDetailId":"1"
	}
 */
export function cancelVerification(params) {
	return fetch.post('/api-finance/finance/tmsfinancebillrecord/v1.3/cancelVerification/', params).then(res => {
		return res.data
	})
}
/**
 * 核销方向列表
 * {"orgId":"1"}
 */
export function getVeryficationList(params) {
	return fetch.post('/api-finance/finance/tmsfinanceverification/v1.3/getVeryficationList/', params).then(res => {
		return res.data
	})
}
/**
 * 财务日记账删除（汇总）
 * {
	"id":"1060430041579520000"
	}
 */
export function delBillRecord(params) {
	return fetch.post('/api-finance//finance/tmsfinancebillrecord/v1.3/delBillRecord/', params).then(res => {
		return res.data
	})
}
/**
 * 财务日记账删除（明细）
 * {
	"id":"1060431253750153216",
	"recordId":"1060431253666267136",
	"amount":2355
	}
 */
export function delBillRecordDetail(params) {
	return fetch.post('/api-finance//finance/tmsfinancebillrecorddetail/v1.3/delBillRecordDetail/', params).then(res => {
		return res.data
	})
}
/**
 * 记收入记支出运单或配载列表
 * {"orgId":1,
 * "paymentsType":0,
 * "fiOrderType":0, //财务订单类型 0-运单；1-干线；2-短驳；3-送货
 * "startTime":"2018-08-13 00:00:00",
 * "endTime":"2018-09-12 23:59:59",
 * "autoTotalAmount":200,
 * "feeId":""}
 */
export function getOrderList(params) {
	return fetch.post('/api-finance/finance/tmsfinancebillrecord/v1.3/getOrderList/', params).then(res => {
		return res.data
	})
}
/**
 * 财务科目列表
 */
export function getFinanceSubjects(params) {
	return fetch.post('/api-finance/finance/tmsfinancesubjects/v1.3/getFinanceSubjects/', params).then(res => {
		return res.data
	})
}
/**
 * 根据ID查询财务日记账信息
 */
export function getBillRecordInfo(params) {
	return fetch.post('/api-finance/finance/tmsfinancebillrecord/v1.3/getBillRecordInfo', params).then(res => {
		return res.data
	})
}