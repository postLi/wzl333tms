import fetch from '../../utils/fetch'
/**
 * 短信服务相关接口
 */

/**
 * 获取短信包信息
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function getSmspackages(params) {
  return fetch.get('/api-plugin/system/tmssystemsmspackages/v1/all/').then(res => {
    return res.data || {}
  })
}