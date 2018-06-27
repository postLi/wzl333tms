import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken, removeToken } from '@/utils/auth' // 验权

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  /* must call `next` */
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 如果没有当前角色权限信息，则请求获取
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.data.rolesIdList
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        }).catch(err => {
          removeToken()
          next({ path: '/login', query: {
            tourl: to.fullPath
          }})
        })
      } else {
        window.document.title = (to.meta.title || to.name) + ' - 安发TMS管理系统'
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login', query: {
        tourl: to.fullPath
      }})
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
