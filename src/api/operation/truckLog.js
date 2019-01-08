import fetch, {
	checkStatus
} from '@/utils/fetch'
/***********************************
 * 运单详情-行车轨迹
 * 
 ***********************************/
/**
 * 实时车辆定位信息
 * 运单号 id
 */
export function realTimeLocation(id) {
	return fetch.get('/api-order/order/load/v1/realTimeLocation/' + id).then(res => {
		return res.data ? res.data : {}
	})
}

/**
 * 车辆轨迹列表
 */
export function trajectory(data) {
	return fetch.post('/api-order/order/load/v1/trajectory', data).then(res => {
		return res.data ? res.data : {}
	})
}

/**********************************
 * 车辆跟踪
 * 
 **********************************/
/**
 * 车辆轨迹列表
 * { "truckIdNumber":"陕YH0009",
 *  "startTime":"2018-12-18 08:17:14",
 *  "endTime":"2018-12-20 08:17:14"}
 */
export function trajectoryByTruckIdNumber(data) {
	return fetch.post('/api-order/order/load/v1/trajectoryByTruckIdNumber', data).then(res => {
		return res.data ? res.data : {}
	})
}