import fetch from '@/utils/fetch'
import {
  resolve
} from 'url'
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

/**
 * 数据控制台
 */
export function getConsoleData2(data) {
  return fetch.post('/api-system/system/tmshomeload/v1/', data)
  // return new Promise(resolve => {
  //   resolve({
  //     errorInfo: null,
  //     status: 200,
  //     text: '请求成功',
  //     data: []
  //   })
  // })
}

export function getConsoleChartData2(data) {
  return fetch.post('/api-system/system/tmshomeload/v1/list', data)

  // const city = ['北京', '广州', '上海', '深圳', '杭州']
  // const mdata = []
  // let rn = parseInt(Math.random() * city.length) + 1
  // while (rn--) {
  //   mdata.push({
  //     amount: parseInt(1000 * Math.random()),
  //     amountVloume: parseInt(3000 * Math.random()),
  //     amountWeight: parseInt(2000 * Math.random()),
  //     dutyOrgId: null,
  //     shipToCityName: city[rn]
  //   })
  // }
  // return new Promise(resolve => {
  //   resolve({
  //     errorInfo: null,
  //     status: 200,
  //     text: '请求成功',
  //     data: mdata
  //   })
  // })
}