import fetch from '../../utils/fetch'

/**
 * 获取所有网点的信息
 */
export function getAllOrgInfo() {
  return fetch.get('/api-system/system/org/v1/tree')
}

/**
 * 根据组织id获取列表
 */
export function getOrgId(id) {
  return fetch.get('/api-system/system/org/v1/'+id)
}

/**
 * 保存组织机构数据
 */
export function postOrgSaveDate(data) {
  return fetch.post('/api-system/system/org/v1/save/', data)
}
/**
 * 修改组织机构数据
 */
export function putOrgData(data) {
  return fetch.put('/api-system/system/org/v1/edit/', data)
}

/**
 * 获取指定网点的部门信息
 * @param {*} orgid 网点id
 */
export function getSelectDictInfo(orgId) {
  return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
    params: {
      dictType: 'department_type',
      orgId
    }
  }).then(res => {
    return res.data || []
  })
}

/**
 *插入字典信息
 * @param "dictType":"department_type",
 * @param "dictName":"name",
 * @param "dictRemark":"部门类型"
 * @param "orgid":3,
 */
export function postDict(orgid,dictName) {
  return fetch.post('/api-system/system/dict/v1/', {

      dictType: 'department_type',
      dictRemark: '部门类型',
      dict_value: '',
      orgid,
      dictName
  }).then(res => {
    return res.data || []
  })
}
/**
 *根据ID设置字典不可用
 * @param "id":"",
 */
export function deletePerManage(id) {
  return fetch.delete('/api-system/system/dict/v1/' + id)
}
/**
 *修改字典信息
 * @param "dictType":"upType",
 * @param "dictName":"upName",
 * @param "dictRemark":"部门类型"
 * @param "orgid":3,
 * @param  "id":16,
 */
export function putDict(orgid,dictName,id) {
  return fetch.put('/api-system/system/dict/v1/', {
    dictType: 'department_type',
    dictRemark: '部门类型',
    id,
    orgid,
    dictName
  }).then(res => {
    return res.data || []
  })
}
