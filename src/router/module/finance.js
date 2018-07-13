import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/finance',
  component: Layout,
  redirect: '/finance/index',
  name: '财务管理',
  icon: 'caiwu',
  children: [
    {
      path: '/finance/index', icon: 'QQ', hidden: true, name: '财务管理', component: _import('finance/index'), meta: { role: ['admin'], title: '财务管理', noCache: false }
    },
    {
      path: '/finance/handAccount', icon: 'caiwugl4_yuangongjz', name: '员工交账', component: _import('finance/handAccount/index'), meta: { role: ['admin'], title: '员工交账', noCache: false }
    },
    {
      path: '/finance/handAccount/detail', icon: 'QQ', name: '交账明细', component: _import('finance/handAccount/detail'), meta: { role: ['admin'], title: '交账明细', noCache: false }
    },
    {
      path: '/finance/accountsReceivable', icon: 'caiwugl1_yingshou', name: '应收账款', component: _import('finance/accountsReceivable/index'), meta: { role: ['admin'], title: '应收账款', noCache: false }
    },
    {
      path: '/finance/accountsPayable', icon: 'caiwugl2_yingfu', name: '应付账款', component: _import('finance/accountsPayable/index'), redirect: '/finance/handAccount/waybill', meta: { role: ['admin'], title: '应付账款', istab: true, noCache: false },
      children: [
        {
          path: '/finance/accountsPayable/waybill', icon: 'QQ', name: '运单结算', component: _import('finance/accountsPayable/waybill/index'), meta: { role: ['admin'], title: '运单结算', noCache: false }
        },
        {
          path: '/finance/accountsPayable/batch', icon: 'QQ', name: '批次结算', component: _import('finance/accountsPayable/batch/index'), meta: { role: ['admin'], title: '批次结算', noCache: false }
        },
        {
          path: '/finance/accountsLoad', icon: 'QQ', hidden: true, name: '账款结算', component: _import('finance/accountsLoad/index'), meta: { role: ['admin'], title: '账款结算', noCache: false }
        }
      ]
    },
    {
      path: '/finance/settleLog', icon: 'caiwugl5_zijinls', name: '资金流水汇总', component: _import('finance/settleLog/index'), meta: { role: ['admin'], title: '资金流水汇总', noCache: false }
    },
    {
      path: '/finance/IOManage', icon: 'caiwugl3_shouzhifs', name: '收支方式管理', component: _import('finance/IOManage/index'), meta: { role: ['admin'], title: '收支方式管理', noCache: false }
    },
    {
      path: '/finance/reconciliation', icon: 'caiwugl6_caiwudz', redirect: '/finance/reconciliation/carrier', name: '财务对账', component: _import('finance/reconciliation/index'), meta: { role: ['admin'], title: '财务对账', noCache: false, istab: true },
      children: [
        {
          path: '/finance/reconciliation/carrier', icon: 'QQ', name: '承运商对账', component: _import('finance/reconciliation/carrier/index'), meta: { role: ['admin'], title: '承运商对账', noCache: false }
        },
        {
          path: '/finance/reconciliation/group', icon: 'QQ', name: '网点对账', component: _import('finance/reconciliation/group/index'), meta: { role: ['admin'], title: '网点对账', noCache: false }
        },
        {
          path: '/finance/reconciliation/customer', icon: 'QQ', name: '客户对账', component: _import('finance/reconciliation/customer/index'), meta: { role: ['admin'], title: '客户对账', noCache: false }
        },
        {
          path: '/finance/reconciliation/carfee', icon: 'QQ', name: '车费对账', component: _import('finance/reconciliation/carfee/index'), meta: { role: ['admin'], title: '车费对账', noCache: false }
        }
      ]
    },
    {
      path: '/finance/unusual', icon: 'QQ', name: '异动费用', component: _import('finance/unusual/index'), meta: { role: ['admin'], title: '异动费用', noCache: false }
    },
    {
      path: '/finance/payment', icon: 'QQ', name: '货款管理', component: _import('finance/payment/index'), meta: { role: ['admin'], title: '货款管理', noCache: false }
    }
  ]
}
