<template>
  <el-dialog :title="popTitle" v-loading="loading" :visible.sync="isShow" :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog" width="500px">
    <el-table :data="info">
      <el-table-column prop="id" label="套餐级别">
        <template slot-scope="scope">
          套餐{{changeNumCN[scope.row.id-1]}}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="短信条数"></el-table-column>
      <el-table-column prop="fee" label="金额(元)"></el-table-column>
      <el-table-column prop="price" label="单条价格(元/条)" width="120"></el-table-column>
    </el-table>
    <div slot="footer">
      <el-button type="primary" @click="postBuy">购 买</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {  postBuy } from '@/api/company/sms'
import { postSmsSign } from '@/api/company/sms'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {}
  },
  data() {
    return {
      popTitle: '短信购买',
      loading: true,
      isShow: false,
      changeNumCN: []
    }
  },
  watch: {
    popVisible (newVal) {
      this.isShow = newVal
      if(newVal) {
        this.converToCn()
      }
    }
  },
  methods: {
    converToCn() {
      let i = 0
      let arr = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      this.changeNumCN = []
      while (i++ < 99) {
        let nums = (i + '').split('')
        let str = nums[1] ? (nums[0] === '1' ? '' : arr[nums[0]]) + '十' + (nums[1] === '0' ? '' : arr[nums[1]]) : arr[nums[0]]
        if (i === 10) {
          str = '十'
        }
        this.changeNumCN.push(str)
      }
    },
    postBuy () {
      postBuy(this.info[0].id).then(data => {
          this.$message.success('已购买成功!')
          this.$emit('success')
          this.closeMe()
        })
        .catch(error => {
          this.$message.error(error.errorInfo || error.text || '发生未知错误~')
        })
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
