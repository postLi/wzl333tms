<template>
  <div class="detailTablePop">
    <el-form inline v-model="info" label-width="100" class="detailTablePop_info">
      <table>
        <tbody>
          <tr>
            <th>送货费</th>
            <td>
              <el-input v-model="info.deliveryFee" :size="btnsize" disabled></el-input>
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
            <th>可载体积</th>
            <td>
              <el-input v-model="info.truckVolume" :size="btnsize" disabled></el-input>
            </td>
            <th>可载重量</th>
            <td>
              <el-input v-model="info.truckLoad" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>分摊方式</th>
            <td>
              <el-input v-model="info.apportionTypeName" :size="btnsize" disabled></el-input>
            </td>
            <th>送货日期</th>
            <td>
              <el-input :value="info.loadTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :size="btnsize" disabled></el-input>
            </td>
            <th>要求到达时间</th>
            <td>
              <el-input :value="info.requireArrivedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>追货宝</th>
            <td>
              <el-input :value="info.terminalNo" :size="btnsize" disabled></el-input>
            </td>
            <th>备注</th>
            <td colspan="5">
              <el-input v-model="info.remark" :size="btnsize" disabled></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </el-form>
    <div class="tab_infos">
      <div class="btns_box">
        <el-button :size="btnsize" type="warning" icon="el-icon-circle-plus" plain @click="doAction('add')">签收</el-button>
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button> -->
        <el-popover @mouseenter.native="showSaveBox" @mouseout.native="hideSaveBox" placement="top" trigger="manual" width="160" :value="visible2">
          <p>表格宽度修改了，是否要保存？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="saveToTableSetup">确定</el-button>
          </div>
          <el-button slot="reference" type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        </el-popover>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain class="table_setup">导出清单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain class="table_setup">打印清单</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" @header-dragend="setTableWidth" :reserve-selection="true" :data="detailList" @row-click="clickDetails" @selection-change="getSelection" stripe border height="100%" style="height:100%;" :default-sort="{prop: 'id', order: 'ascending'}" tooltip-effect="dark" :key="tablekey">
          <el-table-column fixed sortable type="selection" width="50"></el-table-column>
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
    </div>
    <!-- 表格设置弹出框 -->
    <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="setupTableVisible = false" @success="setColumn" :code="thecode"></TableSetup>
    <!-- <Addbatch :issender="true" :dotInfo="dotInfo" :popVisible="popVisible" @close="closeAddBacth" @success="closeAddBacth" :isModify="isModify" :isSongh="isSongh"></Addbatch> -->
  </div>
