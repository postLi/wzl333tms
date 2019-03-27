<template>
  <div class="linemanage-manager tab-wrapper tab-wrapper-100 miniHeaderSearch">
  <div class="tab-content linemanage-summary" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-info" v-has:LINE_MANAGE_ADD plain @click="doAction('add')" >新增线路</el-button>
          <span class="viewtip">
            双击查看详情
          </span>
          
          <!-- <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" class="table_setup" @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" class="table_setup" @click="doAction('print')" plain>打印</el-button> -->
          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          :key="tablekey"
          stripe
          border
          @row-click="clickDetails"
          @row-dblclick="showDetail"
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          
          <!-- <el-table-column
            fixed
            sortable
            type="selection"
            width="40">
          </el-table-column> -->
          <template v-for="column in tableColumn">
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              :prop="column.prop"
              v-if="!column.slot"
              :width="column.width">
               <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
               :prop="column.prop"
              :label="column.label"
              v-else
              :width="column.width">
                <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
              </template>
              <template slot-scope="scope" >
                <span v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
          <el-table-column
            label="操作"
            width="300"
          >
          <template slot-scope="scope">
            <el-button v-has:LINE_MANAGE_DISABLED @click.stop="handleStatus(scope.row)" :type="scope.row.rangeStatus == '0' ? 'primary' : 'info'" size="mini">{{scope.row.rangeStatus == '0' ? '启用' : '禁用'}}</el-button>
            <el-button v-has:LINE_MANAGE_UPDATE @click.stop="handleEdit(scope.row)" type="primary" size="mini">修改</el-button>
            <el-button @click.stop="viewDetails(scope.row)" type="primary" size="mini">查看</el-button>
            <el-button  v-has:LINE_MANAGE_DELETE @click.stop="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
          </el-table-column>
        </el-table>
      </div>   
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" :columns='tableColumn' @success="setColumn"  />
  </div>
  </div>
