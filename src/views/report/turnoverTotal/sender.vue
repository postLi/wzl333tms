<template>
  <div class="tab-content chartSender">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" @hideIframe="hideIframe"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
     <div class="btns_box">
        <el-button type="primary" v-has:REPORT_PRINT_3 :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印报表</el-button>
        <el-button type="primary" v-has:REPORT_VIEW_3 :size="btnsize" icon="el-icon-view" @click="doAction('preview')" plain>打印预览</el-button>
        <el-button type="primary" v-has:REPORT_SETTING_3 :size="btnsize" icon="el-icon-setting" @click="doAction('setting')" plain>打印设置</el-button>
      </div>
      <div class="info_tab">
        <iframe :src="chartIframe" id="senderIframe" ref="senderIframe" frameborder='0' scrolling=auto name="showHere" class="chartIframe"></iframe>
        <!-- <iframe src="about:blank" frameborder="0" style="left: 167px; top: 46px; width: 400px; height: 300px; position: absolute; z-index: 1004; background-color: rgb(153, 153, 153);" hidefocus="true"></iframe> -->
      </div>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import SearchForm from './components/search'
import { getToken } from '@/utils/auth'
export default {
  components: {
    SelectTree,
    querySelect,
    SearchForm
  },
  data() {
    return {
      chartIframe: '',
      query: {},
      btnsize: 'mini'
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  methods: {
    doAction (type) {
      switch(type) {
        case 'print':
        document.getElementById('senderIframe').contentWindow.OnEvent('AF', 'Print', '')
        break
        case 'preview':
        document.getElementById('senderIframe').contentWindow.OnEvent('AF', 'Preview', '')
        break
        case 'setting':
        document.getElementById('senderIframe').contentWindow.OnEvent('AF', 'Setting', '')
        break
      }
    },
    hideIframe (bool) {
      if (bool) {
        if(this.hideiframe !== 'show'){
          this.hideiframe = 'show'
          document.getElementById('senderIframe').contentWindow.hideChart(bool)
        }
      } else {
        if(this.hideiframe !== 'hide'){
          this.hideiframe = 'hide'
          document.getElementById('senderIframe').contentWindow.hideChart(bool)
        }
      }
    },
    getSearchParam(obj) {
      this.query = Object.assign(this.query, obj)
      const access_token = getToken()
      this.$set(this.query, 'access_token', access_token)
      let str = '?'
      for (const item in this.query) {
        str += item + '=' + String(this.query[item]).trim() + '&'
      }
      const path = window.location.protocol + '//' + window.location.host + '/static/supcan/turnoverTotal.html' + str + (new Date()).getTime()
      this.chartIframe = encodeURI(path)
    },
    setTable() {}
  }
}

</script>
<style lang="scss">
.tab-content.chartSender {
  width: 100%;
  height: calc(100%);
  .chartIframe {
    width: 100%;
    height: 100%;
    box-shadow: 1px 1px 10px #bbb;
    overflow: hidden;
    scrolling: no;
  }
}

</style>
