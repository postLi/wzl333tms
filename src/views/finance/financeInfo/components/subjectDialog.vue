<template>
  <el-dialog
    :title="isTitle"
    :visible.sync="isShow"
    width="30%"
    center
    @click="closeMe" :close-on-click-modal="false" :before-close="closeMe" class="sub_dialog">
    <el-form status-icon size="mini" ref="ruleForm" :model="form" class="sub_form" :rules="rules">
      <div v-if="isDoAddEnd">
        <el-form-item label="科目代码" class="sub_el_form_item">
          <!--<el-tag>科目代码1</el-tag>-->
          <span>1000</span>
        </el-form-item>
        <el-form-item label="上级科目" class="sub_el_form_item">
          <!--<el-tag>科目代码1</el-tag>-->
          <span>2000</span>
        </el-form-item>
        <el-form-item label="科目代码">
          <el-tag>
            2000

          </el-tag>
          <el-input v-model="form.name">
            <!--<template slot="append">-->
            <!--<el-input v-model="form.name">-->
            <!--</el-input>-->
            <!--</template>-->
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
      isDoAddEnd: {
        type: Boolean,
        default: false
      },
      isDoExport: {
        type: Boolean,
        default: false
      },
    },
    watch: {
      isDoAddEnd(newVal, oldVal) {
        if (this.isDoAddEnd) {
          this.isTitle = '增加下级'
        }
        else if (this.isDoExport) {
          this.isTitle = '导入模板'
        }
        else {
          this.isTitle = '增加一级'
        }
        console.log(this.isDoAddEnd,'isDoAddEnd')
      },
      isDoExport(newVal, oldVal) {
        if (this.isDoAddEnd) {
          this.isTitle = '增加下级'
        }
        else if (this.isDoExport) {
          this.isTitle = '导入模板'
        }
        else {
          this.isTitle = '增加一级'
        }
        console.log(this.isDoExport,'isDoExport')
      }
    },
    data() {
      return {
        isTitle: '增加一级',
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
  .sub_dialog {

    .el-dialog {
      margin-top: 30vh !important;
      width: 20% !important;
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
