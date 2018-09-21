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
export function postHomedetail(id, data) {
  return fetch.post('/api-system/system/tmshomedetail/v1/home/' + id, data).then(res => {
    return res.data
  })
}

export function getHomeYearDetail() {
  return fetch.get('/api-system/system/tmshomedetail/v1/findCapacityCompany').then(res => {
    return res.data
  })
}
/**
 * ====== 控制台 =======
 */
export function getConsoleData(data) {
  return fetch.post('/api-system/system/tmshomefinance/v1/get/', data)
}

export function getConsoleChartData() {
  return fetch.get('/api-system/system/tmshomefinance/v1/findCapacityorgid')
}
