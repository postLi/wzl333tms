import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

// ========================引入各个版块类别================
// 公司
import Company from './module/company'
// 财务
import Finance from './module/finance'
// 客服
import Service from './module/service'
// 运营
import Operation from './module/operation'
// 报表
import Report from './module/report'

// components DEMO
import Components from './module/componentsDemo'

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 * noCache 设定是否被缓存默认为 true
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  /*   {
      component: Layout,
      redirect: '/checklist/index',
      noDropdown: true,
      hidden: false,
      path: '/checklist',
      children: [{
        path: '/checklist/index',
        component: _import('checklist/index'),
        name: 'checklistpage',
        meta: {
          title: '初始化',
          noCache: false
        }
      }]
    }, */
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    noDropdown: true,
    icon: 'shouye',
    // name: '首页',
    name: 'dashboard',
    meta: {
      'code': 'HOME_PAGE'
    },
    hidden: true,
    children: [{
      path: '/dashboard',
      component: _import('html5/html5index'),
      name: 'dashboard',
      icon: 'shouye',
      meta: {
        title: '首页',
        noCache: false,
        'code': 'HOME_PAGE_1',
        'proute': 'dashboard'
      }
    }, {
      path: '/console',
      component: _import('html5/index'),
      name: 'console',
      icon: 'baobiao',
      meta: {
        title: '控制台',
        noCache: false,
        'code': 'HOME_PAGE_1',
        'proute': 'dashboard'
      }
    }, {
      path: '/checklist/index',
      component: _import('checklist/index'),
      name: 'checklistpage',
      icon: 'btn9_huidanhs',
      meta: {
        title: '系统体检',
        noCache: false,
        'proute': 'dashboard'
      }
    }, {
      path: '/flows',
      name: 'flows',
      icon: 'canzhao',
      component: _import('dashboard/index'),
      meta: { title: '流程图', noCache: true, 'code': 'HOME_PAGE_3',
        'proute': 'dashboard' }
    }, {
      path: '/company/myinfo',
      icon: 'information',
      hidden: true,
      name: '个人中心',
      component: _import('company/myinfo/index'),
      meta: { title: '个人中心', noCache: true }
    }]
  }
]

// 用来展示自定义组件、指令、过滤器等
if (process.env.NODE_ENV === 'development') {
  constantRouterMap.push(Components)
}

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  Operation,
  Finance,
  Report,
  Company,
  Service,
  { path: '*', redirect: '/404', hidden: true }
]
