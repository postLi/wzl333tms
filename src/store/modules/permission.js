import {
  asyncRouterMap,
  constantRouterMap
} from '@/router/index'
const checkRouterList = []
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.code) {
    // if (route.path.indexOf('/finance/financeInfo') !== -1 || route.path.indexOf('/finance/certificationAudit') !== -1) {
    //   if (userInfo.systemSetup.financeSetting.voucher && userInfo.systemSetup.financeSetting.voucher !== '1') {
    //     route.hidden = true
    //   }
    // }
    const flag = roles.some(role => route.meta.code === role.code)
    if (!flag) {
      checkRouterList.push({
        code: route.meta.code,
        title: route.meta.title || ''
      })
    }

    return flag
  } else {
    // console.log(route, route.name, route.path)
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
        if (process.NODE_ENV !== 'production') {
          // 如果是在非正式环境下，检测路由信息是否正常
          console.info('不在权限表里的路由信息：')
          console.table(checkRouterList)
          const routerlists = []
          // 检索所有的路由信息列出来
          roles.forEach(el => {
            if (el.type === '0') {
              routerlists.push(el)
            }
          })
          console.info('该角色下的所有路由信息：')
          console.table(routerlists)
        }
        // 修正首页权限问题
        let homePage = accessedRouters.filter(el => el.meta && el.meta.code === 'HOME_PAGE')
        if (homePage.length) {
          // 如果找到，将redirect指向第一个元素
          const el = homePage[0]
          el.redirect = el.children[0] ? el.children[0].path : ''
        } else {
          // 如果找不到
          homePage = asyncRouterMap.filter(el => el.meta && el.meta.code === 'HOME_PAGE')
          const el = homePage[0]
          el.redirect = '/flows'
          el.children = el.children.filter(el => !el.meta.code)
          accessedRouters.unshift(el)
        }

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
          if (el.meta && el.meta.code === 'REPORT') {
            let flag = true
            el.children.map(ee => {
              // console.log('ee:', ee.meta.code, ee.path)
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
