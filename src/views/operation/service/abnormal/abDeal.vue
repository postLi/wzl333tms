<template>
    <div class="tab-content miniHeaderSearch" v-loading="loading">
      <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam"  :isAllOrg="true" :btnsize="btnsize" />
      <div class="tab_info">
        <div class="btns_box">
            <el-button type="primary" :size="btnsize" icon="el-icon-document" plain @click="doAction('deal')" v-has:ABNO_UPDATE>处理</el-button>
            <!-- <el-button type="primary" :size="btnsize"  @click="doAction('cancel')" plain>异常修改</el-button> -->
            <el-button type="primary" :size="btnsize"  icon="el-icon-news" @click="doAction('check')" plain v-has:ABNO_GET>查看明细</el-button>
            <!-- <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button> -->
            <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain v-has:ABNO_EXP2>导出</el-button>

            <el-button type="primary" :size="btnsize"  plain @click="setTable" class="table_setup">表格设置</el-button>
        </div>
        <div class="info_tab">

          <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="dataset" border @row-click="clickDetails" @selection-change="getSelection" height="100%"
          :summary-method="getSumLeft"
          show-summary
           tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
            <el-table-column fixed sortable type="selection" width="70"></el-table-column>
            <template v-for="column in tableColumn">
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
                <template slot="header" slot-scope="scope">
                <tableHeaderSearch
                  :scope="scope"
                  :query="searchQuery"
                  @change="changeKey"
                />
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
              </el-table-column>
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :prop="column.prop" :label="column.label" v-else :width="column.width">
                 <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
              </template>
                <template slot-scope="scope">
                  <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                  <span v-else v-html="column.slot(scope)"></span>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>
        <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
        <Addabnormal :licenseTypes="licenseTypes" :issender="true" :isModify="isModify" :isCheck="isCheck" :isDeal="isDeal" :info="selectInfo" :id="id" :orgid="orgid" :companyId="otherinfo.companyId" :popVisible.sync="AddAbnormalVisible" @close="closeAddAbnormal" @success="fetchData"  />
        <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn" code="ORDER_ABNO2"></TableSetup>
      </div>
    </div>
