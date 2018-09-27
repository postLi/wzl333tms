<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')" v-has:PICK_ADD>新增提货</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain v-has:PICK_EDIT>修改</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain v-has:PICK_DEL>删除</el-button>
          <el-button type="success" :size="btnsize" icon="el-icon-success" @click="doAction('finishPick')" plain v-has:PICK_FINASH>提货完成</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-menu" @click="doAction('relevance')" plain v-has:PICK_SEL>关联运单</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:PICK_EXP>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:PICK_PRI>打印</el-button>
          <!--<el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('import')" plain>批量导入</el-button>-->
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">



        <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
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
    <AddCustomer :issender="true" :isModify="isModify" :isDbclick="isDbclick" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  :key="mykey" />
    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn"></TableSetup>
    <PickupMain :popVisible.sync="pickMaintainisible" :isDepMain="isDepMain" @close="openpickMaintainisible" @success="fetchData" :dotInfo="selectInfo"></PickupMain>
    <PickupRelevance :popVisible.sync="releMaintainisible" :isDepMain="isDepMain" @close="openpickReletainisible" @success="fetchData" :dotInfo="selectInfo"></PickupRelevance>

  </div>
</template>
<script>
import { getExportExcel } from '@/api/company/customerManage'
import { fetchPostlist, deletebatchDelete } from '@/api/operation/pickup'

