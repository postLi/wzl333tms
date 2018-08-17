<template>
  <el-container>
    <el-main class="main_content ">
      <el-header class="head_title">
        <ul>
          <li>今天</li>
          <li>昨天</li>
          <li>最近七天</li>
          <li>最近一个月</li>
          <li>最近两个月</li>
          <li>2018-06-4至2019-08-09</li>
        </ul>
      </el-header>
      <el-main class="main_forthUl">
        <ul>
          <li>开单数量
            <i class="el-icon-check"></i>
          </li>
          <li>数量:<span>20</span>单<em>20%</em></li>
          <li>重量:<span>20</span>千克<em>20%</em></li>
          <li>体积:<span>20</span>方<em>20%</em></li>
        </ul>
        <ul>
          <li>
            发车数量
            <i class="el-icon-check"></i>
          </li>
          <li>短驳发车:<span>20</span>单<em>20%</em></li>
          <li>短驳倒车:<span>20</span>千克<em>20%</em></li>
          <li>干线发车:<span>20</span>方<em>20%</em></li>
          <li>干线到车:<span>20</span>方<em>20%</em></li>
        </ul>
        <ul>
          <li>
            收入
            <i class="el-icon-check"></i>
          </li>
          <li>先付:<span>20</span>单<em>20%</em></li>
          <li>到付:<span>20</span>千克<em>20%</em></li>
          <li>回单付:<span>20</span>方<em>20%</em></li>
          <li>月结:<span>20</span>方<em>20%</em></li>
          <li>异动增款:<span>20</span>方<em>20%</em></li>
        </ul>
        <ul>
          <li>
            支出
            <i class="el-icon-check"></i>
          </li>
          <li>回扣:<span>20</span>单<em>20%</em></li>
          <li>其它费:<span>20</span>千克<em>20%</em></li>
          <li>短驳车费:<span>20</span>方<em>20%</em></li>
          <li>干线车费:<span>20</span>单<em>20%</em></li>
          <li>送货车费:<span>20</span>千克<em>20%</em></li>
         
        </ul>
      </el-main>
      <el-main class="main_left">
        <ul class="ul_left" id="main"></ul>
        <ul class="ul_right">
          <li>
            <p>运费收入</p>
            <div id="main_lefttop"></div>
          </li>
          <li>
            <p>运费收支对比</p>
            <div id="main_leftdown"></div>
          </li>
        </ul>
      </el-main>
    </el-main>
    
  </el-container>
</template>

<script>
 import echarts from 'echarts'

