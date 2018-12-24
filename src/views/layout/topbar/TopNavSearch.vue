<template>
  <div class="topNav-search" v-has:ORDER_ALL ref="topNavSearch">
    <div class="topNavSearch-trigger" @click="showmini">
      <i class="el-icon-search"></i>
    </div>
    <el-autocomplete
      ref="topNavSearchComplete"
      class="my-topNav-search-input"
      popper-class="my-topNav-search"
      placeholder="快速查单"
      v-model="topSearch"
      :maxlength="30"
      :visible-arrow="false"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      @keypress.enter.native="handleEnter"
      @focus="addLong"
      @blur="setShort"
      @select="handleSelect">
      <icon-svg icon-class="sousuo" slot="prefix" />
      <icon-svg v-if="!topSearch.length" @click.native="openSearchBox" icon-class="shouqicaidan" slot="suffix" />
      <i
        v-if="topSearch.length"
        class="el-icon-circle-close el-input__icon"
        @click.stop="clearinput"
        slot="suffix">
      </i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.name }}</div>
        <span class="val">{{ item.value }}</span>
      </template>
    </el-autocomplete>
    <el-dialog top="0" width="90%" :close-on-click-modal="false" class="showSearchPop" v-if="showSearch" title="多条件查询" :visible.sync="showSearchVisible">
        <SearchOrder v-if="showSearch" :orderid="orderid" />
    </el-dialog>
  </div>
</template>
<script>
import SearchOrder from '@/views/operation/order/orderManage/pop'

export default {
  components: {
    SearchOrder
  },
  data() {
    return {
      showSearch: false,
      showSearchVisible: false,
      topSearch: '',
      searchListArr: [],
      searchList: [
        {
          name: '运单号',
          key: 'shipSn',
          value: ''
        },
        {
          name: '发货人手机',
          key: 'shipSenderMobile',
          value: ''
        },
        {
          name: '收货人手机',
          key: 'shipReceiverMobile',
          value: ''
        },
        {
          name: '发货人',
          key: 'shipSenderName',
          value: ''
        },
        {
          name: '收货人',
          key: 'shipReceiverName',
          value: ''
        },
        {
          name: '货物名称',
          key: 'cargoName',
          value: ''
        },
        {
          name: '货号',
          key: 'shipGoodsSn',
          value: ''
        }
      ]
    }
  },
  methods: {
    openSearchBox() {
      debugger
      this.showSearch = true
      this.showSearchVisible = true
    },
    // 显示小搜素框
    showmini() {
      this.$refs['topNavSearch'].classList.toggle('showMiniSearchBox')
    },
    addLong() {
      this.$refs['topNavSearch'].classList.add('longSearchBox')
    },
    setShort() {
      this.$refs['topNavSearch'].classList.remove('longSearchBox')
      // this.$refs['topNavSearch'].classList.remove('showMiniSearchBox')
    },
    querySearch(query, cb) {
      const data = this.searchListArr
      cb(data)
    },
    handleEnter() {
      this.handleSelect({
        key: 'shipSn',
        value: this.topSearch
      })
      // this.$refs.topNavSearchComplete.blur()
    },
    handleSelect(index) {
      this.$router.push({ path: '/operation/order/orderManage', query: {
        key: index.key,
        value: index.value
      }})
      console.log("this.$refs['topNavSearchComplete'].$refs['input']", this.$refs['topNavSearchComplete'].$refs['input'])
      if (this.$refs['topNavSearchComplete'].$refs['input'] && this.$refs['topNavSearchComplete'].$refs['input'].blur) {
        this.$refs['topNavSearchComplete'].$refs['input'].blur()
        this.$refs['topNavSearchComplete'].close()
      }
    },
    clearinput() {
      this.topSearch = ''
      // 调用组件内部方法
      // 清除数据
      if (typeof this.$refs['topNavSearchComplete'].handleChange === 'function') {
        typeof this.$refs['topNavSearchComplete'].handleChange('')
      }
    }
  },
  watch: {
    topSearch(newVal) {
      if (newVal.trim() !== '') {
        this.searchListArr = this.searchList.map(el => {
          el.value = newVal
          return el
        })
      } else {
        this.searchListArr = []
      }
    }
  }
}
</script>
<style lang="scss">
@import "src/styles/variate.scss";
.showSearchPop{
    height: 100%;

    .el-dialog{
        height: 90%;
        display: flex;
        flex-direction: column;
        top: 5%;
    }


    .el-dialog__body{
        padding:5px 10px 10px;
        overflow: auto;
        flex: 1;
    }
}

.topNav-search{
  position: absolute;
  top: 0;
  right: 320px;
  height: $topNavHeight;
  line-height: $topNavHeight;

  .topNavSearch-trigger{
    width: 50px;
    text-align: center;
    background: rgba(0, 0, 0, .05);
    cursor: pointer;

    &:hover{
      background: rgba(0, 0, 0, 0.1);
    }

    .el-icon-search{
      color: #fff;
    }
  }

  .el-input__inner{
    width: 160px;
    height: 26px;
    border-radius: 12px;
    border: solid 1px rgba(255, 255, 255, 0.69);
    background: #42485B;
    color: rgba(255, 255, 255, 0.9);
    font-size: 12px;
  }

  .el-icon-circle-close{
    cursor: pointer;
    &:hover{
      color: #333
    }
  }
}
.longSearchBox{
  .el-input__inner{
    width: 400px;
  }
}
.my-topNav-search{
  .el-autocomplete-suggestion__wrap{
    padding: 0;
    li{
      padding-left: 0;
      padding-right: 0;
    }
  }
  .name{
    display: inline-block;
    width: 80px;
    background: rgba(0, 0, 0, .1);
    text-align: right;
    padding-right: 3px;
    font-size: 14px;
  }
}
@media screen and (max-width:1300px) {
  .my-topNav-search-input{
    display: none;
    position: absolute;
    top: $topNavHeight - 6px;
    right: 0;
    width: 200px;
    line-height: $topNavHeight - 10px;
    .el-icon-search{
      display: none;
    }
    .el-input--prefix .el-input__inner{
      padding-left: 10px;
      width: 100%;
      padding-right: 10px;
      border: 1px solid #1C6094;
    }

    .svg-icon{
      display: none;
    }
    
  }
  .longSearchBox{
    .el-input__inner{
      width: 100%;
    }
  }
  .showMiniSearchBox{
    .my-topNav-search-input{
      display: block;
    }
  }
}
@media screen and (min-width:1300px){
  .topNavSearch-trigger{
    display: none;
  }
}
</style>
