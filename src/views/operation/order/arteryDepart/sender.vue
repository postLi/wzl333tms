<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')" v-has:LOAD_GX_ADD>新增配载
        </el-button>
        <!-- <el-button type="danger" :size="btnsize" icon="el-icon-circle-plus-outline" plain @click="doAction('Intelligent')" v-has:LOAD_GX_SMART>智能配载
        </el-button> -->
        <el-button type="success" :size="btnsize" icon="el-icon-circle-check" plain @click="doAction('depart')" v-has:LOAD_GX_LOADDEPART>发车
        </el-button>
        <el-button type="info" :size="btnsize" icon="el-icon-circle-close-outline" @click="doAction('deselectCar')" plain v-has:LOAD_GX_CANCELDEPART>取消发车
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="doAction('sure')" v-has:LOAD_GX_UPDATE>修改</el-button>
        <el-button type="warning" :size="btnsize" icon="el-icon-circle-close-outline" @click="doAction('deleteStor')" plain v-has:LOAD_GX_CANCELTRUCK>取消装车
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain v-has:LOAD_GX_EXPORT>导出
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain v-has:LOAD_GX_PRINT>打印</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('import')" plain v-has:LOAD_GX_PRINTCONTRACT>打印合同
        </el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">
          表格设置
        </el-button>
        <span class="dbclickTips">双击查看详情</span>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" @row-dblclick="getDbClick" :data="usersArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%" :summary-method="getSumLeft" show-summary tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
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
    <AddCustomer :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :id='trackId' :popVisible.sync="AddCustomerVisible" @close="closeAddCustomer" @success="fetchData" />
    <TableSetup code="ORDER_ARTER-1" :popVisible="setupTableVisible" @close="closeSetupTable" @success="setColumn" :columns="tableColumn" />
    <AddLntelligent :popVisible.sync="lntelligentVisible" @close="openlntelligent" @success="fetchData" :dotInfo="selectInfo"></AddLntelligent>
    <!-- 实际发车时间 弹出框 -->
    <actualSendtime :popVisible.sync="timeInfoVisible" @time="getActualTime"></actualSendtime>
  </div>
</template>
<script>
import { getExportExcel } from '@/api/company/customerManage'
import actualSendtime from '../load/components/actualSendtimeDialog'
import {
  postSelectLoadMainInfoList,
  putLoadDepart,
  putCancelLoadDepart,
  putCancelLoadTruck,
  getLookContract
} from '@/api/operation/arteryDepart'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import AddCustomer from './components/storages'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { objectMerge2, getSummaries, operationPropertyCalc, parseTime } from '@/utils/index'
import { PrintInFullPage, SaveAsFile, PrintContract } from '@/utils/lodopFuncs'
import AddLntelligent from './components/addLntelligent '
// import AddLntelligent from './components/intelligentFreight'
// import AddLntelligent from './components/intelligentHint'
// import AddLntelligent from './components/intelligentPayHint'

