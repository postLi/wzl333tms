<template>
  <div class="personal-wrapper">
    <div class="personal-btn" @click="openDialog">
      <img :src="personalIcon">
      <span>个性化设置</span>
    </div>
    <el-dialog
      title="个性化设置"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body 
      :close-on-click-modal="false"
      :before-close="closeMe">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      personalIcon: require('../../../assets/personal.png')
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    closeMe(done) {

    }
  }
}
</script>

<style lang="scss">
.personal-wrapper {
  padding: 15px 5px ;
  .personal-btn {
    background-color: rgba(64, 158, 255, 0.7);
    color: #fff;
    // position: absolute;
    // right: 0px;
    // bottom: 10px;
    // z-index: 200;
    text-align: center;
    // padding: 0px 5px;
    border-radius: 30px;
    // border-top-left-radius: 30px;
    // border-bottom-left-radius: 30px;
    cursor: pointer;
    font-size: 12px;
    &:hover{
      background-color: #42485B;
    }
    img {
      padding: 0;
      margin: 0;
      width: 28px;
      height: 28px;
      vertical-align: middle;
    }
  }
}
</style>
