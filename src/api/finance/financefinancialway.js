import fetch from '../../utils/fetch'

/**
 * /finance/tmsfinancefinancialway/v1/list
 查询收支方式管理分页信息
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postTmsFfinancialwayList(params) {
  return fetch.post('/api-finance/finance/tmsfinancefinancialway/v1/list/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}
