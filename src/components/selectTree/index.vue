<script src="../../api/company/employeeManage.js"></script>
<template>
  <el-select v-model="aid" class="select-tree" filterable @change="change">
        <el-option
        v-for="item in openGroups"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        <div :class="'indent indent'+item.index">{{ item.name }}</div>
        </el-option>
    </el-select>
</template>
<script>
  import { getAllOrgInfo  } from '@/api/company/employeeManage'
function expandGroups (data, i) {
  let res = []
  data.map(el => {
    el.index = i
    res.push(el)
    if(el.children){
      res = res.concat(expandGroups(el.children, i+1))
    }
  })
  return res
}

export default {
  props: {
    orgid: {
      type: [Number, String]
    }
  },
  watch: {
    orgid (newVal) {
      this.aid = newVal
    }
  },
  mounted () {
    this.aid = this.orgid
    getAllOrgInfo(this.orgid).then(data => {
      this.groups = data
    })
  },
  computed: {
    openGroups () {
      // 用来标记是第几层
      let index = 1
      let res
      res = expandGroups(this.groups, index)
      return res
    }
  },
  data () {
    return {
      groups: [],
      aid: ''
    }
  },
  methods: {
    change (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss">

  .indent{
    border-left: 1px dashed #aaa;
    padding-left: 5px;
    border-bottom: 1px dashed #aaa;
    line-height: 33px;
    height: 33px;
  }
  .indent1{

  }
  .indent2{
    margin-left: 1em;
  }
  .indent3{
    margin-left: 2em;
  }
  .indent4{
    margin-left: 3em;
  }
  .indent5{
    margin-left: 4em;
  }

</style>
