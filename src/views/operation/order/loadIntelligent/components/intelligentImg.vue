<template>
  <div class="order_img">
    <!--<input type="text" @click="openInteligent" placeholder="点击跳转">-->
    <div @click="openInteligent" class="showImg" :class="{'stopAni': stopani}" @animationend="stopani = true">
      <div class="car">
        <img src="../../../../../../src/assets/load/ani/che.png" alt="" />
        <span class="kuai1"></span>
        <span class="kuai2"></span>
        <span class="kuai3"></span>
        <span class="kuai4"></span>
        <span class="kuai5"></span>
        <span class="kuai6"></span>
        <span class="kuai7"></span>
        <span class="kuai8"></span>
        <span class="kuai9"></span>
        <span class="kuai10" @animationend="openInteligent"></span>
      </div>
        <span class="yinying"></span>
      <span class="lunzi lunzi1"></span>
      <span class="lunzi lunzi2"></span>
      <span class="lunzi lunzi3"></span>
      
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        sendIndex: [],
        stopani: false,
        click: false
      }
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ])
    },
    mounted() {
      this.sendIndex = this.$route.query.sendDate
      // console.log(this.$route.query, '路由跳转')
      // this.searchQuery.vo.memberId = this.$route.query.id
    },
    methods: {
      openInteligent() {
          this.$router.push(
            {
              path: '/operation/order/loadIntelligent/index',
              query: {
                tab: '智能配载',
                orgId: this.$route.query.orgId,
                sendDate: this.$route.query.sendData
              }
            },
          )
          this.eventBus.$emit('closeCurrentView')
      }
    }
  }
</script>

<style lang="scss">
  .order_img {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: url(../../../../../assets/load/ani/bgr.png) repeat-x 0 0;
    input {
      display: block;
    }
    .showImg {
      width: 917px;
      height: 366px;
      position: absolute;
      top: 50%;
      margin-top: -184px;
      left: 50%;
      margin-left: -458px;
      animation: movein 3s linear;


      img {
        display: block;
        width: 100%;
        height: 100%;        
      }
      span{
        position: absolute;
      }
    }
    .stopAni{
      .car{
        animation: shakeit 1s ease;
      }
      
      .lunzi1,.lunzi2,.lunzi3{
        animation-play-state: paused;
      }
      .kuai1,.kuai2,.kuai3,.kuai4,.kuai5,.kuai6,.kuai7,.kuai8,.kuai9,.kuai10{
        animation-play-state: running;
      }
    }
    .lunzi{
      width: 98px;
      height: 98px;
    }
    .lunzi1{
      width: 97px;
      height: 97px;
      background: url(../../../../../assets/load/ani/lun1.png) no-repeat 0 0;
      left: 88px;
      top: 270px;
      animation: roll 1s linear reverse infinite;
    }
    .lunzi2{
      background: url(../../../../../assets/load/ani/lun2.png) no-repeat 0 0;
      top: 270px;
      left: 561px;
      animation: roll 1s linear reverse infinite;
    }
    .lunzi3{
      background: url(../../../../../assets/load/ani/lun3.png) no-repeat 0 0;
      top: 270px;
      left: 666px;
      animation: roll 1s linear reverse infinite;
    }
    .kuai1{
      background: url(../../../../../assets/load/ani/1.png) no-repeat 0 0;
      left: 250px;
      top: 165px;
      width: 134px;
      height: 63px;
      animation: kuai1 1s 1s ease paused backwards;
    }
    .kuai2{
      background: url(../../../../../assets/load/ani/2.png) no-repeat 0 0;
      left: 250px;
      top: 25px;
      width: 134px;
      height: 134px;
      animation: kuai1 .8s 2s ease paused backwards;
    }
    .kuai3, .kuai9{
      background: url(../../../../../assets/load/ani/3.png) no-repeat 0 0;
      left: 392px;
      top: 96px;
      width: 135px;
      height: 132px;
      animation: kuai1 .6s 2.8s ease paused backwards;
    }
    .kuai4{
      background: url(../../../../../assets/load/ani/4.png) no-repeat 0 0;
      left: 321px;
      top: 25px;
      width: 278px;
      height: 63px;
      animation: kuai1 .6s 3.2s ease paused backwards;
    }
    .kuai5{
      background: url(../../../../../assets/load/ani/5.png) no-repeat 0 0;
      left: 535px;
      top: 96px;
      width: 135px;
      height: 132px;
      animation: kuai1 .6s 3.8s ease paused backwards;
    }
    .kuai6, .kuai7{
      background: url(../../../../../assets/load/ani/6.png) no-repeat 0 0;
      left: 607px;
      top: 96px;
      width: 63px;
      height: 63px;
      animation: kuai2 .4s 4.2s ease paused backwards;
    }
    .kuai7{
      left: 679px;
      top: 165px;
      animation: kuai2 .4s 4.3s ease paused backwards;
    }
    

    .kuai8{
      background: url(../../../../../assets/load/ani/8.png) no-repeat 0 0;
      left: 607px;
      top: 25px;
      width: 135px;
      height: 134px;
      animation: kuai2 .4s 4.6s ease paused backwards;
    }

    .kuai9{
      top: 96px;
      left: 750px;
      animation: kuai2 1s 5s ease paused backwards;
    }

    .kuai10{
      background: url(../../../../../assets/load/ani/10.png) no-repeat 0 0;
      left: 750px;
      top: 25px;
      width: 134px;
      height: 63px;
      animation: kuai2 1s 5.4s ease paused backwards;
    }
    .yinying{
      background: url(../../../../../assets/load/ani/shadow.png) no-repeat 0 0;
      width: 925px;
      height: 93px;
      left: -4px;
      bottom: -56px;
    }

  }
  @keyframes roll{
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  @keyframes movein{
    0%{
      transform: translate(100%, 0);
    }
    100%{
      transform: translate(0, 0);
    }
  }
  @keyframes shakeit{
    0%{
      transform: rotate(0deg);
    }
    30%{
      transform: rotate(-2deg);
    }
    60%{
      transform: rotate(1deg);
    }
    80%{
      transform: rotate(-1deg);
    }
    100%{
      transform: rotate(0deg);
    }
  }
  @keyframes kuai1{
    0%{
      transform: translate(400px, 200px) rotate(720deg);
      opacity: 0;
    }
    100%{
      transform: translate(0, 0) rotate(0deg);
      opacity: 1;
    }
  }
  @keyframes kuai2{
    0%{
      transform: translate(-200px, 200px) rotate(720deg);
      opacity: 0;
    }
    100%{
      transform: translate(0, 0) rotate(0deg);
      opacity: 1;
    }
  }
</style>
