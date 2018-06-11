<template>
  <div class="createOrder-main">
    <div class="createOrder-title"><span>收发货凭证</span></div>
    <div class="createOrder-info clearfix">
      <div class="order-num">运单号： <span class="order-num-info">0100001</span></div>
      <div class="create-num">开单日期： <span class="create-num-info">
         <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
      </span></div>
    </div>
    <div class="order-main">
      <textarea name="" id="" cols="30" rows="10" @keyup.ctrl.65.stop.exact="doAction('cleanKey')">1111</textarea>
    </div>
    <!-- 底部按钮操作部分 -->
    <FooterBtns :isChange="changeFlag" @doAction="doAction" @doCommand="handleCommand" />
    <!-- 弹窗 -->
    <FeeDialog :dialogVisible.sync="dialogVisible" />
    <PersonDialog @success="getKeySetup" :dialogVisiblePerson.sync="dialogVisiblePerson" />
  </div>
</template>
<script>
import FeeDialog from './components/feePop'
import PersonDialog from './components/personSetup'
import OrderApi from  '@/api/operation/orderManage'
import { getAllSetting } from '@/api/company/systemSetup'
import FooterBtns from './components/btns'

export default {
  components: {
    FeeDialog,
    PersonDialog,
    FooterBtns
  },
  data () {
    return {
      // 费用设置弹窗
      dialogVisible: false,
      // 个人设置弹窗
      dialogVisiblePerson: false,
      // 标记个人设置是否有改动
      changeFlag: Math.random(),
      form: {}
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 底部按钮操作
    doAction (type) {
      alert(type)
      switch (type) {
        case 'cleanKey':
          
          break;
        case 'printLibkey':
          
          break;
        case 'printShipKey':
          
          break;
        case 'saveShipKey':
          
          break;
        case 'savePrintKey':
          
          break;
      }
    },
    // 右下角设置按钮菜单点击操作
    handleCommand(command) {
      switch(command) {
        case 'feeSetup':
          this.dialogVisible = true
          break;
        case 'personalSetup':
          this.dialogVisiblePerson = true
          break;
        case 'orderSetup':
          this.$router.push('/company/systemSetup')          
          break;
        case 'openInNewWindow':
          this.$message('暂不支持新开窗口创建运单~')
          break;
      }
    },
    getKeySetup () {
      this.changeFlag = Math.random()
    }
  }
}
</script>
<style lang="scss">
  .createOrder-main{
    margin-left: 12px;
    margin-right: 12px;
    box-shadow: 0px 0px 10px 0px 
    rgba(0, 0, 0, 0.47);
    padding-top: 28px;
    padding-left: 26px;
    padding-right: 26px;
    padding-bottom: 58px;
    font-size: 12px;

    .el-dialog__wrapper,.v-modal{
      position: absolute;
    }
    
    .createOrder-title{
      font-size: 24px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 9px;
      color: #000;
      text-align: center;
      span{
        border-bottom:1px solid rgba(0, 0, 0, 0.43);
      }
    }
    .order-num{
      float: left;
      padding-left: 8px;
      color: #333;

      span{
        color: #f00;
        font-weight: bold;
      }
    }
    .create-num{
      float: right;
      padding-right: 8px;
      color: #777;

      span{
        color: #333;
        font-weight: bold;
      }
    }
    .order-main{
      min-height: 400px;
      border: solid 2px #000827;
      margin-top: 8px;
    }
    /* 底部按钮部分 */
    .order-btns{
      padding-top: 21px;
      text-align: center;
      position: relative;

      .el-button{
        font-size: 16px;
        //background: transparent;
        i{
          font-size: 1.5em;
          vertical-align: middle;
        }
      }
      .createOrder-setup{
        
        position: absolute;
        top: 8px;
        right: 8px;

        .el-button{
          font-size: 16px;
          padding: 2px;
        }
      }
    }
  }
</style>
