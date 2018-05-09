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

// 特殊字段判断
export function isEmpty(o) {
  if (o === undefined) {
    return
  }
  if (o == null) {
    return
  }
  return o
}

// 存放数据列表
export function objStory( label , name ) {
  this.label = label
  this.name = name
}
