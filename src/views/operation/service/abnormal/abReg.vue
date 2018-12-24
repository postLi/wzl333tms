
<template>
    <div class="tab-content" v-loading="loading">
      <!-- <link rel="stylesheet" href="../../../company/groupManage/index.css"> -->
        <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
        <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('reg')" v-has:ABNO_ADD>异常登记</el-button>
          <el-button type="primary" :size="btnsize"  icon="el-icon-edit" @click="doAction('xiugai')" plain v-has:ABNO_PUT>异常修改</el-button>
          <el-button type="primary" :size="btnsize"  icon="el-icon-news" @click="doAction('check')" plain v-has:ABNO_SELECT>查看明细</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain v-has:ABNO_DEL>删除</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-upload2" @click="doAction('export')" plain v-has:ABNO_EXP1>导出</el-button>

          <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <!-- <el-table
         \ref="multipleTable"
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
            <template slot-scope="scope">{{ ((searchQuery.currentPage - 1)*searchQuery.pageSize) + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="abnormalNo"
            width="120"
            label="异常编号">
          </el-table-column>
          <el-table-column
            prop="shipSn"
            width="120"
            sortable
            label="运单号">
          </el-table-column>
          <el-table-column
            sortable
            width="200"
            label="开单时间">
            <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
          </el-table-column>
          <el-table-column
            prop="cargoName"
            sortable
            width="120"
            label="货品名">
          </el-table-column>
          <el-table-column
            prop="abnormalStatusName"
            label="异常状态"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            sortable
            prop="abnormalTypeName"
            width="120"
            label="异常类型">
          </el-table-column>
          <el-table-column
            label="登记网点"
            width="120"
            prop="orgName"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="dutyOrgName"
            label="责任网点"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="registerTime"
            sortable
            width="200"
            label="登记时间">
            <template slot-scope="scope">{{ scope.row.registerTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>
          <el-table-column
            prop="registerName"
            label="登记人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="registerFee"
            label="登记金额"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="abnormalAmount"
            label="异常件数"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipGoodsSn"
            label="货号"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoPack"
            label="包装"
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
            prop="abnormalDescribe"
            label="异常描述"
            width="120"
            sortables
            >
          </el-table-column>
          <el-table-column
            prop="disposeResultName"
            label="处理结果"
            width="120"
            sortable
            type="dispose_result"
            >
          </el-table-column>
           <el-table-column
            prop="disposeOrgName"
            label="处理网点"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="disposeName"
            label="处理人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="disposeOpinion"
            label="处理意见"
            width="120"
            sortable
            >
          </el-table-column>
        </el-table> -->
        <!-- 开始 -->
        <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="dataset" border @row-click="clickDetails" @selection-change="getSelection" height="100%"
        :summary-method="getSumLeft"
          show-summary
         tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
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
        <!-- 结束 -->
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <Addabnormal :issender="true" :isModify="isModify"  :isCheck="isCheck" :info="selectInfo" :id="id" :orgid="orgid" :companyId="otherinfo.companyId" :popVisible.sync="AddAbnormalVisible" @close="closeAddAbnormal" @success="fetchData"  />
    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn" code="ORDER_ABNO1"></TableSetup>
    </div>
</template>
<script>
import SearchForm from './components/search'
import { PostGetAbnormalList, delAbnormal } from '@/api/operation/dashboard'
import { mapGetters } from 'vuex'
// import TableSetup from './components/tableSetup'
import TableSetup from '@/components/tableSetup'
import Pager from '@/components/Pagination/index'
import Addabnormal from './components/add'
import { objectMerge2, parseTime, getSummaries, operationPropertyCalc } from '@/utils/index'
import { SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    Addabnormal
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
    this.loading = true
    this.searchQuery.vo.orgId = this.otherinfo.orgid
    Promise.all([this.fetchAllreceipt(this.otherinfo.orgid)]).then(resArr => {
      this.loading = false
            // this.licenseTypes = resArr[1]
    })
  },
  data() {
    return {
      btnsize: 'mini',
      component: 'Send',
      selectInfo: {},
      loading: true,
      dataset: [],
      isModify: false,
      isCheck: false,
      AddAbnormalVisible: false,
      setupTableVisible: false,
      tablekey: 0, // 加上
      isDbclick: false,
      licenseTypes: [],
      selected: [],
      total: 0,
      id: '',
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
        }
      },
      // tableColumn: []  列表对字段
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
        width: '120',
        fixed: false
      }, {
        label: '异常状态',
        prop: 'abnormalStatusName',
        width: '90',
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
        width: '90',
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
    getSumLeft(param, type) {
      return getSummaries(param, operationPropertyCalc)
    },
    fetchAllreceipt() {
      this.loading = true
      return PostGetAbnormalList(this.searchQuery).then(data => {
        this.dataset = data.list
        this.total = data.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },

    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
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
    doAction(type) {
      // 判断是否有选中项
      if (this.selected.length === 0 && type !== 'reg' && type !== 'export') {
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
            name: '异常登记'
          })
          break
        // 登记
        case 'reg':
          this.isModify = false
          this.isCheck = false
          // this.isDbclick = false
          // console.log(this.isModify)
          this.selectInfo = {}
          this.openAddAbnormal()
          break
        // 修改
        case 'xiugai':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据',
              type: 'warning'
            })
          } else if (this.selected[0].abnormalStatus === 118) {
            this.selectInfo = {}
            this.isModify = true
            this.isCheck = false
            this.selectInfo = Object.assign({}, this.selected[0])
            this.openAddAbnormal()
          } else if (this.selected[0].abnormalStatus === 119) {
            this.$message.warning('异常已经处理，不允许修改~')
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
            this.selectInfo = Object.assign({}, this.selected[0])
            this.openAddAbnormal()
          }
          break
        // 删除
        case 'delete':
          const deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].id
          // =>todo 删除多个
          // ids = ids.join(',')
          // const ids = this.selected.filter(el => {
          //   return el.abnormalStatus === 118
          // }).map(el => {
          //   return el.id
          // })
          const ids = this.selected.map(item => {
            return item.id
          })
          // console.log(ids)
          if (this.selected[0].abnormalStatus === 118) {
            this.$confirm('确定要删除 ' + deleteItem + ' 订单异常信息吗？', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true
              delAbnormal(ids).then(res => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.fetchData()
                this.loading = false
              }).catch(err => {
                this._handlerCatchMsg(err)
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          } else if (this.selected[0].abnormalStatus === 119) {
            this.$message.warning('异常已处理，不允许删除')
            return false
          }

          // this.$confirm('确定要删除 ' + deleteItem + ' 订单异常信息吗？', '提示', {
          //   confirmButtonText: '删除',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          //   delAbnormal(ids).then(res => {
          //     this.$message({
          //       type: 'success',
          //       message: '删除成功!'
          //     })
          //     this.fetchData()
          //   }).catch(err => {
          //     this.$message({
          //       type: 'info',
          //       message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
          //     })
          //   })
          // }).catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          //   })
          // })

          // const deleteItem = this.selected[0].id
          // const ids = this.selected.map(item => {
          //   return item.abnormalStatus !== 119
          // })
          // if (ids.length) {
          //   this.$confirm('确定要删除 ' + deleteItem + ' 订单异常信息吗？', '提示', {
          //     confirmButtonText: '删除',
          //     cancelButtonText: '取消',
          //     type: 'warning'
          //   }).then(() => {
          //     delAbnormal(ids).then(res => {
          //       this.$message({
          //         type: 'success',
          //         message: '删除成功!'
          //       })
          //       this.fetchData()
          //     }).catch(err => {
          //       this.$message({
          //         type: 'info',
          //         message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err
          //       })
          //     })
          //   }).catch(() => {
          //     this.$message({
          //       type: 'info',
          //       message: '已取消删除'
          //     })
          //   })
          // } else {
          //   this.$message.warning('异常已经处理，不允许删除~')
          // }
          break
        // case 'export':
        //   SaveAsFile({
        //     data: this.selected.length ? this.selected : this.dataset,
        //     columns: this.tableColumn
        //     // name: '短驳发车'
        //   })
        //   break

      }
          // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection()
    },
    openAddAbnormal() {
      this.AddAbnormalVisible = true
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
    // 显示列表
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    },
    getDbClick(row, event) {
      console.log('detail', row)
      this.selectInfo = row
      this.isCheck = true
      this.isModify = false
      // this.id = row.id
      this.openAddAbnormal()
    }
  }
}
</script>
