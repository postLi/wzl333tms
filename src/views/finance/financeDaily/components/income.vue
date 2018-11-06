<template>
  <el-dialog :title="dialogTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class=" incomeDialog">
    <h4 class="income_title">{{formModelTitle}}</h4>
    <el-form ref="formModel" :model="formModel" :rules="rules" :inline="true" label-width="90px">
      <div class="income_item">
        <el-form-item label="记账网点">
          <SelectTree v-model="formModel.orgId" :orgid="otherinfo.orgid" :size="btnsize"></SelectTree>
        </el-form-item>
        <el-form-item label="凭证编号">
          <el-input v-model="formModel.user" placeholder="凭证编号" :size="btnsize"></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </div>
      <div class="income_item_line"></div>
      <div class="income_item">
        <el-form-item label="记账方向">
          <el-select v-model="formModel.directions" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in directions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="凭证日期">
          <el-date-picker v-model="formModel.date" type="date" :size="btnsize" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="去向">
          <el-select v-model="formModel.ways" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in ways" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="一级科目">
          <el-select v-model="formModel.firstSubjects" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in firstSubjects" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级科目">
          <el-select v-model="formModel.secondSubjects" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in secondSubjects" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级科目">
          <el-select v-model="formModel.thirdSubjects" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in thirdSubjects" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="四级科目">
          <el-select v-model="formModel.forthSubjects" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in forthSubjects" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="凭证类别">
          <el-select v-model="formModel.certificationType" filterable placeholder="请选择" :size="btnsize">
            <el-option v-for="item in certificationType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发生金额">
          <el-input v-model="formModel.user" placeholder="审批人" :size="btnsize"></el-input>
        </el-form-item>
      </div>
      <div class="income_item_line"></div>
      <div class="income_item">
        <el-form-item label="收据号码">
          <el-input v-model="formModel.user" placeholder="手工凭证" :size="btnsize"></el-input>
        </el-form-item>
        <el-form-item label="发票号码">
          <el-input v-model="formModel.user" placeholder="手工凭证" :size="btnsize"></el-input>
        </el-form-item>
        <el-form-item label="支票号码">
          <el-input v-model="formModel.user" placeholder="审批人" :size="btnsize"></el-input>
        </el-form-item>
      </div>
      <div class="income_item">
        <el-form-item label="手工凭证">
          <el-input v-model="formModel.user" placeholder="手工凭证" :size="btnsize"></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="formModel.user" placeholder="摘要" :size="btnsize"></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </div>
      <div class="income_item_line"></div>
    </el-form>
    <span slot="footer">
          <el-button type="primary" @click="submitForm('formModel')" plain icon="el-icon-document">保存</el-button>
          <el-button type="success" @click="submitForm('formModel', 'print')" plain icon="el-icon-printer">保存并打印</el-button>
          <el-button type="warning" @click="setting" plain icon="el-icon-setting">设置财务科目</el-button>
          <el-button type="danger" @click="closeMe" plain icon="el-icon-circle-close">取消</el-button>
        </span>
  </el-dialog>
</template>
<script>
import SelectTree from '@/components/selectTree/index'
export default {
  components: {
    SelectTree
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    popVisible: {
      handler(cval, oval) {
        if (cval) {
          this.isShow = true
        }
      },
      immediate: true
    }
  },
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    }
  },
  data() {
    return {
      // 记账方向
      directions: [],
      firstSubjects: [],
      secondSubjects: [],
      thirdSubjects: [],
      forthSubjects: [],
      certificationType: [],
      ways: [],
      btnsize: 'mini',
      dialogTitle: '记账凭证',
      loading: false,
      formModel: {},
      rules: {},
      formModelTitle: '现金记账凭证【出纳】'
    }
  },
  methods: {
    submitForm(formName, type) {
      this.$refs['formName'].validate(valid => {
        if (valid) {
          if (type) {
            this.$message.warning('暂无此功能~')
          } else {
            this.$message.warning('暂无此功能~')
          }
        }
      })
    },
    setting() {
      this.$router.push({path:'/finance/financeInfo/subjectInfo'})
    },
    closeMe() {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
<style lang="scss">
.incomeDialog {
  min-width: 640px;
  .el-dialog__header {
    text-align: center;
    background-color: #e6e6e6;
  }
  .el-dialog__body {
    padding: 20px 30px 10px;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .income_title {
    text-align: center;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .income_item_line {
    border-bottom: 1px dashed #999;
    padding: 10px 0 0 0;
    margin-bottom: 10px;
  }
  .income_item {
    display: flex;
    flex-direction: row;
    .el-form-item {
      display: flex;
      flex-direction: row;
      margin-bottom: 0px;
      width: 100%;
      .el-form-item__content {
        width: 100%;
      }
      .el-select,
      .el-input {
        width: 100%;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 100%;
      }
      .el-input__inner {
        width: 100%;
      }
    }
  }
}

</style>
