<template>
  <el-dialog
    :title="isTitle"
    :visible.sync="isShow"
    width="30%"
    center
    @click="closeMe" :close-on-click-modal="false" :before-close="closeMe" class="sub_dialog" v-loading="loading">
    <el-form size="mini" ref="ruleForm" :model="form" class="sub_form" :rules="rules" v-if="isAddLE">
      <div v-if="isDoAddEnd">
        <el-form-item label="科目代码" class="sub_el_form_item">
          <span>1000</span>
        </el-form-item>
        <el-form-item label="上级科目" class="sub_el_form_item">
          <span>2000</span>
        </el-form-item>
        <el-form-item label="科目代码">
          <el-tag>
            2000

          </el-tag>
          <el-input v-model="form.name">
          </el-input>
        </el-form-item>
      </div>
      <el-form-item label="科目代码" prop="name" v-if="!isDoAddEnd">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="科目名称" prop="name" class="">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <span class="sub_span">注：科目代码规则：1.最多可创建4级科目，一级科目代码数值：4位，二级6位，三级6位，四级8位。</span>
    </el-form>

    <el-form size="mini" ref="ruleForm" :model="form" class="sub_form direct" :rules="rules"
             label-width="80px" v-else-if="isDirect" width="100%" :show-message="checkShowMessage">
      <el-form-item label="核销方向" prop="verificationWay">
        <el-input v-model.trim="form.verificationWay" placeholder="请输入核销方向如：工商银行" :minlength="1"
                  :maxlength="35"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" placeholder="最多输入50个字符。" :maxlength='50'></el-input>
      </el-form-item>
    </el-form>

    <el-form size="mini" ref="ruleForm" :model="form" class="sub_form" :rules="rules" v-else>
      <el-form-item label="核销科目">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="一级科目">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="二级科目" class="">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="三级科目" class="">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="四级科目" class="">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">

    <el-button size="mini" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button size="mini" @click="closeMe">取 消</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {postAddFinFicationl, putExtFinFicationl} from '@/api/finance/finanInfo'
  import {mapGetters} from 'vuex'
  import {objectMerge2} from '@/utils/index'
  import {REGEX} from '@/utils/validate'

  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      isDoAddEnd: {
        type: Boolean,
        default: false
      },
      isDoExport: {
        type: Boolean,
        default: false
      },
      isSubClose: {
        type: Boolean,
        default: false
      },
      isDoAddSub: {
        type: Boolean,
        default: false
      },
      isDoEdit: {
        type: Boolean,
        default: false
      },
      info: {
        type: [Array, Object],
        default: () => {
        }
      },
    },
    watch: {
      info: {
        handler() {
          this.comWatch(this.info)
        },
        immediate: true
      },
      isDoAddEnd: {
        handler() {
          this.comWatch()
        },
        immediate: true
      },
      isDoExport: {
        handler() {
          this.comWatch()
        },
        immediate: true
      },
      isSubClose: {
        handler() {
          this.comWatch()
        },
        immediate: true
      },
      isDoAddSub: {
        // handler() {
        //   this.comWatch()
        // },
        // immediate: true
      },
      isDoEdit: {
        // handler() {
        //   // this.comWatch()
        // },
        // immediate: true
      },
    },
    data() {
      return {
        checkShowMessage: false,
        loading: true,
        isTitle: '增加一级',
        form: {
          name: '',
          verificationWay: '',//核销方向
          remark: '',//核销方向
        },
        rules: {
          name: [
            {required: true}
          ],
          verificationWay: [
            {required: true, message: '核销方向不能为空~'}
          ]
        },
        isAddLE: false,
        isDirect: false,
        // subjectDirection: false
      };
    },
    mounted() {
    },
    methods: {
      comWatch(item) {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
        this.checkShowMessage = false
        this.isAddLE = false
        this.isDirect = false
        if (this.isDoAddEnd) {
          this.isTitle = '增加下级'
          this.isAddLE = true
        }
        else if (this.isDoExport) {
          this.isTitle = '导入模板'
        }
        else if (this.isSubClose) {
          this.isTitle = '修改'
        }
        else if (this.isDoAddSub) {
          this.isTitle = '新增'
          this.isDirect = true
          this.reset()
        }
        else if (this.isDoEdit) {
          this.isTitle = '修改'
          this.isDirect = true
          this.form.verificationWay = item.verificationWay
          this.form.remark = item.remark
          // console.log(this.form,'修改')
          // this.reset()
          // console.log(this.info,'selectInfo')
        }
        else {
          this.isTitle = '增加一级'
          this.isAddLE = true
        }


      },
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          // this.checkShowMessage = true
          if (valid ) {
            let promiseObj
            this.loading = true
            delete this.form.name

            const data = objectMerge2({}, this.form)
            if (this.isDoAddSub) {
              promiseObj = postAddFinFicationl(data)
            }
            else if (this.isDoEdit) {
              // debugger
              promiseObj = putExtFinFicationl(this.info.id, data)
            }
            promiseObj.then(res => {
              this.$emit('success')
              this.$message.success('保存成功')
              this.closeMe()
              this.reset()
              this.loading = false
            }).catch(err => {
              this.loading = false
              this._handlerCatchMsg(err)
            })
          } else {
            return false
          }
        })

      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields()
      // },
      reset() {
        this.form = {
          verificationWay: '',//核销方向
          remark: ''//核销方向
        }
      },
      closeMe(done) {

        // this.resetForm('ruleForm')
        this.$emit('update:isShow', false)
        if (typeof done === 'function') {
          done()
        }
      }
    }
  }
</script>

<style lang="scss">
  .sub_dialog {

    .el-dialog {
      margin-top: 30vh !important;
      width: 20% !important;
    }
    .el-dialog__header {
      border-bottom: 1px solid #e6e6e6;
      .el-dialog__title {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .el-dialog__body {
      padding: 10px 20px 30px;
      .el-form {
        .el-form-item {
          display: flex;
        }
        .sub_el_form_item {
          display: inline-flex;

        }
        .el-form-item__content {
          display: flex;
          .el-input__inner {
            height: 32px;
            line-height: 32px;
            border-radius: 0;
          }
          .el-input.el-input--mini.is-disabled {
            .el-input__inner {
              background-color: #fff;
              border-color: #dcdfe6;
              color: #606266;
            }
          }
        }
        .sub_el_form_item:nth-of-type(2) {
          margin-left: 30px;
        }
        .sub_span {
          font-size: 14px;
          letter-spacing: 1px;
          color: #606266;
        }
      }
      .direct {
        .el-form-item__content {
          margin-left: 0 !important;
          .el-input__inner {
            width: 110%;
          }
          .el-textarea__inner {
            width: 116%;
          }
        }
      }

    }
    .el-dialog__footer {
      border-top: 1px solid #b6dfff;
      padding-bottom: 10px;
    }
  }
</style>
