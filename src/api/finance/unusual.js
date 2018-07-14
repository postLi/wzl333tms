import fetch from '../../utils/fetch'

/**
 * 获取异动费用列表
 * @param {*} params
 * {
	"currentPage":1,
	"pageSize":10,
	"vo":{
		"pageType":1
	}
}
 */
export function postAbnormalUnusual(params) {
  return fetch.post('/api-finance/finance/tmsfinancefeedetail/v1/abnormal/', params).then(res => {
    return res.data || { list: [], total: 0 }
  })
}
/**
 * 异动登记
 */
export function postInsertAbnormal(params) {
  return fetch.post('/api-finance/finance/tmsfinancefeedetail/v1/insertAbnormal/', params).then(res => {
    return res.data || { list: [], total: 0 }
  })
}
