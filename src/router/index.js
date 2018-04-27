import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    noDropdown: true,
    icon: 'shouce',
    children: [{
      path: 'dashboard', name: '首页', icon: 'dashboard', component: _import('dashboard/index'),
      meta: { title: '首页', noCache: true }
    }]
  }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/company',
    component: Layout,
    redirect: 'noredirect',
    name: '公司管理',
    icon: 'zonghe',
    children: [
      { path: 'myinfo', icon: 'information', hidden: false, name: '个人中心', component: _import('company/myinfo/index'), meta: { title: '个人中心', noCache: true }}
    ]
  },
  {
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
  },

  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{
      path: 'index', name: '表格', component: _import('table/index'), meta: { role: ['admin'], title: '表格', noCache: true }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]
