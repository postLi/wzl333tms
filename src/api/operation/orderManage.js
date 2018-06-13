import fetch from '@/utils/fetch'

export default {
  /**
   * 根据参数获取所有运单
   * @param {object} param 参数对象
{
  "currentPage": 0,
  "pageSize": 0,
  "vo": {
    "agencyFund": 0, 代收货款
    "amountFee": 0, 件数单价
    "brokerageFee": 0, 回扣
    "cargoAmount": 0, 货物件数
    "cargoName": "string", 货物名称
    "cargoPack": "string", 货物包装
    "cargoVolume": 0, 货物体积 0.000
    "cargoWeight": 0, 货物重量 0.00
    "commissionFee": 0, 代收手续费
    "createTime": "2018-06-04T06:11:47.429Z", 录入时间
    "customsFee": 0, 报关费
    "deliveryFee": 0, 送货费
    "description": "string", 品种规格
    "endTime": "string",
    "forkliftFee": 0, 叉车费
    "fromOrgName": "string", 来源组织名称
    "goupstairsFee": 0, 上楼费
    "handlingFee": 0, 装卸费
    "housingFee": 0, 入仓费
    "id": 0,
    "insuranceFee": 0, 保险费
    "name": "string",
    "new_value": "string",
    "old_value": "string",
    "orgAllId": [
      "string"
    ],
    "otherfeeIn": 0, 其他费收入
    "otherfeeOut": 0, 其他费支出
    "packageFee": 0, 包装费
    "pickupFee": 0, 提货费
    "productPrice": 0, 声明价值
    "realityhandlingFee": 0, 实际装卸费
    "receiverCompanyName": "string",
    "receiverCustomerMobile": "string",
    "receiverCustomerName": "string",
    "receiverCustomerUnit": "string",
    "senderCompanyName": "string",
    "senderCustomerMobile": "string",
    "senderCustomerName": "string",
    "senderCustomerUnit": "string",
    "shipArrivepayFee": 0, 到付
    "shipBusinessType": 0, 业务类型
    "shipBusinessTypeName": "string", 业务类型名称
    "shipCustomerNumber": "string", 客户单号
    "shipDelete": 0, 1、正常 2、已删除  3、已作废'
    "shipDeliveryMethod": 0, 送货方式
    "shipDeliveryMethodName": "string", 送货方式名称
    "shipDriverName": "string", 提货司机
    "shipEffective": 0, 时效：1,普通，2,加急
    "shipEffectiveName": "string", 时效名称
    "shipFee": 0, 运费
    "shipFromCityCode": "string", 出发城市code
    "shipFromOrgid": 0, 开单网点
    "shipGoodsSn": "string", 货号
    "shipIdentifying": "string",
    "shipIsAbnormal": 0, 是否有异常 - 0:否 1：是
    "shipIsControll": 0, 运单是否控货- 0:否 1：是
    "shipIsSeparate": 0, 是否有拆单 - 0:否 1：是
    "shipIsTransfer": 0, 是否有中转 - 0:否 1：是
    "shipIsUpdate": 0, 运单是否改单- 0:否 1：是
    "shipMonthpayFee": 0, 月结
    "shipNowpayFee": 0, 现付
    "shipOther": "string", 其他事项
    "shipPayWay": 0, 付款方式
    "shipPayWayName": "string", 付款方式名称
    "shipPrintLib": 0, 打印标签
    "shipReceiptNum": 0, 回单份数
    "shipReceiptRequire": 0, 回单要求
    "shipReceiptRequireName": "string", 回单要求名称
    "shipReceiptSn": "string",回单号
    "shipReceiptpayFee": 0, 回单付
    "shipReceiverId": 0, 收货方
    "shipRemarks": "string", 备注
    "shipSenderId": 0, 发货方
    "shipShippingType": 0, 运输方式
    "shipShippingTypeName": "string", 运输方式名称
    "shipSn": "string", 运单号
    "shipStatus": 0, 运单状态
    "shipStatusName": "string", 运单状态名称
    "shipToCityCode": "string", 到达城市code
    "shipToOrgid": 0, 目的网点
    "shipTotalFee": 0, 运费合计
    "shipTruckIdNumber": "string", 提货车号
    "shipUserid": 0, 制单员
    "stampTax": 0, 印花税
    "startTime": "string",
    "taxRate": 0, 税率
    "taxes": 0, 税金
    "toOrgName": "string",
    "updateContent": "string",
    "update_time": "string",
    "userName": "string",
    "volumeFee": "string", 体积单价
    "weightFee": "string" 重量单价
  }
}
   */
  getAllShip(param) {
    return fetch.post('/api-order/order/v1/findAllShip', param).then(res => {
      return res.data ? res.data : { total: 0, list: [] }
    })
  },
  /**
   * 根据运单号或货号查询 全匹配
   * @param {*} param 查询参数
   */
  getFindByShipSnOrGoodSn(tmsOrderShipQuery) {
    return fetch.post('/api-order/order/v1/findByShipSnOrGoodSn', tmsOrderShipQuery)
  },
  /**
   * 创建运单
   * @param {*} data 运单数据
   * 同修改
   */
  postNewOrder(data) {
    return fetch.post('/api-order/order/v1/', data)
  },
  /**
   * 修改开单对象
   * @param {*} data 运单数据
  {
  "customerList": [
    {
      "bankCardNumber": "string",
      "bankName": "string",
      "companyName": "string",
      "companyType": 0,
      "customerId": 0,
      "customerMobile": "string",
      "customerName": "string",
      "customerNum": "string",
      "customerType": 0,
      "customerUnit": "string",
      "detailedAddress": "string",
      "fixPhone": "string",
      "idCardPositive": "string",
      "idCardVerso": "string",
      "idcard": "string",
      "legalPersonname": "string",
      "licensePicture": "string",
      "openBank": "string",
      "orgid": 0,
      "vipNum": "string"
    }
  ],
  "tmsOrderCargoList": [
    {
      "agencyFund": 0,
      "brokerageFee": 0,
      "cargoAmount": 0,
      "cargoName": "string",
      "cargoPack": "string",
      "cargoRemark": "string",
      "cargoVolume": 0,
      "cargoWeight": 0,
      "commissionFee": 0,
      "createTime": "2018-06-04T07:08:52.754Z",
      "customsFee": 0,
      "deliveryFee": 0,
      "description": "string",
      "forkliftFee": 0,
      "goupstairsFee": 0,
      "handlingFee": 0,
      "housingFee": 0,
      "id": 0,
      "insuranceFee": 0,
      "orderId": 0,
      "orgid": 0,
      "otherfeeIn": 0,
      "otherfeeOut": 0,
      "packageFee": 0,
      "pickupFee": 0,
      "productPrice": 0,
      "realityhandlingFee": 0,
      "shipFee": 0,
      "shipId": 0,
      "stampTax": 0,
      "taxRate": 0,
      "taxes": 0,
      "volumeFee": 0,
      "weightFee": 0
    }
  ],
  "tmsOrderPre": {
    "createTime": "2018-06-04T07:08:52.755Z",
    "id": 0,
    "orderAgencyFund": 0,
    "orderEffective": 0,
    "orderFromCityCode": "string",
    "orderFromOrgid": 0,
    "orderPayWay": 0,
    "orderPickupMethod": 0,
    "orderProcedureFee": 0,
    "orderReceiverId": 0,
    "orderRemarks": "string",
    "orderSenderId": 0,
    "orderSn": "string",
    "orderStatus": 0,
    "orderToCityCode": "string",
    "orderToOrgid": 0,
    "orderTotalFee": 0,
    "orderType": 0,
    "refuseReason": "string",
    "shipId": 0
  },
  "tmsOrderShip": {
    "createTime": "2018-06-04T07:08:52.755Z",
    "id": 0,
    "shipArrivepayFee": 0,
    "shipBusinessType": 0,
    "shipCustomerNumber": "string",
    "shipDelete": 0,
    "shipDeliveryMethod": 0,
    "shipDriverName": "string",
    "shipEffective": 0,
    "shipFormCityName": "string",
    "shipFromCityCode": "string",
    "shipFromOrgid": 0,
    "shipGoodsSn": "string",
    "shipIsAbnormal": 0,
    "shipIsControll": 0,
    "shipIsSeparate": 0,
    "shipIsTransfer": 0,
    "shipIsUpdate": 0,
    "shipMonthpayFee": 0,
    "shipNowpayFee": 0,
    "shipOther": "string",
    "shipPayWay": 0,
    "shipPrintLib": 0,
    "shipReceiptNum": 0,
    "shipReceiptRequire": 0,
    "shipReceiptSn": "string",
    "shipReceiptpayFee": 0,
    "shipReceiverId": 0,
    "shipRemarks": "string",
    "shipSenderId": 0,
    "shipShippingType": 0,
    "shipSn": "string",
    "shipStatus": 0,
    "shipToCityCode": "string",
    "shipToCityName": "string",
    "shipToOrgid": 0,
    "shipTotalFee": 0,
    "shipTruckIdNumber": "string",
    "shipUserid": 0
  },
  "tmsOrderTransfer": {
    "arrivalMobile": "string",
    "carrierId": 0,
    "carrierMobile": "string",
    "codService": 0,
    "createTime": "2018-06-04T07:08:52.755Z",
    "deliveryExpense": 0,
    "id": 0,
    "oddNumbers": "string",
    "paymentId": 0,
    "remark": "string",
    "shipId": 0,
    "totalCost": 0,
    "transferCharge": 0,
    "transferTime": "2018-06-04T07:08:52.755Z",
    "updateTime": "2018-06-04T07:08:52.755Z"
  }
}
   */
  putChangeOrder(data) {
    return fetch.put('/api-order/order/v1/', data)
  },
  /**
   * 查询开单对象
   * @param {*} id 运单id
   */
  getOrderInfoById(id) {
    return fetch.get('/api-order/order/v1/' + id)
  },
  /**
   * 删除运单
   * @param {*} id 运单id
   */
  deleteOrderInfoById(id) {
    return fetch.delete('/api-order/order/v1/' + id + '?type=2')
  },
  /**
   * 作废运单
   * @param {*} id 运单id
   */
  deleteCancleOrderById(id) {
    return fetch.delete('/api-order/order/v1/' + id + '?type=3')
  },
  /**
   * 根据系统设置获取货号
{
  "tmsOrderShip":{
    "shipSn":"20189635142"
  },
  "tmsOrderCargoList":[
    {
      "cargoAmount": 2
    },
    {
      "cargoAmount": 4
    }
  ]
}
   */
  postGenerateGoodsSn(param) {
    return fetch.post('/api-order/order/v1/generateGoodsSn', param)
  },
  /**
   * 自动获取运单号
   * @param {*} orgid 组织id
   */
  getShipSn(orgid) {
    return fetch.get('/api-order/order/v1/getShipSn', {
      params: {
        orgid
      }
    })
  },
  /**
   * 判断运单号是否唯一
   * @param {string} shipSn 运单号
   */
  getJudgeShipSn(shipSn, orgId) {
    return fetch.get('/api-order/order/v1/judgeShipSn/' + shipSn, {
      params: {
        orgId
      }
    })
  },
  // 导出数据
  getExportExcel() {
    // 1
  },
  // 获取运费设置
  getFeeSetup() {
    return new Promise(resolve => {
      resolve([{
        name: '货物名',
        ischeck: true,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '件数',
        ischeck: false,
        isfixed: true,
        key: 'huowuming',
        order: 0
      }, {
        name: '重量(kg)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)是ojbk啦',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }, {
        name: '超你妹长的名字体积(方)',
        ischeck: false,
        isfixed: false,
        key: 'huowuming',
        order: 0
      }])
    })
  },
  // 修改运费设置
  putChangeFeeSetup() {

  },
  /**
   * 查询个人设置
   * @param {number} userId 用户ID
   */
  getPersonalSetup(userId, type) {
    return fetch.get('/api-order/order/tmsshipsetting/v1/' + userId).then(res => {
      return res.data ? (type ? (res.data[type] || {}) : res.data) : {}
    })
  },
  /**
   * 修改个人设置
   * @param {*} data 设置数据
{
  "shipDefault": {
      "openOrderAndTransferInfo": "0",
      "aloneWindow": "0"
  },
  "printKey": {
      "printLibkey": "Ctrl+O",
      "savePrintKey": "Ctrl+D",
      "saveShipKey": "Ctrl+S",
      "cleanKey": "Ctrl+E",
      "printShipKey": "Ctrl+P"
  },
  "shipSetKey": {
      "receiptType": "",
      "receiptNum": "2",
      "handoverMode": "68",
      "paymentMode": "76",
      "transportMode": "87",
      "businessType": ""
  },
  "userId": 1
}
   */
  putPersonalSetup(data) {
    return fetch.put('/api-order/order/tmsshipsetting/v1/', data)
  },
  /**
   * 重置个人设置
   * @param {*} userId 用户ID
   */
  resetPersonalSetup(userId) {
    return fetch.put('/api-order/order/tmsshipsetting/v1/' + userId)
  }
}
