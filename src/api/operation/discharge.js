import fetch, {
	checkStatus
} from '@/utils/fetch'
/**********************************
 *途径卸货
 * 
 **********************************/

/**
 * 卸货列表查询
 * 
 */
export function unloadList(data) {
	return fetch.post('/api-order/order/load/v1/unloadList', data).then(res => {
		return res.data ? res.data : {}
	})
}
/**
 * 配载批次详情
 * 
 */
export function selectLoadDetailList(data) {
	return fetch.get('/api-order/order/load/v1/selectLoadDetailList?loadId=' + data.loadId + '&sortSign=' + data.sortSign).then(res => {
		return res.data ? res.data : {}
	})
}
/**
 * 配载批次主要信息及费用明细
 */
export function selectLoadMainInfoList(data) {
	return fetch.post('/api-order/order/load/v1/selectLoadMainInfoList', data).then(res => {
		return res.data ? res.data : {}
	})
}
/**
 * 卸货
 */
export function unload(data) {
	return fetch.post('/api-order/order/load/v1/unload', data).then(res => {
		return res.data ? res.data : {}
	})
}
/**
 * 取消卸货
 */
export function cancelUnload(data) {
	return fetch.post('/api-order/order/load/v1/cancelUnload', data).then(res => {
		return res.data ? res.data : {}
	})
}