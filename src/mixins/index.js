import Vue from 'vue'
import { mapGetters } from 'vuex'
import { eventBus } from '@/eventBus'
import { keepNumber, keepNumberAndPoint, cacheDEVInfo, handleErrorMsg } from '@/utils/'
import { getToken } from '@/utils/auth'
import { getOrgName } from '@/api/company/employeeManage'

Vue.mixin({
  data() {
    return {
      access_token: getToken()
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
  },
  // beforeRouteLeave: function(to, from, next) {
  //   console.group('=====minis.js beforeRouteLeave===========:')
  //   console.warn('minis beforeRouteLeave to:\n', to)
  //   console.warn('minis beforeRouteLeave from:\n', from)
  //   console.warn('minis this.$vnode:\n', this.$vnode)
  //   console.warn('minis this.$vnode.componentOptions:\n', this.$vnode.componentOptions)
  //   console.warn('minis this.$vnode 当前是否keepAlive:', this.$vnode.data.keepAlive)
  //   console.groupEnd('=====minis beforeRouteLeave end===========:')
  //   next()
  //   // if (from && from.meta.rank && to.meta.rank && from.meta.rank > to.meta.rank) { // 此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
  //   //   if (this.$vnode && this.$vnode.data.keepAlive) {
  //   //     if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
  //   //       if (this.$vnode.componentOptions) {
  //   //         const key = this.$vnode.key == null
  //   //                             ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
  //   //                             : this.$vnode.key
  //   //         const cache = this.$vnode.parent.componentInstance.cache
  //   //         const keys = this.$vnode.parent.componentInstance.keys
  //   //         if (cache[key]) {
  //   //           if (keys.length) {
  //   //             const index = keys.indexOf(key)
  //   //             console.log('key=======', key, keys)
  //   //             if (index > -1) {
  //   //               keys.splice(index, 1)
  //   //             }
  //   //           }
  //   //           delete cache[key]
  //   //         }
  //   //       }
  //   //     }
  //   //   }
  //   //   this.$destroy()
  //   // }
  //   // next()
  // },
  methods: {
    _getOrgName(id) {
      return getOrgName(id)
    },
    _processTableSlot(scope, prop) {
      if (prop === 'shipFromCityName' || prop === 'shipToCityName') {
        const addr = scope.row[prop] || ''
        const addrArr = addr.split(',')
        return addrArr[2] || addrArr[1] || addrArr[0] || ''
      }
      return scope.row[prop]
    },
    _keepNumber(event) {
      return keepNumber.call(event.target, event)
    },
    _keepNumberAndPoint(event) {
      return keepNumberAndPoint.call(event.target, event)
    },
    // a 总数； b 已结；c 未结；r 具体项
    _setTextColor(a, b, c, d) {
      if (b && (b !== a)) {
        // 总数不等于已结
        return '<span class="imp">' + d + '</span>'
      } else {
        return d
      }
    },
    _handlerCatchMsg(err, premsg = '') {
      handleErrorMsg(err, premsg)
    }
  }/* ,

  methods: {
    ...mapActions([
      '$getUserInfo',
      '$setMenuList'
    ])
  } */
})
