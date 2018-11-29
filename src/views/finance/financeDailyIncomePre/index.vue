<template>
  <!-- 记收入 -->
  <div class="fee-steup" v-loading="loading">
    <div class="fee-steup-form">
      <!-- 穿梭框 -->
      <div class="fee_btn_transferTable tableItem">
        <!-- 操作按钮区 -->
        <div class="fee_btn_boxs">
          <el-button :size="btnsize" plain type="success" @click="doAction('count')" icon="el-icon-date">智能结算</el-button>
          <el-button :size="btnsize" plain type="primary" @click="doAction('savePrint')" icon="el-icon-printer">保存并打印</el-button>
          <el-button :size="btnsize" plain type="primary" @click="doAction('save')" icon="el-icon-document">保存</el-button>
          <el-button :size="btnsize" plain type="warning" @click="doAction('cancel')" icon="el-icon-circle-close-outline">取消</el-button>
        </div>
        <!-- 穿梭框 -->
        <dataTable @loadTable="getLoadTable" :orgId="getRouteInfo" :componentKey="tableKey" :countNum="countNum" :isModify="isEdit"  @feeName="getFeeName" :countSuccessList="countSuccessList"></dataTable>
        <!-- 智能结算弹出框 -->
        <Count :popVisible="countVisible" @close="countVisible = false" @success="countSuccess"></Count>
       <!-- 核销凭证 -->
      <Voucher :popVisible="popVisibleDialog" :info="infoTable" @close="closeDialog" :orgId="getRouteInfo" @success="submitVoucher" :btnLoading="btnLoading"></Voucher>
      </div>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { objectMerge2, parseTime, tmsMath } from '@/utils/index'
import { getSystemTime } from '@/api/common'
import dataTable from './components/dataTable'
import { getOrderList, postAddIncome } from '@/api/finance/financeDaily'
import Count from './components/count'
import Voucher from '@/components/voucher'
export default {
  name: 'settleLogIncome',
  components: {
    dataTable,
    Count,
    Voucher
  },
  data() {
    return {
      popVisibleDialog: false,
      paymentsType: 0, // 收支类型, 0 收入, 1 支出
      loading: false,
      countVisible: false, // 弹出框默认隐藏
      feeInfo: 'feeInfoOne',
      settlementId: 178, // 178-运单结算 179-干线批次结算 180-短驳结算 181-送货结算
      btnsize: 'mini',
      countSuccessList: [],
      isEdit: false,
      loadTable: [],
      countNum: 0,
      tableKey: 0,
      infoTable: {
        amount: 0,
        orderList: []
      },
      feeName: {
        arrPayName: [],
        arrNoPayName: [],
        arrPayNameActual: [],
        arrhadPayName: []
      },
      btnLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    getRouteInfo() {
      return this.$route.query.orgId ? this.$route.query.orgId : this.otherinfo.orgid
    }
  },
  methods: {
    doAction(type) {
      switch (type) {
        case 'save': // 保存
          this.save()
          break
        case 'cancel': // 取消
          this.cancel()
          break
        case 'savePrint': // 保存并打印
          break
        case 'count':
          this.countVisible = true
          break
      }
    },
    setData() { // 设置传给后台的数据结构
      this.loadTable.forEach(e => {
        this.feeName.arrPayName.forEach((el, index) => {
          e[el] = e[this.feeName.arrPayNameActual[index]]
        })
      })
    },
    save() {
      if (this.loadTable.length < 1) {
        this.$message({ type: 'warning', message: '右边表格不能为空！' })
        return false
      }
      this.popVisibleDialog = true
    },
    cancel() {
      this.$confirm('确定要取消记收入操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          path: './financeDaily',
          query: {
            pageKey: new Date().getTime()
          }
        })
      })
    },
    getFeeName(obj) {
      this.feeName = Object.assign([], obj)
    },
    getLoadTable(obj) { // 获取右边合计总数 = 收入金额
      let amount = 0
      this.infoTable = this.$options.data().infoTable
      this.loadTable = Object.assign([], obj)
      this.loadTable.forEach((e, index) => {
        amount = tmsMath._add(amount, e.shipFeeTotalActual)
      })
      this.infoTable = {
        amount: amount,
        orderList: this.loadTable
      }
    },
    countSuccess(list) {
      this.countSuccessList = Object.assign([], list.info)
      this.countNum = list.count
    },
    closeDialog() {
      this.popVisibleDialog = false
    },
    submitVoucher (value) {
      let obj = Object.assign({}, value)
      this.$set(obj, 'paymentsType', this.paymentsType)
      this.$set(obj, 'orgId', this.$route.query.orgId)

      console.log('submitVoucher', value)
      this.loading = true
      this.btnLoading = true
      postAddIncome(obj).then(data => {
          this.popVisibleDialog = false
          this.$message.success('记收入成功！')
          this.tableKey = new Date().getTime()
          this.$router.push({ path: './financeDaily', query:{ pageKey: new Date().getTime()  } })
          this.loading = false
          this.btnLoading = false
      })
      .catch(err => {
        this.loading = false
        this.btnLoading = false
        this._handlerCatchMsg(err)
      })
    }
  }
}

</script>
<style lang="scss">
.fee-steup {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  .fee_btn_transferTable {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }
  .fee_btn_boxs {
    position: relative;
    top: 18px;
    right: 10px;
    z-index: 33;
    text-align: right;
    height: 0;
  }
  .fee-steup-form {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 10px 0 10px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    .el-collapse {
      border: 2px solid #cdf;
    }
    .el-collapse-item__content {
      padding: 0;
    }
    .el-collapse-item__header {
      border-bottom: 2px solid #cdf;
      background-color: #FFFFFF;
      padding: 0 0 0 20px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #333;
      position: relative;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .el-collapse-item__arrow {
      position: absolute;
      left: 20px;
      top: 5px;
    }
    .feeFrom-type-baseInfo {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: -10px;
      .el-input {
        width: 220px;
      }
    }
  }
}

</style>
