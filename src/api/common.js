import fetch from '@/utils/fetch'

/**
 * 获取城市数据
 */
export function getCityInfo(params) {
  return fetch.get('/getcity', {
    params
  }).then(res => {
    return res.data || []
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
let UPLOADPOLICYDATA // 用来缓存上传policy
export function getUploadPolicy() {
  // 后期可添加是否过期的验证
  if (UPLOADPOLICYDATA) {
    return new Promise((resolve) => {
      resolve(UPLOADPOLICYDATA)
    })
  } else {
    return fetch.get('/anfacommonservice/common/oss/v1/policy').then(res => {
      UPLOADPOLICYDATA = res.data || ''
      return res.data || {}
    })
  }
}
