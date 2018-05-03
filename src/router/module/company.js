import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/company',
  component: Layout,
  redirect: '/company/index',
  name: '公司管理',
  icon: 'zonghe',
  children: [
    { path: '/company/index', icon: 'information', hidden: false, name: '公司管理', component: _import('company/index'), meta: { title: '公司管理', noCache: true }},
    { path: '/company/myinfo', icon: 'information', hidden: false, name: '个人中心', component: _import('company/myinfo/index'), meta: { title: '个人中心', noCache: true }},
    { path: '/company/systemSetup', icon: 'information', hidden: false, name: '系统设置', component: _import('company/systemSetup/index'), meta: { title: '系统设置', noCache: true }},
    { path: '/company/groupManage', icon: 'information', hidden: false, name: '网点管理', component: _import('company/groupManage/index'), meta: { title: '网点管理', noCache: true },
      children: [
        {
          path: '/company/groupManage/addGroup', name: '新增网点', component: _import('company/groupManage/addGroup'), meta: { role: ['admin'], title: '新增网点', noCache: true }
        }
      ]
    },
    { path: '/company/permissionManage', icon: 'information', hidden: false, name: '权限管理', component: _import('company/permissionManage/index'), meta: { title: '权限管理', noCache: true }},
    {
      path: '/company/employeeManage',
      icon: 'information',
      hidden: false,
      name: '员工管理',
      component: _import('company/employeeManage/index'),
      meta: { title: '员工管理', noCache: true }
    }
  ]
}
