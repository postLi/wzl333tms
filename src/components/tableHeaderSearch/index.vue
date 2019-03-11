<template>
  <div class="table-header-wrapper">
    <p class="table-header-label">{{column.label}}</p>
    <!-- <br /> -->
    <el-input @click.stop.prevent.native size="mini" :size="btnsize" placeholder="搜索关键字" @change="value => changeKey(scope.column, scope.$index, value)" v-model="queryString" class="table-header-input">
     <!--  <template slot="append">
      	<el-button icon="el-icon-menu" :size="btnsize" />
      </template> -->
    </el-input>
    <el-button @click.stop.prevent.native icon="el-icon-menu" :size="btnsize" class="table-header-append" />
  </div>
</template>
<script>
export default {
  props: {
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
    },
    // query() {
    //   console.log('当前页面的搜索参数', query)
    // }
  },
  methods: {
    changeKey(column, index, value) {
      let query = this.query
      this.$set(query, 'searchVo', {})
      query.searchVo[column.property] = value
      this.$emit('change', query)
    }
  }
}

</script>
<style lang="scss">
.el-table .caret-wrapper {
  margin-left: -20px !important;

}

.table-header-wrapper {
  display: block;
  width: 100%;
  float: left;
  margin: 0 !important;
  padding: 0 !important;
  clear: both;
  .table-header-label {
    line-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 18px);
  }
  .table-header-input {
    display: inline-block;
    width: calc(100% - 27px);
    line-height: 30px !important;
    vertical-align: middle;
    margin: 0 !important;
    padding: 0 !important;
  }
  .table-header-append{
  	padding: 6px;
  	margin: 0 0 0 -3px;
  	color: #999;
  }
}

</style>
