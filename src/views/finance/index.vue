<template>
  <!-- <div class="dashboard-container">
    <div class="wzl_caiwu-flow">
      <div class="fin1-content">
        <el-tooltip content="现付" placement="top">
          <el-button @click="gotoPage('Cash', '/finance/accountsReceivable/cash')"><router link to="" />现付</el-button>
        </el-tooltip>
        <router-link to="/finance/accountsReceivable/cash">
          <el-tooltip content="现付" placement="top">
            <el-button>现付</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="/finance/accountsReceivable/arrive">
          <el-tooltip content="到付" placement="top">
            <el-button>到付</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="/finance/accountsReceivable/month">
          <el-tooltip content="月结" placement="top">
            <el-button>月结</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="/finance/accountsReceivable/receipt">
          <el-tooltip content="回单付" placement="top">
            <el-button>回单付</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="/finance/accountsReceivable/abnormal">
          <el-tooltip content="异动费用" placement="top">
            <el-button>异动费用</el-button>
          </el-tooltip>
        </router-link>
      </div>
      <div class="fin2-content">
        <el-tooltip content="提货费" placement="top">
          <el-button>提货费</el-button>
        </el-tooltip>
        <router-link to="./accountsPayable/waybill/ticket">
          <el-tooltip content="实际提货费" placement="top">
            <el-button>实际提货费</el-button>
          </el-tooltip>
        </router-link>
       
        <router-link to="./accountsPayable/waybill/transfer">
          <el-tooltip content="中转费" placement="top">
            <el-button >中转费</el-button>
          </el-tooltip>
        </router-link>
        <router-link to="./accountsPayable/waybill">
          <el-tooltip content="回扣" placement="top">
            <el-button>回扣</el-button>
          </el-tooltip>
        </router-link>
        
        <el-tooltip content="单票提货费" placement="top">
          <el-button  @click="gotoPage('Ticket', './accountsPayable/waybill')">单票提货费</el-button>
        </el-tooltip>
        <router-link to="./accountsPayable/waybill/unusual">
          <el-tooltip content="异动费用" placement="top">
            <el-button>异动费用</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="./accountsPayable/waybill/other">
          <el-tooltip content="其他支出" placement="top">
            <el-button>其他支出</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="./accountsPayable/batch/deliver">
          <el-tooltip content="送货费" placement="top">
            <el-button>送货费</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="./accountsPayable/batch/deliver">
          <el-tooltip content="短驳费" placement="top">
            <el-button>短驳费</el-button>
          </el-tooltip>
        </router-link>
       
        <router-link to="">
          <el-tooltip content="干线费" placement="top">
            <el-button>干线费</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="./accountsPayable/waybill/deliver">
          <el-tooltip content="异常理赔" placement="top">
            <el-button>异常理赔</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="./accountsPayable/batch/insurance">
          <el-tooltip content="整车保险费" placement="top">
            <el-button>整车保险费</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="./accountsPayable/batch/truckAll">
          <el-tooltip content="发车汇总" placement="top">
            <el-button>发车汇总</el-button>
          </el-tooltip>
        </router-link>
       
        <router-link to="./accountsPayable/batch/arrivalAll">
          <el-tooltip content="到车汇总" placement="top">
            <el-button>到车汇总</el-button>
          </el-tooltip>
        </router-link>
       
        <router-link to="./accountsPayable/batch/stationLoad">
          <el-tooltip content="发站装卸费" placement="top">
            <el-button>发站装卸费</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="./accountsPayable/batch/stationOther">
          <el-tooltip content="发站其他费" placement="top">
            <el-button>发站其他费</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="./accountsPayable/batch/arriveLoad">
          <el-tooltip content="到站装卸费" placement="top">
            <el-button>到站装卸费</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="./accountsPayable/batch/arriveOther">
          <el-tooltip content="到站其他费" placement="top">
            <el-button>到站其他费</el-button>
          </el-tooltip>
        </router-link>
       
      </div>
      <div class="fin3-content">
        <router-link to="/finance/payment/accept">
          <el-tooltip content="货款到账" placement="top">
            <el-button>货款到账</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="/finance/payment/grant">
          <el-tooltip content="货款发放" placement="top">
            <el-button>货款发放</el-button>
          </el-tooltip>
        </router-link>
        
      </div>
      <div class="fin4-content">
        <router-link to=""></router-link>
        <router-link to="/finance/payment/recycle">
          <el-tooltip content="货款回收" placement="top">
            <el-button >货款回收</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="/finance/payment/send">
          <el-tooltip content="货款汇款" placement="top">
            <el-button >货款汇款</el-button>
          </el-tooltip>
        </router-link>
      </div>
      <div class="fin5-content">
        <router-link to="/finance/accountsReceivable/all">
          <el-tooltip content="应收账款" placement="top">
            <el-button>应收账款</el-button>
          </el-tooltip>
        </router-link>
        
        <router-link to="./accountsPayable/waybill">
          <el-tooltip content="应付账款" placement="top">
            <el-button >应付账款</el-button>
          </el-tooltip>
        </router-link>
        
      </div>
      <div class="fin6-content">
        <router-link to="/finance/payment/recycle">
           <el-tooltip content="货款管理" placement="top">
            <el-button>货款管理</el-button>
          </el-tooltip>
        </router-link>
        <router-link to="./settleLogIncome">
          <el-tooltip content="记收入" placement="top">
            <el-button >记收入</el-button>
          </el-tooltip>
        </router-link>
      </div>
      <div class="fin7-content">
        <router-link to="./settleLogExpandtiure">
          <el-tooltip content="记支出" placement="top">
            <el-button >记支出</el-button>
          </el-tooltip>
        </router-link>
      </div>
      <div class="fin8-content">
        <router-link to="./settleLog">
          <el-tooltip content="资金流水" placement="top">
            <el-button>资金流水</el-button>
          </el-tooltip>
        </router-link>
      </div>
    </div>	
  </div> -->
   <div class="finace-container">
    <div class="finace_flow">
      <div class="finace_flow_item1">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：安排车辆上门提货
          </div>
          <router-link to="./order/pickUp">
            <i class="flowicon tihuo"></i><br>
            <span>提货</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：安排车辆上门提货
          </div>
          <router-link to="./order/pickUp">
            <i class="flowicon tihuo"></i><br>
            <span>提货</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：安排车辆上门提货
          </div>
          <router-link to="./order/pickUp">
            <i class="flowicon tihuo"></i><br>
            <span>提货</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：安排车辆上门提货
          </div>
          <router-link to="./order/pickUp">
            <i class="flowicon tihuo"></i><br>
            <span>提货</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：安排车辆上门提货
          </div>
          <router-link to="./order/pickUp">
            <i class="flowicon tihuo"></i><br>
            <span>提货</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：安排车辆上门提货
          </div>
          <router-link to="./order/pickUp">
            <i class="flowicon tihuo"></i><br>
            <span>提货</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：安排车辆上门提货
          </div>
          <router-link to="./order/pickUp">
            <i class="flowicon tihuo"></i><br>
            <span>提货</span>
          </router-link>
        </el-tooltip>
      </div>
      <div class="finace_flow_item2">
      </div>
      <div class="finace_flow_item3">
      </div>
      <div class="finace_flow_item4">
      </div>
      <div class="finace_flow_item5">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    // gotoPage() {
    //   this.$router.push({
    //     path: './accountsPayable/batch',
    //     query: {
    //       name: 'batchShort'
    //     }
    //   })
    // }
    gotoPage: function(name, path) {
      this.$router.push({
        path: path,
        query: {
          name: name
        }
      })
    }
  }
}
</script>
<style lang="scss">
@media (min-width: 1024px){
  .dashboard {
    &-container {
      padding: 30px;
    }
  }
  .wzl_caiwu-flow{
    width: 1223px;
    height: 603px;
    margin: 53px auto 0;
    position: relative;
    background: url("../../assets/flow/cw1.png") no-repeat;
    .el-button{
      display: inline-block;
      // width: 88px;
      width: 110px;
      margin:5px;
      padding: none;
      text-align: center;
      background-color: #cbebff;
      border-radius: 2px;
      border: solid 1px #39bbff;
      font-weight: bold;
      font-size: 13px;
      user-select: none;//避免选中的时候有默认样式
    }
    .fin1-content{
      width:680px;
      height: 75px;
      line-height: 75px;
      border-radius: 10px;
      text-align: center;
      // background: red;
      position: absolute;
      top:5px;
      left:347px;
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin2-content{
      width: 681px;
      height: 223px;
      padding-top: 10px;
      // background: red;
      position: absolute;
      top: 110px;
      right: 195px;
      border-radius: 10px;
      padding-left:33px;
      // text-align: center;
      :hover.el-button{
        background-color: #39bbff;
        // transform: translate(8px,5px)
        transform:scale(1.1,1.1)
      
      }
      :hover span{
        color:#fff;
      }
      
    }
    .fin3-content{
      // background: red;
      width: 268px;
      height: 80px;
      line-height: 80px;
      border-radius: 10px;
      position: absolute;
      left: 413px;
      top: 388px;
      text-align: center;
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin4-content{
      // background:yellow;
      width: 268px;
      height: 80px;
      line-height: 80px;
      border-radius: 10px;
      position: absolute;
      left: 693px;
      top: 388px;
      text-align: center;
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin5-content{
      // background: red;
      width: 118px;
      height: 308px;
      position: absolute;
      left: 184px;
      top: 16px;
      .el-button{
        display: inline-block;
        width: 110px;
        margin-top: 9px;
        margin-bottom: 127px;
        padding: none;
        text-align: center;
        background-color: #cbebff;
        border-radius: 2px;
        border: solid 1px #2ca3f1;
        font-weight: bold;
      }
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin6-content{
      // background: yellow;
      width: 118px;
      height: 308px;
      position: absolute;
      left: 184px;
      top: 371px;
      .el-button{
        display: inline-block;
        width: 110px;
        margin-top: 28px;
        margin-bottom: 88px;
        padding: none;
        text-align: center;
        background-color: #cbebff;
        border-radius: 2px;
        border: solid 1px #2ca3f1;
        font-weight: bold;
      }
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin7-content{
      // background: yellow;
      width: 121px;
      height: 50px;
      position: absolute;
      bottom: 3px;
      left: 338px;
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
      :hover span{
        color:#fff;
      }
    }
    .fin8-content{
      // background:red;
      width: 121px;
      height: 50px;
      position:absolute;
      right:-5px;
      bottom: 257px;
      cursor: pointer;
      .el-button{
        height: 42px;
       background-color: #13a5f2;
       border:none;
       color:#fff;
      }
      :hover.el-button{
        background-color: #39bbff;
        transform:scale(1.1,1.1)
      }
    }
  }  
  .finace_flow{
    display: block;
    margin:0 auto !important;
    width: 1228px;
    height: 789px;
    margin: 53px auto 0;
    position: relative;
    background: url("../../assets/flow/index31.png") no-repeat;
    background-color: yellow;
    
    // background-size: auto 2000;
    position: relative;
    .finace_flow_item1{
      width: 897px;
      height: 101px;
      display: flex;
      justify-content:  flex-start;
      //  align-content: center;
      flex-direction: row;
      text-align: center;
      background: red;
      position: absolute;
      top: 34px;
      left: 208px;
      .el-tooltip{
        padding-top:15px;
        flex-grow: 1;
      }
    }
    .finace_flow_item2{
      width: 863px;
      height: 104px;
      // background: red;
      position: absolute;
      top: 211px;
      left: 225px;
    }
    .finace_flow_item3{
      width: 862px;
      height: 208px;
      // background: red;
      position: absolute;
      top: 356px;
      left: 226px;
    }
    .finace_flow_item4{
      width: 272px;
      height: 102px;
      // background: red;
      position: absolute;
      top: 664px;
      left: 326px;
    }
    .finace_flow_item5{
      width: 272px;
      height: 102px;
      // background: red;
      position: absolute;
      top: 664px;
      left: 716px;
    }
  }
}

</style>