// import { PrintContract } from '@/utils/lodopFuncs'
export default {
  components: {
    SearchForm,
    Pager,
    TableSetup,
    AddCustomer,
    AddLntelligent,
    actualSendtime
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {

    }
  },
  actived() {
    this.fetchAllCustomer()
  },
  mounted() {
    this.fetchAllCustomer()
    this.tablekey = new Date().getTime()
  },
  data() {
    return {
      timeInfoVisible: false,
      checkBillName_child: '',
      watchKey: 'lll',
      tablekey: 0,
      loading: true,
      btnsize: 'mini',
      usersArr: [],
      total: 0,
      trackId: '',
      setupTableVisible: false,
      AddCustomerVisible: false,
      lntelligentVisible: false,
      isModify: false,
      selectInfo: {},
      // 选中的行
      selected: [],
      searchQuery: {
        // "currentPage": 1,
        'pageNum': 1,
        'pageSize': 100,
        'vo': {
          'orgId': '',
          dirverName: '',
          truckIdNumber: '', // 车牌号
          batchTypeId: '', // 批次状态
          batchNo: '', // 发车批次
          loadTypeId: 39, // 配载类型 38
          loadEndTime: '', // 结束时间
          loadStartTime: '',
          departureStartTime: '',
          departureEndTime: ''
        }
      },
      tableColumn: [{
          label: '序号',
          prop: 'number',
          width: '70',
          fixed: true,
          slot: (scope) => {
            return ((this.searchQuery.pageNum - 1) * this.searchQuery.pageSize) + scope.$index + 1
          }
        },
        {
          label: '发车批次',
          prop: 'batchNo',
          width: '120',
          fixed: true
        }, {
          label: '到付(元)',
          prop: 'shipArrivepayFee',
          width: '90',
          fixed: false
        }, {
          label: '操作费(元)',
          prop: 'handlingFeeAll',
          width: '100',
          fixed: false
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
        },  {
          label: '途径网点一',
          prop: 'wayOrgNameOne',
          width: '110',
          fixed: false
        },{
          label: '途径网点二',
          prop: 'wayOrgNameTwo',
          width: '110',
          fixed: false
        },
        {
          label: '途径网点三',
          prop: 'wayOrgNameThree',
          width: '110',
          fixed: false
        }, 
        {
          label: '途径网点四',
          prop: 'wayOrgNameFour',
          width: '110',
          fixed: false
        },{
          label: '到达网点',
          prop: 'arriveOrgName',
          width: '110',
          fixed: false
        }, {
          label: '批次状态',
          prop: 'batchTypeName',
          width: '110',
          fixed: false
        }, {
          label: '配载时间',
          prop: 'loadTime',
          width: '160',
          fixed: false
        }, {
          label: '发车操作时间',
          prop: 'departureTime',
          width: '160',
          fixed: false
        }, {
          label: '实际发车时间',
          prop: 'actualSendtime',
          width: '160',
          fixed: false
        }, {
          label: '司机名称',
          prop: 'dirverName',
          width: '150',
          fixed: false
        }, {
          label: '配载总件数',
          prop: 'loadAmountall',
          width: '120',
          fixed: false
        }, {
          label: '配载总重量(kg)',
          prop: 'loadWeightall',
          width: '120',
          fixed: false
        }, {
          label: '配载总体积(m³)',
          prop: 'loadVolumeall',
          width: '120',
          fixed: false
        }, {
          label: '重量装载率',
          prop: 'weightLoadRate',
          width: '120',
          fixed: false
        }, {
          label: '体积装载率',
          prop: 'volumeLoadRate',
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
        }, {
          label: '车费合计(元)',
          prop: 'shipFeeAmount',
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
        },
        {
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
        },
        // {
        //   label: '配载时间',
        //   prop: 'loadTime',
        //   width: '160',
        //   fixed: false
        // },
        {
          label: '配载人',
          prop: 'userName',
          width: '90',
          fixed: false
        }, {
          label: '发车人',
          prop: 'truckUserName',
          width: '120',
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
      return postSelectLoadMainInfoList(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.usersArr.forEach((el, index) => {
          if (el.wayOrgName) {
            el.wayOrgNameOne = el.wayOrgName.split(',')[0] || ''
            el.wayOrgNameTwo = el.wayOrgName.split(',')[1] || ''
            el.wayOrgNameThree = el.wayOrgName.split(',')[2] || ''
            el.wayOrgNameFour = el.wayOrgName.split(',')[3] || ''
          }
        })
        this.total = data.total
        this.loading = false
      }).catch(err => {
        this._handlerCatchMsg(err)
        this.loading = false
      })
    },
    fetchData() {
      this.fetchAllCustomer()
    },
    handlePageChange(obj) {
      Object.assign(this.searchQuery, obj)
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.pageNum = this.$options.data().searchQuery.pageNum
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
      this.fetchAllCustomer()
    },
    showImport() {
      // 显示导入窗口
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'add' && type !== 'export' && type !== 'print' && type !== 'Intelligent') {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }

      switch (type) {
        case 'Intelligent':
          // this.$message({
          //   message: '改功能待开发~',
          //   type: 'warning'
          // })
          this.selectInfo = this.selected[0]
          this.openlntelligent()
          break
          // 导出
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '干线发车-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
          // 打印
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '干线发车-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
          // 合同
        case 'import':
          let contractObj = {}
          const selectObj = objectMerge2({}, this.selected[0])
          getLookContract(selectObj.id).then(data => {
            contractObj = Object.assign({}, data.data)
            this.$set(selectObj, 'checkBillName', contractObj.contractName)
            this.$set(selectObj, 'carrier', contractObj.carrier)
            this.$set(selectObj, 'orgName', contractObj.nomineeCompany)
            console.log(data, selectObj)
            let str = '?'
            for (const item in selectObj) {
              str += item + '=' + (selectObj[item] === null ? '' : selectObj[item]) + '&'
            }
            const path = window.location.protocol + '//' + window.location.host + '/static/print/contract.html' + str + new Date().getTime()
            PrintContract(encodeURI(path))
          }).catch(err => {
            this._handlerCatchMsg(err)
          })
          break
          // 新增配载
        case 'add':
          this.$router.push({ path: '/operation/order/load', query: { loadTypeId: 39, tab: '新增配载' } }) // 38-短驳 39-干线 40-送货
          console.log(this.$router)
          break
          // 添加客户
        case 'storage':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
            return false
          } else {
            this.selectInfo = this.selected[0]
            this.isModify = false
            this.openAddCustomer()
          }

          break
          // 修改
        case 'sure':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
            return false
          } else {
            if (this.selected[0].batchTypeName === '已入库') {
              this.$message({
                message: '已入库不能修改~',
                type: 'warning'
              })
              return false
            } else if (this.selected[0].unloadSign === 1) {
              this.$message({
                message: '已卸货不能修改~',
                type: 'warning'
              })
              return false
            } else {
              this.selectInfo = this.selected[0]
              this.$router.push({ path: '/operation/order/load', query: { loadTypeId: 39, info: this.selectInfo, tab: '修改配载', flag: this.selectInfo.batchNo } })
            }
          }
          break
          //    发车
        case 'depart':

          this.timeInfoVisible = true

          break
          //  取消配载发车(批量)
        case 'deselectCar':

          let count = this.selected.filter(e => {
            return e.unloadSign === 1
          }).length
          if (count) {
            this.$message.warning('已卸货不能取消发车~')
            return false
          }
          let ids = this.selected.filter(el => {
            return el.batchTypeName === '在途中'
          }).map(el => {
            return el.id
          })

          if (!ids.length) {
            const batchTypeName = this.selected[0].batchTypeName
            this.$message({
              message: '批次状态为：' + batchTypeName + '不允许取消发车~',
              type: 'warning'
            })
            return false
          } else {
            ids = ids.join(',')
            this.$confirm('确定要取消发车？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true
              putCancelLoadDepart(ids, 39).then(res => {
                if (res) {
                  this.loading = false
                  this.$message({
                    type: 'success',
                    message: '取消发车成功!'
                  })
                  this.fetchData()
                }
              }).catch(err => {
                this._handlerCatchMsg(err)
                this.loading = false
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
          break
          //  取消装车(批量)
        case 'deleteStor':
          let _ids = this.selected.filter(el => {
            return el.batchTypeName === '已装车'
          }).map(el => {
            return el.id
          })
          if (!_ids.length) {
            const batchTypeName = this.selected[0].batchTypeName
            this.$message({
              message: '批次状态为：' + batchTypeName + '不允许取消装车~',
              type: 'warning'
            })
            return false
          } else {
            // =>todo 删除多个
            _ids = _ids.join(',')

            this.$confirm('确定要取消装车？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true
              putCancelLoadTruck(_ids, 39).then(res => {
                if (res) {
                  this.loading = false
                  this.$message({
                    type: 'success',
                    message: '取消装车成功!'
                  })
                  this.fetchData()
                }
              }).catch(err => {
                this._handlerCatchMsg(err)
                this.loading = false
              })
            }).catch(() => {
              this.loading = false
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }

          break

      }
      if (type !== 'depart') {
        // 清除选中状态，避免影响下个操作
        this.$refs.multipleTable.clearSelection()
      }
    },
    getActualTime(obj) { // 发车
      console.log(this.selected, obj)
      let loadIds = this.selected.filter(el => {
        return el.batchTypeName === '已装车'
      }).map(el => {
        return el.id
      })
      if (!loadIds.length) {
        const batchTypeName = this.selected[0].batchTypeName
        this.$message({
          message: '批次状态为：' + batchTypeName + '不允许发车~',
          type: 'warning'
        })
        return false
      } else {
        // =>todo 删除多个
        loadIds = loadIds.join(',')
        const timer = obj.actualSendtime ? obj.actualSendtime : parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
        this.loading = true
        putLoadDepart(loadIds, 39, timer).then(res => {
          if (res) {
            this.loading = false
            this.$message({
              type: 'success',
              message: '发车成功!'
            })
            this.fetchData()
          }
        }).catch(err => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
      }
    },
    openlntelligent() {
      this.lntelligentVisible = true
    },
    closelntelligent() {
      this.lntelligentVisible = false
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
      this.selectInfo = row
      this.openAddCustomer()
      this.$refs.multipleTable.clearSelection()
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }

  }
}

</script>
