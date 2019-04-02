<template>
  <div class="avatar-container">
    <el-popover ref="popoveruser" placement="bottom-end" @show="showChart" @hide="hideChart" :popper-options="{'preventOverflow.padding': 0}" width="360" popper-class="popoveruser" trigger="hover">
      <el-row>
        <el-col :span="8" class="popoveruser-avatar">
          <img class="user-avatar" :src="avatar">
        </el-col>
        <el-col :span="16">
          <div class="popoveruser_info_lyy">
            <p>{{ otherinfo.name }} <img :src="vipIcon" v-if="otherinfo.openAccountType===1"></p>
            <p>{{ company }}</p>
            <p v-show="otherinfo.associatedUsername">当前环境：{{otherinfo.isTest===0?'正式环境':'体验环境'}}
              <br>
              <el-button type="primary" @click="changeView" size="mini" plain>切换{{otherinfo.isTest===0?'体验账号':'到正式账号'}}</el-button>
            </p>
            <el-button type="success" slot="reference" size="mini" v-if="canSwitch" plain @click="handleSwitchUser">切换其他账户</el-button>
            <p>
            <el-button v-if="isExperience" @click="handleReal" type="danger" size="mini" plain>切换到正式账号</el-button>
            </p>
          </div>
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
      <iframe src="about:blank" v-if="showit" :class="{popperHide: popperHide}" frameborder="0"></iframe>
    </el-popover>
    <div class="avatar-wrapper" v-popover:popoveruser>
      <img class="user-avatar" :src="avatar">
      <span class="user-name">{{ otherinfo.name }}</span>
    </div>
    <UsersTree :popVisible="usersVisible" @close="usersVisible = false"></UsersTree>
    <ExperienceForm :popVisible="experienceVisible" @close="experienceVisible = false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UsersTree from '@/components/usersTree'
import ExperienceForm from '@/components/experienceForm'
export default {
  computed: {
    ...mapGetters([
      'avatar',
      'company'
    ]),
    canSwitch() {
      const switchUser = this.otherinfo.systemSetup.switchUser ? this.otherinfo.systemSetup.switchUser : { canSwitch: '0' }
      return switchUser ? (switchUser.canSwitch === '1') : false
    }
  },
  components: {
    UsersTree,
    ExperienceForm
  },
  mounted() {
    var agnt = navigator.userAgent.toLowerCase()
    if (agnt.indexOf('msie') > 0 || agnt.indexOf('trident') > 0) {
      this.showit = true
    }
  },
  data() {
    return {
      experienceVisible: false,
      isExperience: false,
      popperHide: false,
      showit: false,
      usersVisible: false,
      vipIcon: require('../../../assets/vip.png')
    }
  },
  methods: {
    handleReal() {
      this.experienceVisible = true
    },
    handleSwitchUser() { // 切换账户
      this.usersVisible = true
    },
    showChart() {
      this.isExperience = sessionStorage.getItem('TMS_experience_system') === 'yes'
      console.log('show prop',this.isExperience, sessionStorage.getItem('TMS_experience_system'))

      this.popperHide = false
      this.eventBus.$emit('hideSupcanChart')
    },
    hideChart() {
      this.popperHide = true
      this.eventBus.$emit('showSupcanChart')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      }).catch((err) => {
        location.reload()
      })
    },
    lockScreen() {
      this.$store.dispatch('LockScreen')
    },
    changeLogin(loginForm) {
      this.$store.dispatch('Login', loginForm).then(() => {
          location.href = '/'
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    changeView() {
      if (this.otherinfo.isTest === 0 && typeof this.otherinfo.associatedUsername === 'string') {
        const loginFormTest = {
          username: this.otherinfo.associatedUsername,
          password: this.otherinfo.username + '#test#' + this.otherinfo.orgid
        }
        this.changeLogin(loginFormTest) // 切换到测试环境
      } else if (this.otherinfo.isTest === 1 && typeof this.otherinfo.associatedUsername === 'string') {
        this.logout()
      }
    }
  }
}

</script>
<style lang="scss">
@import "src/styles/variate.scss";
.navbar {
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

    &::before {
      position: absolute;
      content: '';
      top: ($topNavHeight - 20px) / 2;
      height: 20px;
      width: 1px;
      background: #eee;
      left: 0;
    }

    &:hover {
      background: rgba(255, 255, 255, .1);
    }

    .avatar-wrapper {
      cursor: pointer;
      position: relative;

      .user-avatar {
        width: 36px;
        height: 36px;
        margin-right: 12px;
      }

      .user-name {
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

.popoveruser {
  padding: 10px 0 0;
  .popoveruser_info_lyy {
    p {
      line-height: 32px;
      font-size: 16px;
    }
    img {
      width: 15px;
      vertical-align: middle;
    }
  }
  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
}

.popoveruser-avatar {
  text-align: center;
  .user-avatar {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    border: 2px solid #42485B;
  }
}

.popover-btns {
  margin-top: 20px;
  text-align: center;
}

</style>
