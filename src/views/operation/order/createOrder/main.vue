<template>
  <div class="createOrder-main" @keyup.ctrl.65.exact.stop="doAction('clear')">
    <div class="createOrder-title"><span>收发货凭证</span></div>
    <div class="createOrder-info clearfix">
      <div class="order-num">运单号： <span class="order-num-info">0100001</span></div>
      <div class="create-num">开单日期： <span class="create-num-info">2018-1-29</span></div>
    </div>
    <div class="order-main">
      <textarea name="" id="" cols="30" rows="10" @keyup.ctrl.65.stop.exact="doAction('clear')">1111</textarea>
    </div>
    <div class="order-btns">
      <el-button @click="doAction('clear')" icon="el-icon-circle-close-outline" type="danger" plain>清空（Ctrl+E）</el-button>
      <el-button @click="doAction('printTag')" icon="el-icon-printer" type="primary" plain>打印标签（Ctrl+O）</el-button>
      <el-button @click="doAction('printOrder')" icon="el-icon-tickets" type="primary" plain>打印运单（Ctrl+P）</el-button>
      <el-button @click="doAction('save')" icon="el-icon-document" type="primary" plain>保存（Ctrl+S）</el-button>
      <el-button @click="doAction('saveAndPrint')" icon="el-icon-circle-check-outline" type="success" plain>保存并打印（Ctrl+D）</el-button>
      <el-button @click="doAction('setup')" icon="el-icon-setting" class="createOrder-setup" size="mini" type="primary" plain></el-button>
    </div>
  </div>
</template>
<script>
//http://unixpapa.com/js/key.html
//http://wangchujiang.com/hotkeys/
//键盘事件
import hotkeys from 'hotkeys-js'

export default {
  data () {
    return {
      
    }
  },
  mounted () {
    hotkeys('ctrl+e', (e)=>{
      e.preventDefault()
      this.doAction('clear')
    })
    hotkeys('ctrl+o', (e)=>{
      e.preventDefault()
      this.doAction('printTag')
    })
    hotkeys('ctrl+p', (e)=>{
      e.preventDefault()
      this.doAction('printOrder')
    })
    hotkeys('ctrl+s', (e)=>{
      e.preventDefault()
      this.doAction('save')
    })
    hotkeys('ctrl+d', (e)=>{
      e.preventDefault()
      this.doAction('saveAndPrint')
    })
  },
  beforeDestroy () {
    hotkeys.unbind('ctrl+e,ctrl+o,ctrl+p,ctrl+s,ctrl+d')
  },
  methods: {
    doAction (type) {
      alert(type)
      switch (type) {
        case 'clear':
          
          break;
        case 'printTag':
          
          break;
        case 'printOrder':
          
          break;
        case 'save':
          
          break;
        case 'saveAndPrint':
          
          break;
        case 'setup':
          
          break;
      
        default:
          break;
      }
    }
  }
}
</script>
<style lang="scss">
  .createOrder-main{
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 24px;
    box-shadow: 0px 0px 10px 0px 
    rgba(0, 0, 0, 0.47);
    padding-top: 28px;
    padding-left: 26px;
    padding-right: 26px;
    padding-bottom: 58px;
    font-size: 12px;
    
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
        font-size: 20px;
        padding: 7px;
        position: absolute;
        top: 8px;
        right: 8px;
      }
    }
  }
</style>
