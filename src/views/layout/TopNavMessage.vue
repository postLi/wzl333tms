<template>
  <div class="topNav-message">
    <el-popover
      ref="popovermsg"
      placement="bottom-end"
      :popper-options="{'padding': 0}"
      width="360"
      :visible-arrow="false"
      popper-class="popovermsg"
      trigger="click">
      <el-row  class="msgbox-header">
        <el-col :span="16"><strong>消息中心</strong></el-col>
          <el-col :span="8"><el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="primary" icon="el-icon-setting"></el-button></el-col>
      </el-row>
      <el-row class="msgbox-body">
        <el-col :span="24">
          <ul>
            <li v-for="i in 10" :key="i">
              消息{{i}}
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-popover>
    <div class="avatar-wrapper" v-popover:popovermsg>
      <el-badge :value="1">
        <i class="el-icon-message"></i>
      </el-badge>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
.topNav-message{
  position: absolute;
  top: 0;
  right: 234px;
  width: 60px;
  text-align: center;
  padding-top: 17px;
  height: 50px;
  line-height: 16px;
  border: 1px solid #1B79B1;
  color:#fff;
  border-top: none;
  border-bottom: none;
  cursor: pointer;
  
}
.popovermsg{
  padding: 0;
}
.msgbox-header{
    background: #eee;
    line-height: 30px;
  }
  .msgbox-body{
    height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>

