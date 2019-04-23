<template>
  <section class="app-main">
    <!-- <transition name="fade" mode="out-in"> -->
    <el-alert v-if="isShowtips" show-icon :title="msg" type="warning" close-text="关闭" class="warnalert">
      <router-link to="/checklist/index" v-if="isCodeCheck">系统体检</router-link>
      <el-checkbox v-model="noTips" @change="updatePrompt">不再提示</el-checkbox>
    </el-alert>
    <keep-alive :include="cachedViews">
      <!-- <keep-alive> -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </keep-alive>
    <!-- </transition> -->
  </section>
</template>
<script>
import { getInitializationCheck } from '@/api/common'
import { checkPrompt, updatePrompt } from '@/api/login'

export default {
  name: 'AppMain',
  data() {
    return {
      noTips: false,
      isShowtips: false,
      isCodeCheck: false,
      msg: '您的系统基本信息还没有维护，为了保证系统正常使用，请尽快维护，点击进入'
    }
  },
  computed: {
    cachedViews() {
      console.log('this.$store.state.tagsView.cachedViews', this.$store.state.tagsView.cachedViews)
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      // 暂时缓存这个
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    },
    iscompany() {
      return this.otherinfo.orgid === this.otherinfo.companyId
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.isCodeCheck = this.$_has_permission('HOME_PAGE_2')
      this.msg = this.isCodeCheck ? this.$options.data().msg : '您的系统基本信息还没有维护，为了保证系统正常使用，您没有权限，请联系管理员！'
      if (this.otherinfo.firstLogin === 1) { // 第一次登录的创建者要进入【系统检测页面】
        this.$router.push({ path: '/checklist/index' })
      } else {
        this.checkPrompt()
      }
    },
    checkPrompt() {
      checkPrompt().then(data => {
          this.isShowtips = data
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    updatePrompt() {
      updatePrompt().then(data => {
          this.isShowtips = false
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    }
  }
}

</script>
<style lang="scss">
.hideSidebar {
  .warnalert {
    position: fixed;
    width: calc(100% - 50px);
    z-index: 3;
    
  }
}

.warnalert {
  position: fixed;
  width: calc(100% - 165px);
  z-index: 3;
  opacity: 0.9;
  a{
    color: #409eff;
    font-size: 14px;
    margin-left: 5px;
  }
  .el-checkbox {
    position: absolute;
    right: 70px;
    top: 15px;
  }
  .el-alert__closebtn {
    margin-top: 10px;
  }
  .el-alert__closebtn,
  .el-checkbox__label {
    color: #409eff;
  }
}

</style>
