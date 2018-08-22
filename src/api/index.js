import fetch from '@/utils/fetch'
/**
 * 请求的参数
 * {
	"nowStartTime":"2018-08-01 00:00:00",
	"nowEndTime":"2018-08-22 00:00:00",
	"pastStartTime":"2018-07-01 00:00:00",
	"pastEndTime":"2018-07-31 00:00:00"
}
 * @param {*} params
 */
export function postHomedetail(id) {
  return fetch.post('/lingchiwing/system/tmshomedetail/v1/home/1', id).then(res => {
    return res.data || {}
  })
}
