<template>
  <div class="abnomal-content orderinfo-content">
    <div class="abnormal-btns-order">
      <el-button type="primary" size="mini" icon="el-icon-circle-plus" plain @click="openAddAbnormal" v-has:ABNO_ADD>异常登记</el-button>
    </div>
    <div class="abnomal-content-wrapper">
    <el-table
      ref="multipleTable"
      :data="usersArr"
      stripe
      border
      height="100%"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="abnormalNo"
        label="异常编号"
        >
      </el-table-column>
      <el-table-column
        prop="abnormalTypeName"
        label="异常类型">
      </el-table-column>
      <el-table-column
        prop="abnormalStatusName"
        label="处理状态">
      </el-table-column>
      <el-table-column
        label="登记时间">
        <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
      </el-table-column>
      <el-table-column
        prop="disposeOrgName"
        label="登记网点">
      </el-table-column>
      <el-table-column
        prop="registerName"
        label="登记人">
      </el-table-column>
      <el-table-column
        prop="dutyOrgName"
        label="责任对象">
      </el-table-column>
      <el-table-column
        prop="abnormalDescribe"
        label="异常描述">
      </el-table-column>
      <el-table-column
        prop="disposeOpinion"
        label="处理意见">
      </el-table-column>
      <el-table-column
        label="异常图片"
        width="300"
        >
        <template slot-scope="scope">
           <div class="clickimglist">
            <span class="clickimg" v-for="(item, index) in (scope.row.abnormalPicture ? scope.row.abnormalPicture.split(',') : [])" :key="index">
            <img v-showPicture  :src="item" />
            </span>
            </div>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <Addabnormal :key="abkey" :orderinfo="orderinfo" :issender="true" :isModify="false"  :isCheck="false" :info="{}" :id="''" :orgid="otherinfo.orgid" :companyId="otherinfo.companyId"
    :shipSn="shipsn" :popVisible.sync="AddAbnormalVisible" @close="closeAddAbnormal" @success="fetchData"  />
  </div>
</template>
<script>
import orderManage from '@/api/operation/orderManage'
import Addabnormal from '@/views/operation/service/abnormal/components/add'

export default {
  components: {
    Addabnormal
  },
  props: {
    orderid: [String, Number],
    shipsn: [String, Number],
    orderinfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      AddAbnormalVisible: false,
      usersArr: [],
      abkey: '1'
    }
  },
  watch: {
    orderid(newVal) {
      if (newVal !== '') {
        this.fetchData()
      } else {
        this.usersArr = []
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    openAddAbnormal() {
      // this.abkey = +new Date()
      this.AddAbnormalVisible = true
    },
    closeAddAbnormal() {
      this.AddAbnormalVisible = false
    },
    fetchData() {
      return orderManage.getShipAbnormal(this.orderid).then(res => {
        this.usersArr = res
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    }
  }
}
</script>
<style lang="scss">
.abnomal-content{
  .abnormal-btns-order{
    margin-bottom: 10px;
  }
  .abnomal-content-wrapper{
    height: calc( 100% - 38px);
  }
  .clickimglist{
    width: 100%;
    overflow: auto;
    padding-bottom: 2px;
  }
  .cell .clickimg{
    border: 1px solid #ccc;
    padding: 2px;
    text-align: center;
    width: 50px;
    height: 50px;
    display: inline-block;
    margin-left: 3px;
    line-height: 50px;

    img{
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
  }
}
</style>
