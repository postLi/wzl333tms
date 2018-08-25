<template>
<em>
  {{ value }}
  <i>
    <template v-if="theval > 0">
      <img src="../../assets/checkImg/redx.png"/>
    </template>
    <template v-else-if="theval < 0">
      <img src="../../assets/checkImg/greenx.png"/>
    </template>
    <template v-else-if="theval === 0">
      -
    </template>
    <template v-else>
      /
    </template>
  </i>
  </em>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Object],
      default: ''
    }
  },
  data() {
    return {
      val: ''
    }
  },
  computed: {
    theval() {
      const val = this.val || ''
      // 如果包含负号
      if (val.indexOf('-') !== -1) {
        return -1
      // 如果为不增不减
      } else if (val === '0.00%') {
        return 0
      // 如果为大于0
      } else if (val.indexOf('%') !== -1) {
        return 1
      // 如果为其它表示没有值返回
      } else {
        return ''
      }
    }
  },
  watch: {
    value() {
      this.val = this.value
    }
  }
}
</script>
