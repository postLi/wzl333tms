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
