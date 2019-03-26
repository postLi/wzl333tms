<template>
  <div class="table-header-wrapper">
    <p class="table-header-label">{{scope.column.label}}</p>
    <!-- 时间搜索 -->
    <el-date-picker
      v-model.lazy.trim="queryString"
      v-if="isTime && unSearch"
      type="date"
      placeholder="选择日期时间"
      :size="btnsize"
      @click.stop.prevent.native
      @change="(value) => changeKey(scope.column, scope.$index, value)"
      @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)"
    ></el-date-picker>
    <!-- 下拉选择搜索-字典表 -->
    <SelectType
      v-model.lazy="queryString"
      v-else-if="isSelect && curSelect.type"
      placeholder="请选择"
      :size="btnsize"
      :type="curSelect.type"
      clearable
      :filterfn="filterfn"
      @click.stop.prevent.native
      @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)"
      @changeItem="(val, obj) => changeKey(scope.column, scope.$index, (obj.dictName || ''))"
    ></SelectType>
    <!-- 下拉选择搜索 -自定义 -->
    <el-select
      v-model.lazy="queryString"
      v-else-if="isSelect && !curSelect.type && unSearch"
      placeholder="请选择"
      clearable
      :size="btnsize"
      :type="curSelect.type"
      @click.stop.prevent.native
      @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)"
      @change="val => changeKey(scope.column, scope.$index, val)"
    >
      <el-option
        v-for="(item, index) in curSelect.options"
        :key="index"
        :label="item.dictName"
        :value="item.id"
      ></el-option>
    </el-select>
    <!-- 普通输入框 -->
    <el-input
      v-else-if="unSearch"
      @click.stop.prevent.native
      :size="btnsize"
      placeholder="搜索关键字"
      @change="value => changeKey(scope.column, scope.$index, value)"
      v-model.lazy.trim="queryString"
      class="table-header-input"
      :maxlength="50"
      clearable
      @keyup.enter.native="event => changeEnter(scope.column, scope.$index, event)"
    ></el-input>
  </div>
