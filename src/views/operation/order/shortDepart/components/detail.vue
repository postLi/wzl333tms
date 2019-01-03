<template>
  <div class="detailTable" v-loading="detailTableLoading">
    <el-form inline v-model="info" label-width="100" class="detailTable_info">
      <table>
        <tbody>
          <tr>
            <th>到达网点</th>
            <td v-if="info.arriveOrgName">
              <!-- 短驳发车 -->
              <el-input v-model="info.arriveOrgName" :size="btnsize" disabled></el-input>
            </td>
            <td v-else>
              <!-- 短驳到货 -->
              <el-input v-model="info.endOrgName" :size="btnsize" disabled></el-input>
            </td>
            <th>司机名称</th>
            <td>
              <el-input v-model="info.dirverName" :size="btnsize" disabled></el-input>
            </td>
            <th>司机电话</th>
            <td>
              <el-input v-model="info.dirverMobile" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>车牌号码</th>
            <td>
              <el-input v-model="info.truckIdNumber" :size="btnsize" disabled></el-input>
            </td>
            <th>短驳费</th>
            <td>
              <el-input v-model="info.shortFee" :size="btnsize" disabled></el-input>
            </td>
            <th>分摊方式</th>
            <td>
              <el-input v-model="info.apportionName" :size="btnsize" disabled v-if="info.apportionName"></el-input>
              <el-input v-model="info.apportionTypeName" :size="btnsize" disabled v-else></el-input>
            </td>
          </tr>
          <tr>
            <th>可载体积</th>
            <td>
              <el-input v-model="info.truckVolume" :size="btnsize" disabled></el-input>
            </td>
            <th>短驳日期</th>
            <td>
              <!-- <el-input :value="info.loadTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :size="btnsize" disabled></el-input> -->
              <el-input :value="info.loadTime" :size="btnsize" disabled></el-input>
            </td>
            <th>要求到达时间</th>
            <td>
              <el-input :value="info.requireArrivedTime" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>可载重量</th>
            <td>
              <el-input v-model="info.truckLoad" :size="btnsize" disabled></el-input>
            </td>
            <th>备注</th>
            <td colspan="3">
              <el-input v-model="info.remark" :size="btnsize" disabled></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </el-form>
    <div class="tab_infos">
      <div class="btns_box">
        <el-button v-if="info.endOrgName && isNeedArrival" :size="btnsize" type="warning" icon="el-icon-circle-plus" plain @click="doAction('add')">短驳入库</el-button>
        <el-popover @mouseenter.native="showSaveBox" @mouseout.native="hideSaveBox" placement="top" trigger="manual" width="160" :value="visible2">
          <p>表格宽度修改了，是否要保存？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="saveToTableSetup">确定</el-button>
          </div>
          <el-button slot="reference" type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup" :code="code">表格设置</el-button>
        </el-popover>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain class="table_setup">导出清单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain class="table_setup">打印清单</el-button>
      </div>
      <div class="detailinfo_tab">
        <el-table ref="multipleTable" @header-dragend="setTableWidth" :reserve-selection="true" :data="detailList" @row-click="clickDetails" @selection-change="getSelection" stripe border :key="tablekey" height="100%" style="height:100%;" :default-sort="{prop: 'id', order: 'ascending'}" tooltip-effect="dark">
          <el-table-column fixed type="selection" width="50"></el-table-column>
          <!-- <el-table-column fixed label="序号" prop="number" width="50">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column> -->
          <!-- 普通列 -->
          <template v-for="column in tableColumn">
            <el-table-column show-overflow-tooltip :key="column.id" :fixed="column.fixed" :label="column.label" :prop="column.prop" :width="column.width" v-if="!column.slot">
            </el-table-column>
            <!-- 有返回值的列 -->
            <el-table-column show-overflow-tooltip :key="column.id" :fixed="column.fixed" :label="column.label" :prop="column.prop" :width="column.width" v-else>
              <template slot-scope="scope">
                <!-- 有输入框的列 -->
                <div v-if="column.expand">
                  <span v-if="isWareStatus(scope.$index, scope.row)" v-html="column.slot(scope)"></span>
                  <el-input v-else @dblclick.stop.prevent.native :class="{'textChangeDanger': detailList[scope.$index][column.prop + 'lyy']}" type="number" v-model.number="detailList[scope.$index][column.prop]" :size="btnsize" @click.stop.prevent.native @change="(val) => {changeInputData(scope.$index, column.prop, val)}" v-numberOnly></el-input>
                </div>
                <!-- 有返回值的列 -->
                <div v-else>
                  <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                  <span v-else v-html="column.slot(scope)"></span>
                </div>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <TableSetup v-if="isEditActual" :popVisible="setupTableVisible" :columns="tableColumnArrival" :code="code" @close="setupTableVisible = false" @success="setColumn"></TableSetup>
    <TableSetup v-else :popVisible="setupTableVisible" :columns="tableColumnArrival" :code="code" @close="setupTableVisible = false" @success="setColumn"></TableSetup>
    <!-- 实际发车时间 弹出框 -->
    <actualSendtime :popVisible.sync="timeInfoVisible" @time="getActualTime" :isArrival="true" :title="'到车'"></actualSendtime>
  </div>
