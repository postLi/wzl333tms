<template>
	<el-dialog :title="popTitle" v-loading="loading" :visible.sync="isShow" 
  :close-on-click-modal="false"
	 :before-close="closeMe" class="setupTablePop">
	 <el-form ref="ruleForm" :model="repertorySetting" :rules="rules" class="colorpickerForm">
	 	<el-form-item class="colorpickerItem" prop="sectionOne">
	 		<b>超过：</b><el-input v-model="repertorySetting.sectionOne"></el-input><b>小时的库存颜色</b>
	 		<el-color-picker v-model.number="repertorySetting.sectionOneColour" :predefine="predefineColors"></el-color-picker>
	 	</el-form-item>
	 	<el-form-item class="colorpickerItem" prop="sectionTwo">
	 		<b>超过：</b><el-input v-model="repertorySetting.sectionTwo"></el-input><b>小时的库存颜色</b>
	 		<el-color-picker v-model.number="repertorySetting.sectionTwoColour" :predefine="predefineColors"></el-color-picker>
	 	</el-form-item>
	 	<el-form-item class="colorpickerItem" prop="sectionThree">
	 		<b>超过：</b><el-input v-model="repertorySetting.sectionThree"></el-input><b>小时的库存颜色</b>
	 		<el-color-picker v-model.number="repertorySetting.sectionThreeColour" :predefine="predefineColors"></el-color-picker>
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
import { getRepertoryColor, putRepertoryColor } from '@/api/operation/repertory'
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
      repertorySetting: {},
      inited: false,
      loading: false,
      rules: {
        sectionOne: [{ validator: pretimeIdentifier, tigger: 'blur' }],
        sectionTwo: [{ validator: timingIdentifier, tigger: 'blur' }],
        sectionThree: [{ validator: outtimeIdentifier, tigger: 'blur' }]
      },
      colorSetting: [],
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
  watch: {
    popVisible(newVal) {
      if (!this.inited) {
        this.inited = true
        this.getColor()
      }
    }
  },
  mounted() {
    if (!this.inited) {
      this.inited = true
      this.getColor()
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
  methods: {
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    getColor() {
      return getRepertoryColor(this.otherinfo.orgid).then(data => {
        if (data) {
          let list = data.data.repertorySetting
          this.$nextTick(() => {
            this.repertorySetting = Object.assign(this.repertorySetting, list)
            this.colorSetting = data.data
            this.$emit('success', this.colorSetting.repertorySetting)
          })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          let colorData = {}
          this.$set(colorData, 'repertorySetting', this.repertorySetting)
          putRepertoryColor(colorData, this.otherinfo.orgid, this.colorSetting.id).then(data => {
            this.$message({type: 'success', message: '修改成功'})
            this.loading = false
            this.$emit('success', colorData.repertorySetting)
          })
          .catch(error => {
            this.$message({type: 'danger', message: '修改失败' })
            this.loading = false
          })
        }
      })
    }
  }
}

</script>


<style lang="scss" scoped>
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
