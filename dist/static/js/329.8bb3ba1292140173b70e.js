webpackJsonp([329],{"+LwI":function(e,t,i){"use strict";i("OHys");var a=i("0xDb"),s=i("1onU"),r=i("YMLJ"),n=i("UQm2");t.a={components:{Pager:s.a},props:{orderid:[String,Number],orderdata:[Object]},data:function(){return{loadSearch:!1,isTimerOpen:!0,isAllTable:!1,isShowTable:!1,showSearchCard:!0,isShowInlineTruckMap:!1,speedSlider:520130,popTreeVisible:!1,gridData:[],tablekey:0,dataList:[],loading:!1,noinfo:!0,dialogTableVisible:!1,thepos:"",thename:"",theobj:{},btnsize:"mini",pickerOptionsSimple:{shortcuts:a.pickerOptionsSimple},groupList:[],tableColumn:[{label:"序号",prop:"number",width:"55",fixed:!0},{label:"车牌号码",prop:"truckIdNumber",width:"100",fixed:!0},{label:"司机电话",prop:"dirverMobile",width:"110",fixed:!0},{label:"司机名称",prop:"dirverName",fixed:!0},{label:"车辆定位时间",prop:"time",width:"160"},{label:"速度 km/h",prop:"speed",width:"90"},{label:"方向",prop:"direction",width:"90"},{label:"里程 km",prop:"li",width:"80",slot:function(e){return" - "}},{label:"海拔 m",prop:"altitude",width:"80"},{label:"部件状态",prop:"status",width:"90",slot:function(e){return" - "}}],total:0,searchQuery:{currentPage:1,pageSize:100,vo:{truckIdNumber:"",startTime:Object(a.parseTime)(new Date-3456e5),endTime:Object(a.parseTime)(new Date)}},tableHeight:{height:300,x:0,y:0},timer:60,isTimer:!0,pathSimplifierIns:{},map:{},allPathData:[],imgurl:i("slEn"),isDrag:!1,initedPath:!1,orgPageDataList:[],orgDataList:[],allList:[],markers:[],pathNavigs:[],comDis:!1,totalPageSize:0,progressPercentage:0,curCursor:{},realTimeTrucks:[],lineColor:["#3366cc","#329262","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#dc3912","#5574a6","#3b3eac","#409eff","#008000","#40E0D0","#22aa99","#9400D3","#FFC0CB","#0000FF","#FFA500","#B22222","#808080","#00FFFF","#8A2BE2","#5F9EA0","#7FFF00","#DAA520"]}},watch:{orderid:function(e){},orderdata:{handler:function(){this.init(333)},deep:!0},speedSlider:function(i){i&&this.pathNavigs.length&&this.pathNavigs.forEach(function(e,t){e&&e.setSpeed(i)})},$route:{handler:function(e,t){this.isTimer&&window.AMapUI&&(e.fullPath&&-1!==e.fullPath.indexOf("/operation/order/track/trucklog")||(this.isTimerOpen=!1,clearInterval(this.timerOption)))},immediate:!0},curCursor:{handler:function(e,t){if(e)if(1===this.pathNavigs.length){var i=e.idx,a=this.allPathData[0].path.length,s=Math.floor(i/a*100),r=Math.floor(i/this.searchQuery.pageSize);this.progressPercentage=this.comDis?100:0<=s?s:0,this.searchQuery.currentPage=this.pathNavigs[0]?r:0,this.dataList=this.orgPageDataList[this.searchQuery.currentPage]}else this.progressPercentage=0;else this.progressPercentage=0},deep:!0}},mounted:function(){console.log("测试车辆：陕YH0009");var t=this;window.loadedGaodeMap=function(){var e=this;Object(a.loadJs)("//webapi.amap.com/ui/1.0/main.js").then(function(){t.initMap(),t.hasLoadedMap=!0,t.getPathSimplifierIns(),console.log("window.AMap",window.AMap),console.log("window.AMapUI",window.AMapUI),console.log("this.map",e.map)})},this.init(2222)},destoryed:function(){this.exit(),clearInterval(this.timerOption)},methods:{classLineRed:function(e){if(this.allPathData.length)return e.row.number===this.curCursor.idx?"rowSelect":""},timerCon:function(){this.isTimerOpen?(this.isTimerOpen=!1,clearInterval(this.timerOption)):this.initTimer()},initTimer:function(){if(clearInterval(this.timerOption),this.isTimer){var e=this;e.isTimerOpen=!0,e.timer=e.$options.data().timer,this.timerOption=setInterval(function(){e.timer=e.timer-1,e.timer<=0&&(e.onSubmit(),e.timer=e.$options.data().timer)},1e3)}},selectGroup:function(e,t){console.log("选中的车：：",t,e.truckIdNumber,e.longitude,e.latitude,e),this.$set(this.searchQuery.vo,"truckIdNumber",e.truckIdNumber),this.popTreeVisible=!1},conStart:function(e){var t=e.pageY;this.tableHeight.y=t,this.tableHeight.orgheight=this.tableHeight.height||0,this.truckLogHeight=this.$refs.truckLog.offsetHeight-100,this.isShowTable||(this.isShowTable=!0,this.tableHeight.height=36),this.isDrag=!0,console.log("conStart eventY",t,this.truckLogHeight)},conMove:function(e){if(this.isDrag){this.$refs.allmap.offsetHeight;var t=e.pageY-this.tableHeight.y,i=this.tableHeight.orgheight-t;this.isShowTable=37<=i,this.isAllTable=this.$refs.allmap.offsetHeight<240,this.tableHeight.height=i>this.truckLogHeight?this.truckLogHeight:i}},conEnd:function(e){this.isDrag&&(this.tableHeight.y=e.pageY,this.isDrag=!1)},bindKey:function(){document.addEventListener("mousemove",this.conMove,!0),document.addEventListener("mouseup",this.conEnd,!0)},unbindKey:function(){document.addEventListener("mousemove",this.conMove),document.addEventListener("mouseup",this.conEnd)},mapTruck:function(){var e=this;this.isShowInlineTruckMap=!this.isShowInlineTruckMap,this.showSearchCard=!1,setTimeout(function(){e.showSearchCard=!0},300)},hideTable:function(){this.isShowTable=!this.isShowTable},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.dataList=this.orgPageDataList[this.searchQuery.currentPage-1]},handleTruck:function(){this.popTreeVisible=!this.popTreeVisible},onSubmit:function(){var i=this,n=this;if(n.loadSearch=!0,n.progressPercentage=0,n.pathNavigs=[],clearInterval(n.timerOption),window.pathSimplifierIns&&window.pathSimplifierIns.setData([]),!this.isShowInlineTruckMap){if(this.validate()){var e=Object(a.objectMerge2)({},this.searchQuery.vo);Object(r.e)(e).then(function(e){var t,r;e&&e.trajectoryList&&0<e.trajectoryList.length?(n.initedPath=!1,(1===e.trajectoryList.length||i.searchQuery.vo.truckIdNumber)&&(r="simple",(t=[e])&&(n.orgPageDataList=[],n.orgDataList=[],n.dataList=[],t&&t.length&&t.forEach(function(a,e){var s=[];if("simple"===r){n.total=a.trajectoryList.length||0,n.totalPageSize=Math.floor(n.total/i.searchQuery.pageSize)+1;for(var t=0;t<n.totalPageSize;t++)n.orgPageDataList[t]=[]}a.trajectoryList.forEach(function(e,t){if(e.dirverMobile=a.dirverMobile,e.dirverName=a.dirverName,e.truckIdNumber=a.truckIdNumber,e.number=t+1,n.orgDataList[t]=e,s[t]=e,"simple"===r){var i=Math.floor(t/n.searchQuery.pageSize);n.orgDataList[t]=e,n.orgPageDataList[i].push(e)}}),n.allList[e]=s,n.dataList=n.orgPageDataList[n.searchQuery.currentPage-1]})),console.warn("格式化（单辆车）：",i.allList),n.initLine(),n.isShowTable=!0),n.$notify({title:"成功",message:"车辆轨迹查询成功",type:"success"})):i.$message.warning("暂无车辆轨迹数据！"),i.initTimer(),n.loadSearch=!1}).catch(function(e){n.loadSearch=!1,i._handlerCatchMsg(e)})}else n.loadSearch=!1}},validate:function(){var e=Object(a.objectMerge2)({},this.searchQuery.vo),t=0;for(var i in e)""!==e[i]&&e[i]||(t+=1);return!t||(this.$message.warning("请填写完整搜索信息~"),!1)},tomap:function(){var i=this,a=window.AMap,s=(window.AMapUI,this.map);s.remove(this.markers);var r=[],n=void 0;this.markers=[],this.realTimeTrucks.length&&(this.realTimeTrucks.forEach(function(e,t){null!==e.longitude&&null!==e.latitude&&(r[t]=[e.longitude,e.latitude],(n=new a.Marker({map:s,position:r[t]})).setLabel({offset:new a.Pixel(20,20),content:'<div class="markerContent"><h3>'+e.truckIdNumber+" <i>"+e.speed+"km/h</i></h3><p>"+e.dirverName+" <i>"+e.dirverMobile+"</i></p><p>"+e.address+"</p></div>"}),i.markers.push(n),s.setFitView())}),console.log("实时车辆定位：：",this.realTimeTrucks,r,this.map))},exportData:function(){Object(n.g)({data:this.orgDataList,columns:this.tableColumn,name:"轨迹详情"+Object(a.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")})},getPathSimplifierIns:function(){console.log("初始化轨迹配置信息");var i=this,e=window.AMapUI,a=i.map;e.load(["ui/misc/PathSimplifier"],function(e){if(e.supportCanvas){var s=i.lineColor,t=new e({zIndex:100,setFitView:-1,map:a,getPath:function(e,t){return e.path},getHoverTitle:function(e,t,i){return 0<=i?e.name+"，点:"+i+"/"+e.path.length:e.name+"，点数量"+e.path.length},renderOptions:{pathLineStyle:{dirArrowStyle:!0},getPathStyle:function(e,t){var i=s[e.pathIndex],a=Math.round(4*Math.pow(1.1,t-3));return{pathLineStyle:{strokeStyle:i,lineWidth:a},pathLineSelectedStyle:{lineWidth:a+2},pathNavigatorStyle:{fillStyle:i}}},startPointStyle:{radius:6,fillStyle:"#109618",lineWidth:1,strokeStyle:"#eeeeee"},endPointStyle:{radius:6,fillStyle:"#dc3912",lineWidth:1,strokeStyle:"#eeeeee"}}});window.PathSimplifier=e,window.pathSimplifierIns=t}else alert("当前环境不支持 Canvas！")})},getNavg:function(a,e){var s=this,t=(window.AMap,window.AMapUI,s.map,window.pathSimplifierIns);if(!s.pathNavigs[a]){var r=t.createPathNavigator(a,{loop:!1,speed:s.speedSlider,pathNavigatorStyle:{width:24,height:24,content:PathSimplifier.Render.Canvas.getImageContent(s.imgurl,function(){t.renderLater()},function(e){console.log(e,window.PathSimplifier,PathSimplifier),s.$message.info("巡航器图片加载失败！")})}});r.onDestroy(function(){s.pathNavigs[a]=null}),r.on("start resume",function(){r._startTime=Date.now(),r._startDist=this.getMovedDistance(),console.warn("msgInfo start",r)}),r.on("stop pause",function(){r._movedTime=Date.now()-r._startTime,r._movedDist=this.getMovedDistance()-r._startDist,r._realSpeed=r._movedDist/r._movedTime*3600;var e=Math.round(this.getMovedDistance()/1e3)||0,t=Math.round(r._movedDist/1e3)||0,i={"状态":this.getNaviStatus(),"设定速度":this.getSpeed()+" km/h","总行进距离":e+" km","本段行进距离":t+" km","本段耗时":r._movedTime/1e3+" s","本段实际速度":Math.round(r._realSpeed)+" km/h"};this.comDis=e===t,console.warn("msgInfo stop",i),s.refreshNavgButtons(a)}),r.on("move",function(){this.getNaviStatus(),this.getSpeed(),Math.round(this.getMovedDistance()/1e3);s.allPathData&&1===s.allPathData.length&&(s.curCursor=r.getCursor())}),s.pathNavigs[a]=r}return s.pathNavigs[a]},setDataLine:function(){var i=[];return this.allList.forEach(function(e,t){if(e.length){var a={name:"",path:[]};e.forEach(function(e,t){var i=[Number(e.longitude),Number(e.latitude)];a.name=e.truckIdNumber,a.path.push(i)}),i.push(a)}}),this.allPathData=i},initLine:function(){var i=this;if(window.pathSimplifierIns){console.log("initLine"),this.map.remove(this.markers);var e=window.pathSimplifierIns,t=this.setDataLine();e.setData(this.setDataLine()),t.forEach(function(e,t){console.log(e);i.getNavg(t,e)})}else this.initedPath||(this.getPathSimplifierIns(),this.initedPath=!0)},doLine:function(i){var a=this;if(window.pathSimplifierIns){/(start|resume|pause)/.test(i)?(clearInterval(this.timerOption),this.isTimerOpen=!1):this.initTimer();window.pathSimplifierIns;this.allPathData.forEach(function(e,t){a.getNavg(t,e)[i](),a.refreshNavgButtons(t)})}else this.initedPath||(this.getPathSimplifierIns(),this.initedPath=!0)},refreshNavgButtons:function(e){if(!(e<0)){var t="stop",i=!!this.pathNavigs[e],a=this.pathNavigs[e];console.log("navgExists",i),i&&(t=a.getNaviStatus(),console.log("navgStatus",t))}},refreshNavg:function(){this.searchQuery.currentPage=1,this.dataList=this.orgPageDataList[this.searchQuery.currentPage-1]},exit:function(){this.map&&this.map.destroy&&"function"==typeof this.map.destroy&&(this.map.destroy(),this.map={}),this.thepos="",this.thename="",this.theobj={},this.noinfo=!0},init:function(){this.dialogTableVisible=this.popVisible,this.loadMap(),this.popVisible?(this.thepos=this.pos,this.thename=this.name):this.exit(),this.bindKey()},loadMap:function(){var e=this;window.AMap?setTimeout(function(){e.initMap(),e.getPathSimplifierIns()},500):(console.log("loadMap3",window.AMap),Object(a.loadJs)("https://webapi.amap.com/maps?v=1.4.8&key=e61aa7ddc6349acdb3b57c062080f730&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder&callback=loadedGaodeMap").then(function(){}))},close:function(e){this.exit(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()},initMap:function(){var e=window.AMap;window.AMapUI;this.map=new e.Map("allmap",{resizeEnable:!0,zoom:6})},setData:function(e,t,i){this.thepos=e,this.thename=t,this.theobj=i,this.noinfo=!1,console.log(i)}}}},JP4K:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("+LwI"),s=i("mY0u"),r=i("VU/8")(a.a,s.a,null,null,null);t.default=r.exports},mY0u:function(e,t,i){"use strict";var a={render:function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],ref:"truckLog",staticClass:"track-truck-log"},[s("transition",{attrs:{name:"el-zoom-in-center"}},[a.showSearchCard&&!a.isAllTable?s("div",{staticClass:"search-card"},[s("el-form",{ref:"form",attrs:{size:"mini",model:a.searchQuery,"label-width":"65px"}},[s("el-form-item",{attrs:{label:"选择车辆"}},[s("el-input",{attrs:{size:a.btnsize,placeholder:"请输入车牌号",maxlength:"8",clearable:""},model:{value:a.searchQuery.vo.truckIdNumber,callback:function(e){a.$set(a.searchQuery.vo,"truckIdNumber",e)},expression:"searchQuery.vo.truckIdNumber"}})],1),a._v(" "),s("el-form-item",{attrs:{label:"开始时间"}},[s("el-date-picker",{attrs:{type:"datetime",align:"right","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"开始日期","picker-options":a.pickerOptionsSimple},model:{value:a.searchQuery.vo.startTime,callback:function(e){a.$set(a.searchQuery.vo,"startTime",e)},expression:"searchQuery.vo.startTime"}})],1),a._v(" "),s("el-form-item",{attrs:{label:"结束时间"}},[s("el-date-picker",{attrs:{type:"datetime",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","picker-options":a.pickerOptionsSimple,placeholder:"结束日期"},model:{value:a.searchQuery.vo.endTime,callback:function(e){a.$set(a.searchQuery.vo,"endTime",e)},expression:"searchQuery.vo.endTime"}})],1),a._v(" "),s("el-form-item",{staticClass:"staff_searchinfo--btn"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-search",loading:a.loadSearch},on:{click:a.onSubmit}},[a._v("查询")])],1)],1)],1):a._e()]),a._v(" "),s("transition",{attrs:{name:"el-zoom-in-center"}},[a.popTreeVisible?s("el-card",{directives:[{name:"show",rawName:"v-show",value:!a.isAllTable,expression:"!isAllTable"}],staticClass:"popTree"},[s("div",{staticClass:"popTree-group"},a._l(a.realTimeTrucks,function(t,i){return s("div",{staticClass:"popTree-group-item",on:{click:function(e){a.selectGroup(t,i)}}},[s("p",[a._v(a._s(t.truckIdNumber))])])}))]):a._e()],1),a._v(" "),a.isTimer?s("div",{staticClass:"popTimer"},[s("el-button",{attrs:{size:"mini",type:"warning",icon:a.isTimerOpen?"":"el-icon-time"},on:{click:a.timerCon}},[a._v(a._s(a.isTimerOpen?"关闭":"开启")+"自动刷新")]),a._v(" "),a.isTimerOpen?s("span",[s("i",{staticClass:"el-icon-time"}),a._v(" "+a._s(a.timer)+"秒后刷新轨迹")]):a._e()],1):a._e(),a._v(" "),s("div",{ref:"allmap",attrs:{id:"allmap"}}),a._v(" "),s("div",{staticClass:"truck-log-expand"},[s("transition",{attrs:{name:"el-zoom-in-center"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:!a.isAllTable&&!a.isShowInlineTruckMap,expression:"!isAllTable&& !isShowInlineTruckMap"}],staticClass:"control-panel"},[s("el-button",{attrs:{size:a.btnsize,type:"text",icon:"el-icon-caret-right",title:"播放"},on:{click:function(e){a.doLine("start")}}}),a._v(" "),s("el-button",{attrs:{size:a.btnsize,type:"text",icon:"el-icon-refresh",title:"恢复"},on:{click:function(e){a.doLine("resume")}}}),a._v(" "),s("el-button",{staticClass:"btn-stop",attrs:{size:a.btnsize,type:"text",title:"暂停"},on:{click:function(e){a.doLine("pause")}}}),a._v(" "),s("el-button",{attrs:{size:a.btnsize,type:"text",icon:"el-icon-close",title:"清空"},on:{click:function(e){a.doLine("destroy")}}}),a._v(" "),s("span",[a._v("速度:")]),s("i",{staticStyle:{color:"green"}},[a._v("慢 ")]),a._v(" "),s("el-slider",{staticClass:"slider-step",attrs:{min:1e3,max:1e6},model:{value:a.speedSlider,callback:function(e){a.speedSlider=e},expression:"speedSlider"}}),a._v(" "),s("i",{staticStyle:{color:"#409eff"}},[a._v("快 ")]),a._v(" "),s("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:a.progressPercentage,status:"success"}})],1)]),a._v(" "),s("div",{staticClass:"control-bur",on:{"!mousedown":function(e){return e.preventDefault(),e.stopPropagation(),a.conStart(e)}}},[s("span",[a._v('轨迹详情（盲点补传数据里程为空，无线设备系列里程为"--"）')]),a._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:a.isShowTable?"隐藏":"显示",placement:"bottom-end"}},[s("el-button",{attrs:{size:a.btnsize,icon:"el-icon-rank",type:"text"},on:{click:a.hideTable}})],1),a._v(" "),s("el-button",{attrs:{size:a.btnsize,type:"text"},on:{click:a.exportData}},[a._v("导出Excel")])],1)],1),a._v(" "),s("transition",{attrs:{name:"el-zoom-in-bottom"}},[a.isShowTable?s("div",{staticClass:"truck-log-info"},[s("div",{staticClass:"info_tab"},[s("el-table",{key:a.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.dataList,stripe:"",border:"",height:a.tableHeight.height+"px","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"},"row-class-name":a.classLineRed}},[a._l(a.tableColumn,function(i){return[i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width},scopedSlots:a._u([{key:"default",fn:function(t){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:a._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):s("span",{domProps:{innerHTML:a._s(i.slot(t))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),a._v(" "),s("div",{staticClass:"info_tab_footer"},[a._v("\n        共计:"+a._s(a.total)+"\n        "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:a.total},on:{change:a.handlePageChange}})],1)])]):a._e()])],1)},staticRenderFns:[]};t.a=a}});