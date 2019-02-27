<template>
   <div class="finace-container">
    <div class="finace_flow">
      <div class="finace_flow_item1">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：现付
          </div>
          <a @click="gotoPage('/finance/accountsReceivable/cash', 'FINANCE_RECLIST2')">
            <i class="flowicon1 xf"></i><br>
            <span>现付</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：到付
          </div>
          <a @click="gotoPage('/finance/accountsReceivable/arrive', 'FINANCE_RECLIST3')">
            <i class="flowicon1 df"></i><br>
            <span>到付</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：月结
          </div>
          <a @click="gotoPage('/finance/accountsReceivable/month', 'FINANCE_RECLIST5')">
            <i class="flowicon1 yj"></i><br>
            <span>月结</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：回单付
          </div>
          <a @click="gotoPage('/finance/accountsReceivable/receipt', 'FINANCE_RECLIST4')">
            <i class="flowicon1 hdf"></i><br>
            <span>回单付</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：异动费用
          </div>
          <a @click="gotoPage('/finance/accountsReceivable/abnormal', 'FINANCE_RECLIST6')">
            <i class="flowicon1 ydfy"></i><br>
            <span>异动费用</span>
          </a>
        </el-tooltip>
      </div>
      <div class="finace_flow_item2">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：实际提货费
          </div>
          <a @click="gotoPage('./accountsPayable/waybill/ticket', 'SHIP_PAYLIST3')">
            <i class="flowicon1 sjthf"></i><br>
            <span>实际提货费</span>
          </a>
        </el-tooltip>
        
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：中转费
          </div>
          <a @click="gotoPage('./accountsPayable/waybill/transfer', 'SHIP_PAYLIST2')">
            <i class="flowicon1 zzf"></i><br>
            <span>中转费</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：回扣
          </div>
          <a @click="gotoPage('./accountsPayable/waybill/kickback', 'SHIP_PAYLIST1')">
            <i class="flowicon1 hk"></i><br>
            <span>回扣</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：异动费用
          </div>
          <a @click="gotoPage('/finance/accountsPayable/waybill/unusual', 'SHIP_PAYLIST4')">
            <i class="flowicon1 ydfy"></i><br>
            <span>异动费用</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：异常理赔
          </div>
          <a @click="gotoPage('/finance/accountsPayable/waybill/abnormal', 'SHIP_PAYLIST5')">
            <i class="flowicon1 ycpl"></i><br>
            <span>异常理赔</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：其他费支出
          </div>
          <a @click="gotoPage('./accountsPayable/waybill/other', 'SHIP_PAYLIST6')">
            <i class="flowicon1 qtfzc"></i><br>
            <span>其他费支出</span>
          </a>
        </el-tooltip>
      </div>
      <div class="finace_flow_item3">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：发车汇总
          </div>
          <a @click="gotoPage('./accountsPayable/batch/truckAll', 'PAY_LOADLIST3')">
            <i class="flowicon1 fchz"></i><br>
            <span>发车汇总</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：到车汇总
          </div>
          <a @click="gotoPage('./accountsPayable/batch/arrivalAll', 'PAY_LOADLIST4')">
            <i class="flowicon1 dchz"></i><br>
            <span>到车汇总</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：整车保险费
          </div>
          <a @click="gotoPage('./accountsPayable/batch/insurance', 'PAY_LOADLIST5')">
            <i class="flowicon1 zcbxf"></i><br>
            <span>整车保险费</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：发站装卸费
          </div>
          <a @click="gotoPage('./accountsPayable/batch/stationLoad', 'PAY_LOADLIST6')">
            <i class="flowicon1 fczxf"></i><br>
            <span>发站装卸费</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：发站其他费
          </div>
          <a @click="gotoPage('./accountsPayable/batch/stationOther', 'PAY_LOADLIST7')">
            <i class="flowicon1 fzqtf"></i><br>
            <span>发站其他费</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：到站装卸费
          </div>
          <a @click="gotoPage('./accountsPayable/batch/arriveLoad', 'PAY_LOADLIST8')">
            <i class="flowicon1 dzzxf"></i><br>
            <span>到站装卸费</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：到站其他费
          </div>
          <a @click="gotoPage('./accountsPayable/batch/arrivalOther', 'PAY_LOADLIST9')">
            <i class="flowicon1 dzqtf"></i><br>
            <span>到站其他费</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：短驳费
          </div>
          <a @click="gotoPage('/finance/accountsPayable/batch/short', 'PAY_LOAD')">
            <i class="flowicon1 dbf"></i><br>
            <span>短驳费</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：送货费
          </div>
          <a @click="gotoPage('./accountsPayable/batch/deliver', 'PAY_LOADLIST2')">
            <i class="flowicon1 shf"></i><br>
            <span>送货费</span>
          </a>
        </el-tooltip>
      </div>
      <div class="finace_flow_item4">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：货款到账
          </div>
          <a @click="gotoPage('/finance/payment/accept', 'FINANCE_AGENCYFUND3')">
            <i class="flowicon1 hkdz"></i><br>
            <span>货款到账</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：货款发放
          </div>
          <a @click="gotoPage('/finance/payment/grant', 'FINANCE_AGENCYFUND4')">
            <i class="flowicon1 hkff"></i><br>
            <span>货款发放</span>
          </a>
        </el-tooltip>
      </div>
      <div class="finace_flow_item5">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：货款回收
          </div>
          <a @click="gotoPage('/finance/payment/recycle', 'FINANCE_AGENCYFUND1')">
            <i class="flowicon1 hkhs"></i><br>
            <span>货款回收</span>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：货款汇款
          </div>
          <a @click="gotoPage('/finance/payment/send', 'FINANCE_AGENCYFUND2')">
            <i class="flowicon1 hkhk"></i><br>
            <span>货款汇款</span>
          </a>
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
    gotoPage (path, code) {
      if (code) {
       if (!this.$_has_permission(code) ){
        this.$message.warning('您没有权限，请联系管理员！')
        this.$router.push({path: '/'})
        return false
       }
      }
      this.$router.push({path: path})
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
          width: 16.5%;
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
