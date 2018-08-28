import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/operation',
  component: Layout,
  redirect: '/operation/index',
  icon: 'yunyingguanli',
  name: '运营管理首页',
  meta: {
    title: '运营管理'
  },
  noDropdown: true,
  children: [{
    path: '/operation/order/manage',
    icon: 'yygl1_dingdan',
    name: 'ordermanage',
    component: _import('operation/order/manage/index'),
    meta: { role: ['admin'], title: '订单管理', noCache: false },
    children: [{
      path: '/operation/order/manage/service',
      icon: 'QQ',
      name: '客服订单',
      component: _import('operation/order/manage/sender'),
      meta: { role: ['admin'], ptitle: '订单管理', title: '客服订单', noCache: true, istab: true }
    },
    {
      path: '/operation/order/manage/import',
      icon: 'QQ',
      name: '运单导入',
      component: _import('operation/order/manage/receiver'),
      meta: { role: ['admin'], ptitle: '订单管理', title: '运单导入', noCache: true, istab: true }
    },
    {
      path: '/operation/order/manage/networks',
      icon: 'QQ',
      name: '网络订单',
      component: _import('operation/order/manage/networks'),
      meta: { role: ['admin'], ptitle: '订单管理', title: '网络订单', noCache: true, istab: true }
    }]
  }, {
    path: '/operation/order/pickUp',
    icon: 'yygl4_tihuo',
    name: 'orderpickUp',
    component: _import('operation/order/pickUp/index'),
    meta: { role: ['admin'], title: '提货管理', noCache: false }
  }, {
    path: '/operation/index',
    icon: 'QQ',
    hidden: true,
    name: '运营管理',
    component: _import('operation/index'),
    meta: { role: ['admin'], title: '运营管理', noCache: false }
  }, {
    path: '/operation/order/createOrder',
    hidden: true,
    icon: 'yygl0_chuangjian',
    name: 'createOrder22',
    component: _import('operation/order/createOrder/index'),
    meta: { role: ['admin'], title: '创建运单', noCache: false }
  },
  {
    path: '/operation/order/modifyOrder',
    hidden: true,
    icon: 'yygl0_chuangjian',
    name: 'modifyOrder22',
    component: _import('operation/order/createOrder/modify'),
    meta: { role: ['admin'], title: '改单', noCache: false }
  },
  {
    path: '/operation/order/orderManage',
    icon: 'yygl2_yundan',
    name: 'orderManage',
    component: _import('operation/order/orderManage/index'),
    meta: { role: ['admin'], title: '运单管理', noCache: true },
    children: [{
      path: '/operation/order/orderManage/All',
      icon: 'QQ',
      name: '全部运单',
      component: _import('operation/order/orderManage/all'),
      meta: { role: ['admin'], ptitle: '运单管理', title: '全部运单', noCache: true, istab: true }
    },
    {
      path: '/operation/order/orderManage/History',
      icon: 'QQ',
      name: '改单记录',
      component: _import('operation/order/orderManage/history'),
      meta: { role: ['admin'], ptitle: '运单管理', title: '改单记录', noCache: true, istab: true }
    },
    {
      path: '/operation/order/orderManage/Dashboard',
      icon: 'QQ',
      name: '草稿箱',
      component: _import('operation/order/orderManage/dashboard'),
      meta: { role: ['admin'], ptitle: '运单管理', title: '草稿箱', noCache: true, istab: true }
    }
    ]
  },
  {
    path: '/operation/order/shortDepart',
    icon: 'yygl5_duanbo',
    name: 'shortDepart',
    component: _import('operation/order/shortDepart/index'),
    meta: { role: ['admin'], title: '短驳管理', noCache: false },
    children: [{
      path: '/operation/order/shortDepart/deliver',
      icon: 'QQ',
      name: '短驳发车',
      component: _import('operation/order/shortDepart/deliver'),
      meta: { role: ['admin'], ptitle: '短驳管理', title: '短驳发车', noCache: true, istab: true }
    },
    {
      path: '/operation/order/shortDepart/arrival',
      icon: 'QQ',
      name: '短驳到货',
      component: _import('operation/order/shortDepart/arrival'),
      meta: { role: ['admin'], ptitle: '短驳管理', title: '短驳到货', noCache: true, istab: true }
    }
    ]
  },
  {
    path: '/operation/order/arteryDepart',
    icon: 'yygl6_fache',
    name: 'arteryDepart',
    component: _import('operation/order/arteryDepart/index'),
    meta: { role: ['admin'], title: '干线发车', noCache: false }
  },
  {
    path: '/operation/order/arteryDelivery',
    icon: 'yygl7_daoche',
    name: 'arteryDelivery',
    component: _import('operation/order/arteryDelivery/index'),
    meta: { role: ['admin'], title: '干线到车', noCache: false }
  }, {
    path: '/operation/order/deliverManage',
    icon: 'yygl8_songhuo',
    name: 'deliverManage',
    component: _import('operation/order/deliverManage/index'),
    meta: { role: ['admin'], title: '送货管理', noCache: false }
  }, {
    path: '/operation/order/repertory',
    icon: 'yygl3_kucun',
    name: 'orderrepertory',
    component: _import('operation/order/repertory/index'),
    meta: { role: ['admin'], title: '库存管理', noCache: true },
    children: [{
      path: '/operation/order/repertory/allrepertory',
      icon: 'QQ',
      name: '库存总表',
      component: _import('operation/order/repertory/allrepertory'),
      meta: { role: ['admin'], ptitle: '库存管理', title: '库存总表', noCache: true, istab: true }
    },
    {
      path: '/operation/order/repertory/deliver',
      icon: 'QQ',
      name: '发货库存',
      component: _import('operation/order/repertory/deliver'),
      meta: { role: ['admin'], ptitle: '库存管理', title: '发货库存', noCache: true, istab: true }
    },
    {
      path: '/operation/order/repertory/arrival',
      icon: 'QQ',
      name: '到货库存',
      component: _import('operation/order/repertory/arrival'),
      meta: { role: ['admin'], ptitle: '库存管理', title: '到货库存', noCache: true, istab: true }
    }
    ]
  }, {
    path: '/operation/order/sign',
    icon: 'yygl10_qianshou',
    name: 'ordersign',
    component: _import('operation/order/sign/index'),
    meta: { role: ['admin'], title: '签收管理', noCache: false },
    children: [{
      path: '/operation/order/sign/Pick',
      icon: 'QQ',
      name: '自提签收',
      component: _import('operation/order/sign/pick'),
      meta: { role: ['admin'], ptitle: '签收管理', title: '自提签收', noCache: true, istab: true }
    },
    {
      path: '/operation/order/sign/Delivery',
      icon: 'QQ',
      name: '送货签收',
      component: _import('operation/order/sign/delivery'),
      meta: { role: ['admin'], ptitle: '签收管理', title: '送货签收', noCache: true, istab: true }
    },
    {
      path: '/operation/order/sign/Transfer',
      icon: 'QQ',
      name: '中转签收',
      component: _import('operation/order/sign/transfer'),
      meta: { role: ['admin'], ptitle: '签收管理', title: '中转签收', noCache: true, istab: true }
    }
    ]
  }, {
    path: '/operation/order/receipt',
    icon: 'yygl11_huidandan',
    name: 'orderreceipt',
    component: _import('operation/order/receipt/index'),
    meta: { role: ['admin'], title: '回单管理', noCache: false },
    children: [{
      path: '/operation/order/receipt/Recycle',
      icon: 'QQ',
      name: '回单回收',
      component: _import('operation/order/receipt/recycle'),
      meta: { role: ['admin'], ptitle: '回单管理', title: '回单回收', noCache: true, istab: true }
    },
    {
      path: '/operation/order/receipt/Send',
      icon: 'QQ',
      name: '回单寄出',
      component: _import('operation/order/receipt/send'),
      meta: { role: ['admin'], ptitle: '回单管理', title: '回单寄出', noCache: true, istab: true }
    },
    {
      path: '/operation/order/receipt/Accept',
      icon: 'QQ',
      name: '回单接收',
      component: _import('operation/order/receipt/accept'),
      meta: { role: ['admin'], ptitle: '回单管理', title: '回单接收', noCache: true, istab: true }
    },
    {
      path: '/operation/order/receipt/Grant',
      icon: 'QQ',
      name: '回单发放',
      component: _import('operation/order/receipt/grant'),
      meta: { role: ['admin'], ptitle: '回单管理', title: '回单发放', noCache: true, istab: true }
    }
    ]
  },
  {
    path: '/operation/order/load',
    icon: 'QQ',
    hidden: true,
    name: 'orderload',
    component: _import('operation/order/load/index'),
    meta: { role: ['admin'], title: '新增配载', noCache: false }
  },
  {
    path: '/operation/order/track',
    icon: 'yygl12_genzong',
    name: 'ordertrack',
    component: _import('operation/order/track/index'),
    meta: { role: ['admin'], title: '在途跟踪', noCache: false },
    children: [{
      path: '/operation/order/track/artery',
      icon: 'QQ',
      name: '干线跟踪',
      component: _import('operation/order/track/artery'),
      meta: { role: ['admin'], ptitle: '在途跟踪', title: '干线跟踪', noCache: true, istab: true }
    },
    {
      path: '/operation/order/track/short',
      icon: 'QQ',
      name: '短驳跟踪',
      component: _import('operation/order/track/short'),
      meta: { role: ['admin'], ptitle: '在途跟踪', title: '短驳跟踪', noCache: true, istab: true }
    },
    {
      path: '/operation/order/track/deliver',
      icon: 'QQ',
      name: '送货跟踪',
      component: _import('operation/order/track/deliver'),
      meta: { role: ['admin'], ptitle: '在途跟踪', title: '送货跟踪', noCache: true, istab: true }
    },
    {
      path: '/operation/order/track/transfer',
      icon: 'QQ',
      name: '中转跟踪',
      component: _import('operation/order/track/transfer'),
      meta: { role: ['admin'], ptitle: '在途跟踪', title: '中转跟踪', noCache: true, istab: true }
    }
    ]
  },

  {
    path: '/operation/order/transfer',
    icon: 'yygl9_zhongzhuan',
    name: 'ordertransfer',
    component: _import('operation/order/transfer/index'),
    meta: { role: ['admin'], title: '中转管理', noCache: false },
    children: [{
      path: '/operation/order/transfer/transfered',
      icon: 'QQ',
      name: '已中转运单',
      component: _import('operation/order/transfer/transfered'),
      meta: { role: ['admin'], ptitle: '中转管理', title: '已中转运单', noCache: true, istab: true }
    },
    {
      path: '/operation/order/transfer/batch',
      icon: 'QQ',
      name: '中转批次',
      component: _import('operation/order/transfer/batch'),
      meta: { role: ['admin'], ptitle: '中转管理', title: '中转批次', noCache: true, istab: true }
    }
    ]
  },
  {
    path: '/operation/order/transferLoad/',
    icon: 'QQ',
    hidden: true,
    name: 'ordertransferLoad',
    component: _import('operation/order/transferLoad/index'),
    meta: { role: ['admin'], title: '中转外发', noCache: false }
  },
  {
    path: '/operation/order/pickClip',
    hidden: true,
    icon: 'QQ',
    name: 'orderpickClip',
    component: _import('operation/order/pickClip/index'),
    meta: { role: ['admin'], title: '挑单夹', noCache: false }
  },
  {
    path: '/operation/order/orderDetail',
    hidden: true,
    icon: 'QQ',
    name: 'orderDetail',
    component: _import('operation/order/orderDetail/index'),
    meta: { role: ['admin'], title: '订单详情', noCache: false }
  },
  {
    path: '/operation/service',
    redirect: '/operation/service/abnormal',
    component: _import('operation/service/index'),
    icon: 'yygl13_kefu',
    name: 'serviceabnormal',
    meta: { role: ['admin'], title: '客服中心', noCache: false, stitle: '客服' },
    children: [{
      path: '/operation/service/abnormal',
      redirect: '/operation/service/abnormal/abReg',
      icon: 'QQ',
      name: '异常管理',
      component: _import('operation/service/abnormal/index'),
      meta: { role: ['admin'], title: '异常管理', noCache: true },
      children: [
        {
          path: '/operation/service/abnormal/abReg',
          icon: 'QQ',
          name: '异常登记',
          component: _import('operation/service/abnormal/abReg'),
          meta: { role: ['admin'], ptitle: '异常管理', istab: true, title: '异常登记', noCache: false }
        },
        {
          path: '/operation/service/abnormal/abDeal',
          icon: 'QQ',
          name: '异常处理',
          component: _import('operation/service/abnormal/abDeal'),
          meta: { role: ['admin'], ptitle: '异常管理', istab: true, title: '异常处理', noCache: false }
        }
      ]
    },
    {
      path: '/operation/service/controlgoods',
      redirect: '/operation/service/controlgoods/allGoods',
      icon: 'QQ',
      name: '控货管理',
      component: _import('operation/service/controlgoods/index'),
      meta: { role: ['admin'], title: '控货管理', noCache: true },
      children: [
        {
          path: '/operation/service/controlgoods/allGoods',
          icon: 'QQ',
          name: '全部',
          component: _import('operation/service/controlgoods/allGoods'),
          meta: { role: ['admin'], ptitle: '控货管理', istab: true, title: '全部', noCache: false }
        },
        {
          path: '/operation/service/controlgoods/noGoods',
          icon: 'QQ',
          name: '未放货',
          component: _import('operation/service/controlgoods/noGoods'),
          meta: { role: ['admin'], ptitle: '控货管理', istab: true, title: '未放货', noCache: false }
        },
        {
          path: '/operation/service/controlgoods/haveGoods',
          icon: 'QQ',
          name: '已放货',
          component: _import('operation/service/controlgoods/haveGoods'),
          meta: { role: ['admin'], ptitle: '控货管理', istab: true, title: '已放货', noCache: false }
        }
      ]
    }
    ]
  }
  ]
}
