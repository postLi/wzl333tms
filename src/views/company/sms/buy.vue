<template>
	<!-- 短信购买 -->
  <div class="sms">
    <div class="sms_top">
    	<p>尊敬的用户您好：当前剩余可发的短信0条，请购买，才能正常使用。当前账户余额0元。 <el-button size="mini" type="success" icon="el-icon-sort">充值</el-button></p>

    </div>
    <div class="sms_content">
      <el-row :gutter="10">
        <el-col :span="4" v-for="(item, index) in dataList" :key="item.id">
          <el-card shadow="hover" class="smsCard">
            <div slot="header" class="clearfix">
              <span>套餐{{changeNumCN[item.id]}}</span>
            </div>
            <div>
              <p>{{item.amount}}条短信</p>
              <h4>{{item.fee}}元</h4>
              <el-button type="danger">立即购买</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getSmspackages } from '@/api/company/sms'
export default {
  data() {
    return {
      dataList: [],
      changeNumCN: [],
    }
  },
  mounted() {
    this.converToCn()
    this.getSmspackages()
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
    getSmspackages() {
      return getSmspackages().then(data => {
        this.dataList = data
        console.log(data)
      })
    }
  }
}

</script>
<style lang="scss">
.sms {
  .sms_top{
  	margin: 10px;
  	padding: 8px 16px;
  	background-color: #ecf8ff;
  	border-radius: 4px;
  	border-left: 5px solid #3e9ff1;
  }
  .sms_content {
    margin: 10px;
    .smsCard{
    	padding: 10px;
    }
    .el-card{
    	// border: 1px solid #ecf8ff;
    }
  }
}

</style>
