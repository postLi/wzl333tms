import fetch from '../../utils/fetch'
import { getToken } from '@/utils/auth'

/**
 * 钱包服务相关接口
 */

/**
 * 获取交易记录
 * @param {*} data 请求参数
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "companyId": 0,
    "endTime": "string",
    "expenditureChannel": 0,
    "flowNo": "string",
    "id": 0,
    "incomeChannel": 0,
    "outTradeNo": "string",
    "startTime": "string",
    "tradeFee": 0,
    "tradeStatus": 0,
    "tradeTime": "2018-09-19T02:24:21.672Z",
    "tradeType": 0,
    "userId": 0
  }
}
 */
export function getTradeRecord(data) {
  return fetch.post('/tmspluginservice/system/traderecord/v1.1/', data).then(res => {
    return res.data || []
  })
}
/**
 * 获取微信二维码链接
 * @param {*} data 参数
 * fee 支付金额
 * id 交易id
 * companyId 公司id
 */
export function getWeixinPayTwocode(data) {
  return fetch.get('/tmspluginservice/pay/weixin/v1.1/weixin/wx?fee=' + data.fee + '&companyId=' + data.companyId)
  // return '/' + (window.tms_testapiurl || 'api') + '/tmspluginservice/pay/weixin/v1.1/weixin/wx?fee=' + data.fee + '&companyId=' + data.companyId + '&access_token=' + getToken()
}
/**
 * 获取支付宝二维码链接
 * @param {*} data 参数
 * fee 支付金额
 * id 交易id
 * companyId 公司id
 */
export function getAliPayTwocode(data) {
  return fetch.get('/tmspluginservice/common/Pay/v1.1/scanPay/ali?fee=' + data.fee + '&companyId=' + data.companyId)
  // return '/' + (window.tms_testapiurl || 'api') + '/tmspluginservice/common/Pay/v1.1/scanPay/ali?fee=' + data.fee + '&companyId=' + data.companyId + '&access_token=' + getToken()
}

/**
 * 获取交易ID
 */
export function getTradeId() {
  return fetch.get('/tmspluginservice/common/Pay/v1.1/')
}

/**
 * 获取交易结果
 * @param {*} type wx 或者 ali
 * @param {*} id 交易id
 */
export function getTradeResult(type, id) {
  return fetch.get('/tmspluginservice/common/Pay/v1.1/' + id, {
    params: {
      type
    }
  })
}

/**
 * 获取账户余额
 */
export function getMyWallet() {
  return fetch.get('/tmspluginservice/common/Pay/v1.1/findMywallet').then(res => {
    return res.data || 0
  })
}
