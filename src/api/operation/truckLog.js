import fetch, {
	checkStatus
} from '@/utils/fetch'
/***********************************
 * 运单详情-行车轨迹 中交兴路
 * 
 ***********************************/
/**
 * 实时车辆定位信息
 * 运单号 id
 */
export function realTimeLocation(data) {
	return fetch.post('/api-order/order/load/v1/realTimeLocation/?type=', data).then(res => {
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

/*****************************
 **
 *  导航栏的 轨迹跟踪 追货宝
 *
 * ***************************/
// 轨迹_根据运单id
/**
 * {
	"shipId":"11111",
	"startTime":"2019-02-01 00:00:00",
	"endTime":"2019-02-07 00:00:00"
}
 */
export function trajectoryOrder(data, type = '') {
	return fetch.post('/api-order/order/load/v1/trajectory/?type=' + type, data).then(res => {
		return res.data ? res.data : {}
	})
}

// 轨迹_根据车牌
/**
 * {
	"truckIdNumber":"车牌1",
	"startTime":"2019-02-01 00:00:00",
	"endTime":"2019-02-07 00:00:00"
}
 */
export function trajectoryTruck(data) {
	return fetch.post('/api-order/order/load/v1/trajectoryByTruckIdNumber/', data).then(res => {
		return res.data ? res.data : {}
	})
}

// 定位_根据运单号
/**
 * {
	""shipSn":"19020004"
}
 */
export function realTimeLocationOrder(data) {
	return fetch.post('/api-order/order/load/v1/realTimeLocation/?type=', data).then(res => {
		return res.data ? res.data : {}
	})
}
// 定位_根据车牌
/**
 * {
	"truckIdNumber":"粤455872"
}
 */
export function realTimeLocationByTruckIdNumber(data) {
	return fetch.post('/api-order/order/load/v1/realTimeLocationByTruckIdNumber/', data).then(res => {
		return res.data ? res.data : {}
	})
}
// 监控中心列表
/**
 * {
	"vehicleId":""
}
 */
export function getTerminalLocation(vehicleId) {
	return fetch.get('/api-order/order/load/v1/monitor/?vehicleId=' + vehicleId).then(res => {
		return res.data ? res.data : {}
	})
}

// 获取车辆列表
export function getTruckIdNumbers() {
	return fetch.get('/api-order/order/load/v1/getTruckIdNumber/').then(res => {
		return res.data ? res.data : []
	})
}