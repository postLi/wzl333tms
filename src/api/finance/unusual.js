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
  return fetch.post('/lingchiwing/finance/tmsfinancefeedetail/v1/abnormal/', params).then(res => {
    return res.data || { list: [], total: 0 }
  })
}
// export function postAbnormalUnusual(params) {
//   return fetch.post('/lingchiwing/finance/tmsfinancefeedetail/v1/abnormal/' + params).then(res => {
//     return res.data || { list: [], total: 0 }
//   })
// }
