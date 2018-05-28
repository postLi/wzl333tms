import fetch from '../../utils/fetch'

/**
 * 插入角色信息
 * data 要上传的信息
  "menusId": [
    0
  ],
  "remark": "string",
  "roleName": "string",
 "createrId":"string",
 */
export function postRoleInfo(data) {
  return fetch.post('/api-system/system/role/v1/', data).then(res => {
    return res.data ? res.data : {}
  })
}
/**
 * 修改角色信息
 * data 要上传的信息
 *id: 1,
  "menusId": [   //menusId是按钮或菜单的id
    0
  ],
  "remark": "string",
  "roleName": "string",

 */
export function putRoleInfo(data) {
  return fetch.put('/api-system/system/role/v1/', data).then(res => {
    return res.data ? res.data : {}
  })
}
/**
 * 设置角色不可用
 * id 要设置失效的id
 */
export function deleteRoleInfo(id) {
  return fetch.delete('/api-system/system/role/v1/' + id).then(res => {
    return res.data ? res.data : {}
  })
}
/**
 * 根据网点id查询该公司的所有角色信息
 * @param {*} orgid 网点id
 * @param {*} pagesize 获取权限列表的长度
 */
export function getAuthInfo(orgid, roleName, pageNum, pagesize) {
  return fetch.get('/api-system/system/role/v1/', {
    params: {
      orgid,
      roleName: roleName || '',
      pageNum: pageNum || 1,
      pageSize: pagesize || 50
    }
  }).then(res => {
    return res.data ? res.data : {}
  })
}

/**
 * 查询运营管理树-查询
 * @param orgid 新增填0，修改对应id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getauthTreeInfo(role_id) {
  return fetch.get('/api-system/system/menu/v1/authTree/',{
    params: {
      role_id: role_id || 0
    }
  }).then(res => {
    return res.data || []
  })
}

/**
 * 获取指定网点的部门信息
 * @param {*} orgid 网点id
 */
export function getSelectDictInfo(orgid) {
  return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
    params: {
      dictType: 'menu_type',
      orgid
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
    params: {
      dictType: 'department_type',
      dictRemark: '部门类型',
      orgid,
      dictName

    }
  }).then(res => {
    return res.data || []
  })
}
