import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/order',
  component: Layout,
  redirect: '/order/index',
  icon: 'tubiao',
  name: '运单管理',
  noDropdown: false,
  children: [{
    path: '/order/index', icon: 'QQ', name: '运单管理', component: _import('order/index'), meta: { role: ['admin'], title: '运单管理', noCache: true }
  }]
}
