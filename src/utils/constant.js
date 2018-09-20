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
/**
 * 结算方向
 */
export const SETTLEMENT_ID = {
  '': '全部',
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
