import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/finance',
  component: Layout,
  redirect: '/finance/index',
  name: '财务管理首页',
  meta: {
    title: '财务管理'
  },
  icon: 'caiwu',
  children: [{
    path: '/finance/index',
    icon: 'QQ',
    hidden: true,
    name: '财务管理',
    component: _import('finance/index'),
    meta: { role: ['admin'], title: '财务管理', noCache: true }
  },
  {
    path: '/finance/accountsReceivable',
    icon: 'caiwugl1_yingshou',
    name: 'accountsReceivable',
    component: _import('finance/accountsReceivable/index'),
    meta: { role: ['admin'], title: '应收账款', noCache: false },
    children: [{
      path: '/finance/accountsReceivable/all',
      icon: 'QQ',
      name: '全部',
      component: _import('finance/accountsReceivable/all'),
      meta: { role: ['admin'], ptitle: '应收账款', title: '全部', noCache: true, istab: true }
    },
    {
      path: '/finance/accountsReceivable/cash',
      icon: 'QQ',
      name: '现付',
      component: _import('finance/accountsReceivable/cash'),
      meta: { role: ['admin'], ptitle: '应收账款', title: '现付', noCache: true, istab: true }
    },
    {
      path: '/finance/accountsReceivable/arrive',
      icon: 'QQ',
      name: '到付',
      component: _import('finance/accountsReceivable/arrive'),
      meta: { role: ['admin'], ptitle: '应收账款', title: '到付', noCache: true, istab: true }
    },
    {
      path: '/finance/accountsReceivable/receipt',
      icon: 'QQ',
      name: '回单付',
      component: _import('finance/accountsReceivable/receipt'),
      meta: { role: ['admin'], ptitle: '应收账款', title: '回单付', noCache: true, istab: true }
    },
    {
      path: '/finance/accountsReceivable/month',
      icon: 'QQ',
      name: '月结',
      component: _import('finance/accountsReceivable/month'),
      meta: { role: ['admin'], ptitle: '应收账款', title: '月结', noCache: true, istab: true }
    },
    {
      path: '/finance/accountsReceivable/abnormal',
      icon: 'QQ',
      name: '异动费用',
      component: _import('finance/accountsReceivable/abnormal'),
      meta: { role: ['admin'], ptitle: '应收账款', title: '异动费用', noCache: true, istab: true }
    }
    ]
  },
  {
    path: '/finance/accountsPayable',
    icon: 'caiwugl2_yingfu',
    name: 'accountsPayable',
    component: _import('finance/accountsPayable/index'),
    redirect: '/finance/handAccount/waybill',
    meta: { role: ['admin'], title: '应付账款', istab: true, noCache: false },
    children: [{
      path: '/finance/accountsPayable/waybill',
      redirect: '/finance/accountsPayable/waybill/kickback',
      icon: 'QQ',
      name: '运单结算',
      component: _import('finance/accountsPayable/waybill/index'),
      meta: { role: ['admin'], title: '运单结算', noCache: false },
      children: [
        {
          path: '/finance/accountsPayable/waybill/kickback',
          icon: 'QQ',
          name: '回扣',
          component: _import('finance/accountsPayable/waybill/kickback'),
          meta: { role: ['admin'], ptitle: '运单结算', title: '回扣', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/waybill/transfer',
          icon: 'QQ',
          name: '中转费',
          component: _import('finance/accountsPayable/waybill/transfer'),
          meta: { role: ['admin'], ptitle: '运单结算', title: '中转费', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/waybill/ticket',
          icon: 'QQ',
          name: '实际提货费',
          component: _import('finance/accountsPayable/waybill/ticket'),
          meta: { role: ['admin'], ptitle: '运单结算', title: '实际提货费', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/waybill/unusual',
          icon: 'QQ',
          name: '异动费用',
          component: _import('finance/accountsPayable/waybill/unusual'),
          meta: { role: ['admin'], ptitle: '运单结算', title: '异动费用', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/waybill/abnormal',
          icon: 'QQ',
          name: '异常理赔',
          component: _import('finance/accountsPayable/waybill/abnormal'),
          meta: { role: ['admin'], ptitle: '运单结算', title: '异常理赔', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/waybill/other',
          icon: 'QQ',
          name: '其他费用支出',
          component: _import('finance/accountsPayable/waybill/other'),
          meta: { role: ['admin'], ptitle: '运单结算', title: '其他费用支出', noCache: true, istab: true }
        }
      ]
    },
    {
      path: '/finance/accountsPayable/batch',
      redirect: '/finance/accountsPayable/batch/short',
      icon: 'QQ',
      name: '车费结算',
      component: _import('finance/accountsPayable/batch/index'),
      meta: { role: ['admin'], title: '车费结算', noCache: false },
      children: [
        {
          path: '/finance/accountsPayable/batch/short',
          icon: 'QQ',
          name: '短驳费',
          component: _import('finance/accountsPayable/batch/short'),
          meta: { role: ['admin'], ptitle: '车费结算', title: '短驳费', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/batch/deliver',
          icon: 'QQ',
          name: '送货费',
          component: _import('finance/accountsPayable/batch/deliver'),
          meta: { role: ['admin'], ptitle: '车费结算', title: '送货费', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/batch/truckAll',
          icon: 'QQ',
          name: '发车汇总',
          component: _import('finance/accountsPayable/batch/truckAll'),
          meta: { role: ['admin'], ptitle: '车费结算', title: '发车汇总', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/batch/arrivalAll',
          icon: 'QQ',
          name: '到车汇总',
          component: _import('finance/accountsPayable/batch/arrivalAll'),
          meta: { role: ['admin'], ptitle: '车费结算', title: '到车汇总', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/batch/insurance',
          icon: 'QQ',
          name: '整车保险费',
          component: _import('finance/accountsPayable/batch/insurance'),
          meta: { role: ['admin'], ptitle: '车费结算', title: '整车保险费', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/batch/stationLoad',
          icon: 'QQ',
          name: '发站装卸费',
          component: _import('finance/accountsPayable/batch/stationLoad'),
          meta: { role: ['admin'], ptitle: '车费结算', title: '发站装卸费', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/batch/stationOther',
          icon: 'QQ',
          name: '发站其他费',
          component: _import('finance/accountsPayable/batch/stationOther'),
          meta: { role: ['admin'], ptitle: '车费结算', title: '发站其他费', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/batch/arriveLoad',
          icon: 'QQ',
          name: '到站装卸费',
          component: _import('finance/accountsPayable/batch/arriveLoad'),
          meta: { role: ['admin'], ptitle: '车费结算', title: '到站装卸费', noCache: true, istab: true }
        },
        {
          path: '/finance/accountsPayable/batch/arriveOther',
          icon: 'QQ',
          name: '到站其他费',
          component: _import('finance/accountsPayable/batch/arriveOther'),
          meta: { role: ['admin'], ptitle: '车费结算', title: '到站其他费', noCache: true, istab: true }
        }
      ]
    },
    {
      path: '/finance/accountsLoad',
      icon: 'QQ',
      hidden: true,
      name: '账款结算',
      component: _import('finance/accountsLoad/index'),
      meta: { role: ['admin'], title: '账款结算', noCache: false, istab: true }
    }
    ]
  },
  {
    path: '/finance/settleLog',
    icon: 'caiwugl5_zijinls',
    name: 'settleLog',
    component: _import('finance/settleLog/index'),
    meta: { role: ['admin'], title: '资金流水', noCache: false }
  },
  {
    path: '/finance/settleLogDetail',
    icon: 'caiwugl5_zijinls',
    hidden: true,
    name: '资金流水明细',
    component: _import('finance/settleLog/index'),
    meta: { role: ['admin'], title: '资金流水明细', noCache: false }
  },
  {
    path: '/finance/reconciliation',
    icon: 'caiwugl6_caiwudz',
    redirect: '/finance/reconciliation/carrier',
    name: 'reconciliation',
    component: _import('finance/reconciliation/index'),
    meta: { role: ['admin'], title: '财务对账', noCache: false, istab: true },
    children: [{
      path: '/finance/reconciliation/carrier',
      icon: 'QQ',
      name: '承运商对账',
      component: _import('finance/reconciliation/carrier/index'),
      meta: { role: ['admin'], title: '承运商对账', noCache: false }
    },
        // {
        //   path: '/finance/reconciliation/group', icon: 'QQ', name: '网点对账', component: _import('finance/reconciliation/group/index'), meta: { role: ['admin'], title: '网点对账', noCache: false }
        // },
    {
      path: '/finance/reconciliation/customer',
      icon: 'QQ',
      name: '客户对账',
      component: _import('finance/reconciliation/customer/index'),
      meta: { role: ['admin'], title: '客户对账', noCache: false }
    },
    {
      path: '/finance/reconciliation/carfee',
      redirect: '/finance/reconciliation/carfee/shortDepart',
      icon: 'QQ',
      name: '车费对账',
      component: _import('finance/reconciliation/carfee/index'),
      meta: { role: ['admin'], title: '车费对账', noCache: false },
      children: [
        {
          path: '/finance/reconciliation/carfee/shortDepart',
          icon: 'QQ',
          name: '短驳对账',
          component: _import('finance/reconciliation/carfee/shortDepart'),
          meta: { role: ['admin'], ptitle: '车费对账', istab: true, title: '短驳对账', noCache: false }
        },
        {
          path: '/finance/reconciliation/carfee/artery',
          icon: 'QQ',
          name: '干线对账',
          component: _import('finance/reconciliation/carfee/artery'),
          meta: { role: ['admin'], ptitle: '车费对账', istab: true, title: '干线对账', noCache: false }
        },
        {
          path: '/finance/reconciliation/carfee/deliver',
          icon: 'QQ',
          name: '送货对账',
          component: _import('finance/reconciliation/carfee/deliver'),
          meta: { role: ['admin'], ptitle: '车费对账', istab: true, title: '送货对账', noCache: false }
        }
      ]
    }
    ]
  },
  {
    path: '/finance/unusual',
    icon: 'cwgl_ydfy',
    name: 'financeunusual',
    component: _import('finance/unusual/index'),
    meta: { role: ['admin'], title: '异动费用', noCache: false }
  },
  {
    path: '/finance/payment',
    icon: 'cwgl_hkgl',
    name: 'financepayment',
    component: _import('finance/payment/index'),
    meta: { role: ['admin'], title: '货款管理', noCache: false },
    children: [{
      path: '/finance/payment/recycle',
      icon: 'QQ',
      name: '货款回收',
      component: _import('finance/payment/recycle'),
      meta: { role: ['admin'], ptitle: '货款管理', istab: true, title: '货款回收', noCache: false }
    },
    {
      path: '/finance/payment/send',
      icon: 'QQ',
      name: '货款汇款',
      component: _import('finance/payment/send'),
      meta: { role: ['admin'], ptitle: '货款管理', istab: true, title: '货款汇款', noCache: false }
    },
    {
      path: '/finance/payment/accept',
      icon: 'QQ',
      name: '货款到账',
      component: _import('finance/payment/accept'),
      meta: { role: ['admin'], ptitle: '货款管理', istab: true, title: '货款到账', noCache: false }
    },
    {
      path: '/finance/payment/grant',
      icon: 'QQ',
      name: '货款发放',
      component: _import('finance/payment/grant'),
      meta: { role: ['admin'], ptitle: '货款管理', istab: true, title: '货款发放', noCache: false }
    }
    ]
  },
  {
    path: '/finance/handAccount',
    icon: 'caiwugl4_yuangongjz',
    name: 'handAccount',
    component: _import('finance/handAccount/index'),
    meta: { role: ['admin'], title: '员工交账', noCache: false }
  },
  {
    path: '/finance/handAccount/detail',
    hidden: true,
    icon: 'QQ',
    name: 'handAccountDetail',
    component: _import('finance/handAccount/detail'),
    meta: { role: ['admin'], title: '交账明细', noCache: false }
  },
  {
    path: '/finance/accountsLoadReceivable',
    icon: 'QQ',
    hidden: true,
    name: 'accountsLoadReceivable',
    component: _import('finance/accountsLoadReceivable/index'),
    meta: { role: ['admin'], title: '账款结算', noCache: false }
  },
  {
    path: '/finance/settleLogIncome',
    icon: 'caiwugl5_zijinls',
    hidden: true,
    name: 'settleLogIncome',
    component: _import('finance/settleLogIncome/index'),
    meta: { role: ['admin'], title: '记收入', noCache: false }
  },
  {
    path: '/finance/settleLogExpandtiure',
    icon: 'caiwugl5_zijinls',
    hidden: true,
    name: 'settleLogExpandtiure',
    component: _import('finance/settleLogExpandtiure/index'),
    meta: { role: ['admin'], title: '记支出', noCache: false }
  },
  {
    path: '/finance/IOManage',
    icon: 'caiwugl3_shouzhifs',
    name: 'IOManage',
    component: _import('finance/IOManage/index'),
    meta: { role: ['admin'], title: '收支方式管理', noCache: false }
  },
  {
    path: '/finance/reconciliation/carrier/detailTable',
    icon: 'QQ',
    hidden: true,
    name: '承运商对账明细',
    component: _import('finance/reconciliation/carrier/components/detailTable/index'),
    meta: { role: ['admin'], title: '承运商对账', noCache: false }
  },
  {
    path: '/finance/reconciliation/customer/detailTable',
    icon: 'QQ',
    hidden: true,
    name: '客户对账明细',
    component: _import('finance/reconciliation/customer/components/detailTable/index'),
    meta: { role: ['admin'], title: '客户对账', noCache: false }
  },
    // 承运商对账-创建对账
  {
    path: '/finance/reconciliation/carrier/detailTable/carrierRecon',
    icon: 'QQ',
    hidden: true,
    name: '对账明细',
    component: _import('finance/reconciliation/carrier/components/detailTable/components/carrierRecon'),
    meta: { role: ['admin'], title: '创建对账单', noCache: false }
  },
    // //客户对账-创建对账 customerRecon
  {
    path: '/finance/reconciliation/customer/detailTable/customerRecon',
    icon: 'QQ',
    hidden: true,
    name: '创建对账明细',
    component: _import('finance/reconciliation/customer/components/detailTable/components/customerRecon'),
    meta: { role: ['admin'], title: '创建对账单', noCache: false }
  },
    // 车辆-干线
  {
    path: '/finance/reconciliation/carfee/components/arteryRecon',
    icon: 'QQ',
    hidden: true,
    name: '干线对账明细',
    component: _import('finance/reconciliation/carfee/components/arteryRecon'),
    meta: { role: ['admin'], title: '创建对账单', noCache: false }
  },
    // 车辆-短驳
  {
    path: '/finance/reconciliation/carfee/components/shortRecon',
    icon: 'QQ',
    hidden: true,
    name: '短驳对账明细',
    component: _import('finance/reconciliation/carfee/components/shortRecon'),
    meta: { role: ['admin'], title: '创建对账单', noCache: false }
  },
    // 车辆-送货
  {
    path: '/finance/reconciliation/carfee/components/deliverRecon',
    icon: 'QQ',
    hidden: true,
    name: '送货对账明细',
    component: _import('finance/reconciliation/carfee/components/deliverRecon'),
    meta: { role: ['admin'], title: '创建对账单', noCache: false }
  }
  ]
}
