<template>
  <div class="tab-content chartSender">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info" v-loading="loading">
      <div class="btns_box">
        <el-button type="primary" v-has:REPORT_PRINT_2 :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印报表</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain>导出报表</el-button>
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-view" @click="doAction('preview')" plain>打印预览</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="doAction('setting')" plain>打印设置</el-button> -->
      </div>
      <!-- <h2>应收应付汇总表</h2> -->
      <div @scroll="handleBottom" class="info_tab_report" id="report_turnoverDaily">
        <table id="report_turnoverDaily_table">
          <colgroup width="58px"></colgroup>
          <colgroup width="130px"></colgroup>
          <colgroup width="145px"></colgroup>
          <colgroup width="165px"></colgroup>
          <colgroup width="120px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="120px"></colgroup>
          <colgroup width="98px"></colgroup>
        </table>
        <table ref="footTotalFee" class="footTotalFee">
          <colgroup width="56px"></colgroup>
          <colgroup width="130px"></colgroup>
          <colgroup width="140px"></colgroup>
          <colgroup width="155px"></colgroup>
          <colgroup width="110px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="110px"></colgroup>
          <colgroup width="100px"></colgroup>
        </table>
        <!-- <table id="report_turnoverDaily_table">
          <colgroup width="58px"></colgroup>
          <colgroup width="155px"></colgroup>
          <colgroup width="145px"></colgroup>
          <colgroup width="165px"></colgroup>
          <colgroup width="120px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="120px"></colgroup>
          <colgroup width="98px"></colgroup>
        </table>
        <table ref="footTotalFee" class="footTotalFee">
          <colgroup width="58px"></colgroup>
          <colgroup width="155px"></colgroup>
          <colgroup width="145px"></colgroup>
          <colgroup width="165px"></colgroup>
          <colgroup width="120px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="98px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="98px"></colgroup>
        </table> -->
      </div>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import SearchForm from './components/search'