</template>
<script>
import { getSelectLoadDetailList } from '@/api/operation/load'
import { postAddRepertory } from '@/api/operation/shortDepart'
import { objectMerge2, parseTime } from '@/utils/index'
import TableSetup from '@/components/tableSetup'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import actualSendtime from '../../load/components/actualSendtimeDialog'
export default {
  components: {
    TableSetup,
    actualSendtime
  },
  props: {
    info: {
      type: Array,
      default: []
    },
    isShow: {
      type: Boolean,
      default: false
    },
    arrivalStatus: {
      type: String,
      default: ''
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      code: 'ORDER_SHORT',
      thecode: 'ORDER_SHORT',
      visible2: false,
      xuhaodata: {
        label: '序号',
        prop: 'number',
        width: '40',
        fixed: true,
        slot: (scope) => {
          return scope.$index + 1
        }
      },
      detailTableLoading: true,
      timeInfoVisible: false,
      textChangeDanger: [],
      isNeedArrival: true, // true-未入库状态  false-已入库状态
      setupTableVisible: false,
      tablekey: 0,
      btnsize: 'mini',
      loadId: '',
      selected: [],
      detailList: [],
      newData: {
        tmsOrderLoadFee: [],
        tmsOrderLoadDetailsList: {},
        tmsOrderLoad: {}
      },
      selectDetailList: [],
      isEditActual: true,
      message: false,
      query: {
        arriveOrgid: 0,
        batchNo: '',
        batchTypeId: 0,
        departureEndTime: '',
        departureStartTime: '',
        dirverName: '',
        loadEndTime: '',
        loadId: 0,
        loadStartTime: '',
        loadTypeId: 0,
        orgId: 0,
        truckIdNumber: ''
      },
      tableColumn: [],
      tableColumnArrival: [
        {
          label: '序号',
          prop: 'number',
          width: '100',
          fixed: true,
          slot: (scope) => {
            return scope.$index + 1
          }
        },
        {
          label: '运单号',
          prop: 'shipSn',
          width: '130',
          fixed: true
        },
        {
          label: '子运单号',
          prop: 'childShipSn',
          width: '130',
          fixed: true
        },
        {
          label: '开单网点',
          prop: 'shipFromOrgName',
          width: '120',
          fixed: false
        },
        {
          label: '到付(元)',
          prop: 'shipArrivepayFee',
          width: '90',
          fixed: false
        },
        {
          label: '操作费(元)',
          prop: 'handlingFee',
          width: '100',
          fixed: false
        },
        // {
        //   label: "应到件数",
        //   prop: "loadAmount",
        //   width: "120",
        //   fixed: false,
        //   hide: true
        // },
        // {
        //   label: "应到重量",
        //   prop: "loadWeight",
        //   width: "120",
        //   fixed: false,
        //   hide: true
        // },
        // {
        //   label: "应到体积",
        //   prop: "loadVolume",
        //   width: "120",
        //   fixed: false,
        //   hide: true
        // },
        {
          label: '实到件数',
          prop: 'actualAmount',
          width: '120',
          fixed: false,
          expand: true,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.loadAmount, row.actualAmount, null, row.actualAmount)
          }
        },
        {
          label: '实到重量(kg)',
          prop: 'actualWeight',
          width: '120',
          fixed: false,
          expand: true,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.loadWeight, row.actualWeight, null, row.actualWeight)
          }
        },
        {
          label: '实到体积(m³)',
          prop: 'actualVolume',
          width: '120',
          fixed: false,
          expand: true,
          slot: (scope) => {
            const row = scope.row
            return this._setTextColor(row.loadVolume, row.actualVolume, null, row.actualVolume)
          }
        },
        {
          label: '配载件数',
          prop: 'loadAmount',
          width: '120',
          fixed: false
        },
        {
          label: '配载重量(kg)',
          prop: 'loadWeight',
          width: '120',
          fixed: false
        },
        {
          label: '配载体积(m³)',
          prop: 'loadVolume',
          width: '120',
          fixed: false
        },
        {
          label: '运单件数',
          prop: 'cargoAmount',
          width: '120',
          fixed: false
        },
        {
          label: '运单重量(kg)',
          prop: 'cargoWeight',
          width: '120',
          fixed: false
        },
        {
          label: '运单体积(m³)',
          prop: 'cargoVolume',
          width: '120',
          fixed: false
        },
        {
          label: '发站',
          prop: 'shipFromCityName',
          width: '120',
          fixed: false
        },
        {
          label: '到站',
          prop: 'shipToCityName',
          width: '120',
          fixed: false
        },
        {
          label: '发货人',
          prop: 'shipSenderName',
          width: '120',
          fixed: false
        },
        {
          label: '发货人电话',
          prop: 'shipSenderMobile',
          width: '120',
          fixed: false
        },
        {
          label: '收货人',
          prop: 'shipReceiverName',
          width: '120',
          fixed: false
        },
        {
          label: '收货人电话',
          prop: 'shipReceiverMobile',
          width: '120',
          fixed: false
        },
        {
          label: '货品名',
          prop: 'cargoName',
          width: '120',
          fixed: false
        },
        {
          label: '货号',
          prop: 'shipGoodsSn',
          width: '120',
          fixed: false
        },
        {
          label: '回扣',
          prop: 'brokerageFee',
          width: '120',
          fixed: false
        },
        {
          label: '运单备注',
          prop: 'shipRemarks',
          width: '200',
          fixed: false
        }
      ],
      tableColumnDeiver: []
    }
  },
  mounted() {
    this.toggleAllRows()
    // this.setTableColumn()
  },
  watch: {
    isShow: {
      handler(cval, oval) {
        if (cval) {
          if (this.arrivalStatus === '已入库') {
            this.isNeedArrival = false
          } else {
            this.isNeedArrival = true
          }
          this.getLoadTrack()
          this.toggleAllRows()
          this.setTableColumn()
        }
      },
      immediate: true
    },
    info(newVal) {
      if (newVal) {
        this.getLoadTrack()
        this.toggleAllRows()
        this.setTableColumn()
      }
    },
    arrivalStatus() {
      console.log(this.arrivalStatus)
    },
    type() {}
  },
  created() {
    switch (this.type) {
      case 'deliver':
        this.code = 'ORDER_SHORT'
        this.isEditActual = true // 短驳发车
        break
      case 'arrival':
        this.code = 'ORDER_SHORT-3'
        this.isEditActual = false // 短驳到货
        this.tableColumn = this.$options.data().tableColumnArrival
        break
    }
    const arrTableColumn = []
    objectMerge2([], this.tableColumnArrival).forEach(e => {
      if (!e.hide) {
        if (e.expand) {
          e.expand = false
        }
        arrTableColumn.push(e)
      }
    })
    this.tableColumnDeiver = objectMerge2([], arrTableColumn)
    this.setTableColumn()
  },
  methods: {
    setTableColumn() { // 设置表格列
      this.tableColumn = this.isEditActual ? Object.assign([], this.tableColumnDeiver) : Object.assign([], this.tableColumnArrival)
    },
    setTable() {
      this.setupTableVisible = true
    },
    doAction(type) {
      const columnArr = objectMerge2([], this.tableColumn)
      // columnArr.unshift(this.xuhaodata)
      switch (type) {
        case 'add': // 短驳入库
          if (this.arrivalStatus === '短驳中') {
            this.timeInfoVisible = true
          } else {
            this.getActualTime()
          }
          break
        case 'print': // 打印
          console.log('form', this.info)
          const obj = {}
          for (const item in this.info) {
            obj[item] = (this.info[item] === null || this.info[item] === undefined) ? '' : this.info[item]
          }
          let appendTopStr = '<style>body{width: 100%;}</style>'
          appendTopStr += '<body width="100%"><table width="100%" style="font-size: {content_word_size}px;"><tr><td colspan="9" align="center" style="font-size: {heading_word_size}px;font-weight: 500;padding: 10px 0;">{heading_content}</td></tr><tr><td align="right">运行区间: </td><td colspan="2" style="padding-left: 20px;">' +
            obj.orgName + '   →   ' + obj.arriveOrgName +
            '</td><td align="right">发车时间: </td><td colspan="2" style="padding-left: 20px;">' +
            obj.loadTime +
            '</td><td align="right">发车批次: </td><td colspan="2" style="padding-left: 20px;">' +
            obj.batchNo +
            '</td></tr><tr><td align="right">车牌号码: </td><td colspan="2" style="padding-left: 20px;">' +
            obj.truckIdNumber +
            '</td><td align="right">司机名称: </td><td colspan="2" style="padding-left: 20px;">' +
            obj.dirverName +
            '</td><td align="right">联系电话: </td><td colspan="2" style="padding-left: 20px;">' +
            obj.dirverMobile +
            '</td></tr></table></body>'
          PrintInFullPage({
            data: this.selectDetailList.length ? this.selectDetailList : this.detailList,
            columns: columnArr,
            name: '短驳管理-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}'),
            appendTop: appendTopStr
          })
          break
        case 'export': // 导出
          console.log('export column:', columnArr)
          SaveAsFile({
            data: this.selectDetailList.length ? this.selectDetailList : this.detailList,
            columns: columnArr,
            name: '短驳管理-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
      }
    },
    changeInputData(index, prop, newVal) { // 判断当行-新
      let curVal = this.detailList[index][prop] // 实到值
      const loadName = 'load' + prop.substring(6) // 配载名称
      const loadVal = this.detailList[index][loadName] // 配载值
      const _this = this
      curVal = Number(newVal)
      this.$set(_this.detailList, index, objectMerge2(_this.detailList[index], {
        [prop]: curVal
      }))
      if (prop === 'actualAmount' && curVal === 0) {
        curVal = Number(loadVal)
        this.$set(_this.detailList, index, objectMerge2(_this.detailList[index], {
          [prop]: curVal
        }))
        this.$notify({
          title: '提示',
          message: '实到件数不能为0',
          type: 'warning'
        })
      }
      if (curVal !== loadVal) { // 实到数量如果不等于配载数量 则字体样式变红
        this.$set(this.detailList[index], prop + 'lyy', true)
      } else {
        if (this.detailList[index].actualAmount === this.detailList[index].loadAmount && this.detailList[index].actualWeight === this.detailList[index].loadWeight && this.detailList[index].actualVolume === this.detailList[index].loadVolume) {
          this.$set(this.detailList[index], prop + 'lyy', false)
        }
      }
      console.log(curVal, loadVal, this.textChangeDanger[index], prop, index)
      return curVal
    },
    changeData(newVal) { // 判断当行-废
      console.log(newVal, this.detailList[newVal].actualWeight)
      const curAmount = this.detailList[newVal].actualAmount // 实到件数
      const curWeight = this.detailList[newVal].actualWeight // 实到重量
      const curVolume = this.detailList[newVal].actualVolume // 实到体积
      const curloadAmount = this.detailList[newVal].loadAmount // 配载件数
      const curloadWeight = this.detailList[newVal].loadWeight // 配载重量
      const curloadVolume = this.detailList[newVal].loadVolume // 配载体积
      const curactualVolume = this.detailList[newVal].actualVolume // 应到体积
      const curactualWeight = this.detailList[newVal].actualWeight // 应到重量
      const curactualAmount = this.detailList[newVal].actualAmount // 应到件数

      if (this.selectDetailList.length === 1 && curAmount === 0) {
        this.detailList[newVal].actualAmount = curloadAmount
        this.$notify({
          title: '提示',
          message: '实到件数不能为0',
          type: 'warning'
        })
      }
      if (curAmount !== 0 && curWeight === 0 && curVolume === 0) {}
      if (curAmount === 0 && curVolume === 0 && curWeight === 0) {
        this.$refs.multipleTable.toggleRowSelection(this.detailList[newVal], false)
        if (this.selectDetailList.length === 0) {
          this.$refs.multipleTable.toggleRowSelection(this.detailList[newVal], true)
          this.detailList[newVal].actualAmount = curloadAmount
          this.detailList[newVal].actualWeight = curloadWeight
          this.detailList[newVal].actualVolume = curloadVolume
        }
        this.$notify({
          title: '提示',
          message: '实到数量都为0时,取消本条运单入库,但必须有一条运单',
          type: 'warning'
        })
      } else if (curAmount > curloadAmount || curAmount < 0 || curWeight > curloadWeight || curWeight < 0 || curVolume > curloadVolume || curVolume < 0) {
        this.$refs.multipleTable.toggleRowSelection(this.detailList[newVal], true)
      } else {
        this.$refs.multipleTable.toggleRowSelection(this.detailList[newVal], true)
      }
      return this.detailList[newVal].actualAmount && this.detailList[newVal].actualWeight && this.detailList[newVal].actualVolume
    },
    setData() {
      const dataFee = {} // 配载费用
      dataFee.arriveHandlingFee = this.info.arriveHandlingFee
      dataFee.arriveOtherFee = this.info.arriveOtherFee
      dataFee.arrivepayCarriage = this.info.arrivepayCarriage
      dataFee.arrivepayOilCard = this.info.arrivepayOilCard
      dataFee.backpayCarriage = this.info.backpayCarriage
      dataFee.backpayOilCard = this.info.backpayOilCard
      dataFee.carloadInsuranceFee = this.info.carloadInsuranceFee
      dataFee.deliveryFee = this.info.deliveryFee
      dataFee.id = this.info.id
      dataFee.leaveHandlingFee = this.info.leaveHandlingFee
      dataFee.leaveOtherFee = this.info.leaveOtherFee
      dataFee.loadId = this.info.loadId
      dataFee.nowpayCarriage = this.info.nowpayCarriage
      dataFee.nowpayOilCard = this.info.nowpayOilCard
      dataFee.shortFee = this.info.shortFee
      const dataLoad = {} // 配载信息
      dataLoad.actualAmountall = this.info.loadAmount
      dataLoad.actualVolumeall = this.info.loadVolume
      dataLoad.actualWeigntall = this.info.loadWeight
      dataLoad.apportionTypeId = this.info.apportionTypeId
      dataLoad.arriveOrgid = this.info.arriveOrgid
      dataLoad.batchNo = this.info.batchNo
      dataLoad.batchTypeId = this.info.batchTypeId
      dataLoad.contractNo = this.info.contractNo
      dataLoad.dirverMobile = this.info.dirverMobile
      dataLoad.dirverName = this.info.dirverName
      dataLoad.id = this.info.id
      dataLoad.loadAmountall = this.info.loadAmountall
      dataLoad.loadTime = this.info.loadTime
      dataLoad.loadTypeId = this.info.loadTypeId
      dataLoad.loadVolumeall = this.info.loadVolumeall
      dataLoad.loadWeightall = this.info.loadWeightall
      dataLoad.orgid = this.info.orgid
      dataLoad.receivedUserId = this.info.receivedUserId
      dataLoad.remark = this.info.remark
      dataLoad.truckIdNumber = this.info.truckIdNumber
      dataLoad.truckLoad = this.info.truckLoad
      dataLoad.truckUserId = this.info.truckUserId
      dataLoad.truckVolume = this.info.truckVolume
      dataLoad.updateTime = this.info.updateTime
      dataLoad.userId = this.info.userId

      this.newData.tmsOrderLoad = objectMerge2({}, dataLoad)
      this.newData.tmsOrderLoadFee = objectMerge2({}, dataFee)
      this.newData.tmsOrderLoadDetailsList = Object.assign([], this.selectDetailList)
    },
    getActualTime(obj) {
      this.postAddRepertory(obj)
    },
    postAddRepertory(obj) {
      this.setData()
      if (this.newData.tmsOrderLoadDetailsList.length === 0) {
        this.$refs.multipleTable.toggleRowSelection(this.detailList[0], true)
        this.$message({ type: 'warning', message: '至少要有一条数据' })
        return false
      } else {
        if (obj) {
          this.$set(this.newData.tmsOrderLoad, 'actualArrivetime', obj.actualArrivetime)
        }
        postAddRepertory(50, this.newData).then(data => {
          if (data.status === 200) {
            this.$router.push({ path: '../shortDepart/arrival', query: { tableKey: Math.random() }})
            this.$message({ type: 'success', message: '短驳入库操作成功' })
            this.message = true
          } else {
            this.message = false
          }
          this.$emit('isSuccess', this.message)
        })
          .catch(error => {
            this.$message.error(error.errorInfo || error.text)
            this.message = false
            this.$emit('isSuccess', this.message)
          })
      }
    },
    getLoadTrack() {
      this.detailTableLoading = true
      this.loadId = this.info.id
      getSelectLoadDetailList(this.loadId).then(data => {
        if (data) {
          this.detailList = (data.data || []).map(el => {
            const start = (el.shipFromCityName || '').split(',')
            const end = (el.shipToCityName || '').split(',')
            el.shipFromCityName = start[2] || start[1] || start[0] || ''
            el.shipToCityName = end[2] || end[1] || end[0] || ''

            return el
          })
            /* if (location.href.indexOf('192.168.1') !== -1 && this.detailList.length && true) {
              let mi = 30
              while (mi--) {
                this.detailList.push(this.detailList[0])
              }
            } */

          this.setData()
          this.toggleAllRows()
          this.$nextTick(() => {
            console.log('isNeedArrival', this.isNeedArrival)
            this.detailList.forEach(e => {
                if (this.isNeedArrival) { // isNeedArrival true-未入库默认设置实到数量为配载数量
                  if (e.warehouStatus !== 1) { // 部分入库
                    e.actualAmount = e.loadAmount
                    e.actualWeight = e.loadWeight
                    e.actualVolume = e.loadVolume
                  }
                } else { // isNeedArrival false-已入库默认设置实到数量为列表中的实到数量
                }
              })
          })
          this.detailTableLoading = false
        }
      })
        .catch(error => {
          this.detailTableLoading = false
          this.$message.error(error.errorInfo || error.text)
        })
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      this.selectDetailList = Object.assign([], list)
    },
    toggleAllRows() {
      this.$nextTick(() => {
        this.detailList.forEach((e, index) => {
          this.$refs.multipleTable.toggleRowSelection(e, true)
          if (e.actualVolume === 0 && e.actualWeight === 0 && e.actualAmount === 0) {
            this.$refs.multipleTable.toggleRowSelection(e, true)
          } else {
            this.$refs.multipleTable.toggleRowSelection(e, false)
          }
        })
      })
    },
    isWareStatus(index, row) {
      if (!this.isNeedArrival && row.warehouStatus === 1) {
        return true
      }
      if (row.warehouStatus === 1) {
        return true
      }
    },
    setColumn(obj) { // 打开表格设置
      if (this.isEditActual) {
        this.tableColumnDeiver = obj
      } else {
        this.tableColumnArrival = obj
      }
      this.setTableColumn()
      this.tablekey = Math.random()
    },
    setTableWidth(newWidth, oldWidth, column, event) {
      console.log('set table:', newWidth, oldWidth, column)
      // column.property
      // column.label
      // 不处理序号跟选择列
        /* this.columnWidthData = {
          prop: column.property,
          label: column.label,
          width: newWidth
        } */
      const find = this.tableColumn.filter(el => el.prop === column.property)
      if (find.length) {
          find[0].width = newWidth

          console.log('应该要显示保存框了')
          this.visible2 = true
          clearTimeout(this.tabletimer)
          this.tabletimer = setTimeout(() => {
            this.visible2 = false
          }, 10000)
        }
    },
    saveToTableSetup() {
      this.visible2 = false
      this.eventBus.$emit('tablesetup.change', this.thecode, this.tableColumn)
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
<style lang="scss">
.detailTable {
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 10px;
  position: relative;



  .detailTable_info {
    border-bottom: 2px dotted #ddd;
    background-color: #fff;
    margin-top: 5px;
    table {
      width: 100%;
      tbody {
        tr {
          font-size: 14px;
          th {
            color: #999;
            width: 12%;
            height: 34px;
          }
          td {
            width: 21.3%;
            padding: 0 3px;
            .el-input.is-disabled .el-input__inner {
              background-color: #fff;
              color: #3e9ff1;
            }
          }
        }
      }
    }
  }
  .tab_infos {
    padding: 10px 0;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .btns_box {
      margin-bottom: 5px;
      .el-button {
        margin-right: 0;
      }
      .table_setup {
        float: right;
        margin-left: 10px;
      }
    }
    .detailinfo_tab {
      width: 100%;
      height: calc(100vh - 440px);
      flex-grow: 1;
      .el-table .cell,
      .el-table th,
      .el-table td {
        overflow: visible;
        text-overflow: clip;
        color: #000;
      }
      .el-table th {
        font-weight: bold;
      }
      .el-table td {
        overflow: hidden;
      }
      .el-table th div,
      .el-table .cell {
        padding: 0;
        text-align: center;
      }
      .el-input.is-disabled .el-input__inner {
        background-color: #fff;
        color: #222;
        text-align: center;
        border: none;
        font-size: 13px;
      }
    }
  }
}

</style>
