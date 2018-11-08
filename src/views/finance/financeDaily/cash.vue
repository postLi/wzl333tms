<template>
  <!-- 回扣 -->
  <div class="tab-content" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <div class="tab_count_lyy">
      <el-card shadow="never" class="box-card green">
        <p><span>期初余额</span><i>23452</i></p>
      </el-card>
      <el-tag type="info">+</el-tag>
      <el-card shadow="never" class="box-card orange">
        <p><span>本期发生增加额</span><i>23452</i></p>
      </el-card>
      <el-tag type="info">-</el-tag>
      <el-card shadow="never" class="box-card purple">
        <p><span>期末发生减少额</span><i>23452</i></p>
      </el-card>
      <el-tag type="info">=</el-tag>
      <el-card shadow="never" class="box-card blue">
        <p><span>期末余额</span><i>23452</i></p>
      </el-card>
    </div>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-plus" @click="doAction('income')" plain v-has:FLOW_IN>新增</el-button>
        <button type="button" class="el-button nobutton">
          <el-dropdown @command="handleCommand">
            <el-button type="success" size="mini" plain>
              <i class="el-icon-circle-plus"></i> 智能核销
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="income">记收入</el-dropdown-item>
              <el-dropdown-item command="expand">记支出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('edit')" plain v-has:FLOW_OUT>修改</el-button>
        <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('cancelCount')" plain v-has:FLOW_CANCEL>删除</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-rank" @click="doAction('showDetail')" plain v-has:FLOW_DETAIL>查看明细</el-button>
        <!-- <el-button type="success" :size="btnsize" icon="el-icon-rank" @click="showDetail" plain v-has:FLOW_DETAIL>查看明细</el-button> -->
        <el-button type="warning" :size="btnsize" icon="el-icon-tickets" @click="doAction('showCount')" plain v-has:FLOW_FIND>反核销</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:FLOW_PRI>打印</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:FLOW_EXP>导出</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" @row-dblclick="selectedItem" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" @cell-dblclick="showDetail">
          <el-table-column fixed sortable type="selection" width="35">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="column.preview" :width="column.width">
              <template slot-scope="scope">
                <el-button v-if="scope.row[column.prop]" size="mini" type="text" icon="el-icon-picture-outline" @click.stop.prevent.native="previewPicture( scope.row, scope.$index)">预览({{scope.row[column.prop].split(',').length}})</el-button>
              </template>
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-else-if="!column.slot" :width="column.width">
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
    </div>
    <div class="previewPicture">
      <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in previews" :key="item">
      <img :src="item" alt="" @click="">
    </el-carousel-item>
  </el-carousel>
      </div>
    <!-- 分页 -->
    <div class="info_tab_footer">
      共计:{{ total }}
      <div class="show_pager">
        <Pager :total="total" @change="handlePageChange" />
      </div>
    </div>
    <!-- 表格设置弹出框 -->
    <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    <!-- 新增 -->
    <Income :popVisible="popVisibleIncome" :info="currentInfo" @close="closeDialogIncome" @success="setAddSuccess" :isModify="isModify"></Income>
  </div>
