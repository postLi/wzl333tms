<template>
  <el-form :model="formModel" :rules="rules" :inline="true" :size="btnsize" ref="formModel" label-position="right" label-width="70px" class="staff_searchinfo clearfix">
    <el-form-item label="网点">
      <SelectTree v-model="formModel.orgId" :orgid="otherinfo.orgid" />
    </el-form-item>
    <el-form-item label="发送时间">
      <el-date-picker v-model="searchTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions2" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="发送节点">
      <el-select v-model="formModel.sendNodeCode" placeholder="请选择">
      	<el-option label="全部" value=""></el-option>
        <el-option v-for="item in sendOptions" :key="item.id" :label="item.dictValue" :value="item.dictName">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发送对象">
      <el-select v-model="formModel.sendTargetCode" placeholder="请选择">
      	<el-option label="全部" value=""></el-option>
        <el-option v-for="item in targetOptions" :key="item.id" :label="item.dictValue" :value="item.dictName">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="formModel.status" placeholder="请选择">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="staff_searchinfo--btn">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="info" @click="clearForm('formModel')" plain>清空</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { REGEX } from '@/utils/validate'
import SelectTree from '@/components/selectTree/index'
import { objectMerge2, pickerOptions2, parseTime } from '@/utils/index'
import { getSelectType } from '@/api/common'
export default {
  components: {
    SelectTree
  },
  prop: {

  },
  data() {
    return {
      btnsize: 'mini',
      searchTime: [parseTime(new Date() - 30 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      formModel: {
        orgId: '',
        sendTargetCode: '',
        sendNodeCode: '',
        startTime: '',
        endTime: '',
        status: ''
      },
      rules: {},
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      targetOptions: [],
      sendOptions: [],
      statusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '发送成功'
      }, {
        value: '1',
        label: '发送失败'
      }]
    }
  },
  mounted() {
  	this.initSelectType()
    this.formModel.orgId = this.otherinfo.orgid
    this.onSubmit()
  },
  methods: {
  	initSelectType () {
  		let node = 'send_node'
  		let target = 'send_target'
  		getSelectType(node, this.otherinfo.orgid || this.otherinfo.companyId).then(data => {
  			this.sendOptions = data
  		})
  		getSelectType(target, this.otherinfo.orgid || this.otherinfo.companyId).then(data => {
  			this.targetOptions = data
  		})
  	},
    onSubmit() {
      if (this.searchTime) {
        this.formModel.startTime = parseTime(this.searchTime[0], '{y}-{m}-{d} ') + '00:00:00'
        this.formModel.endTime = parseTime(this.searchTime[1], '{y}-{m}-{d} ') + '23:59:59'
      }
      this.$emit('change', this.formModel)
    },
    clearForm(formName) {
      this.$refs[formName].resetFields()
      this.formModel = Object.assign({}, this.$options.data().formModel)
      this.formModel.orgId = this.otherinfo.orgid
      this.searchTime = this.$options.data().searchTime
    }
  }
}

</script>
