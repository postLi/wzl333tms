<template>
  <div class="customer-manager">
    <div class="eltab clearfix">
      <!-- 在途跟踪 -->
      <span @click="component = 'artery'" class="tab-label" 
      :class="{'active-tab': component.indexOf('artery')!==-1}">干线跟踪</span>
      <span @click="component = 'short'" class="tab-label" 
      :class="{'active-tab': component.indexOf('short')!==-1}">短驳跟踪</span>
      <span @click="component = 'deliver'" class="tab-label" 
      :class="{'active-tab': component.indexOf('deliver')!==-1}">送货跟踪</span>
      <span @click="component = 'transfer'" class="tab-label" 
      :class="{'active-tab': component.indexOf('transfer')!==-1}">中转跟踪</span>
    </div>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import artery from './artery'
import short from './short'
import deliver from './deliver'
import transfer from './transfer'
export default {
  components: {
    artery,
    short,
    deliver,
    transfer
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      component: 'artery'
    }
  },
  mounted () {
    this.isTransfer()
  },
  methods: {
    isTransfer () {
      if (this.$route.query.transfer) {
        this.component = 'transfer'
      } else {
        this.component = 'artery'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.customer-manager {
  height: 100%;
  padding-top: 12px;
  .eltab {
    width: 100%;
    height: 32px;
    line-height: 30px;
    border-bottom: 1px solid #91cbf7;
  }
  .tab-label:first-child {
    margin-left: 1px;
    border-left-width: 1px;
  }
  .tab-label {
    float: left;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 3px 3px 0px 0px;
    border: solid 1px #d2d2d2;
    font-size: 14px;
    border-left-width: 0;
    border-bottom: 1px solid #3e9ff1;
    position: relative;
    top: 0px;
    cursor: pointer;

    &:hover {
      background: #ffffee;
    }
  }
  .active-tab {
    color: #3e9ff1;
    border-color: #3e9ff1;
    border-bottom-color: #fff;
    z-index: 2;
    left: -1px;
    top: -1px;
    border-left: 1px solid #3e9ff1;
    border-top-width: 2px;
  }
  .tab-content {
    width: 100%;
    padding: 0 20px;
  }
}

</style>
