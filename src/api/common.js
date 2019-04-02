import fetch from '@/utils/fetch'
import {
  getToken
} from '@/utils/auth'
import CACHE from '@/utils/cache'
import {
  handleErrorMsg
} from '@/utils/'

/**
 * 获取城市数据
 */
export function getCityInfo(name = '') {
  return fetch.get('/api-order/order/region/v1/name', {
    params: {
      name: name || ''
    }
  }).then(res => {
    return res.data || []
  })
}
/**
 * 根据code值查询其对应的城市及其下属行政区域
 * @param {*} code 行政区code
 */
export function getCityByCode(code = 0) {
  return fetch.get('/api-order/order/region/v1/' + code)
}
/**
 * 获取后台时间
 */
export function getSystemTime() {
  return fetch.get('/api-order/order/v1/orderCreateDate/').then(res => {
    return res.data
  })
}

/**
 * 获取图片上传的policy
 * callback
 *"data": {
        "accessid": "LTAIFj5nQSIxEZ8H",
        "policy": "eyJleHBpcmF0aW9uIjoiMjAxOC0wNS0yMlQxNjowNTowMC4yNThaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXMvIl1dfQ==",
        "signature": "NJ8HhMX9ZpLfNy7ojaA95O0jFxY=",
        "dir": "tms/",
        "host": "http://aflc.oss-cn-shenzhen.aliyuncs.com",
        "expire": "1527005100"
    }
 */
window.UPLOADPOLICYDATA = '' // 用来缓存上传policy
window.UPLOADPOLICYDATA_timer = '' // 加个定时器变量，防止没有引用的定时器被自动回收
/* window.UPLOADPOLICYDATA = {
  'accessid': 'LTAIFj5nQSIxEZ8H',
  'policy': 'eyJleHBpcmF0aW9uIjoiMjAxOC0wOS0xNlQxOToyMDowMS4zMTJaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXMvIl1dfQ==',
  'signature': 'A+ZRKPmw0mFXhNNdd5ycyoH6g9c=',
  'dir': 'tms/',
  'host': 'http://aflc.oss-cn-shenzhen.aliyuncs.com',
  'expire': '1537125601'
} */
export function getUploadPolicy() {
  // 后期可添加是否过期的验证
  if (window.UPLOADPOLICYDATA) {
    return new Promise((resolve) => {
      resolve(window.UPLOADPOLICYDATA)
    })
  } else {
    return fetch.get('/api-common/common/oss/v1/policy').then(res => {
      window.UPLOADPOLICYDATA = res.data || ''
      // 定时清除旧数据
      window.UPLOADPOLICYDATA_timer = setTimeout(() => {
        window.UPLOADPOLICYDATA = ''
      }, 1 * 60 * 1000)
      return window.UPLOADPOLICYDATA
    })
  }
}

/**
 * 获取下拉框类型
 * @param {*} type 下拉类型
 * @param {*} orgid 网点id
 */
export function getSelectType(type = '', orgId, needupdate) {
  // 当标记为未更新，且缓存有数据时，则读取缓存数据
  if (!(CACHE.get(orgId + type + '_update')) && CACHE.get(orgId + type)) {
    return new Promise((resolve) => {
      resolve(CACHE.get(orgId + type))
    })
  } else {
    return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
      params: {
        dictType: type,
        orgId
      }
    }).then(res => {
      CACHE.set(orgId + type, res.data)
      CACHE.set(orgId + type + '_update', false)
      return res.data || []
    })
  }
}

/**
 * 下载常用插件
 */
export function downloadFile(type) {
  let fileUrl = ''
  switch (type) {
    case 'lodop': // lodop 云打印插件
      fileUrl = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/plugin/28tms_win32_cLodop_20180821.exe'
      break
    case 'supcan': // supcan 硕正报表插件
      fileUrl = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/plugin/28tms_win32_supcan_20180821.exe'
      break
  }
  // const fileUrl = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/plugin/tms_web_plugin.rar'
  return fileUrl
}

/**
 * 初始化系统
 */
