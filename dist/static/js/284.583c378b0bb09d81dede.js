webpackJsonp([284],{AXRM:function(t,e,i){"use strict";i("0xDb");e.a={data:function(){return{showChartMessage:"点击展开",isShowChart:!1,loading:!1,baseInfo:{totalWeight:0,weight:0,surplusWeight:0,totalVolume:0,volume:0,surplusVolume:0}}},props:{info:{type:Array,default:function(){}},truckInfo:{type:Object,default:function(){}},className:{type:String,default:"chartItemDetail"},idWeigth:{type:String,default:"idWeigth"},idVolume:{type:String,default:"idVolume"},width:{type:String,default:"100%"},height:{type:String,default:"100%"}},computed:{chartItemWeight:function(){return{height:this.isShowChart?"100%":"50%",borderBottom:this.isShowChart?"none":"1px solid #cdf",borderRight:this.isShowChart?"1px solid #cdf":"none"}},chartWeightStyle:function(){return{height:"100%",width:"100%"}},chartVolumnStyle:function(){return{height:"100%",width:"100%"}}},watch:{info:{handler:function(t,e){var i=this;this.baseInfo.weight=0,this.baseInfo.volume=0,t.forEach(function(t){i.baseInfo.weight+=Number(t.repertoryWeight)||0,i.baseInfo.volume+=Number(t.repertoryVolume)||0}),t&&this.initChart()},deep:!0},truckInfo:{handler:function(t,e){t&&(this.baseInfo.totalWeight=Number(t.weight)||0,this.baseInfo.totalVolume=Number(t.volume)||0,this.initChart())},deep:!0}},methods:{initData:function(){},initChart:function(){this.initData(),this.initChartWeight(),this.initChartVolume(),window.addEventListener("resize",this.resizeChart.bind(this))},showAllChart:function(){this.isShowChart=!this.isShowChart,this.showChartMessage=this.isShowChart?"点击隐藏":"点击展开",this.$emit("showViewChart",this.isShowChart)},initChartWeight:function(){this.chart=this.$echarts.init(this.$refs.echartWeight),this.chart.setOption({title:{subtextStyle:{fontSize:12,color:"#666666"},x:"center",bottom:"0px"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c}(千克) ({d}%)"},series:[{name:"总载重: "+this.baseInfo.totalWeight+"(千克)",type:"pie",radius:"45%",label:{normal:{show:!0,formatter:"{b} \n\n {d}%",textStyle:{fontWeight:"normal",fontSize:14,color:"#666"}}},data:[{value:this.baseInfo.weight,name:"已配载",itemStyle:{color:"#FFCC66"}},{value:this.baseInfo.totalWeight-this.baseInfo.weight,name:"可载重",itemStyle:{color:"#79F7C1"}}]}]})},resizeChart:function(){this.chart.resize(),this.chart2.resize()},initChartVolume:function(){this.chart2=this.$echarts.init(this.$refs.echartVolume),this.chart2.setOption({title:{subtextStyle:{fontSize:14,color:"#666666"},x:"center",bottom:"0px"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c}(方) ({d}%)"},series:[{name:"总载方: "+this.baseInfo.totalVolume+"(方)",type:"pie",radius:"45%",label:{normal:{show:!0,formatter:"{b} \n\n {d}%",textStyle:{fontWeight:"normal",fontSize:14,color:"#666"}}},data:[{value:this.baseInfo.volume,name:"已配载",itemStyle:{color:"#FFCC66"}},{value:this.baseInfo.totalVolume-this.baseInfo.volume,name:"可载方",itemStyle:{color:"#79F7C1"}}]}]})},notNull:function(t){if(""===t||null===t||!t||void 0===t)return!1}}}},jgiU:function(t,e,i){"use strict";var a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"loadChart_wrapper"},[i("div",{staticClass:"loadChart_head"},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.showChartMessage,placement:"left"}},[i("el-button",{attrs:{icon:t.isShowChart?"el-icon-close":"el-icon-rank",type:"primary",circle:"",size:"mini",plain:""},on:{click:t.showAllChart}})],1)],1),t._v(" "),i("div",{staticClass:"loadChart_chart",style:{flexDirection:t.isShowChart?"row":"column"}},[i("div",{ref:"echartItemWeight",staticClass:"chartItem bggreen",style:t.chartItemWeight},[i("b",[t._v("重量装载率")]),t._v(" "),i("div",{ref:"echartWeight",staticClass:"chartItemDetail",style:t.chartWeightStyle})]),t._v(" "),i("div",{ref:"echartItemVolumn",staticClass:"chartItem bgblue",style:{height:t.isShowChart?"100%":"50%"}},[i("b",[t._v("体积装载率")]),t._v(" "),i("div",{ref:"echartVolume",staticClass:"chartItemDetail",style:t.chartVolumnStyle})])])])},staticRenderFns:[]};e.a=a},uKrZ:function(t,e){},"wQd/":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("AXRM"),r=i("jgiU");var o=function(t){i("uKrZ")},h=i("VU/8")(a.a,r.a,o,null,null);e.default=h.exports}});