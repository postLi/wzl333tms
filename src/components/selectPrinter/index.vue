<template>
    <el-select v-model="val" 
    :placeholder="placeholder"
    @change="change" 
    value-key="value"
    v-bind="$attrs" 
    @focus="focus" 
    @blur="blur">
    <slot name="head"></slot>
      <el-option v-for="item in printers" :key="item.label" :label="item.label" :value="item.label">
      </el-option>
    </el-select>
</template>
<script>
import { CreatePrinterList } from '@/utils/lodopFuncs'
export default {
  props: {
    placeholder: {
      type: String,
      default: '选择打印机'
    },
    value: {
      type: [Number, String, Array]
    },
    blur: {
      type: Function,
      default: () => {}
    },
    focus: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      val: '0',
      printers: []
    }
  },
  watch: {

  },
  mounted () {
    this.CreatePrinterList()
  },
  methods: {
    CreatePrinterList () {
      this.printers =  Object.assign([], CreatePrinterList())
      console.log('printers' ,this.printers) 
    },
    change (item) {
      this.$emit('change', item)
      this.$emit('input', this.val)
    }
  }
}
</script>
