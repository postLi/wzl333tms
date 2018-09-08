<template>
  <div class="order_img">
    <!--<input type="text" @click="openInteligent" placeholder="点击跳转">-->
    <div class="showImg">
      <img src="../../../../../../src/assets/icom/lll-ntelligent.jpg" alt="" @click="openInteligent"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        sendIndex:[]
      }
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ])
    },
    mounted() {
      this.sendIndex = this.$route.query.sendDate
      console.log(this.$route.query, '路由跳转')
      // this.searchQuery.vo.memberId = this.$route.query.id
    },
    methods: {
      openInteligent() {
        this.$router.push(
          {
            path: '/operation/order/loadIntelligent/index',
            query: {
              tab: '智能配载',
              sendDateT: this.$route.query.sendDate
            }
          },
        )
      }
    }
  }
</script>

<style lang="scss">
  .order_img {
    input {
      display: block;
    }
    .showImg {
      display: inline-block;
      width: 80%;
      height: 750px;
      img {
        display: inline-block;
        width: 80%;
        height: 100%;
      }
    }

  }
</style>
