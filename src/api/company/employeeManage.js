import fetch from '../../utils/fetch'

/**
 * 获取指定网点的所有下级节点
 * @param {*} orgid 网点ID
 */
export function getGroupName(orgid) {
  return fetch.get('/api-system/system/org/v1/getChildInfo/' + orgid).then(res => {
    return res.data || []
  })
}
/**
 * 过滤树中的某个节点及其子节点数据
 * @param {*} data 数组结构的树
 */
function getOrgChild(data, id) {
  // 1.遍历数据的第一层
  const res = data.filter(el => {
    if (el.id === id) {
      return true
    }
  })
  // 2.找到则不再遍历子节点
  if (res.length) {
    // 正常情况下，id值唯一
    return res
  } else {
    // 3.找不到数据则寻找遍历子节点
    data.map(el => {
      if (el.children && el.children.length) {
        const find = getOrgChild(el.children, id)
        if (find.length) {
          res.push(find[0])
        }
      }
    })
    // 4.找到数据则返回
    if (res.length) {
      return res
    } else {
      // 5.否则返回空数组
      return []
    }
  }
}
/**
 * 获取所有网点的信息，树形结构
 */
export function getAllOrgInfo(orgid) {
  return fetch.get('/api-system/system/org/v1/tree').then(res => {
    let data = res.data
    if (orgid) {
      data = getOrgChild(data, orgid)
    }
    return data || []
  })
}
/**
 * 获取指定网点的部门信息
 * @param {*} orgid 网点id
 */
export function getDepartmentInfo(orgid) {
  return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
    params: {
      dictType: 'department_type',
      orgid
    }
  }).then(res => {
    return res.data || []
  })
}
/**
 * 获取指定网点的权限信息
 * @param {*} orgid 网点id
 * @param {*} pagesize 获取权限列表的长度
 */
export function getAuthInfo(orgid, pagesize) {
  return fetch.get('/api-system/system/role/v1/', {
    params: {
      orgid,
      roleName: '',
      pageSize: pagesize || 50
    }
  }).then(res => {
    return res.data ? res.data.list : []
  })
}

/**
 * 获取全部用户
 * @param {*} name 姓名
 * @param {*} orgid 组织ID
 */
export function getAllUser(orgid, name, mobilephone, pageSize = 100, pageNum = 1) {
  return fetch.get('/api-system/system/user/v1/', {
    params: { name, orgid, mobilephone, pageSize, pageNum }
  }).then(res => {
    return res.data ? res.data.list : []
  })
}

/**
 * 获取指定组织的信息
 * @param {*} orgid 组织id
 */
export function getOrgInfo(orgid) {
  return Promise.all([getGroupName(orgid), getDepartmentInfo(orgid), getAuthInfo(orgid)])
}
/**
 * 新建员工
 * @param {*} data 要传输的数据
 */
export function postEmployeer(data) {
  return fetch.post('/api-system/system/user/v1/', data)
}
/**
 * 修改员工
 * @param {*} data 要传输的数据
 */
export function putEmployeer(data) {
  return fetch.put('/api-system/system/user/v1/', data)
}
/**
 * 删除员工
 * @param {*} data 要传输的数据
 */
export function deleteEmployeer(id) {
  return fetch.delete('/api-system/system/user/v1/' + id)
}
/**
 * 修改员工的权限信息
 * @param {*} data 员工权限数据
 */
export function putEmployeerAuth(data) {
  return fetch.put('/api-system/system/user/v1/usersAuth', data)
}
