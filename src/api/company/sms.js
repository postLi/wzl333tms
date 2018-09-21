import fetch from '../../utils/fetch'
/**************************************
 *
 *         短信服务相关接口    
 * 
 **************************************/

/**
 * 获取短信包套餐列表
 */
export function getSmspackages() {
  return fetch.get('/api-plugin/system/tmssystemsmspackages/v1/all/').then(res => {
    return res.data || {}
  })
}
/**
 * 钱包余额以及短信包剩余条数
 */
export function getSearchSmsSurplus(params) {
  return fetch.get('/api-plugin/system/tmssystemsmssummary/v1/searchSmsSurplus/', params).then(res => {
    return res.data
  })
}
/**
 * 短信购买功能
 * packageId: 对应的套餐编号Int
 */
export function postBuy(packageId) {
  return fetch.post('/api-plugin/system/tmssystemsmssummary/v1/buy/', {packageId: packageId}).then(res => {
    return res.data
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
/**
 * 短信签名新增
 *  {  "companyId": 2,  "defaultSign": "天天物流"}
 */
export function createSmsSign(params) {
  return fetch.post('/api-plugin/system/tmssystemsmssign/v1.1/createSmsSign/', params).then(res => {
    return res.data || {}
  })
}
/**
 * 发送短信
 *  { "companyId":1,"orgId":1,"remindTargetCode":"receiver","sendNodeCode":"create_ship","phone":"17329986466"}
 */
export function sendSmsByTemplateLog(params) {
  return fetch.post('/api-plugin/system/tmssystemsmstemplatelog/v1.1/sendSmsByTemplateLog/', params).then(res => {
    return res
  })
}
/**
 * 查询短信签名
 *  { "orgId": 1}
 */
export function postSmsSign(orgId) {
  return fetch.post('/api-plugin/system/tmssystemsmssign/v1.1/getSmsSign/', {orgId: orgId}).then(res => {
    return res
  })
}
/**
 * 修改短信签名发送状态
 * { "id": "21", "sendStatus": 1 }
 */
export function udpateSmsTemplateLogStatus(params) {
  return fetch.post('/api-plugin/system/tmssystemsmstemplatelog/v1.1/udpateSmsTemplateLogStatus/', params).then(res => {
    return res.data
  })
}
/**
 * 短信记录
 * {"currentPage":1,"pageSize":20,"vo": { "orgId":1,"sendTargetCode":"shipper","sendNodeCode":"receipt_send"}}
 */
export function postSmsSendLogList(params) {
  return fetch.post('/api-plugin/system/tmssystemsmssendlog/v1.1/getSmsSendLogList/', params).then(res => {
    return res.data
  })
}
/**
 * 查询模板相关默认字段
 *  { "orgId":1,"tmpLogId": "21", "defaultTmpId": "22"}
 */
export function postSmsSetColumnsList(params) {
  return fetch.post('/api-plugin/system/tmssystemsmssetcolumns/v1.1/getSmsSetColumnsList/', params).then(res => {
    return res.data
  })
}
/**
 * 短信默认模板
 *  { "defaultTmpId": 12,"orgId":1}
 */
export function postDefaultSmsTemplate(params) {
  return fetch.post('/api-plugin/system/tmssystemsmstemplate/v1.1/getDefaultSmsTemplate/', params).then(res => {
    return res.data
  })
}
/**
 * 查询短信模板
 *  { "id": 22,"orgId":1}
 */
export function postSmsTemplateLog(params) {
  return fetch.post('/api-plugin/system/tmssystemsmstemplatelog/v1.1/getSmsTemplateLog/', params).then(res => {
    return res.data
  })
}
/**
 * 更新模板内容
 * {
        "id": "14",
        "defaultTmpId": "14",
        "companyId": 1,
        "remindTarget": "发货人",
        "remindTargetCode":"shipper",
        "sendNode": "创建托运单",
        "sendNodeCode": "create_ship",
        "templateContent": "【安发物流】您在(开单网点)托运的(总件数)件(货品名)已成功受理，运单号(运单号)网点客户电话(网点电话)。",
        "templateContentCoded": "",
        "applyStatus": 0,
        "sendStatus": 1
    }
 */
export function udpateSmsTemplateLog(params) {
  return fetch.post('/api-plugin/system/tmssystemsmstemplatelog/v1.1/udpateSmsTemplateLog/', params).then(res => {
    return res.data
  })
}