import { reportTurnoverDaily } from '@/api/report/report'
import { PrintInSamplePage, SaveAsSampleFile } from '@/utils/lodopFuncs'
export default {
  components: {
    SearchForm
  },
  data() {
    return {
      loading: true,
      chartIframe: '',
      hideiframe: 'hide',
      query: {
        currentPage: 1,
        pageSize: 100
        // senderCustomerName: '',
        // shipFromOrgid: '',
        // createTimeStart: '',
        // createTimeEnd: ''
      },
      fontSizeHeadMini: 2,
      bgcolorHead: 'yellow',
      btnsize: 'mini',
      isShow: true,
      columns: [{ // 表头
          label: '序号',
          prop: 'id',
          textAlign: 'center',
          width: '70'
        },
        {
          label: '开单网点',
          prop: 'orgidName',
          textAlign: 'center',
          width: '130'
        },
        {
          label: '签收网点',
          prop: 'signOrgidName',
          textAlign: 'center',
          width: '130'
        },
        {
          label: '到达城市',
          prop: 'shipToCityName',
          textAlign: 'center',
          width: '200'
        },
        {
          label: '发货人',
          prop: 'senderCustomerName',
          textAlign: 'center',
          width: '140'
        },
        {
          label: '货品名',
          prop: 'cargoName',
          textAlign: 'center'
        },
        {
          label: '现付(元)',
          prop: 'shipNowpayFee',
          textAlign: 'right'
        },
        {
          label: '到付(元)',
          prop: 'shipArrivepayFee',
          textAlign: 'right'
        },
        {
          label: '回单付(元)',
          prop: 'shipReceiptpayFee',
          textAlign: 'right'
        },
        {
          label: '月结(元)',
          prop: 'shipMonthpayFee',
          textAlign: 'right'
        },
        {
          label: '运费合计(元)',
          prop: 'totalFee',
          textAlign: 'right'
        },
        {
          label: '回扣(元)',
          prop: 'brokerageFee',
          textAlign: 'right'
        },
        {
          label: '代收货款(元)',
          prop: 'agencyFund',
          textAlign: 'right'
        },
        {
          label: '实收金额(元)',
          prop: 'amountCollected',
          textAlign: 'right'
        }
      ],
      countCol: [ // 需要合计的-列
        'shipNowpayFee',
        'shipArrivepayFee',
        'shipReceiptpayFee',
        'shipMonthpayFee',
        'totalFee',
        'brokerageFee',
        'agencyFund',
        'amountCollected'
      ],
      countColVal: [] // 存储底部合计值
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  mounted() {
    this.getScrollWidth()
  },
  methods: {
    getScrollWidth() {
      var noScroll, scroll, oDiv = document.createElement("DIV")
      oDiv.style.cssText = "position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;"
      noScroll = document.body.appendChild(oDiv).clientWidth
      oDiv.style.overflowY = "scroll"
      scroll = oDiv.clientWidth
      document.body.removeChild(oDiv)
      this.scrollwidth = noScroll - scroll
    },
    report() {
      this.loading = true
      reportTurnoverDaily(this.query).then(res => {
        let data = res.list
        let countColVal = []
        this.loading = false
        
        let table = document.getElementById('report_turnoverDaily_table')
        if (!table) {
          return
        }
        let theadLen = table.getElementsByTagName('thead')
        let tbodyLen = table.getElementsByTagName('tbody')
        let tfootLen = table.getElementsByTagName('tfoot')
        if (theadLen.length > 0) {
          table.removeChild(theadLen[0])
          table.removeChild(tbodyLen[0])
          table.removeChild(tfootLen[0])
        }
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody')
        let tfoot = document.createElement('tfoot')
        let theadTr = document.createElement('tr')

        table.appendChild(thead)
        table.appendChild(tbody)
        table.appendChild(tfoot)
        thead.appendChild(theadTr)
        table.style.borderCollapse = 'collapse'
        table.style.border = '1px solid #d0d7e5';
        table.setAttribute('border', '1')
        table.setAttribute('font', '12px')
        // table.setAttribute('width', '780px')

        theadTr.setAttribute('height', '32px')
        theadTr.setAttribute('width', '100%')

        for (let i = 0; i < this.columns.length; i++) { // 设置表头
          let th = document.createElement('th')
          let font = document.createElement('font')
          font.innerHTML = this.columns[i].label
          font.setAttribute('size', 2)
          font.setAttribute('color', 'white')
          th.setAttribute('border', 1)
          th.setAttribute('bgcolor', 'dimGray')
          th.appendChild(font)
          th.setAttribute('width', (this.columns[i].width || 120) + 'px')
          theadTr.appendChild(th)
        }


        for (let k = 0; k < data.length; k++) { // 填充内容数据
          const tbodyTr = tbody.insertRow()
          for (let j = 0; j < this.columns.length; j++) {
            const td = tbodyTr.insertCell()
            // 处理当列没有值、宽度设置等信息时，做默认值处理
            for (let t in this.countCol) { // 保留两位小数
              if (this.columns[j].prop.indexOf(this.countCol[t]) !== -1) {
                data[k][this.columns[j].prop] = data[k][this.columns[j].prop] ? Number(data[k][this.columns[j].prop]).toFixed(2) : ''
              }
            }
            td.innerHTML = (this.columns[j].prop === 'id' || this.columns[j].label === '序号') ? k + 1 : (typeof data[k][this.columns[j].prop] === 'undefined' || data[k][this.columns[j].prop] === 0 ? '' : data[k][this.columns[j].prop])
            td.style.textAlign = this.columns[j].textAlign // 设置居中方式
            td.style.padding = '2px 3px'
            td.style.fontSize = '13px'
            td.setAttribute('width', (this.columns[j].width || 120) + 'px')
            // console.log(this.columns[j].width, data[k])
          }
        }
        // 合计
        let dataList = res.list
        for (let t in this.countCol) {
          let data = 0
          let label = this.countCol[t].split('|') // 取字段名
          for (let k = 0; k < dataList.length; k++) {
            data += dataList[k][label[0]] ? Number(dataList[k][label[0]]) : 0
          }
          if (data || data === 0) {
            if (label[1] && label[1] === 'integer') {
              this.countColVal[label[0]] = data ? data : ''
            } else {

              this.countColVal[label[0]] = data ? data.toFixed(2) : ''
            }
          }
        }
        // 生成底部合计行
        const tfootTr = tfoot.insertRow()
        for (let t in this.columns) {
          const td = tfootTr.insertCell()
          td.innerHTML = (this.columns[t].label === '序号' ? '合计' : (this.countColVal[this.columns[t].prop] ? this.countColVal[this.columns[t].prop] : '-'))
          td.style.textAlign = this.columns[t].textAlign
          td.style.padding = '2px 5px'
          td.style.fontSize = '13px'
          td.setAttribute('bgcolor', 'gainsboro')
          td.setAttribute('color', 'white')
        }

        // 复制-生成多一个浮动的底部合计行
        let totalTable = document.getElementsByClassName('footTotalFee')[0]
        let total_tfootLen = totalTable.getElementsByTagName('tfoot')
        if (total_tfootLen.length > 0) {
          totalTable.removeChild(total_tfootLen[0])
        }
        let total_tfoot = document.createElement('tfoot')

        totalTable.appendChild(total_tfoot)
        totalTable.style.borderCollapse = 'collapse'
        totalTable.style.border = '1px solid #d0d7e5';
        totalTable.setAttribute('border', '1')
        totalTable.setAttribute('font', '12px')
        // 生成底部合计行
        const total_tfootTr = total_tfoot.insertRow()
        for (let t in this.columns) {
          const td = total_tfootTr.insertCell()
          td.innerHTML = (this.columns[t].label === '序号' ? '合计' : (this.countColVal[this.columns[t].prop] ? this.countColVal[this.columns[t].prop] : '-'))
          td.style.textAlign = this.columns[t].textAlign
          td.style.padding = '2px 5px'
          td.style.fontSize = '13px'
          td.setAttribute('bgcolor', 'gainsboro')
          td.setAttribute('color', 'white')
        }

      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    doAction(type) {
      switch (type) {
        case 'print':
          PrintInSamplePage({
            id: 'report_turnoverDaily',
            countCol: this.countCol
          })
          break
        case 'export':
          SaveAsSampleFile({
            id: 'report_turnoverDaily',
            name: '营业额日报表',
            countCol: this.countCol
          })
          break
        case 'preview':
          break
        case 'setting':
          break
      }
    },
    getSearchParam(obj) {
      this.query = Object.assign(this.query, obj)
      this.report()
    },
    handleBottom(e) {
      let el = e.target
      let top = el.scrollTop
      let width = el.offsetWidth
      let orgwidth = el.scrollWidth
      let hasscroll = orgwidth > width
      let height = el.offsetHeight
      let footel = this.$refs.footTotalFee
      let footheight = footel.offsetHeight
      let calctop = top + height - footheight
      if (hasscroll) {
        calctop -= this.scrollwidth
      }
      if (!this.maxheight) {
        this.maxheight = el.scrollHeight
      }
      footel.style.bottom = 'auto'
      footel.style.top = (calctop > this.maxheight ? this.maxheight : calctop) + 'px'
    }
  }
}

</script>
<style lang="scss">
.tab-content.chartSender {
  width: 100%;
  height: calc(100%);
  h2 {
    text-align: center;
    margin: 0px 0px 20px 0;
    color: #409EFF;
  }
  .chartIframe {
    width: 100%;
    height: 100%;
    box-shadow: 1px 1px 10px #bbb;
    overflow: hidden;
  }
  .tab_info{
    transform: translate(0,0);
  }
}

.hidetrigger {
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 100px);
}
.info_tab_report {
  height: 100%;
  padding-bottom: 30px;
  overflow: auto;
  border: 1px solid #d0d7e5;
  box-shadow: 1px 1px 20px #ddd;
  position: relative;



  /*设置边框的*/
  #report_turnoverDaily_table {
      width: 100%;
      min-width: 1300px;

      tbody tr {
        background-color: #FFF;
        transition: 0.5s;
      }
      tbody tr:hover {
        background-color: #ccc;
        transition: 0.3s;
      }
      tbody tr td:hover {
        background-color: #cdcdcd;
        transition: 0.3s;
      }
      tbody {
        color: #222;
        line-height: 23px;
        font-size: 13px;
        td {
          font-size: 13px;
          width: 7%;
          word-break:break-all;
        }
      }
      tfoot {
        display: none;
      }
      thead {
        tr th:nth-child(1){
          width: 30px !important;
        }
      }
  }
}
.footTotalFee {
  width: 100%;
  position: absolute;
  min-width: 1300px;
  bottom: 0px;
  left: 0;
  z-index: 2;
  tfoot {
    color: #222;
    line-height: 24px;
    font-size: 13px;
    td {
      width: 7%;
      font-size: 13px;
      border: 1px solid #bbb;
      word-break:break-all;
    }
  }
}

</style>
