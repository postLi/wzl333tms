<template>
  <div class="detailTable">
    <el-form inline v-model="info" label-width="100" class="detailTable_info">
      <table>
        <tbody>
          <tr>
            <th>到达网点</th>
            <td>
              {{info.currentOrgName}}
              <!-- <el-input v-model="info.currentOrgName" :size="btnsize"></el-input> -->
            </td>
            <th>司机名称</th>
            <td>
              {{info.dirverName}}
              <!-- <el-input v-model="info.dirverName" :size="btnsize"></el-input> -->
            </td>
            <th>司机电话</th>
            <td>
              {{info.dirverMobile}}
              <!-- <el-input v-model="info.dirverMobile" :size="btnsize"></el-input> -->
            </td>
          </tr>
          <tr>
            <th>车牌号码</th>
            <td>{{info.truckIdNumber}}</td>
            <th>短驳费</th>
            <td>
              {{info.shortFee}}
              <!-- <el-input v-model="info.shortFee" :size="btnsize"></el-input> -->
            </td>
            <th>分摊方式</th>
            <td>{{info.dirverName}}</td>
          </tr>
          <tr>
            <th>可载体积</th>
            <td>{{info.actualVolumeall}}</td>
            <th>短驳日期</th>
            <!-- <td>{{info.departureTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}')}}</td> -->
            <td>{{info.departureTime}}</td>
            <th>要求到达时间</th>
            <td>{{info.receivingTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}')}}</td>
          </tr>
          <tr>
            <th>可载重量</th>
            <td>{{info.actualVolumeall}}</td>
            <th>备注</th>
            <td colspan="3">{{info.remark}}</td>
          </tr>
        </tbody>
      </table>
    </el-form>
    <div class="tab_infos">
      <div class="btns_box">
        <el-button :size="btnsize" type="warning" icon="el-icon-circle-plus" plain @click="doAction('add')">短驳入库</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain class="table_setup">导出清单</el-button>
        <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain class="table_setup">打印清单</el-button>
      </div>
      <div class="info_tab">
        <el-table ref="multipleTable" :data="detailList" @row-click="clickDetails" @selection-change="getSelection" stripe border height="100%" style="height:100%;" :default-sort="{prop: 'id', order: 'ascending'}" tooltip-effect="dark">
          <el-table-column fixed type="index" width="50">
          </el-table-column>
          <el-table-column fixed width="50" sortable type="selection"></el-table-column>
          <el-table-column sortable width="120" prop="shipFromOrgName" label="开单网点"></el-table-column>
          <el-table-column sortable width="120" prop="shipId" label="运单号"></el-table-column>
          <el-table-column sortable width="120" prop="actualAmountall" label="实到件数">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.loadAmountall" @change="changeAmount[scope.$index]"></el-input>
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="actualWeigntall" label="实到重量">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.actualWeigntall" @change="changeWeight[scope.$index]"></el-input>
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="actualVolumeall" label="实到体积">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.actualVolumeall" @change="changeVolume[scope.$index]"></el-input>
            </template>
          </el-table-column>
          <el-table-column sortable width="120" prop="repertoryAmount" label="配载件数"></el-table-column>
          <el-table-column sortable width="120" prop="repertoryWeight" label="配载重量"></el-table-column>
          <el-table-column sortable width="120" prop="repertoryVolume" label="配载体积"></el-table-column>
          <!-- <el-table-column sortable width="120" prop="cargoAmount" label="运单件数"></el-table-column>
          <el-table-column sortable width="120" prop="cargoWeight" label="运单重量"></el-table-column>
          <el-table-column sortable width="120" prop="cargoVolume" label="运单体积"></el-table-column> -->
          <el-table-column sortable width="160" prop="shipFromCityName" label="出发城市"></el-table-column>
          <el-table-column sortable width="160" prop="shipToCityName" label="到达城市"></el-table-column>
          <el-table-column sortable width="120" prop="shipSenderName" label="发货人"></el-table-column>
          <el-table-column sortable width="120" prop="shipSenderMobile" label="发货人电话"></el-table-column>
          <el-table-column sortable width="120" prop="shipReceiverName" label="收货人"></el-table-column>
          <el-table-column sortable width="120" prop="shipReceiverMobile" label="收货人电话"></el-table-column>
          <el-table-column sortable width="200" prop="cargoName" label="货品名"></el-table-column>
          <el-table-column sortable width="120" prop="shipSn" label="货号"></el-table-column>
          <el-table-column sortable width="120" prop="shipRemarks" label="运单备注"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getSelectLoadDetailList } from '@/api/operation/load'
import { postAddRepertory } from '@/api/operation/shortDepart'
export default {
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
  watch: {
    info() {}
  },
  data() {
    return {
      btnsize: 'mini',
      loadId: '',
      detailList: [],
      newData: {
        tmsOrderLoadFee: [],
        tmsOrderLoadDetailsList: {},
        tmsOrderLoad: {}
      },
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
      }
    }
  },
  watch: {
    isShow() {
      console.log(this.isShow, 'SHOW')
      if (this.isShow) {
        this.fecthSelectLoadList()
      }
    }
  },
  methods: {
    setTable() {},
    fecthSelectLoadList() {
      this.getLoadTrack()
    },
    doAction(type) {
      switch (type) {
        case 'add':
          this.postAddRepertory()
          break
        case 'print':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
        case 'export':
          this.$message({ type: 'warning', message: '暂无此功能，敬请期待~' })
          break
      }
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(list) {
      list = this.detailList
    },
    setData() {
      let dataFee = {} // 配载费用
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
      let dataLoad = {} // 配载信息
      dataLoad.actualAmountall = this.info.actualAmountall
      dataLoad.actualVolumeall = this.info.actualVolumeall
      dataLoad.actualWeigntall = this.info.actualWeigntall
      dataLoad.apportionTypeId = this.info.apportionTypeId
      dataLoad.arriveOrgid = this.info.arriveOrgid
      dataLoad.batchNo = this.info.batchNo
      dataLoad.batchTypeId = this.info.batchTypeId
      dataLoad.contractNo = this.info.contractNo
      dataLoad.createTime = this.info.createTime
      dataLoad.departureTime = this.info.departureTime
      dataLoad.dirverMobile = this.info.dirverMobile
      dataLoad.dirverName = this.info.dirverName
      dataLoad.id = this.info.id
      dataLoad.loadAmountall = this.info.loadAmountall
      dataLoad.loadTime = this.info.loadTime
      dataLoad.loadTypeId = this.info.loadTypeId
      dataLoad.loadVolumeall = this.info.loadVolumeall
      dataLoad.loadWeightall = this.info.loadWeightall
      dataLoad.orgid = this.info.orgid
      dataLoad.planArrivedTime = this.info.planArrivedTime
      dataLoad.receivedUserId = this.info.receivedUserId
      dataLoad.receivingTime = this.info.receivingTime
      dataLoad.remark = this.info.remark
      dataLoad.requireArrivedTime = this.info.requireArrivedTime
      dataLoad.truckIdNumber = this.info.truckIdNumber
      dataLoad.truckLoad = this.info.truckLoad
      dataLoad.truckUserId = this.info.truckUserId
      dataLoad.truckVolume = this.info.truckVolume
      dataLoad.updateTime = this.info.updateTime
      dataLoad.userId = this.info.userId
      // setData 后台需要的数据结构
      this.newData.tmsOrderLoad = Object.assign({}, dataLoad)
      this.newData.tmsOrderLoadFee = Object.assign({}, dataFee)
      this.newData.tmsOrderLoadDetailsList = Object.assign([], this.detailList)
      console.log('setData', this.newData)
    },
    postAddRepertory() {
      this.setData()
      postAddRepertory(50, this.newData).then(data => {
        this.$router.push({ path: '././shortDepart', query: { tableKey: Math.random() } })
        this.$message({ type: 'success', message: '短驳入库操作成功' })
      })
    },
    getLoadTrack() {
      this.loadId = this.info.id
      getSelectLoadDetailList(this.loadId).then(data => {
        if (data) {
          this.detailList = data.data
          this.setData()
          this.toggleAllRows()
        }
      })
    },
    toggleAllRows() {
      this.detailList.forEach(e => {
        this.$refs.multipleTable.toggleRowSelection(e, true)
      })
    },
    changeAmount(newVal) {},
    changeWeight(newVal) {},
    changeVolume(newVal) {}
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
    border: 1px solid #eee;
    background-color: #fff;
    table {
      width: 100%;
      tbody {
        tr {
          font-size: 14px;
          th {
            background-color: #f2f2f2;
            width: 16.6%;
            height: 36px;
          }
          td {
            width: 16.6%;
            padding: 0 3px;
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
