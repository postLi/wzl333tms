<template>
<div class="tab-wrapper tab-wrapper-100">
    <div class="tab-content" v-loading="loading" @success="fetchAllreceipt">
        <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
      <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" class="el-icon-circle-plus"  plain @click="doAction('reg')">异动登记</el-button>
          <el-button type="primary" :size="btnsize" class="el-icon-edit" @click="doAction('xiugai')" plain>修改</el-button>
          <!-- <el-button type="primary" :size="btnsize"  @click="doAction('check')" plain>查看明细</el-button> -->
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button>
          <el-button type="primary" :size="btnsize" class="el-icon-upload2" @click="doAction('export')" plain>导出</el-button>

          <el-button type="primary" :size="btnsize"  plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <!-- <el-table
          ref="multipleTable"
          :data="dataset"
          stripe
          border
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            fixed
            sortable
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="id"
            label="序号"
            width="200">
          </el-table-column>
         
          <el-table-column
            label="开单网点"
            width="180"
            prop="orgidName"
            sortable
            >
          </el-table-column>
           <el-table-column
            sortable
            width="200"
            label="开单日期">
            <template slot-scope="scope">{{ scope.row.shipCreateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="120"
            sortable
            label="运单号">
          </el-table-column>

          <el-table-column
            prop="shipGoodsSn"
            sortable
            width="120"
            label="货号">
          </el-table-column>
          <el-table-column
            prop="shipFromCityName"
            label="出发城市"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            sortable
            prop="shipToCityName"
            width="120"
            label="到达城市">
          </el-table-column>
         
          <el-table-column
            prop="statusValue"
            label="结算状态"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="fee"
            label="异动费用"
            width="120"
            sortable
            >
          </el-table-column>
         
          <el-table-column
            prop="incomePayTypeValue"
            label="费用类型"
            width="120"
            sortable
            >
          </el-table-column>

           <el-table-column
            prop=""
            label="异动时间"
            width="200"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>

          <el-table-column
            prop="remark"
            label="异动备注"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipStatusName"
            label="运单状态"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="senderCustomerName"
            label="发货人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="senderCustomerMobile"
            label="发货人电话"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiverCustomerName"
            label="收货人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiverCustomerMobile"
            label="收货人电话"
            width="120"
            sortable
            >
          </el-table-column>
         
          <el-table-column
            prop="cargoName"
            label="货品名"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoWeight"
            label="重量"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            label="体积"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipRemarks"
            label="运单备注"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipPayWay"
            label="付款方式"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="nowPayFee"
            label="现付"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="arrivePayFee"
            label="到付"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiptPayFee"
            label="回单付"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="monthPayFee"
            label="月结"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            label="到达省"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[0] : '' }}</template>
          </el-table-column>
          <el-table-column
            label="到达市"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[1] : '' }}</template>
          </el-table-column>
          <el-table-column
            label="到达区"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[2] : '' }}</template>
          </el-table-column>

          <el-table-column
            prop="senderDetailedAddress"
            label="发货地址"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="receiverDetailedAddress"
            label="收货地址"
            width="120"
            sortable
            >
          </el-table-column>
        </el-table> -->
        <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="dataset" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
          <el-table-column fixed sortable type="selection" width="50"></el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
      <Addunusual :issender="true" :isModify="isModify" :isDbClick="isDbClick" :isCheck="isCheck" :info="selectInfo" :id="id" :orgid="orgid" :companyId="otherinfo.companyId" :popVisible.sync="AddAbnormalVisible" @close="closeAddAbnormal" @success="fetchData"  />
      <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn"></TableSetup>
    </div>
