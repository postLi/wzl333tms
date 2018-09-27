<template>
  <!-- 短信购买 -->
  <div class="sms">
    <div class="sms_top">
      <p>尊敬的用户您好：当前剩余可发的短信<b>{{packageInfo.surplusAmount}}</b>条，请购买，才能正常使用。当前账户余额<b>{{packageInfo.balance}}</b>元。
        <el-button size="mini" type="primary" icon="el-icon-sort" @click="recharge" v-has:SMS_BUY_1>充值</el-button>
      </p>
    </div>
    <div class="sms_content">
      <el-row :gutter="10">
        <el-col :span="4" v-for="(item, index) in dataList" :key="item.id">
          <el-card shadow="hover" class="smsCard">
            <div slot="header" class="clearfix">
              <span>套餐{{changeNumCN[index]}}</span>
            </div>
            <div class="smsCard_content">
              <p>{{item.amount}}条短信</p>
              <h3>{{item.fee}}元</h3>
              <h4>{{item.price}}元/条</h4>
              <el-button v-has:SMS_BUY_2 type="danger" class="smsCard_footbtn" round icon="el-icon-goods" @click="goBuy(item)">立即购买</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <buyTips :info="handleBuyArr" :popVisible="popVisibleTips" @close="closeTips" @success="getSearchSmsSurplus"></buyTips>
    <Recharge :popVisible.sync="popVisibleRecharge" @success="getSearchSmsSurplus"></Recharge>
  </div>
</template>
<script>
import Recharge from '../wallet/components/recharge'
import buyTips from './components/buyTips'
import { getSmspackages, getSearchSmsSurplus, postBuy } from '@/api/company/sms'
import { objectMerge2 } from '@/utils/index'
export default {
  data() {
    return {
      dataList: [],
      changeNumCN: [],
      packageInfo: {},
      handleBuyItem: {},
      popVisibleTips: false,
      popVisibleRecharge: false,
      handleBuyArr: []
    }
  },
  components: {
    buyTips,
    Recharge
  },
  mounted() {
    this.converToCn()
    this.getSmspackages()
    this.getSearchSmsSurplus()
  },
  methods: {
    recharge() {
      this.popVisibleRecharge = true
    },
    converToCn() {
      let i = 0
      const arr = ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      this.changeNumCN = []
      while (i++ < 99) {
        const nums = (i + '').split('')
        let str = nums[1] ? (nums[0] === '1' ? '' : arr[nums[0]]) + '十' + (nums[1] === '0' ? '' : arr[nums[1]]) : arr[nums[0]]
        if (i === 10) {
          str = '十'
        }
        this.changeNumCN.push(str)
      }
    },
    getSearchSmsSurplus() {
      getSearchSmsSurplus().then(data => {
        this.packageInfo = data
      })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    getSmspackages() {
      return getSmspackages().then(data => {
        this.dataList = data
        this.dataList.forEach(e => {
          let count = 0
          count = (Number(e.fee) / Number(e.amount)).toFixed(2)
          this.$set(e, 'price', count)
        })
      })
    },
    goBuy(obj) {
      this.handleBuyItem = Object.assign({}, obj)
      if (Number(obj.fee) <= Number(this.packageInfo.balance)) {
        this.handleBuyArr[0] = this.handleBuyItem
        this.popVisibleTips = true
      } else {
        const h = this.$createElement
        this.$confirm('钱包余额不足，当前余额 ' + this.packageInfo.balance + ' 元，先充值再购买。', '购买失败', {
          distinguishCancelAndClose: true,
          confirmButtonText: '充值',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.popVisibleRecharge = true
            this.popVisibleTips = false
          })
          .catch(() => {
            this.popVisibleTips = false
          })
        // this.$confirm({
        //     title: '购买失败',
        //     message: h('div', { style: 'text-align: center' }, [
        //       h('p', { style: 'font-size: 16px' }, '钱包余额不足，当前余额 ' + this.packageInfo.balance + ' 元，先充值再购买。')
        //     ]),
        //     confirmButtonText: '充值',
        //     cancelButtonText: '取消'
        //   })
        //   .then(() => {
        //     this.popVisibleTips = true
        //   })
        //   .catch(() => {
        //     this.popVisibleTips = false
        //   })
      }
    },
    closeTips() {
      this.popVisibleTips = false
    }
  }
}

</script>
<style lang="scss">
.sms {
  .sms_top {
    margin: 10px;
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    b {
      color: red;
      padding: 0 5px;
    }
  }
  .sms_content {
    margin: 10px;

    .smsCard {
      border: 1px solid #d0d7e5;
      .smsCard_content {
        text-align: center;
        padding-bottom: 20px;
        p {
          font-size: 18px;
          font-weight: 700;
          padding: 20px 0;
        }
        h3{
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        h4 {
          color: #666666;
        }
        .smsCard_footbtn {
          margin: 20px 0 0;
        }
      }
    }
    .el-card {
      .el-card__header {
        text-align: center;
        padding: 10px 10px;
        border-bottom: 1px solid #d0d7e5;
      }
      .el-card__body {
        padding: 0px;
      }
    }
  }
}

</style>
