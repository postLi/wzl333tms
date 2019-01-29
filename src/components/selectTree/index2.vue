<template>
  <el-select @visible-change="getData" collapse-tags popper-class="selectTreePop selectTreePop2" :multiple="multiple"  ref="myautocomplete" :filterable="filterable" :filter-method="makefilter" :disabled="disabled" v-model="aid" class="select-tree" @change="change" @focus="focus" @blur="blur" v-bind="$attrs">
        <el-option
        v-if="!listdata.length"
        v-for="item in fixeddata"
        class="theFiexdOrgData"
        :key="item.id"
        :label="item.orgName"
        :value="item.topOrgId"
         :disabled="disabledOption.indexOf(item.topOrgId) !== -1"
        >
        <div class="topoption">{{ item.orgName }} <i class="el-icon-circle-close" title="取消置顶该网点" @click.prevent.stop="deleteFixed(item)"></i> </div>
        </el-option>

        <el-option
        v-if="!listdata.length"
        v-for="item in openGroups"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        :disabled="disabledOption.indexOf(item.id) !== -1"
        >
        <div :class="'indent indent'+item.index"><span class="query-input-myautocomplete" v-html="highLight(item,'name')"> </span><i title="置顶该网点" @click.stop.prevent="setToFixed(item)" class="el-icon-upload2"></i></div>
        </el-option>
        <el-option
        v-if="listdata.length"
        v-for="item in listdata"
        :key="item.id"
        :label="item.name"
        :value="item.id"
         :disabled="disabledOption.indexOf(item.id) !== -1"
        >
        <span class="query-input-myautocomplete" v-html="highLight(item,'name')"> </span>
        </el-option>
    </el-select>
</template>
<script>
// 引入事件对象
import { eventBus } from '@/eventBus'
import { getAllOrgInfo } from '@/api/company/employeeManage'
import orderManage from '@/api/operation/orderManage'
import { mapGetters } from 'vuex'
/**
 * 将多层级树结构展开为扁平数组，并对每个元素添加层级值index
 */
function expandGroups(data, i) {
  let res = []
  data.map(el => {
    el.index = i
    el.isFixedTop = false
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
      type: [Number, String, Array]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledOption: {
      type: Array,
      default: () => []
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
    },
    remote: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    visibleChange: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(newVal) {
      this.init()
    },
    visibleChange: {
      handler(cval, oval) {
        if (cval) {
          this.$refs.myautocomplete.blur()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.init(true)
    var agnt = navigator.userAgent.toLowerCase()
    // <iframe src="about:blank" v-if="showit" :class="{popperHide: popperHide}" frameborder="0"></iframe>
    if (agnt.indexOf('msie') > 0 || agnt.indexOf('trident') > 0) {
      this.ifr = document.createElement('iframe')
      this.ifr.setAttribute('frameborder', '0')
      this.$refs['myautocomplete'].$refs['popper'].$el.appendChild(this.ifr)
    }

    eventBus.$on('closepopbox', () => {
      if (this.$refs.myautocomplete) {
        this.$refs.myautocomplete.handleClose && this.$refs.myautocomplete.handleClose()
      }
    })
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    openGroups() {
      // 用来标记是第几层
      const index = 1
      const res = expandGroups(this.groups, index)
      return res
    }
  },
  data() {
    return {
      groups: [],
      aid: '',
      query: '',
      listdata: [],
      fixeddata: []
    }
  },
  methods: {
    init(shoulChange) {
      this.aid = parseInt(this.value, 10) || ''
      if (this.multiple) {
        this.aid = this.value
      } else if (this.aid && shoulChange) {
        this.change(this.aid)
      }

      if (!this.inited) {
        this.inited = true
        this.fetchData()
      }
    },
    showChart() {
      if (this.ifr) {
        this.ifr.style.display = 'none'
      }
      this.eventBus.$emit('showSupcanChart')
    },
    hideChart() {
      if (this.ifr) {
        this.ifr.style.display = 'block'
      }
      this.eventBus.$emit('hideSupcanChart')
    },
    getFixedData() {
      orderManage.getFixedOrg(this.otherinfo.orgid).then(res => {
        const data = res.data
        this.fixeddata = data
        console.log('fixed orgid:', data)
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    fetchData() {
      this.getFixedData()
      getAllOrgInfo(this.orgid || this.otherinfo.companyId).then(data => {
        this.groups = data
        this.listdata = []
      }).catch(err => {
        this._handlerCatchMsg(err)
        // this.loading = false
      })
    },
    setToFixed(item) {
      orderManage.postFixedOrg(item.id).then(res => {
        item.isFixedTop = true
        this.getFixedData()
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    deleteFixed(item) {
      orderManage.deleteFixedOrg(item.id).then(res => {
        item.isFixedTop = true
        this.getFixedData()
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    getData(type) {
      if (type) {
        this.hideChart()
      } else {
        this.showChart()
      }
      if (this.remote) {
        this.fetchData()
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
      this.$emit('input', val)
      setTimeout(() => {
        this.$emit('change', val, find.length ? find[0] : '')
      }, 100)
    }
  }
}
</script>

<style lang="scss">
.selectTreePop2{
  .theFiexdOrgData{
    border-bottom: 1px solid #eee;
  }
  .indent, .topoption{
    position: relative;
    &:hover{
      .el-icon-upload2,.el-icon-circle-close{
        display: block;
      }
    }
  }
  .el-icon-upload2,.el-icon-circle-close{
    display: none;
    position: absolute;
    top: 10px;
    right: 0;
    color: #fe0000;
    &:hover{
    }
  }
}
.selectTreePop{
  iframe{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
    }
}
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
    margin-left: 0.5em;
  }
  .indent3{
    margin-left: 1em;
  }
  .indent4{
    margin-left: 1.5em;
  }
  .indent5{
    margin-left: 2em;
  }
  .indent6{
    margin-left: 2.5em;
  }
  .indent7{
    margin-left: 3em;
  }
  .indent8{
    margin-left: 3.5em;
  }
  .indent9{
    margin-left: 4em;
  }

</style>
