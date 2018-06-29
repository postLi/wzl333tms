<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" v-loading="loading" class="trackInfoPop">
    <template slot="content">
      <div class="editInfoPop_content">
        <div class="tab_box">
          <div class="tab_box_item">
            <el-row class="stepItem_title">
              <el-col :span="5" :offset="5"><b>操作时间</b></el-col>
              <el-col :span="3"><b>操作网点</b></el-col>
              <el-col :span="2"><b>操作人</b></el-col>
              <el-col :span="3"><b>操作信息</b></el-col>
            </el-row>
            <el-steps direction="vertical">
              <el-step v-for="(item, index) in trackDetail" :key="item.key" icon="el-icon-location">
                <template slot="description">
                  <el-row class="stepItem">
                    <el-col :span="4">
                      <el-popover placement="right" width="50" trigger="hover" v-if="item.addStatus===1">
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
                    <el-col :span="6">
                      <p>{{item.operatorTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}</p>
                    </el-col>
                    <el-col :span="3">
                      <p>{{item.orgName}}</p>
                    </el-col>
                    <el-col :span="3">
                      <p>
                        <i class="icon_man" v-if="item.addStatus===1"></i>
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
        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('formModel')" size="mini">保存</el-button>
        </el-form-item> -->
      </el-form>
      <el-button type="primary" @click="submitForm('formModel')" size="mini">保存</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import popRight from '@/components/PopRight/index'
import { getTransferTrack, deleteTrack, postAddTrack, putUpdateTrack } from '@/api/operation/track'
import { getAllOrgInfo } from '@/api/company/employeeManage'
import { mapGetters } from 'vuex'
import { getSystemTime } from '@/api/common'
import { objectMerge2, parseTime } from '@/utils/index'
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
        // this.getSystemTime()
      }
    }
  },
  // mounted() {
  //   if (this.popVisible) {
  //     this.getDetail()
  //     this.getSystemTime()
  //   }
  // },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formModel.id) {
            this.$confirm('此操作将修改跟踪信息, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.editTrack()
            })
          } else {
            this.$confirm('此操作将添加跟踪信息, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.addTrack()
            })
          }
        }
      })
    },
    getDetail() {
      let transferId = this.id
      return getTransferTrack(transferId).then(data => {
        this.trackDetail = objectMerge2([], data)
        this.$nextTick(() => {
          console.log('获取列表：',this.trackDetail[this.trackDetail.length-1].operatorTime)
        })
      })
    },
    closeMe(done) {
      this.$emit('update:popVisible', false);
      if (typeof done === 'function') {
        done()
      }
    },
    deleteTrack(item) {
      this.$confirm('此操作将删除本跟踪信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteTrack(item.id).then(data => {
          this.$message({ type: 'success', message: '删除成功' })
          this.getDetail()
        })
      })
    },
    editItem(item) {
      this.formModel = objectMerge2({}, item)
    },
    editTrack() {
      this.formModel.transferId = this.id
      return putUpdateTrack(this.formModel).then(data => {
        this.$message({ type: 'success', message: '修改成功' })
        this.getDetail()
        this.resetForm()
      })
    },
    addTrack() {
      this.formModel.transferId = this.id
      this.formModel.operatorTime = Date.parse(new Date(this.formModel.operatorTime))
      return postAddTrack(this.formModel).then(data => {
        console.log('提交：',this.formModel.operatorTime)
        this.$message({ type: 'success', message: '添加成功' })
        this.getDetail()
        this.resetForm()
      })
    },
    // getSystemTime() { // 获取系统时间
    //   if (!this.formModel.id) {
    //     getSystemTime().then(data => {
    //         // this.formModel.operatorTime = Date.parse(new Date(data.trim()))
    //         this.formModel.operatorTime= ( new Date(data.trim())).valueOf();
    //         console.log('系统：',this.formModel.operatorTime)
    //       })
    //       .catch(error => {
    //         this.$message({ type: 'error', message: '获取系统时间失败' })
    //       })
    //   }
    // },
    resetForm() {
     this.$nextTick(() => {
        this.$refs['formModel'].resetFields()
        this.formModel = this.$options.data().formModel
        // this.getSystemTime()
      })
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

.editInfoPop_content {
  width: 100%;
  display: flex;
  flex-direction: column;

  .tab_box {
    position: relative;
    .tab_box_item {
      margin: 0;
      .stepItem_title {
        font-size: 14px;
        color: #333;
        width: 100%;
        height: 36px;
        line-height: 36px;
        padding-left: 30px;
      }
      .el-step.is-vertical {
        padding-left: 20px;
        .stepItem {
          width: 110%;
          color: #666;
          font-size: 14px;
          padding: 10px;
          margin: 0 0 3px 0;
          background-color: #ffffff;
          box-shadow: 0px 0px 10px #eaeaea;
          transition: 0.4s;
        }
        .stepItem:hover {
          transition: 0.2s;
          background-color: #E9F3FA;
        }
      }
    }
  }
}

.stepFrom {
  display: block;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  .el-form--inline .el-form-item {
    margin-right: 0;
    float: left;
    display: flex;
    width: 28%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }

  .el-form-item__label {
    font-size: 12px;
  }

  .el-form-item__content {
    flex: 1;
  }
  .el-button--primary {
    position: absolute;
    top: 23px;
    right: 10px;
  }
}

.animated {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}

</style>
