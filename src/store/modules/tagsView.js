const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      // 判断是否已经添加过
      // 判断是否需要新开一个tab，通过参数tab设置
      if (view.query.tab) {
        if (state.visitedViews.some(v => v.fullPath === view.fullPath)) return
      } else {
        if (state.visitedViews.some(v => v.path === view.path)) {
          // 更新fullpath值
          state.visitedViews.forEach(v => {
            if (v.path === view.path) {
              v.fullPath = view.fullPath
            }
          })
          return
        }
      }
      // 列表里没有该记录，查找本地存储，如果有记录需要先清除
      if (sessionStorage.getItem(encodeURIComponent(view.fullPath))) {
        sessionStorage.setItem(encodeURIComponent(view.fullPath), '')
      }

      // 判断是否需要缓存
      let shouldCache = !view.meta.noCache
      let cacheName = view.name

      // console.log('add view:', view.query.tab, view.name)
      // 针对tab子页面
      if (view.meta.istab && state.visitedViews.some(v => v.title === view.meta.ptitle)) {
        // 如果已存在相同的父级，则更新其链接，不新增tab
        state.visitedViews.forEach(ele => {
          if (ele.title === view.meta.ptitle) {
            /* // 1.清理cache里的name
            const i = state.cachedViews.indexOf(ele.name)
            state.cachedViews.splice(i, 1)

            // 2.更新父级view的name值，以便清除
            ele.name = view.name */

            ele.path = view.path
            ele.fullPath = view.fullPath
          }
        })
      } else {
        // 针对tab页面进行特殊处理，取其父级的设置值
        if (view.meta.pname) {
          cacheName = view.meta.pname
          shouldCache = true
        } else if (view.meta.istab && view.matched) {
          // matched 将会是一个包含从上到下的所有对象，所以取最后一个值即为当前路由？
          let len = view.matched.length
          let current = view.matched[len - 1]
          if (current && current.parent) {
            cacheName = current.parent.name || cacheName
            shouldCache = !current.parent.meta.noCache
          }
        }

        state.visitedViews.push({
          name: cacheName || view.query.tab,
          path: view.path,
          fullPath: view.fullPath,
          tab: view.query.tab || '',
          lock: false,
          title: view.query.tab || view.meta.ptitle || view.meta.title || '未命名',
          istab: view.meta.istab
        })
      }

      // 如果需要缓存页面
      if (shouldCache) {
        if (state.cachedViews.indexOf(cacheName) === -1) {
          state.cachedViews.push(cacheName)
        }
        // state.cachedViews.push(view.fullPath)
      }
      console.log('state.cachedViews:', state.cachedViews)
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.fullPath === view.fullPath) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          // 全部遍历删除，如果有相同name值也可以正确处理好...y
          // break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      // 针对首页特殊处理
      if (view.name === 'dashboard') {
        state.visitedViews = []
      }
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.fullPath === view.fullPath) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          // i为字符串而非索引位置信息，所以这一段删除有问题...
          // state.cachedViews = state.cachedViews.slice(index, i + 1)

          state.cachedViews = state.cachedViews.slice(index, index + 1)
        }
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
      state.cachedViews = []
    }
  },
  actions: {
    addVisitedViews({
      commit
    }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({
      commit,
      state
    }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({
      commit,
      state
    }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    }
  }
}

export default tagsView
