<template>
  <el-container class="html5index">
    <el-main class="main_content ">
      <el-header class="head_title">
        <!-- <h4>数据总览</h4> -->
        <ul>
          <li>今天</li>
          <li>昨天</li>
          <li>本周</li>
          <li>本月</li>
          <li>本年</li>
          <li>
            <!-- 2018-09-12至2018-12-14 -->
            <el-date-picker
              v-model="value7"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </li>
        </ul>
      </el-header>
      <el-main class="main_forthUl">
        <ul>
          <li>开单数量  
            <div class="box_gg">
              <i>
                <img src="../../assets/checkImg/sjx1.png"/>
              </i>
            </div>
            <div class="box_gg1">
              <i>
                <img src="../../assets/checkImg/sjx.png"/>
              </i>
            </div>
          </li>
          <li>数量:<span>{{ Math.floor(Math.random() * 100)}}</span>单<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/redx.png"/></i></em></li>
          <li>重量:<span>{{Math.floor(Math.random() * 100)}}</span>千克（吨）<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/greenx.png"/></i></em></li>
          <li>体积:<span>{{Math.floor(Math.random() * 100)}}</span>方<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/redx.png"/></i></em></li>
        </ul>
        <ul>
          <li>
            发车数量
            <div class="box_gg">
              <i>
                <img src="../../assets/checkImg/sjx1.png"/>
              </i>
            </div>
            <div class="box_gg1">
              <i>
                <img src="../../assets/checkImg/sjx.png"/>
              </i>
            </div>
          </li>
          <li>短驳发车:<span>{{Math.floor(Math.random() * 100)}}</span>单<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/redx.png"/></i></em></li>
          <li>短驳倒车:<span>{{Math.floor(Math.random() * 100)}}</span>千克（吨）<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/greenx.png"/></i></em></li>
          <li>干线发车:<span>{{Math.floor(Math.random() * 100)}}</span>方<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/redx.png"/></i></em></li>
          <li>干线到车:<span>{{Math.floor(Math.random() * 100)}}</span>方<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/greenx.png"/></i></em></li>
        </ul>
        <ul>
          <li>
            收入
            <div class="box_gg">
              <i>
                <img src="../../assets/checkImg/sjx1.png"/>
              </i>
            </div>
            <div class="box_gg1">
              <i>
                <img src="../../assets/checkImg/sjx.png"/>
              </i>
            </div>
          </li>
          <li>现付:<span>{{Math.floor(Math.random() * 100)}}</span>单<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/redx.png"/></i></em></li>
          <li>到付:<span>{{Math.floor(Math.random() * 100)}}</span>千克（吨）<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/greenx.png"/></i></em></li>
          <li>回单付:<span>{{Math.floor(Math.random() * 100)}}</span>方<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/redx.png"/></i></em></li>
          <li>月结:<span>{{Math.floor(Math.random() * 100)}}</span>方<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/greenx.png"/></i></em></li>
          <li>异动增款:<span>{{Math.floor(Math.random() * 100)}}</span>方<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/redx.png"/></i></em></li>
        </ul>
        <ul>
          <li>
            支出
            <div class="box_gg">
              <i>
                <img src="../../assets/checkImg/sjx1.png"/>
              </i>
            </div>
            <div class="box_gg1">
              <i>
                <img src="../../assets/checkImg/sjx.png"/>
              </i>
            </div>
          </li>
          <li>回扣:<span>{{Math.floor(Math.random() * 100)}}</span>单<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/redx.png"/></i></em></li>
          <li>其它费:<span>{{Math.floor(Math.random() * 100)}}</span>千克（吨）<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/greenx.png"/></i></em></li>
          <li>短驳车费:<span>{{Math.floor(Math.random() * 100)}}</span>方<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/redx.png"/></i></em></li>
          <li>干线车费:<span>{{Math.floor(Math.random() * 100)}}</span>单<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/greenx.png"/></i></em></li>
          <li>送货车费:<span>{{Math.floor(Math.random() * 100)}}</span>千克<em>{{Math.floor(Math.random() * 100)}}%<i><img src="../../assets/checkImg/redx.png"/></i></em></li>
         
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
   data() {
     return {
 
       pickerOptions2: {
         shortcuts: [{
           text: '最近一周',
           onClick(picker) {
             const end = new Date()
             const start = new Date()
             start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
             picker.$emit('pick', [start, end])
           }
         }, {
           text: '最近一个月',
           onClick(picker) {
             const end = new Date()
             const start = new Date()
             start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
             picker.$emit('pick', [start, end])
           }
         }, {
           text: '最近三个月',
           onClick(picker) {
             const end = new Date()
             const start = new Date()
             start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
             picker.$emit('pick', [start, end])
           }
         }]
       },
       value6: '',
       value7: ''
     }
   },
   mounted() {
     var myChart = echarts.init(document.getElementById('main_lefttop'))
     var myChart2 = echarts.init(document.getElementById('main_leftdown'))
     var myChart3 = echarts.init(document.getElementById('main'))
     window.onresize = () => {
       myChart.resize({
         width: 'auto',
         height: 'auto'
       })
       myChart2.resize({
         width: 'auto',
         height: 'auto'
       })
       myChart3.resize({
         width: 'auto',
         height: 'auto'
       })
     }
     const option = {
       title: {
         text: '',
         subtext: '',
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
.html5index{
  min-width: 1100px;
}
.main_content{
//  .clearfix:after{
//     display: block;
//     clear: both;
//     content: "";
//     visibility: hidden;
//     height: 0;
// }
// .clearfix{
//     zoom:1;
// }
  padding:19px;
  overflow-y: hidden;
  background:rgb(235,235,235);
  box-sizing: border-box;
  .head_title{
    height: 4% !important;
    line-height: 30px !important;
    background: #ffff;
    padding:0px !important;
    box-sizing: border-box;
    // box-shadow: 2px 2px 2px 2px ,-2px -2px -2px -2px rgba(0, 0, 0, 0.10);
    h4{
      font-size: 14px;
      display: inline-block;
    }
    ul{
      // margin-right: -50% !important;
      
      float:right;
      position: relative;
      // width: 45%;
      height: 100%;
      // background:yellow;
      li{
        float: left;
        padding-left:2%;
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
      li:hover{
        color:#3e9ff1;
        transform: scale(1.4);
        // font-weight: bold;
      }
      li:nth-child(6):hover {
        transform: none;
      }
    }
  }
  .main_forthUl{
    padding: 0 !important ;
    width: 100%;
    display: flex;
    float: left;
    -moz-box-sizing: border-box;
     box-sizing: border-box;
    ul{
      // border:1px solid #ddd;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.10);
      background: #fff;
      float: left;
      flex: 23%;
      height: 185px;
      margin: 10px 25px 10px 0;
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
      li{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        padding: 0 20px;
        box-sizing: border-box;
        border-radius: 5px 5px 0 0;
        
        span{
          color:red;
          padding:0 10px;
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

      }
    }
    ul:nth-child(4){
      margin:10px 0 10px 0;
    }
  }
  .main_forthUl ul:hover {
    // border:1px solid #3e9ff1;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.2s ease-out; 
    box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.40); 
    overflow: hidden;
    color: #3e9ff1;
    // opacity: rgba(0, 0, 0, 0.44);
    // font-weight: 300;
    transform: translateY(-3px); transition-delay: 0.2s; 
  }
  .main_forthUl ul li:nth-child(1){
    //  transform: translateX(-200px); transition-delay: 0.2s; 
    // background-color: #6bc9eb;
    // color:#fff;
  }
  .main_forthUl ul:hover .box_gg{
    display: block;
  }
  .main_forthUl ul:active .box_gg1{
    display: block;
  }
  .main_left{
    padding: 10px 0 !important ;
    width: 100%;
    height: 594px;
    overflow-x: hidden;
    overflow-y: hidden;
    .ul_left{
      float: left;
      width: 74.6%;
      background:#fff;
      height:584px;
      // box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.10);
      //  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.10);
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.10) ;
      border:1px solid #ddd;
    }
    .ul_right{
      width: 23.8%;
      float:right;
      height:584px;
      
      li{
        width: 100%;
        height: 286px;
        background: #fff;
        border-radius: 5px;
        // box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.10) inset;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.10) ;
         border:1px solid #ddd;
        canvas{
          height: 262px;
        }
        p{
          font-size: 14px;
          padding: 7px;
          // background-color: #6bc9eb;
          // color:#fff;
          border-radius: 5px 5px 0 0;
        }
        
      }
      li:nth-child(1){
        border-bottom: 2px solid #ddd;
        margin-bottom: 15px;
      } 
      li:hover{
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
      #main_lefttop{
        // height: 100%;
        height:262px;
        canvas{
          height: 250px;
        }
      }
      #main_leftdown{
        // height: 100%;
        height:262px;
        canvas{
          height: 250px;
        }
      }
      #main{
        height: 100%;
      }
    }
  }
}
</style>
