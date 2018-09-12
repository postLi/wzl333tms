import Vue from 'vue'
import { mapGetters } from 'vuex'
import { eventBus } from '@/eventBus'
import { keepNumber, keepNumberAndPoint } from '@/utils/'

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
  },
  methods: {
    keepNumber(event) {
      return keepNumber.call(event.target, event)
    },
    keepNumberAndPoint(event) {
      return keepNumberAndPoint.call(event.target, event)
    }
  }/* ,

  methods: {
    ...mapActions([
      '$getUserInfo',
      '$setMenuList'
    ])
  } */
})