</template>
<script>
import { getSelectLoadDetailList } from '@/api/operation/load'
// import { postBatchSign } from '@/api/operation/deliverManage'
import { objectMerge2 } from '@/utils/index'
import TableSetup from '@/components/tableSetup'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    TableSetup
  },
  props: {
    info: {
      type: Array,
      default: []
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible2: false,
      thecode: 'ORDER_DELIVER-1',
      btnsize: 'mini',
      setupTableVisible: false,
      loadId: '',
      tablekey: 0,
      detailList: [],
      selectDetailList: [],
      message: false,
      signData: {
        shipIds: [],
        orgIds: [],
        childShipIds: [],
        loadIds: [],
        signTime: '',
        signName: '',
        signCocumentTypeId: 0,
        documentNum: '',
        signTypeId: 0,
        remark: '',
        signPic: ''
      },
      tableColumn: [{
          label: '运单号',
          prop: 'shipSn',
          width: '120',
          fixed: true
        },
        {
          label: '开单网点',
          prop: 'shipFromOrgName',
          width: '120',
          fixed: false
        },
        {
          label: '签收状态',
          prop: 'signStatus',
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
          label: '实付送货费(元)',
          prop: 'deliveryFeeToPay',
          width: '100',
          fixed: false
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
          width: '160',
          fixed: false
        },
        {
          label: '到站',
          prop: 'shipToCityName',
          width: '160',
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
          width: '130',
          fixed: false
        },
        {
          label: '运单备注',
          prop: 'shipRemarks',
          width: '120',
          fixed: false
        }
      ]
    }
  },
  watch: {
    isShow: {
      handler(cval, oval) {
        if (cval) {
          this.getLoadTrack()
          this.toggleAllRows()
        }
      },
      immediate: true
    },
    info: {
      handler(cval, oval) {
        if (cval) {
          this.getLoadTrack()
          this.toggleAllRows()
        }
      },
      deep: true
    }
  },
  methods: {
    setTable() {
      this.setupTableVisible = true
    },
    doAction(type) {
      switch (type) {
        case 'add': // 签收
          this.openSignVisible()
          break
        case 'print': // 打印
          PrintInFullPage({
            data: this.selectDetailList.length ? this.selectDetailList : this.detailList,
            columns: this.tableColumn,
            name: '送货管理'
          })
          break
        case 'export': // 导出
          SaveAsFile({
            data: this.selectDetailList.length ? this.selectDetailList : this.detailList,
            columns: this.tableColumn,
            name: '送货管理'
          })
          break
      }
    },
    setData() {
      // this.setupTableVisible = true
    },
    getLoadTrack() {
      this.loadId = this.info.id
      getSelectLoadDetailList(this.loadId).then(data => {
        if (data) {
          this.detailList = data.data
          this.toggleAllRows()
        }
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      let data = {}
      this.$set(data, 'shipIds', [])
      this.$set(data, 'orgIds', [])
      this.$set(data, 'childShipIds', [])
      this.$set(data, 'loadIds', [])
      this.$set(data, 'signName', '')
      let nameArr = []
      if (list.length > 0) {
        this.selectDetailList = objectMerge2([], list)
        this.selectDetailList.forEach((e, index) => {
          data.shipIds.push(e.shipId)
          if (!e.childShipId || e.childShipId === '') {
            e.childShipId = null
          }
          if (!e.orgid || e.orgid === '') {
            e.orgid = null
          }
          nameArr[index] = e.shipReceiverName
          data.childShipIds.push(e.childShipId)
          data.orgIds.push(e.orgid)
          data.loadIds.push(this.loadId)
        })
        nameArr = nameArr.filter((v, i) => { return nameArr.indexOf(v) === i })
        if (nameArr.length > 1 && nameArr[0] !== nameArr[1]) { // 设置签收人
          data.signName = ''
        }
        if (nameArr.length === 1) {
          data.signName = nameArr[0]
        }
        console.log(data.signName)
        // data.shipIds = data.shipIds.join(',')
        // data.childShipIds = data.childShipIds.join(',')
      } else {
        this.isBatch = false
      }
      this.signData.shipIds = data.shipIds
      this.signData.childShipIds = data.childShipIds
      this.signData.orgIds = data.orgIds
      this.signData.loadIds = data.loadIds
      this.signData.signName = data.signName
      data = {}
      console.log('signData', this.signData)
    },
    toggleAllRows() {
      this.$nextTick(() => {
        this.detailList.forEach((e, index) => {
          this.$refs.multipleTable.toggleRowSelection(e, true)
        })
      })
    },
    openSignVisible() {
      console.log('批次详情页', this.signData)
      this.$emit('sendInfoData', this.signData)
    },
    setColumn(obj) {
      this.tableColumn = obj
      this.tablekey = new Date().getTime() // 刷新表格视图
      this.$refs.multipleTable.doLayout()
    },
    setTableWidth(newWidth, oldWidth, column, event) {
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
.detailTablePop {
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 10px;
  position: relative;

  .detailTablePop_info {
    border-bottom: 2px dotted #eee;
    background-color: #fff;
    table {
      width: 100%;
      tbody {
        tr {
          font-size: 14px;
          th {
            color: #999;
            width: 12%;
            height: 36px;
            color: #606266;
            font-weight: 400;
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
    .info_tab {
      width: 100%;
      height: calc(100vh - 430px);
      flex-grow: 1;
    }
  }
}

</style>
