<template>
  <div class="fee-content" v-loading="loading">
    <tree-table :data="usersArr" :columns="columns" border :expand-all="expandAll" 
                     :isParentId="true" />
    <!-- <el-table
      ref="multipleTable"
      :data="usersArr"
      stripe
      border
      height="100%"
      tooltip-effect="dark"

      style="width: 100%">
      <el-table-column
        prop="feeType"
        label="费用项"
        width="150">
      </el-table-column>
      <el-table-column
        prop="paymentsTypeZh"
        label="收支类型"
        width="150">
      </el-table-column>
      <el-table-column
        prop="billVerfiyStatus"
        width="110"
        label="核销状态">
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="150"
        label="核销日期">
      </el-table-column>
      <el-table-column
        prop="createName"
        width="150"
        label="核销人">
      </el-table-column>
      <el-table-column
        prop="certNo"
        show-overflow-tooltip
        width="120"
        label="凭证号">
      </el-table-column>
      <el-table-column
        prop="amount"
        width="130"
        label="金额">
      </el-table-column>
      <el-table-column
        label="收据单号"
        show-overflow-tooltip
        width="170"
        prop="receiptNo"
        >
      </el-table-column>
      <el-table-column
        prop="remark"
        show-overflow-tooltip
        label="备注"
        >
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
import orderManage from '@/api/operation/orderManage'
import treeTable from '@/components/TreeTable/index2'

export default {
  components: {
    treeTable
  },
  props: {
    orderid: [String, Number]
  },
  data() {
    return {
      loading: false,
      usersArr: [],
      expandAll: 'true',
      columns: [
        {
          text: '费用项',
          value: 'feeType',
          fixed: true
        }
      ]
    }
  },
  watch: {
    orderid(newVal) {
      if (newVal !== '') {
        this.fetchData()
      } else {
        this.usersArr = []
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      return orderManage.getOrderFinanceInfo(this.orderid).then(res => {
        this.loading = false
        this.usersArr = res.data || []
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    }
  }
}
</script>
<style type="text/css" lang="scss">
  .row-expand-cover .el-table__expand-column .el-icon {
    visibility: hidden;
  }
  .fee-content{
    .scope-node{
      text-align: left;
      padding-left: 2em;
    }

  }
</style>