export default {
   mounted() {
     var myChart = echarts.init(document.getElementById('main_lefttop'))
     var myChart2 = echarts.init(document.getElementById('main_leftdown'))
     var myChart3 = echarts.init(document.getElementById('main'))
     const option = {
       title: {
         text: '2018收入对比图',
         subtext: '测试数据',
         x: 'center'
       },
       tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{b} : {c} ({d}%)'
       },
       legend: {
         orient: 'vertical',
         x: 'left',
         data: ['现付', '到付', '回单付', '月结']
       },
       toolbox: {
         show: true,
         feature: {
           mark: { show: true },
           dataView: { show: true, readOnly: false },
           magicType: {
             show: true,
             type: ['pie', 'funnel'],
             option: {
               funnel: {
                 x: '25%',
                 width: '50%',
                 funnelAlign: 'left',
                 max: 1548
               }
             }
           },
           restore: { show: true },
           saveAsImage: { show: true }
         }
       },
       calculable: true,
       series: [
         {
           name: '收入来源',
           type: 'pie',
           radius: '55%',
           center: ['50%', '60%'],
           data: [
              { value: 335, name: '现付' },
              { value: 310, name: '到付' },
              { value: 234, name: '回单付' },
              { value: 135, name: '月结' }
           ]
         }
       ]
     }
 
     const option2 = {
       tooltip: {
         trigger: 'item',
         formatter: '{a} <br/>{b} : {c} ({d}%)'
       },
       legend: {
         orient: 'vertical',
         x: 'left',
         data: ['收入', '支出']
       },
       toolbox: {
         show: true,
         feature: {
           mark: { show: true },
           dataView: { show: true, readOnly: false },
           magicType: {
             show: true,
             type: ['pie', 'funnel'],
             option: {
               funnel: {
                 x: '25%',
                 width: '50%',
                 funnelAlign: 'center',
                 max: 1548
               }
             }
           },
           restore: { show: true },
           saveAsImage: { show: true }
         }
       },
       calculable: true,
       series: [
         {
           name: '2018收入支出比',
           type: 'pie',
           radius: ['50%', '70%'],
           itemStyle: {
             normal: {
               label: {
                 show: false
               },
               labelLine: {
                 show: false
               }
             },
             emphasis: {
               label: {
                 show: true,
                 position: 'center',
                 textStyle: {
                   fontSize: '30',
                   fontWeight: 'bold'
                 }
               }
             }
           },
           data: [
              { value: 500, name: '收入' },
              { value: 310, name: '支出' }
           ]
         }
       ]
     }
 
     const option3 = {
       title: {
         text: '安发物流2018年运力对比图',
         subtext: '测试数据'
       },
       tooltip: {
         trigger: 'axis'
       },
       legend: {
         data: ['运单数', '体积', '重量']
       },
       toolbox: {
         show: true,
         feature: {
           mark: { show: true },
           dataView: { show: true, readOnly: false },
           magicType: { show: true, type: ['line', 'bar'] },
           restore: { show: true },
           saveAsImage: { show: true }
         }
       },
       calculable: true,
       xAxis: [
         {
           type: 'category',
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
           name: '运单数',
           type: 'bar',
           data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 0, 0, 0, 0],
           markPoint: {
             data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
             ]
           }
         },
         {
           name: '体积',
           type: 'bar',
           data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 0, 0, 0, 0],
           markPoint: {
             data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
             ]
           }
         },
         {
           name: '重量',
           type: 'bar',
           data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 0, 0, 0, 0],
           markPoint: {
             data: [
                        { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183, symbolSize: 18 },
                        { name: '年最低', value: 0, xAxis: 11, yAxis: 3 }
             ]
           }
         }
       ]
     }

    // 为echarts对象加载数据
     myChart.setOption(option)
     myChart2.setOption(option2)
     myChart3.setOption(option3)
   }

 }
</script>
<style lang="scss">
.main_content{
  padding-bottom: 100px !important;
 .clearfix:after{
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
}
.clearfix{
    zoom:1;
}
  background:rgb(235,235,235);
  .head_title{
    height: 30px !important;
    line-height: 30px !important;
    background: #ffff;
    ul{
      margin-left: 65%;
      li{
        float: left;
        padding: 0 10px;
        font-size: 14px;
        cursor: pointer;
      }
      li:hover{
        color:#3e9ff1;
      }
    }
  }
  .main_forthUl{
    padding: 0 !important ;
    width: 100%;
    display: flex;
    float: left;
    ul{
      border:1px solid #ddd;
      background: #fff;
      float: left;
      flex: 23%;
      height: 185px;
      margin: 10px 25px 10px 0;
      li{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        padding: 0 20px;
        .el-icon-check{
          float:right;
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          color:#3e9ff1;
          display: none;
        }
        span{
          color:red;
          padding:0 10px;
        }
        em{
          // text-align: right;
          float:right;
        }
      }
      li:nth-child(1){
        border-bottom: 1px solid #ddd;
      }
      // :hover li{
      //   border:1px solid #3e9ff1;
      // }
    }
    ul:nth-child(4){
      margin:10px 0 10px 0;
    }
    
  }
  .main_forthUl ul:hover {
      border:2px solid #3e9ff1;
      cursor: pointer;
    }
  .main_forthUl ul:hover .el-icon-check{
    display: block;
    font-weight: bold;
  }
  .main_left{
    padding: 10px 0 !important ;
    width: 100%;
    height: 840px;
    .ul_left{
      float: left;
      width: 74.6%;
      background:#fff;
      height:780px;
    }
    .ul_right{
      width: 23.8%;
      float:right;
      // background:yellow;
      height:600px;
      li{
        width: 100%;
        height: 65%;
        background: #fff;
        p{
          font-size: 14px;
          padding: 10px;
        }
      }
      li:nth-child(1){
        border-bottom: 2px solid #ddd;
      } 
      #main_lefttop{
        height: 100%;
      }
      #main_leftdown{
        height: 100%;
      }
      #main{
        height: 100%;
      }
    }
  }
}
</style>
