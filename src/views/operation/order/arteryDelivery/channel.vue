<template>
  <div class="tab-content" v-loading="loading">
    <!-- 途径卸货 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('discharge')">卸货</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" @click="doAction('cancel')" plain>取消卸货</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出清单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印清单</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <span class="dbclickTips">双击查看详情</span>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="dataList" border @row-click="clickDetails" @selection-change="getSelection" height="100%" :summary-method="getSumLeft" show-summary tooltip-effect="dark" :key="tablekey" style="width:100%;" stripe>
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
      <div class="info_tab_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
    </div>
    <Discharge :popVisible.sync="dischargeVisible" :info="selectInfo" @success="fetchList"></Discharge>
    <TableSetup code="" :popVisible="setupTableVisible" @close="closeSetupTable" @success="setColumn" :columns="tableColumn" />
  </div>
</template>
<script>
import SearchForm from './components/searchDischarge'
import TableSetup from '@/components/tableSetup'
import Discharge from './components/discharge'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { objectMerge2, getSummaries, operationPropertyCalc, parseTime } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import { unloadList, cancelUnload } from '@/api/operation/discharge'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    Discharge
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      total: 0,
      tablekey: 0,
      loading: true,
      dischargeVisible: false,
      setupTableVisible: false,
      btnsize: 'mini',
      dataList: [],
      selected: [],
      selectInfo: {},
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          orgid: '',
          dirverName: '',
          truckIdNumber: '',
          batchNo: '',
          departureTimeStart: '',
          departureTimeEnd: '',
          userOrgid: '',
          unloadSign: 407 // 405-全部 406-已卸货 407-未卸货
        }
      },
      tableColumn: [{
        label: '序号',
        prop: 'number',
        width: '50',
        fixed: true,
        slot: (scope) => {
          return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
        }
      }, {
        label: '发车网点',
        prop: 'orgName',
        width: '100',
        fixed: false
      }, {
        label: '发车时间',
        prop: 'departureTime',
        width: '160',
        fixed: false
      }, {
        label: '车牌号',
        prop: 'truckIdNumber',
        width: '100',
        fixed: false
      }, {
        label: '发车批次',
        prop: 'batchNo',
        width: '120',
        fixed: true
      }, {
        label: '卸货状态',
        prop: 'unloadSignName',
        width: '110',
        fixed: false
      }, {
        label: '卸货单数',
        prop: 'unloadNum',
        width: '110',
        fixed: false
      }, {
        label: '卸货时间',
        prop: 'unloadTime',
        width: '160',
        fixed: false
      }, {
        label: '司机名称',
        prop: 'dirverName',
        width: '150',
        fixed: false
      }, {
        label: '配载单数',
        prop: 'loadNum',
        width: '120',
        fixed: false
      }, {
        label: '配载件数',
        prop: 'loadAmountall',
        width: '120',
        fixed: false
      }, {
        label: '配载重量(kg)',
        prop: 'loadWeightall',
        width: '120',
        fixed: false
      }, {
        label: '配载体积(m³)',
        prop: 'loadVolumeall',
        width: '120',
        fixed: false
      }, {
        label: '配载人',
        prop: 'userName',
        width: '90',
        fixed: false
      }, {
        label: '发车人',
        prop: 'truckUserName',
        width: '90',
        fixed: false
      }, {
        label: '备注',
        prop: 'remark',
        width: '150',
        fixed: false
      }]
    }
  },
  methods: {
    getSearchParam(obj) { // 查询
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = Object.assign({}, obj) // 38-短驳 39-干线 40-送货
      this.fetchList()
    },
    handlePageChange(obj) { // 翻页

    },
    fetchList() {
      this.$refs.multipleTable.clearSelection()
      this.closeSetupTable()
      let query = objectMerge2({}, this.searchQuery)
      unloadList(query).then(data => {
          if (data) {
            this.dataList = data.list
            this.total = data.total
          }
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    doAction(type) {
      if (this.selected.length < 1 && type !== 'export' && type !== 'print') {
        this.$message.warning('请选择一条数据~')
        return false
      }
      switch (type) {
        case 'discharge': // 卸货
          this.discharge()
          break
        case 'cancel': // 取消卸货
          this.cancel()
          break
        case 'export': // 导出
          SaveAsFile({
            data: this.selected.length ? this.selected : this.dataList,
            columns: this.tableColumn,
            name: '途径卸货-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print': // 打印
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.dataList,
            columns: this.tableColumn
          })
          break
      }
    },
    discharge() { // 卸货
      this.selected = this.selected.filter(e => {
        return e.unloadSignName === '未卸货'
      })
      if (this.selected.length > 0) { // 一次只能选择一条数据选择多条数据默认为第一条
        let selected = this.selected[0]
        if (selected.batchTypeId === 53 && selected.unloadSignName === '未卸货') {
          this.selectInfo = selected
          this.dischargeVisible = true
        } else {
          this.$message.warning('该批次已经卸货~')
          this.$refs.multipleTable.clearSelection()
        }
      } else {
        this.$message.warning('该批次已经卸货~')
        this.$refs.multipleTable.clearSelection()
      }

    },
    cancel() { // 取消卸货
      this.selected = this.selected.filter(e => {
        return e.unloadSignName === '已卸货'
      })
      if (this.selected.length > 0) { // 一次只能选择一条数据选择多条数据默认为第一条
        let selected = Object.assign({}, this.selected[0])
        if (selected.batchTypeId === 53 && selected.unloadSignName === '已卸货') {
          this.$confirm('确定要取消卸货吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            cancelUnload([selected.loadId]).then(data => {
                this.$message.success('取消卸货成功!')
                this.fetchList()
              })
              .catch(err => {
                this._handlerCatchMsg(err)
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })

        } else {
          this.$message.warning('不能取消卸货~')
          this.$refs.multipleTable.clearSelection()
        }
      } else {
        this.$message.warning('不能取消卸货~')
        this.$refs.multipleTable.clearSelection()
      }
    },
    getDbClick(row, event) { // 双击查看详情
      this.selectInfo = row
      this.dischargeVisible = true
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) { // 更改选择项
      this.selected = selection
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    getSumLeft(param, type) { // 合计行
      return getSummaries(param, operationPropertyCalc)
    },
    setColumn(obj) {
      this.tableColumn = obj
      this.tablekey = Math.random()
    }
  }
}

</script>
