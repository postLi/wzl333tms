<template>
  <div class="tab-content chartSender">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info" v-loading="loading">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" v-has:REPORT_PRINT_1 @click="doAction('print')" plain>打印报表</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain>导出报表</el-button>
        <el-popover @mouseenter.native="showSaveBox" @mouseout.native="hideSaveBox" placement="right-end" width="160" trigger="manual" v-model="visible2">
          <p>表格宽度修改了，是否要保存？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="saveToTableSetup">确定</el-button>
          </div>
          <el-button type="text" slot="reference"></el-button>
        </el-popover>
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-view" @click="doAction('preview')" plain>打印预览</el-button> -->
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="doAction('setting')" plain>打印设置</el-button> -->
      </div>
      <div class="tab_report">
        <el-table :key="tablekey" @header-dragend="setTableWidth" slot="reference" :data="dataList" style="width: 100%" :show-summary="true" height="100%" border ref="multipleTableRight" tooltip-effect="dark" triped :show-overflow-tooltip="true" :summary-method="getSummary">
          <template v-for="column in columns">
            <el-table-column show-overflow-tooltip :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed" v-if="!column.scope && !column.type"></el-table-column>
            <el-table-column show-overflow-tooltip :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed" v-if="column.scope">
              <template slot-scope="scope">
                <span v-html="column.slot(scope)"></span>
              </template>
            </el-table-column>
          </template>
          <el-table-column label="应收汇总">
            <el-table-column show-overflow-tooltip v-for="(column,index) in columns" :key="index" :prop="column.prop" :label="column.label" :fixed="column.fixed" :width="column.width" v-if="column.type === 1">
            </el-table-column>
          </el-table-column>
          <el-table-column label="应付汇总">
            <el-table-column show-overflow-tooltip v-for="(column,index) in columns" :key="index" :prop="column.prop" :label="column.label" :fixed="column.fixed" :width="column.width" v-if="column.type === 2">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <!-- <h2>应收应付汇总表</h2> -->
      <div @scroll="handleBottom" style="display: none;" class="info_tab_report_settleRecord" id="report_settleRecordTotal">
        <div class="dragger-line"></div>
        <table id="report_settleRecordTotal_table" class="report_settleRecordTotal_table" border="1px" style="border-collapse: collapse;">
          <thead border="1">
            <tr height="32px">
              <th rowspan="2" bgcolor="dimGray">
                <font color="white" size="3">序号</font>
              </th>
              <th rowspan="2" bgcolor="dimGray">
                <font color="white" size="2">费用项目</font>
              </th>
              <th colspan="4" bgcolor="dimGray">
                <font color="white" size="3">应收汇总</font>
              </th>
              <th colspan="4" bgcolor="dimGray">
                <font color="white" size="3">应付汇总</font>
              </th>
            </tr>
            <tr height="32px">
              <th bgcolor="dimGray">
                <font color="white" size="2">应收合计</font>
              </th>
              <th bgcolor="dimGray">
                <font color="white" size="2">已收</font>
              </th>
              <th bgcolor="dimGray">
                <font color="white" size="2">未收</font>
              </th>
              <th bgcolor="dimGray">
                <font color="white" size="2">数量</font>
              </th>
              <th bgcolor="dimGray">
                <font color="white" size="2">应付合计</font>
              </th>
              <th bgcolor="dimGray">
                <font color="white" size="2">已付</font>
              </th>
              <th bgcolor="dimGray">
                <font color="white" size="2">未付</font>
              </th>
              <th bgcolor="dimGray">
                <font color="white" size="2">数量</font>
              </th>
            </tr>
          </thead>
          <!-- <thead border="1">
            <tr height="32px">
              <th rowspan="2" bgcolor="dimGray" width="50px">
                <font color="white" size="3">序号</font>
              </th>
              <th rowspan="2" bgcolor="dimGray">
                <font color="white" size="2">费用项目</font>
              </th>
              <th colspan="4" bgcolor="dimGray">
                <font color="white" size="3">应收汇总</font>
              </th>
              <th colspan="4" bgcolor="dimGray">
                <font color="white" size="3">应付汇总</font>
              </th>
            </tr>
            <tr height="32px">
              <th bgcolor="dimGray" width="100px">
                <font color="white" size="2">应收合计</font>
              </th>
              <th bgcolor="dimGray" width="100px">
                <font color="white" size="2">已收</font>
              </th>
              <th bgcolor="dimGray" width="100px">
                <font color="white" size="2">未收</font>
              </th>
              <th bgcolor="dimGray" width="70px">
                <font color="white" size="2">数量</font>
              </th>
              <th bgcolor="dimGray" width="100px">
                <font color="white" size="2">应付合计</font>
              </th>
              <th bgcolor="dimGray" width="100px">
                <font color="white" size="2">已付</font>
              </th>
              <th bgcolor="dimGray" width="100px">
                <font color="white" size="2">未付</font>
              </th>
              <th bgcolor="dimGray" width="70px">
                <font color="white" size="2">数量</font>
              </th>
            </tr>
          </thead> -->
        </table>
        <table ref="footTotalFee" class="footTotalFee_settleRecordTotal">
          <!--   <colgroup width="50px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="70px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="100px"></colgroup>
          <colgroup width="70px"></colgroup> -->
        </table>
      </div>
    </div>
    <TableSetup :popVisible="setupTableVisible" :columns="columns" :code="thecode" @close="setupTableVisible = false" @success="setColumn"></TableSetup>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'
