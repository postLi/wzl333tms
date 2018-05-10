import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/operation',
  component: Layout,
  redirect: '/operation/index',
  icon: 'yunyingguanli',
  name: '运营管理',
  noDropdown: true,
  children: [{
    path: '/operation/index', icon: 'quanxian', name: '运营管理', component: _import('table/index'), meta: { role: ['admin'], title: '运营管理', noCache: true }
  }, {
    path: '/operation/order', icon: 'QQ', name: '订单管理1', component: _import('operation/order/index'), meta: { role: ['admin'], title: '订单管理1', noCache: true }
  },
  {
    path: '/operation/order/manage', icon: 'QQ', name: '订单管理', component: _import('operation/order/manage/index'), meta: { role: ['admin'], title: '订单管理', noCache: true }
  },
  {
    path: '/operation/order/createOrder', icon: 'QQ', name: '创建运单', component: _import('operation/order/createOrder/index'), meta: { role: ['admin'], title: '创建运单', noCache: true }
  },
  {
    path: '/operation/order/pickClip', icon: 'QQ', name: '挑单夹', component: _import('operation/order/pickClip/index'), meta: { role: ['admin'], title: '挑单夹', noCache: true }
  }]
}
