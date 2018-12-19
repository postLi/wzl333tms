<template>
  <!-- 记支出 -->
  <div class="fee-steup" v-loading="loading">
    <div class="fee-steup-form">
      <!-- 穿梭框 -->
      <div class="fee_btn_transferTable">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
          <el-tab-pane label="批次收入" name="first">
            <div class="animated fadeInRight tableItem">
              <div class="fee_btn_boxs">
                <el-button :size="btnsize" plain type="success" @click="doAction('countBatch')" icon="el-icon-date">智能核销</el-button>
                <el-button :size="btnsize" plain type="primary" @click="doAction('save')" icon="el-icon-document">保存</el-button>
                <el-button :size="btnsize" plain type="primary" @click="doAction('cancel')" icon="el-icon-circle-close-outline">取消</el-button>
              </div>
              <dataTable @loadTable="getLoadTable" :componentKey="tableKey" :orgId="getRouteInfo" :activeName="activeName" :setLoadTable="setLoadTableList" @setSettlementId="setSettlementId" :isModify="isEdit" @change="getTableChange" :getSettlementId="settlementId" @feeName="getFeeName" :countSuccessList="countSuccessListBatch" :countNum="countNumBatch" :fiOrderType="fiOrderType"></dataTable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="运单收入" name="second">
            <div class="animated fadeInRight tableItem">
              <div class="fee_btn_boxs">
                <el-button :size="btnsize" plain type="success" @click="doAction('countShip')" icon="el-icon-date">智能核销</el-button>
                <el-button :size="btnsize" plain type="primary" @click="doAction('save')" icon="el-icon-document">保存</el-button>
                <el-button :size="btnsize" plain type="primary" @click="doAction('cancel')" icon="el-icon-circle-close-outline">取消</el-button>
              </div>
              <dataTableOrder @loadTable="getLoadTable" :componentKey="tableKey" :orgId="getRouteInfo" :activeName="activeName" :setLoadTable="setLoadTableList" :isModify="isEdit" @change="getTableChange" @feeName="getFeeName" :countSuccessList="countSuccessListShip" :countNum="countNumShip"  :fiOrderType="0"></dataTableOrder>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 智能核销弹出框 -->
      <Count :popVisible="countVisible" @close="countVisible = false" :title="countTitle" :setSettlementId="settlementId" @success="countSuccess" @change="changeFeeIdBatch" 
      :fiOrderType="fiOrderType"></Count>
      <!-- 核销凭证 -->
      <Voucher :popVisible="popVisibleDialog" :info="infoTable" @close="closeDialog" :orgId="getRouteInfo" @success="submitVoucher" :btnLoading="btnLoading"></Voucher>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { objectMerge2, parseTime, tmsMath } from '@/utils/index'
