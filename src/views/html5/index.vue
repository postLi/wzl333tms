<template>
  <div class="html5index2 main_html5_content">
    <!-- <h4>数据总览</h4> -->
      <div class="head_title clearfix">
        <div class="getorglist">
          <SelectTree multiple :multiple-limit="10"  v-model="orgId" :orgid="otherinfo.orgid" :filterable="false"></SelectTree>
        </div>
        <ul>
        <li v-for="(item, index) in dataBtns" :class="{'active':item.value === currentkey} " :key="index" @click="()=>{setCurrentKey(item)}">{{item.label}}</li>
        <li>
          <el-date-picker
            v-model="pickerDate"
            type="daterange"
            align="right"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getDateChange"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickOption">
          </el-date-picker>
        </li>
      </ul>
      </div>
      <el-row class="main_forthUl" :gutter="15">
          <el-col :span="6">
            <ul>
              <li>总账 </li>
              <li>收入:<span>{{ thedata.amountCollect }}</span>元</li>
              <li>支出:<span>{{ thedata.amountPay}}</span>元</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <ul>
              <li>
                收入分布
              </li>
              <li>收入小计:<span>{{ totalIncome }}</span>元</li>
              <li>已<i class="marginem"></i>收:<span>{{ thedata.amountReceivableFee }}</span>元</li>
              <li>未<i class="marginem"></i>收:<span>{{ thedata.amountUnreceivableFee }}</span>元</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <ul class="zhichulie">
              <li>
                支出分布
              </li>
              <li>支出小计: <span class="marginleft">{{ totalpay }}</span>元</li>
              <li>车<i class="marginem"></i>费: 已付<span>{{ thedata.hadPayCarFee }}</span>元，未付<span>{{thedata.unPayCarFee}}</span>元</li>
              <li>中<i class="marginem"></i>转: 已付<span>{{ thedata.hadPayTransferFee }}</span>元，未付<span>{{thedata.unPayTransferFee}}</span>元</li>
              <li>其<i class="marginem"></i>它: 已付<span>{{ thedata.hadPayOtherFee }}</span>元，未付<span>{{thedata.unPayOtherFee}}</span>元</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <ul>
              <li>
                利润情况

              </li>
              <li class="profit-num"><i class="xdata"><span>{{ thedata.profit }}</span>元</i><i class="xline"></i><i class="xtip">毛利润</i></li>
            </ul>
          </el-col>
      </el-row>

      <el-row class="main_left" :gutter="15">
        <el-col :span="18">
          <ul class="ul_left" id="main"></ul>
        </el-col>
        <el-col :span="6">
          <div class="databox datablue">
            <span class="dataico"><icon-svg icon-class="caiwugl2_yingfu" /></span>
            <span class="databox-value">{{thedata.amountReceivableFee}}元</span>
            <span class="databox-label">现金流入</span>
          </div>
          <div class="databox-line"></div>
          <div class="databox datared">
            <span class="dataico"><icon-svg icon-class="caiwugl1_yingshou" /></span>
            <span class="databox-value">{{thedata.amountPayableFee}}元</span>
            <span class="databox-label">现金流出</span>
          </div>
          <div class="databox-line"></div>
          <div class="databox datagreen">
            <span class="dataico"><icon-svg icon-class="caiwu" /></span>
            <span class="databox-value">{{ thedata.amountReceivableFee - thedata.amountPayableFee }}元</span>
            <span class="databox-label">流水差</span>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
// 需要考虑按需引入，减小引入体积
// echarts的各模块
// https://github.com/apache/incubator-echarts/blob/master/index.js
import echarts from 'echarts'
import { pickerOptions4, tmsMath, pickerOptions } from '@/utils/index'
import { postHomedetail, getHomeYearDetail, getConsoleData, getConsoleChartData } from '@/api/index'
import Arrow from './arrow'
import SelectTree from '@/components/selectTree/index'

