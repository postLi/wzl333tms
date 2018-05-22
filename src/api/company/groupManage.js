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
