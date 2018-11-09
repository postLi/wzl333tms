import fetch from '../../utils/fetch'

/**
 * 新增线路
 * @param {*} data 请求参数
{
  "tmsSystemTransportRangeDto": {
    "createOrgid": 1,
    "fromOrgid": 1,
    "lowerPrice": 10,
    "priceAbnormal": 20,
    "priceBigabnormal": 30,
    "priceNormal": 10,
    "rangeFromArea": "天河区",
    "rangeFromCity": "广州市",
    "rangeFromContacts": "张三",
    "rangeFromMobile": "13533321545",
    "rangeFromProvince": "广东省",
    "rangeStatus": "1",
    "rangeToArea": "南海区",
    "rangeToCity": "佛山市",
    "rangeToContacts": "李四",
    "rangeToMobile": "15213545612",
    "rangeToProvince": "广东省",
    "toOrgid": 2,
    "transportAging": "1",
    "transportAgingType": "1",
    "transportRemark": "备注"
  },
  "tmsSystemTransportRangePriceDtoList": [
    {
      "endVolume": 10,
      "primeryPrice": 10,
      "startVolume": 0,
      "type": "1"
    }
  ]
}
 */
export function newTransportRangeList(data) {
  return fetch.post('/api-system/system/tmssystemtransportrange/v1/add', data)
}

/**
 * 根据专线id获取详情
 * @param {*} id 专线id
 */
export function TransportRangeInfo(id) {
  return fetch.get('/api-system/system/tmssystemtransportrange/v1/' + id)
}

/**
 * 修改专线信息
 * @param {*} data 请求参数
{
 "tmsSystemTransportRangeDto": {
  	"id": 1059349629042163712,
    "fromOrgid": 1,
    "rangeFromProvince": "广东省",
    "rangeFromCity": "广州市",
    "rangeFromArea": "荔湾区",
    "rangeFromContacts": "张三",
    "rangeFromMobile": "13533321545",
    "toOrgid": 2,
    "rangeToProvince": "广东省",
    "rangeToCity": "佛山市",
    "rangeToArea": "南海区",
    "rangeToContacts": "李四",
    "rangeToMobile": "15213545612",
    "transportAging": "1",
    "transportAgingType": "1",
    "lowerPrice": 10,
    "transportRemark": "备注",
    "createTime": 1541388570000,
    "createOrgid": 1,
    "rangeStatus": "1",
    "priceNormal": 10,
    "priceAbnormal": 20,
    "priceBigabnormal": 30

  },
  "tmsSystemTransportRangePriceDtoList": [
    {
       "id": 1059286553840320512,
        "rangeId": 1059286552825298944,
        "startVolume": 0,
        "endVolume": 10,
        "primeryPrice": 10,
        "type": "1"
    }
  ]
}
 */
export function changeTransportRange(data) {
  return fetch.put('/api-system/system/tmssystemtransportrange/v1/update', data)
}
/**
 * 获取专线列表
 * @param {*} data 请求参数
 {
  "currentPage": 1,
  "pageSize": 10,
  "vo": {
    "fromOrgid": 1,
    "rangeFromCityName": "",
    "rangeToCityName": "",
    "toOrgid": 2
  }
}
 */
export function postLineList(data) {
  return fetch.post('/api-system/system/tmssystemtransportrange/v1/list', data)
}

/**
 * 根据专线id删除对应的专线
 * @param {*} id 专线id
 */
export function deleteLineById(id) {
  return fetch.delete('/api-system/system/tmssystemtransportrange/v1/' + id)
}

/**
 * 根据专线id设置是否启用
 * @param {*} id 专线id
 * @param {*} status 0表示禁用，1表示启用
 */
export function setLineEnable(id, status) {
  return fetch.put('/api-system/system/tmssystemtransportrange/v1/updateStatus/' + id + '/' + status)
}
