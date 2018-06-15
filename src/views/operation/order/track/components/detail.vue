<template>
  <div class="detailTable">
    <!-- {{info}} -->
    <el-form inline v-model="info" label-width="100">
      <table>
        <tbody>
          <tr>
            <th>到达网点</th>
            <td>{{info.currentOrgName}}</td>
            <th>司机名称</th>
            <td>{{info.dirverName}}</td>
            <th>司机电话</th>
            <td>{{info.dirverMobile}}</td>
          </tr>
          <tr>
            <th>可载体积</th>
            <td>{{info.actualVolumeall}}</td>
            <th>短驳费</th>
            <td>{{info.shortFee}}</td>
            <th>分摊方式</th>
            <td>{{info.dirverName}}</td>
          </tr>
          <tr>
            <th>车牌号码</th>
            <td>{{info.truckIdNumber}}</td>
            <th>短驳日期</th>
            <td>{{info.departureTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}')}}</td>
            <th>要求到达时间</th>
            <td>{{info.receivingTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}')}}</td>
          </tr>
          <tr>
            <th>备注</th>
            <td colspan="5">{{info.remark}}</td>
          </tr>
        </tbody>
      </table>
    </el-form>
  </div>
</template>
<script>
import { getLoadTrack } from '@/api/operation/track'
export default {
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
  watch: {
    info() {}
  },
  data() {
    return {
      loadId: '',
      detailList: [],
      query: {
        "arriveOrgid": 0,
        "batchNo": "",
        "batchTypeId": 0,
        "departureEndTime": "",
        "departureStartTime": "",
        "dirverName": "",
        "loadEndTime": "",
        "loadId": 0,
        "loadStartTime": "",
        "loadTypeId": 0,
        "orgId": 0,
        "truckIdNumber": ""
      }
    }
  },
  watch: {
    isShow () {
      console.log(this.isShow,'SHOW')
    if (this.isShow) {
      this.fecthSelectLoadList()
    }
    }
  },
  methods: {
    fecthSelectLoadList() {
      this.getLoadTrack()
    },
    getLoadTrack() {
      console.log('查询信息')
      this.loadId = this.info.id
      // getLoadTrack(this.loadId).then(data => {
      //   this.info = data.list
      //   console.log(data.list)
      // })
    }
  }
}

</script>
<style lang="scss">
.detailTable {
  table {
    width: 100%;
    tbody {
      tr {
        font-size: 14px;
        th {
          background-color: #E9F3FA;
          width: 16.6%;
          height: 48px;
        }
        td {
          width: 16.6%;
          padding: 0 3px; // background-color: blue;
        }
      }
    }
  }
}

</style>