export default {
  components: {
    Arrow,
    SelectTree
  },
  watch: {
    currentkey(newVal) {
      if (newVal !== '') {
        this.getData()
        // this.doAction(newVal)
      }
    }
  },
  data() {
    return {
      dataset: [],
      currentkey: '',
      orgId: [],
      searchQuery: {
        vo: {
          'nowStartTime': '',
          'nowEndTime': '',
          'buttonKey': 0,
          'orgAllId': ''
        }
      },
      dataBtns: [{
        label: '今天',
        value: 0
      }, {
        label: '本月',
        value: 1
      }, {
        label: '近三月',
        value: 2
      }, {
        label: '今年',
        value: 3
      }, {
        label: '全部',
        value: 4
      }],
      thedata: {
        'abnormalAddCent': '0.00%',
        'abnormalAddFee': 0, // 异动增款
        'abnormalSubFee': 0, // 异动减款
        'addComCent': '0.00%',
        'amountCollect': 0, // 运单总数
        'amountCent': '0.00%',
        'amountCollectCent': '0.00%',
        'amountPayCent': '0.00%',
        'amountVolume': 0, // 总体积
        'amountPay': 0, // 总重量
        'arriveComCent': '0.00%',
        'arrivePayCent': '0.00%',
        'hadPayCarFee': 0, // 到付
        'brokerageComCent': '0.00%',
        'brokerageFee': 0, // 回扣
        'collectFee': 0, // 总收入
        'creatTime': null, // 开单时间
        'lineArrive': 0, // 干线到车总数
        'lineArriveCent': '0.00%',
        'lineComCent': '0.00%',
        'lineFee': 0, // 干线费
        'amountUnreceivableFee': 0, // 干线发车总数
        'amountUnreceivableFeeCent': '0.00%',
        'monthComCent': '0.00%',
        'monthPayCent': '0.00%',
        'hadPayOtherFee': 0, // 月结
        'nowComCent': '0.00%',
        'nowPayCent': '0.00%',
        'nowPayFee': 0, // 现付
        'orgid': 0, // 归属网点
        'otherComCent': '0.00%',
        'otherFee': 0, // 其他费
        'payFee': 0, // 总支出
        'receiptComCent': '0.00%',
        'receiptPayCent': '0.00%',
        'hadPayTransferFee': 0, // 回单付
        'sendComCent': '0.00%',
        'sendFee': 0, // 送货费
        'amountReceivableFee': 0, // 短驳到车总数
        'amountReceivableFeeCent': '0.00%',
        'shortComCent': '0.00%',
        'shortFee': 0, // 短驳费
        'shortSend': 0, // 短驳发车总数
        'shortSendCent': '0.00%',
        'subComCent': '0.00%',
        'type': null, // 数据类型：0,短驳发车；1，短驳到车；2，干线发车；3，干线到车
        'volume': 0, // 体积
        'volumeCent': '0.00%',
        'week': 0, // 星期几
        'weight': 0, // 重量
        'weightCent': '0.00%',
        profit: '0',
        'id': null,
        amountPayableFee: '0',
        unPayTransferFee: 0,
        unPayOtherFee: 0,
        unPayCarFee: 0
      },
      pickerDate: [],
      pickOption: {
        shortcuts: pickerOptions
      },
      pickerOptions3: {
        shortcuts: [{
          text: '今天',
          keyval: 0,
          onClick(picker) {
            // 今天
            const Today = pickerOptions4.today()
            // 昨天
            const yesterDay = pickerOptions4.yesterDay()
            // console.log(pickerOptions4.today())
            picker.$emit('pick', Today)
          }
        }, {
          text: '昨天',
          keyval: 1,
          onClick(picker) {
            // 昨天
            const yesterDay = pickerOptions4.yesterDay()
            // 前天
            const beforeDady = pickerOptions4.beforeDady()
            console.log(pickerOptions4.yesterDay())
            picker.$emit('pick', YesterDay)
          }
        }, {
          text: '本周',
          keyval: 2,
          onClick(picker) {
            // 最近的星期天的日期，到今天的日期
            const CurrentWeek = pickerOptions4.currentWeek()
           // 上上周星期天的日前，到上周六的日期
            const lastWeek = pickerOptions4.lastWeek()
            // console.log(pickerOptions4.currentWeek())
            picker.$emit('pick', CurrentWeek)
          }
        }, {
          text: '本月',
          keyval: 3,
          onClick(picker) {
            // 本月1日到今天的日前
            const CurrentMonth = pickerOptions4.currentMonth()
            // 上月1日到上月的结束时间
            const LastMonth = pickerOptions4.lastMonth()
            // console.log(pickerOptions4.lastMonth())
            picker.$emit('pick', CurrentMonth)
          }
        }, {
          text: '本年',
          keyval: 4,
          onClick(picker) {
            const CurrentYear = pickerOptions4.currentYear()
            const LastYear = pickerOptions4.lastYear()
            picker.$emit('pick', CurrentYear)
          }
        }]

      },
      value6: '',
      value7: ''
    }
  },
  computed: {
    totalIncome() {
      return tmsMath.add(this.thedata.amountReceivableFee, this.thedata.amountUnreceivableFee).result()
    },
    totalpay() {
      const data = this.thedata
      return tmsMath.add(data.hadPayCarFee, data.unPayCarFee, data.hadPayTransferFee, data.unPayTransferFee, data.hadPayOtherFee, data.unPayOtherFee).result()
    }
  },
  methods: {
    setCurrentKey(item) {
      this.currentkey = item.value
      console.log('item::', item)
    },
    getDateChange(val) {
      this.searchQuery.vo.buttonKey = 5
      this.searchQuery.vo.nowStartTime = val[0]
      this.searchQuery.vo.nowEndTime = val[1]
      this.currentkey = 5
    },
    doAction(type) {
      switch (type) {
        case 0:
          const Today = pickerOptions4.today()
          // console.log(this.dataset)
          // picker.$emit('pick', Today)
          this.pickerDate = Today
          this.searchQuery.vo.buttonKey = 0
          this.currentkey = 0
          console.log('今天')
          break
        case 1:
          const YesterDay = pickerOptions4.yesterDay()
          this.pickerDate = YesterDay
          console.log('昨天')
          this.searchQuery.vo.buttonKey = 1
          this.currentkey = 1
          break
        case 2:
          // 最近的星期天的日期，到今天的日期
          const CurrentWeek = pickerOptions4.currentWeek()
          // 上上周星期天的日前，到上周六的日期
          const lastWeek = pickerOptions4.lastWeek()
          this.pickerDate = CurrentWeek
          this.searchQuery.vo.buttonKey = 2
          this.currentkey = 2
          console.log('本周')
          break
        case 3:
          // 本月1日到今天的日前
          const CurrentMonth = pickerOptions4.currentMonth()
          // 上月1日到上月的结束时间
          const LastMonth = pickerOptions4.lastMonth()
          this.pickerDate = CurrentMonth
          this.searchQuery.vo.buttonKey = 3
          this.currentkey = 3
          console.log('本月')
          break
        case 4:
          const CurrentYear = pickerOptions4.currentYear()
          const LastYear = pickerOptions4.lastYear()
          this.pickerDate = CurrentYear
          this.searchQuery.vo.buttonKey = 4
          this.currentkey = 4
          break
      }
      this.getData()
    },
    getData() {
      /**
       *
      *选择的日期周期(0:今天；1：昨天；2：本周；3：本月； 4：本年；5：自定义；
      private Integer buttonKey;
        */
      const data = Object.assign({}, this.searchQuery.vo)
      data.orgAllId = this.orgId.join(',')
      // 临时测试数据
      data.orgAllId = this.orgId.map((res, index) => {
        return (index + 1)
      }).join(',')
      data.buttonKey = this.currentkey
      getConsoleData(data).then(res => {
        const data = res.data
        if (data) {
          for (const i in data) {
            if (data[i] === null) {
              data[i] = ' - '
            }
          }
          this.thedata = data
          // this.setInChart()
          // this.setCompareChart()
        }
      }).catch(err => {
        this.currentkey = ''
        this.$message.warning('查不到相关数据。')
      })
    },
    initYearChart(echart, shipArr, volumeArr) {
      const option3 = {
        title: {
          text: '收支走势',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // selectedMode: 'single',
          selected: {
            '收入': true,
            '支出': true
          },
          data: ['收入', '支出']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            // '2018年\n\r1月'
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '收入',
            type: 'line',
            smooth: true,
            itemStyle: { normal: { color: '#FF7F50', areaStyle: { type: 'macarons', color: '#FF7F50' }}},
            // data: [2.0, 4.9, 7.0, 0, 25.6, 76.7, 135.6, 162.2, '', '', '', ''],
            data: shipArr,
            markPoint: {
              data: [
                      { type: 'max', name: '最大值' },
                      { type: 'min', name: '最小值' }
              ]
            }
          },
          {
            name: '支出',
            type: 'line',
            smooth: true,
            itemStyle: { normal: { color: '#5AB1EF', areaStyle: { type: 'macarons', color: '#5AB1EF' }}},
            // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 0, 0, 0, 0],
            data: volumeArr,
            markPoint: {
              data: [
                      { type: 'max', name: '最大值' },
                      { type: 'min', name: '最小值' }
              ]
            }
          }
        ]
      }
      echart.hideLoading()
      echart.setOption(option3)
    }
  },
  mounted() {
    this.dataset = this.pickerOptions3.shortcuts
    // 默认展示今天的数据
    this.currentkey = 0
    this.orgId = [this.otherinfo.orgid]

   //  this.searchForm = this.
    var myChart3 = echarts.init(document.getElementById('main'))
    window.onresize = () => {
      myChart3.resize({
        width: 'auto',
        height: 'auto'
      })
    }
   // 获取年度运力数据
    myChart3.showLoading()
    getConsoleChartData().then(res => {
      const data = res.data || []
      const monthArr = []
      const shipArr = []
      const weightArr = []
      const volumeArr = []
      data.map(el => {
        shipArr.push(el.amountCollect)
        weightArr.push(el.amountPay)
      })
      this.initYearChart(myChart3, shipArr, weightArr)
    })
    /* getHomeYearDetail().then(data => {
      data = data || []
      const monthArr = []
      const shipArr = []
      const weightArr = []
      const volumeArr = []
      data.map(el => {
        shipArr.push(el.amountCollect)
        weightArr.push(el.amountPay)
      })
      this.initYearChart(myChart3, shipArr, weightArr)
    }).catch(err => {
      console.log('fetch err info:', err)
      const shipArr = [2.0, 4.9, 7.0, 10, 25.6, 76.7, 135.6, 162.2, '', '', '', '']
      const weightArr = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 0, 0, 0, 0]
      const volumeArr = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 0, 0, 0, 0]
      this.initYearChart(myChart3, shipArr, weightArr, volumeArr)
    }) */

    // 为echarts对象加载数据
    // myChart.setOption(option)
    // myChart2.setOption(option2)
  }
}
</script>
<style lang="scss">
// .app-main{
//   background:rgb(235,235,235);
// }
.html5index2{
  min-width: 1100px;
  height: 100%;
  min-height: 666px;
  background:rgb(235,235,235);
}
.main_html5_content{
  padding: 15px;
  overflow-y: hidden;
  // background:rgb(235,235,235);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .head_title{
    height: 31px ;
    line-height: 31px ;
    overflow: hidden;
    border-radius: 2px;
    background: #fff;
    box-sizing: border-box;
    position: relative;
    // margin-bottom: 0.6%;
    // box-shadow: 2px 2px 2px 2px ,-2px -2px -2px -2px rgba(0, 0, 0, 0.10);
    h4{
      font-size: 14px;
      display: inline-block;
    }
    .getorglist{
      border-left: 1px solid #eee;
      position: absolute;
      right: 10px;
      top: 0;
      z-index: 2;
      font-size: 14px;
      line-height: 31px;
      .el-input--suffix .el-input__inner{
        border: none;
        line-height: 30px;
        height: 30px;
        width: 170px;
      }
      .el-input__icon{
        line-height: 30px;
      }
      .el-select__tags-text{
        color: #3E9FF1;
      }
      .el-select .el-tag{
        background: none;
      }
    }
    ul{
      // margin-right: -50% !important;
      
      position: relative;
      width: 100%;
      padding-right: 180px;
      // width: 45%;
      height: 100%;
      text-align: right;
      // background:yellow;
      li{
        display: inline-block;
        min-width: 45px;
        text-align: center;
        
        white-space: nowrap;
        font-size: 14px;
        color:#333; /* 初始颜色 */
        cursor: pointer;
         box-sizing: border-box;
        .el-range-editor.el-input__inner{
          // margin-left:10px !important;
          height:4%;
          line-height: 30px;
          border:none;
          // position:relative;
          // position:absolute;
        }
        .el-date-editor .el-range__close-icon{
          // margin-top:-2%;
          position:absolute;
          right:10%;
          top:0%;
        }
        .el-date-editor .el-range__icon {
          display:none;
        }
        .el-date-editor .el-range-separator{
          line-height: 25px;
        }
        .el-range-editor .el-range-input{
          margin-left:10px !important;
        }
      }
      // li:nth-child(6){
      //   width:40%;
      //   height: 100%;
      //   background: red;
      // }
      li:hover,li.active{
        color:#3e9ff1;
        transform: scale(1.4);
        
        // font-weight: bold;
      }
      li:nth-child(6):hover {
        transform: none;
      }
    }
  }


  .databox{
    position: relative;
    height: 31%;
    color: #fff;
    padding-right: 20px;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all .2s ease;

    &:hover{
      box-shadow: 0 3px 10px rgba(0,0,0,.3);
    }
    .dataico{
      position: absolute;
      left:20px;
      top: 50%;
      margin-top: -35px;
      font-size: 70px;
      opacity: 0.2;
    }

    .databox-value{
      font-size: 48px;
      margin-bottom: 10px;
      display: block;
    }
    .databox-label{
      font-size: 16px;
      color: #fff;
      color: rgba(255,255,255,.6);
    }
  }
  .datablue{
    background: #409EFF;
  }
  .datared{
    background: #F56C6C;
  }
  .datagreen{
    background: #67C23A;
  }
  .databox-line{
    height: 3.5%;
  }
  .main_forthUl{
    overflow: hidden;
    -moz-box-sizing: border-box;
     box-sizing: border-box;
     height: 215px;
    ul{
      // border:1px solid #ddd;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.10);
      background: #fff;
      height: 185px;
      margin: 15px 0 15px 0;
      box-sizing: border-box;
      position: relative;
      transition: color 4s ease;
      border-radius: 5px;
       .box_gg,.box_gg1{
          position: absolute;
          width: 8%;
          height: 16%;
          top: 0.1%;
          left: 92.2%;
          // background: red;
          display: none;
          background-repeat: no-repeat;
          background-position: right;
          box-sizing: border-box;
          z-index: 10000;
          img{
            background-size:cover;
            width: 100%;
            height:100%;
          }
        }
      &.zhichulie{
        li span{
          min-width: 4em;
          text-align: center;
          display: inline-block;
        }
      }
      li{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 5px 5px 0 0;
        
        .marginem{
          display: inline-block;
          width: 2em;
        }
        .marginleft{
          margin-left: 2em;
        }
        span{
          color:red;
          padding:0 5px;
          // border-bottom: 1px solid #999;
        }
        em{
          float:right;
          i{
            margin-left:5px;
          }
        }
      }
      li:nth-child(1){
        border-bottom: 1px solid #ddd;
        font-weight: bold;
      }
      li.profit-num{
        text-align: center;
        line-height: 1.5;
        

        .xdata{
          span{
            font-size: 36px;
            max-width: 7em;
            white-space: nowrap;
            display: inline-block;
            line-height: 146px;
            
          }
        }
        .xline{
          height: 60px;
          width: 1px;
          background: #999;
          display: inline-block;
          margin: 0 5px;
          transform: rotate(15deg) translate(7px,15px);
          display: none;
        }
        .xtip{
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: #ef0000;
        }
        i{
          font-style: normal;
        }
      }
    }
    ul:nth-child(4){
      margin:15px 0 15px 0;
    }
  }
  .main_forthUl ul:hover {
    border:1px solid #3e9ff1;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.2s ease-out; 
    box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.40); 
    overflow: hidden;
    color: #3e9ff1;
    // opacity: rgba(0, 0, 0, 0.44);
    // font-weight: 300;
    // transform: translateY(-3px); transition-delay: 0.1s; 
  }
  .main_forthUl ul li:nth-child(1){
    //  transform: translateX(-200px); transition-delay: 0.2s; 
    // background-color: #6bc9eb;
    // color:#fff;
  }
  .main_forthUl ul:hover .box_gg{
    display: none;
  }
  .main_forthUl ul:active .box_gg1{
    display: none;
  }
  .main_left{
    padding: 0 0 !important ;
    flex:1;
    overflow: hidden;
    .el-col{
      height: 100%;
    }
    .ul_left{
      background:#fff;
      height:100%;
      // box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.10);
      //  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.10);
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.10) ;
      border:1px solid #ddd;
    }
    .ul_right{
      height:100%;
      
      li{
        width: 100%;
        height: 50%;
        padding-top: 7.5px;
         
        .inner_div{
          height: 100%;
          background: #fff;
          border-radius: 5px;
          padding-top: 30px;
          // box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.10) inset;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.10) ;
          border:1px solid #ddd;

          &>div{
           height: 100%;
         }
        }
         
        canvas{
          height: 100%;
        }
        p{
          margin-top: -30px;
          font-size: 14px;
          padding: 7px;
          // background-color: #6bc9eb;
          // color:#fff;
          border-radius: 5px 5px 0 0;
        }
        
      }
      li:nth-child(1){
        padding-bottom: 7.5px;
        padding-top: 0;
      } 
      .inner_div:hover{
        cursor: pointer;
        box-sizing: border-box;
        transition: all 0.2s ease-out; 
        box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.10); 
        overflow: hidden;
        color: #3e9ff1;
        // opacity: rgba(0, 0, 0, 0.44);
        // font-weight: 300;
        transform: translateY(-3px); transition-delay: 0.2s; 
      }
      #main{
        height: 100%;
      }
    }
  }
}
</style>
