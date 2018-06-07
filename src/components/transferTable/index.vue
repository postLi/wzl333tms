<template>
  <div class="transferTable">
    <!-- 穿梭框 -->
    <div class="transferTable_header">
      <div class="transferTable_header_btn_direction">
        <slot name="btnDirection">左右按钮区</slot>
      </div>
    </div>
    <div class="transferTable_content">
      <div class="transferTable_content_table paddingRight">
        <slot name="tableLeft">左边表格区</slot>
      </div>
      <div class="transferTable_content_table">
        <slot name="tableRight">右边表格区</slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scope>
.transferTable {
  width: 100%;
  margin-top:-10px;
  padding:5px 0 0 0;
  background-color:#E9F3FA;
  height: calc(100% - 400px);
  .transferTable_header {
    margin: 10px;
    width: 100%;
    text-align: center;
    position: relative;
  }
  .transferTable_content {
    display: flex;
    flex-direction: row;
    height:100%;
    .paddingRight {
      padding-right: 10px;
    }
    .transferTable_content_table {
      width: 50%;
      height:100%;
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
  }
}

</style>
