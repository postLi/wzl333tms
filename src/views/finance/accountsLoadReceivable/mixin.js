import transferTable from '@/components/transferTable'
import querySelect from '@/components/querySelect/'
import Pager from '@/components/Pagination/index'
import currentSearch from './components/currentSearch'
import Voucher from '@/components/voucher/receivable'
import { objectMerge2, parseTime, getSummaries, tmsMath, operationPropertyCalc } from '@/utils/index'
import * as accountApi from '@/api/finance/accountsReceivable'
// import Receipt from './components/receipt'

export default {
  components: {
    transferTable,
    querySelect,
    // Receipt,
    Pager,
    currentSearch,
    Voucher
  },
  activated() {
     // 先不做判断提示，如果是新的核销参数则更新，否则不更新
    if (this.lastquery !== JSON.stringify(this.$route.query)) {
      this.getRouteInfo = JSON.parse(this.$route.query.searchQuery)
      this.lastquery = JSON.stringify(this.$route.query)
      this.getList()
    }
  },
  data() {
    return {
      getRouteInfo: {}
    }
  },
  computed: {
/*     getRouteInfo() {
      const obj = this.$route.query
      return JSON.parse(obj.searchQuery)
    }, */
    // totalLeft() {
    //   return this.leftTable.length
    // },
    totalRight() {
      return this.rightTable.length
    }
  },
  created() {
    this.getRouteInfo = JSON.parse(this.$route.query.searchQuery)
    this.searchQuery = Object.assign({}, this.getRouteInfo)
    this.lastquery = JSON.stringify(this.$route.query)
  },
  mounted() {
    this.getList()
  },
  watch: {
    /* '$route.query': {
      handler(cval, oval) {
        // 先不做判断提示，如果是新的核销参数则更新，否则不更新
        if (cval) {
          this.getList()
        }
      },
      deep: true
    } */
  },
  methods: {
    handlePageChangeLeft(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      // console.log(obj.pageSize, obj.pageNum, obj)
      this.pageGetList()
    },
    pageGetList() {
      const rightTable = objectMerge2([], this.rightTable)
      this.loading = true
      this.$set(this.searchQuery.vo, 'status', 'NOSETTLEMENT,PARTSETTLEMENT')
      accountApi.getReceivableList(this.searchQuery).then(data => {
        if (data) {
          this.leftTable = Object.assign([], data.list)
          this.totalLeft = data.total
          rightTable.forEach((el, index) => {
            this.leftTable = this.leftTable.filter(em => em.shipSn !== el.shipSn)
          })
        }
        this.orgLeftTable = Object.assign([], this.leftTable)
        this.loading = false
      })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    initLeftParams() {
      if (!this.$route.query) {
        this.eventBus.$emit('replaceCurrentView', '/finance/accountsReceivable')
        // this.$router.push({ path: './accountsPayable/waybill' })
        this.isFresh = true // 是否手动刷新页面
      } else {
        this.searchQuery = Object.assign({}, this.getRouteInfo)

        // this.$set(this.searchQuery.vo, 'feeType', this.getRouteInfo.vo.feeType)
        // this.searchQuery.vo.ascriptionOrgId = this.getRouteInfo.vo.ascriptionOrgId
        // this.$set(this.searchQuery.vo, 'status', '')
        this.isFresh = false
      }

      if (JSON.parse(this.$route.query.selectListShipSns).length > 0) {
      } else {
        this.searchQuery.currentPage = 1
        // this.searchQuery.pageSize = 100
      }
      this.$set(this.searchQuery.vo, 'status', 'NOSETTLEMENT,PARTSETTLEMENT')
    },
    setRight(item) {
      item.inputNowPayFee = item.notNowPayFee
      item.inputArrivepayFee = item.notArrivepayFee
      item.inputReceiptpayFee = item.notReceiptpayFee
      item.inputMonthpayFee = item.notMonthpayFee
      item.inputChangeFee = item.notChangeFee

      // this.rightTable.push(item)

      this.$set(this.rightTable, this.rightTable.length, item)
    },
    clickDetailsRight(row) {
      this.$refs.multipleTableRight.toggleRowSelection(row)
    },
    clickDetailsLeft(row) {
      this.$refs.multipleTableLeft.toggleRowSelection(row)
    },
    getSelectionRight(list) { // 获取右边表格打勾的数据列表
      this.selectedRight = list
    },
    getSelectionLeft(list) { // 获取左边表格打勾的数据列表
      this.selectedLeft = list
    },
    changeTableKey() { // 刷新表格
      this.tablekey = new Date().getTime()
    },
    doAction(type) {
      switch (type) {
        case 'goLeft': // 右边数据勾选到左边
          this.goLeft()
          break
        case 'goRight': // 左边数据勾选到右边
          this.goRight()
          break
      }
    },
    goLeft() { // 数据从左边穿梭到右边
      if (this.selectedRight.length === 0) {
        this.$message({ type: 'warning', message: '请在左边表格选择数据' })
      } else {
        this.selectedRight.forEach((e, index) => {
          // 默认设置实际核销数量
          e.inputBrokerageFee = e.unpaidFee
          this.setRight(e)
          this.rightTable = objectMerge2([], this.rightTable).filter(em => {
            return em.shipSn !== e.shipSn
          })
          this.rightTable.push(e)
          this.leftTable = objectMerge2([], this.leftTable).filter(el => {
            return el.shipSn !== e.shipSn
          })
          this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(el => {
            return el.shipSn !== e.shipSn
          })
        })
        this.selectedRight = [] // 清空选择列表
      }
      if (this.rightTable.length < 1) {
        this.isGoReceipt = true
      } else {
        this.isGoReceipt = false
      }
    },
    goRight() { // 数据从右边穿梭到左边
      if (this.selectedLeft.length === 0) {
        this.$message({ type: 'warning', message: '请在右边表格选择数据' })
      } else {
        this.selectedLeft.forEach((e, index) => {
          this.leftTable = objectMerge2([], this.leftTable).filter(em => {
            return em.shipSn !== e.shipSn
          })
          this.orgLeftTable = objectMerge2([], this.orgLeftTable).filter(em => {
            return em.shipSn !== e.shipSn
          })
          this.leftTable.push(e)
          this.orgLeftTable.push(e) // 搜索源数据更新添加的数据
          this.rightTable = objectMerge2([], this.rightTable).filter(el => {
            return el.shipSn !== e.shipSn
          })
        })
        this.selectedLeft = [] // 清空选择列表
      }
      if (this.rightTable.length < 1) {
        this.isGoReceipt = true
      } else {
        this.isGoReceipt = false
      }
    },
    // 选中的行
    selectCurrent(obj, index) {
      // this.leftTable = Object.assign([], obj)
      this.addItem(obj, index)
    },
    addItem(row, index) { // 添加单行
      this.selectedRight = []
      this.selectedRight[index] = row
      this.doAction('goLeft')
    },
    minusItem(row, index) { // 减去单行
      this.selectedLeft = []
      this.selectedLeft[index] = row
      this.doAction('goRight')
    },
    addALLList() { // 添加全部
      this.selectedRight = Object.assign([], this.leftTable)
      this.doAction('goLeft')
    },
    minusAllList() { // 减去全部
      this.selectedLeft = Object.assign([], this.rightTable)
      this.doAction('goRight')
    },
    dclickMinusItem(row, event) { // 双击减去单行
      this.selectedLeft = []
      this.selectedLeft.push(row)
      this.doAction('goRight')
    },
    dclickAddItem(row, event) { // 双击添加单行
      this.selectedRight = []
      this.selectedRight.push(row)
      this.doAction('goLeft')
    },
    closeDialog() {
      this.popVisibleDialog = false
    },
    openDialog() {
      this.popVisibleDialog = true
    },
    getSumRight(param) { // 右边表格合计-自定义显示
      const arr = objectMerge2([], operationPropertyCalc)
      arr.forEach((el, index) => {
        if (el === '_index|1|单') {
          arr[index] = '_index|2|单'
        }
      })
      return getSummaries(param, arr)
    },
    getSumLeft(param) { // 左边表格合计-自定义显示
      const arr = objectMerge2([], operationPropertyCalc)
      arr.forEach((el, index) => {
        if (el === '_index|1|单') {
          arr[index] = '_index|2|单'
        }
      })
      return getSummaries(param, arr)
    },
    setHeader(h, { column }) {
      return h('el-button', {
        props: {
          // icon: 'el-icon-plus',
          size: 'mini'
        },
        'class': {
          'tableAllBtn': true,
          'setTableHeader': true
        },
        on: {
          click: this.addALLList
        }
      })
    },
    setHeader2(h, { column }) {
      return h('el-button', {
        props: {
          // icon: 'el-icon-minus',
          size: 'mini'
        },
        'class': {
          'tableAllBtnMinus': true,
          'setTableHeader': true
        },
        on: {
          click: this.minusAllList
        }
      })
    }
  }
}
