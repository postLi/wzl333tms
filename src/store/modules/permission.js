import {
  asyncRouterMap,
  constantRouterMap
} from '@/router/index'
import {
  getUserInfo
} from '@/utils/auth'


/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  const userInfo = getUserInfo()
  if (route.meta && route.meta.code) {
    // if (route.path.indexOf('/finance/financeInfo') !== -1 || route.path.indexOf('/finance/certificationAudit') !== -1) {
    //   if (userInfo.systemSetup.financeSetting.voucher && userInfo.systemSetup.financeSetting.voucher !== '1') {
    //     route.hidden = true
    //   }
    // }
    return roles.some(role => route.meta.code === role.code)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })

  return accessedRouters
}
console.log('constantRouterMap', constantRouterMap)
const permission = {
  state: {
    routers: constantRouterMap,
    sidebarRouters: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = routers
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        const {
          roles
        } = data
        let accessedRouters
        // 如果是管理员，则给于全部权限
        /* if (roles.indexOf('2') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        } */
        // 暂时给于全部权限，等后台权限体系建立好再对接设置
        // accessedRouters = asyncRouterMap
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        accessedRouters.map(el => {
          if (el.meta && el.meta.code === 'FINANCE') {
            el.children.forEach(ee => {
              if (ee.meta && ee.meta.code) {
                if (ee.children && ee.children.length) {
                  ee.children.map(em => {
                    if (em.meta && em.meta.code) {
                      if (em.children && em.children.length) {
                        em.redirect = em.children[0].path
                      }
                    }
                  })
                }
              }
            })
          }
          if (el.meta && el.meta.code === 'SYSTEM') {
            let flag = true
            el.children.map(ee => {
              if (ee.meta && ee.meta.code && flag) {
                if (ee.children && ee.children.length) {
                  el.redirect = ee.children[0].path
                } else {
                  el.redirect = ee.path
                }
                flag = false
              }
            })
          }
        })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    GenerateSidebarRoutes({
      commit,
      state
    }, data) {
      return new Promise(resolve => {
        const currentRouters = state.routers
        const subRouter = currentRouters.find(route => {
          return route.name === data
        })
        if (subRouter) {
          commit('SET_SIDEBAR_ROUTERS', subRouter.children || [])
        }
        resolve()
      })
    }
  }
}

export default permission