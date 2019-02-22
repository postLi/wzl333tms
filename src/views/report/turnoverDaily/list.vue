<template>
  <div class="tab-content chartSender">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info" v-loading="loading">
      <div class="btns_box">
        <el-button type="primary" v-has:REPORT_PRINT_2 :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印报表</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain>导出报表</el-button>
        <el-popover @mouseenter.native="showSaveBox" @mouseout.native="hideSaveBox" placement="right-end" width="160" trigger="manual" v-model="visible2">
          <p>表格宽度修改了，是否要保存？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="saveToTableSetup">确定</el-button>
          </div>
          <el-button slot="reference" type="text"></el-button>
        </el-popover>
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-view" @click="doAction('preview')" plain>打印预览</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="doAction('setting')" plain>打印设置</el-button> -->
      </div>
      <div class="tab_report">
        <el-table :key="tablekey" @header-dragend="setTableWidth" slot="reference" :data="dataList" style="width: 100%" :show-summary="true" height="100%" border ref="multipleTableRight" tooltip-effect="dark" triped :show-overflow-tooltip="true" :summary-method="getSummary">
          <template v-for="column in columns">
            <el-table-column show-overflow-tooltip :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed" v-if="!column.scope"></el-table-column>
            <el-table-column show-overflow-tooltip :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed" v-else>
              <template slot-scope="scope">
                <span v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <!-- <h2>应收应付汇总表</h2> -->
      <div @scroll="handleBottom" style="display: none;" class="info_tab_report" id="report_turnoverDaily">
        <table id="report_turnoverDaily_table" class="report_turnoverDaily_table">
          <!-- <colgroup width="58px"></colgroup>
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
          <colgroup width="98px"></colgroup> -->
        </table>
        <table ref="footTotalFee" class="footTotalFee">
          <!--  <colgroup width="56px"></colgroup>
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
          <colgroup width="100px"></colgroup> -->
        </table>
      </div>
    </div>
    <TableSetup :popVisible="setupTableVisible" :columns="columns" :code="thecode" @close="setupTableVisible = false" @success="setColumn"></TableSetup>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { objectMerge2, parseTime, pickerOptions2, getSummaries } from '@/utils/index'
