<template>
  <div class="tab-content" v-loading="loading">
    <!-- 短驳跟踪 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-setting" @click="setInfo" plain class="table_setup" :disabled="isDisBtn" v-has:LOADTRACK2>在途跟踪</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%"
        :summary-method="getSumLeft"
          show-summary
         tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @row-dblclick="setInfo">
          <el-table-column fixed sortable type="selection" width="35">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="info_tab_footer">
        共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
      <!-- 在途跟踪 -->
      <editInfo :orgid="orgid" :id='trackId' :info="trackInfo" :popVisible.sync="editInfoVisible" @close="closeMe" :detailType="'detailShort'"></editInfo>
      <!-- 表格设置弹出框 -->
      <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn" code="LOADTRACK2"></TableSetup>
    </div>
  </div>
</template>
<script>
import SearchForm from './components/searchShort'
import { mapGetters } from 'vuex'
import { postTrackList } from '@/api/operation/track'
import Pager from '@/components/Pagination/index'
import editInfo from './components/editInfo'
import TableSetup from '@/components/tableSetup'
import { objectMerge2, parseTime, getSummaries, operationPropertyCalc } from '@/utils/index'
export default {
  components: {
    SearchForm,
    Pager,
    editInfo,
    TableSetup
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  data() {
    return {
      btnsize: 'mini',
      dataList: [],
      total: 0,
      isDisBtn: true,
      trackId: 0,
      tablekey: 0,
      selectInfo: [],
      trackInfo: {},
      loading: true,
      editInfoVisible: false,
      setupTableVisible: false,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          loadTypeId: 38,
          orgId: 0
          // batchNo: '',
          // batchTypeId: '',
          // deliveryBatchType: '',
          // dirverName: '',
          // endTime: '',
          // mainBatchType: '',
          // shortBatchType: '',
          // startTime: '',
          // truckIdNumber: ''
        }
      },
      tableColumn: [{
        label: '发货批次',
        prop: 'batchNo',
        width: '110',
        fixed: true
      },
      {
        label: '批次状态',
        prop: 'batchTypeName',
        width: '100',
        fixed: true
      },
      {
        label: '车牌号',
        prop: 'truckIdNumber',
        width: '120'
      },
      {
        label: '司机',
        prop: 'dirverName',
        width: '120'
      },
      {
        label: '司机电话',
        prop: 'dirverMobile',
        width: '120'
      },
      {
        label: '短驳时间',
        prop: 'departureTime',
        width: '160',
        slot: (scope) => {
            return `${parseTime(scope.row.departureTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
      },
      {
        label: '配载时间',
        prop: 'loadTime',
        width: '160',
        slot: (scope) => {
            return `${parseTime(scope.row.loadTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
      },
      {
        label: '目的网点',
        prop: 'arriveOrgName',
        width: '120'
      },
      {
        label: '接收时间',
        prop: 'receivingTime',
        width: '160',
        slot: (scope) => {
            return `${parseTime(scope.row.receivingTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          }
      },
      {
        label: '短驳费',
        prop: 'shortFee',
        width: '120'
      },
      {
        label: '总件数',
        prop: 'shipAmount',
        width: '120'
      },
      {
        label: '总重量',
        prop: 'shipWeightall',
        width: '120'
      },
      {
        label: '总体积',
        prop: 'shipVolumeall',
        width: '120'
      },
      {
        label: '重量装载率',
        prop: 'weightLoadRate',
        width: '120'
      },
      {
        label: '体积装载率',
        prop: 'volumeLoadRate',
        width: '120'
      },
      {
        label: '分摊方式',
        prop: 'apportionType',
        width: '120'
      },
      {
        label: '可载重量',
        prop: 'truckLoad',
        width: '120'
      },
      {
        label: '可载体积',
        prop: 'truckVolume',
        width: '120'
      },
      {
        label: '短驳经办人',
        prop: 'username',
        width: '120'
      },
      {
        label: '备注',
        prop: 'remark',
        width: '120'
      }
      ]
    }
  },
  mounted() {
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    this.fetchList()
  },
  methods: {
    getSumLeft(param, type) {
      return getSummaries(param, operationPropertyCalc)
    },
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = Object.assign({}, obj) // 38-短驳 39-干线 40-送货
      if (!this.searchQuery.vo.orgId) {
        this.searchQuery.vo.orgId = this.otherinfo.orgid
        this.searchQuery.vo.loadTypeId = 38
      }
      this.fetchList()
    },
    getSelection(list) {
      if (list.length === 1) {
        this.selectInfo = Object.assign([], list)
        this.isDisBtn = false
        let tid = 0
        this.selectInfo.forEach(e => {
          tid = e.id
          this.trackInfo = Object.assign({}, e)
        })
        this.trackId = tid
      } else if (list.length > 1) {
        this.$message({ type: 'warning', message: '只能选择一条数据进行跟踪设置' })
        this.isDisBtn = true
      } else {
        this.isDisBtn = true
      }
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    setInfo() {
      this.editInfoVisible = true
      this.$refs.multipleTable.clearSelection()
    },
    closeMe() {
      this.editInfoVisible = false
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchList()
    },
    fetchList() {
      this.getAllList()
    },
    getAllList() {
      this.loading = true
      if (this.searchQuery.vo.batchTypeId === 46) {
        this.searchQuery.vo.batchTypeId = undefined
      }
      return postTrackList(this.searchQuery).then(data => {
        if (data) {
          this.dataList = data.list
          this.total = data.total
          this.loading = false
          this.searchQuery.vo = {}
        } else {
          this.loading = false
        }
      })
      .catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
