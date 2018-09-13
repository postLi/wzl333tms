import fetch from '@/utils/fetch'

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
export function getUploadPolicy() {
  // 后期可添加是否过期的验证
  if (window.UPLOADPOLICYDATA) {
    return new Promise((resolve) => {
      resolve(window.UPLOADPOLICYDATA)
    })
  } else {
    return fetch.get('/anfacommonservice/common/oss/v1/policy').then(res => {
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
export function getSelectType(type = '', orgId) {
  return fetch.get('/api-system/system/dict/v1/selectDictInfo', {
    params: {
      dictType: type,
      orgId
    }
  }).then(res => {
    return res.data || []
  })
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
    .catch(error => {
      return error.data
    })
}
/**
 * 自定义查询条件接口
 */
export function postQueryLogList(data) {
  return fetch.post('/api-system/system/tmsuserquerycriterialog/v1.1/getQueryLogList', data).then(res => {
    return res.data
  })
    .catch(error => {
      this.$message.error(error.errorInfo || error.text || '未知错误，请重试~')
    })
}
/**
 * 自定义查询条件新增接口
 */
export function postcreaterQueryCriteriaLog(data) {
  return fetch.post('/api-system/system/tmsuserquerycriterialog/v1.1/createrQueryCriteriaLog', data).then(res => {
    return res.data
  })
    .catch(error => {
      this.$message.error(error.errorInfo || error.text || '未知错误，请重试~')
    })
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
