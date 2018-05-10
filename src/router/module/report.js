import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/report',
  component: Layout,
  redirect: '/report/index',
  icon: 'baobiao',
  name: '报表管理',
  noDropdown: false,
  children: [{
    path: '/report/index', icon: 'baobiao', name: '报表管理', component: _import('report/index'), meta: { role: ['admin'], title: '报表管理', noCache: true }
  }
  ]
}
