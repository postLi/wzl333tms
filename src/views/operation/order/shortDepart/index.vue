<template>
  <div class="showdepart-manager tab-wrapper" :key="key">
    <div class="eltab clearfix">
      <!-- 短驳管理 -->
      <router-link to="/operation/order/shortDepart/deliver" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('deliver')!==-1}">短驳发车</router-link>
      <router-link to="/operation/order/shortDepart/arrival" tag="span"  class="tab-label" :class="{'active-tab': component.indexOf('arrival')!==-1}">短驳到货</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
      <!-- <component v-bind:is="component"></component> -->
    </keep-alive>
  </div>
</template>
<script>
import arrival from './arrival'
import deliver from './deliver'
export default {
  name: 'shortDepart',
  components: {
    deliver,
    arrival
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'deliver',
      key: 0
    }
  },
  activated() {
    this.setPage()
  },
  watch: {
    $route(){
      if(this.$route.path.indexOf('/operation/order/shortDepart/deliver')!==-1){
        this.component = 'deliver'
      }
      if(this.$route.path.indexOf('/operation/order/shortDepart/arrival')!==-1){
        this.component = 'arrival'
      }
    }
  },
  methods: {
    setPage() {
      if (this.$route.query.tableKey) {
        this.component = 'arrival'
      } else {
        this.component = 'deliver'
      }
    }
  }
}

</script>