</div>
</template>
<script>
import SearchForm from './components/search'
import { postAbnormalUnusual, Delete } from '@/api/finance/unusual'
import { mapGetters } from 'vuex'
import TableSetup from '@/components/tableSetup'
import Pager from '@/components/Pagination/index'
import Addunusual from './components/add'
import { objectMerge2, parseTime } from '@/utils/index'
import { SaveAsFile } from '@/utils/lodopFuncs'
export default {
  name: 'financeunusual',
  components: {
    SearchForm,
    Pager,
    TableSetup,
    Addunusual
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
            // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'Send',
      selectInfo: {},
      dataset: [],
      isModify: false,
      isCheck: false,
      AddAbnormalVisible: false,
      setupTableVisible: false,
      isDbClick: false,
      licenseTypes: [],
      selected: [],
      loading: true,
      total: 0,
      tablekey: 0,
      id: '',
      searchQuery: {
        'currentPage': 1,
        'pageSize': 1000,
        'vo': {
        }
      },
      tableColumn: [{
        label: '序号',
        prop: 'id',
        width: '60',
        fixed: true,
        slot: (scope) => {
          return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
        }
      }, {
        label: '运单号',
        prop: 'shipSn',
        width: '120',
        fixed: true
      }, {
        label: '开单网点',
        prop: 'orgidName',
        width: '120',
        fixed: false
      }, {
        label: '开单日期',
        prop: 'shipCreateTime',
        width: '160',
        slot: (scope) => {
          return `${parseTime(scope.row.shipCreateTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '货号',
        prop: 'shipGoodsSn',
        width: '120',
        fixed: false
      }, {
        label: '出发城市',
        prop: 'shipFromCityName',
        width: '120',
        fixed: false
      }, {
        label: '到达城市',
        prop: 'shipToCityName',
        width: '120',
        fixed: false
      }, {
        label: '结算状态',
        prop: 'statusValue',
        width: '120',
        fixed: false
      }, {
        label: '异动费用',
        prop: 'fee',
        width: '100',
        fixed: false
      }, {
        label: '费用类型',
        prop: 'incomePayTypeValue',
        width: '120',
        fixed: false
      }, {
        label: '异动时间',
        prop: 'createTime',
        width: '165',
        slot: (scope) => {
          return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '异动备注',
        prop: 'remark',
        width: '120',
        fixed: false
      }, {
        label: '运单状态',
        prop: 'shipStatusName',
        width: '120',
        fixed: false
      }, {
        label: '发货人',
        prop: 'senderCustomerName',
        width: '120',
        fixed: false
      }, {
        label: '发货人电话',
        prop: 'senderCustomerMobile',
        width: '120',
        fixed: false
      }, {
        label: '收货人',
        prop: 'receiverCustomerName',
        width: '120',
        fixed: false
      }, {
        label: '收货人电话',
        prop: 'receiverCustomerMobile',
        width: '120',
        fixed: false
      }, {
        label: '货品名',
        prop: 'cargoName',
        width: '90',
        fixed: false
      }, {
        label: '件数',
        prop: 'cargoAmount',
        width: '80',
        fixed: false
      }, {
        label: '重量',
        prop: 'cargoWeight',
        width: '80',
        fixed: false
      }, {
        label: '体积',
        prop: 'cargoVolume',
        width: '80',
        fixed: false
      }, {
        label: '运单备注',
        prop: 'shipRemarks',
        width: '120',
        fixed: false
      }, {
        label: '付款方式',
        prop: 'shipPayWay',
        width: '120',
        fixed: false
      }, {
        label: '现付',
        prop: 'nowPayFee',
        width: '80',
        fixed: false
      }, {
        label: '到付',
        prop: 'arrivePayFee',
        width: '80',
        fixed: false
      }, {
        label: '回单付',
        prop: 'receiptPayFee',
        width: '90',
        fixed: false
      }, {
        label: '月结',
        prop: 'monthPayFee',
        width: '80',
        fixed: false
      }, {
        label: '到达省',
        prop: 'shipToCityName1',
        width: '120',
        slot: (scope) => {
          return scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[0] : ''
        },
        fixed: false
      }, {
        label: '到达市',
        prop: 'shipToCityName2',
        width: '120',
        slot: (scope) => {
          return scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[1] : ''
        },
        fixed: false
      }, {
        label: '到达区',
        prop: 'shipToCityName3',
        width: '120',
        slot: (scope) => {
          return scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[2] : ''
        },
        fixed: false
      },
      {
        label: '发货地址',
        prop: 'senderDetailedAddress',
        width: '120',
        fixed: false
      }, {
        label: '收货地址',
        prop: 'receiverDetailedAddress',
        width: '120',
        fixed: false
      }]
    }
  },
  methods: {
    fetchAllreceipt() {
      this.loading = true
      return postAbnormalUnusual(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total

        this.loading = false
        // console.log(data.list, data.list[0].statusValue)
      })
    },

    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    fetchData() {
      this.fetchAllreceipt()
    },
    // 获取组件返回的搜索参数
    getSearchParam(searchParam) {
      // 根据搜索参数请求后台获取数据
      objectMerge2(this.searchQuery.vo, searchParam)
      // this.searchQuery.vo.orgId = searchParam.orgid
      this.fetchData()
    },
    doAction(type) {
      // if (type !== 'export') {
      //   SaveAsFile({
      //     data: this.selected.length ? this.selected : this.dataset,
      //     columns: this.tableColumn
      //   })
      // }
      // 判断是否有选中项
      if (this.selected.length === 0 && type !== 'reg' && type !== 'export') {
        this.$message({
          message: '请选择要操作的项1~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
        // 导出
        case 'export':
          const arr = objectMerge2([], this.dataset) // 所有的数据
          arr.forEach(e => {
            this.$set(e, 'shipToCityName1', e.shipToCityName ? e.shipToCityName.split(',')[0] : '')
            this.$set(e, 'shipToCityName2', e.shipToCityName ? e.shipToCityName.split(',')[1] : '')
            this.$set(e, 'shipToCityName3', e.shipToCityName.split(',')[2] ? e.shipToCityName.split(',')[2] : '')
          })

          const arrSel = objectMerge2([], this.selected) // 选择打勾的数据
          arrSel.forEach(e => {
            this.$set(e, 'shipToCityName1', e.shipToCityName ? e.shipToCityName.split(',')[0] : '')
            this.$set(e, 'shipToCityName2', e.shipToCityName ? e.shipToCityName.split(',')[1] : '')
            this.$set(e, 'shipToCityName3', e.shipToCityName.split(',')[2] ? e.shipToCityName.split(',')[2] : '')
          })
          SaveAsFile({
            data: arrSel.length ? arrSel : arr,
            columns: this.tableColumn,
            name: '异动登记'
          })
          break
        // 登记
        case 'reg':
          this.isModify = false
          this.isCheck = false
          this.isDbClick = false
          console.log(this.isModify)
          this.selectInfo = {}
          this.openAddAbnormal()
          break
        // 修改
        case 'xiugai':
          console.log(this.statusValue)
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改一条数据',
              type: 'warning'
            })
          } else if (this.selected[0].statusValue !== '未结算') {
            this.$message({
              message: '订单已结算不能进行修改',
              type: 'warning'
            })
          } else {
            this.isCheck = false
            this.selectInfo = Object.assign({}, this.selected[0])
            this.isModify = true
            this.isDbClick = false
            this.openAddAbnormal()
          }
          break
        // 删除
        case 'delete':
          const deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].shipSn
          // =>todo 删除多个
          const ids = this.selected.map(item => {
            return item.id
          })
          // ids = ids.join(',')
          console.log(ids + 'wzl')
          if (this.selected[0].status !== 'NOSETTLEMENT') {
            this.$message.warning('已结算或者部分结算的单据不能删除')
            return false
          } else if (this.selected[0].status === 'NOSETTLEMENT') {
            this.$confirm('确定要删除 ' + deleteItem + ' 订单异动信息吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              Delete(ids).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.fetchData()
              }).catch(err => {
                this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    openAddAbnormal() {
      this.AddAbnormalVisible = true
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    },
    closeAddAbnormal() {
      this.AddAbnormalVisible = false
      this.isModify = false
      this.selectInfo = {}
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    getDbClick(row, event) {
      this.selectInfo = row
      this.isDbClick = true
      this.isModify = false
      this.openAddAbnormal()
    }
  }
}
</script>
