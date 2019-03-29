import fetch from '../../utils/fetch'
import CACHE from '@/utils/cache'
import {
  getSelectType
} from '@/api/common'
import {
  getUserInfo
} from '@/utils/auth'
import md5 from 'js-md5'

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
export function getOrgName(id) {
  const data = CACHE.get('orgtree')
  if (data) {
    let find = getOrgChild(data, id)
    if (find.length) {
      find = find[0]
      return find.name
    }
    return id
  } else {
    return id
  }
}
/**
 * 获取所有网点的信息，树形结构
 * 过滤掉无效的网点
 */
export function getAllOrgInfo(orgId, isRefresh) {
  // 判断缓存的列表里能否取到对应的网点列表，如果查找不到，则取最新的数据
  if (!(CACHE.get('orgtree' + '_update')) && CACHE.get('orgtree')) {
    return new Promise((resolve) => {
      resolve(getOrgChild(CACHE.get('orgtree'), orgId))
    })
  } else {
    const cid = getUserInfo().companyId
    // 改为始终拿公司下的网点信息
    return fetch.get('/api-system/system/org/v1/tree/' + cid).then(res => {
      const data = res.data || []
      CACHE.set('orgtree', res.data)
      CACHE.set('orgtree' + '_update', false)
      return getOrgChild(data, orgId)
    })
  }
}
/** 返回全部的数据 */
export function postAllOrgInfo(orgId, isRefresh) {
  return fetch.post('/api-system/system/org/v1/tree/' + orgId).then(res => {
    const data = res.data || []
    return data
  })
}
/**
 * 获取指定网点的部门信息
 * @param {*} orgid 网点id
 */
export function getDepartmentInfo(orgId) {
  return getSelectType('department_type', orgId)
}
/**
 * 获取指定网点的权限信息
 * @param {*} orgid 网点id
 * @param {*} pagesize 获取权限列表的长度
 */
export function getAuthInfo(orgid, pageSize = 50, currentPage = 1) {
  return fetch.post('/api-system/system/role/v1/findAllInfo', {
    currentPage,
    pageSize,
    vo: {
      orgid,
      rolesName: ''
    }
  }).then(res => {
    return res.data || {
      total: 0,
      list: []
    }
  })
}

/**
 * 获取全部用户
 * @param {*} name 姓名
 * @param {*} orgid 组织ID
 */
export function getAllUser(orgid, name, mobilephone, pageSize = 100, currentPage = 1, searchVo) {
  let params = orgid
  if (typeof orgid !== 'object') {
    params = {
      pageSize,
      currentPage,
      vo: {
        name,
        orgid,
        mobilephone
      },
      searchVo
    }
  }
  return fetch.post('/api-system/system/user/v1/findAllInfo', params).then(res => {
    return res.data || {
      total: 0,
      list: []
    }
  })
}
export function newGetAllUser(data) {
  return fetch.post('/api-system/system/user/v1/findAllInfo', data).then(res => {
    return res.data || {
      total: 0,
      list: []
    }
  })
}

/**
 * 获取当前网点的全部用户
 * @param {*} name 姓名
 * @param {*} orgid 组织ID
 */
export function getAllOrgUser(orgid, name, mobilephone, pageSize = 100, currentPage = 1) {
  let params = orgid
  if (typeof orgid !== 'object') {
    params = {
      pageSize,
      currentPage,
      vo: {
        name,
        orgid,
        mobilephone
      }
    }
  }
  return fetch.post('/api-system/system/user/v1/findAllInfoByOrgId', params).then(res => {
    return res.data || {
      total: 0,
      list: []
    }
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
  data.password = md5(data.password)
  return fetch.post('/api-system/system/user/v1/', data)
}
/**
 * 修改员工
 * @param {*} data 要传输的数据
 */
export function putEmployeer(data) {
  data.password = md5(data.password)
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
