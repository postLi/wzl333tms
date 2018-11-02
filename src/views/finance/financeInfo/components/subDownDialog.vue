<template>
  <el-dialog
    :title="isTitle"
    :visible.sync="isShow"
    width="50%"
    center
    @click="closeMe" :close-on-click-modal="false" :before-close="closeMe" class="sub_down_dialog">
    <el-form status-icon size="mini" ref="ruleForm" :model="form" class="sub_form" :rules="rules">
      <el-form-item label="科目代码" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="科目名称" prop="name" class="">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <span class="sub_span">注：1.导入前，需要先下载标准模板。按照标准模板填写后再上传。</span>
      <span class="sub_span">2.每次最多能导入1000条，超过1000条，只导入前1000条。</span>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="closeMe">取 消</el-button>
    <el-button size="mini" type="primary" @click="submitForm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },

    },
    watch: {
    },
    data() {
      return {
        isTitle: '导入模板',
        form: {
          name: '',
        },
        rules: {
          name: [
            {required: true}
          ]
        }
        // isShow: false
      };
    },
    mounted() {
      // console.log(this.isShow, 'isShow')
    },
    methods: {
      submitForm() {
        this.closeMe()
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
  .sub_down_dialog {

    .el-dialog {
      margin-top: 30vh !important;
      /*width: 20% !important;*/
    }
    .el-dialog__header {

    }
    .el-dialog__body {
      padding: 0px 20px 30px;
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
        }
        .sub_el_form_item:nth-of-type(2) {
          margin-left: 30px;
        }
        .sub_span {
          font-size: 14px;
          letter-spacing: 1px;
        }
      }

    }
    .el-dialog__footer {

    }
  }
</style>
