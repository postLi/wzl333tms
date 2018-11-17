<template>
  <div class="tab-content" v-loading="loading">
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
    <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')" v-has:ORDER_MADD>创建运单</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain v-has:ORDER_MEDIT5>运单修改</el-button>
          <el-button type="info" :size="btnsize" icon="el-icon-delete" @click="doAction('cancel')" plain v-has:ORDER_MDEL2>运单作废</el-button>
          <el-button type="danger" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('delete')" plain v-has:ORDER_MDEL>运单删除</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain v-has:ORDER_MEXP>导出</el-button>
          <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('print')" plain v-has:ORDER_MPRI>打印</el-button>
          <span class="viewtip">
            双击查看详情
          </span>
          <el-popover
            @mouseenter.native="showSaveBox"
            @mouseout.native="hideSaveBox"
            placement="top"
            width="160"
            v-model="visible2">
            <p>表格宽度修改了，是否要保存？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="saveToTableSetup">确定</el-button>
            </div>
            <el-button slot="reference" type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
          </el-popover>
          
      </div>
      <!-- <el-tooltip placement="top" v-model="showtip" :manual="true">
        <div slot="content">双击查看运单详情</div> -->

      <div @mouseover="showtip = true"
          @mouseout="showtip = false" class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          :key="tablekey"
          stripe
          border
          @row-click="clickDetails"
          @row-dblclick="showDetail"
          @selection-change="getSelection"
          @header-dragend="setTableWidth"
          height="100%"
          :summary-method="getSumLeft"
          show-summary
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">

          <el-table-column
            fixed
            sortable
            type="selection"
            width="60">
          </el-table-column>
          <template v-for="column in tableColumn">
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              :prop="column.prop"
              v-if="!column.slot"
              :width="column.width">
            </el-table-column>
            <el-table-column
              :key="column.id"
              :fixed="column.fixed"
              sortable
              :label="column.label"
              v-else
              :width="column.width">
              <template slot-scope="scope">
                  <div class="td-slot" v-html="column.slot(scope)"></div>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <!-- </el-tooltip> -->
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
    <TableSetup :code="$route.meta.code" :popVisible="setupTableVisible" @close="closeSetupTable" :columns='tableColumn' @success="setColumn"  />
  </div>
</template>
<script>
import orderManageApi from '@/api/operation/orderManage'
import SearchForm from './components/search'
import TableSetup from '@/components/tableSetup'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
import { parseTime, getSummaries } from '@/utils/index'
import { parseShipStatus } from '@/utils/dict'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'

