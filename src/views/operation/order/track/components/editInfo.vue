<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" v-loading="loading" class="trackInfoPop">
    <template slot="content">
      <div class="content_head">
        批次号： {{info.batchNo}}
      </div>
      <div class="editInfoPop_content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="批次详情" name="first">
            {{info}}
          </el-tab-pane>
          <el-tab-pane label="批次跟踪" name="second">
            <div class="tab_box">
              <div class="tab_box_item">
                <el-row class="stepItem_title">
                  <el-col :span="3" :offset="6"><b>操作时间</b></el-col>
                  <el-col :span="4"><b>操作网点</b></el-col>
                  <el-col :span="3"><b>操作人</b></el-col>
                  <el-col :span="3"><b>操作信息</b></el-col>
                </el-row>
                <el-steps direction="vertical">
                  <el-step v-for="(item, index) in trackDetail" :key="item.key" icon="el-icon-location">
                    <template slot="description">
                      <el-row class="stepItem">
                        <el-col :span="6">
                          <p>{{item.loadStatus}}
                            <div class="tab_box_item_btn" v-if="isShowBtn">
                              <el-button type="text" icon="el-icon-edit-outline"></el-button>
                              <el-button type="text" icon="el-icon-delete" @click="deleteTrack(item)"></el-button>
                            </div>
                          </p>
                        </el-col>
                        <el-col :span="4">
                          <p>{{item.operatorTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}</p>
                        </el-col>
                        <el-col :span="4">
                          <p>{{item.operatorOrgid}}</p>
                        </el-col>
                        <el-col :span="4">
                          <p>{{item.operatorUsername}}</p>
                        </el-col>
                        <el-col :span="6">
                          <p>{{item.operatorInfo}}</p>
                        </el-col>
                      </el-row>
                    </template>
                  </el-step>
                  <el-step icon="el-icon-location"></el-step>
                </el-steps>
              </div>
              <div class="tab_box_item">
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <div slot="footer" class="dialog-footer stepFrom" v-if="isFootEdit">
      <el-form inline :model="formModel" :rules="ruleForm" label-width="80px" ref="formModel">
        <el-form-item label="审批人" prop="operatorUserid">
          <el-input v-model="formModel.operatorUserid" placeholder="审批人" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="operatorTime">
          <el-date-picker v-model="formModel.operatorTime" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="operatorInfo">
          <el-input v-model="formModel.operatorInfo" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formModel')" size="mini">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" v-else="isFootEdit">
      <el-button @click="closeMe">关闭</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import popRight from '@/components/PopRight/index'
import { getLoadDetail, deleteTrack, postAddTrack } from '@/api/operation/track'
export default {
  components: {
    popRight
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    orgid: {
      required: true
    },
    id: {
      type: Number,
      default: 0
    },
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      popTitle: '在途跟踪',
      loading: false,
      infoId: {},
      trackDetail: [],
      activeName: 'second',
      formModel: {},
      ruleForm: {},
      isShowBtn: true,
      isFootEdit: true,
      formModel: {
      	addStatus: 1,
      	id: 0,
      	loadId: 0,
      	loadStatus: '',
      	operatorInfo: '',
      	operatorOrgid: 0,
      	operatorTime: '',
      	operatorUserid: 0,
      	transferId: 0
      }
    }
  },
  watch: {
    id() {},
    info() {},
    popVisible(newVal, oldVal) {
      if (this.popVisible) {
        this.getDetail()
      }
    }
  },
  mounted() {
    if (this.popVisible) {
      this.getDetail()
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postAddTrack(this.formModel).then(data => {
            this.$message({ type: 'success', message: '添加成功' })
          })
        }
      })
    },
    getDetail() {
      let id = this.id
      return getLoadDetail(id).then(data => {
        this.trackDetail = Object.assign([], data)
      })
    },
    reset() {},
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false);
      if (typeof done === 'function') {
        done()
      }
    },
    deleteTrack(item) {
      console.log(item)
      return deleteTrack(item.id).then(data => {
        this.$message({ type: 'success', message: '删除成功' })
        this.getDetail()
      })
    },
    handleClick() {
      if (this.activeName === 'second') {
        this.isFootEdit = true
      } else {
        this.isFootEdit = false
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.popRight {
  width: 800px !important;
}

.content_head {
  background-color: #E9F3FA;
  line-height: 36px;
  height: 36px;
  padding: 0 10px;
}

.stepFrom {
  .el-form--inline .el-form-item {
    margin-right: 0;
    float: left;
    display: flex;
    .el-input {
      width: 150px;
      padding: 0;
      margin-left: -5px;
    }
    .el-button {
      margin-left: 10px;
    }
  }
}

.editInfoPop_content {
  padding: 0 10px 0 10px;
  .tab_box {
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    .stepItem_title {
      margin: 10px 0 10px 10px;
      font-size: 14px;
      width: 160%;
    }
    .stepItem {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
      width: 160%;
      p {
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        .tab_box_item_btn {}
      }
    }
  }
}

</style>
