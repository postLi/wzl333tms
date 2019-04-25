import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/report',
  component: Layout,
  redirect: '/report/settleRecordTotal',
  icon: 'baobiao',
  name: '报表管理首页',
  noDropdown: false,
  meta: {
    title: '报表管理', code: 'REPORT'
  },
  children: [{
    path: '/report/settleRecordTotal',
    icon: 'baobiao1_yingshouyfhzb',
    hidden: false,
    name: 'settleRecordTotal',
    component: _import('report/settleRecordTotal/index'),
    meta: { title: '应收应付汇总表', noCache: false, code: 'FINANCE_FeeAggregation' }
  },
  {
    path: '/report/turnoverDaily',
    icon: 'baobiao3_yingyeerbb',
    hidden: false,
    name: 'turnoverDaily',
    component: _import('report/turnoverDaily/index'),
    meta: { title: '营业额日报表', noCache: false, code: 'FINANCE_DATEREPORT' }
  },
  {
    path: '/report/turnoverTotal',
    icon: 'baobiao2_yingyeehzb',
    hidden: false,
    name: 'turnoverTotal',
    component: _import('report/turnoverTotal/index'),
    meta: { title: '营业额汇总表', noCache: false, code: 'FINANCE_TURNOVERREPORT' }
  },
  {
    path: '/report/operation',
    icon: 'baobiao5_yunyingtjfx',
    hidden: false,
    name: 'findOperationReport',
    component: _import('report/operation/index'),
    meta: { title: '营运统计分析', noCache: false, code: 'FINANCE_findOperationReport' }
  },
  {
    path: '/report/incomeTotal',
    icon: 'baobiao7_shourutjt',
    hidden: false,
    name: 'incomeTotal',
    component: _import('report/incomeTotal/index'),
    meta: { title: '收入统计', noCache: false, code: 'FINANCE_findDetail' }
  },
  {
    path: '/report/crossReport',
    icon: 'baobiao4_huosunhcbb',
    hidden: false,
    name: 'crossReport',
    component: _import('report/crossReport/index'),
    meta: { title: '网点业务费用对比', noCache: false, code: 'report1' }
  },
  {
    path: '/report/crossReport2',
    icon: 'baobiao6_huoyuantj',
    hidden: false,
    name: 'crossReport2',
    component: _import('report/crossReport2/index'),
    meta: { title: '网点年度费用对比', noCache: false, code: 'report2' }
  },
  {
    path: '/report/crossReport3',
    icon: 'yygl1_dingdan',
    hidden: false,
    name: 'crossReport3',
    component: _import('report/crossReport3/index'),
    meta: { title: '网点业务类型', noCache: false, code: 'report3' }
  }
  ]
}
