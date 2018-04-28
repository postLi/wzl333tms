import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/operation',
  component: Layout,
  redirect: '/operation/index',
  icon: 'tubiao',
  name: '运营管理',
  noDropdown: true,
  children: [{
    path: '/operation/index', icon: 'quanxian', name: '运营管理', component: _import('table/index'), meta: { role: ['admin'], title: '运营管理', noCache: true }
  }]
}
