<template>
   <el-dialog :title='popTitle' @close="closeMe" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="wzl_settleLogSave">
    <el-form :model="form" :rules="rules" ref="ruleForm"  :label-width="formLabelWidth" class="demo-ruleForm" :inline="true" label-position="right" size="mini">
      <el-form-item label="名称：" prop="queryKey" >
        <input :maxlength="20" v-model.trim="form.queryKey" placeholder="请定义名称"/>
        <!-- <input/> -->
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import PopFrame from '@/components/PopFrame/index'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
// import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
// import { exportWithIframe } from '@/utils'
import { postcreaterQueryCriteriaLog } from '@/api/common'
import { objectMerge2 } from '@/utils/index'
export default {
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    isShow: {
      get() {
        return this.popVisible
      },
      set() {

      }
    }
  },
  components: {
    PopFrame,
    SelectTree,
    SelectType
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    dotInfo: [Object, Array],
    searchQuery: [Object, Array],
    isDepMain: {
      type: Boolean,
      default: false
    },
    createrId: [Number, String],
    isModify: {
      type: Boolean,
      default: false
    },
    isAccept: {
      type: Boolean,
      default: false
    },
    proptitle: String,
    searchObj: {
      type: [Array, Object],
      default: () => {}
    }
  },

  data() {
    return {
      form: {
        userId: '',
        orgId: '',
        menuCode: '',
        queryKey: '',
        queryContent: ''
      },
      searchCreatTime: +new Date(),
      pickOption2: '',
      formLabelWidth: '75px',
      tooltip: false,
      rules: {

      },
      queryKey: '',
      checked1: true,
      popTitle: '自定义标签',
      loading: false,
      type: ''
    }
  },

  mounted() {
  },
  watch: {
    dotInfo(newVal) {
      if (this.isModify) {
        // this.popTitle = '回单回收'
        // this.form.userId = this.otherinfo.userId
        this.form.userId = this.otherinfo.userId
        this.form.orgId = this.otherinfo.orgid
        this.form.menuCode = this.$route.meta.code
        console.log(this.otherinfo.userId)
      }
    },
    // searchQuery(newVal) {
    //   this.form.pageType = this.searchQuery.vo.pageType
    //   console.log(this.form.pageType);
    // },
    orgid(newVal) {
      this.form.orgid = newVal
    },

    createrId(newVal) {
    },
    searchObj: {
      handler (cval, oval) {
        if (cval) {
          this.form.queryContent = JSON.stringify(cval)
          this.form.orgId = this.otherinfo.orgid
          this.form.userId = this.otherinfo.userId
          this.form.menuCode = this.$route.meta.code
        }
        console.log('addSave_cval', cval, this.form)
      },
      deep: true
    }
  },
  methods: {
    reset() {
      this.$refs['ruleForm'].resetFields()
    },
    closeMe(done) {
      this.$emit('close')
      this.reset()
      if (typeof done === 'function') {
        done()
      }
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = objectMerge2({}, this.form)
          console.log('addSave_data',data)
          const promiseObj = postcreaterQueryCriteriaLog(data)
          promiseObj.then(res => {
            this.$message({
              message: '保存成功~',
              type: 'success'
            })
            this.closeMe()
            this.$emit('success')
          }).catch(res => {
            this.$message.warning(res.text)
            this.closeMe()
          })
        } else {
          return false
        }
      })
    }
  }
}

</script>

<style lang="scss">
.wzl_settleLogSave{
  .el-dialog{
    max-width: 400px;
    min-width: 200px;
    margin-top: 29vh !important;
  }
  .el-dialog__body{
    text-align: center;
  }
  .transfer-footer{
    line-height: 20px;
    color: #666;
    font-size: 12px;
    padding: 10px 20px 8px;
  }
  .el-dialog__header{
    padding: 9px 20px 6px;
    font-size:14px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }
  .el-dialog__title{
    font-size: 15px;
    font-weight: bold;
    
    // color:#fff;
  }
  .el-button{
    padding: 6px 25px;
    // float:right;
  }
  .el-dialog__headerbtn{
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 18px;
    
  }
  .el-dialog__footer{
    text-align: center;
  }
  .el-form--inline .el-form-item{
    width:300px;
    // margin-bottom: none;
  }
  .el-form-item.el-form-item--mini{
    margin-bottom: 0px;
  }
  .el-form-item__content > input, .nativeinput{
    border: 1px solid #dcdfe6 !important;
    width:224px;
  }
}
</style>
