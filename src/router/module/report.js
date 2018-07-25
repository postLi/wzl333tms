import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/report',
  component: Layout,
  redirect: '/report/settleRecordTotal',
  icon: 'baobiao',
  name: '报表管理',
  noDropdown: false,
  children: [
    { path: '/report/settleRecordTotal', icon: 'information', hidden: false, name: '应收应付汇总表', component: _import('report/settleRecordTotal/index'), meta: { title: '应收应付汇总表', noCache: true }},
    { path: '/report/turnoverDaily', icon: 'information', hidden: false, name: '营业额日报表', component: _import('report/turnoverDaily/index'), meta: { title: '营业额日报表', noCache: true }},
    { path: '/report/turnoverTotal', icon: 'information', hidden: false, name: '营业额汇总表', component: _import('report/turnoverTotal/index'), meta: { title: '营业额汇总表', noCache: true }},
    { path: '/report/operation', icon: 'information', hidden: false, name: '营运统计分析', component: _import('report/operation/index'), meta: { title: '运营统计分析', noCache: true }},
    { path: '/report/incomeTotal', icon: 'information', hidden: false, name: '收入统计', component: _import('report/incomeTotal/index'), meta: { title: '收入统计', noCache: true }}
  ]
}
