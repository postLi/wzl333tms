<template>
  <!-- 回扣 -->
  <div class="tab-content finance-tab-content miniHeaderSearch" v-loading="loading">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!--  <div class="tab_count_lyy">
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
    </div> -->
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <div class="finance_btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-plus" @click="doAction('income')" plain v-has:BILLRECORD_ADD>新增</el-button>
          <!-- <button type="button" class="el-button "> -->
          <el-dropdown @command="handleCommand" class="dropdownButton" v-has:BILLRECORD_SMART_VERIFY>
            <el-button type="success" size="mini" plain>
              <i class="el-icon-circle-plus"></i> 智能核销
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="income">记收入</el-dropdown-item>
              <el-dropdown-item command="expand">记支出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- </button> -->
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('edit')" plain v-has:BILLRECORD_UPDATE>修改</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delCount')" plain v-has:BILLRECORD_DELETE>删除</el-button>
          <el-button type="success" :size="btnsize" icon="el-icon-rank" @click="doAction('showDetail')" plain v-has:BILLRECORD_DETAIL>查看明细</el-button>
          <el-button type="warning" :size="btnsize" icon="el-icon-tickets" @click="doAction('backCount')" plain v-has:BILLRECORD_CONTRARY_VERIFY>反核销</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:BILLRECORD_PRINT>打印</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:BILLRECORD_EXPORT>导出</el-button>
        </div>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="setTable" class="table_setup" plain>表格设置</el-button>
      </div>
      <!-- 数据表格 -->
      <div class="info_tab">
        <el-table ref="multipleTable" @row-dblclick="selectedItem" :key="tablekey" :data="dataList" stripe border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" @cell-dblclick="showDetail">
          <el-table-column fixed sortable type="selection" width="35">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="column.preview" :width="column.width">
               <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
              </template>
              <template slot-scope="scope">
                <el-button v-if="scope.row[column.prop]" size="mini" type="text" icon="el-icon-picture-outline" @click.stop.prevent.native="previewPicture( scope.row, scope.$index, column.prop)">预览({{scope.row[column.prop].split(',').length}})</el-button>
              </template>
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-else-if="!column.slot" :width="column.width">
            <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
              </template>
              <template slot-scope="scope">{{scope.row[column.prop]}}</template>
            </el-table-column>
            <el-table-column :key="column.id" :fixed="column.fixed" :prop="column.prop" sortable :label="column.label" v-else :width="column.width">
               <template slot="header" slot-scope="scope">
                <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey"/>
              </template>
              <template slot-scope="scope">
                <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                <span v-else v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <div class="previewPicture" v-if="isShowPre">
      <div class="previewPicture_info">
        <el-tag type="info">{{currentCarousel + ' / ' + previews.length}}</el-tag>
        <el-button type="info" plain @click="isShowPre = false" icon="el-icon-close" size="mini" class="previewPicture_close">关闭预览</el-button>
      </div>
      <transition name="el-zoom-in-bottom">
        <el-carousel ref="carousel" :interval="5000" :loop="false" height="300px" :arrow="arrowShow" :initial-index="0" @change="handleCarousel">
          <el-carousel-item v-for="(item, index) in previews" :key="item">
            <img :src="item" alt="" @click="prePic(item)">
          </el-carousel-item>
        </el-carousel>
      </transition>
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
import { postBillRecordList, cancelVerification, delBillRecord } from '@/api/finance/financeDaily'
import { mapGetters } from 'vuex'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import Income from './components/income'
import tableHeaderSearch from '@/components/tableHeaderSearch'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    Income,
    tableHeaderSearch
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      arrowShow: 'always',
      currentCarousel: 1,
      previews: [],
      isShowPre: false,
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
      loading: true,
      setupTableVisible: false,
      tableColumn: [{
        label: '序号',
        prop: 'number',
        width: '70',
        fixed: true,
        slot: (scope) => {
          return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
        }
      },
      {
        label: '凭证号',
        prop: 'certNo',
        width: '170',
        fixed: true
      },
      {
        label: '手工凭证号',
        prop: 'manualCert',
        width: '170',
        fixed: false
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
        width: '110'
      },
      {
        label: '方向',
        prop: 'paymentsTypeZh',
        width: '100',
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
        width: '170',
          // slot: (scope) => {
          //   return `${parseTime(scope.row.certTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          // },
        fixed: false
      },
      {
        label: '系统操作日期',
        prop: 'createTime',
        width: '180',
          // slot: (scope) => {
          //   return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          // },
        fixed: false
      },
      {
        label: '一级科目',
        prop: 'subjectOneName',
        width: '110',
        fixed: false
      },
      {
        label: '二级科目',
        prop: 'subjectTwoName',
        width: '110',
        fixed: false
      },
      {
        label: '三级科目',
        prop: 'subjectThreeName',
        width: '110',
        fixed: false
      },
      {
        label: '四级科目',
        prop: 'subjectFourName',
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
        prop: 'createName',
        width: '120',
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
        width: '90',
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
        width: '90',
        preview: true,
        fixed: true
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
    changeKey(obj) {
      this.total = 0
      this.searchQuery = obj
      this.fetchList()
    },
    handleCommand(command) {
      console.log('智能核销::', command)
      switch (command) {
        case 'income': // 收入
          this.$router.push({
            path: './financeDailyIncome',
            query: {
              orgId: this.searchQuery.vo.orgId
            }
          })
          break
        case 'expand': // 支出
          this.$router.push({
            path: './financeDailyExpanditure',
            query: {
              orgId: this.searchQuery.vo.orgId
            }
          })
          // this.$message.warning('功能尚在开发中~')
          break
      }
    },
    handleCarousel(index) {
      this.currentCarousel = index + 1
      console.log(index)
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
      this.isShowPre = false
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
        case 'delCount': // 删除
          if (isShow) {
            this.delCount()
          }
          break
        case 'backCount': // 反核销
          if (isShow) {
            this.backCount()
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
            data: this.selectedList.length > 0 ? this.selectedList : this.dataList,
            columns: this.tableColumn,
            name: '财务日记账-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selectedList.length > 0 ? this.selectedList : this.dataList,
            columns: this.tableColumn,
            name: '财务日记账-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
      }
    },
    backCount() {
      // 反核销
      // isNeededVoucher 2-不需要财务凭证的时候，可以直接反核销
      // isNeededVoucher 1-需要反核销的时候，只有非手工录入并且未审核的可以反核销
      console.log('selectedList', this.selectedList)
      if (this.selectedList[0].isNeededVoucher === '2') {
        this.cancelVerification()
      } else {
        if (this.selectedList[0].verifyStatusZh === '已审核') {
          this.$message.warning('凭证【 ' + this.selectedList[0].verifyStatusZh + ' 】不可反核销')
          this.$refs.multipleTable.clearSelection()
        } else if (this.selectedList[0].dataSrcZh === '手工录入') {
          this.$message.warning('凭证【 ' + this.selectedList[0].dataSrcZh + ' 】不可反核销')
          this.$refs.multipleTable.clearSelection()
        } else {
          this.cancelVerification()
        }
      }
    },
    cancelVerification() {
      const certNo = this.selectedList[0].certNo ? '【 ' + this.selectedList[0].certNo + ' 】' : ''
      this.$confirm('确定要反核销' + certNo + '吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        cancelVerification({
          id: this.selectedList[0].id
        }).then(data => {
          this.loading = false
          this.$message.success('反核销成功！')
          this.$refs.multipleTable.clearSelection()
          this.fetchList()
        })
            .catch(err => {
              this.loading = false
              this.$refs.multipleTable.clearSelection()
              this._handlerCatchMsg(err)
            })
      })
        .catch(() => {})
    },
    delCount() { // 删除 只有手工录入并且未审核的可以删除
      if (this.selectedList[0].verifyStatusZh !== '未审核' || this.selectedList[0].dataSrcZh !== '手工录入') {
        if (this.selectedList[0].dataSrcZh !== '手工录入') {
          this.$message.warning('凭证【 ' + this.selectedList[0].dataSrcZh + ' 】不可删除!')
        } else {
          this.$message.warning('凭证【 ' + this.selectedList[0].verifyStatusZh + ' 】不可删除!')
        }
        this.$refs.multipleTable.clearSelection()
      } else {
        const certNo = this.selectedList[0].certNo ? '【 ' + this.selectedList[0].certNo + ' 】' : ''
        this.$confirm('确定要删除' + certNo + '吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delBillRecord({ id: this.selectedList[0].id }).then(data => {
            this.loading = false
            this.$message.success('删除成功！')
            this.fetchList()
          })
              .catch(err => {
                this._handlerCatchMsg(err)
                this.loading = false
              })
        })
          .catch(() => {})
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
      //     this.$message({ type: 'success', message: '取消核销操作成功' })
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
            orgId: this.searchQuery.vo.orgId,
            searchQuery: JSON.stringify(this.searchQuery)
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
    prePic(item) {},
    previewPicture(row, index, prop) {
      if (row[prop]) {
        this.previews = Object.assign([], row[prop].split(','))
        this.isShowPre = true
      }
      console.log('previewPicture', index, row, )
    }
  }
}

</script>
<style lang="scss">
.finance-tab-content {
  .btns_box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .finance_btns_box {
    display: flex;
    flex-direction: row;
    .dropdownButton {
      margin: 0 10px;
    }
  }
  .table_setup {
    align-self: flex-end;
  }
}


.tab-content {
  .previewPicture {
    margin: -30px 10px 40px;
    .el-carousel {
      padding-top: 20px;
      background-color: #eee;
      box-shadow: 3px -10px 20px #ccc;
      .el-carousel__item {
        text-align: center;
      }
      img {
        width: auto;
        height: 100%;
      }
    }
    .previewPicture_info {
      height: 38px;
      .previewPicture_close {
        float: right;
        clear: both;
      }
    }
  }
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
