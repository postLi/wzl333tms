<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" v-loading="loading" class="trackInfoPop">
    <template slot="content">
      <div class="content_head">
        批次号： {{info.batchNo}}
      </div>
      <div class="editInfoPop_content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="批次详情" name="first">
            <Detail :info="info" :isShow="popVisible" class="animated fadeInRight"></Detail>
          </el-tab-pane>
          <el-tab-pane label="批次跟踪" name="second">
            <div class="tab_box animated fadeInRight">
              <div class="tab_box_item">
                <el-row class="stepItem_title">
                  <el-col :span="4" :offset="5"><b>操作时间</b></el-col>
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
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <div slot="footer" class="dialog-footer stepFrom" v-if="isFootEdit">
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
    <div slot="footer" class="dialog-footer" v-else="isFootEdit">
      <el-button @click="closeMe">关闭</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import popRight from '@/components/PopRight/index'
import { getLoadDetail, deleteTrack, postAddTrack, putUpdateTrack } from '@/api/operation/track'
import { getAllOrgInfo } from '@/api/company/employeeManage'
import { mapGetters } from 'vuex'
import Detail from './detail'
import { objectMerge2, parseTime } from '@/utils/index'
import { getSystemTime } from '@/api/common'
export default {
  components: {
    popRight,
    Detail
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
      activeName: 'first',
      formModel: {},
      ruleForm: {
        loadStatus: [{ required: true, trigger: 'blur', message: '不能为空' }],
        operatorTime: [{ required: true, trigger: 'blur', message: '不能为空' }],
        operatorInfo: [{ required: true, trigger: 'blur', message: '不能为空' }]
      },
      isShowBtn: true,
      isFootEdit: false,
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
    getSystemTime() { // 获取系统时间
      // if (!this.formModel.id) {
      //   getSystemTime().then(data => {
      //       this.formModel.operatorTime = Date.parse(new Date(data.trim()))
      //     })
      //     .catch(error => {
      //       this.$message({ type: 'error', message: '获取系统时间失败' })
      //     })
      // }
    },
    submitForm(formName) { // 底部表单提交
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
      let id = this.id
      return getLoadDetail(id).then(data => {
        this.trackDetail = objectMerge2([], data)
      })
    },
    closeMe(done) { // 关闭右边弹出框
      this.$emit('update:popVisible', false);
      if (typeof done === 'function') {
        done()
      }
    },
    deleteTrack(item) { // 删除一条跟踪信息
      this.$confirm('此操作将删除本跟踪信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteTrack(item.id).then(data => {
          this.$message({ type: 'success', message: '删除成功' })
          this.getDetail()
          this.resetForm()
        })
        .catch(error => {
          this.$message({ type: 'success', message: '删除失败' })
        })
      })
    },
    editItem(item) {
      this.formModel = objectMerge2({}, item)
    },
    editTrack() { // 修改跟踪信息
      console.log('修改', this.formModel)
      this.formModel.transferId = 0
      return putUpdateTrack(this.formModel).then(data => {
        this.$message({ type: 'success', message: '修改成功' })
        this.getDetail()
        this.resetForm()
      })
    },
    addTrack() { // 添加跟踪信息
      console.log('添加')
      this.formModel.loadId = this.id
      return postAddTrack(this.formModel).then(data => {
        this.$message({ type: 'success', message: '添加成功' })
        this.getDetail()
        this.resetForm()
      })
    },
    handleClick() { // 底部按钮区显示
      if (this.activeName === 'second') {
        this.isFootEdit = true
        this.getSystemTime()
      } else {
        this.isFootEdit = false
      }
    },
    resetForm() { // 清空表单及验证
      this.$nextTick(() => {
        this.$refs['formModel'].resetFields()
        this.formModel = this.$options.data().formModel
        this.getSystemTime()
      })
    }
  }
}

</script>
<style lang="scss">
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
  width: 100%;
  padding: 0 10px;
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 34;
}

.editInfoPop_content {
  width: 100%;
  display: flex;
  flex-direction: column;

  .el-tabs__header {
    position: fixed;
    z-index: 34;
    top: 66px;
    left: 0;
    padding: 0 10px;
    background-color: #ffffff;
    width: 100%;
  }
  .tab_box {
    position: relative;
    .tab_box_item {
      margin: 76px 0 0 0;
      .stepItem_title {
        font-size: 14px;
        color: #333;
        width: 110%;
        height: 36px;
        line-height: 36px;
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