import SearchForm from './components/search'
import { reportTurnoverDaily } from '@/api/report/report'
import { PrintInSamplePage, SaveAsSampleFile } from '@/utils/lodopFuncs'
import TableSetup from '@/components/tableSetup'
export default {
  components: {
    SearchForm,
    TableSetup
  },
  data() {
    return {
      res: {},
      tablekey: 0,
      dataList: [],
      setupTableVisible: false,
      thecode: 'FINANCE_DATEREPORT',
      visible2: false,
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
          prop: 'number',
          textAlign: 'center',
          // fixed: true
          // width: '70'
        },
        { // 表头
          label: '货号',
          prop: 'shipGoodsSn',
          textAlign: 'center',
          width: '150',
          // fixed: true
        },
        {
          label: '开单网点',
          prop: 'orgidName',
          textAlign: 'center',
          // width: '130'
        },
        {
          label: '签收网点',
          prop: 'signOrgidName',
          textAlign: 'center',
          // width: '130'
        },
        {
          label: '到站',
          prop: 'shipToCityName',
          textAlign: 'center',
          // width: '200'
        },
        {
          label: '发货人',
          prop: 'senderCustomerName',
          textAlign: 'center',
          // width: '140'
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
    fetchData() {
      reportTurnoverDaily(this.query).then(res => {
        if (res.list) {
          res.list.forEach((e, index) => {
            e.number = index + 1
          })
        }
        this.res = res || { list: [] }
        this.report()
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    report() {
      this.loading = true
      let data = this.res.list
      let elDataList = this.res.list || []
      this.dataList = elDataList
      let countColVal = []
      this.loading = false
      const div = document.getElementById('report_turnoverDaily')
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
      // 固定表头
      const tableClone = table.cloneNode(true)
      tableClone.setAttribute('id', 'tableClone')
      tableClone.setAttribute('refs', 'tableClone')
      tableClone.className = 'tableCloneHead'
      div.appendChild(tableClone)

      for (let k = 0; k < data.length; k++) { // 填充内容数据
        const tbodyTr = tbody.insertRow()
        for (let j = 0; j < this.columns.length; j++) {
          const td = tbodyTr.insertCell()
          // 处理当列没有值、宽度设置等信息时，做默认值处理
          for (let t in this.countCol) { // 保留两位小数
            if (this.columns[j].prop.indexOf(this.countCol[t]) !== -1) {
              data[k][this.columns[j].prop] = data[k][this.columns[j].prop] ? Number(data[k][this.columns[j].prop]).toFixed(2) : ''
              elDataList = data
            }
          }
          let tdVal = (this.columns[j].prop === 'number' || this.columns[j].label === '序号') ? k + 1 : (typeof data[k][this.columns[j].prop] === 'undefined' || data[k][this.columns[j].prop] === 0 ? '' : data[k][this.columns[j].prop])
          td.innerHTML = tdVal
          elDataList[k][this.columns[j].prop] = tdVal
          td.style.textAlign = this.columns[j].textAlign // 设置居中方式
          td.style.padding = '2px 3px'
          td.style.fontSize = '13px'
          td.setAttribute('width', (this.columns[j].width || 120) + 'px')
          td.style.wordBreak = 'break-all'
        }
      }
      this.dataList = elDataList // 遍历完后才设置数据
      // 合计
      let dataList = this.res.list
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
        td.style.wordBreak = 'break-all'
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
        td.style.wordBreak = 'break-all'
      }

    },
    doAction(type) {
      this.report()
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
      this.fetchData()
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
      const cloneel = document.getElementById('tableClone')
      cloneel.style.top = top + 'px'
    },
    showSaveBox() {
      clearTimeout(this.tabletimer)
    },
    hideSaveBox() {
      clearTimeout(this.tabletimer)
      this.tabletimer = setTimeout(() => {
        this.visible2 = false
      }, 10000)
    },
    setTableWidth(newWidth, oldWidth, column, event) {
      const find = this.columns.filter(el => el.prop === column.property)
      if (find.length) {
        find[0].width = newWidth + ''
        this.visible2 = true
        clearTimeout(this.tabletimer)
        this.tabletimer = setTimeout(() => {
          this.visible2 = false
        }, 10000)
      }
      console.log('setTableWidth', newWidth, oldWidth, column, event, this.columns)
    },
    saveToTableSetup() {
      this.visible2 = false
      this.eventBus.$emit('tablesetup.change', this.thecode, this.columns)
    },
    setColumn(obj) { // 重绘表格列表
      this.columns = obj
      this.tablekey = new Date().getTime() // 刷新表格视图
      // this.report()
    },
    getSummary(param) {
      const { columns, data } = param
      const sums = []
      sums[0] = '合计'
      columns.forEach((column, index) => {
        for (let i in this.countColVal) {
          if (column.property === i) {
            sums[index] = this.countColVal[i] + ''
          }
        }
      })
      return sums
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
  .tab_info {
    transform: translate(0, 0);
  }
  .tab_report {
    height: 100%;
    .el-table thead th,
    .el-table thead tr {
      background: #666;
    }
    .el-table th .cell {
      color: #fff;
    }
  }
}

.hidetrigger {
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 100px);
}

.info_tab_report {
  position: relative;
  height: 100%;
  padding-bottom: 60px;
  overflow: auto;
  border: 1px solid #d0d7e5;
  box-shadow: 1px 1px 20px #ddd;
  .tableCloneHead {
    position: absolute;
    width: 100%;
    min-width: 1300px;
    top: 0;
    left: 0;
    z-index: 2;
    th {
      width: 7%;
    }
  }
  /*设置边框的*/
  .report_turnoverDaily_table {
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
        word-break: break-all;
      }
    }
    tfoot {
      display: none;
    }
    thead {
      tr th:nth-child(1) {
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
      word-break: break-all;
    }
  }
}

</style>
