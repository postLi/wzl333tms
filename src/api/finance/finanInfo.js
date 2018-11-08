import fetch from '../../utils/fetch'
//财务核销方向
//根据网点id查询财务核销方向定义信息

export function postFinFicationlList(params) {
  return fetch.post('/api-finance/finance/tmsfinanceverification/v1.3/list', params).then(res => {
    return res.data || {list: [], totalCount: 0}
  })
}

// /finance/tmsfinanceverification/v1.3/{id}
// 根据ID删除财务核销方向定义信息
export function deleteFinFicationl(id) {
  return fetch.delete('/api-finance/finance/tmsfinanceverification/v1.3/' + id)
}

// /finance/tmsfinanceverification/v1.3/
// 插入财务核销方向定义信息
export function postAddFinFicationl(params) {
  return fetch.post('/api-finance/finance/tmsfinanceverification/v1.3/', params).then(res => {
    return res.data || {}
  })
}

///finance/tmsfinanceverification/v1.3/{id}
// 根据ID修改财务核销方向定义信息
export function putExtFinFicationl(id, params) {
  return fetch.put('/api-finance/finance/tmsfinanceverification/v1.3/' + id, params).then(res => {
    return res.data || {}
  })
}

//财务核销方向
//科目定义

// /finance/tmsfinancesubjects/v1.3/tree
// 生成树菜单
export function getFinSubjectTree(id) {
  return fetch.get('/api-finance/finance/tmsfinancesubjects/v1.3/tree?orgId=' + id)
}

///finance/tmsfinancesubjects/v1.3/{id}
// 根据ID删除财务科目定义信息
export function deleteFinSubject(id) {
  return fetch.delete('/api-finance/finance/tmsfinancesubjects/v1.3/' + id)
}


// /finance/tmsfinancesubjects/v1.3/template
// 获取默认模板

export function getTemplate(data) {
  return fetch.get('/finance/tmsfinancesubjects/v1.3/template/', data).then(res => {
    return res.data
  })
    .catch(error => {
      return error.data
    })
}

//科目定义

// 核销科目
// http://192.168.1.68:7010/api-finance//finance/tmsfinancesubjectsrelation/v1.3/list/?access_token={{access_token}}&orgId=1
export function postFinRsrelationList(params) {
  return fetch.post('/api-finance/finance/tmsfinancesubjectsrelation/v1.3/list/', params).then(res => {
    return res.data || {}
  })
}


// /finance/tmsfinancesubjectsrelation/v1.3/down
// 根据ID和级别查询下拉列表
export function getSelectList(id, type) {
  return fetch.get('/api-finance/finance/tmsfinancesubjectsrelation/v1.3/down', {
    params: {
      id,
      level: type
    }
  })
}

// export function postTradeQuery(orderSerial,type) {
//   return Axios.post(''+swg7+'/api/pay/shipper/common/v1/tradeQuery/'+orderSerial,{
//     payChannel: type
//   })
// }

// 核销科目