</template>
<script>
import * as handAccountApi from '@/api/company/line'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import Pager from '@/components/Pagination/index'
import { getSummaries, parseTime } from '@/utils/'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import tableHeaderSearch from '@/components/tableHeaderSearch'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    tableHeaderSearch
  },
  mounted() {

  },
  data() {
    const _this = this
    return {
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      // 加载状态
      loading: true,
      setupTableVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'fromOrgid': '',
          'rangeFromCityName': '',
          'rangeToCityName': '',
          'toOrgid': ''
        }
      },
      // 默认sort值为true
      tablekey: '',
      tableColumn: [{
        'label': '序号',
        'prop': 'number',
        'fixed': true,
        'slot': function(scope) {
          return scope.$index + 1
        }
      }, {
        'label': '发站',
        'prop': 'rangeFromCity',
        width: 200,
        slot: (scope) => {
          return scope.row.rangeFromCity + scope.row.rangeFromArea
        }
      }, {
        'label': '出发网点',
        'prop': 'fromOrgName',
        width: 100
      }, {
        'label': '到站',
        'prop': 'rangeToCity',
        width: 200,
        slot: (scope) => {
          return scope.row.rangeToCity + scope.row.rangeToArea
        }
      }, {
        'label': '到达网点',
        'prop': 'toOrgName',
        'width': '100'
      }, {
        'label': '运输时效',
        'prop': 'transportAging',
        width: '90',
        slot: (scope) => {
          return scope.row.transportAgingType ? (scope.row.transportAging + ['天', '小时', '天'][scope.row.transportAgingType]) : ''
        }
      }, {
        'label': '重货价格',
        'prop': 'heavePrice',
        width: 200,
        slot: (scope) => {
          return _this.getRangePrice(scope.row.heavePrice, '公斤')
        }
      }, {
        'label': '轻货价格',
        'prop': 'lightPrice',
        width: 200,
        slot: (scope) => {
          return _this.getRangePrice(scope.row.lightPrice, '立方')
        }
      }, {
        'label': '最低价格(元)',
        'prop': 'lowerPrice',
        width: 130,
        slot: (scope) => {
          return scope.row.lowerPrice === '' ? '面议' : scope.row.lowerPrice
        }
      }, {
        'label': '创建时间',
        'prop': 'createTime',
        width: 200
      }, {
        'label': '状态',
        'prop': 'rangeStatus',
        slot: (scope) => {
          return ['<span class="imp">禁用</span>', '启用'][scope.row.rangeStatus] || ''
        }
      }, {
        'label': '线路说明',
        width: '150',
        'prop': 'transportRemark'
      }]
    }
  },
  methods: {
    changeKey(obj) {
      this.total = 0
      this.searchQuery = obj
      this.fetchAllOrder()
    },
    getRangePrice(list = [], unit) {
      if (!list || !list.length) {
        return ''
      }
      let str = '<div class="hyq-priceList">'
      list.forEach(el => {
        const start = el.startVolume || 0
        const end = el.endVolume || 0
        if (start > end) {
          str += '<p>' + start + unit + '以上  ' + el.primeryPrice + '元</p>'
        } else {
          str += '<p>' + start + '-' + end + unit + '  ' + el.primeryPrice + '元</p>'
        }
      })
      str += '</div>'
      return str
    },
    handleEdit(row) {
      const isEnable = row.rangeStatus === '0'
      const city = (row.rangeFromCity + row.rangeFromArea) + '-' + (row.rangeToCity + row.rangeToArea)
      if (!isEnable) {
        this.$message.info('请先停用该条线路再修改')
        return
      }
      this.$router.push({
        path: '/company/lineManage/modify',
        query: {
          id: row.id,
          tab: '修改线路' + city
        }
      })
    },
    handleDelete(row) {
      // 当为0时，操作就是要启用
      const isEnable = row.rangeStatus === '0'
      const city = (row.rangeFromCity + row.rangeFromArea) + '-' + (row.rangeToCity + row.rangeToArea)
      const msg = isEnable ? '确定删除' + city + '线路吗' : '确定停用' + city + '线路吗'
      if (!isEnable) {
        this.$message.info('请先停用该条线路再修改')
        return
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        handAccountApi.deleteLineById(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.fetchAllOrder()
        }).catch(err => {
          this._handlerCatchMsg(err, '操作失败，原因：')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    handleStatus(row) {
      // 当为0时，操作就是要启用
      const isEnable = row.rangeStatus === '0'
      const city = (row.rangeFromCity + row.rangeFromArea) + '-' + (row.rangeToCity + row.rangeToArea)
      const msg = isEnable ? '确定启用' + city + '线路吗' : '确定停用' + city + '线路吗'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        handAccountApi.setLineEnable(row.id, isEnable ? 1 : 0).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          row.rangeStatus = isEnable ? '1' : '0'
        }).catch(err => {
          this._handlerCatchMsg(err, '操作失败，原因：')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    viewDetails(row) {
      const city = (row.rangeFromCity + row.rangeFromArea) + '-' + (row.rangeToCity + row.rangeToArea)
      this.$router.push({
        path: '/company/lineManage/detail',
        query: {
          id: row.id,
          tab: '查看线路' + city
        }
      })
    },
    showDetail(order) {
      this.viewDetails(order)
    },
    fetchAllOrder() {
      this.loading = true
      return handAccountApi.postLineList(this.searchQuery).then(res => {
        const data = res.data
        if (!data) {
          this.$message.info('加载数据失败')
          return
        }
        this.usersArr = data.list.map(el => {
          for (const i in el) {
            if (el[i] === null) {
              el[i] = ''
            }
          }
          return el
        })
        this.total = data.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    fetchData() {
      this.fetchAllOrder()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = obj
      this.loading = false
      this.fetchData()
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add' && type !== 'export' && type !== 'print') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      switch (type) {
        case 'add':
          this.selectInfo = {}
          this.$router.push({
            path: '/company/lineManage/create'
          })
          break
        case 'detail':
          this.isModify = false
          this.selectInfo = {}
          this.showDetail(this.selected[0])
          break
          // 导出数据
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '员工交账-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '员工交账'
          })
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
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = new Date().getTime() // 刷新表格视图
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    // 计算总数
    getSummaries(param) {
      return getSummaries(param, ['shipNowpayFee', 'finishAccount', 'noSettlementFee'])
    }
  }
}
</script>
<style lang="scss">
.linemanage-manager .tab-content{
  .tab_info{
  }
  .hyq-priceList{
    text-align: left;
  }
}
</style>

