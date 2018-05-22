import fetch from '../../utils/fetch'

/**
 * 根据条件获取系统设置列表
 * @param {object} params 参数列表
========必传参数
{
  "orgid": 0,
  "module ": 0,
  "type": ''
}
module:模块	order:运单设置,base:基础设置
type:	shipNo:运单号规则,cargoNo:货号规则,shipFee:运费合计规则,shipPageFunc:运单页面功能设置,shipPermission:运单权限设置,approvalPocess:审批流程设置,queryShip:查询运单设置
 */
export function getAllSetting(params) {
  return fetch.get('/api-system/system/setting/v1/', params).then(res => {
    return res.data
  })
}
/**
 * 修改系统设置
 * @param {object} info 系统设置信息
{
  "approvalPocess": {
    "controlShipReceipt": "string",
    "shipSignForNotAllowUpdate": "string"
  },
  "cargoNo": {
    "manualInput": "string",
    "orgIdAndShipNoAndNumberOfUnits": "string",
    "shipNoAndNumberOfUnits": "string",
    "systemNumberNotAllowUpdate": "string"
  },
  "module": "string",
  "orgid": 0,
  "queryShip": {
    "onlyQueryOwnOrgShip": "string"
  },
  "shipFee": {
    "brokerageFee": "string",
    "commissionFee": "string",
    "customsFee": "string",
    "deliveryFee": "string",
    "forkliftCharge": "string",
    "goupstairsFee": "string",
    "handlingFee": "string",
    "housingFee": "string",
    "insuranceFee": "string",
    "otherFee": "string",
    "packageFee": "string",
    "pickupFee": "string",
    "productPrice": "string",
    "shipFee": "string",
    "stampTax": "string",
    "taxes": "string"
  },
  "shipNo": {
    "companyNumberAutoIncrementByYMDSign": "string",
    "companyNumberAutoIncrementByYMDValue": "string",
    "companyNumberAutoIncrementSign": "string",
    "companyNumberAutoIncrementValue": "string",
    "manualInput": "string",
    "systemNumberImmutable": "string",
    "waterDigitsSignByTwoYMDWaterSign": "string",
    "waterDigitsSignByTwoYMDWaterValue": "string"
  },
  "shipPageFunc": {
    "fromCityByAdministrativeRegion": "string",
    "notifyCargoRule": "string",
    "shipFieldSign": "string",
    "shipFieldValue": "string",
    "shipTimeRule": "string"
  },
  "shipPermission": {
    "onlyDeleteOwnShip": "string",
    "onlyInvalidOwnShip": "string",
    "onlyUpdateOwnShip": "string",
    "shipFromOrgAllowUpdate": "string",
    "shipTimeAllowUpdate": "string"
  }
}
 */
export function putSetting(info) {
  return fetch.put('/api-system/system/setting/v1/', info)
}
/**
 * 重置指定组织的系统设置
 * @param {number} orgid 组织id
 */
export function putResetSetting(orgid) {
  return fetch.put('/api-system/system/setting/v1/resetSystemSetting', { orgid })
}
