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
        <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%"
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
      </div>
      <div class="info_tab_footer">共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
    </div>
    <AddCustomer :arrivalStatus="arrivalStatus" :issender="true" :isModify.sync="isModify" :isAlFun="isAlFun" :info="selectInfo" :orgid="orgid" :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData" />
    <TableSetup code="ORDER_ARTER-2" :popVisible="setupTableVisible" @close="closeSetupTable" @success="setColumn" :columns="tableColumn" />
    <!-- 实际发车时间 弹出框 -->
    <actualSendtime :popVisible.sync="timeInfoVisible" @time="getActualTime" :isArrival="true" :title="'到车'"></actualSendtime>
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
import { objectMerge2, getSummaries, operationPropertyCalc } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import actualSendtime from '../load/components/actualSendtimeDialog'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddCustomer,
    actualSendtime
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {

    }
  },
  mounted() {
    this.searchQuery.vo.arriveOrgid = this.otherinfo.orgid
  },
  data() {
    return {
      arrivalStatus: '',
      timeInfoVisible: false,
      // 控制显示提示消息
      isChecked: false,
      isCheckedShow: false,
      loading: true,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      tablekey: 0,
      batchTypeId: '', //
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
          truckIdNumber: '', //
          batchTypeId: '', //
          batchNo: '', //
          loadTypeId: 39, //
          endDate: '', //
          beginDate: '', //
          arrivedbeginDate: '', //
          arrivedEndDate: '' //
        }
      },
      tableColumn: [{
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
      },
      {
        label: '到付(元)',
        prop: 'shipArrivepayFee',
        width: '90',
        fixed: false
      },
      {
        label: '操作费(元)',
        prop: 'handlingFeeAll',
        width: '100',
        fixed: false
      },
      {
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
          label: '实际到车时间',
          prop: 'actualArrivetime',
          width: '160',
          fixed: false
        }, {
          label: '到车操作时间',
          prop: 'receivingTime',
          width: '160',
          fixed: false
        }, {
          label: '实际发车时间',
          prop: 'actualSendtime',
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
          label: '实到重量(kg)',
          prop: 'actualWeight',
          width: '110',
          fixed: false
        }, {
          label: '实到体积(m³)',
          prop: 'actualVolume',
          width: '110',
          fixed: false
        }, {
          label: '配载总件数',
          prop: 'amountall',
          width: '120',
          fixed: false
        }, {
          label: '配载总重量(kg)',
          prop: 'weightall',
          width: '120',
          fixed: false
        }, {
          label: '配载总体积(m³)',
          prop: 'volumeall',
          width: '120',
          fixed: false
        }, {
          label: '重量装载率(%)',
          prop: 'weightRate',
          width: '140',
          fixed: false
        }, {
          label: '体积装载率(%)',
          prop: 'volumeRate',
          width: '140',
          fixed: false
        }, {
          label: '封签号',
          prop: 'sealNumber',
          width: '120',
          fixed: false
        },
      {
        label: '油卡号',
        prop: 'oilCardNumber',
        width: '120',
        fixed: false
      }, {
        label: '现付车费(元)',
        prop: 'nowpayCarriage',
        width: '110',
        fixed: false
      }, {
          label: '现付油卡(元)',
          prop: 'nowpayOilCard',
          width: '110',
          fixed: false
        }, {
          label: '到付车费(元)',
          prop: 'arrivepayCarriage',
          width: '110',
          fixed: false
        }, {
          label: '到付油卡(元)',
          prop: 'arrivepayOilCard',
          width: '110',
          fixed: false
        }, {
          label: '回付车费(元)',
          prop: 'backpayCarriage',
          width: '110',
          fixed: false
        }, {
          label: '回付油卡(元)',
          prop: 'backpayOilCard',
          width: '110',
          fixed: false
        },
      {
        label: '车费合计(元)',
        prop: 'totalFee',
        width: '110',
        fixed: false
      }, {
        label: '整车保险费(元)',
        prop: 'carloadInsuranceFee',
        width: '120',
        fixed: false
      }, {
          label: '发站装卸费(元)',
          prop: 'leaveHandlingFee',
          width: '120',
          fixed: false
        }, {
          label: '发站其他费(元)',
          prop: 'leaveOtherFee',
          width: '120',
          fixed: false
        }, {
          label: '到站装卸费(元)',
          prop: 'arriveHandlingFee',
          width: '120',
          fixed: false
        }, {
          label: '到站其他费(元)',
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
    getSumLeft(param, type) {
      return getSummaries(param, operationPropertyCalc)
    },
    fetchAllCustomer() {
      this.loading = true
      return postArtList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch(err => {
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
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = objectMerge2(this.searchQuery.vo, obj)
      this.fetchData()
    },
    showImport() {},
    doAction(type) {
      if (!this.selected.length && type !== 'import') {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      switch (type) {
        case 'import':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '干线到车'
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn
          })
          break
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
              console.log('选中的数据1111111', this.selectInfo)
            } else {
              this.$message.warning('批次【 ' + this.selected[0].batchNo + ' 】状态为：' + this.selected[0].bathStatusName + ', 不允许到车入库~')
              this.closeAddCustomer()
              this.$refs.multipleTable.clearSelection()
              return false
            }
          }

          break
        case 'sure':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
            this.$refs.multipleTable.clearSelection()
            return false
          }
          if (this.selected[0].bathStatusName === '在途中') {
            this.timeInfoVisible = true
          } else {
            this.closeAddCustomer()
            this.$message({
              message: '批次状态为：' + this.selected[0].bathStatusName + '不允许做到车确定~',
              type: 'warning'
            })
          }
          break
        case 'deselectCar':
          this.closeAddCustomer()

          if (this.selected && this.selected.length > 1) {
            this.$message.warning('只能选择一个批次取消到车')
            this.$refs.multipleTable.clearSelection()
            return
          }
          let id = ''
          if (this.selected[0].bathStatusName !== '已到车') {
            const bathStatusName = this.selected[0].bathStatusName
            this.$message({
              message: '批次状态为：' + bathStatusName + '不允许取消到车~',
              type: 'warning'
            })
            return false
          } else {
            id = this.selected[0].id
            this.$confirm('确定要取消到车？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              postCancelLoad(id, 39).then(res => {
                if (res) {
                  this.$message({
                    type: 'success',
                    message: '已取消到车~'
                  })
                  this.fetchData()
                }
              }).catch(err => {
                this._handlerCatchMsg(err)
              })
            })
          }
          break
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
                  this._handlerCatchMsg(err)
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

      }
      if (type !== 'sure') {
        this.$refs.multipleTable.clearSelection()
      }
    },
    getActualTime(obj) {
      this.closeAddCustomer()
      if (this.selected.length > 1) {
        this.$message({
          message: '每次只能修改单条数据~',
          type: 'warning'
        })
        return false
      } else {
        const id = this.selected[0].id
        if (this.selected[0].bathStatusName === '在途中') {
          postConfirmToCar(id, 54, obj.actualArrivetime).then(res => {
            this.$message({
              type: 'success',
              message: '到车确定成功~'
            })
            this.fetchData()
          }).catch(err => {
            this._handlerCatchMsg(err)
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
      this.arrivalStatus = row.bathStatusName
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
      this.$refs.multipleTable.clearSelection()
    },
    setColumn(obj) { //
      this.tableColumn = obj
      this.tablekey = Math.random() //
    }
  }
}

</script>
