<template>
  <div class="tab-wrapper tab-wrapper-100 hyq-wallet-content miniHeaderSearch">
    <div class="tab-content" v-loading="loading">
      <div class="tab_info">
        <div class="btns_box">
          <div class="hyq-wallet-info">
            <div class="hyq-title">账户信息</div>
            <div class="hyq-wallet-money clearfix">
              账户余额：<span>{{ money }}</span>元
              <el-button v-has:WALLET_PAY type="primary" size="mini" @click="payoff">
                <icon-svg icon-class="caiwu"></icon-svg> 充值</el-button>
            </div>
          </div>
        </div>
        <div class="info_tab">
          <div class="hyq-title">账户收支记录</div>
          <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" btnsize="mini"></SearchForm>
          <div class="hyq-table-list">
            <el-table ref="multipleTable" :data="usersArr" stripe border tooltip-effect="dark" height="100%" @row-click="clickDetails" style="width: 100%;">
              <el-table-column fixed prop="id" width="60" label="序号">
                <template slot-scope="scope">{{ ((searchQuery.currentPage - 1)*searchQuery.pageSize) + scope.$index + 1 }}</template>
              </el-table-column>
              <template v-for="column in tableColumn">
                <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
                  <template slot="header" slot-scope="scope">
                    <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
                  </template>
                  <template slot-scope="scope">{{scope.row[column.prop]}}</template>
                </el-table-column>
                <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width || ''" :prop="column.prop">
                  <template slot="header" slot-scope="scope">
                    <tableHeaderSearch :scope="scope" :query="searchQuery" @change="changeKey" />
                  </template>
                  <template slot-scope="scope">
                    <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                    <span v-else v-html="column.slot(scope)"></span>
                  </template>
                </el-table-column>
              </template>
              <!--  <el-table-column
                fixed
                prop="tradeTime"
                width="180"
                label="交易时间">
              </el-table-column>
              <el-table-column
                prop="flowNo"
                width="230"
                label="交易流水">
              </el-table-column>
              <el-table-column
                prop="tradeTypeName"
                width="150"
                label="交易类型">
              </el-table-column>
              <el-table-column
                prop="tradeFee"
                width="150"
                label="交易金额">
                <template slot-scope="scope">
                  {{scope.row.expenditureChannelName ? '-' : '+' }}{{scope.row.tradeFee}}</template>
              </el-table-column>
              <el-table-column
                prop="incomeChannelName"
                label="收入渠道">
              </el-table-column>
              <el-table-column
                prop="expenditureChannelName"
                label="支出渠道">
              </el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="info_tab_footer">
        共计:{{ total }}
        <div class="show_pager">
          <Pager :total="total" @change="handlePageChange" />
        </div>
      </div>
    </div>
    <ReCharge :popVisible.sync="popVisible" @success="fetchAll"></ReCharge>
  </div>
</template>
<script>
import Pager from '@/components/Pagination/index'
import SearchForm from './components/search'
import ReCharge from './components/recharge'
import { objectMerge2, parseTime } from '@/utils/index'
import * as walletApi from '@/api/company/wallet'
import tableHeaderSearch from '@/components/tableHeaderSearch'

export default {
  components: {
    Pager,
    SearchForm,
    ReCharge,
    tableHeaderSearch
  },
  data() {
    return {
      loading: false,
      total: 0,
      money: 0,
      usersArr: [],
      tableColumn: [{
          label: '交易时间',
          prop: 'tradeTime'
        },
        {
          label: '交易流水',
          prop: 'flowNo'
        },
        {
          label: '交易类型',
          prop: 'tradeTypeName'
        },
        {
          label: '交易金额',
          prop: 'tradeFee',
          slot: (scope) => {
            return (scope.row.expenditureChannelName ? '-' : '+') + scope.row.tradeFee
          }
        },
        {
          label: '收入渠道',
          prop: 'incomeChannelName'
        },
        {
          label: '支出渠道',
          prop: 'expenditureChannelName'
        }
      ],
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'companyId': '',
          'endTime': 'string',
          // 'expenditureChannel': 0,
          // 'flowNo': 'string',
          // 'id': 0,
          // 'incomeChannel': 0,
          // 'outTradeNo': 'string',
          'startTime': 'string',
          // 'tradeFee': 0,
          // 'tradeStatus': 0,
          // 'tradeTime': '2018-09-19T02:24:21.672Z',
          'tradeType': 0
          // 'userId': 0
        }
      },
      popVisible: false
    }
  },
  mounted() {
    this.getYue()
  },
  methods: {
    changeKey(obj) {
      this.searchQuery = obj
      this.fetchData()
    },
    fetchAll() {
      this.getYue()
      this.fetchData()
    },
    // 获取账户余额
    getYue() {
      return walletApi.getMyWallet().then(data => {
        this.money = data
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    // 获取列表
    fetchData() {
      this.searchQuery.vo.companyId = this.otherinfo.companyId
      this.loading = true
      const data = objectMerge2(this.searchQuery)
      return walletApi.getTradeRecord(data).then(data => {
        this.usersArr = data.list
        this.total = data.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.fetchData()
    },
    getSearchParam(obj) {
      this.searchQuery.currentPage = this.$options.data().searchQuery.currentPage
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      this.searchQuery.vo = Object.assign(this.searchQuery.vo, obj)
      this.fetchData()
    },
    payoff() {
      this.popVisible = true
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    }
  }
}

</script>
<style lang="scss">
.wallet-content {}

.hyq-wallet-content {
  background: #eee;

  .tab-content .tab_info .btns_box {
    height: 100px;
    background: #fff;
    .el-button {
      float: none;
      margin-left: 100px;
    }
  }
  .tab-content .tab_info .info_tab {
    height: calc(100% - 88px);
  }
  .info_tab {
    background: #fff;
  }
  .staff_searchinfo {
    border: none;
    margin: 0;
    padding: 4px 0 10px;
    padding-right: 136px;
  }
  .hyq-wallet-info {
    font-size: 14px;
  }
  .hyq-title {
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    color: #333;
    font-size: 14px;
  }
  .hyq-wallet-money {
    padding: 10px;
  }
  .hyq-table-list {
    height: calc(100% - 91px);
  }
}

</style>
