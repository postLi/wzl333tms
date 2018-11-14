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
export const SUBINFO_EXCEL = 'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/财务标准科目.xlsx'

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
 * 结算类型
 */
export const COUNT_STATUS = {
  '': '全部',
  NOSETTLEMENT: '未结算',
  PARTSETTLEMENT: '部分结算',
  ALLSETTLEMENT: '已结算'
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
 * 支付方式
 */
export const FINANCE_WAY = {
  280: '银行卡',
  281: '支付宝',
  282: '微信',
  283: '现金',
  284: '支票',
  '银行卡': 280,
  '支付宝': 281,
  '微信': 282,
  '现金': 283,
  '支票': 284
}


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
