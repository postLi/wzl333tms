import fetch from '../../utils/fetch'

/**
 * 异常列表
 * @param {*} params 
 * {"currentPage":1,
		"pageSize":10,
		"vo":{
	}
}
 */
export function PostGetAbnormalList(params) {
  return fetch.post('/api-order/order/abnormal/v1/getAbnormalList', params).then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 根据id查看异常详情
 * @param {*} params 
 * {"currentPage":1,
		"pageSize":10,
		"vo":{
	}
}
 */
export function GetLook(id) {
  return fetch.get('/api-order/order/abnormal/v1/' + id).then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 修改或处理异常
 * @param {*} params 
 * {"id":1,
		"disposeOrgId":7
}
 */
export function PutXiuGai(params) {
  return fetch.put('/api-order/order/abnormal/v1/', params).then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 控货列表
 * @param {*} params 
 * {"currentPage":1,
		"pageSize":10,
		"vo":{
			"startTime":"2018-05-30",
			"shipSn": "45",
			"shipFromOrgid":[5,6]
		}
}
 */
export function PostControlgoods(params) {
  return fetch.post('/api-order/controlgoods/v1/getLists', params).then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })
}

/**
 * 放货
 */

export function PutFh(params) {
  return fetch.put('/api-order/controlgoods/v1/1', params).then(res => {
                // console.log(res);
    return res.data || { list: [], totalCount: 0 }
  })
}