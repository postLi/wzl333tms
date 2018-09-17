import fetch from '../../utils/fetch'
import CACHE from '@/utils/cache'
import { getSelectType } from '@/api/common'

/**
 * 获取所有网点的信息
 * @returns {AxiosPromise<any>}
 */
export function getAllOrgInfo() {
  return fetch.get('/api-system/system/org/v1/tree')
}

/**
 * 根据组织id获取列表
 */
export function getOrgId(id) {
  return fetch.get('/api-system/system/org/v1/' + id)
}

/**
 * 保存组织机构数据
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function postOrgSaveDate(data) {
  // 网点名称可能变更了，但是父级如果不更新还是会获取到旧的子名称？
  // 统一拿公司网点，子网点部分都直接从最顶级下面拿数据
  CACHE.set('orgtree' + '_update', true)
  return fetch.post('/api-system/system/org/v1/save/', data)
}

/**
 * 修改组织机构数据
 * @param data
 * @returns {AxiosPromise<any>}
 */
export function putOrgData(data) {
  CACHE.set('orgtree' + '_update', true)
  return fetch.put('/api-system/system/org/v1/edit/', data)
}

/**
 * 获取指定网点的部门信息
 * @param {*} orgid 网点id
 */
export function getSelectDictInfo(orgId) {
  return getSelectType('department_type', orgId)
}

/**
 *插入字典信息
 * @param "dictType":"department_type",
 * @param "dictName":"name",
 * @param "dictRemark":"部门类型"
 * @param "orgid":3,
 */
export function postDict(orgid, dictName) {
  return fetch.post('/api-system/system/dict/v1/', {
    dictType: 'department_type',
    dictRemark: '部门类型',
    dict_value: '',
    orgid,
    dictName
  }).then(res => {
    CACHE.set(orgid + 'department_type' + '_update', true)
    return res.data || []
  })
}
/**
 *根据ID设置字典不可用
 * @param "id":"",
 */
export function deletePerManage(id, orgid) {
  return fetch.delete('/api-system/system/dict/v1/' + id).then(res => {
    CACHE.set(orgid + 'department_type' + '_update', true)
    return res
  })
}
/**
 *修改字典信息
 * @param "dictType":"upType",
 * @param "dictName":"upName",
 * @param "dictRemark":"部门类型"
 * @param "orgid":3,
 * @param  "id":16,
 */
export function putDict(orgid, dictName, id) {
  return fetch.put('/api-system/system/dict/v1/', {
    dictType: 'department_type',
    dictRemark: '部门类型',
    id,
    orgid,
    dictName
  }).then(res => {
    CACHE.set(orgid + 'department_type' + '_update', true)
    return res.data || []
  })
}

/**
 * 获取指定网点的网点类型
 * @param {*} orgid 网点id
 * 营业网点 0
 * 分拨中心 1
 */
export function getNetWorkTypeInfo(orgId) {
  return getSelectType('network_type', orgId)
}

/**
 * 获取指定网点的经营类型
 * @param {*} orgid 网点id
 * 自营 0
 * 加盟 1
 */
export function getManageTypeInfo(orgId) {
  return getSelectType('manage_type', orgId)
}
/**
 * 获取指定网点的网点状态
 * @param {*} orgid 网点id
 * 无效   0
 * 有效   1
 */
export function getNetworkStatusInfo(orgId) {
  return getSelectType('network_status', orgId)
}
