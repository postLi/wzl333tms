<template>
  <el-select  ref="myautocomplete" :filterable="filterable" :filter-method="makefilter" :disabled="disabled" v-model="aid" class="select-tree" @change="change" @focus="focus" @blur="blur" v-bind="$attrs">
        <el-option
        v-if="!listdata.length"
        v-for="item in openGroups"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        
        >
        <div :class="'indent indent'+item.index"><span class="query-input-myautocomplete" v-html="highLight(item,'name')"> </span></div>
        </el-option>
        <el-option
        v-if="listdata.length"
        v-for="item in listdata"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        >
        <span class="query-input-myautocomplete" v-html="highLight(item,'name')"> </span>
        </el-option>
    </el-select>
</template>
<script>
// 引入事件对象
import { eventBus } from '@/eventBus'
import { getAllOrgInfo } from '@/api/company/employeeManage'
import { mapGetters } from 'vuex'
/**
 * 将多层级树结构展开为扁平数组，并对每个元素添加层级值index
 */
function expandGroups(data, i) {
  let res = []
  data.map(el => {
    el.index = i
    res.push(el)
    if (el.children) {
      res = res.concat(expandGroups(el.children, i + 1))
    }
  })
  return res
}
/**
 * 将多层级树结构展开为扁平数组
 */
function expandGroups2(data) {
  let res = []
  data.map(el => {
    const ell = {
      id: el.id,
      index: el.index,
      name: el.name,
      parentId: el.parentId
    }
    res.push(ell)
    if (el.children && el.children.length) {
      res = res.concat(expandGroups2(el.children))
    }
  })
  return res
}

export default {
  props: {
    focus: {
      type: Function,
      default: () => {}
    },
    blur: {
      type: Function,
      default: () => {}
    },
    value: {
      type: [Number, String]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: true
    },
    orgid: {
      type: [String, Number],
      default: ''
    },
    filterfn: {
      type: Function
    }
  },
  watch: {
    value(newVal) {
      this.aid = parseInt(newVal, 10) || ''
      this.init()
    }
  },
  mounted() {
    this.aid = parseInt(this.value, 10) || ''
    this.init()
    eventBus.$on('closepopbox', () => {
      console.log('closepopbox selectTree:')
      this.$refs.myautocomplete.handleClose()
    })
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    openGroups() {
      // 用来标记是第几层
      const index = 1
      let res
      res = expandGroups(this.groups, index)
      return res
    }
  },
  data() {
    return {
      groups: [],
      aid: '',
      query: '',
      listdata: []
    }
  },
  methods: {
    init() {
      if (!this.inited) {
        this.inited = true
        getAllOrgInfo(this.orgid || this.otherinfo.companyId).then(data => {
          this.groups = data
          this.listdata = []
        }).catch(err => {
          this.inited = false
        })
      }
    },
    makefilter(query) {
      this.query = query
      const REG = new RegExp(query, 'i')
      let filterfn = (el) => {
        console.log(el.name, REG, REG.test(el.name))
        return REG.test(el.name)
      }

      if (query === '') {
        this.listdata = []
        return this.listdata
      }
      if (typeof this.filterfn === 'function') {
        filterfn = this.filterfn
      }
      // this.listdata = this.groups.filter(filterfn)
      this.listdata = expandGroups2(this.groups).filter(filterfn)
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
    change(val) {
      const find = this.openGroups.filter(el => el.id === val)
      this.$emit('change', find.length ? find[0] : val)
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.highlight{
    font-style: normal;
    color: #f00;
  }
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
