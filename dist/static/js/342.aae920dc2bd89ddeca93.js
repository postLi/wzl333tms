webpackJsonp([342],{IY6l:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("WfZq"),s=i("dEE/"),a=i("VU/8")(o.a,s.a,null,null,null);e.default=a.exports},WfZq:function(t,e,i){"use strict";var o=i("0xDb");e.a={props:{info:{type:Array,default:[]},truckInfo:{type:Object,default:{}},popVisible:{type:Boolean,default:!1},className:{type:String,default:"yourClassName"},idWeigth:{type:String,default:"idWeigth"},idVolume:{type:String,default:"idVolume"},width:{type:String,default:"300px"},height:{type:String,default:"300px"}},data:function(){return{loading:!1,baseInfo:{totalWeight:0,weight:0,surplusWeight:0,totalVolume:0,volume:0,surplusVolume:0},newInfo:{totalWeight:0,weight:0,surplusWeight:0,totalVolume:0,volume:0,surplusVolume:0}}},watch:{info:function(t){},truckInfo:{handler:function(){this.baseInfo.totalWeight=Number(this.truckInfo.truckLoad)||0,this.baseInfo.totalVolume=Number(this.truckInfo.truckVolume)||0},deep:!0},popVisible:function(){var t=this;this.popVisible&&this.$nextTick(function(){t.baseInfo.totalWeight||t.baseInfo.weight||(t.baseInfo=Object(o.objectMerge2)({},t.$options.data().baseInfo)),t.initChart()})}},methods:{initData:function(){var e=this;this.popVisible&&(this.baseInfo.weight=0,this.baseInfo.volume=0,this.info.forEach(function(t){e.baseInfo.weight+=Number(t.loadWeight),e.baseInfo.volume+=Number(t.loadVolume)}))},initChart:function(){this.initData(),this.initChartWeight(),this.initChartVolume()},initChartWeight:function(){var t=this.baseInfo.totalWeight-this.baseInfo.weight;this.baseInfo.surplusWeight=t,this.popVisible&&(this.chart=this.$echarts.init(this.$refs.echartWeight),this.chart.setOption({title:{text:"总载重: "+this.baseInfo.totalWeight,subtext:"单位：千克",subtextStyle:{fontSize:14,color:"#666666"},x:"center",bottom:"0px"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},series:[{name:"总载重",type:"pie",radius:"40%",label:{normal:{show:!0,formatter:"{b}:\n\n{c}千克\n\n{d}%",textStyle:{fontWeight:"normal",fontSize:16,color:"#666"}}},data:[{value:this.baseInfo.weight,name:"已配载",itemStyle:{color:"#FFCC66"}},{value:this.baseInfo.surplusWeight,name:"可配载",itemStyle:{color:"#79F7C1"}}]}]}))},initChartVolume:function(){var t=this.baseInfo.totalVolume-this.baseInfo.volume;this.baseInfo.surplusVolume=t,this.popVisible&&(this.chart=this.$echarts.init(this.$refs.echartVolume),this.chart.setOption({title:{text:"总载立方: "+this.baseInfo.totalVolume,subtext:"单位：方",subtextStyle:{fontSize:14,color:"#666666"},x:"center",bottom:"0px"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},series:[{name:"总载立方",type:"pie",radius:"40%",label:{normal:{show:!0,formatter:"{b}:\n\n{c}方\n\n{d}%",textStyle:{fontWeight:"normal",fontSize:16,color:"#666"}}},data:[{value:this.baseInfo.volume,name:"已配载",itemStyle:{color:"#FFCC66"}},{value:this.baseInfo.surplusVolume,name:"可配载",itemStyle:{color:"#79F7C1"}}]}]}))},notNull:function(t){if(""===t||null===t||!t||void 0===t)return!1},closeMe:function(t){this.$emit("update:popVisible",!1)}}}},"dEE/":function(t,e,i){"use strict";var o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{title:"配载率提示",isShow:e.popVisible,visible:e.popVisible,"before-close":e.closeMe,width:"50%","close-on-click-modal":!1,center:""},on:{"update:visible":function(t){e.popVisible=t},close:e.closeMe}},[i("el-row",[i("el-col",{attrs:{span:12}},[i("div",{ref:"echartWeight",class:e.className,style:{height:e.height,width:e.width,margin:"0 auto"},attrs:{id:e.idWeigth}})]),e._v(" "),i("el-col",{attrs:{span:12}},[i("div",{ref:"echartVolume",class:e.className,style:{height:e.height,width:e.width,margin:"0 auto"},attrs:{id:e.idVolume}})])],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.closeMe}},[e._v("取 消")])],1)],1)],1)},staticRenderFns:[]};e.a=o}});