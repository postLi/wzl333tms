<template>
  <el-dialog
    :title="isTitle"
    :visible.sync="isPopVisible"
    width="25%"
    center
    @click="closeMe"
    :close-on-click-modal="false"
    :before-close="closeMe"
    class="dialog_direct"
    v-loading="loading"
  >
    <!--<span>需要注意的是内容是默认不居中的</span>-->
    <el-form size="mini" ref="ruleForm" :model="form" class="" :rules="rules" label-width="80px">
      <el-form-item label="核销方向" prop="verificationWay">
        <el-input v-model.trim="form.verificationWay" placeholder="请输入核销方向如:工商银行" :maxlength="35" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" placeholder="最多输入50个字符。" :maxlength="50" clearable></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {objectMerge2} from '@/utils/index'
  import {
    postAddFinFicationl,
    putExtFinFicationl
  } from '@/api/finance/finanInfo'
  import {REGEX} from '@/utils/validate'

  export default {
    data() {
      const validateNum = (rule, value, callback) => {
        if (/\s+/g.test(value)) {
          // this.$message.error('不能输入空格~')
          console.log(value, 'value');
          // value = value.replace('/\\s/g','')
          callback(new Error('不能输入空格~'))

        } else {
          callback()
          console.log(value, 'value2222');
        }
      }
      return {
        loading: true,
        isTitle: '新增',
        form: {
          verificationWay: '',
          remark: ''
        },
        rules: {
          verificationWay: [
            {required: true, message: '请输入核销方向~'}
            // {validator: validateNum}

          ]
        }
      };
    },
    computed: {
      isPopVisible: {
        get() {
          return this.popVisible
        },
        set() {

        }
      }
    },
    props: {
      popVisible: {
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
      isDoEdit: {
        handler(n, o) {
          if (n) {
            this.isTitle = '修改'
          } else {
            this.isTitle = '新增'
          }
        },
        immediate: true
      },
      info: {
        handler(n, o) {
          if (this.isDoEdit) {
            this.isTitle = '修改'
            this.form.verificationWay = this.info.verificationWay
            this.form.remark = this.info.remark
            // console.log(this.info, 'info')
          } else {
            this.isTitle = '新增'
            this.form = {}
          }
        },
        immediate: true
      }
    },

    methods: {
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.loading = true
            let promiseObj
            const data = objectMerge2({}, this.form)
            if (/\s/.test(data.verificationWay)) {
            // if (/\s+/g.test(data.verificationWay)) {
              // console.log(/\s+/g.test(data.verificationWay), 'data.verificationWay');
              this.$message.warning('不能输入空格~')
              this.loading = false
              return false
            }
            if (data.verificationWay === '') {
              this.$message.warning('请输入核销方向~')
              this.loading = false
              return false
            }
            if (this.isDoEdit) {
              promiseObj = putExtFinFicationl(this.info.id, data)
            } else {
              promiseObj = postAddFinFicationl(data)
            }
            promiseObj.then(res => {
              this.$emit('success')
              this.$message.success('保存成功')
              this.closeMe()
              // this.reset()
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
      reset() {
        this.$refs['ruleForm'].resetFields()
      },
      closeMe(done) {
        this.reset()
        this.$emit('update:popVisible', false)
        this.$emit('close')
        if (typeof done === 'function') {
          done()
        }
      }
    },
  };
</script>
<style lang="scss">
  .dialog_direct {
    .el-dialog {
      margin-top: 30vh !important;
      .el-dialog__header {

      }
      .el-dialog__body {
        .el-form {
          .el-form-item {
            display: flex;
            .el-form-item__content {
              margin-left: 0 !important;
            }
            .el-textarea {
              .el-textarea__inner {
                width: 112%;
              }
            }
          }
        }
      }
      .el-dialog__footer {

      }
    }

  }
</style>
