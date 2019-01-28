<template>
  <div class="customer-manager tab-wrapper tab-wrapper-100">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
import batchShort from './batchShort' // 短驳费
import batchDeliver from './batchDeliver' // 送货费
import batchInsurance from './batchInsurance' // 整车保险费
import batchStationLoad from './batchStationLoad' // 发站装卸费
import batchStationOther from './batchStationOther' // 发站其他费
import batchArriveLoad from './batchArrivalLoad' // 到站装卸费
import batchArrivalOther from './batchArrivalOther' // 到站其他费
import batchTruckAll from './batchTruckAll' // 到车汇总
import batchArrivalAll from './batchArrivalAll' // 发车汇总
import waybillKickback from './waybillKickback' // 回扣
import waybillTicket from './waybillTicket' // 单票提货费
import waybillOther from './waybillOther' // 其他费用支出
import waybillTransfer from './waybillTransfer' // 中转费
import waybillAbnormal from './waybillAbnormal' // 异常理赔
import waybillUnusual from './waybillUnusual' // 异动费用
import waybillTerminal from './waybillTerminal' // 终端送货费
import handleFee from './handleFee' // 操作费核销
export default {
  name: 'accountsLoad',
  components: {
    batchShort,
    batchDeliver,
    batchInsurance,
    batchStationLoad,
    batchStationOther,
    batchArriveLoad,
    batchArrivalOther,
    batchArrivalAll,
    batchTruckAll,
    waybillKickback,
    waybillTicket,
    waybillOther,
    waybillTransfer,
    waybillAbnormal,
    waybillUnusual,
    waybillTerminal,
    handleFee
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    console.log('mountedmountedmounted2222222')
  },
  data() {
    return {
      pageNameList: {
        'batchShort': '短驳费核销',
        'batchDeliver': '送货费核销',
        'batchInsurance': '整车保险费核销',
        'batchStationLoad': '发站装卸费',
        'batchStationOther': '发站其他费',
        'batchArriveLoad': '到站装卸费',
        'batchArrivalOther': '到站其他费',
        'batchArrivalAll': '发车汇总',
        'batchTruckAll': '到车汇总',
        'waybillKickback': '回扣',
        'waybillTicket': '单票提货费',
        'waybillOther': '其他费用支出',
        'waybillTransfer': '中转费',
        'waybillAbnormal': '异常理赔',
        'waybillUnusual': '异动费用',
        'waybillTerminal': '终端送货费',
        'handleFee': '操作费核销',
      }
    }
  },
  computed: {
    parentPage() {
      return this.$route.query.currentPage
    },
    component() {
      return this.$route.query.currentPage
    }
  }
}

</script>
