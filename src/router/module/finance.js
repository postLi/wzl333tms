import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/finance',
  component: Layout,
  redirect: 'noredirect',
  name: '财务管理',
  icon: 'zonghe',
  children: [
      { path: 'index', icon: 'information', hidden: false, name: '财务中心', component: _import('finance/index'), meta: { title: '财务中心', noCache: true }}
  ]
}
