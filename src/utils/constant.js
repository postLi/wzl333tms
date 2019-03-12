/**
 * 常量
 */
export const REMARK_MAX_LENGTH = 300 // 所有的备注框都统一只能输入300个字符，输入300个字符后就不能再输入
// 1、发货人导入模板.xlsx
export const CUSTOMER_SENDER_EXCEL = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/export/tmstemp/%E5%8F%91%E8%B4%A7%E4%BA%BA%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
// 2、司机导入模板.xlsx
export const DRIVER_EXCEL = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/export/tmstemp/%E5%8F%B8%E6%9C%BA%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
// 3、承运商导入模板.xlsx
export const CARRIER_EXCEL = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/export/tmstemp/%E6%89%BF%E8%BF%90%E5%95%86%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
// 4、收货人导入模板.xlsx
export const CUSTOMER_RECEIVER_EXCEL = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/export/tmstemp/%E6%94%B6%E8%B4%A7%E4%BA%BA%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
// 5、车辆导入模板.xlsx
export const TRUCK_EXCEL = 'https://aflc.oss-cn-shenzhen.aliyuncs.com/export/tmstemp/%E8%BD%A6%E8%BE%86%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
export const SUBINFO_EXCEL = 'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/uploadfile/财务标准科目.xlsx'

// 运单状态 shipStatus
export const SHIPSTATUS = {
  1: '已入库',
  2: '短驳中',
  3: '已装车',
  4: '已发车',
  5: '已到车',
  6: '已到货',
  7: '已中转',
  8: '送货中',
  9: '已签收'
}

/**
 * 短驳 批次状态
 */
export const SHORT_STATE = {
  1: '短驳中',
  2: '已到车',
  3: '已到货',
  4: '已入库',
  5: '全部',
  6: '已装车'
}
/**
 * 库存类型 repertoryType
 */
export const REPERTORY_TYPE = {
  1: '发货库存',
  2: '到货库存'
}
/**
 * 结算（核销）类型
 */
export const COUNT_STATUS = {
  '': '全部',
  NOSETTLEMENT: '未核销',
  PARTSETTLEMENT: '部分核销',
  ALLSETTLEMENT: '已核销'
}
export const COUNT_STATUS2 = {
  '': '全部',
  NOSETTLEMENT: '未核销',
  PARTSETTLEMENT: '部分核销',
  ALLSETTLEMENT: '已核销'
}
/**
 * 日记账来源
 */
export const VERIFICATION_SOURCE = {
  '': '全部',
  0: '核销产生',
  1: '手工录入'
}
/**
 * 结算方向
 */
export const SETTLEMENT_ID = {
  0: '收入',
  1: '支出'
}
/**
 * 钱包收支类型
 */
export const TRADE_TYPE = {
  '': '全部',
  1: '收入',
  2: '支出'
}
export const CERT_TYPE = {
  0: '正常',
  1: '冲销'
}
/**
 * 交账状态
 */
export const FEE_STATUS = {
  '': '全部',
  NOSETTLEMENT: '未交账',
  PARTSETTLEMENT: '部分交账',
  ALLSETTLEMENT: '已交账'
}

/**
 * 分摊方式计算公式
 */
export const APPORTION_TYPE_DESCRIPT = {
  41: '该单件数 / 本车总件数 * 操作费',
  42: '该单体积 / 本车总体积 * 操作费',
  43: '该单重量 / 本车总重量 * 操作费',
  44: '操作费 / 票数',
  45: '(运单 - 回扣）/（总车费 - 总回扣）* 操作费'
}
/**
 * 默认开单页面模板JSON
 */
