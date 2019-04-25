import fetch from '@/utils/fetch'

/**
 * 异步正常测试接口
 */
export function asynInterface() {
  return fetch.get('/api-system/system/v1/asyn/asynInterface').then(res => {
    return res.data
  })
}
/**
 * 异步异常测试接口
 */
export function asynInterface2() {
  return fetch.get('/api-system/system/v1/asyn/asynInterface2').then(res => {
    return res.data
  })
}
/**
 * 异步进度不变接口
 */
export function asynInterface3() {
  return fetch.get('/api-system/system/v1/asyn/asynInterface3').then(res => {
    return res.data
  })
}
/**
 * 实时查询异步进程
 */
export function asynResultByAsynCode(asynCode) {
  return fetch.get('/api-system/system/v1/asyn/asynResultByAsynCode?asynCode='+asynCode).then(res => {
    return res.data
  })
}