export default {
  components: {
    SearchForm,
    Pager,
    TableSetup
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      console.log(this.selectInfo.orgid, this.searchQuery.vo.orgid, this.otherinfo.orgid)
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted() {
    /* this.searchQuery.vo.orgid = this.otherinfo.orgid
    this.fetchAllOrder(this.otherinfo.orgid).then(res => {
      this.loading = false
    }) */
    this.thecode = this.$route.meta.code
  },
  data() {
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
          'shipFromOrgid': 1,
          shipStatus: 2,
          startTime: '',
          endTime: ''
        }
      },
      // 默认sort值为true
      tablekey: '',
      thecode: '', // 用来设置tablesetup的code值
      columnWidthData: {},
      tableColumn: [{
        'label': '运单号',
        'prop': 'shipSn',
        'width': '150',
        'fixed': true
      }, {
        'label': '运单状态',
        'prop': 'shipStatusName',
        'width': '120',
        'fixed': false
      }, {
        'label': '运单标识',
        'prop': 'shipIdentifying',
        'width': '150',
        slot: function(scope) {
          return parseShipStatus(scope.row.shipIdentifying)
        }
      }, {
        'label': '开单网点',
        'prop': 'fromOrgName',
        'width': '150'
      }, {
        'label': '目的网点',
        'prop': 'toOrgName',
        'width': '150'
      }, {
        'label': '开单时间',
        'prop': 'createTime',
        'width': '180',
        'slot': function(scope) {
          return `${parseTime(scope.row.createTime)}`
        }
      }, {
        prop: 'shipEffectiveName',
        label: '时效',
        slot: function(scope) {
          return scope.row.shipEffectiveName === '加急' ? '<span class="red">加急</span>' : scope.row.shipEffectiveName
        }
      }, {
        'label': '发货人',
        'prop': 'shipSenderName',
        'width': '150'
      }, {
        'label': '发货人电话',
        'prop': 'shipSenderMobile',
        'width': '150'
      }, {
        'label': '收货人',
        'prop': 'shipReceiverName',
        'width': '150'
      }, {
        'label': '收货人电话',
        'prop': 'shipReceiverMobile',
        'width': '150'
      }, {
        'label': '交接方式',
        'prop': 'shipDeliveryMethodName',
        'width': '150'
      }, {
        'label': '货号',
        'prop': 'shipGoodsSn',
        'width': '150'
      }, {
        'label': '货品名',
        'prop': 'cargoName',
        'width': '150'
      }, {
        'label': '品种规格',
        'prop': 'description',
        'width': '150'
      }, {
        'label': '件数',
        'prop': 'cargoAmount',
        'width': '150'
      }, {
        'label': '重量',
        'prop': 'cargoWeight',
        'width': '150'
      }, {
        'label': '体积',
        'prop': 'cargoVolume',
        'width': '150'
      }, {
        'label': '件数单价',
        'prop': 'amountFee',
        'width': '150'
      }, {
        'label': '重量单价',
        'prop': 'weightFee',
        'width': '150'
      }, {
        'label': '体积单价',
        'prop': 'volumeFee',
        'width': '150'
      }, {
        'label': '出发城市',
        'prop': 'shipFromCityName',
        'width': '150'
      }, {
        'label': '到达城市',
        'prop': 'shipToCityName',
        'width': '150'
      }, {
        'label': '等通知放货',
        'prop': 'status',
        'width': '150',
        'slot': function(scope) {
          return scope.row.status === 1 ? '未放货' : scope.row.status === 2 ? '已放货' : '未控货'
        }
      }, {
        'label': '回单要求',
        'prop': 'shipReceiptRequireName',
        'width': '150'
      }, {
        'label': '回单份数',
        'prop': 'shipReceiptNum',
        'width': '150'
      }, {
        'label': '代收款',
        'prop': 'agencyFund',
        'width': '150'
      }, {
        'label': '付款方式',
        'prop': 'shipPayWayName',
        'width': '150'
      }, {
        'label': '现付',
        'prop': 'shipNowpayFee',
        'width': '150'
      }, {
        'label': '到付',
        'prop': 'shipArrivepayFee',
        'width': '150'
      }, {
        'label': '回单付',
        'prop': 'shipReceiptpayFee',
        'width': '150'
      }, {
        'label': '月结',
        'prop': 'shipMonthpayFee',
        'width': '150'
      }, {
        'label': '运费合计',
        'prop': 'shipTotalFee',
        'width': '150'
      }, {
        'label': '备注',
        'prop': 'shipRemarks',
        'width': '150'
      }, {
        'label': '到达省',
        'prop': 'endProvince',
        'width': '150',
        hidden: true,
        slot: function(scope) {
          return (scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[0] : '')
        }
      }, {
        'label': '到达市',
        'prop': 'endCity',
        'width': '150',
        hidden: true,
        slot: function(scope) {
          return (scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[1] : '')
        }
      }, {
        'label': '到达县区',
        'prop': 'endArea',
        'width': '150',
        hidden: true,
        slot: function(scope) {
          return (scope.row.shipToCityName ? scope.row.shipToCityName.split(',')[2] : '')
        }
      }, {
        'label': '业务员',
        'prop': 'userName',
        hidden: true,
        'width': '150'
      }, {
        'label': '发货方',
        'prop': 'shipSenderUnit',
        hidden: true,
        'width': '150'
      }, {
        'label': '收货方',
        'prop': 'shipReceiverUnit',
        hidden: true,
        'width': '150'
      }, {
        'label': '发货人地址',
        'prop': 'shipSenderAddress',
        hidden: true,
        'width': '150'
      }, {
        'label': '收货人地址',
        'prop': 'shipReceiverAddress',
        hidden: true,
        'width': '150'
      }, {
        'label': '回单号',
        'prop': 'shipReceiptSn',
        hidden: true,
        'width': '150'
      }, {
        'label': '回扣',
        'prop': 'brokerageFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '客户单号',
        'prop': 'shipCustomerNumber',
        hidden: true,
        'width': '150'
      }, {
        'label': '运输方式',
        'prop': 'shipShippingTypeName',
        hidden: true,
        'width': '150'
      }, {
        'label': '业务类型',
        'prop': 'shipBusinessTypeName',
        hidden: true,
        'width': '150'
      }, {
        'label': '标准时效',
        'prop': 'shipEffectiveName',
        hidden: true,
        'width': '150'
      }, {
        'label': '线路时效',
        'prop': 'transportAging',
        hidden: false,
        'width': '150'
      }, {
        'label': '运单实际用时',
        'prop': 'actualTime',
        hidden: false,
        'width': '150'
      }, {
        'label': '提货批次',
        'prop': 'pickupBatchNumber',
        hidden: true,
        'width': '150'
      }, {
        'label': '提货司机名',
        'prop': 'driverName',
        hidden: true,
        'width': '150'
      }, {
        'label': '提货车牌',
        'prop': 'truckIdNumber',
        hidden: true,
        'width': '150'
      }, {
        'label': '送货费',
        'prop': 'deliveryFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '代收款手续费',
        'prop': 'commissionFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '声明价值',
        'prop': 'productPrice',
        hidden: true,
        'width': '150'
      }, {
        'label': '保险费',
        'prop': 'insuranceFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '装卸费',
        'prop': 'handlingFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '包装费',
        'prop': 'packageFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '提货费',
        'prop': 'pickupFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '上楼费',
        'prop': 'goupstairsFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '实际提货费',
        'prop': 'realityhandlingFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '叉车费',
        'prop': 'forkliftFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '报关费',
        'prop': 'customsFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '其他费收入',
        'prop': 'otherfeeIn',
        hidden: true,
        'width': '150'
      }, {
        'label': '其他费支出',
        'prop': 'otherfeeOut',
        hidden: true,
        'width': '150'
      }, {
        'label': '税率',
        'prop': 'taxRate',
        hidden: true,
        'width': '150'
      }, {
        'label': '税金',
        'prop': 'taxes',
        hidden: true,
        'width': '150'
      }, {
        'label': '入仓费',
        'prop': 'housingFee',
        hidden: true,
        'width': '150'
      }, {
        'label': '印花税',
        'prop': 'stampTax',
        hidden: true,
        'width': '150'
      }],
      showtip: false,
      visible2: false
    }
  },
  methods: {
    getSumLeft(param, type) {
      const propsArr = ['_index|1|单', 'shipReceiptNum|份', 'agencyFund', 'shipNowpayFee', 'shipArrivepayFee', 'shipReceiptpayFee', 'shipMonthpayFee', 'brokerageFee', 'shipTotalFee', 'deliveryFee', 'commissionFee', 'productPrice', 'insuranceFee', 'handlingFee', 'packageFee', 'pickupFee', 'goupstairsFee', 'realityhandlingFee', 'forkliftFee', 'customsFee', 'otherfeeIn', 'otherfeeOut', 'stampTax', 'taxes', 'housingFee', 'cargoAmount|件', 'cargoWeight|kg', 'cargoVolume|方']
      return getSummaries(param, propsArr)
    },
    viewDetails(row) {
      this.$router.push({
        path: '/operation/order/createOrder',
        query: {
          orderid: row.id,
          type: 'view',
          tab: '查看' + row.shipSn
        }
      })
    },
    showDetail(order) {
      // this.eventBus.$emit('showOrderDetail', order.id)
      this.eventBus.$emit('showOrderDetail', order.id, order.shipSn, true)
    },
    fetchAllOrder() {
      this.loading = true
      return orderManageApi.getAllShip(this.searchQuery).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
        // 当搜索运单号且全匹配且仅有一条结果时自动打开其详情页面
        if (this.total === 1) {
          if (this.searchQuery.vo.shipSn && this.searchQuery.vo.shipSn === this.usersArr[0].shipSn) {
            const order = this.usersArr[0]
            this.eventBus.$emit('showOrderDetail', order.id, order.shipSn, true)
          }
        }
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

      console.log('this.selected:', this.selected)

      switch (type) {
          // 添加运单
        case 'add':
          this.isModify = false
          this.selectInfo = {}
          this.$router.push({ path: '/operation/order/createOrder' })
          break
          // 修改运单信息
        case 'modify':
          this.isModify = true
          var thelist = this.selected.filter(el => {
            return el.shipStatus !== 67
          })
          if (thelist.length > 1) {
            this.$message({
              message: '每次只能修改单条数据~',
              type: 'warning'
            })
          } else if (thelist.length < 1) {
            this.$message({
              message: '已签收项不能被修改~',
              type: 'warning'
            })
          } else {
            this.selectInfo = thelist[0]
            var canModify = true
            // 判断是否有权限
            if (this.otherinfo.systemSetup.shipPermission.onlyUpdateOwnShip === '1') {
              // 只能修改自己的运单
              canModify = thelist[0].userid === this.otherinfo.id
            }
            if (canModify) {
              this.$router.push({
                path: '/operation/order/createOrder',
                query: {
                  orderid: this.selectInfo.id,
                  type: 'modify',
                      // tab: '修改' + this.selectInfo.shipSn
                  tab: '改单'
                }
              })
            } else {
              this.$message.warning('只能修改自己的运单~')
            }
          }

          break
          // 删除运单
        case 'delete':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能操作单条数据~',
              type: 'warning'
            })
          }
          var deleteItem = this.selected.filter(el => el.shipStatus === 59)
          console.log('delete:', deleteItem)
          if (deleteItem.length === 0) {
            this.$message({
              message: '只有已入库状态才能删除~',
              type: 'info'
            })
          } else {
            var canDelete = true
            // 判断是否有权限
            if (this.otherinfo.systemSetup.shipPermission.onlyDeleteOwnShip === '1') {
              // 只能删除自己的运单
              canDelete = deleteItem[0].userid === this.otherinfo.id
            }
            if (canDelete) {
              var id = deleteItem[0].id
              this.$confirm('确定要删除 ' + deleteItem[0].shipSn + ' 运单吗？', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                orderManageApi.deleteOrderInfoById(id).then(res => {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                  this.fetchData()
                }).catch(err => {
                  this.$message({
                    type: 'info',
                    message: '删除失败，原因：' + (err.text ? err.text : err)
                  })
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                })
              })
            } else {
              this.$message.warning('只能删除自己的运单~')
            }
          }
          break
          // 作废运单
        case 'cancel':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能操作单条数据~',
              type: 'warning'
            })
          }
              // shipStatus 59 已入库
          var cancelItem = this.selected.filter(el => el.shipStatus === 59)
          if (cancelItem.length === 0) {
            this.$message({
              message: '只有已入库状态才能作废~',
              type: 'info'
            })
          } else {
            var canCancel = true
            if (this.otherinfo.systemSetup.shipPermission.onlyInvalidOwnShip === '1') {
              // 只能修改自己的运单
              canCancel = cancelItem[0].userid === this.otherinfo.id
            }

            if (canCancel) {
              var theid = cancelItem[0].id

              this.$confirm('确定要作废 ' + cancelItem[0].shipSn + ' 运单吗？', '提示', {
                confirmButtonText: '作废',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                orderManageApi.deleteCancleOrderById(theid).then(res => {
                  this.$message({
                    type: 'success',
                    message: '作废成功!'
                  })
                  this.fetchData()
                }).catch(err => {
                  this.$message({
                    type: 'info',
                    message: '作废失败，原因：' + err.text ? err.text : err
                  })
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消作废'
                })
              })
            } else {
              this.$message.warning('只能作废自己的运单~')
            }
          }

          break
        // 导出数据
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '全部运单-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: this.tableColumn,
            name: '全部运单'
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
      this.tablekey = Math.random() // 刷新表格视图
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
    },
    setTableWidth(newWidth, oldWidth, column, event) {
      console.log('set table:', newWidth, oldWidth, column)
      // column.property
      // column.label
      this.visible2 = true
      this.columnWidthData = {
        prop: column.property,
        label: column.label,
        width: newWidth
      }
      clearTimeout(this.tabletimer)
      this.tabletimer = setTimeout(() => {
        this.visible2 = false
      }, 10000)
    },
    saveToTableSetup() {
      this.visible2 = false
      this.eventBus.$emit('tablesetup.change', this.thecode, this.columnWidthData)
    },
    showSaveBox() {
      clearTimeout(this.tabletimer)
    },
    hideSaveBox() {
      clearTimeout(this.tabletimer)
      this.tabletimer = setTimeout(() => {
        this.visible2 = false
      }, 10000)
    }
  }
}
</script>