import { objectMerge2, parseTime, pickerOptions2, getSummaries } from '@/utils/index'
import SearchForm from './components/search'
import { getToken } from '@/utils/auth'
import { reportSettleRecordTotal } from '@/api/report/report'
import { PrintInSamplePage, SaveAsSampleFile } from '@/utils/lodopFuncs'
// import TableSetup from '@/components/tableSetup'
export default {
  components: {
    SelectTree,
    querySelect,
    SearchForm
    // TableSetup
  },
  data() {
    return {
      res: [],
      tablekey: 0,
      setupTableVisible: false,
      thecode: 'FINANCE_FeeAggregation',
      visible2: false,
      loading: true,
      chartIframe: '',
      hideiframe: 'hide',
      dataList: [],
      query: {
        typeIds: ''
        // currentPage: 1,
        // pageSize: 100
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
        width: '50',
        fixed: true
      },
      {
        label: '费用项目',
        prop: 'feeName',
        textAlign: 'center'
          // width: '100'
      },
      {
        label: '应收合计',
        prop: 'totalreceivableFee',
        textAlign: 'right',
          // width: '100',
        type: 1
      },
      {
        label: '已收',
        prop: 'receivableFee',
        textAlign: 'right',
          // width: '100',
        type: 1
      },
      {
        label: '未收',
        prop: 'receivableUnpaidFee',
        textAlign: 'right',
          // width: '100',
        type: 1
      },
      {
        label: '数量',
        prop: 'receivableCount',
        textAlign: 'center',
          // width: '70',
        type: 1
      },
      {
        label: '应付合计',
        prop: 'totalpayableFee',
        textAlign: 'right',
          // width: '100',
        type: 2
      },
      {
        label: '已付',
        prop: 'payableFee',
        textAlign: 'right',
          // width: '100',
        type: 2
      },
      {
        label: '未付',
        prop: 'payableUnpaidFee',
        textAlign: 'right',
          // width: '100',
        type: 2
      },
      {
        label: '数量',
        prop: 'payableCount',
        textAlign: 'center',
          // width: '70',
        type: 2
      }
      ],
      countCol: [ // 需要合计的-列
        'totalreceivableFee',
        'receivableFee',
        'receivableUnpaidFee',
        'receivableCount|integer',
        'totalpayableFee',
        'payableFee',
        'payableUnpaidFee',
        'payableCount|integer'
      ],
      countColVal: [], // 存储底部合计值
      unCountSum: [ // 不需要计入底部合计的费用项-行
        '其他费用收入',
        '包装费',
        '保险费',
        '上楼费',
        '叉车费',
        '报关费',
        '入仓费',
        '税金',
        '提货费',
        '送货费'
      ]
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
      var noScroll, scroll, oDiv = document.createElement('DIV')
      oDiv.style.cssText = 'position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;'
      noScroll = document.body.appendChild(oDiv).clientWidth
      oDiv.style.overflowY = 'scroll'
      scroll = oDiv.clientWidth
      document.body.removeChild(oDiv)
      this.scrollwidth = noScroll - scroll
    },
    handleBottom(e) {
      const el = e.target
      const top = el.scrollTop
      const width = el.offsetWidth
      const orgwidth = el.scrollWidth
      const hasscroll = orgwidth > width
      const height = el.offsetHeight
      const footel = this.$refs.footTotalFee
      const footheight = footel.offsetHeight
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
    fetchData() {
      this.loading = true
      reportSettleRecordTotal(this.query).then(res => {
        if (res) {
          res.forEach((e, index) => {
            e.number = index + 1
          })
        }
        this.res = res || []
        this.setTableView()
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    setTableView() {
      this.loading = true
      // reportSettleRecordTotal(this.query).then(res => {
      //   if (res) {
      //     res.forEach((e, index) => {
      //       e.number = index + 1
      //     })
      //   }
      const data = this.res
      const countColVal = []
      let elDataList = data || []
      this.dataList = elDataList
      this.loading = false
      const table = document.getElementById('report_settleRecordTotal_table')

      if (!table) {
        return
      }
      const tbodyLen = table.getElementsByTagName('tbody')
      const tfootLen = table.getElementsByTagName('tfoot')
      if (tbodyLen.length > 0) {
        table.removeChild(tbodyLen[0])
        table.removeChild(tfootLen[0])
      }

      const tbody = document.createElement('tbody')
      const tfoot = document.createElement('tfoot')

      table.appendChild(tbody)
      table.appendChild(tfoot)
      table.style.borderCollapse = 'collapse'
      table.style.border = '1px solid #d0d7e5'
      table.setAttribute('border', '1')
      table.setAttribute('font', '12px')

      // 固定表头
      const div = document.getElementById('report_settleRecordTotal')
      const tableClone = table.cloneNode(true)
      tableClone.setAttribute('id', 'tableClone')
      tableClone.setAttribute('refs', 'tableClone')
      tableClone.className = 'tableCloneHead'

      div.appendChild(tableClone)

      for (let k = 0; k < data.length; k++) {
        const tbodyTr = tbody.insertRow()
        for (let j = 0; j < this.columns.length; j++) {
          const td = tbodyTr.insertCell()
          // 处理当列没有值、宽度设置等信息时，做默认值处理
          for (const t in this.countCol) { // 保留两位小数
            if (this.columns[j].prop.indexOf(this.countCol[t]) !== -1) {
              data[k][this.columns[j].prop] = data[k][this.columns[j].prop] ? Number(data[k][this.columns[j].prop]).toFixed(2) : ''
              elDataList = data
            }
          }
          const tdVal = (this.columns[j].prop === 'number' || this.columns[j].label === '序号') ? k + 1 : (typeof data[k][this.columns[j].prop] === 'undefined' || data[k][this.columns[j].prop] === 0 ? '' : data[k][this.columns[j].prop])
          td.innerHTML = tdVal
          elDataList[k][this.columns[j].prop] = tdVal
          td.style.textAlign = this.columns[j].textAlign // 设置居中方式
          td.style.padding = '2px 5px'
          td.style.fontSize = '13px'
          td.style.width = (this.columns[j].width || 120) + 'px'
          td.style.wordBreak = 'break-all'
        }
      }
      this.dataList = elDataList // 遍历完后才设置数据
      // 合计
      for (const t in this.countCol) {
        let data = 0
        const label = this.countCol[t].split('|') // 取字段名
        for (let k = 0; k < this.res.length; k++) {
          if (this.unCountSum.join(',').indexOf(this.res[k].feeName) === -1) { // 排除不需要合计的费用项-行
            data += this.res[k][label[0]] ? Number(this.res[k][label[0]]) : 0
          }
        }
        if (data || data === 0) {
          if (label[1] && label[1] === 'integer') {
            this.countColVal[label[0]] = data || ''
          } else {
            this.countColVal[label[0]] = data ? data.toFixed(2) : ''
          }
        }
      }
      // 生成底部合计行
      const tfootTr = tfoot.insertRow()
      for (const t in this.columns) {
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
      const totalTable = document.getElementsByClassName('footTotalFee_settleRecordTotal')[0]
      const total_tfootLen = totalTable.getElementsByTagName('tfoot')
      if (total_tfootLen.length > 0) {
        totalTable.removeChild(total_tfootLen[0])
      }
      const total_tfoot = document.createElement('tfoot')

      totalTable.appendChild(total_tfoot)
      totalTable.style.borderCollapse = 'collapse'
      totalTable.style.border = '1px solid #d0d7e5'
      totalTable.setAttribute('border', '1')
      totalTable.setAttribute('font', '12px')
      // 生成底部合计行
      const total_tfootTr = total_tfoot.insertRow()
      for (const t in this.columns) {
        const td = total_tfootTr.insertCell()
        td.innerHTML = (this.columns[t].label === '序号' ? '合计' : (this.countColVal[this.columns[t].prop] ? this.countColVal[this.columns[t].prop] : '-'))
        td.style.textAlign = this.columns[t].textAlign
        td.style.padding = '2px 5px'
        td.style.fontSize = '13px'
        td.setAttribute('bgcolor', 'gainsboro')
        td.setAttribute('color', 'white')
        td.style.wordBreak = 'break-all'
      }

      // }).catch((err) => {
      //   this.loading = false
      //   this._handlerCatchMsg(err)
      // })
    },
    doAction(type) {
      this.setTableView()
      switch (type) {
        case 'print':
          PrintInSamplePage({
            id: 'report_settleRecordTotal',
            countCol: this.countCol
          })
          break
        case 'export':
          SaveAsSampleFile({
            id: 'report_settleRecordTotal',
            name: '应收应付汇总表',
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
      this.query = Object.assign({}, obj)
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
    },
    saveToTableSetup() {
      this.visible2 = false
      this.eventBus.$emit('tablesetup.change', this.thecode, this.columns)
    },
    setColumn(obj) { // 重绘表格列表
      this.columns = obj
      this.tablekey = Math.random() // 刷新表格视图
      this.setTableView()
    },
    getSummary(param) {
      const { columns, data } = param
      const sums = []
      sums[0] = '合计'
      columns.forEach((column, index) => {
        for (const i in this.countColVal) {
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
    .el-table thead.is-group th {
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

.info_tab_report_settleRecord {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 60px;
  overflow: auto;
  border: 1px solid #d0d7e5;
  box-shadow: 1px 1px 20px #ddd;
  .tableCloneHead {
    position: absolute;
    width: 100%;
    min-width: 1200px;
    top: 0;
    left: 0;
    z-index: 2;
    th {}
  }


  /*设置边框的*/
  .report_settleRecordTotal_table {
    width: 100%;
    min-width: 1200px;

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
        word-break: break-all;
      }
    }
    tfoot {
      display: none;
    }
  }
}

.footTotalFee_settleRecordTotal {
  width: 100%;
  position: absolute;
  min-width: 1200px;
  bottom: 0px;
  left: 0;
  z-index: 2;
  tfoot {
    color: #222;
    line-height: 24px;
    font-size: 13px;
    td {
      font-size: 13px;
      border: 1px solid #bbb;
      word-break: break-all;
    }
  }
}

</style>
