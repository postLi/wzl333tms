<template>
  <div class="transferTable">
    <!-- 穿梭框 -->
    <div class="transferTable_header">
      <div class="transferTable_searchs">
        <div class="transferTable_fresh">
          <slot name="tableRefresh"></slot>
        </div>
        <slot name="tableSearch"></slot>
      </div>
      <div class="transferTable_header_btn_direction">
        <el-tooltip
          effect="dark"
          content="向左侧拉伸"
          placement="top-end"
        >
          <el-button
            icon="el-icon-arrow-right"
            type="primary"
            circle
            :disabled="isShowLeft"
            size="mini"
            @click="doAction('showAllLeft')"
            plain
          ></el-button>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="向右侧拉伸"
          placement="top-start"
        >
          <el-button
            icon="el-icon-arrow-left"
            type="primary"
            circle
            :disabled="isShowRight"
            size="mini"
            @click="doAction('showAllRight')"
            plain
          ></el-button>
        </el-tooltip>
        <transition name="el-zoom-in-bottom">
          <el-button
            icon="el-icon-refresh"
            type="primary"
            v-if="isShowReback"
            circle
            size="mini"
            @click="doAction('showReback')"
            plain
          ></el-button>
        </transition>
        <div class="transferTable_header_btn_box clearfix">
          <slot name="btnsBox"></slot>
        </div>
      </div>
    </div>
    <div class="transferTable_content">
      <div
        class="transferTable_content_table paddingRight"
        :class="[isShowLeft ? 'showTableLeft' : (isShowRight? 'shortTableLeft':'')]"
      >
        <slot name="tableLeft">左边表格区</slot>
      </div>
      <div
        class="transferTable_content_table"
        :class="[isShowRight ? 'showTableRight' : '']"
      >
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
      isShowReback: false,
      searchForm: ''
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
  height: calc(100% - 60px);
  .transferTable_header {
    margin-top: 10px;
    width: 100%;
    height: 42px;
    padding: 6px 0;
    text-align: center;
    position: relative;
    border: 2px solid #cdf;
    border-bottom: none;
    .transferTable_searchs {
      position: absolute;
      top: 0px;
      left: 0px; // background-color:gray;
      display: flex;
      flex-direction: row;
    }

    .transferTable_header_btn_direction {
      text-align: center;
      margin-left: -7px;
    }
    .transferTable_fresh {
      padding-top: 6px;
      padding-left: 10px;
    }
    .transferTable_header_btn_box {
      position: absolute;
      right: 10px;
      top: 6px;
    }
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
      transition: 0.5s;
      position: relative;
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
      width: 122px;
      transition: 0.5s;
    }
    .showTableRight {
      width: calc(100% - 122px);
      transition: 0.5s;
    }
  }
}
</style>
