<template>
  <div class="wzlReg">
    <el-dialog :title='popTitle' :visible.sync="isShow" width="30%" center @close="closeMe" :close-on-click-modal="false" :before-close="closeMe">
      <el-form :model="formAllData" :rules="rules" ref="ruleForm" :inline="true" label-position="right" label-width="100px" class="demo-ruleForm">
        <div class="search_warrper">
          <el-form-item label="" prop="belongCityName">
            <vregion :ui="true" @values="regionChange" class="form-control">
              <el-input v-model="formAllData.belongCityName" placeholder="请选择园区所在地"></el-input>
            </vregion>
          </el-form-item>
          <el-form-item label="" prop="recommendFee">
            <el-input v-model.trim="formAllData.parkName" :maxlength="20" placeholder="请输入园区名称" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item class="staff_searchinfo--btn">
            <el-button size="mini" icon="el-icon-search" type="primary" @click="handleSearch('searchForm')">搜索</el-button>
            <el-button size="mini" icon="el-icon-close" type="info" @click="handleSearch('clearForm')" plain>重置</el-button>
          </el-form-item>
        </div>
        <div class="classify_info">
          <ul class="addlist">
            <li v-for="(item, index) in dataset" :key="index" @click="selectList(item)" @mouseenter="enter(item,index) in dataset" :class="{itemHover:itemIndex === index}">
              <h4>{{item.parkName}}</h4>
              <span>{{item.locationProvince + item.locationCity + item.locationArea + item.parkAddress}}</span>
            </li>
          </ul>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="info_tab_footer">共计:{{ dataTotal }}
          <div class="show_pager">
            <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  postParkLists
} from '../../../api/company/groupManage'
import Pager from '@/components/Pagination/index'
import vregion from '@/components/vregion/Region.vue'
export default {

  components: {
    Pager,
    vregion
  },
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    isMatreg: {
      type: Boolean,
      default: false
    },
    isComreg: {
      type: Boolean,
      default: false
    },
    selectInfo: {
      type: [Array, Object],
      default: () => {}
    },
    belongCity: {
      type: [Number, String]
    }
  },
  data() {
    return {
      popTitle: '',
      btnsize: 'mini',
      sizes: [20, 50, 100],
      dataset: [],
      dataTotal: 0,
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      value: '',
      itemIndex: null,
      // pickerOptions2: {
      //   shortcuts: pickerOptions2
      // },
      checked: false,
      optionsclaimType: [],
      optionsComplainatusType: [],
      searchCreatTime: [],
      // defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      value3: true,
      value4: true,
      options: [{
        value: '首页',
        label: '首页'
      }, {
        value: '物流专线栏目',
        label: '物流专线栏目'
      }, {
        value: '专线详情页',
        label: '专线详情页'
      }],
      options1: [{
        value: '找物流专线',
        label: '找物流专线'
      }, {
        value: '物流专线列表',
        label: '物流专线列表'
      }, {
        value: '右侧专线列表',
        label: '右侧专线列表'
      }, {
        value: '此路线其他专线',
        label: '此路线其他专线'
      }],
      form: {

      },
      rules: {
        recommendColumn: [
          { required: true, message: '请选择推荐栏目' }
        ],
        claimPic1: [
          { required: true, message: '至少上传一张图片' }
        ]
      },
      formAllData: {
        pageSize: 100,
        currentPage: 1,
        belongCityName: '',
        parkName: '',
        locationProvince: '',
        locationCity: '',
        locationArea: ''
        // parkName: '',
        // openStatus: '',
        // parkMobile: '',
        // disableStatus: ''
      }
    }
  },
  watch: {
    centerDialogVisible: {
      handler(cval, oval) {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
        if (cval) {
          this.popTitle = '选择所在园区'
          this.fetchInfo()
        }
      },
      deep: true
    }
  },
  computed: {
    isShow: {
      get() {
        return this.centerDialogVisible
      },
      set() {}
    }
  },
  methods: {
    regionChange(d) {
      console.log('data:', d)
      this.formAllData.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      this.formAllData.locationProvince = d.province ? d.province.name : ''
      this.formAllData.locationCity = d.city ? d.city.name : ''
      this.formAllData.locationArea = d.area ? d.area.name : ''
      console.log(d.province.name)
    },
    getValue(obj) {
      return obj ? obj.value : ''
    },
    selectList(item) {
      this.$emit('success', item)
      this.$emit('close')
    },
    enter(item, index) {
      this.itemIndex = index
    },
    leave() {

    },
    reset() {
      this.$refs['ruleForm'].resetFields()
    },
    closeMe(done) {
      this.$emit('close')
      this.reset()
      if (typeof done === 'function') {
        done()
      }
    },
    handleSearch(type) {
      switch (type) {
        case 'searchForm':
          this.fetchInfo()
          break
        case 'clearForm':
          this.formAllData = {
            // locationProvince: '',
            // locationCity: '',
            // locationArea: '',
            parkName: ''
            // openStatus: '',
            // parkMobile: '',
            // disableStatus: ''
          }
          // this.$refs.area.clearData()
          this.fetchInfo()
          break
        case 'add':
          this.isVisibleDialog = true
          this.isModify = false
          this.selectedInfo = {}
          break
      }
    },
    fetchInfo() {
      return postParkLists(this.formAllData).then(data => {
          if (data) {
            this.dataset = data.list
            this.dataTotal = data.total
          }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    handlePageChange(obj) {
      this.formAllData.pageSize = obj.pageSize,
        this.formAllData.currentPage = obj.pageNum
      this.fetchInfo()
    }
  }
}

</script>
<style lang="scss">
.wzlReg {
  .classify_info {
    padding-bottom: 0 !important;
  }
  .el-message-box .showPictureWrapper .el-message-box--center {
    overflow: hidden !important;
  }
  .el-dialog {
    max-width: 100%;
    min-width: 500px;
    margin-top: 18vh !important;
    .el-dialog__header {
      background: #0b4b7c;
      text-align: center;
      height: 40px;
      line-height: 40px; // padding-left: 20px;
      padding: 0 20px;
      .el-dialog__headerbtn {
        position: absolute;
        top: 13px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
      }
      .el-dialog__headerbtn :hover {
        color: #fff !important;
        transform: scale(1.5)
      }
      span {
        color: #fff;
      }
    }
    .el-dialog__footer {
      // padding-bottom: 6%;
      padding: 0px !important;
      text-align: left;
      .el-button {
        padding: 8px 35px;
      }
    }
    .el-input__inner {
      height: 35px;
      line-height: 35px;
    }
    .picklist {
      width: 217px;
    }
    .goodsclaimDes {
      width: 100%;
      .el-form-item__content {
        width: 80%;
      }
    }
    .el-textarea__inner {
      height: 100px;
    }
    .el-range-editor.el-input__inner {
      width: 217px;
    }
    .uploadcard {
      width: 500px;
    }
    .el-upload-list--picture .el-upload-list__item {
      width: 48%;
      float: left;
      margin-right: 2%;
    }
  }
  .addlist {
    height: 300px;
    overflow-y: scroll;
    li {
      padding-left: 20px;
    }
    .itemHover {
      background: #eeeff1;
      cursor: pointer;
      border-radius: 5px; // text-align: center;
    }
    h4,
    span {
      height: 30px;
      line-height: 30px;
    }
  } // .addlist:hover li{
  //   background:#eeeff1;
  // }
  .info_tab_footer {
    padding-left: 20px;
    background: #eee;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .show_pager {
    float: right;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
  }
  .v-region {
    position: relative;
  }
  .form-control {
    position: absolute;
    top: 38px;
    left: 0px;
  }
  .v-region {
    position: relative;
  }
  .v-dropdown-container {
    position: absolute !important;
    top: 38px !important;
    left: 0px !important;
  }
  .rg-results {
    height: 300px !important;
  }
}

</style>
