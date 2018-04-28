import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/table',
  component: Layout,
  redirect: '/table/index',
  icon: 'tubiao',
  noDropdown: true,
  children: [{
    path: 'index', name: '表格', component: _import('table/index'), meta: { role: ['admin'], title: '表格', noCache: true }
  }]
}
