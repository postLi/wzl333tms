import { asyncRouterMap, constantRouterMap } from '@/router/index'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.code) {
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
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
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
        console.log('accessedRouters:',accessedRouters)
        accessedRouters.map(el=>{
          if(el.meta && el.meta.code === 'SYSTEM'){
            let flag = true
            el.children.map(ee => {
              if(ee.meta && ee.meta.code && flag){
                if(ee.children.length){
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
    GenerateSidebarRoutes({ commit, state }, data) {
      return new Promise(resolve => {
        const currentRouters = state.routers
        const subRouter = currentRouters.find(route => {
          return route.name === data
        })
        commit('SET_SIDEBAR_ROUTERS', subRouter.children || [])
        resolve()
      })
    }
  }
}

export default permission
