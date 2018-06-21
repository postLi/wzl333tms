<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" v-loading="loading" class="trackInfoPop">
    <template slot="content">
      <div class="editInfoPop_content">
        <div class="tab_box">
          <div class="tab_box_item">
            <el-row class="stepItem_title">
              <el-col :span="4" :offset="4"><b>操作时间</b></el-col>
              <el-col :span="3"><b>操作网点</b></el-col>
              <el-col :span="2"><b>操作人</b></el-col>
              <el-col :span="3"><b>操作信息</b></el-col>
            </el-row>
            <el-steps direction="vertical">
              <el-step v-for="(item, index) in trackDetail" :key="item.key" icon="el-icon-location">
                <template slot="description">
                  <el-row class="stepItem">
                    <el-col :span="4">
                      <el-popover placement="right" width="50" trigger="hover" v-if="item.addStatus===1?true:false">
                        <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
                          <el-button type="text" icon="el-icon-edit-outline" @click="editItem(item)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                          <el-button type="text" icon="el-icon-delete" @click="deleteTrack(item)"></el-button>
                        </el-tooltip>
                        <el-button size="mini" slot="reference">{{item.loadStatus}}</el-button>
                      </el-popover>
                      <el-button size="mini" v-else>{{item.loadStatus}}</el-button>
                    </el-col>
                    <el-col :span="5">
                      <p>{{item.operatorTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}</p>
                    </el-col>
                    <el-col :span="3">
                      <p>{{item.orgName}}</p>
                    </el-col>
                    <el-col :span="3">
                      <p>
                        <i class="icon_man" v-if="item.addStatus===1?true:false"></i>
                        <i class="icon_blank" v-else></i> {{item.operatorUsername}}
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
          <div class="tab_box_item">
          </div>
        </div>
      </div>
    </template>
    <div slot="footer" class="dialog-footer stepFrom">
      <el-form inline :model="formModel" :rules="ruleForm" label-width="80px" ref="formModel">
        <el-form-item label="类型" prop="loadStatus">
          <el-input v-model="formModel.loadStatus" placeholder="类型" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="operatorTime">
          <el-date-picker v-model="formModel.operatorTime" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="operatorInfo">
          <el-input v-model="formModel.operatorInfo" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formModel')" size="mini">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import popRight from '@/components/PopRight/index'
import { getTransferTrack, deleteTrack, postAddTrack, putUpdateTrack } from '@/api/operation/track'
import { getAllOrgInfo } from '@/api/company/employeeManage'
import { mapGetters } from 'vuex'
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
    }
  },
  data() {
    return {
      popTitle: '在途跟踪',
      loading: false,
      infoId: {},
      trackDetail: [],
      formModel: {},
      ruleForm: {
        loadStatus: [{ required: true, trigger: 'blur', message: '不能为空' }],
        operatorTime: [{ required: true, trigger: 'blur', message: '不能为空' }],
        operatorInfo: [{ required: true, trigger: 'blur', message: '不能为空' }]
      },
      isShowBtn: true,
      isFootEdit: true,
      formModel: {
        addStatus: 1,
        id: 0,
        loadId: 0,
        loadStatus: '',
        operatorInfo: '',
        operatorOrgid: 1,
        operatorTime: '',
        operatorUserid: 0
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
          if (this.formModel.id) {
            this.editTrack()
          } else {
            this.addTrack()
          }
        }
      })
    },
    getDetail() {
      let transferId = this.id
      return getTransferTrack(transferId).then(data => {
        this.trackDetail = Object.assign([], data)
      })
    },
    closeMe(done) {
      this.$emit('update:popVisible', false);
      if (typeof done === 'function') {
        done()
      }
    },
    deleteTrack(item) {
      // console.log(item)
      return deleteTrack(item.id).then(data => {
        this.$message({ type: 'success', message: '删除成功' })
        this.getDetail()
      })
    },
    editItem(item) {
      // console.log(item)
      this.resetForm()
      this.formModel = Object.assign({}, item)
    },
    editTrack() {
      // console.log('修改')
      this.formModel.transferId = this.id
      return putUpdateTrack(this.formModel).then(data => {
        this.$message({ type: 'success', message: '修改成功' })
        this.getDetail()
        this.resetForm()
      })
    },
    addTrack() {
      // console.log('添加')
      this.formModel.transferId = this.id
      return postAddTrack(this.formModel).then(data => {
        this.$message({ type: 'success', message: '添加成功' })
        this.getDetail()
        this.resetForm()
      })
    },
    resetForm() {
      this.$refs['formModel'].resetFields()
    }
  }
}

</script>
<style lang="scss" scoped>
.icon_man {
  background-image: url(../../../../../assets/icom/human.svg);
  background-size: 24px;
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.icon_blank {
  background-size: 24px;
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

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
  padding: 0 10px;
  width: 100%;
  height: 93%;
  .info {
    background-color: rgb(238, 241, 246);
    margin-top: -30px;
    padding: 10px;
  }
  .tab_box {
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow: hidden;
    p {
      word-wrap: break-word;
      word-break: normal;
      display: block;
    }
    .stepItem_title {
      margin: 10px 0 10px 10px;
      font-size: 14px;
      width: 220%;
    }
    .stepItem {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
      width: 220%;
    }
  }
}

</style>
