import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/operation',
  component: Layout,
  redirect: '/operation/index',
  icon: 'yunyingguanli',
  name: '运营管理首页',
  meta:{
    title: '运营管理'
  },
  noDropdown: true,
  children: [{
    path: '/operation/order/manage', icon: 'yygl1_dingdan', name: 'ordermanage', component: _import('operation/order/manage/index'), meta: { role: ['admin'], title: '订单管理', noCache: false }
  }, {
    path: '/operation/order/pickUp', icon: 'yygl4_tihuo', name: 'orderpickUp', component: _import('operation/order/pickUp/index'), meta: { role: ['admin'], title: '提货管理', noCache: false }
  }, {
    path: '/operation/index', icon: 'QQ', hidden: true, name: '运营管理', component: _import('operation/index'), meta: { role: ['admin'], title: '运营管理', noCache: false }
  }, {
    path: '/operation/order/createOrder', hidden: true, icon: 'yygl0_chuangjian', name: 'createOrder22', component: _import('operation/order/createOrder/index'), meta: { role: ['admin'], title: '创建运单', noCache: false }
  },
  {
    path: '/operation/order/modifyOrder', hidden: true, icon: 'yygl0_chuangjian', name: 'modifyOrder22', component: _import('operation/order/createOrder/modify'), meta: { role: ['admin'], title: '改单', noCache: false }
  },
  {
    path: '/operation/order/orderManage', icon: 'yygl2_yundan', name: 'orderManage', component: _import('operation/order/orderManage/index'), meta: { role: ['admin'], title: '运单管理', noCache: true }
  },
  {
    path: '/operation/order/shortDepart', icon: 'yygl5_duanbo', name: 'shortDepart', component: _import('operation/order/shortDepart/index'), meta: { role: ['admin'], title: '短驳管理', noCache: false }
  }, {
    path: '/operation/order/arteryDepart', icon: 'yygl6_fache', name: 'arteryDepart', component: _import('operation/order/arteryDepart/index'), meta: { role: ['admin'], title: '干线发车', noCache: false }
  },
  {
    path: '/operation/order/arteryDelivery', icon: 'yygl7_daoche', name: 'arteryDelivery', component: _import('operation/order/arteryDelivery/index'), meta: { role: ['admin'], title: '干线到车', noCache: false }
  }, {
    path: '/operation/order/deliverManage', icon: 'yygl8_songhuo', name: 'deliverManage', component: _import('operation/order/deliverManage/index'), meta: { role: ['admin'], title: '送货管理', noCache: false }
  }, {
    path: '/operation/order/repertory', icon: 'yygl3_kucun', name: 'orderrepertory', component: _import('operation/order/repertory/index'), meta: { role: ['admin'], title: '库存管理', noCache: true }
  }, {
    path: '/operation/order/sign', icon: 'yygl10_qianshou', name: 'ordersign', component: _import('operation/order/sign/index'), meta: { role: ['admin'], title: '签收管理', noCache: false }
  }, {
    path: '/operation/order/receipt', icon: 'yygl11_huidandan', name: 'orderreceipt', component: _import('operation/order/receipt/index'), meta: { role: ['admin'], title: '回单管理', noCache: false }
  },
  {
    path: '/operation/order/load', icon: 'QQ', hidden: true, name: 'orderload', component: _import('operation/order/load/index'), meta: { role: ['admin'], title: '新增配载', noCache: false }
  },
  {
    path: '/operation/order/track', icon: 'yygl12_genzong', name: 'ordertrack', component: _import('operation/order/track/index'), meta: { role: ['admin'], title: '在途跟踪', noCache: false }
  },

  {
    path: '/operation/order/transfer', icon: 'yygl9_zhongzhuan', name: 'ordertransfer', component: _import('operation/order/transfer/index'), meta: { role: ['admin'], title: '中转管理', noCache: false }
  },
  {
    path: '/operation/order/transferLoad/', icon: 'QQ', hidden: true, name: 'ordertransferLoad', component: _import('operation/order/transferLoad/index'), meta: { role: ['admin'], title: '中转外发', noCache: false }
  },
  {
    path: '/operation/order/pickClip', hidden: true, icon: 'QQ', name: 'orderpickClip', component: _import('operation/order/pickClip/index'), meta: { role: ['admin'], title: '挑单夹', noCache: false }
  },
  {
    path: '/operation/order/orderDetail', hidden: true, icon: 'QQ', name: 'orderDetail', component: _import('operation/order/orderDetail/index'), meta: { role: ['admin'], title: '订单详情', noCache: false }
  },
  {
    path: '/operation/service',
    redirect: '/operation/service/abnormal',
    component: _import('operation/service/index'),
    icon: 'yygl13_kefu', name: 'serviceabnormal', meta: { role: ['admin'], title: '客服中心', noCache: false, stitle: '客服' },
    children: [{
      path: '/operation/service/abnormal', icon: 'QQ', name: '异常管理', component: _import('operation/service/abnormal/index'), meta: { role: ['admin'], title: '异常管理', noCache: true }
    },
    {
      path: '/operation/service/controlgoods', icon: 'QQ', name: '控货管理', component: _import('operation/service/controlgoods/index'), meta: { role: ['admin'], title: '控货管理', noCache: true }
    }]
  }
  ]
}
