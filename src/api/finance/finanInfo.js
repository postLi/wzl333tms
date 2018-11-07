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
