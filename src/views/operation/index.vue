<template>
  <div class="dashboard-container">
    <div class="operation_flow">
      <div class="operation_flow_item">
        <router-link to="./order/pickUp">
          <i class="flowicon tihuo"></i>
          <p>提货</p>
        </router-link>
       <router-link to="./order/createOrder">
          <i class="flowicon daoru"></i>
          <p>开单</p>
        </router-link>
       <router-link to="./order/shortDepart">
          <i class="flowicon duanbo"></i>
          <p>短驳接收</p>
        </router-link>
       <router-link to="./order/arteryDelivery">
          <i class="flowicon daohuo"></i>
          <p>干线到车</p>
        </router-link>
       <router-link to="./order/repertory">
          <i class="flowicon kucun"></i>
          <p>库存管理</p>
        </router-link>
      </div>
      <div class="operation_flow_item">
       <router-link to="./order/shortDepart">
          <i class="flowicon duobofache"></i>
          <p>短驳发车</p>
       </router-link>
       <router-link to="./order/arteryDepart">
          <i class="flowicon peizai"></i>
          <p>干线发车</p>
       </router-link>
       <router-link to="./order/deliverManage">
          <i class="flowicon songhuosm"></i>
          <p>送货上门</p>
       </router-link>
       <router-link to="./order/transfer">
          <i class="flowicon zhongzhuan"></i>
          <p>中转外发</p>
       </router-link>
       <router-link to="./order/sign">
          <i class="flowicon qianshou"></i>
          <p>签收管理</p>
       </router-link>
      </div>
      <div class="operation_flow_item">
         <div class="operation_flow_foot_left">
        <router-link to="./order/receipt">
          <i class="flowicon jieshou"></i>
          <p>回单接收</p>
       </router-link>
        <router-link to="./order/receipt">
          <i class="flowicon fafang"></i>
          <p>回单发放</p>
       </router-link>
      </div>
      <div class="operation_flow_foot_right">
         <router-link to="./order/receipt">
          <i class="flowicon huishou"></i>
          <p>回单回收</p>
        </router-link>
         <router-link to="./order/receipt">
          <i class="flowicon jichu"></i>
          <p>回单接收</p>
        </router-link>
      </div>
      </div>


      <!-- <div class="operation_flow_item">
        <i class="flow_icon flow_icon_pickUp" @click="gotoPage('pickUp')"></i>
        <i class="flow_icon flow_icon_createOrder"></i>
        <i class="flow_icon flow_icon_shortArrival"></i>
        <i class="flow_icon flow_icon_arteryDelivery"></i>
        <i class="flow_icon flow_icon_arteryDepart"></i>
      </div>
      <div class="operation_flow_item">
        <i class="flow_icon flow_icon_pickUp" @click="gotoPage('pickUp')"></i>
        <i class="flow_icon flow_icon_createOrder"></i>
        <i class="flow_icon flow_icon_shortArrival"></i>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    gotoPage(type) {
      switch (type) {
        case 'pickUp':
          this.$router.push({ path: './order/pickUp' })
          console.log(this.$router)
          break
      }
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
  width: 1178px;
  height: 752px;
  margin: 53px auto 0;
  background-image: url("../../assets/flow/operation.png");
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
    padding:60px 100px;
    text-align:center;
    font-size:14px;
    color:#666;
  }
  .operation_flow_foot_right,
  .operation_flow_foot_left{
    width:28%;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .operation_flow_foot_left{
    margin: 50px 0 0 40px;
  }
  .operation_flow_foot_right{
    margin: 50px 50px 0 0px;

  }

  * {
    // display: none;
  }
}

.flowicon {
  // display: block;
  // width: 4em;
  // height: 4em;
  // background-size: 4em;
  // // background-color: yellow;
  // background-image: url("../../assets/flow/flowicon.png");
  transition:0.5s;
}
.flowicon:hover{
  transform: scale(1.2);
  transition: 0.3s;
}

// .flow_icon_pickUp {
//   background-position: 0em -22em;
// }

// .flow_icon_createOrder {
//   background-position: 0em -26em;
// }

// .flow_icon_shortArrival {
//   background-position: 0em -46em;
// }
// .flow_icon_arteryDelivery {
//   background-position: 0em -54em;
// }
// .flow_icon_arteryDepart{
//   background-position: 0em -58em;
// }
</style>
