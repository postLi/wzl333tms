import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/finance',
  component: Layout,
  redirect: '/finance/index',
  name: '财务管理',
  icon: 'caiwu',
  children: [
        { path: '/finance/index', icon: 'information', hidden: true, name: '财务中心', component: _import('finance/index'), meta: { title: '财务中心', noCache: true }},
        { path: '/finance/FinancialProcesses', icon: 'information', hidden: false, name: '财务流程', component: _import('finance/FinancialProcesses/index'), meta: { title: '财务流程', noCache: true }},
        { path: '/finance/WriteOff', icon: 'information', hidden: false, name: '核销管理', component: _import('finance/WriteOff/index'), meta: { title: '核销管理', noCache: true }}
  ]
}
