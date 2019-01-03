import fetch, {
	checkStatus
} from '@/utils/fetch'

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