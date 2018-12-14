<template>
  <div class="accountsReceivable-manager tab-wrapper">
    <div class="eltab clearfix">
      <el-badge :value="counts.allFeeCount" class="item" v-has:FINANCE_RECLIST1>
        <router-link to="/finance/accountsReceivable/all" class="tab-label">全部</router-link>
      </el-badge>
      <el-badge :value="counts.nowPayFeeCount" class="item" v-has:FINANCE_RECLIST2>
        <router-link to="/finance/accountsReceivable/cash" class="tab-label">现付</router-link>
      </el-badge>
      <el-badge :value="counts.arrivepayFeeCount" class="item" v-has:FINANCE_RECLIST3>
        <router-link to="/finance/accountsReceivable/arrive" class="tab-label">到付</router-link>
      </el-badge>
      <el-badge :value="counts.receiptpayFeeCount" class="item" v-has:FINANCE_RECLIST4>
        <router-link to="/finance/accountsReceivable/receipt" class="tab-label">回单付</router-link>
      </el-badge>
      <el-badge :value="counts.monthpayFeeCount" class="item" v-has:FINANCE_RECLIST5>
        <router-link to="/finance/accountsReceivable/month" class="tab-label">月结</router-link>
      </el-badge>
      <el-badge :value="counts.changeFeeCount" class="item" v-has:FINANCE_RECLIST6>
        <router-link to="/finance/accountsReceivable/abnormal" class="tab-label">异动费用</router-link>
      </el-badge>
      <el-badge :value="counts.handleFee" class="item" v-has:PAY_HANDLING_REC>
        <router-link to="/finance/accountsReceivable/handleFee" class="tab-label">操作费核销</router-link>
      </el-badge>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { getListTotal } from '@/api/finance/accountsReceivable'

export default {
  name: 'accountsReceivable',
  data() {
    return {
      counts: {
        'allFeeCount': '',
        'nowPayFeeCount': '',
        'arrivepayFeeCount': '',
        'receiptpayFeeCount': '',
        'monthpayFeeCount': '',
        'changeFeeCount': '',
        'handleFee': ''
      }
    }
  },
  mounted() {
    this.getTotalCount()
  },
  methods: {
    getTotalCount() {
      return getListTotal().then(res => {
        this.counts = res.data
      })
    }
  }
}

</script>