</template>
<script>
import SearchForm from './components/search'
import { PostGetAbnormalList } from '@/api/operation/dashboard'
import { mapGetters } from 'vuex'
// import TableSetup from './components/tableSetup'
import TableSetup from '@/components/tableSetup'
import Pager from '@/components/Pagination/index'
import Addabnormal from './components/add'
import { objectMerge2, parseTime, getSummaries, operationPropertyCalc } from '@/utils/index'
import { SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    Addabnormal,
    tableHeaderSearch
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      // console.log(this.selectInfo.orgid, this.searchQuery.vo.orgid, this.otherinfo.orgid)
      return this.isModify ? this.selectInfo.disposeOrgId : this.searchQuery.vo.disposeOrgId || this.otherinfo.orgid
    }
  },
  mounted() {
    this.loading = true
    this.searchQuery.vo.disposeOrgId = this.otherinfo.orgid
    // Promise.all([this.fetchAllreceipt(this.otherinfo.orgid)]).then(resArr => {
    //   // this.loading = false
    //   this.licenseTypes = resArr[1]
    //   this.loading = false
    // }).catch(err => {
    //   this._handlerCatchMsg(err)
    //   this.loading = false
    // })
  },
  data() {
    return {
      tablekey: 0,
      btnsize: 'mini',
      component: 'Send',
      selectInfo: {},
      dataset: [],
      isModify: false,
      isCheck: false,
      isDeal: false,
      AddAbnormalVisible: false,
      setupTableVisible: false,
      licenseTypes: [],
      selected: [],
      loading: false,
      total: 0,
      id: '',
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
        }
      },
      tableColumn: [{
        label: '序号',
        prop: 'number',
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
        label: '异常编号',
        prop: 'abnormalNo',
        width: '120',
        fixed: true
      }, {
        label: '登记时间',
        prop: 'registerTime',
        width: '165',
        slot: (scope) => {
          return `${parseTime(scope.row.registerTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '处理时间',
        prop: 'disposeTime',
        width: '165',
        slot: (scope) => {
          return `${parseTime(scope.row.disposeTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '开单时间',
        prop: 'createTime',
        width: '165',
        slot: (scope) => {
          return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
        },
        fixed: false
      }, {
        label: '货品名',
        prop: 'cargoName',
        width: '90',
        fixed: false
      }, {
        label: '异常状态',
        prop: 'abnormalStatusName',
        width: '120',
        fixed: false
      }, {
        label: '异常类型',
        prop: 'abnormalTypeName',
        width: '120',
        fixed: false
      }, {
        label: '登记网点',
        prop: 'orgName',
        width: '120',
        fixed: false
      }, {
        label: '责任网点',
        prop: 'dutyOrgName',
        width: '120',
        fixed: false
      }, {
        label: '登记人',
        prop: 'registerName',
        width: '120',
        fixed: false
      }, {
        label: '登记金额',
        prop: 'registerFee',
        width: '120',
        fixed: false
      }, {
        label: '异常件数',
        prop: 'abnormalAmount',
        width: '120',
        fixed: false
      }, {
        label: '货号',
        prop: 'shipGoodsSn',
        width: '120',
        fixed: false
      }, {
        label: '包装',
        prop: 'cargoPack',
        width: '80',
        fixed: false
      }, {
        label: '件数',
        prop: 'cargoAmount',
        width: '80',
        fixed: false
      }, {
        label: '异常描述',
        prop: 'abnormalDescribe',
        width: '120',
        fixed: false
      }, {
        label: '处理结果',
        prop: 'disposeResultName',
        width: '120',
        fixed: false
      }, {
        label: '处理网点',
        prop: 'disposeOrgName',
        width: '120',
        fixed: false
      }, {
        label: '处理人',
        prop: 'disposeName',
        width: '120',
        fixed: false
      }, {
        label: '处理意见',
        prop: 'disposeOpinion',
        width: '120',
        fixed: false
      }]
    }
  },
  methods: {
    changeKey(obj) {
      this.total = 0
      this.searchQuery = obj
      this.fetchAllreceipt()
    },
    getSumLeft(param, type) {
      return getSummaries(param, operationPropertyCalc)
    },
    fetchAllreceipt() {
      this.loading = true
      return PostGetAbnormalList(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total
        this.loading = false
        // console.log(data)
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    fetchData() {
      this.fetchAllreceipt()
    },
         // 获取组件返回的搜索参数
    getSearchParam(searchParam) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
            // 根据搜索参数请求后台获取数据
      objectMerge2(this.searchQuery.vo, searchParam)
            // this.searchQuery.vo.orgId = searchParam.orgid
      this.fetchData()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    doAction(type) {
      // if (type === 'export') {
      //   this.showImport()
      //   return false
      // }
          // 判断是否有选中项
      if (!this.selected.length && type !== 'reg' && type !== 'export') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
        // 导出
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.dataset,
            columns: this.tableColumn,
            name: '异常处理'
          })
          break
        // 异常处理
        case 'deal':
          // console.log(this.selected[0].abnormalStatus)
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能处理单条数据',
              type: 'warning'
            })
          } else if (this.selected[0].abnormalStatus === 119) {
            this.$message.warning('异常已处理,不能重复操作！')
          } else {
            this.isModify = false
            this.isCheck = false
            this.isDeal = true
            // this.id = this.selected[0].id
            this.selectInfo = Object.assign({}, this.selected[0])
            this.openAddAbnormal()
          }
          break
          // 查看明细
        case 'check':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次自能查看单条数据',
              type: 'warning'
            })
          } else {
            this.isModify = false
            this.isCheck = true
            this.isDeal = true
            this.id = this.selected[0].id
            // this.selectInfo = this.selected[0]
            this.selectInfo = Object.assign({}, this.selected[0])
            this.openAddAbnormal()
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
      // this.id = row.id
      this.isCheck = true
      this.isDeal = true
      this.isModify = false
          // this.isDbclick = true
      this.openAddAbnormal()
    }
  }
}
</script>