</template>
<script>
import { objectMerge2, parseTime } from '@/utils/index'
import SearchForm from './components/search'
import Pager from '@/components/Pagination/index'
import TableSetup from '@/components/tableSetup'
import { postBillRecordList } from '@/api/finance/financeDaily'
import { mapGetters } from 'vuex'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import Income from './components/income'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    Income
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      previews: [
      'https://desk-fd.zol-img.com.cn/t_s720x360c5/g5/M00/0E/0F/ChMkJ1sYylmIJMWEAA2kWnSS2pMAAo2TQGcckMADaRy914.jpg',
      'https://desk-fd.zol-img.com.cn/t_s720x360c5/g5/M00/09/09/ChMkJluIoTyIXX2eAB3KJaynnIgAArW1QGZwaQAHco9007.jpg',
      'https://desk-fd.zol-img.com.cn/t_s720x360c5/g5/M00/02/04/ChMkJlpZZLeIGFB8AATf7vf_nYQAAkD4wFg_xEABOAG369.jpg',
      'https://desk-fd.zol-img.com.cn/t_s720x360c5/g5/M00/0A/0B/ChMkJ1tEfAKIeyCwAF6u9pbKmU0AAplXQBdHUIAXq8O746.jpg'
      ],
      currentInfo: {},
      popVisibleIncome: false,
      btnsize: 'mini',
      feeType: 8,
      selectedList: [],
      isModify: false,
      selectListShipSns: [],
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          orgId: '',
          startTime: '',
          endTime: ''
        }
      },
      tablekey: 0,
      total: 0,
      dataList: [],
      popVisibleDialog: false,
      loading: false,
      setupTableVisible: false,
      tableColumn: [{
          label: '序号',
          prop: 'id',
          width: '50',
          fixed: true,
          slot: (scope) => {
            return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
          }
        },
        {
          label: '来源',
          prop: 'dataSrcZh',
          width: '110',
          fixed: true
        },
        {
          label: '类别',
          prop: 'verificationWay',
          width: '110',
        },
        {
          label: '方向',
          prop: 'paymentsTypeZh',
          width: '90',
          fixed: true
        },
        {
          label: '金额',
          prop: 'amount',
          width: '90',
          fixed: false
        },
        {
          label: '发票号码',
          prop: 'invoiceNo',
          width: '130',
          fixed: false
        },
        {
          label: '收据号码',
          prop: 'receiptNo',
          width: '130',
          fixed: false
        },
        {
          label: '支票号码',
          prop: 'checkNo',
          width: '130',
          fixed: false
        },
        {
          label: '凭证日期',
          prop: 'certTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.certTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
          fixed: false
        },
        {
          label: '系统操作日期',
          prop: 'verifyTime',
          width: '160',
          slot: (scope) => {
            return `${parseTime(scope.row.verifyTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          },
          fixed: false
        },
        {
          label: '一级科目',
          prop: 'subjectOne',
          width: '110',
          fixed: false
        },
        {
          label: '二级科目',
          prop: 'subjectTwo',
          width: '110',
          fixed: false
        },
        {
          label: '三级科目',
          prop: 'subjectThree',
          width: '110',
          fixed: false
        },
        {
          label: '四级科目',
          prop: 'subjectFour',
          width: '110',
          fixed: false
        },
        {
          label: '摘要',
          prop: 'remark',
          width: '150',
          fixed: false
        },
        {
          label: '记账网点',
          prop: 'orgName',
          width: '150',
          fixed: false
        },
        {
          label: '核销人',
          prop: 'createBy',
          width: '120',
          fixed: false
        },
        {
          label: '手工凭证号',
          prop: 'manualCert',
          width: '150',
          fixed: false
        },
        {
          label: '凭证号',
          prop: 'certNo',
          width: '150',
          fixed: false
        },
        {
          label: '笔数',
          prop: 'verifyCount',
          width: '100',
          fixed: false
        },
        {
          label: '审核人',
          prop: 'verifyMan',
          width: '120',
          fixed: false
        },
        {
          label: '审核状态',
          prop: 'verifyStatusZh',
          width: '100',
          fixed: true
        },
        {
          label: '审核日期',
          prop: 'verifyTime',
          width: '180',
          fixed: false
        },
        {
          label: '凭证图片',
          prop: 'picsPath',
          width: '180',
          preview: true,
          fixed: false
        }
      ]
    }
  },
  watch: {
    $route(newVal) {
      if (newVal) {
        this.fetchList()
      }
    }
  },
  methods: {
    handleCommand(command) {
      console.log('智能核销::', command)
    },
    setAddSuccess() {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.fetchList()
    },
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = Object.assign({}, obj)
      this.fetchList()
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchList()
    },
    fetchList() {
      this.loading = true
      return postBillRecordList(this.searchQuery).then(data => {
        this.dataList = data.list
        this.total = data.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    setTable() {},
    doAction(type) {
      let isShow = false
      if (this.selectedList.length !== 1 && type !== 'income' && type !== 'expandtiure' && type !== 'export' && type !== 'print') {
        isShow = false
        this.$message({ type: 'warning', message: '请选择一条数据' })
        return
      } else {
        isShow = true
      }
      switch (type) {
        case 'income': // 记收入
          this.income()
          break
        case 'expandtiure': // 记支出
          this.expandtiure()
          break
        case 'cancelCount': // 取消结算
          if (isShow) {
            this.$confirm('确定要取消【 ' + this.selectedList[0].settlementSn + ' 】吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.cancelCount()
            })
          }
          break
        case 'showCount': // 查看结算单
          if (isShow) {
            this.showCount()
          }
          break
        case 'showDetail':
          if (isShow) {
            this.showDetail() // 查看明细
          }
          break
        case 'edit':
          if (this.selectedList.length > 0 && this.selectedList[0].verifyStatusZh === '未审核') {
            this.doEdit()
          } else {
            this.$message.warning('凭证【 ' + this.selectedList[0].verifyStatusZh + ' 】不可修改')
          }
          break
        case 'export':
          SaveAsFile({
            data: this.dataList,
            columns: this.tableColumn,
            name: '资金流水-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.dataList,
            columns: this.tableColumn,
            name: '资金流水'
          })
          break
      }
    },
    income() { // 新增
      this.isModify = false
      this.popVisibleIncome = true
    },
    expandtiure() {
      this.$router.push({
        path: './settleLogExpandtiure',
        query: {
          orgId: this.searchQuery.vo.orgId
        }
      })
    },
    cancelCount() {
      const data = {}
      this.$set(data, 'flowId', this.selectedList[0].flowId)
      // postCancelSettlement(data).then(data => {
      //     this.$message({ type: 'success', message: '取消结算操作成功' })
      //     this.fetchList()
      //   })
      //   .catch(err => {
      //     this._handlerCatchMsg(err)
      //     this.fetchList()
      //   })
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectedList = list
      this.selectListShipSns = []
      list.forEach((e, index) => {
        this.selectListShipSns.push(e.shipSn)
      })
    },
    selectedItem(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
      this.showDetail()
    },
    showDetail() {
      if (this.selectedList.length > 0) {
        this.$router.push({
          path: './cashDetail',
          query: {
            recordId: this.selectedList[0].id,
            orgId: this.searchQuery.vo.orgId
          }
        })
      }
      // this.$router.push({
      //   path: './cashDetail',
      //   query: {
      //     orgId: this.searchQuery.vo.orgId
      //   }
      // })
    },
    doEdit() { // 修改
      this.currentInfo = Object.assign({}, this.selectedList[0])
      this.isModify = true
      this.popVisibleIncome = true
      this.$refs.multipleTable.clearSelection()
      // this.$message.warning('此功能尚在开发中~')
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    closeDialogIncome() {
      this.popVisibleIncome = false
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    },
    previewPicture(row, index) {
      console.log('previewPicture', index, row)
    }
  }
}

</script>
<style lang="scss">
.nobutton {
  padding: 0;
  border: none;
}
.tab-content{
  .previewPicture {
    margin: -30px 10px 40px;
    .el-carousel{
      padding-top: 20px;
      background-color: #eee;
      box-shadow: 3px -10px 30px #ccc;
    }
  }
}
.nobutton.el-button:focus,
.nobutton.el-button:hover {
  border: none;
}

.tab_count_lyy {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: #F2F6FC;
  margin: 0 10px;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px dashed #999;
  .el-tag {
    margin: 0 10px;
    font-weight: 700;
    font-size: 20px;
  }
  .box-card {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    flex-grow: 1;
    .el-card__body {
      padding: 10px;
    }
    p {
      display: flex;
      flex-direction: row;
      font-size: 14px;
      span {
        margin-right: 10px;
        display: block;
        width: 110px;
        text-align: center;
      }
      i {
        text-align: center;
        display: block;
        width: calc(100% - 110px);
        font-style: normal;
        border-bottom: 1px solid #999;
        padding: 0 10px;
      }
    }
  }
  
}

</style>
