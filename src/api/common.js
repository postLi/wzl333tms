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
