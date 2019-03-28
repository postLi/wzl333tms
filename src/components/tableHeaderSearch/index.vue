<template>
  <div class="table-header-wrapper">
    <p class="table-header-label" :title="scope.column.label">{{scope.column.label}}</p>
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
    <el-tooltip
      v-else-if="unSearch"
      :content="specialTypeTitle"
      :disabled="!specialTypeTitle"
      placement="top"
      effect="light"
    >
      <el-input
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
    </el-tooltip>

  </div>
</template>
<script>
import { parseTime, objectMerge2 } from '@/utils/index'
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
        filter: [],
        dispage: []
      },
      specialType: [
        {
          property: 'lowerPrice',
          label: '最低价格(元)',
          page: [],
          title: '查询"面议", 请输入 0'
        }
      ],
      /**
       * selectOptions-下拉选择，有type的表示查字典表，没有type用自定义键值
       * property // 字段名
       * label // 字段中文名
       * type // 字典表该字段类型，如果没有表示自定义
       * options // 没有type的时候，配置自定义键值对用于下拉选项
       * dispage // 配置不需要模糊查询的当前字段的页面,目的为了区分不同页面的不同搜索需求
       * onlypage // 指定使用的页面：配置当前字段只能在指定页面使用
       */
      selectOptions: [
        {
          property: 'shipShippingTypeName',
          label: '运输方式',
          dispage: [],
          type: 'ship_shipping_type',
          options: []
        },
        {
          property: 'shipPayWayName',
          label: '付款方式',
          dispage: [],
          type: 'ship_pay_way',
          options: []
        },
        {
          property: 'orderPayWayName',
          label: '付款方式',
          dispage: [],
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
          filter: ['']
        },
        {
          property: 'nowPayStateCn', // 应收-现付核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ['']
        },
        {
          property: 'arrivepayStateCn', // 应收-到付核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ['']
        },
        {
          property: 'receiptpayStateCn', // 应收-回单付核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ['']
        },
        {
          property: 'monthpayStateCn', // 应收-月结核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ['']
        },
        {
          property: 'changeStateCn', // 应收-异动费用核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ['']
        },
        {
          property: 'statusName', // 应付-运单核销
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ['']
        },
        {
          property: 'statusValue', // 异动费用-核销状态
          label: '核销状态',
          type: 'count_status',
          options: [],
          filter: ['']
        },,
        {
          property: 'incomePayTypeValue', // 异动费用-费用类型
          label: '费用类型',
          type: '',
          options: [{
            dictName: '应付',
            id: '应付'
          },
          {
            dictName: '到付',
            id: '到付'
          },
          {
            dictName: '回单付',
            id: '回单付'
          },
          {
            dictName: '月结',
            id: '月结'
          }]
        },
        {
          property: 'applyStatus',
          label: '审核状态',
          type: '',
          options: [
            {
              dictName: '审核中',
              id: 0
            },
            {
              dictName: '审核通过',
              id: 1
            },
            {
              dictName: '审核不通过',
              id: 2
            }
          ]
        },
        {
          property: 'rangeStatus',
          label: '状态',
          type: '',
          options: [
            {
              dictName: '禁用',
              id: 0
            },
            {
              dictName: '启用',
              id: 1
            }
          ]
        },
        {
          property: 'pickupStatusName', // 提货管理-提货状态
          label: '提货状态',
          type: 'pickup_status',
          options: [],
          filter: ['235'] // 过滤掉'全部-235'
        },
        {
          property: 'payMethodName', // 提货管理-付款方式
          label: '付款方式',
          type: 'ship_pay_way',
          options: [],
          filter: []
        },
        {
          property: 'batchTypeName', // 短驳发车-批次状态
          label: '批次状态',
          type: 'short_batch_type',
          dispage: ['/operation/order/arteryDepart/sender', '/operation/order/track/artery', '/operation/order/track/deliver'],
          options: [],
          filter: ['46']// 过滤掉'全部-46'
        },
        {
          property: 'bathStatusName', // 短驳到车-批次状态
          label: '批次状态',
          dispage: ['/operation/order/arteryDelivery/sender', '/operation/order/deliverManage'],
          type: 'short_batch_type',
          options: [],
          filter: ['46', '47'] // 过滤掉'全部-46'、'已装车-47'
        },
        {
          property: 'batchTypeName', // 干线发车、干线跟踪-批次状态
          label: '批次状态',
          type: 'main_batch_type',
          dispage: ['/operation/order/shortDepart/deliver', '/operation/order/track/deliver'],
          options: [],
          filter: ['51'] // 过滤掉'全部-51'
        },
        {
          property: 'bathStatusName', // 干线到车-批次状态
          label: '批次状态',
          dispage: ['/operation/order/shortDepart/arrival', '/operation/order/deliverManage'],
          type: 'main_batch_type',
          options: [],
          filter: ['51'] // 过滤掉'全部-51'
        },
        {
          property: 'bathStatusName', // 送货管理-批次状态
          label: '批次状态',
          dispage: ['/operation/order/shortDepart/arrival', '/operation/order/arteryDelivery/sender'],
          type: 'delivery_batch_type',
          options: [],
          filter: ['56'] // 过滤掉'全部-56'
        },
        {
          property: 'batchTypeName', // 送货跟踪-批次状态
          label: '批次状态',
          dispage: ['/operation/order/shortDepart/deliver', '/operation/order/arteryDepart/sender', '/operation/order/track/artery'],
          type: 'delivery_batch_type',
          options: [],
          filter: ['56'] // 过滤掉'全部-56'
        },
        {
          property: 'unloadSignName', // 途径卸货-卸货状态
          label: '卸货状态',
          type: 'unload_type',
          options: [],
          filter: ['405'] // 过滤掉'全部-405'
        },
        {
          property: 'signStatusName', // 签收管理-签收状态
          label: '签收状态',
          type: 'sign_status',
          options: []
        },
        {
          property: 'signCertificateName', // 签收管理-凭证状态
          label: '凭证状态',
          type: 'sign_certificate',
          options: [],
          filter: ['230'] // '全部-230'
        },
        {
          property: 'signCocumentTypeName', // 签收管理-签收证件
          label: '签收证件',
          type: 'sign_cocument_type',
          options: []
        },
        {
          property: 'backStatusName', // 回单管理-回单状态
          label: '回单状态',
          type: 'back_status',
          options: []
        },
        {
          property: 'recStatusName', // 回单回收-回收状态
          label: '回收状态',
          type: 'rec_status',
          options: []
        },
        {
          property: 'sendStatusName', // 回单寄出-寄出状态
          label: '寄出状态',
          type: 'send_status',
          options: []
        },
        {
          property: 'acceptStatusName', // 回单接收-接收状态
          label: '接收状态',
          type: 'accept_status',
          options: []
        },
        {
          property: 'giveoutStatusName', // 回单发放-发放状态
          label: '发放状态',
          type: 'giveout_status',
          options: []
        },
        {
          property: 'fundsGoodsStatusName', // 货款管理-货款状态
          label: '货款状态',
          type: 'funds_goods_status',
          options: []
        },
        {
          property: 'fundsRecStatusName', // 货款回收-回收状态
          label: '回收状态',
          type: 'funds_rec_status',
          options: [],
          filter: ['253']
        },
        {
          property: 'fundsRemittanceStatusName', // 货款汇款-汇款状态
          label: '汇款状态',
          type: 'funds_remittance_status',
          options: [],
          filter: ['256']
        },
        {
          property: 'fundsAccountStatusName', // 货款到账-到账状态
          label: '到账状态',
          type: 'funds_account_status',
          options: [],
          filter: ['259']
        },
        {
          property: 'fundsGiveoutStatusName', // 货款发放-发放状态
          label: '发放状态',
          type: 'funds_giveout_status',
          options: [],
          filter: ['262']
        },
        {
          property: 'paymentName', // 中转跟踪-中转付款方式
          label: '中转付款方式',
          type: 'payment_type',
          options: []
        },
        {
          property: 'status', // 控货管理-控货状态
          label: '控货状态',
          onlypage: '/operation/service/controlgoods/allGoods',
          type: '',
          options: [
            {
              dictName: '未放货',
              id: 1
            },
            {
              dictName: '已放货',
              id: 2
            },
            {
              dictName: '未控货',
              id: '0'
            }
          ]
        },
        {
          property: 'dataSrcZh', // 财务日记账-来源
          label: '来源',
          type: '',
          options: [
            {
              dictName: '核销产生',
              id: '核销产生'
            }, {
              dictName: '手工录入',
              id: '手工录入'
            }
          ]
        },
        {
          property: 'paymentsTypeZh', // 财务日记账-方向
          label: '方向',
          type: '',
          options: [
            {
              dictName: '收入',
              id: '收入'
            }, {
              dictName: '支出',
              id: '支出'
            }
          ]
        },
        {
          property: 'verifyStatusZh', // 财务日记账-审核状态
          label: '审核状态',
          type: '',
          options: [{
            dictName: '未审核',
            id: '未审核'
          }, {
            dictName: '已审核',
            id: '已审核'
          }]
        },
        {
          property: 'checkStatusZh', // 车费对账-对账状态
          label: '对账状态',
          type: '',
          options: [{
            dictName: '未对账',
            id: '未对账'
          }, {
            dictName: '已对账',
            id: '已对账'
          }]
        }
      ],
      unSearchList: [
        {
          property: 'id',
          label: '序号'
        },
        {
          property: 'number',
          label: '序号'
        },
        {
          property: 'grossProfit',
          label: '毛利'
        },
        {
          property: 'status', // 控货管理-未放货及已放货页面的‘控货状态’
          label: '控货状态',
          dispage: ['/operation/service/controlgoods/noGoods', '/operation/service/controlgoods/haveGoods']
        }
      ]
    }
  },
  computed: {
    specialTypeTitle() {
      // 判断当前字段是否是特殊查询，
      // 例如为空时前端写了中文字符显示，但是后台查询不到
      // 这种情况默认传0
      // 例如：线路管理列表的【最低价格(元)】
      let msg = ''
      const property = this.scope.column.property.toLowerCase()
      const find = this.specialType.filter(
        el => el.property.toLowerCase() === property
      )
      if (find && find.length) {
        msg = find[0].title
      }
      return msg
    },
    unSearch() {
      // 不需要搜索的字段 true-需要 false-不需要
      // 不需要搜索的字段集合 property
      const property = this.scope.column.property.toLowerCase()
      let count = 0
      let isSamProp = false
      const find = this.unSearchList.filter(el => {
        if (el.property.toLowerCase() === property) {
          isSamProp = true
          if (el.dispage && el.dispage.length) {
            count = el.dispage.filter(em => em === this.$route.fullPath).length
          }
        }
        if (el.dispage) {
          if (isSamProp && count > 0) {
            return true
          }
        } else {
          return isSamProp
        }
      })
      return !find.length
    },
    isTime() {
      // 判断当前字段是否是时间格式
      const reg = /(time)/
      const property = this.scope.column.property.toLowerCase()
      if (reg.test(property) && property !== 'timeliness') {
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
      // 1、判断当前字段是否下拉选择格式
      // 2、判断当前字段在当前页面是否使用，排查以满足不同页面 同一个字段名称 需要使用不同值 的需求
      // 3、判断当前有没有onlypage参数， 只在当前配置页面显示的下拉值，排查以满足不同页面相同字段名需要使用不同值的需求
      const find = this.selectOptions.filter(
        el => {
          let isSamProp = false
          let isSamPage = true
          let isOnlyPage = false
          let count = 0
          if (el.property === this.scope.column.property) {
            isSamProp = true
            if (el.dispage && el.dispage.length) {
              count = el.dispage.filter(em => em === this.$route.fullPath).length
            }
            // 判断当前有没有onlypage参数，配置路由是否当前页面
            isOnlyPage = (el.onlypage && el.onlypage === this.$route.fullPath)
          }
           // 判断判断是否不需要在当前页面显示
          isSamPage = !(count > 0)
          if (el.onlypage) {
            if (isSamProp && isSamPage && isOnlyPage) {
              return true
            }
          } else {
            if (isSamProp && isSamPage) {
              return true
            }
          }
        }
      )
      // 拿到第一条数据，赋值给副本显示
      if (find.length) {
        this.curSelect = Object.assign({}, find[0])
      }
      return find.length
    }
  },
  methods: {
    filterfn(el) {
      if (this.curSelect.filter) {
        // 过滤有指定的项
        let count = 0
        this.curSelect.filter.forEach(em => {
          if (el.id.toString() === em) {
            count += 1
          }
        })
        return count === 0
      } else {
        // 过滤不显示的选择项
        return el.id !== ''
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