export const MODELLIST = [{
  "id": "1098059986338054144",
  "fieldName": "开单网点",
  "fieldProperty": "shipFromOrgid",
  "hide": 1,
  "fieldOrder": 1,
  "templateType": "tmsOrderShipTop",
  "typeOrder": 1,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054145",
  "fieldName": "发站",
  "fieldProperty": "shipFromCityName",
  "hide": 1,
  "fieldOrder": 2,
  "templateType": "tmsOrderShipTop",
  "typeOrder": 1,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054146",
  "fieldName": "到站",
  "fieldProperty": "shipToCityName",
  "hide": 1,
  "fieldOrder": 3,
  "templateType": "tmsOrderShipTop",
  "typeOrder": 1,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054147",
  "fieldName": "目的网点",
  "fieldProperty": "shipToOrgid",
  "hide": 1,
  "fieldOrder": 4,
  "templateType": "tmsOrderShipTop",
  "typeOrder": 1,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054148",
  "fieldName": "交接方式",
  "fieldProperty": "shipDeliveryMethod",
  "hide": 1,
  "fieldOrder": 5,
  "templateType": "tmsOrderShipTop",
  "typeOrder": 1,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054149",
  "fieldName": "货号",
  "fieldProperty": "shipGoodsSn",
  "hide": 1,
  "fieldOrder": 6,
  "templateType": "tmsOrderShipTop",
  "typeOrder": 1,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054150",
  "fieldName": "发货方",
  "fieldProperty": "shipSenderUnit",
  "hide": 1,
  "fieldOrder": 7,
  "templateType": "senderCustomer",
  "typeOrder": 2,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054151",
  "fieldName": "发货人",
  "fieldProperty": "shipSenderName",
  "hide": 1,
  "fieldOrder": 8,
  "templateType": "senderCustomer",
  "typeOrder": 2,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054152",
  "fieldName": "发货方电话",
  "fieldProperty": "shipSenderMobile",
  "hide": 1,
  "fieldOrder": 9,
  "templateType": "senderCustomer",
  "typeOrder": 2,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054153",
  "fieldName": "发货地址",
  "fieldProperty": "shipSenderAddress",
  "hide": 1,
  "fieldOrder": 10,
  "templateType": "senderCustomer",
  "typeOrder": 2,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054154",
  "fieldName": "收货方",
  "fieldProperty": "shipReceiverUnit",
  "hide": 1,
  "fieldOrder": 11,
  "templateType": "receiverCustomer",
  "typeOrder": 2,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054155",
  "fieldName": "收货人",
  "fieldProperty": "shipReceiverName",
  "hide": 1,
  "fieldOrder": 12,
  "templateType": "receiverCustomer",
  "typeOrder": 2,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054156",
  "fieldName": "收货方电话",
  "fieldProperty": "shipReceiverMobile",
  "hide": 1,
  "fieldOrder": 13,
  "templateType": "receiverCustomer",
  "typeOrder": 2,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054157",
  "fieldName": "收货地址",
  "fieldProperty": "shipReceiverAddress",
  "hide": 1,
  "fieldOrder": 14,
  "templateType": "receiverCustomer",
  "typeOrder": 2,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054158",
  "fieldName": "货品模块",
  "fieldProperty": "tmsOrderCargoList",
  "hide": 1,
  "fieldOrder": 15,
  "templateType": "tmsOrderCargoList",
  "typeOrder": 3,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054159",
  "fieldName": "运费合计",
  "fieldProperty": "shipTotalFee",
  "hide": 1,
  "fieldOrder": 16,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054160",
  "fieldName": "付款方式",
  "fieldProperty": "shipPayWay",
  "hide": 1,
  "fieldOrder": 17,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054162",
  "fieldName": "到付",
  "fieldProperty": "shipArrivepayFee",
  "hide": 1,
  "fieldOrder": 18,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054161",
  "fieldName": "现付",
  "fieldProperty": "shipNowpayFee",
  "hide": 1,
  "fieldOrder": 19,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054163",
  "fieldName": "回单付",
  "fieldProperty": "shipReceiptpayFee",
  "hide": 1,
  "fieldOrder": 20,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054164",
  "fieldName": "月结",
  "fieldProperty": "shipMonthpayFee",
  "hide": 1,
  "fieldOrder": 21,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054165",
  "fieldName": "回单类型",
  "fieldProperty": "shipReceiptRequire",
  "hide": 1,
  "fieldOrder": 22,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054166",
  "fieldName": "回单号及份数",
  "fieldProperty": "shipReceiptSn",
  "hide": 1,
  "fieldOrder": 23,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054167",
  "fieldName": "打印标签",
  "fieldProperty": "shipPrintLib",
  "hide": 1,
  "fieldOrder": 24,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054168",
  "fieldName": "客户单号",
  "fieldProperty": "shipCustomerNumber",
  "hide": 1,
  "fieldOrder": 25,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054169",
  "fieldName": "运输方式",
  "fieldProperty": "shipShippingType",
  "hide": 1,
  "fieldOrder": 26,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054170",
  "fieldName": "业务类型",
  "fieldProperty": "shipBusinessType",
  "hide": 1,
  "fieldOrder": 27,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054171",
  "fieldName": "时效",
  "fieldProperty": "shipEffective",
  "hide": 1,
  "fieldOrder": 28,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054172",
  "fieldName": "提货批次",
  "fieldProperty": "shipBatchId",
  "hide": 1,
  "fieldOrder": 29,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054173",
  "fieldName": "车牌号",
  "fieldProperty": "shipTruckIdNumber",
  "hide": 1,
  "fieldOrder": 30,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054174",
  "fieldName": "业务员",
  "fieldProperty": "shipUserid",
  "hide": 1,
  "fieldOrder": 31,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054175",
  "fieldName": "其他",
  "fieldProperty": "shipOther",
  "hide": 1,
  "fieldOrder": 32,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}, {
  "id": "1098059986338054176",
  "fieldName": "备注",
  "fieldProperty": "shipRemarks",
  "hide": 1,
  "fieldOrder": 33,
  "templateType": "tmsOrderShip",
  "typeOrder": 4,
  "userId": 0,
  "orgId": 0,
  "companyId": 1,
  "createTime": "2019-02-20 11:21:16",
  "updateTime": "2019-03-07 10:10:42"
}]

