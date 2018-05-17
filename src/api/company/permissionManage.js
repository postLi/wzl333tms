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
    params:{orgid,roleName,pageSize}
  }).then(res=>{
    return res.data?res.data.list:[]
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
 * 删除员工
 * @param {*} data 要传输的数据
 */
export function deleteEmployeer(id) {
  return fetch.delete('/api-system/system/user/v1/' + id)
}
