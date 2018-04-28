import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/example',
  component: Layout,
  redirect: 'noredirect',
  name: '实例',
  icon: 'zujian',
  children: [
    { path: 'index', name: '表单', icon: 'zonghe', component: _import('page/form'), meta: { title: '实例', noCache: true },
      children: [{
        path: 'index2', name: '表格2', component: _import('table/index'), meta: { role: ['admin'], title: '表格2', noCache: true }
      }]
    }
  ]
}
