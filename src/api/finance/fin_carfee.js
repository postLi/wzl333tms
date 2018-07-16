import fetch from '../../utils/fetch'

/**
 /finance/customerdetail/v1/
 查询客户对账表分页信息
 1.短驳 loadTypeId对应值：38
 2.干线 loadTypeId对应值：39
 3.送货 loadTypeId对应值：40
 * @param params
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function postCarfShortDetailList(params) {
  return fetch.post('/tmsfinanceservice/finance/tmsfinancebillcheck/v1/carFeePagelist/', params).then(res => {
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * /finance/tmsfinancebillcheckcardetail/v1/{id}
 根据ID删除财务车费对账信息
 * @param id
 * @returns {*}
 */
export function deleteCarShort(id) {
  return fetch.delete('/api-finance/finance/tmsfinancebillcheckcardetail/v1/' + id )
}
