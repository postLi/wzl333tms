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
            功能：现付
          </div>
          <router-link to="/finance/accountsReceivable/cash">
            <i class="flowicon1 xf"></i><br>
            <span>现付</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：到付
          </div>
          <router-link to="/finance/accountsReceivable/arrive">
            <i class="flowicon1 df"></i><br>
            <span>到付</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：回单付
          </div>
          <router-link to="/finance/accountsReceivable/receipt">
            <i class="flowicon1 hdf"></i><br>
            <span>回单付</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：异动费用
          </div>
          <router-link to="/finance/accountsPayable/waybill/unusual">
            <i class="flowicon1 ydfy"></i><br>
            <span>异动费用</span>
          </router-link>
        </el-tooltip>
      </div>
      <div class="finace_flow_item2">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：实际提货费
          </div>
          <router-link to="./accountsPayable/waybill/ticket">
            <i class="flowicon1 sjthf"></i><br>
            <span>实际提货费</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：中转费
          </div>
          <router-link to="./accountsPayable/waybill/transfer">
            <i class="flowicon1 zzf"></i><br>
            <span>中转费</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：回扣
          </div>
          <router-link to="./accountsPayable/waybill">
            <i class="flowicon1 hk"></i><br>
            <span>回扣</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：异动费用
          </div>
          <router-link to="/finance/accountsReceivable/abnormal">
            <i class="flowicon1 ydfy"></i><br>
            <span>异动费用</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：异常理赔
          </div>
          <router-link to="/finance/accountsPayable/waybill/abnormal">
            <i class="flowicon1 ycpl"></i><br>
            <span>异常理赔</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：其他费支出
          </div>
          <router-link to="./accountsPayable/waybill/other">
            <i class="flowicon1 qtfzc"></i><br>
            <span>其他费支出</span>
          </router-link>
        </el-tooltip>
      </div>
      <div class="finace_flow_item3">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：发车汇总
          </div>
          <router-link to="./accountsPayable/batch/truckAll">
            <i class="flowicon1 fchz"></i><br>
            <span>发车汇总</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：到车汇总
          </div>
          <router-link to="./accountsPayable/batch/arrivalAll">
            <i class="flowicon1 dchz"></i><br>
            <span>到车汇总</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：整车保险费
          </div>
          <router-link to="./accountsPayable/batch/insurance">
            <i class="flowicon1 zcbxf"></i><br>
            <span>整车保险费</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：发站装卸费
          </div>
          <router-link to="./accountsPayable/batch/stationLoad">
            <i class="flowicon1 fczxf"></i><br>
            <span>发站装卸费</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：发站其他费
          </div>
          <router-link to="./accountsPayable/batch/stationOther">
            <i class="flowicon1 fzqtf"></i><br>
            <span>发站其他费</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：到站其他费
          </div>
          <router-link to="./accountsPayable/batch/arrivalOther">
            <i class="flowicon1 dzqtf"></i><br>
            <span>到站其他费</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：短驳费
          </div>
          <router-link to="/finance/accountsPayable/batch/short">
            <i class="flowicon1 dbf"></i><br>
            <span>短驳费</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：送货费
          </div>
          <router-link to="./accountsPayable/batch/deliver">
            <i class="flowicon1 shf"></i><br>
            <span>送货费</span>
          </router-link>
        </el-tooltip>
      </div>
      <div class="finace_flow_item4">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：货款到账
          </div>
          <router-link to="/finance/payment/accept">
            <i class="flowicon1 hkdz"></i><br>
            <span>货款到账</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：货款发放
          </div>
          <router-link to="/finance/payment/grant">
            <i class="flowicon1 hkff"></i><br>
            <span>货款发放</span>
          </router-link>
        </el-tooltip>
      </div>
      <div class="finace_flow_item5">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：货款回收
          </div>
          <router-link to="/finance/payment/recycle">
            <i class="flowicon1 hkhs"></i><br>
            <span>货款回收</span>
          </router-link>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：货款汇款
          </div>
          <router-link to="/finance/payment/send">
            <i class="flowicon1 hkhk"></i><br>
            <span>货款汇款</span>
          </router-link>
        </el-tooltip>
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
// @media (min-width: 1024px){
  .dashboard {
    &-container {
      padding: 30px;
    }
  }
.finace-container {
    padding-top:45px;
    min-width: 1190px;
    .finace_flow{
      display: block;
      margin:0 auto !important;
      width: 1325px;
      height: 789px;
      // margin: 53px auto 0;
      position: relative;
      background: url("../../assets/flow/index31.png") no-repeat;
      // background-size: auto 2000;
      position: relative;
      span{
          font-size:14px;
        }
      .finace_flow_item1{
        width: 897px;
        height: 101px;
        display: flex;
        justify-content:  flex-start;
        flex-direction: row;
        text-align: center;
        position: absolute;
        top: 34px;
        left: 208px;
        
        .el-tooltip{
          padding-top:20px;
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
        display: flex;
        justify-content:  flex-start;
        flex-direction: row;
        text-align: center;
        .el-tooltip{
          padding-top:20px;
          flex-grow: 1;
        }
      }
      .finace_flow_item3{
        width: 862px;
        height: 208px;
        // background: red;
        position: absolute;
        top: 356px;
        left: 226px;
        display: flex;
        // justify-content:  flex-start;
        // align-content: space-between;
        flex-direction: row;
        text-align: center;
        flex-wrap:wrap;
        .el-tooltip{
          //  flex-grow: 1;
          width: 20%;
          padding-top:20px;
          
        }
      }
      .finace_flow_item4{
        width: 272px;
        height: 102px;
        // background: red;
        position: absolute;
        top: 664px;
        left: 326px;
        display: flex;
        justify-content:  flex-start;
        flex-direction: row;
        text-align: center;
        .el-tooltip{
          padding-top:20px;
          flex-grow: 1;
        }
      }
      .finace_flow_item5{
        width: 272px;
        height: 102px;
        // background: red;
        position: absolute;
        top: 664px;
        left: 716px;
        display: flex;
        justify-content:  flex-start;
        flex-direction: row;
        text-align: center;
        .el-tooltip{
          padding-top:20px;
          flex-grow: 1;
        }
      }
      .flowicon1 {
        transition: 0.5s;
       span{
         font-size: 14px;
       }
      }
      .flowicon1:hover {
        transform: scale(1.2);
        transition: 0.3s;
      }
    }
  }
</style>
