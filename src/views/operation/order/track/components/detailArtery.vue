<template>
  <div class="detailTables">
    <el-form inline v-model="info" label-width="100" class="detailTables_info">
      <table>
        <tbody>
          <tr>
            <th>到达网点</th>
            <td>
              <el-input v-model="info.arriveOrgName" :size="btnsize" disabled></el-input>
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
             <th>可载重量</th>
            <td>
              <el-input v-model="info.truckLoad" :size="btnsize" disabled></el-input>
            </td>
            <th>车牌号码</th>
            <td>
              <el-input v-model="info.truckIdNumber" :size="btnsize" disabled></el-input>
            </td>
           <!--  <th>短驳费</th>
            <td>
              <el-input v-model="info.shortFee" :size="btnsize" disabled></el-input>
            </td> -->
            <th>分摊方式</th>
            <td>
              <el-input v-model="info.apportionType" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
            <th>可载体积</th>
            <td>
              <el-input v-model="info.truckVolume" :size="btnsize" disabled></el-input>
            </td>
            <th>配载日期</th>
            <td>
              <el-input :value="info.departureTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :size="btnsize" disabled></el-input>
            </td>
            <th>预计到达时间</th>
            <td>
              <el-input :value="info.receivingTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')" :size="btnsize" disabled></el-input>
            </td>
          </tr>
          <tr>
           
            <th>备注</th>
            <td colspan="5">
              <el-input v-model="info.remark" :size="btnsize" disabled :maxlength="300"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </el-form>
    <table class="detailTables_info_artery">
      <thead>
        <tr>
          <th>现付运费(元)</th>
          <th>现付油卡(元)</th>
          <th>回付运费(元)</th>
          <th>回付油卡(元)</th>
          <th>到付运费(元)</th>
          <th>到付油卡(元)</th>
          <th>整车保险费(元)</th>
          <th>发站装卸费(元)</th>
          <th>发站其他费(元)</th>
          <th>到站装卸费(元)</th>
          <th>到站其他费(元)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{info.nowpayCarriage}}</td>
          <td>{{info.nowpayOilCard}}</td>
          <td>{{info.backpayCarriage}}</td>
          <td>{{info.backpayOilCard}}</td>
          <td>{{info.arrivepayCarriage}}</td>
          <td>{{info.arrivepayOilCard}}</td>
          <td>{{info.carloadInsuranceFee}}</td>
          <td>{{info.leaveHandlingFee}}</td>
          <td>{{info.leaveOtherFee}}</td>
          <td>{{info.arriveHandlingFee}}</td>
          <td>{{info.arriveOtherFee}}</td>
        </tr>
      </tbody>
    </table>
    <div class="tab_infos">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-setting" @click="doAction('export')" plain class="table_setup">导出清单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-setting" @click="doAction('print')" plain class="table_setup">打印清单</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :data="detailList" stripe border height="100%" style="height:100%;" :default-sort="{prop: 'id', order: 'ascending'}" tooltip-effect="dark" @row-click="clickDetails" @selection-change="getSelection">
          <el-table-column fixed sortable type="selection" width="50">
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
    </div>
    <!-- 表格设置弹出框 -->
    <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="setupTableVisible = false" @success="setColumn"></TableSetup>
  </div>