import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import AddCustomer from './components/add'
import PickupMain from './components/pickupMain'
import PickupRelevance from './components/pickupRelevance'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { objectMerge2 } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddCustomer,
    PickupMain,
    PickupRelevance
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
  },
  data() {
    return {
      mykey: '',
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      tablekey: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      pickMaintainisible: false,
      releMaintainisible: false,
      isModify: false,
      isDepMain: false,
      isDbclick: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'orgid': 1,
          pickupStatus: '',
          startTime: '',
          pickupBatchNumber: '',
          truckIdNumber: '',
          driverName: ''
        }
      },
      tableColumn: [{
        label: '序号',
        prop: 'id',
        width: '70',
        fixed: true,
        slot: (scope) => {
          return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
        }
      }, {
        label: '提货批次',
        prop: 'pickupBatchNumber',
        width: '110',
        fixed: true
      }, {
        label: '提货状态',
        prop: 'pickupStatusName',
        width: '110',
        fixed: true
      },
        // 沐沐说去掉 20180802
      //   {
      //   label: '运费核销状态',
      //   prop: 'cancelStatus',
      //   width: '150',
      //   fixed: false
      // },
      {
        label: '发货人',
        prop: 'customerName',
        width: '120',
        fixed: false
      }, {
        label: '手机号',
        prop: 'customerMobile',
        width: '130',
        fixed: false
      }, {
        label: '提货地址',
        prop: 'detailedAddress',
        width: '170',
        fixed: false
      }, {
        label: '货品名',
        prop: 'pickupName',
        width: '120',
        fixed: false
      }, {
        label: '件数',
        prop: 'pickupAmount',
        width: '80',
        fixed: false
      }, {
        label: '重量',
        prop: 'pickupWeight',
        width: '80',
        fixed: false
      }, {
        label: '体积',
        prop: 'pickupVolume',
        width: '80',
        fixed: false
      }, {
        label: '实际载重量',
        prop: 'realWeight',
        width: '120',
        fixed: false
      }, {
        label: '差额重量',
        prop: 'differWeight',
        width: '110',
        fixed: false
      }, {
        label: '实际载体积',
        prop: 'realVolume',
        width: '120',
        fixed: false
      }, {
        label: '关联运单号',
        prop: 'shipSns',
        width: '180',
        fixed: false
      }, {
        label: '关联提货费',
        prop: 'pickupFee',
        width: '120',
        fixed: false
      }, {
        label: '到达城市',
        prop: 'toCityName',
        width: '150',
        fixed: false
      }, {
        label: '付款方式',
        prop: 'payMethodName',
        width: '120',
        fixed: false
      }, {
        label: '备注',
        prop: 'remark',
        width: '120',
        fixed: false
      }, {
        label: '运费',
        prop: 'carriage',
        width: '80',
        fixed: false
      }, {
        label: '代收费用',
        prop: 'collectionFee',
        width: '110',
        fixed: false
      }, {
        label: '车牌号',
        prop: 'truckIdNumber',
        width: '120',
        fixed: false
      }, {
        label: '车费',
        prop: 'truckFee',
        width: '80',
        fixed: false
      }, {
        label: '车辆单位',
        prop: 'truckUnit',
        width: '110',
        fixed: false
      }, {
        label: '司机姓名',
        prop: 'driverName',
        width: '110',
        fixed: false
      }, {
        label: '司机手机',
        prop: 'driverMobile',
        width: '110',
        fixed: false
      }, {
        label: '车辆类型',
        prop: 'truckTypeName',
        width: '110',
        fixed: false
      }, {
        label: '出车时间',
        prop: 'outTime',
        width: '160',
        fixed: false
      }, {
        label: '要求到达时间',
        prop: 'arriveTime',
        width: '160',
        fixed: false
      }
      ]
    }
  },
  methods: {
    fetchAllCustomer() {
      this.loading = true
      return fetchPostlist(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch((err)=>{
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    fetchData() {
      this.fetchAllCustomer()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    getSearchParam(obj) {
      this.searchQuery.vo = objectMerge2(this.searchQuery.vo, obj)
      this.fetchAllCustomer()
    },
    showImport() {
      // 显示导入窗口
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add' && type !== 'export' && type !== 'print') {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn
          })
          this.$refs.multipleTable.clearSelection()
          // if (this.selected.length === 0) {
          //   SaveAsFile(this.usersArr, this.tableColumn)
          // } else {
          //   // 筛选选中的项
          //   SaveAsFile(this.selected, this.tableColumn)
          // }
          break
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn
          })
          break
          // 新增
        case 'add':
          this.closeAddCustomer()
          this.isModify = false
          this.isDbclick = false
          this.selectInfo = {}
          this.openAddCustomer()
          break
          // 修改
        case 'modify':
          this.closeAddCustomer()
          this.isModify = true
          this.isDbclick = false
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
            return false
          }
          if (this.selected[0].pickupStatus === 237) {
            this.$message({
              message: '提货完成不能修改~',
              type: 'warning'
            })
            this.$refs.multipleTable.clearSelection()
            return false
          }
          this.selectInfo = this.selected[0]
          this.openAddCustomer()
          break
        // 提货完成
        case 'finishPick':
          this.closeAddCustomer()
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能生成单条数据~',
              type: 'warning'
            })
            return false
          }
          if (this.selected[0].pickupStatus === 237) {
            this.$message({
              message: '已经提货完成了~',
              type: 'warning'
            })
            this.$refs.multipleTable.clearSelection()
            return false
          }
          this.selectInfo = this.selected[0]
          this.openpickMaintainisible()
          break
          // 关联运单
        case 'relevance':
          this.closeAddCustomer()
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能生成单条数据~',
              type: 'warning'
            })
            return false
          }
          this.selectInfo = this.selected[0]
          this.openpickReletainisible()
          break
          // 删除客户
        case 'delete':
          const ids = this.selected.filter(el => {
            return el.pickupStatusName === '提货中'
          }).map(el => {
            return el.id
          })
          if (!ids.length) {
            this.$message({
              type: 'info',
              message: '提货完成的提货单不能删除!'
            })
            return false
          } else {
            ids = ids.join(',')
            this.$confirm('确定要删除提货批次吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deletebatchDelete(ids).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.fetchData()
              }).catch(err => {
                this._handlerCatchMsg(err)
              })
            })
          }
          break
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    openAddCustomer() {
      this.AddCustomerVisible = true
    },

    closeAddCustomer() {
      // this.mykey = Math.random()
      this.AddCustomerVisible = false
    },
    openpickMaintainisible() {
      this.pickMaintainisible = true
      this.releMaintainisible = false
    },
    openpickReletainisible() {
      this.releMaintainisible = true
      this.pickMaintainisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    getDbClick(row, event) {
      this.selectInfo = row
      this.isModify = false
      this.isDbclick = true
      this.openAddCustomer()
      this.$refs.multipleTable.clearSelection()
    },
    setColumn(obj) {
      this.tableColumn = obj
      this.tablekey = Math.random()
    }
  }
}
</script>
