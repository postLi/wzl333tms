<template>
  <div class="tab-content chartSender">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印报表</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain>导出报表</el-button>
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-view" @click="doAction('preview')" plain>打印预览</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="doAction('setting')" plain>打印设置</el-button> -->
      </div>
      <!-- <h2>应收应付汇总表</h2> -->
      <div class="info_tab_report" id="report_turnoverTotal">
        <table id="report_turnoverTotal_table"></table>
      </div>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import SearchForm from './components/search'
import { reportTurnoverTotal } from '@/api/report/report'
import { PrintInSamplePage, SaveAsSampleFile } from '@/utils/lodopFuncs'
export default {
  components: {
    SearchForm
  },
  data() {
    return {
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
          textAlign: 'center'
        },
        {
          label: '总运费(元)',
          prop: 'totalFee',
          textAlign: 'right'
        },
        {
          label: '实收费用(元)',
          prop: 'shipTotalFee',
          textAlign: 'right'
        },
        {
          label: '回扣(元)',
          prop: 'brokerageFee',
          textAlign: 'right'
        },
        {
          label: '现付(元)',
          prop: 'nowPayFee',
          textAlign: 'right'
        },
        {
          label: '到付(元)',
          prop: 'arrivePayFee',
          textAlign: 'right'
        },
        {
          label: '回单付(元)',
          prop: 'receiptPayFee',
          textAlign: 'right'
        },
        {
          label: '月结(元)',
          prop: 'monthPayFee',
          textAlign: 'right'
        }
      ],
      countCol: [ // 需要合计的-列
        'nowPayFee',
        'arrivePayFee',
        'shipReceiptpayFee',
        'monthPayFee',
        'totalFee',
        'brokerageFee',
        'receiptPayFee',
        'shipTotalFee'
      ],
      countColVal: [] // 存储底部合计值
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  methods: {
    report() {
      reportTurnoverTotal(this.query).then(res => {
        let data = res.list
        let countColVal = []

       let table = document.getElementById('report_turnoverTotal_table')
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
        table.setAttribute('width', '780px')

        theadTr.setAttribute('height', '32px')
        theadTr.setAttribute('width', '100%')

        for(let i = 0; i < this.columns.length; i++) { // 设置表头
          let th = document.createElement('th')
          let font = document.createElement('font')
          font.innerHTML = this.columns[i].label
          font.setAttribute('size', 2)
          font.setAttribute('color', 'white')
          th.setAttribute('border', 1)
          th.setAttribute('bgcolor', 'dimGray')
          th.appendChild(font)
          theadTr.appendChild(th)
        }


        for (let k = 0; k < data.length; k++) { // 填充内容数据
          const tbodyTr = tbody.insertRow()
          for (let j = 0; j < this.columns.length; j++) {
            const td = tbodyTr.insertCell()
            // 处理当列没有值、宽度设置等信息时，做默认值处理
            for (let t in this.countCol) { // 保留两位小数
              if (this.columns[j].prop.indexOf(this.countCol[t]) !== -1) {
                data[k][this.columns[j].prop] = data[k][this.columns[j].prop] ? Number(data[k][this.columns[j].prop]).toFixed(2) : '0.00'
              }
            }
            td.innerHTML = (this.columns[j].prop === 'id' || this.columns[j].label === '序号') ? k + 1 : (typeof data[k][this.columns[j].prop] === 'undefined' ? '' : data[k][this.columns[j].prop])
            td.style.textAlign = this.columns[j].textAlign // 设置居中方式
            td.style.padding = '2px 5px'
            td.style.fontSize = '13px'
            td.style.width = (this.columns[j].width || 120) + 'px'
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
              this.countColVal[label[0]] = data ? data : '0.00'
            } else {

              this.countColVal[label[0]] = data ? data.toFixed(2) : '0.00'
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
      })
    },
    doAction(type) {
      switch (type) {
        case 'print':
          PrintInSamplePage({
            id: 'report_turnoverTotal',
            countCol: this.countCol
          })
          break
        case 'export':
          SaveAsSampleFile({
            id: 'report_turnoverTotal',
            name: '营业额汇总表',
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
    scrolling: no;
  }
}

.hidetrigger {
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 100px);
}

.info_tab_report {
  height: calc( 100%);
  overflow: auto;
  border: 1px solid #d0d7e5;
  box-shadow: 1px 1px 20px #ddd;
  /*设置边框的*/
  table {
    width: 100%;
    min-width: 1000px;
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
    tbody,
    tfoot {
      color: #222;
      line-height: 23px;
      font-size: 13px;
      td {
        font-size: 13px;
      }
    }
  }
}

</style>
