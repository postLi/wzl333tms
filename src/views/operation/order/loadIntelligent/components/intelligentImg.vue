<template>
  <div class="order_img">
    <!--<input type="text" @click="openInteligent" placeholder="点击跳转">-->
    <div class="showImg" @click="openInteligent" :class="{'stopAni': httpani&&stopani}" @animationend="stopani = true">
      <div class="car">
        <img src="../../../../../../src/assets/load/ani/che.png" alt=""  />
        <span class="kuai1" ></span>
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
      <ol class="message"  @animationstart="stopLoad">
        <li>1.正在启动AI大脑...</li>
        <li>2.系统正在从库存中挑单...</li>
        <li>3.系统正在计算单车毛利最大化...</li>
        <li>4.系统正在计算装货优先级...</li>
        <li>5.已计算完成:3 2 1</li>
      </ol>
    </div>
  </div>
</template>
<script>
import { getIntnteInit } from '@/api/operation/arteryDepart'
export default {
  data() {
    return {
      sendIndex: [],
      stopani: false,
      click: false,
      httpani: false,
      httpend: false,
      sendRoute: {},
      errorMessage: ''
    }
  },
  computed: {

  },
  watch: {
    httpend() {
      this.stopLoad()
    },
    stopani() {
      this.stopLoad()
    }
  },
  mounted() {
    this.sendIndex = this.$route.query.sendData

    // console.log(this.$route.query, '路由跳转')
    // this.searchQuery.vo.memberId = this.$route.query.id
    this.infoData()
  },
  methods: {
    infoData() {
      const obj = JSON.parse(this.$route.query.sendData)
      this.sendRoute.orgId = this.$route.query.orgId
      this.sendRoute.standCar = obj.map((item, val) => {
        return { id: item.cid, spri: item.price }
      })
      return getIntnteInit(this.sendRoute).then(data => {
        if (data) {
          this.httpani = true
          this.httpend = false
        }
      }).catch(err => {
        this.httpend = true
        this.errorMessage = err.errorInfo || err.text || '发生未知错误！'
      })
    },
    stopLoad() { // 请求失败时跳转到普通配载
      if (this.httpend && this.stopani) {
        this.$message.error(this.errorMessage)
        setTimeout(() => {
          this.eventBus.$emit('closeCurrentView')
          if(this.errorMessage === '无可智能配载的库存信息') {
            this.$router.push({ path: '/operation/order/load', query: {loadTypeId: 39, tab: '新增配载'} })
          }else {
            this.$router.push({ path: '/operation/order/arteryDepart' })
          }
          
        }, 2000)
      }
    },
    openInteligent() {
      this.eventBus.$emit('replaceCurrentView', {
        path: '/operation/order/loadIntelligent/index',
        query: {
          tab: '智能配载',
          orgId: this.$route.query.orgId,
          sendDate: this.$route.query.sendData
        }
      })
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
  background: url(../../../../../assets/load/ani/bgr.png) repeat-x 0 0 rgb(1, 61, 188);
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
    animation: movein 2s linear;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    span {
      position: absolute;
    }
  }
  .stopAni {
    .car {
      animation: shakeit 1s ease;
    }
    .message li{
      animation-play-state: running !important;
    }

    .lunzi1,
    .lunzi2,
    .lunzi3 {
      animation-play-state: paused;
    }
    li,
    .kuai1,
    .kuai2,
    .kuai3,
    .kuai4,
    .kuai5,
    .kuai6,
    .kuai7,
    .kuai8,
    .kuai9,
    .kuai10 {
      animation-play-state: running;
    }
  }
  .lunzi {
    width: 98px;
    height: 98px;
  }
  .lunzi1 {
    width: 97px;
    height: 97px;
    background: url(../../../../../assets/load/ani/lun1.png) no-repeat 0 0;
    left: 88px;
    top: 270px;
    animation: roll 1s linear reverse infinite;
  }
  .lunzi2 {
    background: url(../../../../../assets/load/ani/lun2.png) no-repeat 0 0;
    top: 270px;
    left: 561px;
    animation: roll 1s linear reverse infinite;
  }
  .lunzi3 {
    background: url(../../../../../assets/load/ani/lun3.png) no-repeat 0 0;
    top: 270px;
    left: 666px;
    animation: roll 1s linear reverse infinite;
  }
  .kuai1 {
    background: url(../../../../../assets/load/ani/1.png) no-repeat 0 0;
    left: 250px;
    top: 165px;
    width: 134px;
    height: 63px;
    animation: kuai1 1s 1s ease paused backwards;
  }
  .kuai2 {
    background: url(../../../../../assets/load/ani/2.png) no-repeat 0 0;
    left: 250px;
    top: 25px;
    width: 134px;
    height: 134px;
    animation: kuai1 .8s 2s ease paused backwards;
  }
  .kuai3,
  .kuai9 {
    background: url(../../../../../assets/load/ani/3.png) no-repeat 0 0;
    left: 392px;
    top: 96px;
    width: 135px;
    height: 132px;
    animation: kuai1 .6s 2.8s ease paused backwards;
  }
  .kuai4 {
    background: url(../../../../../assets/load/ani/4.png) no-repeat 0 0;
    left: 321px;
    top: 25px;
    width: 278px;
    height: 63px;
    animation: kuai1 .6s 3.2s ease paused backwards;
  }
  .kuai5 {
    background: url(../../../../../assets/load/ani/5.png) no-repeat 0 0;
    left: 535px;
    top: 96px;
    width: 135px;
    height: 132px;
    animation: kuai1 .6s 3.8s ease paused backwards;
  }
  .kuai6,
  .kuai7 {
    background: url(../../../../../assets/load/ani/6.png) no-repeat 0 0;
    left: 607px;
    top: 96px;
    width: 63px;
    height: 63px;
    animation: kuai2 .4s 4.2s ease paused backwards;
  }
  .kuai7 {
    left: 679px;
    top: 165px;
    animation: kuai2 .4s 4.3s ease paused backwards;
  }


  .kuai8 {
    background: url(../../../../../assets/load/ani/8.png) no-repeat 0 0;
    left: 607px;
    top: 25px;
    width: 135px;
    height: 134px;
    animation: kuai2 .4s 4.6s ease paused backwards;
  }

  .kuai9 {
    top: 96px;
    left: 750px;
    animation: kuai2 1s 5s ease paused backwards;
  }

  .kuai10 {
    background: url(../../../../../assets/load/ani/10.png) no-repeat 0 0;
    left: 750px;
    top: 25px;
    width: 134px;
    height: 63px;
    animation: kuai2 1s 5.4s ease paused backwards;
  }
  .yinying {
    background: url(../../../../../assets/load/ani/shadow.png) no-repeat 0 0;
    width: 925px;
    height: 93px;
    left: -4px;
    bottom: -56px;
  }
  .message {
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -100px;
    margin-top: 20px;
    width: 300px;
    li {
      line-height: 36px;
      color: #fff;
      font-size: 18px;
    }
    
    li:nth-child(1) {
      animation: messageMove 1s 0.5s ease backwards paused;
    }
    li:nth-child(2) {
      animation: messageMove 1s 1s ease backwards paused;
    }
    li:nth-child(3) {
      animation: messageMove 1s 3s ease backwards paused;
    }
    li:nth-child(4) {
      animation: messageMove 1s 4s ease backwards paused;
    }
    li:nth-child(5) {
      animation: messageMove 1s 5s ease backwards paused;
    }
  }
}

@keyframes messageMove {
  0% {
    transform: translate(100%, 0);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes movein {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes shakeit {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(-2deg);
  }
  60% {
    transform: rotate(1deg);
  }
  80% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes kuai1 {
  0% {
    transform: translate(400px, 200px) rotate(720deg);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes kuai2 {
  0% {
    transform: translate(-200px, 200px) rotate(720deg);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
}

</style>
