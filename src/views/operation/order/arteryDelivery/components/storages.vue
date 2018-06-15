<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="storagesPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <div class="batchTypeNo">
        批次：GX123456
      </div>
      <div class="storagesInfoPop_content">
        <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="批次详情" name="first">
            批次详情
          </el-tab-pane>
          <el-tab-pane label="批次跟踪" name="second">
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
          </el-tab-pane>
          <el-tab-pane label="运输合同" name="third">运输合同</el-tab-pane>
        </el-tabs>
      </div>

    </template>
    <div slot="footer" class="dialog-footer stepFrom" v-if="isFootEdit">
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
  import { getLoadDetail, deleteTrack, postAddTrack, putUpdateTrack } from '@/api/operation/track'
  import { getAllOrgInfo } from '@/api/company/employeeManage'
    export default {
      data () {
        return {
          popTitle:'到货入库',
          activeName2: 'first',
          trackDetail: [],
          ruleForm: {},
          loading:false,
          isFootEdit: true,
          propsId:'',
          formModel: {
            addStatus: 1,
            id: 0,
            loadId: 0,
            loadStatus: '',
            operatorInfo: '',
            operatorOrgid: 1,
            operatorTime: '',
            operatorUserid: 0
            // transferId: 0
          }
        }
      },
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
        isModify: {
          type: Boolean,
          default: false
        },
        info: {
          type: Object,
          default: () => {}
        },
        issender: {
          type: Boolean,
          dafault: false
        },
        id: {
          type: [String,Number],
          dafault: false
        }
      },
      watch: {
        id(newVal){
          // this.propsId = this.id
          // console.log(this.id)
        },
        info(newVal){
          this.propsId = this.info.id
          console.log(this.info)
          this.getDetail()
        },
        popVisible(newVal, oldVal) {
          if (!this.inited) {
            this.inited = true
            this.initInfo()
          }
        },
      },
      mounted() {
        this.propsId = this.info.id
        // this.getDetail()
        if (this.popVisible) {
          this.getDetail()
        }
      },
      methods: {
        getDetail() {
          let id = this.propsId
          console.log(id)
          return getLoadDetail(id).then(data => {
            this.trackDetail = Object.assign([], data)
          })
        },
        handleClick(tab, event) {
          if (this.activeName === 'second') {
            this.isFootEdit = true
          } else {
            this.isFootEdit = false
          }
        },
        initInfo () {
          this.loading = false
        },
        getOrgid (id) {
          // this.form.orgid = id
        },
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
        editItem(item) {
          console.log(item)
          this.resetForm()
          this.formModel = Object.assign({}, item)
        },
        editTrack() {
          console.log('修改')
          this.formModel.transferId = 0
          return putUpdateTrack(this.formModel).then(data => {
            this.$message({ type: 'success', message: '修改成功' })
            this.getDetail()
            this.resetForm()
          })
        },
        addTrack() {
          console.log('添加')
          this.formModel.loadId = this.id
          return postAddTrack(this.formModel).then(data => {
            this.$message({ type: 'success', message: '添加成功' })
            this.getDetail()
            this.resetForm()
          })
        },
        handleClick() {
          if (this.activeName === 'second') {
            this.isFootEdit = true
          } else {
            this.isFootEdit = false
          }
        },
        resetForm() {
          this.$refs['formModel'].resetFields()
        }
      }
    }
</script>

<style scoped lang="scss">
.storagesPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 900px;
  max-width:  900px;

}
.batchTypeNo{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background: rgb(223,233,245);
  padding-left: 15px;
}
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

.storagesInfoPop_content {
  padding: 0 10px 0 10px;
  .tab_descript {}
  .info {
    background-color: rgb(238, 241, 246);
    margin-top: -30px;
    padding: 10px;
  }
  .info p {
    font-weight: 900;
    font-size: 16px;
    margin-bottom: 0px;
  }
  .info-content {
    margin-top: 10px;
    padding: 20px 10px 10px;
    background-color: #FFF;
    border: 2px dotted rgb(238, 241, 246);
  }
  .itemRecharge {
    background-color: rgb(238, 241, 246);
    padding: 10px;
  }
  .tab_box {
    padding-left: 10px;
    display: flex;
    flex-direction: row;
  .stepItem_title {
    margin: 10px 0 10px 10px;
    font-size: 14px;
    width: 165%;
  }
    .stepItem {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
      width: 160%;
      p {
        word-wrap: break-word;
        word-break: normal;
        display: block;
      }
    }
  }
}

</style>
