<template>
  <!-- 智能核销弹出框 -->
  <el-dialog :title="'智能核销-'+title" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog tms_dialog_count" width="600px">
    <el-form ref="formModel" :inline="true" size="mini" label-position="right" :rules="rules" :model="formModel" label-width="70px">
      <el-form-item label="发货人" prop="shipSenderName" v-if="settlementId===178">
        <el-autocomplete popper-class="my-autocomplete" v-model="formModel.shipSenderName" :fetch-suggestions="querySearchSender" placeholder="发货人搜索" size="mini" @select="handleSelectSender" auto-complete="off" :maxlength="8">
          <template slot-scope="{ item }">
            <div class="name">{{ item.customerName }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="车牌号" prop="truckIdNumber" v-else>
        <el-autocomplete popper-class="my-autocomplete" v-model="formModel.truckIdNumber" :fetch-suggestions="querySearchTruck" placeholder="车牌号码搜索" size="mini" @select="handleSelectTruck" auto-complete="off" :maxlength="8">
          <template slot-scope="{ item }">
            <div class="name">{{ item.truckIdNumber }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="支出金额" prop="autoTotalAmount">
        <input type="text" class="nativeinput" v-number-only:point :value="formModel.autoTotalAmount" ref="autoTotalAmount" :maxlength="30"  placeholder="只能输入阿拉伯数字"  @keyup.enter.native="onSubmit('formModel')" @change="(e)=>changeAmount(e.target.value)"/>
        <!-- <el-input placeholder="只能输入阿拉伯数字" v-numberOnly:point v-model="formModel.autoTotalAmount" @keyup.enter.native="onSubmit('formModel')"></el-input> -->
      </el-form-item>
      <el-form-item label="费用项">
        <el-select v-model="formModel.feeId" v-if="settlementId === 178">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in feeIds" :label="item.feeType" :value="item.id" :key="item.id"></el-option>
        </el-select>
        <el-select v-model="formModel.settlementId" v-else @change="selectFeeIdBatch">
          <el-option v-for="item in feeIdsBatch" :key="item.id" :label="item.feeType" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开单日期">
        <el-date-picker v-model="searchTime" type="daterange" unlink-panels align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions2" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <p>提示：智能核销可以按照发货人开单日期自动挑选运单核销，运用场景如:某某客户核销某个月运费一万块，可以筛选客户，收入金额10000块，系统将自动挑选运单核销。</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('formModel')">确 定</el-button>
    <el-button @click="closeMe">取 消</el-button>
    
  </span>
  </el-dialog>
</template>
<script>
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import querySelect from '@/components/querySelect/index'
import { getFeeTypeDict } from '@/api/finance/settleLog'
import {  getOrderList } from '@/api/finance/financeDaily'
import { getAllCustomer } from '@/api/company/customerManage'
import { getTrucK } from '@/api/operation/load'
export default {
  components: {
    querySelect
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '智能核销'
    },
    setSettlementId: {
      type: [Number, String]
    },
    fiOrderType: {
      type: [Number, String],
      default: 1  // 财务订单类型  0 运单， 1 干线， 2 短驳， 3 送货
    }
  },
  data() {
    return {
      formModel: {
        autoTotalAmount: 0,
        paymentsType: 1, // 收支类型, 0 收入, 1 支出
        feeId: ''
      },
      senderOptions: [],
      truckOptions: [],
      settlementId: 179, // 178-运单核销 179-干线批次核销 180-短驳核销 181-送货核销
      incomePayType: 'PAYABLE', // RECEIVABLE-运单收入费用项 PAYABLE-运单支出费用项
      rules: {},
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 30 * 1000), parseTime(new Date())],
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      feeIds: [],
      feeIdsBatch: [{
        id: 179,
        feeType: '干线'
      }, {
        id: 180,
        feeType: '短驳'
      }, {
        id: 181,
        feeType: '送货'
      }],
      paymentsType: 1 // 0-收入 1-支出
    }
  },
  computed: {
    isShow: {
      get() {
        if (this.popVisible) {
          this.formModel = this.$options.data().formModel
          switch (this.title) {
            case '批次':
              this.getAllTrunk()
              this.settlementId = 179
              this.formModel.settlementId = this.setSettlementId
              this.$set(this.formModel, 'truckIdNumber', '')
              break
            case '运单':
              this.getAllCustomer()
              this.settlementId = 178
              this.fiOrderType = 0
              this.formModel.settlementId = ''
              this.$set(this.formModel, 'shipSenderName', '')

              break
          }
          this.init()
        }
        return this.popVisible
      },
      set() {}
    }
  },
  watch: {
    title: {
      handler(cval, oval) {},
      deep: true
    },
    setSettlementId: {
      handler(cval, oval) {
        if (this.settlementId === 179) {
          this.formModel.settlementId = cval
        }
      },
      deep: true
    },
    fiOrderType: {
      handler(cval, oval) {

      },
      deep: true
    }
  },
  methods: {
    init() {
      this.getFeeTypeDict()
    },
    getAllCustomer() { // 获取发货人
      let searchQuery = {
        currentPage: 1,
        pageSize: 200,
        vo: {
          orgid: this.otherinfo.orgid,
          customerType: 1,
          customerMobile: '',
          customerName: ''
        }
      }
      getAllCustomer(searchQuery).then(data => {
          this.senderOptions = data.list
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    getAllTrunk() { // 获取车牌号
      getTrucK().then(data => {
          this.truckOptions = data.data
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    querySearchTruck(queryString, cb) {
      const truckList = this.truckOptions
      const results = queryString ? truckList.filter(this.createFilter(new RegExp(queryString, "gi"), 'truckIdNumber')) : truckList
      // 调用 callback 返回车辆列表的数据
      cb(results)
    },
    querySearchSender(queryString, cb) {
      const senderList = this.senderOptions
      const results = queryString ? senderList.filter(this.createFilter(new RegExp(queryString, "gi"), 'truckIdNumber')) : senderList
      // 调用 callback 返回发货人列表的数据
      cb(results)
    },
    createFilter(queryString, prop) {
      return (data) => {
        if (data[prop]) {
          return (queryString.test(data[prop]))
        }
      }
    },
    changeAmount (e) {
      this.$set(this.formModel, 'autoTotalAmount', e)
    },
    handleSelectTruck(item) {
      this.formModel.truckIdNumber = item.truckIdNumber
    },
    handleSelectSender(item) {
      this.formModel.shipSenderName = item.customerName
    },
    getFeeTypeDict() {
      return getFeeTypeDict({
        paymentsType: this.paymentsType,
        fiOrderType: this.fiOrderType
      }).then(data => {
        this.feeIds = data
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$set(this.formModel, 'startTime', parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00')
          this.$set(this.formModel, 'endTime', parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59')
          this.$set(this.formModel, 'orgId', this.$route.query.orgId)
          // this.$set(this.formModel, 'incomePayType', this.incomePayType)
          this.$set(this.formModel, 'fiOrderType', this.fiOrderType)
          if (this.settlementId === 178) {
            this.$set(this.formModel, 'settlementId', this.settlementId)
          }

          this.formModel.autoTotalAmount = Number(this.formModel.autoTotalAmount)
          let info = Object.assign({}, this.formModel)
          getOrderList(info).then(data => {
              this.$emit('success', { info: data, count: info.autoTotalAmount, type: this.settlementId })
              this.closeMe()
              this.$message({ type: 'success', message: '智能核销搜索运单操作成功' })
            })
            .catch(err => {
              this._handlerCatchMsg(err)
            })
        }
      })
    },
    selectFeeIdBatch(obj) {
      this.$emit('change', obj)
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
