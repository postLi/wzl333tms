import Vue from 'vue'
import {
  mapGetters
} from 'vuex'
import {
  eventBus
} from '@/eventBus'
import {
  keepNumber,
  keepNumberAndPoint,
  cacheDEVInfo,
  handleErrorMsg,
  objectMerge2
} from '@/utils/'
import {
  getToken
} from '@/utils/auth'
import {
  getOrgName
} from '@/api/company/employeeManage'

Vue.mixin({
  activated() {
    // console.log('this.$options.name:', this.$options.name)
    const a = this.$store.state.app.listUpdateState[this.$options.name]
    if (a) {
      this.fetchData && this.fetchData()
      this.$store.commit('DISABLED_LIST_STATE', this.$options.name)
    }
  },
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
    },
    _processSearch(obj, callback) {
      // queryString 输入框值
      // nextTime 时间值
      obj.nextTime = obj.nextTime || 300
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (obj.queryString) {
        this.timer = setTimeout(() => {
          callback()
        }, obj.nextTime)
      } else {
        callback()
      }
    },
    _rowStyleAccounts ({row, index}, prop='totalStatusCn',bgcolr="#c0ffc0", status='已核销' ) {
      return {
        'background-color': row[prop] === status ? bgcolr : ''
      }
    },
    _checkExperience(row, type) { // 判断是否体验账号
      const isUser = type === 'username'
      // 判断当前环境是否体验环境
      let flag = false // true-体验环境 false-非体验环境， 默认非体验环境
      if (sessionStorage.getItem('TMS_experience_system')) {
        flag = sessionStorage.getItem('TMS_experience_system') === 'yes'
      }
      // type: 'username'-判断登录账号，'network'-判断网点名
      if (flag) {
        const defaults = objectMerge2([], isUser ? this.$const.EXPERIENCE_USERNAME : this.$const.EXPERIENCE_NETWORK)
        const reg = defaults.filter(el => el === (isUser ? row.username : row.orgName))
        if (reg.length) {
          const msg = isUser ? '员工' : '网点'
          this.$message.info('默认' + msg + '不可修改及删除~')
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }
  }
  /* ,

    methods: {
      ...mapActions([
        '$getUserInfo',
        '$setMenuList'
      ])
    } */
})
