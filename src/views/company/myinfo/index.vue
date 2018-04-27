<template>
  <div class="myinfo-panel">
    <el-row class="infopanel">
      <el-col :span="4">
        <div class="label">
         <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        </div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.personal.name }} <br>手机号{{ otherinfo.personal.mobile }}
      </el-col>
    </el-row>
    
    <el-row class="infopanel">
      <el-col :span="4">
        <div class="label">登录账户</div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.personal.username }}
      </el-col>

      <el-col :span="4">
        <div class="label">密码</div>
      </el-col>
      <el-col :span="20">
        *********** <el-button @click="showPop = true" type="text">修改密码</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4">
        <div class="label">公司</div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.company.name }}
      </el-col>

      <el-col :span="4">
        <div class="label">所属网点</div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.company.branch }}
      </el-col>

      <el-col :span="4">
        <div class="label">所属部门</div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.company.department }}
      </el-col>

      <el-col :span="4">
        <div class="label">职位</div>
      </el-col>
      <el-col :span="20">
        {{ otherinfo.company.position }}
      </el-col>
    </el-row>
    <ChangePwPop :isShow="showPop" @close="close" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangePwPop from './ChangePassword'

export default {
  name: 'myinfo',
  components: {
    ChangePwPop
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'company',
      'avatar',
      'otherinfo'
    ])
  },
  data () {
    return {
      showPop: false
    }
  },
  methods: {
    close () {
      this.showPop = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user-avatar{
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.myinfo-panel{
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  color: #444;
  line-height: 2;
}
.label{
  text-align: right;
  padding-right: 20%;
}
.infopanel{
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
</style>
