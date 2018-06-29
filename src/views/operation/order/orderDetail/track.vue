<template>
  <div class="setpinfo_box">
    <h3 class="steptitle">物流信息</h3>
    <el-row class="stepItem_title">
      <el-col :span="4" :offset="5">操作时间</el-col>
      <el-col :span="3">操作网点</el-col>
      <el-col :span="2">操作人</el-col>
      <el-col :span="3">操作信息</el-col>
    </el-row>
    <div class="stepinfo">
      <el-steps direction="vertical">
      <el-step v-for="(item, index) in trackDetail" :key="index" icon="el-icon-location">
        <template slot="description">
          <el-row class="stepItem">
            <el-col :span="4">
              <el-popover placement="right" width="50" trigger="hover" v-if="item.track_type===1?true:false">
                <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
                  <el-button type="text" icon="el-icon-edit-outline" @click="editItem(item)"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                  <el-button type="text" icon="el-icon-delete" @click="deleteTrack(item)"></el-button>
                </el-tooltip>
                <el-button size="mini" slot="reference">{{item.trackNode}}</el-button>
              </el-popover>
              <el-button size="mini" v-else>{{item.trackNode}}</el-button>
            </el-col>
            <el-col :span="5">
              <p>{{item.createTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}</p>
            </el-col>
            <el-col :span="3">
              <p>{{item.orgName}}</p>
            </el-col>
            <el-col :span="3">
              <p>
                <icon-svg icon-class="human" v-if="item.track_type===1" />
                <i class="icon_blank" v-else></i> {{item.trackDetailed}}
              </p>
            </el-col>
            <el-col :span="8">
              <p>{{item.operatorInfo}}</p>
            </el-col>
          </el-row>
        </template>
      </el-step>
      <el-step icon="el-icon-location"></el-step>
    </el-steps>
    </div>
    <div class="stepinfo-footer">
      <el-form inline :model="formModel" :rules="ruleForm" ref="formModel" label-width="80px">
        <el-form-item label="类型" prop="loadStatus">
          <el-input v-model="formModel.loadStatus" placeholder="类型" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="operatorTime">
          <el-date-picker v-model.trim="formModel.operatorTime" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="operatorInfo">
          <el-input v-model="formModel.operatorInfo" placeholder="" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm('formModel')" size="mini">保 存</el-button>
    </div>
  </div>
</template>
<script>
// 请求接口
import orderManage from '@/api/operation/orderManage'
import { getLoadDetail, deleteTrack, postAddTrack, putUpdateTrack } from '@/api/operation/track'

export default {
  props: {
    orderid: [String, Number]
  },
  data () {
    return {
      loading: false,
      trackDetail: [],
      formModel: {}
    }
  },
  mounted(){
    this.getDetail()
  },
  methods:{
    getDetail() {
      let id = this.id
      return orderManage.getShipTrackinfo(this.orderid).then(data => {
        this.trackDetail = data
      })
    },
    deleteTrack() {

    },
    editItem() {

    },
    submitForm() {
      
    }
  }
}
</script>
<style lang="scss">
.setpinfo_box{
  .steptitle{
    font-size: 14px;
    color: #333;
  }
  .stepItem_title{
    color: #666;
  }
}
</style>
