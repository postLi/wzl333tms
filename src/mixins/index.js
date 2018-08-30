import Vue from 'vue'
import { mapGetters } from 'vuex'
import { eventBus } from '@/eventBus'

Vue.mixin({
  data() {
    return {
    }
  },

  computed: {
    // 用户信息
    ...mapGetters([
      'otherinfo',
      'allRouters'
    ]),
    // 全局的事件分发器
    eventBus() {
      return eventBus
    }
  }/* ,
  methods: {
    // 根据code值返回相关的router
    // 返回项为数组
    GET_ROUTER(code) {
      const routers = this.allRouters
      let res = []
      const findFn = (arr) => {
        let resArr
        const len = arr.length
        for (let i = 0; i < len; i++) {
          // 如果找到就停止遍历
          if (resArr) {
            break
          }
          if (arr[i].meta.code === code) {
            resArr = arr[i]
          } else if (arr[i].children) {
            resArr = findFn(arr[i].children)
          }
        }
        return resArr
      }
      res = findFn(routers) || []
      return res
    }
  } *//* ,

  methods: {
    ...mapActions([
      '$getUserInfo',
      '$setMenuList'
    ])
  } */
})