</template>
<script>
import { getSelectLoadDetailList } from '@/api/operation/load'
import TableSetup from '@/components/tableSetup'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    TableSetup
  },
  props: {
    info: {
      type: Object,
      default: {}
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btnsize: 'mini',
      setupTableVisible: false,
      loadId: '',
      detailList: [],
      selected: [],
      query: {
        arriveOrgid: 0,
        batchNo: "",
        batchTypeId: 0,
        departureEndTime: "",
        departureStartTime: "",
        dirverName: "",
        loadEndTime: "",
        loadId: 0,
        loadStartTime: "",
        loadTypeId: 0,
        orgId: 0,
        truckIdNumber: ""
      },
      tableColumn: [{
          label: "运单号",
          prop: "shipSn",
          width: "130",
          fixed: true
        },
        {
          label: "开单网点",
          prop: "shipFromOrgName",
          width: "130",
          fixed: false
        },
        {
          label: "配载件数",
          prop: "loadAmount",
          width: "120",
          fixed: false
        },
        {
          label: "配载重量",
          prop: "loadWeight",
          width: "120",
          fixed: false
        },
        {
          label: "配载体积",
          prop: "loadVolume",
          width: "120",
          fixed: false
        },
        {
          label: "库存件数",
          prop: "repertoryAmount",
          width: "120",
          fixed: false
        },
        {
          label: "库存重量",
          prop: "repertoryWeight",
          width: "120",
          fixed: false
        },
        {
          label: "库存体积",
          prop: "repertoryVolume",
          width: "120",
          fixed: false
        },
        {
          label: "运单件数",
          prop: "cargoAmount",
          width: "120",
          fixed: false
        },
        {
          label: "运单重量",
          prop: "cargoWeight",
          width: "120",
          fixed: false
        },
        {
          label: "运单体积",
          prop: "cargoVolume",
          width: "120",
          fixed: false
        },
        {
          label: "出发城市",
          prop: "shipFromCityName",
          width: "120",
          fixed: false
        },
        {
          label: "到达城市",
          prop: "shipToCityName",
          width: "120",
          fixed: false
        },
        {
          label: "发货人",
          prop: "shipSenderName",
          width: "120",
          fixed: false
        },
        {
          label: "收货人",
          prop: "shipReceiverName",
          width: "120",
          fixed: false
        },
        {
          label: "收货人电话",
          prop: "shipReceiverMobile",
          width: "120",
          fixed: false
        },
        {
          label: "货品名",
          prop: "cargoName",
          width: "120",
          fixed: false
        },
        {
          label: "货号",
          prop: "shipGoodsSn",
          width: "120",
          fixed: false
        },
        {
          label: "运单备注",
          prop: "shipRemarks",
          width: "120",
          fixed: false
        }
      ]
    }
  },
  watch: {
    isShow() {
      if (this.isShow) {
        this.fecthSelectLoadList()
      }
    },
    info(newVal) {
      if (newVal) {
        this.fecthSelectLoadList()
      }
    }
  },
  methods: {
    setTable() {
      this.setupTableVisible = true
    },
    fecthSelectLoadList() {
      this.getLoadTrack()
    },
    getSelection(list) {
      this.selected = list
    },
    doAction(type) {
      switch (type) {
        case 'print': // 打印
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.detailList,
            columns: this.tableColumn
          })
          break
        case 'export': // 导出
          SaveAsFile({
            data: this.selected.length ? this.selected : this.detailList,
            columns: this.tableColumn,
            name: '在途跟踪'
          })
          break
      }
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getLoadTrack() { // 获取运单详情列表
      this.loadId = this.info.id
      getSelectLoadDetailList(this.loadId).then(data => {
        this.detailList = data.data
      }).catch((err)=>{
        this.loading = false
        this.$message.error(err.errorInfo || err.text || '未知错误，请重试~')
      })
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    }
  }
}

</script>
<style lang="scss">
.detailTables {
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 240px);
  padding: 0 10px;
  position: relative;
  .detailTables_info {
    border-bottom: 2px dotted #eee;
    background-color: #fff;
    table {
      width: 100%;
      tbody {
        tr {
          font-size: 14px;
          th {
            color: #666;
            width: 12%;
            height: 36px;
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
  .detailTables_info_artery {
    margin-top:5px;
    tr th {
      font-size: 12px;
      color: #666;
    }
    tr td{
      font-size: 13px;
      color: #3e9ff1;
    }
    tr td,
    tr th {
      height: 35px;
      padding: 10px 5px;
      border: 1px solid #d0d7e5;
      border-collapse: collapse;
      text-align: center;
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
