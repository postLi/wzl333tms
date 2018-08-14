<template>
  <!-- 智能结算弹出框 -->
  <el-dialog title="智能结算" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog tms_dialog_count" width="600px">
    <!-- <el-form ref="formModel" :model="formModel" :rules="rules" label="90px" inline size="mini" label-position="right" > -->
      <el-form ref="formModel" :inline="true" size="mini" label-position="right" :rules="rules" :model="formModel" class="staff_searchinfo clearfix">
      <el-row>
        <el-col :span="12">
          <el-form-item label="发货人">
            <el-input placeholder="发货人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收入金额" >
            <el-input placeholder="只能输入阿拉伯数字" v-numberOnly:point></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用项">
            <querySelect  type="short_batch_type" @keyup.enter.native="onSubmit"></querySelect>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开单日期" >
            <el-date-picker v-model="searchTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions2" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p>提示：智能结算可以按照发货人开单日期自动挑选运单结算，运用场景如:某某客户结算某个月运费一万块，可以筛选客户，收入金额10000块，系统将自动挑选运单结算。</p>
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeMe">取 消</el-button>
    <el-button type="primary" @click="submit('formModel')">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import querySelect from '@/components/querySelect/index'
export default {
  components: {
    querySelect
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formModel: {},
      rules: {},
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  computed: {
    isShow: {
      get() {
        if (this.popVisible) {
          this.init()
        }
        return this.popVisible
      },
      set() {}
    }
  },
  methods: {
    init() {
    },
    doAction(type) {
      switch (type) {
        case 'import':
          break
        case 'download':
          break
      }
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