import { postAddIncome, getOrgFirstFinancialWay } from '@/api/finance/financeDaily'
import dataTable from './components/dataTable'
import dataTableOrder from './components/dataTableOrder'
import Count from './components/count'
import Voucher from '@/components/voucher'
export default {
  name: 'settleLogExpandtiure',
  components: {
    dataTable,
    dataTableOrder,
    Count,
    Voucher
  },
  data() {
    return {
      paymentsType: 0, // 收支类型, 0 收入, 1 支出
      loading: false,
      settlementId: '',
      // settlementId: 180, // 178-运单核销 179-干线批次核销 180-短驳核销 181-送货核销
      feeInfo: 'feeInfoOne',
      btnsize: 'mini',
      tableKey: 0,
      formModel: {},
      countTitle: '',
      setLoadTableList: {},
      isEdit: false,
      activeName: 'first',
      addIncomeInfo: {},
      countVisible: false,
      countSuccessListBatch: [],
      countSuccessListShip: [],
      countNumBatch: 0,
      countNumShip: 0,
      feeName: {
        arrPayName: [],
        arrNoPayName: [],
        arrPayNameActual: [],
        arrhadPayName: []
      },
      popVisibleDialog: false,
      infoTable: {
        amount: 0,
        orderList: []
      },
      btnLoading: false,
      fiOrderType: 1  // 财务订单类型 0-运单；1-干线；2-短驳；3-送货
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
  watch: {
    settlementId(newVal) {
      return newVal
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
        case 'countBatch':
          this.countTitle = '批次'
          this.countVisible = true
          break
        case 'countShip':
          this.countTitle = '运单'
          this.countVisible = true
          break
      }
    },
    save() {
      if (this.loadTable.length < 1) {
        this.$message({ type: 'warning', message: '右边表格不能为空！' })
        return false
      }
      this.popVisibleDialog = true
    },
    submitVoucher(value) {
      let obj = Object.assign({}, value)
      this.$set(obj, 'paymentsType', this.paymentsType)
      this.$set(obj, 'orgId', this.$route.query.orgId)

      this.loading = true
      this.btnLoading = true
      if (this.fiOrderType !== null || this.fiOrderType !== undefined) {
        this.$set(obj, 'fiOrderType', this.fiOrderType)
      }
      postAddIncome(obj).then(data => {
          this.popVisibleDialog = false
          this.$message.success('记收入成功！')
          this.tableKey = new Date().getTime()
          this.loading = false
          this.btnLoading = false
          this.eventBus.$emit('closeCurrentView')
          this.$router.push({ path: './financeDaily', query: { pageKey: new Date().getTime() } })
        })
        .catch(err => {
          this.loading = false
          this.btnLoading = false
          this._handlerCatchMsg(err)
        })
    },
    setSettlementId(val) { 
    //             178-运单核销 179-干线批次核销 180-短驳核销 181-送货核销
    // 财务订单类型 0-运单；1-干线；2-短驳；3-送货
      this.settlementId = val
      console.log('setSettlementId::::::', val)
      switch(val) {
        case 178:
          this.fiOrderType = 0
        break
        case 179:
          this.fiOrderType = 1
        break
        case 180:
          this.fiOrderType = 2
        break
        case 181:
          this.fiOrderType = 3
        break
      }
      
    },
    cancel() {
      this.$confirm('确定要取消记收入操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.eventBus.$emit('closeCurrentView')
        this.$router.push({
          path: './financeDaily',
          query: {
            pageKey: new Date().getTime()
          }
        })
      })
    },
    handleClick() {
      console.log('settlementId:::::::::::::::::::::::', this.settlementId)
      if (this.activeName === 'second') {
        this.settlementId = 178
      }else {
        this.settlementId = 179
      }
      switch(this.settlementId) {
        case 178:
          this.fiOrderType = 0
        break
        case 179:
          this.fiOrderType = 1
        break
        case 180:
          this.fiOrderType = 2
        break
        case 181:
          this.fiOrderType = 3
        break
      }
    },
    getLoadTable(obj) {
      let amount = 0
      this.infoTable = this.$options.data().infoTable
      this.loadTable = Object.assign([], obj)
      this.loadTable.forEach((e, index) => {
        if (e.shipFeeTotalActual) {
          amount = tmsMath._add(amount, e.shipFeeTotalActual)
        } else {
          amount = tmsMath._add(amount, e.loadFeeTotalActual)
        }
      })
      this.infoTable = {
        amount: amount,
        orderList: this.loadTable
      }
    },
    getFeeName(obj) {
      this.feeName = Object.assign([], obj)
    },
    getTableChange(obj) {

    },
    countSuccess(list) {
      if (list.type === 178) { // 178-运单 179-批次
        this.countSuccessListShip = Object.assign([], list.info)
        this.countNumShip = list.count
      }
      if (list.type === 179) {
        this.countSuccessListBatch = Object.assign([], list.info)
        this.countNumBatch = list.count
      }
    },
    changeFeeIdBatch(obj) {
      this.settlementId = obj
      this.setSettlementId(obj)
    },
    uniqueArray(arr) { // 去重
      var hash = []
      for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1 && hash !== arr[i]) {
          hash.push(arr[i])
        }
      }
      return hash
    },
    closeDialog() {
      this.popVisibleDialog = false
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
    flex: 1;
    height: calc(100% - 120px);
    .el-tabs.el-tabs--top.el-tabs--border-card {
      height: calc(100% - 30px);
    }
    .el-tabs__header {
      margin-bottom: -11px;
    }
    .el-tabs--border-card>.el-tabs__content {
      padding: 0;
    }
    .el-tabs__content {
      display: flex;
      flex-direction: column;
      height: 100%;
      .el-tab-pane {
        height: calc(100% - 20px);
        .tableItem {
          height: 100%;
        }
      }
    }
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

    .feeFrom {
      margin-bottom: 10px;
      padding: 0 10px;
      .feeFrom-type {
        position: absolute;
        z-index: 33;
        right: 40px;
        top: 20px;
      }
      .formItemTextDanger {
        .el-form-item__label {
          color: #ef0000;
        }
      }
      .el-input.is-disabled .el-input__inner {
        background-color: #fff;
        color: #222;
      }
    }
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

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}

ul.feeList {
  margin: 10px;
  border: 1px solid #d0d7e5;
  display: flex;
  li {
    text-align: center;
    height: 70px;
    border-right: 1px solid #d0d7e5;
    p {
      background-color: #eaf0ff;
      line-height: 36px;
      margin-bottom: -5px;
    }
    .el-input__inner {
      margin-top: -5px;
      height: 33px;
      border: none;
    }
    .el-input__inner:focus {
      background-color: #d0d7e5;
      border-radius: 0px;
    }
    .el-form-item__error {
      margin-top: -6px;
    }
  }
}

</style>
