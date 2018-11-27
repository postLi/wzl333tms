<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" v-loading="loading" class="trackInfoPop">
    <template slot="content">
      <div class="info_box_transfer" >
        <el-row class="stepItem_title">
          <el-col :span="5" class="tracktype">类型</el-col>
          <el-col :span="4">操作时间</el-col>
          <el-col :span="4">操作网点</el-col>
          <el-col :span="3">操作人</el-col>
          <el-col :span="8">操作信息</el-col>
        </el-row>
        <div class="stepinfo">
          <el-steps direction="vertical">
            <el-step @mouseover.native="setThisActive" @mouseout.native="offThisActive" :class="{'firstactive': index===0}" v-for="(item, index) in trackDetail" :key="index">
              <span slot="icon" class="location"></span>
              <template slot="description">
                <el-row class="stepItem">
                  <el-col :span="5">
                    <span class="typebox">{{item.trackNode}}</span>
                    <template v-if="item.trackType===1">
                      <span title="编辑" @click="editItem(item)" class="modifybtn"></span>
                      <span title="删除" @click="deleteTrack(item)" class="deletebtn"></span>
                    </template>
                  </el-col>
                  <el-col :span="4" class="">
                    <p>{{item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
                  </el-col>
                  <el-col :span="3" class="">
                    <p>{{item.orgName}}</p>
                  </el-col>
                  <el-col :span="4">
                    <p>
                      <i class="track-human" v-if="item.addStatus===1"></i>
                      <i class="icon_blank" v-else></i> {{item.trackDetailed}}
                    </p>
                  </el-col>
                  <el-col :span="8">
                    <p>{{item.trackInfo}}</p>
                  </el-col>
                </el-row>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>
    </template>
    <div slot="footer" class="stepinfo-footer stepFrom">
      <el-form inline :model="formModel" :rules="ruleForm" ref="formModel">
        <el-form-item label="类型" prop="trackNode">
          <el-input :maxlength="10" v-model="formModel.trackNode" placeholder="类型" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="createTime">
          <el-date-picker v-model="formModel.createTime" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="trackInfo">
          <el-input :maxlength="250" v-model="formModel.trackInfo" placeholder="操作信息" size="mini"></el-input>
        </el-form-item>
        <el-form-item class="tracksavebtn">
          <el-button type="primary" @click="submitForm('formModel')" size="mini">保 存</el-button>
          <transition name="el-zoom-in-center">
            <el-button v-if="isModify" type="warning" @click="resetForm()" size="mini">取 消</el-button>
          </transition>
        </el-form-item>
      </el-form>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import popRight from '@/components/PopRight/index'
import order from '@/api/operation/orderManage'
// import { getTransferTrack, deleteTrack, postAddTrack, putUpdateTrack } from '@/api/operation/track'
import { mapGetters } from 'vuex'
import { getSystemTime } from '@/api/common'
import { objectMerge2, parseTime, closest } from '@/utils/index'
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
      type: [Number, String]
    },
    shipId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      popTitle: '在途跟踪',
      loading: true,
      isModify: false,
      infoId: {},
      trackDetail: [],
      formModel: {},
      ruleForm: {
        trackNode: [{ required: true, trigger: 'blur', message: '不能为空' }],
        createTime: [{ required: true, trigger: 'blur', message: '不能为空' }],
        trackInfo: [{ required: true, trigger: 'blur', message: '不能为空' }]
      },
      isShowBtn: true,
      isFootEdit: true,
      formModel: {
        createTime: '',
        orgid: '',
        shipId: '',
        trackDetailed: '',
        trackInfo: '',
        trackNode: '',
        trackType: 1
      }
    }
  },
  watch: {
    id() {},
    shipId (newVal) {
      if (newVal) {
        console.log('shipId', newVal)
         this.getDetail()
        this.getSystemTime()
      }
    },
    // info(newVal) {
    //   if (newVal) {
    //     console.log('info', newVal)
    //     this.getDetail()
    //     this.getSystemTime()
    //   }
    // },
    popVisible(newVal, oldVal) {
      if (this.popVisible) {
        this.getDetail()
        this.getSystemTime()
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
      const transferId = this.id
      const shipId = this.shipId
      order.getShipTrackinfo(shipId).then(data => {
        this.trackDetail = data
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    closeMe(done) {
      this.$emit('update:popVisible', false)
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
        order.deleteTrackinfo(item.id).then(data => {
          this.$message({ type: 'success', message: '删除成功' })
          this.getDetail()
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
      })
    },
    editItem(item) {
      this.formModel = objectMerge2({}, item)
      this.isModify = true
    },
    editTrack() {
      this.formModel.createTime = parseTime(this.formModel.createTime, '{y}-{m}-{d} {h}:{i}:{s}')
      console.log(this.formModel.createTime)
      order.putTrackinfo(this.formModel).then(data => {
        this.$message({ type: 'success', message: '修改成功' })
        this.getDetail()
        this.resetForm()
      })
      .catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    addTrack() {
      const data = objectMerge2({}, this.formModel)
      data.createTime = parseTime(+new Date(data.createTime), '{y}-{m}-{d} {h}:{i}:{s}')
      data.shipId = this.shipId
      data.orgid = this.otherinfo.orgid
      console.log(data.createTime)
      order.postTrackinfo(data).then(data => {
        this.$message({ type: 'success', message: '添加成功' })
        this.getDetail()
        this.resetForm()
      })
      .catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    getSystemTime() { // 获取系统时间
      if (!this.formModel.id) {
        getSystemTime().then(data => {
            // this.formModel.createTime = Date.parse(new Date(data.trim()))
          this.formModel.createTime = new Date(data.trim())
          console.log('系统：', this.formModel.createTime)
        })
          .catch(err => {
            this._handlerCatchMsg(err)
          })
      }
    },
    resetForm() {
      this.$nextTick(() => {
        this.isModify = false
        this.$refs['formModel'].resetFields()
        this.formModel = this.$options.data().formModel
        this.getSystemTime()
      })
    },
    // 取消高亮样式
    offThisActive(e) {
      const p = closest(e.target, '.el-step')
      if (p) {
        p.classList.remove('trackactive')
      }
    },
    // 设置高亮样式
    setThisActive(e) {
      const p = closest(e.target, '.el-step')
      if (p) {
        p.classList.add('trackactive')
      }
    }
  }
}

</script>
<style lang="scss">
.icon_blank {
  background-size: 24px;
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.trackInfoPop {
  width: 1000px !important;
  .el-tabs{
    height: 100%;
    .el-tabs__content{
      height: calc(100%);
      .el-tab-pane{
        height: calc(100% - 90px);
      }
    }
  }
}

.editInfoPop_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.info_box_transfer {
  padding: 10px 10px 0 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* 覆盖ele样式 */
  .el-form--inline .el-form-item {
    margin-bottom: 0;
  }
  .el-step.is-vertical .el-step__head {
    width: 18px;
    position: relative;
    top: 0px;
  }
  .el-step.is-vertical .el-step__line {
    left: 8px;
  }
  .el-step__icon.is-text {
    border-color: transparent;
    border: 0;
    width: 18px;
    height: 18px;
  }
  .el-steps--vertical {
    height: auto;
  }
  .el-step__main {
    padding-bottom: 10px;
  }
  .el-step__description {
    padding-right: 0;
    font-size: 14px;
    color: #333;
  }

  .textcenter {
    text-align: center;
  }
  .typebox {
    background: url("../../../../../assets/png/track-bg.png") no-repeat;
    width: 118px;
    height: 24px;
    padding-left: 16px;
    text-align: center;
    color: #333;
    display: inline-block;
    line-height: 24px;
  }
  .location {
    background: url("../../../../../assets/png/unactive-icon.png") no-repeat;
    width: 18px;
    height: 18px;
    display: inline-block;
  }
  .modifybtn,
  .deletebtn {
    display: inline-block;
    display: none;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 3px;
    background: url("../../../../../assets/png/delete-icon.png") no-repeat;

    &:hover {}
  }
  /* 鼠标划过样式 */
  .trackactive{
    .modifybtn, .deletebtn{
      display: inline-block;
    }
  }
  .trackactive,.firstactive {
    .typebox {
      background: url("../../../../../assets/png/track-active.png") no-repeat;
      color: #fff;
    }
    .location {
      background: url("../../../../../assets/png/active-point.png") no-repeat;
    }
    .el-step__line {
      background-color: #3e9ff1;
    }
  }
  .modifybtn {
    margin-left: 10px;
    background: url("../../../../../assets/png/edit-icon.png") no-repeat;
    margin-right: 8px;
  }
  .steptitle {
    font-size: 14px;
    color: #333;
    height: 34px;
  }
  .stepItem_title {
    color: #333;
    margin-top: 10px;
    padding-left: 28px;
    height: 34px;
    .el-col {
      text-align: left;
    }
    .tracktype {
      text-align: left;
      text-indent: 20px;
    }
  }

  .stepItem {
    /* 解决当出现空值项造成高度为0，使得样式坍塌的异常 */
    .el-col>p {
      min-width: 1px;
      min-height: 1px;
    }
  }
  .stepinfo {
    flex: 1;
    overflow: auto;
  }
  .stepinfo-footer {
    border-top: 1px solid #d8d8d8;
    height: 70px;
    padding-top: 30px;
  }
}

.stepFrom {
  background-color:#f2f2f2;
  box-shadow:-1px -1px 10px #bbb;
  text-align:left;
  padding:0 10px;
  .el-form-item__content{
    vertical-align:middle;
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