</template>
<script>
import { parseTime } from '@/utils/index'
import SelectType from '@/components/selectType/index'
export default {
  components: {
    SelectType
  },
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
      queryString: '',
      curSelect: {
        property: 'shipShippingTypeName',
        label: '运输方式',
        type: 'ship_shipping_type',
        options: [],
        filter: ''
      },
      selectOptions: [
        {
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
        },
        {
          property: 'orderPayWayName',
          label: '付款方式',
          type: 'ship_pay_way',
          options: []
        },
        {
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
        },
        {
          property: 'shipBusinessTypeName',
          label: '业务类型',
          type: 'ship_business_type',
          options: []
        },
        {
          property: 'sexFlag',
          label: '性别',
          type: '',
          options: [
            {
              dictName: '女',
              id: 1
            },
            {
              dictName: '男',
              id: 0
            }
          ]
        },
        {
          property: 'sendStatus',
          label: '发送状态',
          type: '',
          options: [
            {
              dictName: '开',
              id: 1
            },
            {
              dictName: '关',
              id: 0
            }
          ]
        },
        {
          property: 'licenseTypeName',
          label: '驾驶证类型',
          type: 'driving_type',
          options: []
        },
        {
          property: 'truckSourceName',
          label: '车辆来源',
          type: 'truck_source',
          options: []
        },
        {
          property: 'truckTypeName',
          label: '车型',
          type: 'truck_type',
          options: []
        },
        {
          property: 'orerStatusName',
          label: '订单类型',
          type: 'order_status',
          options: []
        },
        {
          property: 'shipReceiptRequireName',
          label: '回单要求',
          type: 'ship_receipt_require',
          options: []
        },
        {
          property: 'signTypeName',
          label: '签收类型',
          type: 'sign_type',
          options: []
        },
        {
          property: 'backStatusName', // 回单回收状态
          label: '回单状态',
          type: 'rec_status',
          options: []
        },
        {
          property: 'sendStatusName', // 回单寄出状态
          label: '寄出状态',
          type: 'send_status',
          options: []
        },
        {
          property: 'acceptStatusName', // 回单接收状态
          label: '接收状态',
          type: 'accept_status',
          options: []
        },
        {
          property: 'giveoutStatusName', // 回单发放状态
          label: '发放状态',
          type: 'giveout_status',
          options: []
        },
        {
          property: 'abnormalStatusName',
          label: '异常状态',
          type: 'abnormal_status',
          options: []
        },
        {
          property: 'abnormalTypeName',
          label: '异常类型',
          type: 'abnormal_type',
          options: []
        },
        {
          property: 'apportionType',
          label: '分摊方式',
          type: 'apportion_type',
          options: []
        },
        {
          property: 'signStatus',
          label: '签收状态',
          type: 'sign_status',
          options: []
        },
        {
          property: 'shipPayWay',
          label: '付款方式',
          type: 'ship_pay_way',
          options: []
        },
        {
          property: 'shipDeliveryMethod',
          label: '交接方式',
          type: 'ship_delivery_method',
          options: []
        },
        {
          property: 'totalStatusCn', // 应收-全部核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ''
        },
        {
          property: 'nowPayStateCn', // 应收-现付核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ''
        },
        {
          property: 'arrivepayStateCn', // 应收-到付核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ''
        },
        {
          property: 'receiptpayStateCn', // 应收-回单付核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ''
        },
        {
          property: 'monthpayStateCn', // 应收-月结核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ''
        },
        {
          property: 'changeStateCn', // 应收-异动费用核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ''
        }
      ]
    }
  },
  computed: {
    unSearch() {
      // 不需要搜索的字段 true-需要 false-不需要
      // 不需要搜索的字段集合 property
      const arr = ['id', 'number']
      const property = this.scope.column.property.toLowerCase()
      const find = arr.filter(el => el.toLowerCase() === property)
      return !find.length
    },
    isTime() {
      // 判断当前字段是否是时间格式
      const reg = /(time)/
      const property = this.scope.column.property.toLowerCase()
      if (reg.test(property)) {
        return reg.test(property)
      } else {
        // 其他时间格式的字段集合 property
        const arr = [
          'validityDate',
          'validityStartdate',
          'truckRegisterDate',
          'truckScrapDate'
        ]
        const find = arr.filter(el => el.toLowerCase() === property)
        return !!find.length
      }
    },
    isSelect() {
      // 判断当前字段是否下拉选择格式
      // console.log('scope.column', this.scope.column.label, this.scope.column.property)
      const find = this.selectOptions.filter(
        el => el.property === this.scope.column.property
      )
      if (find.length) {
        this.curSelect = Object.assign({}, find[0])
      }
      return find.length
    }
  },
  methods: {
    filterfn(el) {
      if (this.curSelect.filter) {
        return el.id.indexOf(this.curSelect.filter) === -1
      } else {
        // 过滤不显示的选择项
        return (el.id !== '')
      }
    },
    changeEnter(column, index, event) {
      this.changeKey(column, index, event.target.value)
    },
    changeKey(column, index, value, obj) {
      this.$nextTick(() => {
        const query = this.query
        if (!query.searchVo) {
          this.$set(query, 'searchVo', {})
        }
        this.isChange = true
        if (this.isTime) {
          // 处理时间格式
          // value = parseTime(value, '{y}-{m}-{d} {h}:{i}:{s}')
          value = parseTime(value, '{y}-{m}-{d}')
        }
        query.searchVo[column.property] = value
        query.currentPage = 1 // 搜索时 默认为第一页
        console.log('changeKey components::', query, column)
        this.$emit('change', query)
      })
    }
  }
}
</script>
<style lang="scss">
.miniHeaderSearch {
  .el-table th .cell {
    padding: 0 3px;
    position: relative;
  }
  .el-table .caret-wrapper {
    position: absolute !important;
    right: 0px !important;
  }
  .el-table th {
    &:hover {
      background-color: #dae0ef;
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
    .el-select > .el-input,
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
      display: inline-block;
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
}
</style>
