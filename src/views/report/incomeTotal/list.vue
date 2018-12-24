<template>
  <div class="tab-content chartSender">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info" v-loading="loading">
      <div class="btns_box">
        <el-button type="primary" v-has:REPORT_PRINT_5 :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印报表</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain>导出报表</el-button>
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-view" @click="doAction('preview')" plain>打印预览</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="doAction('setting')" plain>打印设置</el-button> -->
      </div>
      <!-- <h2>收入统计</h2> -->
      <div class="info_tab_report_incomeTotal" id="report_incomeTotal">
        <table id="report_incomeTotal_table"></table>
      </div>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import SearchForm from './components/search'
import { reportIncomeTotal } from '@/api/report/report'
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
          label: '总收入(元)',
          prop: 'totalFee',
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
        },
        {
          label: '异动费用(元)',
          prop: 'changeFee',
          textAlign: 'right'
        }
      ],
      countCol: [ // 需要合计的-列

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
      this.loading = true
      reportIncomeTotal(this.query).then(res => {
        let data = res
        let countColVal = []
        this.loading = false

        let table = document.getElementById('report_incomeTotal_table')
        if (!table) {
          return
        }
        let theadLen = table.getElementsByTagName('thead')
        let tbodyLen = table.getElementsByTagName('tbody')
        if (theadLen.length > 0) {
          table.removeChild(theadLen[0])
          table.removeChild(tbodyLen[0])
        }
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody')
        let theadTr = document.createElement('tr')

        table.appendChild(thead)
        table.appendChild(tbody)
        thead.appendChild(theadTr)
        table.style.borderCollapse = 'collapse'
        table.style.border = '1px solid #d0d7e5';
        table.setAttribute('border', '1')
        table.setAttribute('font', '12px')
        table.setAttribute('width', '780px')

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
          theadTr.appendChild(th)
        }

        const tbodyTr = tbody.insertRow()
        for (let j in this.columns) {
          const td = tbodyTr.insertCell()
          console.log(data[this.columns[j].prop], data)
          td.innerHTML = data[this.columns[j].prop] ? Number(data[this.columns[j].prop]).toFixed(2) : '0.00'
          td.style.textAlign = this.columns[j].textAlign // 设置居中方式
          td.style.padding = '2px 5px'
          td.style.fontSize = '13px'
        }
      }).catch((err)=>{
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    doAction(type) {
      switch (type) {
        case 'print':
          PrintInSamplePage({
            id: 'report_incomeTotal',
            countCol: this.countCol
          })
          break
        case 'export':
          SaveAsSampleFile({
            id: 'report_incomeTotal',
            name: '收入统计',
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

.info_tab_report_incomeTotal {
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
        width: 12%;
        font-size: 13px;
      }
    }
  }
}

</style>
