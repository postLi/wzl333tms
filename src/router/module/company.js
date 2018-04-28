import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/company',
  component: Layout,
  redirect: 'noredirect',
  name: '公司管理',
  icon: 'zonghe',
  children: [
      { path: 'myinfo', icon: 'information', hidden: false, name: '个人中心', component: _import('company/myinfo/index'), meta: { title: '个人中心', noCache: true }}
  ]
}
