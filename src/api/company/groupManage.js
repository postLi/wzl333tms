import fetch from '../../utils/fetch'

/**
 * 获取所有网点的信息
 */
export function getAllOrgInfo() {
  return fetch.get('/api-system/system/org/v1/tree')
}
