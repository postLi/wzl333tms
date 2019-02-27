<template>
  <div class="dashboard-container">
    <div class="operation_flow">
      <div class="operation_flow_item">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：安排车辆上门提货
          </div>
          <a @click="gotoPage('./order/pickUp', 'ORDER_PICK')">
            <i class="flowicon tihuo"></i>
            <p>提货</p>
          </a>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            功能：发货方，承运方之间的凭证
          </div>
          <a @click="gotoPage('./order/createOrder', 'ORDER_MADD')">
            <i class="flowicon daoru"></i>
            <p>开单</p>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：把同个区域不同网点收的货物配载到分拨中心，进行干线配载
          </div>
          <a @click="gotoPage('./order/shortDepart/arrival', 'LOAD_DBARRIVAL')">
            <i class="flowicon duanbo"></i>
            <p>短驳接收</p>
          </a>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            功能：接收其他网点发运到本网点的货物，以车为单位
          </div>
          <a @click="gotoPage('./order/arteryDelivery', 'GX_ARRIVE_LIST')">
            <i class="flowicon daohuo"></i>
            <p>干线到车</p>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：开单收货，网点到货形成库存
          </div>
          <a @click="gotoPage('./order/repertory/allrepertory', 'ORDER_REPER')">
            <i class="flowicon kucun"></i>
            <p>库存管理</p>
          </a>
        </el-tooltip>
      </div>
      <div class="operation_flow_item">
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：把货物转运给分拨中心
          </div>
          <a @click="gotoPage('./order/shortDepart/deliver', 'ORDER_SHORT')">
            <i class="flowicon duobofache"></i>
            <p>短驳发车</p>
          </a>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            功能：在公司网点间走货运输
          </div>
          <a @click="gotoPage('./order/arteryDepart', 'ORDER_ARTER')">
            <i class="flowicon peizai"></i>
            <p>干线发车</p>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：目的网点对需要送货上门的运单安排送货
          </div>
          <a @click="gotoPage('./order/deliverManage', 'ORDER_DELIVER')">
            <i class="flowicon songhuosm"></i>
            <p>送货上门</p>
          </a>
        </el-tooltip>
        <el-tooltip placement="top">
          <div slot="content">
            功能：将运单转给第三方承运商
          </div>
          <a @click="gotoPage('./order/transferLoad', 'TRANSFER_INSERT')">
            <i class="flowicon zhongzhuan"></i>
            <p>中转外发</p>
          </a>
        </el-tooltip>
        <el-tooltip placement="bottom">
          <div slot="content">
            功能：对自提，送货上门，中转外发运单进行签收
          </div>
          <a @click="gotoPage('./order/sign/Pick', 'ORDERSIGN1')">
            <i class="flowicon qianshou"></i>
            <p>签收管理</p>
          </a>
        </el-tooltip>
      </div>
      <div class="operation_flow_item">
        <div class="operation_flow_foot_left">
          <el-tooltip placement="bottom">
            <div slot="content">
              功能：对目的网点寄回的回单做接收
            </div>
            <a @click="gotoPage('/operation/order/receipt/Accept', 'RECEIPT3')">
              <i class="flowicon jieshou"></i>
              <p>回单接收</p>
            </a>
          </el-tooltip>
          <el-tooltip placement="bottom">
            <div slot="content">
              功能：开单网点把回单发放给客户
            </div>
            <a @click="gotoPage('/operation/order/receipt/Grant', 'RECEIPT4')">
              <i class="flowicon fafang"></i>
              <p>回单发放</p>
            </a>
          </el-tooltip>
        </div>
        <div class="operation_flow_foot_right">
          <el-tooltip placement="bottom">
            <div slot="content">
              功能：从收货人处回收回单
            </div>
            <a @click="gotoPage('/operation/order/receipt/Recycle', 'RECEIPT1')">
              <i class="flowicon huishou"></i>
              <p>回单回收</p>
            </a>
          </el-tooltip>
          <el-tooltip placement="bottom">
            <div slot="content">
              功能：目的网点把回单寄到开单网点
            </div>
            <a @click="gotoPage('/operation/order/receipt/Send', 'RECEIPT2')">
              <i class="flowicon jichu"></i>
              <p>回单寄出</p>
            </a>
          </el-tooltip>
        </div>
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
.dashboard {
  &-container {
    padding: 30px;
  }
}

.operation_flow {
  // width: 1178px;
  width: 1228px;
  height: 752px;
  margin: 53px auto 0;
  // background-image: url("../../assets/flow/operation.png");
  background-image: url("../../assets/flow/index2.png");
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  .operation_flow_item {
    height: 210px;
    width: 83%;
    margin: 0 0 40px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 70px 100px 60px;
    text-align: center;
    font-size: 14px;
    color: #666;
  }
  .operation_flow_foot_right,
  .operation_flow_foot_left {
    width: 28%;
    height:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .operation_flow_foot_left {
    margin: 40px 0 0 40px;
  }
  .operation_flow_foot_right {
    margin: 40px 50px 0 0px;
  }
}

.flowicon {
  transition: 0.5s;
}

.flowicon:hover {
  transform: scale(1.2);
  transition: 0.3s;
}

</style>
