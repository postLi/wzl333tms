<template>
  <div class="tab-content chartSender">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" @hideIframe="hideIframe"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <!-- <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
      </div> -->
      <div class="info_tab">
        <div class="hidetrigger"></div>
        <iframe v-show="isShow" :src="chartIframe" id="senderIframe" ref="senderIframe" frameborder='0' scrolling=auto name="showHere" class="chartIframe"></iframe>
        <!-- <iframe src="about:blank" frameborder="0" style="left: 0px; top: 46px; width: 800px; height: 400px; position: absolute; z-index: 1004; background-color: rgb(0,0,0);" hidefocus="true"></iframe> -->
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
      hideiframe: 'hide',
      query: {
        typeIds: ''
        // currentPage: 1,
        // pageSize: 100
        // senderCustomerName: '',
        // shipFromOrgid: '',
        // createTimeStart: '',
        // createTimeEnd: ''
      },
      btnsize: 'mini',
      isShow: true
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  methods: {
    doAction(type) {},
    hideIframe (bool) {
      if (bool) {
        if(this.hideiframe !== 'show'){
          this.hideiframe = 'show'
          document.getElementById('senderIframe').contentWindow.hideChart(bool)
        }
        console.log(document.getElementById('senderIframe').contentWindow)
       
        // this.isShow = bool
      } else {
        if(this.hideiframe !== 'hide'){
          this.hideiframe = 'hide'
          document.getElementById('senderIframe').contentWindow.hideChart(bool)
        }
      }
      // console.log('hide',this.$refs.senderIframe.contentWindow)
    },
    getSearchParam(obj) {
      this.query = Object.assign(this.query, obj)
      const access_token = getToken()
      this.$set(this.query, 'access_token', access_token)
      let str = '?'
      for (const item in this.query) {
        str += item + '=' + String(this.query[item]).trim() + '&'
      }
      const path = window.location.protocol + '//' + window.location.host + '/static/supcan/settleRecordTotal.html' + str
      this.chartIframe = encodeURI(path)
      console.log(path, this.$refs.senderIframe.contentWindow)
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
.hidetrigger{
  position: absolute;
  width:calc(100% - 20px);
  height:calc(100% - 100px);

}

</style>
