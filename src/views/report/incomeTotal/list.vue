<template>
  <div class="tab-content chartSender">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info" v-loading="loading">
      <div class="btns_box">
        <el-button type="primary" v-has:REPORT_PRINT_5 :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印报表</el-button>
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
        <el-table :key="tablekey" @header-dragend="setTableWidth" slot="reference" :data="dataList" style="width: 100%" height="100%" border ref="multipleTableRight" tooltip-effect="dark" triped :show-overflow-tooltip="true">
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
      <!-- <h2>收入统计</h2> -->
      <div class="info_tab_report_incomeTotal" style="display: none;" id="report_incomeTotal">
        <table id="report_incomeTotal_table"></table>
      </div>
    </div>
    <TableSetup :popVisible="setupTableVisible" :columns="columns" :code="thecode" @close="setupTableVisible = false" @success="setColumn"></TableSetup>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { objectMerge2, parseTime, pickerOptions2 } from '@/utils/index'
import SearchForm from './components/search'
import { reportIncomeTotal } from '@/api/report/report'
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
      thecode: 'FINANCE_findDetail',
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
    fetchData() {
      reportIncomeTotal(this.query).then(res => {
        this.res = res || {}
        this.report()
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    report() {
      this.loading = true
      let data = this.res
      this.dataList = []
      this.dataList.push(data)
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
        theadTr.appendChild(th)
      }

      const tbodyTr = tbody.insertRow()
      for (let j in this.columns) {
        const td = tbodyTr.insertCell()
        td.innerHTML = data[this.columns[j].prop] ? Number(data[this.columns[j].prop]).toFixed(2) : '0.00'
        td.style.textAlign = this.columns[j].textAlign // 设置居中方式
        td.style.padding = '2px 5px'
        td.style.fontSize = '13px'
        td.style.wordBreak = 'break-all'
        td.style.width = (this.columns[j].width || 120) + 'px'
      }

    },
    doAction(type) {
      this.report()
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
      this.fetchData()
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
      this.tablekey = Math.random() // 刷新表格视图
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
    overflow: hidden; // scrolling: no;
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
