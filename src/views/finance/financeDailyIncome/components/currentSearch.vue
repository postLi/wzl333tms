<template>
  <el-form ref="searchForm" inline label-position="right" :model="searchForm" label-width="60px" class="tableHeadItemForm">
    <el-form-item>
      <el-select v-model="senderSearch" placeholder="批次类型" :size="btnsize" @change="changeSenderSearch">
        <el-option label="短驳" value="short"></el-option>
        <el-option label="干线" value="load"></el-option>
        <!-- <el-option label="送货" value="deliver"></el-option> -->
      </el-select>
    </el-form-item>
    <el-form-item v-if="senderSearch==='short'">
      <el-autocomplete v-model="searchForm.shortBatchNo" :maxlength="20" :size="btnsize" :fetch-suggestions="(queryString, cb) => querySearch( 'shortBatchNo',queryString, cb)" placeholder="短驳批次号搜索" @select="handleSelect" popper-class="popperHide" @focus="focusFormItm('shortBatchNo')">
        <template slot-scope="{ item }">
          <div class="name">{{ item.batchNo }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item v-if="senderSearch==='load'">
      <el-autocomplete v-model="searchForm.mainBatchNo" :maxlength="20" :size="btnsize" :fetch-suggestions="(queryString, cb) => querySearch( 'mainBatchNo',queryString, cb)" placeholder="干线批次号搜索" @select="handleSelect" popper-class="popperHide" @focus="focusFormItm('mainBatchNo')">
        <template slot-scope="{ item }">
          <div class="name">{{ item.batchNo }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item v-if="senderSearch==='deliver'">
      <el-autocomplete v-model="searchForm.sendBatchNo" :maxlength="20" :size="btnsize" :fetch-suggestions="(queryString, cb) => querySearch( 'sendBatchNo',queryString, cb)" placeholder="送货批次号搜索" @select="handleSelect" popper-class="popperHide" @focus="focusFormItm('sendBatchNo')">
        <template slot-scope="{ item }">
          <div class="name">{{ item.batchNo }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="车牌号">
      <el-autocomplete v-model="searchForm.truckIdNumber" :maxlength="8" :size="btnsize" :fetch-suggestions="(queryString, cb) => querySearch( 'truckIdNumber',queryString, cb)" placeholder="车牌号搜索" @select="handleSelect" popper-class="popperHide" @focus="focusFormItm('truckIdNumber')">
        <template slot-scope="{ item }">
          <div class="name">{{ item.truckIdNumber }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
  </el-form>
</template>
<script>
import querySelect from '@/components/querySelect/index'
import { objectMerge2, uniqueArray } from '@/utils/index'
export default {
  components: {
    querySelect
  },
  data() {
    return {
      senderSearch: 'load',
      searchForm: {
        shortBatchNo: '',
        mainBatchNo: '',
        sendBatchNo: '',
        truckIdNumber: ''
      },
      btnsize: 'mini',
      selectVal: '',
      settlementId: '',
      isSender: false,
      SETTLEMENT_TYPE: {
        short: 180,
        load: 179,
        deliver: 181
      }
    }
  },
  props: {
    info: {
      type: Array,
      default: []
    },
    getSettlementId: {
      type: [Number, String]
    }
  },
  watch: {
    getSettlementId: {
      handler(cval, oval) {
        if (cval) {
          this.isSender = true
          this.settlementId = cval // 弹出框选择后 就根据选择切换
          this.senderSearch = cval === 179 ? 'load' : cval === 180 ? 'short' : 'deliver'
        }
      },
      deep: true
    }
  },
  mounted() {
    if (!this.isSender) {
      this.initSettlementid()
    }
  },
  methods: {
    focusFormItm(type) {
      // 清空其他输入框
      for (let item in this.searchForm) {
        if (item !== type) {
          this.$set(this.searchForm, item, '')
        }
      }
    },
    initSettlementid() {
      let type = this.senderSearch
      this.settlementId = this.SETTLEMENT_TYPE[this.senderSearch]
      console.log('选择批次类型后的settlementId', this.settlementId)
      // switch (type) {
      //   case 'short': // 短驳
      //     this.settlementId = 180
      //     break
      //   case 'load': // 干线
      //     this.settlementId = 179
      //     break
      //   case 'deliver': // 送货
      //     this.settlementId = 181
      //     break
      // }
      this.$emit('setSettlementId', this.settlementId)
    },
    changeSenderSearch(obj) {
      if (obj) {
        this.initSettlementid()
      }
    },
    querySearch(type, queryString, cb) {
      let leftTable = leftTable = this.info
      this.searchForm[type] = queryString // 绑定数据视图
      this.selectVal = type // 当前选择输入的对象
      for (let item in this.searchForm) {
        if (this.searchForm[item] === undefined || this.searchForm[item] === '') {
          this.$emit('change', objectMerge2([], this.info)) // 如果输入框为空恢复右边数据列表
        }
      }
      let results = queryString ? leftTable.filter(this.createFilter(queryString, type)) : leftTable
      cb(results)
      let array = []
      results.forEach(e => {
        array.push(e)
      })
      this.$emit('change', array)
    },
    createFilter(queryString, type) {
      return (res) => { // 过滤
        if (type !== 'truckIdNumber') {
          if (res.batchNo) {
            return (res.batchNo.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
          }
          // return (res.batchNo.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
        } else {
          if (res.truckIdNumber) {
            return (res.truckIdNumber.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
          }
          // return (res.truckIdNumber.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
        }

      }
    },
    handleSelect(obj) {
      this.searchForm[this.selectVal] = obj[this.selectVal]
      this.selectVal = ''
      let array = []
      array.push(obj)
      this.$emit('change', array)
      this.searchForm = this.$options.data().searchForm
    },
    clearSender(event) {
      this.searchForm = this.$options.data().searchForm
    }
  }
}

</script>
<style lang="scss">
.tableHeadItemForm {
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  .el-input {
    width: 120px;
    .el-input__inner {
      padding: 0 10px;
    }
  }

  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .hidePopper {
    display: none !important;
    background-color: rgba(0, 0, 0, 0);
  }
  .el-autocomplete-suggestion .el-popper {
    display: none;
  }
}

</style>
