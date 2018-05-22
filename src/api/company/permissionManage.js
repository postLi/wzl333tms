import fetch from '../../utils/fetch'

/**
 * 根据网点id查询该公司的所有角色信息
 * @param orgid
 * @param roleName
 * @param pageSize
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getroleInfo(orgid, pageSize, roleName) {
  return fetch.get('/api-system/system/role/v1/',{
    params:{ orgid,pageSize,roleName }
  }).then(res=>{
    return res.data?res.data.list:[]
  })
}
/**
 * 获取指定网点的权限信息
 * @param {*} orgid 网点id
 * @param {*} pagesize 获取权限列表的长度
 */
export function getAuthInfo(orgid,roleName,pageNum, pagesize) {
  return fetch.get('/api-system/system/role/v1/', {
    params: {
      orgid,
      roleName: roleName||'',
      pageNum:pageNum||1,
      pageSize: pagesize || 50
    }
  }).then(res => {
    return res.data ? res.data.list : []
  })
}

/**
 * 查询运营管理树-查询
 * @param orgid 新增填0，修改对应id
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getauthTreeInfo(id) {
  return fetch.get('/api-system/system/menu/v1/authTree/' ,+ id).then(res => {
    return res.data || []
  })
}
