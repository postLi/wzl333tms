<template>
  <el-dialog :title="dialogTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="receiptDialog">
    <el-form ref="formModel" :model="formModel" :rules="rules">
      <div class="receiptDialog_head">
        <div class="receiptDialog_head_item">
          <label>单据号</label>
          <el-input placeholder="请输入" :size="btnsize"></el-input>
        </div>
        <div class="receiptDialog_head_item">
          <label>发生时间</label>
          <el-input placeholder="请输入" :size="btnsize"></el-input>
        </div>
        <div class="receiptDialog_head_item">
          <label>经办人</label>
          <el-input placeholder="请输入" :size="btnsize"></el-input>
        </div>
      </div>
      <div class="receiptDialog_table">
	   <el-table
	    :data="tableData"
	    style="width: 100%; height:100%;"
	    height="100%"
	    stripe
	    show-summary
	    >
	    <el-table-column
	      prop="date"
	      label="序号"
	      width="120">
	      <template solt-scope="props">
	      	<span>{{props.$index}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column
	      prop="date"
	      label="费用项">
	    </el-table-column>
	    <el-table-column>
	      <el-table-column
	        prop="name"
	        label="千"
	        width="40">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="百"
	        width="40">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="十"
	        width="40">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="万"
	        width="40">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="千"
	        width="40">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="百"
	        width="40">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="十"
	        width="40">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="元"
	        width="40">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="角"
	        width="40">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="分"
	        width="40">
	      </el-table-column>
	    </el-table-column>
	  </el-table>
      </div>
     
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submitForm('formModel')" :size="btnsize" icon="
el-icon-tickets">保存</el-button>
      <el-button type="primary" @click="submitForm('formModel')" :size="btnsize" icon="el-icon-printer" disabled>保存并打印</el-button>
      <el-button type="danger" @click="closeMe" :size="btnsize" icon="el-icon-circle-close-outline">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
export default {
  data() {
    const pretimeIdentifier = (rule, value, callback) => {
      if (value < 0 || value > 12) {
        callback(new Error('请输入0-12的数字'))
      } else {
        callback()
      }
    }
    return {
      formModel: {},
      loading: true,
      rules: {},
      btnsize: 'mini',
      dialogTitle: '结 算 收 款 单',
      tableData: [
      {
      	data: '回扣',
      	name: '9'
      },
      {
      	data: '回扣',
      	name: '9'
      },
      {
      	data: '回扣',
      	name: '9'
      },
      {
      	data: '回扣',
      	name: '9'
      }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    }
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: {}
    }
  },
  watch: {
    popVisible() {
      if (this.popVisible) {
        console.log(this.popVisible)
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    info(newVal) {
      if (newVal) {
        console.log(this.info)
        return this.info
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      this.loading = false
      console.log('info', this.info)
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {}
      })
    }
  }
}

</script>
<style lang="scss">
$borderColor: #999;
.receiptDialog {
  .el-dialog {
    width: 70%;
    min-width: 900px;
    max-width: 1200px;
    .el-dialog__header {
      text-align: center;
      .el-dialog__title {
        font-size: 24px;
        padding: 0 10px;
        border-bottom: 2px solid $borderColor;
      }
    }
    .el-dialog__body{
    	padding: 10px;
    }
  }
  .receiptDialog_head {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    .receiptDialog_head_item {
      display: flex;
      flex-direction: row;
      label {
        padding: 10px 10px 0 0;
        width: 120px;
      text-align: right;

      }
      .el-input__inner {
      	border-radius: 0;
        border:none;
        border-bottom:1px solid $borderColor;
        padding:0 10px;
        width:auto;
      }
    }
  }
  .receiptDialog_table{
  	margin-top: 10px;
  	width:100%;
  	padding:0 30px;
  	height:200px;
  	.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed, .el-table--border, .el-table--group, .el-table td, .el-table th.is-leaf{
  		border-color:$borderColor;
  	}
  }
}

</style>
