import fetch from '../../utils/fetch'
/**
 * 短信服务相关接口
 */

/**
 * 获取短信包信息
 */
export function getSmspackages() {
  return fetch.get('/api-plugin/system/tmssystemsmspackages/v1/all/').then(res => {
    return res.data || {}
  })
}
/**
 * 查询短信模板内容列表
 * {"currentPage":1,"pageSize":20,"vo":{"orgId":1}}
 */
export function postSmsTemplateLogList(params) {
  return fetch.post('/api-plugin/system/tmssystemsmstemplatelog/v1.1/getSmsTemplateLogList/', params).then(res => {
    return res.data || {}
  })
}