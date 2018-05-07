<template>
  <div class="avatar-container">
    <el-popover
      ref="popoveruser"
      placement="bottom-end"
      :popper-options="{'preventOverflow.padding': 0}"
      width="360"
      popper-class="popoveruser"
      trigger="hover">
      <el-row>
        <el-col :span="8" class="popoveruser-avatar">
          <img class="user-avatar" :src="avatar">
        </el-col>
        <el-col :span="16">
          {{ name }}
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
      <span class="user-name">{{ name }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'avatar',
      'name',
      'company'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()  // 为了重新实例化vue-router对象 避免bug
      })
    },
    lockScreen () {
      this.$store.dispatch('LockScreen')
    }
  }
}
</script>

<style lang="scss">
  .navbar{
    .user-avatar {
        border-radius: 50%;
        vertical-align: middle;
      }
    .avatar-container {
      width: 116px;
      padding: 0 5px;
      height: 50px;
      display: inline-block;
      white-space: nowrap;
      position: absolute;
      right: 118px;
      top: 0;

      &:hover{
        background: rgba(255, 255, 255, .1);
      }

      .avatar-wrapper {
          cursor: pointer;
          position: relative;
          
          .user-avatar{
            width: 40px;
            height: 40px;
          }
          
          .user-name{
            display: inline-block;
            max-width: 60px;
            color: #fff;
            line-height: 50px;
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
      border: 2px solid rgb(0, 151, 189);
    }
  }
  .popover-btns{
    margin-top: 20px;
    text-align: center;
  }
</style>
