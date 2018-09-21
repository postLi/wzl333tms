<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" v-loading="loading">
    <template slot="content">
      <div class="smsedit_wrapper">
        <div class="smsedit_head">
          <span>{{info.sendNode}}</span>
        </div>
        <div class="smsedit_search">
          <el-input placeholder="搜索可配置字段" v-model="currentSearch">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <template slot="prepend"> 可配置字段 </template>
          </el-input>
        </div>
        <div class="smsedit_list">
          <ul>
            <li v-for="(item, index) in smsColumn" :key="item.id">
              <el-tag>{{item.colName}}</el-tag>
            </li>
          </ul>
        </div>
        <div class="smsedit_content">
        </div>
      </div>
    </template>
    <div slot="footer">
      <el-button @click="resetForm" type="primary">恢复默认</el-button>
      <el-button @click="closeMe">取消</el-button>
      <el-button @click="submitForm('formModel')" type="success">保存</el-button>
    </div>
  </pop-right>
</template>
<script>
import popRight from '@/components/PopRight/index'
import { postSmsSetColumnsList } from '@/api/company/sms'
export default {
  components: {
    popRight
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: {}
    }
  },
  watch: {
    info(newVal) {},
    popVisible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.postSmsSetColumnsList()
        })
      }
    },
  },
  data() {
    return {
      popTitle: '编辑短信',
      loading: false,
      currentSearch: '',
      smsColumn: []
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

        }
      })
    },
    postSmsSetColumnsList() {
      postSmsSetColumnsList(this.otherinfo.orgid).then(data => {
        this.smsColumn = data
      })
    },
    resetForm() {},
    closeMe(done) {
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    }
  }
}

</script>
<style lang="scss">
.smsedit_wrapper {
  padding: 10px;
  /* background-color: #eee; */
  .smsedit_head {
    line-height: 28px;
    padding: 0;
  }
  .smsedit_search {
    .el-input-group__prepend {
      padding: 0 10px;
    }
  }
  .smsedit_list{
  	margin: 10px 0;
  	ul li{
  		float: left;
  		padding: 5px 5px;
  	}
  }
}

</style>
