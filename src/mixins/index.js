import Vue from 'vue'
import { mapGetters } from 'vuex'

Vue.mixin({
  data() {
    return {
    }
  },

  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  }/* ,

  methods: {
    ...mapActions([
      '$getUserInfo',
      '$setMenuList'
    ])
  } */
})
