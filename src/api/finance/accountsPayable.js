import fetch from '../../utils/fetch'

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