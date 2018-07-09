import fetch from '../../utils/fetch'

/**************************************
 *             运单结算
 **************************************/
/**
 * 根据费用类型查询应付回扣,实际提货费,其他费用支出列表,不传费用类型查询全部
 * 费用类型查询:应付回扣(feeType:8),实际提货费(feeType:10),其他费用支出(feeType:13)
 * 不传费用类型查询全部
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postFindListByFeeType(data) {
  return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/findListByFeeType/', data).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
/**
 * 查询应付中转费列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postFindTransferList(data) {
	return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/findTransferList/', data).then(res =>{
		return res.data || {list: [], totalCount: 0 }
	})
}
/**
 * 查询异常理赔列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postFindAbnormalList(data) {
	return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/findAbnormalList/', data).then(res =>{
		return res.data || {list: [], totalCount: 0 }
	})
}
/**
 * 查询异动费用列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postFindChangeList(data) {
	return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/findChangeList/', data).then(res =>{
		return res.data || {list: [], totalCount: 0 }
	})
}

/**************************************
 *             批次结算
 **************************************/

/**
 * 结算页面列表-汇总
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function postPayListBySummary(data) {
	return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/payListBySummary/', data).then(res =>{
		return res.data || {list: [], totalCount: 0 }
	})
}

/**
 * 结算页面列表-单个费用
 */
export function postPayListByOne(data) {
	return fetch.post('/api-finance/finance/tmsfinancefeepayable/v1/payListByOne/', data).then(res =>{
		return res.data || {list: [], totalCount: 0 }
	})
}