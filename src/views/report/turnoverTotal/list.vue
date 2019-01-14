<template>
  <div class="tab-content chartSender">
    <!-- 搜索 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize"></SearchForm>
    <!-- 操作按钮 -->
    <div class="tab_info" v-loading="loading">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" v-has:REPORT_PRINT_3 @click="doAction('print')" plain>打印报表</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain>导出报表</el-button>
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-view" @click="doAction('preview')" plain>打印预览</el-button>
        <el-button type="primary" :size="btnsize" icon="el-icon-setting" @click="doAction('setting')" plain>打印设置</el-button> -->
      </div>
      <div class="tab_report">
        <el-popover @mouseenter.native="showSaveBox" @mouseout.native="hideSaveBox" placement="top" width="160" trigger="manual" v-model="visible2">
          <p>表格宽度修改了，是否要保存？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="saveToTableSetup">确定</el-button>
          </div>
          <el-table :key="tablekey" @header-dragend="setTableWidth" slot="reference" :data="dataList" style="width: 100%" :show-summary="true" height="100%" border ref="multipleTableRight" tooltip-effect="dark" triped :show-overflow-tooltip="true">
            <template v-for="column in columns">
              <el-table-column show-overflow-tooltip :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed" v-if="!column.scope"></el-table-column>
              <el-table-column show-overflow-tooltip :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed" v-else>
                <template slot-scope="scope">
                  <span v-html="column.slot(scope)"></span>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </el-popover>
      </div>
      <!-- <h2>应收应付汇总表</h2> -->
      <div @scroll="handleBottom" style="display: none;" class="info_tab_report" id="report_turnoverTotal">
        <table id="report_turnoverTotal_table" class="report_turnoverTotal_table">
        </table>
        <table ref="footTotalFee" class="footTotalFee_turnoverTotal">
          <colgroup width="65px"></colgroup>
          <colgroup width="110px"></colgroup>
          <colgroup width="110px"></colgroup>
          <colgroup width="110px"></colgroup>
          <colgroup width="110px"></colgroup>
          <colgroup width="110px"></colgroup>
          <colgroup width="110px"></colgroup>
          <colgroup width="110px"></colgroup>
          <colgroup width="110px"></colgroup>
        </table>
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
      tablekey: 0,
      dataList: [],
      setupTableVisible: false,
      thecode: 'FINANCE_TURNOVERREPORT',
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
        textAlign: 'center'
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
  mounted() {
    this.getScrollWidth()
   // 针对前端写的表格配置数据也进行简单的排序处理
      if (process.env.NODE_ENV !== 'production') {
        console.warn('表格设置字段：【前端写的数据】', this.columns.length, '个')
        let str = ''
        this.columns.forEach(e => {
          str += "INSERT INTO tms_common_title VALUES ('" + e.label + "', '" + e.prop + "', '');" + '\n'
        })
        console.log(str)
      }
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
    report() {
      this.loading = true
      reportTurnoverTotal(this.query).then(res => {
        let data = res.list
        this.dataList = res.list || []
        const countColVal = []
        this.loading = false
        const div = document.getElementById('report_turnoverTotal')
        const table = document.getElementById('report_turnoverTotal_table')
        if (!table) {
          return
        }
        const theadLen = table.getElementsByTagName('thead')
        const tbodyLen = table.getElementsByTagName('tbody')
        const tfootLen = table.getElementsByTagName('tfoot')
        if (theadLen.length > 0) {
          table.removeChild(theadLen[0])
          table.removeChild(tbodyLen[0])
          table.removeChild(tfootLen[0])
        }
        const thead = document.createElement('thead')
        const tbody = document.createElement('tbody')
        const tfoot = document.createElement('tfoot')
        const theadTr = document.createElement('tr')

        // 添加表头
        const theadTrTitle = document.createElement('tr')
        const thTitle = document.createElement('th')
        const fontTitle = document.createElement('font')
        let thetitle = '营业额汇总表'
        thTitle.setAttribute('colspan', this.columns.length)
        thTitle.setAttribute('height', '32px')
        thTitle.setAttribute('bgcolor', 'gray')
        fontTitle.setAttribute('color', 'white')
        if (this.timeobj.createTimeStart) {
          thetitle = parseTime(this.timeobj.createTimeStart, '{y}年{m}月{d}日') + '~' + parseTime(this.timeobj.createTimeEnd, '{y}年{m}月{d}日') + thetitle
        }
        fontTitle.innerHTML = thetitle

        thTitle.appendChild(fontTitle)
        theadTrTitle.appendChild(thTitle)
        thead.appendChild(theadTrTitle)

        table.appendChild(thead)
        table.appendChild(tbody)
        table.appendChild(tfoot)
        thead.appendChild(theadTr)
        table.style.borderCollapse = 'collapse'
        table.style.border = '1px solid #d0d7e5'
        table.setAttribute('border', '1')
        table.setAttribute('font', '12px')
        table.setAttribute('width', '780px')

        theadTr.setAttribute('height', '32px')
        theadTr.setAttribute('width', '100%')

        for (let i = 0; i < this.columns.length; i++) { // 设置表头
          const th = document.createElement('th')
          const font = document.createElement('font')
          font.innerHTML = this.columns[i].label
          font.setAttribute('size', 2)
          font.setAttribute('color', 'white')
          th.setAttribute('border', 1)
          th.setAttribute('bgcolor', 'dimGray')
          th.appendChild(font)
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
            for (const t in this.countCol) { // 保留两位小数
              if (this.columns[j].prop.indexOf(this.countCol[t]) !== -1) {
                data[k][this.columns[j].prop] = data[k][this.columns[j].prop] ? Number(data[k][this.columns[j].prop]).toFixed(2) : '0.00'
              }
            }
            td.innerHTML = (this.columns[j].prop === 'number' || this.columns[j].label === '序号') ? k + 1 : (typeof data[k][this.columns[j].prop] === 'undefined' ? '' : data[k][this.columns[j].prop])
            td.style.textAlign = this.columns[j].textAlign // 设置居中方式
            td.style.padding = '2px 5px'
            td.style.fontSize = '13px'
            td.style.width = (this.columns[j].width || 120) + 'px'
          }
        }
        // 合计
        const dataList = res.list
        for (const t in this.countCol) {
          let data = 0
          const label = this.countCol[t].split('|') // 取字段名
          for (let k = 0; k < dataList.length; k++) {
            data += dataList[k][label[0]] ? Number(dataList[k][label[0]]) : 0
          }
          if (data || data === 0) {
            if (label[1] && label[1] === 'integer') {
              this.countColVal[label[0]] = data || '0.00'
            } else {
              this.countColVal[label[0]] = data ? data.toFixed(2) : '0.00'
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
        }

        // 复制-生成多一个浮动的底部合计行
        const totalTable = document.getElementsByClassName('footTotalFee_turnoverTotal')[0]
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
    getSearchParam(obj, timeobj) {
      this.query = Object.assign(this.query, obj)
      this.timeobj = timeobj
      this.report()
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
    overflow: hidden;
  }
  .tab_report {
    height: 100%;
  }
}

.hidetrigger {
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 100px);
}
.info_tab_report {
  height: 100%;
  padding-bottom: 60px;
  overflow: auto;
  border: 1px solid #d0d7e5;
  box-shadow: 1px 1px 20px #ddd;
  position: relative;
  .tableCloneHead {
    position: absolute;
    width: 100%;
    min-width: 1200px;
    top: 0;
    left: 0;
    z-index: 2;
    th {
       width: 7%;
      word-break: break-all;
    }
  }

  /*设置边框的*/
  .report_turnoverTotal_table {
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
           width: 7%;
          word-break: break-all;
        }
      }
      tfoot {
        display: none;
      }
  }
}

.footTotalFee_turnoverTotal {
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
       width: 7%;
      border: 1px solid #bbb;
      word-break: break-all;
    }
  }
}
</style>
