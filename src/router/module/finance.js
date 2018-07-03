import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/finance',
  component: Layout,
  redirect: '/finance/handAccount',
  name: '财务管理',
  icon: 'caiwu',
  children: [
    {
      path: '/finance/handAccount/', icon: 'QQ', name: '员工交账', component: _import('finance/handAccount/index'), meta: { role: ['admin'], title: '员工交账', noCache: false }
    },
    {
      path: '/finance/accountsReceivable/', icon: 'QQ', name: '应收账款', component: _import('finance/accountsReceivable/index'), meta: { role: ['admin'], title: '应收账款', noCache: false }
    },
    {
      path: '/finance/accountsPayable/', icon: 'QQ', name: '应付账款', component: _import('finance/accountsPayable/index'), redirect: '/finance/handAccount/waybill', meta: { role: ['admin'], title: '应付账款', istab: true, noCache: false },
      children: [
        {
          path: '/finance/accountsPayable/waybill', icon: 'QQ', name: '运单结算', component: _import('finance/accountsPayable/waybill/index'), meta: { role: ['admin'], title: '运单结算', noCache: false }
        },
        {
          path: '/finance/accountsPayable/batch', icon: 'QQ', name: '批次结算', component: _import('finance/accountsPayable/batch/index'), meta: { role: ['admin'], title: '批次结算', noCache: false }
        }
      ]
    },
    {
      path: '/finance/settleLog/', icon: 'QQ', name: '资金流水汇总', component: _import('finance/settleLog/index'), meta: { role: ['admin'], title: '资金流水汇总', noCache: false }
    },
    {
      path: '/finance/IOManage/', icon: 'QQ', name: '收支方式管理', component: _import('finance/IOManage/index'), meta: { role: ['admin'], title: '收支方式管理', noCache: false }
    },
    {
      path: '/finance/reconciliation/', icon: 'QQ', name: '财务对账', component: _import('finance/reconciliation/index'), meta: { role: ['admin'], title: '财务对账', noCache: false }
    }
  ]
}
