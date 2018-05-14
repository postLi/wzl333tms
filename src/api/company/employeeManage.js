import fetch from '../../utils/fetch'

/**
 *
 * @param {*} params 获取网点列表信息
 */
export function getGroupName(gid) {
  return fetch.get('/api-system/system/org/v1/getChildInfo/' + gid).then(res => {
    return res.data
  })
}

function getGroupInfo(params) {
  return new Promise(resolve => {
    resolve([{
      name: '广州网点',
      key: '1'
    }, {
      name: '柳州网点',
      key: '2'
    }, {
      name: '雷州网点',
      key: '3'
    }, {
      name: '西州网点',
      key: '4'
    }])
  })
}

export function getDepartmentInfo(orgid) {
  return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
    params: {
      dictType: 'department_type',
      orgid
    }
  }).then(res => {
    return res.data
  })
}

export function getAuthInfo(orgid, pagesize) {
  return fetch.get('/api-system/system/role/v1/', {
    params: {
      orgid,
      roleName: '',
      pageSize: pagesize || 50
    }
  }).then(res => {
    return res.data.list
  })
}

/**
 * 获取全部用户
 * @param {*} username 用户名
 * @param {*} orgid 组织ID
 */
export function getAllUser(orgid, username, mobilephone) {
  return fetch.get('/tmssystemservice/system/user/v1/', {
    params: { username, orgid, mobilephone }
  }).then(res => {
    return res.data.list
  })
}

/**
 * 获取指定组织的信息
 * @param {*} orgid 组织id
 */
export function getOrgInfo(orgid) {
  return Promise.all([getGroupInfo(), getDepartmentInfo(), getAuthInfo()])
}

export function postEmployeer(data) {
  return fetch.post()
}
