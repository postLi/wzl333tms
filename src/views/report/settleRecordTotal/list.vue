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
      <div class="info_tab_report" id="report_settleRecordTotal">
        <table id="report_settleRecordTotal_table" width="780px" border="1px" style="border-collapse: collapse;">
          <thead border="1">
            <tr height="32px">
              <th rowspan="2" bgcolor="dimGray" width="70px">
                <font color="white" size="3">序号</font>
              </th>
              <th rowspan="2" bgcolor="dimGray" width="270px">
                <font color="white" size="3">费用项目</font>
              </th>
              <th colspan="4" bgcolor="dimGray">
                <font color="white" size="3">应收汇总</font>
              </th>
              <th colspan="4" bgcolor="dimGray">
                <font color="white" size="3">应付汇总</font>
              </th>
            </tr>
            <tr height="32px">
              <th bgcolor="dimGray"  width="90px">
                <font color="white" size="2">应收合计</font>
              </th>
              <th bgcolor="dimGray"  width="90px">
                <font color="white" size="2">已收</font>
              </th>
              <th bgcolor="dimGray"  width="90px">
                <font color="white" size="2">未收</font>
              </th>
              <th bgcolor="dimGray"  width="90px">
                <font color="white" size="2">数量</font>
              </th>
              <th bgcolor="dimGray"  width="90px">
                <font color="white" size="2">应付合计</font>
              </th>
              <th bgcolor="dimGray"  width="90px">
                <font color="white" size="2">已收</font>
              </th>
              <th bgcolor="dimGray"  width="90px">
                <font color="white" size="2">未收</font>
              </th>
              <th bgcolor="dimGray"  width="90px">
                <font color="white" size="2">数量</font>
              </th>
            </tr>
          </thead>
        </table>
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
import { reportSettleRecordTotal } from '@/api/report/report'
import { PrintInSamplePage, SaveAsSampleFile } from '@/utils/lodopFuncs'
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
          label: '费用项目',
          prop: 'feeName',
          textAlign: 'center'
        },
        {
          label: '应收合计',
          prop: 'totalreceivableFee',
          textAlign: 'right'
        },
        {
          label: '已收',
          prop: 'receivableFee',
          textAlign: 'right'
        },
        {
          label: '未收',
          prop: 'receivablUnpaidFee',
          textAlign: 'right'
        },
        {
          label: '数量',
          prop: 'receivableCount',
          textAlign: 'center'
        },
        {
          label: '应付合计',
          prop: 'totalpayableFee',
          textAlign: 'right'
        },
        {
          label: '已付',
          prop: 'payableFee',
          textAlign: 'right'
        },
        {
          label: '未付',
          prop: 'payableUnpaidFee',
          textAlign: 'right'
        },
        {
          label: '数量',
          prop: 'payableCount',
          textAlign: 'center'
        }
      ],
      countCol: [ // 需要合计的-列
        'totalreceivableFee',
        'receivableFee',
        'receivablUnpaidFee',
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
  methods: {
    reportSettleRecordTotal() {
      reportSettleRecordTotal(this.query).then(res => {
        let data = res
        let countColVal = []

        let table = document.getElementById('report_settleRecordTotal_table')
        let tbodyLen = table.getElementsByTagName('tbody')
        let tfootLen = table.getElementsByTagName('tfoot')
        if (tbodyLen.length > 0) {
          table.removeChild(tbodyLen[0])
          table.removeChild(tfootLen[0])
        }
        let tbody = document.createElement('tbody')
        let tfoot = document.createElement('tfoot')

        table.appendChild(tbody)
        table.appendChild(tfoot)
        table.style.borderCollapse = 'collapse'
        table.style.border = '1px solid #d0d7e5';
        table.setAttribute('border', '1')
        table.setAttribute('font', '12px')
        for (let k = 0; k < data.length; k++) {
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
        for (let t in this.countCol) {
          let data = 0
          let label = this.countCol[t].split('|') // 取字段名
          for (let k = 0; k < res.length; k++) {
          	if (this.unCountSum.join(',').indexOf(res[k].feeName) === -1) { // 排除不需要合计的费用项-行
          		data += res[k][label[0]] ? Number(res[k][label[0]]) : 0
          	}
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
      this.reportSettleRecordTotal()
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
  box-shadow: 1px 1px 20px #ddd; // table,
  // table tr th,
  // table tr td {
  //   border: 1px solid #d0d7e5;
  // }
  // table tbody tr td {
  //   text-align: right;
  // }
  // table tfoot tr td {
  //   text-align: right;
  // }
  /*设置边框的*/
  table {
    width: 100%; //   border-collapse: collapse;
    //   width: 100%;
    //   min-width: 1000px;
    //   overflow: auto;
    //   th,
    //   td {
    //     padding: 3px 5px;
    //   }
    //   td {
    //     font-size: 13px;
    //   }
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
    } // thead {
    //   background-color: #eaf0ff;
    //   color: #333;
    //   line-height: 23px;
    //   font-size: 14px;
    // }
    tbody,
    tfoot {
      // background-color: #eaf0ff;
      color: #222;
      line-height: 23px;
      font-size: 13px;
      td {
        // padding: 2px 5px;
        font-size: 13px;
      }
    }
  }
}

</style>
