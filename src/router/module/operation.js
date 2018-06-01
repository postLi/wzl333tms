import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/operation',
  component: Layout,
  redirect: '/operation/order/orderManage',
  icon: 'yunyingguanli',
  name: '运营管理',
  noDropdown: true,
  children: [{
    path: '/operation/order/createOrder', icon: 'QQ', name: '创建运单', component: _import('operation/order/createOrder/index'), meta: { role: ['admin'], title: '创建运单', noCache: true }
  },
  {
    path: '/operation/order/orderManage', icon: 'QQ', name: '运单管理', component: _import('operation/order/orderManage/index'), meta: { role: ['admin'], title: '运单管理', noCache: true }
  },
  {
    path: '/operation/order/manage', icon: 'QQ', name: '订单管理', component: _import('operation/order/manage/index'), meta: { role: ['admin'], title: '订单管理', noCache: true }
  },
  {
    path: '/operation/receipt', icon: 'QQ', name: '回单管理', component: _import('operation/order/receipt/index'), meta: { role: ['admin'], title: '回单管理', noCache: true }
  },
  {
    path: '/operation/pickUp', icon: 'QQ', name: '提货管理', component: _import('operation/order/pickUp/index'), meta: { role: ['admin'], title: '提货管理', noCache: true }
  },
  {
    path: '/operation/repertory', icon: 'QQ', name: '库存管理', component: _import('operation/order/repertory/index'), meta: { role: ['admin'], title: '库存管理', noCache: true }
  },
  {
    path: '/operation/shortDepart', icon: 'QQ', name: '短驳管理', component: _import('operation/order/shortDepart/index'), meta: { role: ['admin'], title: '短驳管理', noCache: true }
  },
  {
    path: '/operation/arteryDepart', icon: 'QQ', name: '干线发车', component: _import('operation/order/arteryDepart/index'), meta: { role: ['admin'], title: '干线发车', noCache: true }
  },
  {
    path: '/operation/arteryDelivery', icon: 'QQ', name: '干线到车', component: _import('operation/order/arteryDelivery/index'), meta: { role: ['admin'], title: '干线到车', noCache: true }
  },
  {
    path: '/operation/deliverManage', icon: 'QQ', name: '送货管理', component: _import('operation/order/deliverManage/index'), meta: { role: ['admin'], title: '送货管理', noCache: true }
  },
  {
    path: '/operation/track', icon: 'QQ', name: '在途跟踪', component: _import('operation/order/track/index'), meta: { role: ['admin'], title: '在途跟踪', noCache: true }
  },
  {
    path: '/operation/sign', icon: 'QQ', name: '签收管理', component: _import('operation/order/sign/index'), meta: { role: ['admin'], title: '签收管理', noCache: true }
  },
  {
    path: '/operation/transfer', icon: 'QQ', name: '中转管理', component: _import('operation/order/transfer/index'), meta: { role: ['admin'], title: '中转管理', noCache: true }
  },
  {
    path: '/operation/order/pickClip', hidden: true, icon: 'QQ', name: '挑单夹', component: _import('operation/order/pickClip/index'), meta: { role: ['admin'], title: '挑单夹', noCache: true }
  },
  {
    path: '/operation/service',
    redirect: '/operation/service/abnormal',
    component: _import('operation/service/index'),
    icon: 'QQ', name: '客服中心', meta: { role: ['admin'], title: '客服中心', noCache: true, stitle: '客服' },
    children: [{
      path: '/operation/service/abnormal', icon: 'QQ', name: '异常管理', component: _import('operation/service/abnormal/index'), meta: { role: ['admin'], title: '异常管理', noCache: true }
    },
    {
      path: '/operation/service/controlgoods', icon: 'QQ', name: '控货管理', component: _import('operation/service/controlgoods/index'), meta: { role: ['admin'], title: '控货管理', noCache: true }
    }]
  }
  ]
}
