<template>
  <el-select ref="myautocomplete" @change="change" v-model="val" :placeholder="placeholder" :filterable="filterable" :filter-method="makefilter" v-bind="$attrs" @focus="focus" @blur="blur">
    <slot name="head"></slot>
    <template v-for="item in listdata">
      <!-- 将 `item` 对象作为一个插槽的 prop 传入。-->
      <slot v-bind:item="item">
        <!-- 回退的内容 -->
        <el-option :key="item.id" :label="item.dictName" :value="item.id">
          <span class="query-input-myautocomplete" v-html="highLight(item,'dictName')"> </span>
        </el-option>
      </slot>
    </template>
    <slot name="foot"></slot>
  </el-select>
</template>
<script>
// 引入事件对象
import { eventBus } from '@/eventBus'
import { getSelectType } from '@/api/common'
import { mapGetters } from 'vuex'
import CACHE from '@/utils/cache'
import DICT from '@/utils/dict'

/**
 * 可选的type值
network_type	网点类型
manage_type	经营类型
driving_type	驾驶证类型
department_type	部门类型
upType	upRemark
payment_type	中转付款方式
department_type	部门类型
menu_type	菜单类型
network_status	网点状态
ship_time_rule	开单时间规则
notify_cargo_rule	通知放货规则
load_type	配载类型
apportion_type	分摊方式
short_batch_type	短驳批次状态
main_batch_type	干线批次状态
delivery_batch_type	送货批次状态
ship_status	运单状态
ship_delivery_method	交接方式
ship_pay_way	付款方式
ship_receipt_require	回单要求
ship_shipping_type	运输方式
ship_business_type	业务类型
ship_effective	时效性
sign_cocument_type	签收证件
sign_type	签收类型
ship_pay_way	付款方式
rec_status	回单回收状态
send_status	回单寄出状态
accept_status	回单接收状态
giveout_status	回单发放状态
rec_type	回单回收情况
accept_type	回单接收情况
abnormal_status	异常状态
abnormal_type	异常类型
truck_source	车辆来源
truck_type	车型
ship_other	其他
type	备注
department_type	部门类型
order_status 订单状态
fee_status 交账状态
 */

export default {
  name: 'selectType',
  props: {
    focus: {
      type: Function,
      default: () => {}
    },
    blur: {
      type: Function,
      default: () => {}
    },
    orgid: {
      type: [Number, String],
      default: ''
    },
    type: {
      type: String,
      default: '',
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [Number, String, Array]
    },
    remote: {
      type: Boolean,
      default: false
    },
    arterDelivery: {
      type: Boolean,
      default: false
    },
    filterfn: {
      type: Function
    },
    filterable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      val: '',
      queryFn: (el) => el,
      // listdata: [],
      types: [],
      dataCache: {
      },
      query: ''
    }
  },
  watch: {
    value: {
      handler(newVal) {
        // 针对以id为value值的，将传过来的值做一次统一的转换为数值
        if (/\d+/.test(newVal)) {
          this.val = parseInt(newVal, 10) || ''
        } else {
          this.val = newVal || ''
        }
      },
      immediate: true
    }
  },
  mounted() {
    // 因为字典的数据修改频率极其小，
    // 尝试缓存以减少网络请求
    if (this.remote) {
      this.fetchData()
    } else {
      const data = CACHE.get(this.type)
      if (data === '') {
        this.fetchData()
      } else {
        this.types = data
        // this.listdata = data
      }
    }
    if (typeof this.filterfn === 'function') {
      this.queryFn = this.filterfn
    }

    eventBus.$on('closepopbox', () => {
      if (this.$refs.myautocomplete) {
        this.$refs.myautocomplete.handleClose && this.$refs.myautocomplete.handleClose()
      }
    })
  },
  computed: {
    listdata() {
      // console.log('this.queryFn', this.queryFn)
      return this.types.filter(this.queryFn)
    }
  },
  methods: {
    makefilter(query) {
      this.query = query
      const REG = new RegExp(query, 'i')
      let filterfn = (el) => {
        console.log(el.dictName, REG, REG.test(el.dictName))
        return REG.test(el.dictName)
      }

      if (query === '') {
        filterfn = (el) => el
      }
      console.log('typeof this.filterfn', typeof this.filterfn)
      if (typeof this.filterfn === 'function') {
        filterfn = this.filterfn
      }
      this.queryFn = filterfn
      // this.listdata = this.types.filter(filterfn)
    },
    fetchData() {
      var cb = (data) => {

        if(this.arterDelivery){
          this.types = data.filter(el => {
            return el.id !== 52
          })
        }else{
          this.types = data

        }

        // this.listdata = data
        // debugger
        CACHE.set(this.type, data)
      }
      if (DICT[this.type]) {
        cb(DICT[this.type])
      } else {
        getSelectType(this.type, this.orgid || this.otherinfo.companyId).then(cb)
      }
    },
    highLight(item, key) {
      if (this.query !== '') {
        return this.setHightLight(item[key], this.query)
      } else {
        return item[key]
      }
    },
    setHightLight(str, key) {
      return str.replace(new RegExp(key, 'igm'), '<i class="highlight">' + key + '</i>')
    },
    change(item) {
      this.$emit('input', this.val)
      this.$emit('change', item)
    }
  }
}
</script>
<style lang="scss">
.highlight{
    font-style: normal;
    color: #f00;
  }
</style>
