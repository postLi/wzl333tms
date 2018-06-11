<template>
  <div class="createOrder-main">
    <div class="createOrder-title"><span>收发货凭证</span></div>
    <div class="createOrder-info clearfix">
      <div class="order-num">运单号： <span class="order-num-info">0100001</span></div>
      <div class="create-num">开单日期： <span class="create-num-info">2018-1-29</span></div>
    </div>
    <div class="order-main">
      <textarea name="" id="" cols="30" rows="10" @keyup.ctrl.65.stop.exact="doAction('cleanKey')">1111</textarea>
    </div>
    <!-- 底部按钮操作部分 -->
    <div class="order-btns">
      <el-button @click="doAction('cleanKey')" icon="el-icon-circle-close-outline" type="danger" plain>清空（{{keys.cleanKey}}）</el-button>
      <el-button @click="doAction('printLibkey')" icon="el-icon-printer" type="primary" plain>打印标签（{{keys.printLibkey}}）</el-button>
      <el-button @click="doAction('printShipKey')" icon="el-icon-tickets" type="primary" plain>打印运单（{{keys.printShipKey}}）</el-button>
      <el-button @click="doAction('saveShipKey')" icon="el-icon-document" type="primary" plain>保存（{{keys.saveShipKey}}）</el-button>
      <el-button @click="doAction('savePrintKey')" icon="el-icon-circle-check-outline" type="success" plain>保存并打印（{{keys.savePrintKey}}）</el-button>
      
      <el-dropdown type="primary" trigger="click" class="createOrder-setup"  @command="handleCommand">
        <span class="el-dropdown-link">
          <el-button icon="el-icon-setting" size="mini" type="primary" plain></el-button>
        </span>
        
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="feeSetup">费用设置</el-dropdown-item>
          <el-dropdown-item command="personalSetup">个人设置</el-dropdown-item>
          <el-dropdown-item command="orderSetup">运单设置</el-dropdown-item>
          <el-dropdown-item command="openInNewWindow">独立窗口</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <FeeDialog :dialogVisible.sync="dialogVisible" />
    <PersonDialog @success="getKeySetup" :dialogVisiblePersion.sync="dialogVisiblePersion" />
  </div>
</template>
<script>
//http://unixpapa.com/js/key.html
//http://wangchujiang.com/hotkeys/
//键盘事件
import hotkeys from '@/utils/hotkeys'
import FeeDialog from './components/feePop'
import PersonDialog from './components/personSetup'
import OrderApi from  '@/api/operation/orderManage'

export default {
  components: {
    FeeDialog,
    PersonDialog
  },
  data () {
    return {
      dialogVisible: false,
      dialogVisiblePersion: false,
      keys: {
        "printLibkey": "",
        "savePrintKey": "",
        "saveShipKey": "",
        "cleanKey": "",
        "printShipKey": ""
      }
    }
  },
  mounted () {
    this.getKeySetup()
  },
  beforeDestroy () {
    this.unbindKey()
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
          this.dialogVisiblePersion = true
          break;
        case 'orderSetup':
          this.$router.push('/company/systemSetup')          
          break;
        case 'openInNewWindow':
          this.$message('暂不支持新开窗口创建运单~')
          break;
      }
    },
    // 获取快捷键设置
    getKeySetup () {
      return OrderApi.getPersonalSetup(this.otherinfo.id, 'printKey').then(res => {
        this.keys = res
        if(this.inited){
          // 清除上一次绑定的快捷键
          this.unbindKey()
        } else {
          this.inited = true
        }
        
        // 重新绑定新的快捷键
        this.bindKey()
      })
    },
    // 绑定快捷键
    bindKey() {
      for(const i in this.keys){
        hotkeys(this.keys[i], (e)=>{
          e.preventDefault()
          this.doAction(i)
        })
      }
    },
    // 取消绑定快捷键
    unbindKey(){
      for(const i in this.keys){
        hotkeys.unbind(this.keys[i])
      }
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
