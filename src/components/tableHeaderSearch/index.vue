<template>
  <div class="table-header-wrapper">
    <p class="table-header-label">{{column.label}}</p>
    <!-- 时间搜索 -->
    <el-date-picker v-if="/(time|Time)/.test(column.property)" v-model.trim="queryString" type="datetime" placeholder="选择日期时间" :size="btnsize" @change="value => changeKey(scope.column, scope.$index, value)">
    </el-date-picker>
    <!-- 普通输入框 -->
    <el-input v-else @click.stop.prevent.native size="mini" :size="btnsize" placeholder="搜索关键字" @change="value => changeKey(scope.column, scope.$index, value)" v-model.trim="queryString" class="table-header-input" :maxlength="50" clearable  @keyup.enter.native="changeEnter">
    </el-input>
    <!-- <el-button @click.stop.prevent.native icon="el-icon-menu" :size="btnsize" class="table-header-append" /> -->
  </div>
</template>
<script>
import { objectMerge2, parseTime } from '@/utils/index'
export default {
  props: {
    tableColumn: {
      type: Array,
      default: () => []
    },
    scope: {
      type: Object,
      default: () => {}
    },
    query: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      btnsize: 'mini',
      column: {
        label: ''
      },
      _index: 0,
      queryString: ''
    }
  },
  watch: {
    scope() {
      this.column = this.scope.column
      this._index = this.scope.$index
    }
  },
  methods: {
    changeKey(column, index, value) {
      setTimeout(() => {
        let query = this.query
        this.$set(query, 'searchVo', {})
        if (/(time|Time)/.test(this.column.property)) {
        	 // 处理时间格式
        	value = parseTime(value, '{y}-{m}-{d} {h}:{i}:{s}')
        }
        query.searchVo[column.property] = value
        console.log('changeKey components::', query, column)
        this.$emit('change', query)
      }, 300)
    }
  }
}

</script>
<style lang="scss">
.miniHeaderSearch {
  .el-table th .cell {
    padding: 0 3px;
  }
  .el-table .caret-wrapper {
    margin-left: -20px !important;
  }
}


.table-header-wrapper {
  display: block;
  width: 100%;
  float: left;
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  clear: both;
  .table-header-label {
    line-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 18px);
    margin-bottom: -5px;
  }
  .el-input__inner {
    padding: 0 3px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
    padding: 0 0px;
  }
  .el-date-editor {
    margin-bottom: -15px !important;
    .el-input__inner {
      padding: 0 3px 0 20px;
      line-height: 15px;
    }
    .el-input__prefix {
      left: 0px;
    }
  }
  .table-header-input {
    display: inline-block; // width: calc(100% - 27px);
    width: 100%;
    line-height: 30px !important;
    vertical-align: middle;
    margin: 0 !important;
    padding: 0 !important;
  }
  .table-header-append {
    padding: 6px;
    margin: 0px 0 0 -3px;
    color: #999;
  }
}

</style>
