<template>
  <div class="table-header-wrapper">
    <p class="table-header-label">{{scope.column.label}}</p>
    <!-- <p class="table-header-label" :style="isSelect ? 'color: red':''">{{scope.column.property}}</p> -->
    <!-- 时间搜索 -->
    <el-date-picker v-if="isTime" v-model.trim="queryString" type="datetime" placeholder="选择日期时间" :size="btnsize" @change="value => changeKey(scope.column, scope.$index, value)" @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)">
    </el-date-picker>
    <!-- 下拉选择搜索 -->
    <SelectType v-else-if="isSelect" 
    :size="btnsize" :type="curSelect.type" clearable
    placeholder="请选择" 
    @click.stop.prevent.native
    @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)"
    @change="val => changeKey(scope.column, scope.$index, val)" ></SelectType>
    <!-- 普通输入框 -->
    <el-input v-else @click.stop.prevent.native size="mini" :size="btnsize" placeholder="搜索关键字" @change="value => changeKey(scope.column, scope.$index, value)" v-model.trim="queryString" class="table-header-input" :maxlength="50" clearable @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)">
    </el-input>
  </div>
</template>
<script>
import { objectMerge2, parseTime } from '@/utils/index'
import SelectType from '@/components/selectType/index'
export default {
  components: {
    SelectType,
  },
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
      _index: 0,
      queryString: '',
      curSelect: {
        property: 'shipShippingTypeName',
        label: '运输方式',
        type: 'ship_shipping_type',
        options: []
      },
      selectOptions: [{
          property: 'shipShippingTypeName',
          label: '运输方式',
          type: 'ship_shipping_type',
          options: []
        },
        {
          property: 'shipPayWayName',
          label: '付款方式',
          type: 'ship_pay_way',
          options: []
        }, {
          property: 'shipDeliveryMethodName',
          lable: '交接方式',
          type: 'ship_delivery_method',
          options: []
        },
        {
          property: 'shipStatusName',
          lable: '运单状态',
          type: 'ship_status',
          options: []
        }, {
          property: 'shipBusinessTypeName',
          label: '业务类型',
          type: 'ship_business_type',
          options: []
        }
      ]
    }
  },
  computed: {
    isTime() {
      // 判断当前字段是否是时间格式
      let reg = /(time)/
      let property = this.scope.column.property.toLowerCase()
      return reg.test(property)
    },
    isSelect() {
      // 判断当前字段是否下拉选择格式
      let find = this.selectOptions.filter(el => el.property === this.scope.column.property)
      if (find.length) {
        console.log('是否要下拉搜索：', this.scope.column.label, this.scope.column.property, find.length)
        this.fetchDataSelect(find[0])
        this.curSelect = Object.assign({}, find[0])
      }
      return find.length
    },
  },
  methods: {
    fetchDataSelect(obj) {
    },
    changeEnter(column, index, event) {
      this.changeKey(column, index, event.target.value)
    },
    changeKey(column, index, value) {
      setTimeout(() => {
        let query = this.query
        this.$set(query, 'searchVo', {})
        if (/(time|Time)/.test(this.scope.column.property)) {
          // 处理时间格式
          value = parseTime(value, '{y}-{m}-{d} {h}:{i}:{s}')
        }
        query.searchVo[column.property] = value
        console.log('changeKey components::', query, column)
        this.$emit('change', query)
        // this.queryString = ''
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
  .el-select,
  .el-select>.el-input,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
    padding: 0 0px;
  }
  .el-select,
  .el-date-editor {
    margin-bottom: -15px !important;
    padding: 0px;
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
