
<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('sure')" v-has:LOAD_GX_ARRIVE>到车确定</el-button>
          <el-button type="success" :size="btnsize" icon="el-icon-circle-check" plain @click="doAction('storage')" v-has:LOAD_GX_REPERTORY>到货入库</el-button>
          <el-button type="info" :size="btnsize" icon="el-icon-circle-close-outline" @click="doAction('deselectCar')" plain v-has:LOAD_GX_CANCEL>取消到车</el-button>
          <el-button type="warning" :size="btnsize" icon="el-icon-circle-close-outline" @click="doAction('deleteStor')" plain v-has:LOAD_GX_CANCELREPE>取消入库</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('import')" plain v-has:LOAD_E1>导出批次</el-button>
          <el-button type="success" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:LOAD_E2>导出配载</el-button>
          <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:LOAD_P1>打印配载清单</el-button>
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
    <AddCustomer :issender="true" :isModify.sync="isModify" :isAlFun="isAlFun" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData"  />
    <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" @success="setColumn" :columns="tableColumn"  />
  </div>
</template>
<script>
import { getExportExcel } from '@/api/company/customerManage'
import { postArtList, postCancelLoad, postCancelPut, postConfirmToCar } from '@/api/operation/arteryDelivery'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import AddCustomer from './components/storages'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { objectMerge2 } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddCustomer
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {

    }
  },
  mounted() {
    // this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.searchQuery.vo.arriveOrgid = this.otherinfo.orgid
    // this.fetchAllCustomer()
  },
  data() {
    return {
      // 控制显示提示消息
      isChecked: false,
      isCheckedShow: false,
      loading: true,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      tablekey: 0,
      batchTypeId: '', // 批次状态
      setupTableVisible: false,
      AddCustomerVisible: false,
      isModify: false,
      isAlFun: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'orgid': '',
          'arriveOrgid': '',
          dirverName: '',
          truckIdNumber: '', // 车牌号
          batchTypeId: '', // 批次状态
          batchNo: '', // 发车批次
          loadTypeId: 39, // 配载类型
          endTime: '', // 结束时间
          beginTime: '', //
          arrivedbeginDate: '', // 到达时间(起始时间)
          arrivedEndDate: ''// 到达时间(结束时间)
        }
      },
      tableColumn: [
        {
          label: '序号',
          width: '70',
          fixed: true,
          slot: (scope) => {
            return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
          }
        }, {
          label: '发车批次',
          prop: 'batchNo',
          width: '120',
          fixed: true
        }, {
          label: '车牌号',
          prop: 'truckIdNumber',
          width: '110',
          fixed: true
        }, {
          label: '发车网点',
          prop: 'orgName',
          width: '110',
          fixed: false
        }, {
          label: '目的网点',
          prop: 'endOrgName',
          width: '110',
          fixed: false
        }, {
          label: '批次状态',
          prop: 'bathStatusName',
          width: '110',
          fixed: false
        }, {
          label: '到车时间',
          prop: 'receivingTime',
          width: '160',
          fixed: false
        }, {
          label: '发车时间',
          prop: 'departureTime',
          width: '160',
          fixed: false
        }, {
          label: '时效',
          prop: 'timeLiness',
          width: '120',
          fixed: false
        }, {
          label: '司机名称',
          prop: 'dirverName',
          width: '150',
          fixed: false
        }, {
          label: '司机电话',
          prop: 'dirverMobile',
          width: '130',
          fixed: false
        }, {
          label: '实到件数',
          prop: 'actualAmount',
          width: '100',
          fixed: false
        }, {
          label: '实到重量',
          prop: 'actualWeight',
          width: '110',
          fixed: false
        }, {
          label: '实到体积',
          prop: 'actualVolume',
          width: '110',
          fixed: false
        }, {
          label: '配载总件数',
          prop: 'amountall',
          width: '120',
          fixed: false
        }, {
          label: '配载总重量',
          prop: 'weightall',
          width: '120',
          fixed: false
        }, {
          label: '配载总体积',
          prop: 'volumeall',
          width: '120',
          fixed: false
        }, {
          label: '重量装载率',
          prop: 'weightRate',
          width: '160',
          fixed: false
        }, {
          label: '体积装载率',
          prop: 'volumeRate',
          width: '160',
          fixed: false
        }, {
          label: '现付运费',
          prop: 'nowpayCarriage',
          width: '110',
          fixed: false
        }, {
          label: '现付油卡',
          prop: 'nowpayOilCard',
          width: '110',
          fixed: false
        }, {
          label: '到付运费',
          prop: 'arrivepayCarriage',
          width: '110',
          fixed: false
        }, {
          label: '到付油卡',
          prop: 'arrivepayOilCard',
          width: '110',
          fixed: false
        }, {
          label: '回付运费',
          prop: 'backpayCarriage',
          width: '110',
          fixed: false
        }, {
          label: '回付油卡',
          prop: 'backpayOilCard',
          width: '110',
          fixed: false
        }, {
          label: '运费合计',
          prop: 'totalFee',
          width: '110',
          fixed: false
        }, {
          label: '整车保险费',
          prop: 'carloadInsuranceFee',
          width: '120',
          fixed: false
        }, {
          label: '发站装卸费',
          prop: 'leaveHandlingFee',
          width: '120',
          fixed: false
        }, {
          label: '发站其他费',
          prop: 'leaveOtherFee',
          width: '120',
          fixed: false
        }, {
          label: '到站装卸费',
          prop: 'arriveHandlingFee',
          width: '120',
          fixed: false
        }, {
          label: '到站其他费',
          prop: 'arriveOtherFee',
          width: '120',
          fixed: false
        }, {
          label: '配载时间',
          prop: 'loadTime',
          width: '160',
          fixed: false
        }, {
          label: '配载人',
          prop: 'username',
          width: '90',
          fixed: false
        }, {
          label: '发车人',
          prop: 'truckName',
          width: '90',
          fixed: false
        }, {
          label: '备注',
          prop: 'remark',
          width: '150',
          fixed: false
        }
      ]
    }
  },
  methods: {
    fetchAllCustomer() {
      this.loading = true
      return postArtList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch(err => {
        this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
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
      this.fetchData()
    },
    showImport() {
      // 显示导入窗口
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'import') {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      switch (type) {
                // 导出
        case 'import':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn
          })
          break
          // 打印
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn
            // name: '回单回收'
          })
          break
          // ruku
        case 'storage':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
            return false
          } else {
            if (this.selected[0].bathStatusName === '已到车' || this.selected[0].bathStatusName === '在途中' || this.selected[0].bathStatusName === '部分入库') {
              this.selectInfo = this.selected[0]
              this.isModify = false
              this.isAlFun = false
              this.openAddCustomer()
            } else {
              this.closeAddCustomer()
                // this.$message({
                //   message: '已到车的批次才可以做到货入库~',
                //   type: 'warning'
                // })
              this.$refs.multipleTable.clearSelection()
              return false
            }
          }

          break
          // 到车确定
        case 'sure':
          this.closeAddCustomer()
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
            return false
          } else {
                // 在途中
            const id = this.selected[0].id
            if (this.selected[0].bathStatusName === '在途中') {
              postConfirmToCar(id, 54).then(res => {
                this.$message({
                  type: 'success',
                  message: '到车确定成功~'
                })
                this.fetchData()
              }).catch(err => {
                this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
              })
            } else {
              this.closeAddCustomer()
              const bathStatusName = this.selected[0].bathStatusName
              this.$message({
                message: '批次状态为：' + bathStatusName + '不允许做到车确定~',
                type: 'warning'
              })
              return false
            }
          }
          break
        // sure 到车确定   deselectCar取消到车  deleteStor取消入库

          // deselectCar取消到车
        case 'deselectCar':
          this.closeAddCustomer()

          let ids = this.selected.filter(el => {
            return el.bathStatusName === '已到车'
          }).map(el => {
            return el.id
          })
          if (!ids.length) {
            const bathStatusName = this.selected[0].bathStatusName
            this.$message({
              message: '批次状态为：' + bathStatusName + '不允许取消到车~',
              type: 'warning'
            })
            return false
          } else {
            ids = ids.join(',')
            this.$confirm('确定要取消到车？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              postCancelLoad(ids, 54).then(res => {
                this.$message({
                  type: 'success',
                  message: '已取消到车~'
                })
                this.fetchData()
              }).catch(err => {
                this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
          break
          // 取消入库
        case 'deleteStor':
          this.closeAddCustomer()
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
            return false
          } else {
            const deleteItemName = this.selected[0].batchNo
              // =>todo 删除多个
            let _ids = this.selected.map(item => {
              return item.id
            })
            _ids = _ids.join(',')

            if (this.selected[0].bathStatusName === '已入库' || this.selected[0].bathStatusName === '部分入库') {
              this.$confirm('确定要取消发车批次 ' + deleteItemName + ' 入库吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                postCancelPut(_ids, 54).then(res => {
                  this.$message({
                    type: 'success',
                    message: '已取消入库~'
                  })
                  this.fetchData()
                }).catch(err => {
                  this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消入库'
                })
              })
            } else {
              this.closeAddCustomer()
              const bathStatusName = this.selected[0].bathStatusName
              this.$message({
                message: '批次状态为：' + bathStatusName + '不允许取消入库~',
                type: 'warning'
              })
              return false
            }
          }

          break
          // 导出数据

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
      this.AddCustomerVisible = false
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    getDbClick(row, event) {
      if (row.bathStatusName === '在途中') {
        this.selectInfo = row
        this.openAddCustomer()
        this.isModify = true
        this.isAlFun = false
      }
      if (row.bathStatusName === '已入库') {
        this.selectInfo = row
        this.openAddCustomer()
        this.isModify = false
        this.isAlFun = true
      } else {
        this.selectInfo = row
        this.openAddCustomer()
        this.isModify = false
        this.isAlFun = false
      }
      // else {
      //   let bathStatusName = row.bathStatusName
      //   this.$message({
      //     message: '批次状态为：' + bathStatusName + '不允许做到车确定~',
      //     type: 'warning'
      //   })
      //   this.closeAddCustomer()
      //   return false
      // }
      this.$refs.multipleTable.clearSelection()
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}
</script>
