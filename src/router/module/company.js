import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)

/**
 * 配置说明
 * icon 图标名称，对应src/icon/svg下的图标名字
 * hidden 是否隐藏不显示
 * meta 路由相关信息 ： stitle为边栏折叠时显示， noCache是否加入到路由的缓存列表里， istab 是否为页面内的tab切换
 */
export default {
  path: '/company',
  component: Layout,
  redirect: '/company/groupManage',
  name: '公司管理首页',
  meta: {
    title: '公司管理', code: 'SYSTEM'
  },
  icon: 'gongsiguanli',
  children: [{
    path: '/company/index',
    icon: 'information',
    hidden: true,
    name: '公司管理',
    component: _import('company/index'),
    meta: { title: '公司管理', stitle: '公司', noCache: true }
  },
  {
    path: '/company/groupManage',
    icon: 'zuzhijiagou',
    hidden: false,
    name: 'groupManage',
    component: _import('company/groupManage/index'),
    meta: { title: '网点管理', stitle: '网点', noCache: false, 'code': 'ORGTREELIST' }
  },
  {
    path: '/company/permissionManage',
    icon: 'quanxianguanli',
    hidden: false,
    name: '角色管理',
    component: _import('company/permissionManage/index'),
    meta: { title: '角色管理', stitle: '角色', noCache: false, 'code': 'PERMISSIONLIST' }
  },
  {
    path: '/company/employeeManage',
    icon: 'yuangongguanli',
    hidden: false,
    name: 'employeeManage',
    component: _import('company/employeeManage/index'),
    meta: { title: '员工管理', stitle: '员工', noCache: false, 'code': 'USERLIST' }
  },
  {
    path: '/company/customerManage',
    icon: 'kehuguanli',
    hidden: false,
    name: 'customerManage',
    component: _import('company/customerManage/index'),
    redirect: '/company/customerManage/sender',
    meta: { title: '客户管理', stitle: '客户', noCache: false, 'code': 'CUSTOMELIST' },
    children: [{
      path: '/company/customerManage/sender',
      icon: 'QQ',
      name: '发货人',
      component: _import('company/customerManage/sender'),
      meta: { role: ['admin'], ptitle: '客户管理', title: '发货人', noCache: true, istab: true, code: 'CUSTOMELIST_SENDER' }
    },
    {
      path: '/company/customerManage/receiver',
      icon: 'QQ',
      name: '收货人',
      component: _import('company/customerManage/receiver'),
      meta: { role: ['admin'], ptitle: '客户管理', title: '收货人', noCache: true, istab: true, code: 'CUSTOMELIST_REVER' }
    }
    ]
      /* children: [{ path: '/company/customerManage/sender', hidden: false, name: '发货人', component: _import('company/customerManage/sender/index'), meta: { title: '发货人', noCache: true }},
      { path: '/company/customerManage/receiver', hidden: false, name: '收货人', component: _import('company/customerManage/receiver/index'), meta: { title: '收货人', noCache: true }}] */
  },
  {
    path: '/company/driverManage',
    icon: 'sijiguanli',
    hidden: false,
    name: 'driverManage',
    component: _import('company/driverManage/index'),
    meta: { title: '司机管理', stitle: '司机', noCache: false, 'code': 'DRIVERLIST' }
  },
  {
    path: '/company/trunkManage',
    icon: 'cheliangguanli',
    hidden: false,
    name: 'trunkManage',
    component: _import('company/trunkManage/index'),
    meta: { title: '车辆管理', stitle: '车辆', noCache: false, 'code': 'TRUNKLIST' }
  },
  {
    path: '/company/carrierManage',
    icon: 'chengyunshang',
    hidden: false,
    name: 'carrierManage',
    component: _import('company/carrierManage/index'),
    meta: { title: '承运商管理', stitle: '承运商', noCache: false, 'code': 'CARRIERLIST' }
  },
    { path: '/company/systemSetup', icon: 'xitongshezhi', hidden: false, name: 'systemSetup', component: _import('company/systemSetup/index'), meta: { title: '系统设置', stitle: '设置', noCache: false, 'code': 'SETTING' }},
  {
    path: '/company/printManage',
    icon: 'dayin',
    hidden: true,
    name: '打印模版管理',
    component: _import('company/printManage/index'),
    meta: { title: '打印模版管理', stitle: '打印', noCache: true }
  }
  ]
}