export function getInitializationCheck() {
  return fetch.get('/api-system/system/setting/v1/InitializationCheck/').then(res => {
    return res.data
  })
}

export function postImportExcel(data) {
  return fetch.post('/api-system/system/excel/v1/importExcel/', data).then(res => {
    return res.data
  })
}
export function postImportExcelThree(data) {
  return fetch.post('/api-finance/finance/tmsfinancesubjects/v1.3/importExcel/', data).then(res => {
    return res.data
  })
}

// /finance/tmsfinancesubjects/v1.3/template
// 获取默认模板
export function getImportExcelInfo() {
  return fetch.get('/api-finance/finance/tmsfinancesubjects/v1.3/template/').then(res => {
    return res.data
  })
}

/**
 * 自定义查询条件接口
 */
export function postQueryLogList(data) {
  return fetch.post('/api-system/system/tmsuserquerycriterialog/v1.1/getQueryLogList', data).then(res => {
    return res.data
  })
}
/**
 * 自定义查询条件新增接口
 */
export function postcreaterQueryCriteriaLog(data) {
  return fetch.post('/api-system/system/tmsuserquerycriterialog/v1.1/createrQueryCriteriaLog', data).then(res => {
    return res.data
  })
}

export function deleteQueryLogListById(id) {
  return fetch.get('/api-system/system/tmsuserquerycriterialog/v1.1/deleteQueryCriteriaLogById?id=' + id)
}

/**
 * 根据网点和模块查询原始表头设置信息
 * @param {*} module 模块名称
 */
export function getOriginTableSetup(module) {
  return fetch.get('/api-order/order/tmscommontitle/v1.1/list/' + module)
}

/**
 * 根据网点和模块查询表头设置信息
 * @param {*} orgId 当前网点id
 * @param {*} module 模块名称
 */
export function getTableSetup(orgId, module) {
  return fetch.get('/api-order/order/tmstitlesetting/v1.1/list', {
    params: {
      orgId,
      module
    }
  })
}
/**
 * 修改表头设置信息
 * @param {*} orgId 当前网点id
 * @param {*} module 模块名称
 * @param {*} data 配置数据
 {
    "companyId": 0,
    "fixed": true,
    "hidden": true,
    "id": 0,
    "lable": "string",
    "orgId": 0,
    "prop": "string",
    "titleModule": "string",
    "titleOrder": 0,
    "userId": 0,
    "width": "string"
  }
 */
export function putChangeTableSetup(orgId, module, data) {
  return fetch.put('/api-order/order/tmstitlesetting/v1.1/?orgId=' + orgId + '&module=' + module, data)
}
/**
 * 返回上传id
 */
export function getUploadId() {
  return fetch.get('/api-plugin/common/qrcode/v1/applyId')
}
/**
 * 返回上传的id对应的信息
 * @param {*} id 上传用的id
 */
export function getUploadIdInfo(id) {
  return fetch.get('/api-plugin/common/qrcode/v1/findByID?id=' + id)
}
/**
 * 生成二维码链接
 * @param {*} url 要生成二维码的链接
 */
export function getTwocodeUrl(url) {
  return '/api-plugin/common/qrcode/v1/qrcode?access_token=' + getToken() + '&url=' + encodeURIComponent(url)
}
/**
 * 保存链接
 * @param {*} id 上传id
 * @param {*} url 要保存的内容
 */
export function postUploadIdInfo(id, url) {
  return fetch.post('/api-plugin/common/qrcode/v1/SaveByID?k=' + id + '&v=' + url)
}
/**
 * 用户个性化设置-查询
 */
export function findAllByUserId() {
  return fetch.get('/api-system/system/personalization/v1/findAllByUserId').then(res => {
    return res.data
  })
}
/**
 * 用户个性化设置-修改
 */
export function updateByUserId(data) {
  return fetch.post('/api-system/system/personalization/v1/updateByUserId', data).then(res => {
    return res.data
  })
}


/**
 * 体验系统_完善资料
 */
export function completeTheInformation(data) {
  return fetch.post('/api-system/system/init/v1/completeTheInformation', data).then(res => {
    return res.data
  })
}