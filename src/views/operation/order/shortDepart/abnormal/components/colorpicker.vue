<template>
	<el-dialog :title="popTitle" :visible.sync="isShow" :close-on-click-modal="false"
	 :before-close="closeMe" class="setupTablePop">
	 <el-form ref="ruleForm" :model="formColor" :rules="rules" class="colorpickerForm">
	 	<el-form-item class="colorpickerItem" prop="pretime">
	 		<b>超过：</b><el-input v-model="formColor.pretime"></el-input><b>小时的库存颜色</b>
	 		<el-color-picker v-model.number="formColor.pretimepicker" :predefine="predefineColors"></el-color-picker>
	 	</el-form-item>
	 	<el-form-item class="colorpickerItem" prop="timing">
	 		<b>超过：</b><el-input v-model="formColor.timing"></el-input><b>小时的库存颜色</b>
	 		<el-color-picker v-model.number="formColor.timingpicker" :predefine="predefineColors"></el-color-picker>
	 	</el-form-item>
	 	<el-form-item class="colorpickerItem" prop="outtime">
	 		<b>超过：</b><el-input v-model="formColor.outtime"></el-input><b>小时的库存颜色</b>
	 		<el-color-picker v-model.number="formColor.outtimepicker" :predefine="predefineColors"></el-color-picker>
	 	</el-form-item>
	 </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeMe">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import popRight from '@/components/PopRight/index'
// import { REGEX }  from '@/utils/validate'
export default {
  data () {
  	const pretimeIdentifier = (rule, value, callback) => {
      if (value < 0 || value > 12) {
        callback(new Error('请输入0-12的数字'))
      } else {
        callback()
      }
    }
    const timingIdentifier = (rule, value, callback) => {
      if (value < 12 || value > 24) {
        callback(new Error('请输入12-24的数字'))
      } else {
        callback()
      }
    }
    const outtimeIdentifier = (rule, value, callback) => {
      if (value < 24) {
        callback(new Error('请输入大于24的数字'))
      } else {
        callback()
      }
    }
    return {
      popTitle: '提醒颜色设置',
      formColor: {
      	pretime: 2,
      	pretimepicker: '#333333',
      	timing: 24,
      	timingpicker: '#ff9900',
      	outtime: 48,
      	outtimepicker: '#ff0000'
      },
      rules: {
        pretime: [{validator: pretimeIdentifier, tigger: 'blur'}],
        timing: [{validator: timingIdentifier, tigger: 'blur'}],
        outtime: [{validator: outtimeIdentifier, tigger: 'blur'}]
      },
      miniInput: '70px',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585'
      ]
    }
  },
  props: {
  	popVisible: {
  	  type: Boolean,
  	  default: false
  	}
  },
  watch: {},
  computed: {
  	isShow: {
  	  get () {
  	    return this.popVisible
  	  },
  	  set () {}
  	}
  },
  methods: {
    closeMe (done) {
      this.$emit('close')
      if (typeof done === 'function') {
      	done()
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('sdfsdfs')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.setupTablePop{
  .el-dialog{
    max-width: 546px;
    min-width: 300px;
  }
  .transfer-footer{
    line-height: 20px;
    color: #666;
    font-size: 12px;
  }
}

.colorpickerItem{
	text-align:center;
	display: inline;
	width: 100%;
	.el-input{
		width:100px;
	}
	.el-color-picker__trigger{
		vertical-align:middle;
	}
	b{
		margin:0 10px;
	}
}
</style>