/**
 * cursorPosition Object
 * 获取textarea光标的位置
 */

export const cursorPosition = {
  get: function(textarea) { // 获取 Textarea 元素当前的光标位置
    var rangeData = {
      text: "",
      start: 0,
      end: 0
    };

    if (textarea.setSelectionRange) { // W3C
      textarea.focus();
      rangeData.start = textarea.selectionStart;
      rangeData.end = textarea.selectionEnd;
      rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
    } else if (document.selection) { // IE
      textarea.focus();
      var i,
        oS = document.selection.createRange(),
        // Don't: oR = textarea.createTextRange()
        oR = document.body.createTextRange();
      oR.moveToElementText(textarea);

      rangeData.text = oS.text;
      rangeData.bookmark = oS.getBookmark();

      // object.moveStart(sUnit [, iCount])
      // Return Value: Integer that returns the number of units moved.
      for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
        // Why? You can alert(textarea.value.length)
        if (textarea.value.charAt(i) == '\r') {
          i++;
        }
      }
      rangeData.start = i;
      rangeData.end = rangeData.text.length + rangeData.start;
    }

    return rangeData;
  },
  set: function(textarea, rangeData) { // 设置回原先的 Textarea 元素的光标位置
    var oR, start, end;
    if (!rangeData) {
      alert("You must get cursor position first.")
    }
    textarea.focus();
    if (textarea.setSelectionRange) { // W3C
      textarea.setSelectionRange(rangeData.start, rangeData.end);
    } else if (textarea.createTextRange) { // IE
      oR = textarea.createTextRange();

      // Fixbug : ues moveToBookmark()
      // In IE, if cursor position at the end of textarea, the set function don't work
      if (textarea.value.length === rangeData.start) {
        //alert('hello')
        oR.collapse(false);
        oR.select();
      } else {
        oR.moveToBookmark(rangeData.bookmark);
        oR.select();
      }
    }
  },

  add: function(textarea, rangeData, text) { // 在 Textarea 元素的光标位置插入文本
    var oValue, nValue, oR, sR, nStart, nEnd, st;
    this.set(textarea, rangeData);

    if (textarea.setSelectionRange) { // W3C
      oValue = textarea.value;
      nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
      nStart = nEnd = rangeData.start + text.length;
      st = textarea.scrollTop;
      textarea.value = nValue;
      // Fixbug:
      // After textarea.values = nValue, scrollTop value to 0
      if (textarea.scrollTop != st) {
        textarea.scrollTop = st;
      }
      textarea.setSelectionRange(nStart, nEnd);
    } else if (textarea.createTextRange) { // IE
      sR = document.selection.createRange();
      sR.text = text;
      sR.setEndPoint('StartToEnd', sR);
      sR.select();
    }
  }
}