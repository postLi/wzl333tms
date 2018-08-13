<template>
  <div class="avatar-container">
    <el-popover
      ref="popoveruser"
      placement="bottom-end"
      :popper-options="{'preventOverflow.padding': 0}"
      width="360"
      @show="hideIframe"
      @hide="showIframe"
      popper-class="popoveruser"
      trigger="hover">
      <el-row>
        <el-col :span="8" class="popoveruser-avatar">
          <img class="user-avatar" :src="avatar">
        </el-col>
        <el-col :span="16">
          {{ otherinfo.name }}
          <br>
          <br>
          <br>
          <br>
          {{ company }}
        </el-col>
        <el-col class="popover-btns" :span="24">
          <el-button-group>
            <router-link to="/company/myinfo">
            <el-button type="primary" icon="el-icon-info">我的信息</el-button>
            </router-link>
            <el-button type="primary" @click="lockScreen" icon="el-icon-news">锁定屏幕</el-button>
            <el-button type="primary" @click="logout" icon="el-icon-circle-close-outline">退出登录</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-popover>
    <div class="avatar-wrapper" v-popover:popoveruser>
      <img class="user-avatar" :src="avatar">
      <span class="user-name">{{ otherinfo.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'avatar',
      'company'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()  // 为了重新实例化vue-router对象 避免bug
      })
    },
    lockScreen() {
      this.$store.dispatch('LockScreen')
    },
    hideIframe() {
      if (document.getElementById('senderIframe')) {
        console.log('iframe:', document.getElementById('senderIframe').contentWindow)
        document.getElementById('senderIframe').contentWindow.hideChart(true)
      }
    },
    showIframe() {
      if (document.getElementById('senderIframe')) {
        console.log('iframe:', document.getElementById('senderIframe').contentWindow)
        document.getElementById('senderIframe').contentWindow.hideChart(false)
      }
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/variate.scss";
  .navbar{
    .user-avatar {
        border-radius: 50%;
        vertical-align: middle;
      }
    .avatar-container {
      padding: 0 23px 0 30px;
      height: $topNavHeight;
      float: right;
      white-space: nowrap;
      position: relative;

      &::before{
        position: absolute;
        content: '';
        top: ($topNavHeight - 20px) / 2;
        height: 20px;
        width: 1px;
        background: #eee;
        left: 0;
      }

      &:hover{
        background: rgba(255, 255, 255, .1);
      }

      .avatar-wrapper {
          cursor: pointer;
          position: relative;
          
          .user-avatar{
            width: 36px;
            height: 36px;
            margin-right: 12px;
          }
          
          .user-name{
            display: inline-block;
            max-width: $topNavFontSize * 4;
            color: #fff;
            line-height: $topNavHeight;
            vertical-align: middle;
            text-overflow: ellipsis;
            overflow: hidden;
          }
      }
    }
  }
  .popoveruser{
    padding: 10px 0 0;
  }
  .popoveruser-avatar{
    text-align: center;
    .user-avatar{
      border-radius: 50%;
      width: 80px;
      height: 80px;
      border: 2px solid #42485B;
    }
  }
  .popover-btns{
    margin-top: 20px;
    text-align: center;
  }
</style>
