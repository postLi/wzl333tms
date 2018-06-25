<template>
  <div class="transferTable">
    <!-- 穿梭框 -->
    <div class="transferTable_header">
      <div class="transferTable_header_btn_direction">
        <el-button icon="el-icon-arrow-right" type="primary" circle :disabled="isShowLeft" size="mini" @click="doAction('showAllLeft')"></el-button>
        <el-button icon="el-icon-arrow-left" type="primary" circle :disabled="isShowRight"  size="mini" @click="doAction('showAllRight')"></el-button>
        <transition name="el-zoom-in-bottom">
          <el-button icon="el-icon-menu" type="primary" v-if="isShowReback" circle size="mini" @click="doAction('showReback')"></el-button>
        </transition>
      </div>
    </div>
    <div class="transferTable_content">
      <div class="transferTable_content_table paddingRight" :class="[isShowLeft ? 'showTableLeft' : (isShowRight? 'shortTableLeft':'')]">
        <slot name="tableLeft">左边表格区</slot>
      </div>
      <div class="transferTable_content_table" :class="[isShowRight ? 'showTableRight' : '']">
        <slot name="tableRight">右边表格区</slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowLeft: false,
      isShowRight: false,
      isShowReback: false
    }
  },
  methods: {
    doAction(type) {
      switch (type) {
        case 'showAllLeft': // 展开左边表格
          this.showAllLeft()
          break
        case 'showAllRight': // 展开右边表格
          this.showAllRight()
          break
        case 'showReback':
          this.showReback()
          break
      }
    },
    showAllLeft() {
      this.isShowLeft = true
      this.isShowRight = false
      this.isShowReback = true
      // console.log('展开左边表格')
    },
    showAllRight() {
      this.isShowLeft = false
      this.isShowRight = true
      this.isShowReback = true
      // console.log('展开右边表格')
    },
    showReback() {
      this.isShowReback = false
      this.isShowLeft = false
      this.isShowRight = false
    }
  }
}

</script>
<style lang="scss" scope>
.transferTable {
  width: 100%;
  margin-top: -10px;
  padding: 5px 0 0 0;
  height: calc(100% - 400px);
  .transferTable_header {
    margin: 10px 0 10px -5px;
    width: 100%;
    text-align: center;
    position: relative;
  }
  .transferTable_content {
    display: flex;
    flex-direction: row;
    height: 100%;
    .paddingRight {
      padding-right: 10px;
    }

    .transferTable_content_table {
      width: 50%;
      height: 100%;
      transition:0.5s;
      .el-table {
        table {
          width: 100%;
          th,
          td {
            text-align: center;
          }
        }
      }
      .el-table td,
      .el-table th {
        padding: 5px 0;
      }
    }
    .showTableLeft {
      width: calc(100% - 90px);
      transition: 0.5s;
    }
    .shortTableLeft {
      width: 112px;
      transition: 0.5s;
    }
    .showTableRight {
      width: calc(100%);
      transition: 0.5s;
    }
  }
}

</style>
