webpackJsonp([156,268,335],{"01nq":function(e,t,i){"use strict";t.e=function(e){return r.b.post("/api-order/order/track/v1/list/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.f=function(e){return r.b.post("/api-order/order/track/v1/transferList/",e).then(function(e){return e.data||{list:[],totalCount:0}})},t.b=function(e){return r.b.get("/api-order/order/track/v1/getLoadTrack/"+e).then(function(e){return e.data})},t.a=function(e){return r.b.delete("/api-order/order/track/v1/"+e).then(function(e){return e.data})},t.d=function(e){return r.b.post("/api-order/order/track/v1/insertTrack/",e).then(function(e){return e.data})},t.g=function(e){return r.b.put("/api-order/order/track/v1/updateById/",e).then(function(e){return e.data})},t.c=function(e){return r.b.get("/api-order/order/load/v1/selectLoadDetailList/?loadId="+e).then(function(e){return e.data})};var r=i("Vo7i")},"2uhx":function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"trackInfoPop",attrs:{title:i.popTitle,isShow:i.popVisible},on:{close:i.closeMe}},[r("template",{slot:"content"},[r("div",{staticClass:"info_box_transfer"},[r("el-row",{staticClass:"stepItem_title"},[r("el-col",{staticClass:"tracktype",attrs:{span:5}},[i._v("类型")]),i._v(" "),r("el-col",{attrs:{span:4}},[i._v("操作时间")]),i._v(" "),r("el-col",{attrs:{span:4}},[i._v("操作网点")]),i._v(" "),r("el-col",{attrs:{span:3}},[i._v("操作人")]),i._v(" "),r("el-col",{attrs:{span:8}},[i._v("操作信息")])],1),i._v(" "),r("div",{staticClass:"stepinfo"},[r("el-steps",{attrs:{direction:"vertical"}},i._l(i.trackDetail,function(t,e){return r("el-step",{key:e,class:{firstactive:0===e},nativeOn:{mouseover:function(e){return i.setThisActive(e)},mouseout:function(e){return i.offThisActive(e)}}},[r("span",{staticClass:"location",attrs:{slot:"icon"},slot:"icon"}),i._v(" "),r("template",{slot:"description"},[r("el-row",{staticClass:"stepItem"},[r("el-col",{attrs:{span:5}},[r("span",{staticClass:"typebox"},[i._v(i._s(t.trackNode))]),i._v(" "),1===t.trackType?[r("span",{staticClass:"modifybtn",attrs:{title:"编辑"},on:{click:function(e){i.editItem(t)}}}),i._v(" "),r("span",{staticClass:"deletebtn",attrs:{title:"删除"},on:{click:function(e){i.deleteTrack(t)}}})]:i._e()],2),i._v(" "),r("el-col",{attrs:{span:4}},[r("p",[i._v(i._s(i._f("parseTime")(t.createTime,"{y}-{m}-{d} {h}:{i}:{s}")))])]),i._v(" "),r("el-col",{attrs:{span:3}},[r("p",[i._v(i._s(t.orgName))])]),i._v(" "),r("el-col",{attrs:{span:4}},[r("p",[1===t.addStatus?r("i",{staticClass:"track-human"}):r("i",{staticClass:"icon_blank"}),i._v(" "+i._s(t.trackDetailed)+"\n                  ")])]),i._v(" "),r("el-col",{attrs:{span:8}},[r("p",[i._v(i._s(t.trackInfo))])])],1)],1)],2)}))],1)],1)]),i._v(" "),r("div",{staticClass:"stepinfo-footer stepFrom",attrs:{slot:"footer"},slot:"footer"},[r("el-form",{ref:"formModel",attrs:{inline:"",model:i.formModel,rules:i.ruleForm}},[r("el-form-item",{attrs:{label:"类型",prop:"trackNode"}},[r("el-input",{attrs:{maxlength:10,placeholder:"类型",size:"mini"},model:{value:i.formModel.trackNode,callback:function(e){i.$set(i.formModel,"trackNode",e)},expression:"formModel.trackNode"}})],1),i._v(" "),r("el-form-item",{attrs:{label:"时间",prop:"createTime"}},[r("el-date-picker",{attrs:{type:"datetime",placeholder:"选择时间",size:"mini"},model:{value:i.formModel.createTime,callback:function(e){i.$set(i.formModel,"createTime",e)},expression:"formModel.createTime"}})],1),i._v(" "),r("el-form-item",{attrs:{label:"操作信息",prop:"trackInfo"}},[r("el-input",{attrs:{maxlength:250,placeholder:"操作信息",size:"mini"},model:{value:i.formModel.trackInfo,callback:function(e){i.$set(i.formModel,"trackInfo",e)},expression:"formModel.trackInfo"}})],1),i._v(" "),r("el-form-item",{staticClass:"tracksavebtn"},[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){i.submitForm("formModel")}}},[i._v("保 存")]),i._v(" "),r("transition",{attrs:{name:"el-zoom-in-center"}},[i.isModify?r("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(e){i.resetForm()}}},[i._v("取 消")]):i._e()],1)],1)],1)],1)],2)},staticRenderFns:[]};t.a=r},"6Ytk":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("Ho6I"),a=i("PSJa"),o=i("VU/8")(r.a,a.a,null,null,null);t.default=o.exports},DGFZ:function(e,t,i){"use strict";var r={render:function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"tab-content miniHeaderSearch"},[a("SearchForm",{attrs:{orgid:r.otherinfo.orgid,btnsize:r.btnsize},on:{change:r.getSearchParam}}),r._v(" "),a("div",{staticClass:"tab_info"},[a("div",{staticClass:"btns_box"},[a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:r.btnsize,icon:"el-icon-setting",plain:""},on:{click:r.setTable}},[r._v("表格设置")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:LOADTRACK4",arg:"LOADTRACK4"}],staticClass:"table_setup",attrs:{type:"success",size:r.btnsize,icon:"el-icon-setting",plain:"",disabled:r.isDisBtn},on:{click:r.setInfo}},[r._v("在途跟踪")])],1),r._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{key:r.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:r.dataList,stripe:"",border:"",height:"100%","summary-method":r.getSumLeft,"show-summary":"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":r.clickDetails,"selection-change":r.getSelection,"row-dblclick":r.setInfo}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"60"}}),r._v(" "),r._l(r.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:r._u([{key:"header",fn:function(e){return[a("tableHeaderSearch",{attrs:{scope:e,query:r.searchQuery},on:{change:r.changeKey}})]}},{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:r._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:r._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:r._u([{key:"header",fn:function(e){return[a("tableHeaderSearch",{attrs:{scope:e,query:r.searchQuery},on:{change:r.changeKey}})]}},{key:"default",fn:function(e){return[r._v(r._s(e.row[i.prop]))]}}])})]})],2)],1),r._v(" "),a("div",{staticClass:"info_tab_footer"},[r._v("\n      共计:"+r._s(r.total)+"\n      "),a("div",{staticClass:"show_pager"},[a("Pager",{attrs:{total:r.total},on:{change:r.handlePageChange}})],1)]),r._v(" "),a("editInfoTransfer",{attrs:{orgid:r.orgid,id:r.transferId,shipId:r.shipId,popVisible:r.editInfoVisible},on:{"update:popVisible":function(e){r.editInfoVisible=e},close:r.closeMe}}),r._v(" "),a("TableSetup",{attrs:{popVisible:r.setupTableVisible,columns:r.tableColumn,code:"LOADTRACK4"},on:{close:r.closeSetupTable,success:r.setColumn}})],1)],1)},staticRenderFns:[]};t.a=r},FOOn:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("rRK3"),a=i("2uhx");var o=function(e){i("Pcqt")},s=i("VU/8")(r.a,a.a,o,null,null);t.default=s.exports},Ho6I:function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),o=i("E4LH"),s=i("o9X6"),n=i("pAQG"),l=i("0xDb");t.a={components:{SelectTree:s.a,querySelect:n.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{carrierName:{},searchForm:{orgId:0,carrierName:"",startTime:"",endTime:""},city:"",searchData:{orgId:0,carrierName:"",startTime:"",endTime:""},cityName:{},rules:{shipSn:[{validator:function(e,t,i){var r=o.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?r.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(l.parseTime)(new Date-5184e6),Object(l.parseTime)(new Date)],defaultTime:[new Date-5184e6,new Date],pickerOptions:{shortcuts:l.pickerOptions2}}},mounted:function(){this.onSubmit()},methods:{onSubmit:function(){this.searchTime&&(this.searchForm.startTime=Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00",this.searchForm.endTime=Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),this.$emit("change",this.searchForm)},clearForm:function(e){this.$refs[e].resetFields(),this.searchTime=this.$options.data().searchTime,this.searchForm=a()({},this.searchData)}}}},PSJa:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"中转时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"承运商",prop:"carrierName"}},[i("el-input",{attrs:{maxlength:15,"auto-complete":"off",placeholder:"承运商",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.carrierName,callback:function(e){t.$set(t.searchForm,"carrierName",e)},expression:"searchForm.carrierName"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},Pcqt:function(e,t){},pyjA:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("zT8x"),a=i("DGFZ"),o=i("VU/8")(r.a,a.a,null,null,null);t.default=o.exports},rRK3:function(e,t,i){"use strict";var r=i("bOdI"),a=i.n(r),o=(i("E4LH"),i("P5Di")),s=i("OHys"),n=(i("NYxO"),i("t5DY")),l=i("0xDb");t.a={components:{popRight:o.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},id:{type:[Number,String]},shipId:{type:[Number,String]}},data:function(){return a()({popTitle:"在途跟踪",loading:!0,isModify:!1,infoId:{},trackDetail:[],formModel:{},ruleForm:{trackNode:[{required:!0,trigger:"blur",message:"不能为空"}],createTime:[{required:!0,trigger:"blur",message:"不能为空"}],trackInfo:[{required:!0,trigger:"blur",message:"不能为空"}]},isShowBtn:!0,isFootEdit:!0},"formModel",{createTime:"",orgid:"",shipId:"",trackDetailed:"",trackInfo:"",trackNode:"",trackType:1})},watch:{id:function(){},shipId:function(e){e&&(console.log("shipId",e),this.getDetail(),this.getSystemTime())},popVisible:function(e,t){this.popVisible&&(this.getDetail(),this.getSystemTime())}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){e&&(t.formModel.id?t.$confirm("此操作将修改跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.editTrack()}):t.$confirm("此操作将添加跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.addTrack()}))})},getDetail:function(){var t=this,e=(this.id,this.shipId);s.a.getShipTrackinfo(e).then(function(e){t.trackDetail=e,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},closeMe:function(e){this.$emit("update:popVisible",!1),"function"==typeof e&&e()},deleteTrack:function(e){var t=this;this.$confirm("此操作将删除本跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){s.a.deleteTrackinfo(e.id).then(function(e){t.$message({type:"success",message:"删除成功"}),t.getDetail()}).catch(function(e){t._handlerCatchMsg(e)})})},editItem:function(e){this.formModel=Object(l.objectMerge2)({},e),this.isModify=!0},editTrack:function(){var t=this;this.formModel.createTime=Object(l.parseTime)(this.formModel.createTime,"{y}-{m}-{d} {h}:{i}:{s}"),console.log(this.formModel.createTime),s.a.putTrackinfo(this.formModel).then(function(e){t.$message({type:"success",message:"修改成功"}),t.getDetail(),t.resetForm()}).catch(function(e){t._handlerCatchMsg(e)})},addTrack:function(){var t=this,e=Object(l.objectMerge2)({},this.formModel);e.createTime=Object(l.parseTime)(+new Date(e.createTime),"{y}-{m}-{d} {h}:{i}:{s}"),e.shipId=this.shipId,e.orgid=this.otherinfo.orgid,console.log(e.createTime),s.a.postTrackinfo(e).then(function(e){t.$message({type:"success",message:"添加成功"}),t.getDetail(),t.resetForm()}).catch(function(e){t._handlerCatchMsg(e)})},getSystemTime:function(){var t=this;this.formModel.id||Object(n.k)().then(function(e){t.formModel.createTime=new Date(e.trim()),console.log("系统：",t.formModel.createTime)}).catch(function(e){t._handlerCatchMsg(e)})},resetForm:function(){var e=this;this.$nextTick(function(){e.isModify=!1,e.$refs.formModel.resetFields(),e.formModel=e.$options.data().formModel,e.getSystemTime()})},offThisActive:function(e){var t=Object(l.closest)(e.target,".el-step");t&&t.classList.remove("trackactive")},setThisActive:function(e){var t=Object(l.closest)(e.target,".el-step");t&&t.classList.add("trackactive")}}}},zT8x:function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),o=i("Dd8w"),s=i.n(o),n=i("6Ytk"),l=i("NYxO"),c=i("01nq"),d=i("1onU"),p=i("FOOn"),h=i("0xDb");t.a={components:{SearchForm:n.default,Pager:d.a,editInfoTransfer:p.default},computed:s()({},Object(l.mapGetters)(["otherinfo"]),{orgid:function(){return this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),data:function(){var t=this;return{btnsize:"mini",dataList:[],total:0,isDisBtn:!0,transferId:"",shipId:"",tablekey:0,selectInfo:[],trackInfo:{},loading:!0,editInfoVisible:!1,setupTableVisible:!1,searchQuery:{currentPage:1,pageSize:100,vo:{orgId:0}},tableColumn:[{label:"序号",prop:"number",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"中转单号",prop:"oddNumbers",width:"140",fixed:!0},{label:"运单号",prop:"shipSn",width:"120",fixed:!0},{label:"运单状态",prop:"shipStatusName",width:"100",fixed:!0},{label:"开单网点",prop:"shipFromOrgidName",width:"110"},{label:"承运商",prop:"carrierName",width:"120"},{label:"承运商电话",prop:"carrierMobile",width:"120"},{label:"到站电话",prop:"arrivalMobile",width:"120"},{label:"开单时间",prop:"createTime",width:"160",slot:function(e){return""+Object(h.parseTime)(e.row.createTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"中转时间",prop:"transferTime",width:"160",slot:function(e){return""+Object(h.parseTime)(e.row.transferTime,"{y}-{m}-{d} {h}:{i}:{s}")}},{label:"中转运费",prop:"transferCharge",width:"120"},{label:"中转送货费",prop:"deliveryExpense",width:"120"},{label:"中转费其他费",prop:"transferOtherFee",width:"120"},{label:"中转费合计",prop:"totalCost",width:"120"},{label:"中转付款方式",prop:"paymentName",width:"120"},{label:"代收货款",prop:"codService",width:"120"},{label:"发货人",prop:"senderName",width:"120"},{label:"发货人电话",prop:"senderMobile",width:"120"},{label:"收货人",prop:"receiverName",width:"120"},{label:"收货人电话",prop:"receiverMobile",width:"120"},{label:"发站",prop:"shipFromCityName",width:"120"},{label:"到站",prop:"shipToCityName",width:"120"},{label:"货物名称",prop:"cargoName",width:"120"},{label:"件数",prop:"cargoAmount",width:"120"},{label:"重量",prop:"cargoWeight",width:"120"},{label:"体积",prop:"cargoVolume",width:"120"},{label:"包装",prop:"cargoPack",width:"120"},{label:"运单备注",prop:"shipRemarks",width:"120"},{label:"中转备注",prop:"remark",width:"120"},{label:"发货单位",prop:"senderUnit",width:"120"},{label:"发货地址",prop:"senderAddr",width:"120"},{label:"收货单位",prop:"receiverUnit",width:"120"},{label:"收货地址",prop:"receiverAddr",width:"120"},{label:"运费",prop:"shipFee",width:"120"},{label:"交接方式",prop:"shipDeliveryMethodName",width:"120"},{label:"货号",prop:"shipGoodsSn",width:"160"},{label:"品种规格",prop:"description",width:"120"},{label:"重量单价",prop:"weightFee",width:"100"},{label:"体积单价",prop:"volumeFee",width:"100"},{label:"回单要求",prop:"shipReceiptRequireName",width:"120"},{label:"回单份数",prop:"shipReceiptNum",width:"120"},{label:"代收款手续费",prop:"commissionFee",width:"120"},{label:"付款方式",prop:"shipPayWayName",width:"100"},{label:"现付",prop:"shipNowpayFee",width:"100"},{label:"到付",prop:"shipArrivepayFee",width:"100"},{label:"回单付",prop:"shipReceiptpayFee",width:"100"},{label:"月结",prop:"shipMonthpayFee",width:"100"},{label:"运费合计",prop:"shipTotalFee",width:"120"},{label:"制单人",prop:"name",width:"120"},{label:"回扣",prop:"brokerageFee",width:"100"},{label:"送货费",prop:"deliveryFee",width:"100"},{label:"声明价值",prop:"productPrice",width:"120"},{label:"保险费",prop:"insuranceFee",width:"120"},{label:"装卸费",prop:"handlingFee",width:"120"},{label:"包装费",prop:"packageFee",width:"120"},{label:"提货费",prop:"pickupFee",width:"120"},{label:"实际提货费",prop:"realityhandlingFee",width:"120"},{label:"上楼费",prop:"goupstairsFee",width:"120"},{label:"报关费",prop:"customsFee",width:"120"},{label:"其他费收入",prop:"otherfeeIn",width:"120"},{label:"其他费支出",prop:"otherfeeOut",width:"120"}]}},activated:function(){this.editInfoVisible=!1,this.$route.query.transfer&&(this.editInfoVisible=!0),this.searchQuery.vo.orgId=this.otherinfo.orgid,this.fetchList()},methods:{changeKey:function(e){this.total=0,this.searchQuery=e,this.loading||this.fetchList()},getSumLeft:function(e,t){return Object(h.getSummaries)(e,h.operationPropertyCalc)},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=a()({},e),this.searchQuery.vo.orgId||(this.searchQuery.vo.orgId=this.otherinfo.orgid),this.fetchList()},getSelection:function(e){this.$route.query.transfer?(this.transferId=this.$route.query.transfer,this.shipId=this.$route.query.shipId):1===e.length?(this.selectInfo=a()([],e),this.isDisBtn=!1,this.transferId=this.selectInfo[0].transferId,this.shipId=this.selectInfo[0].shipId,this.trackInfo=a()({},this.selectInfo[0])):(1<e.length&&this.$message({type:"warning",message:"只能选择一条数据进行跟踪设置"}),this.isDisBtn=!0)},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setInfo:function(){this.editInfoVisible=!0,this.$refs.multipleTable.clearSelection()},closeMe:function(){this.editInfoVisible=!1},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchList()},fetchList:function(){this.getAllList()},getAllList:function(){var t=this;this.loading=!0,Object(c.f)(this.searchQuery).then(function(e){e&&(t.dataList=e.list,t.total=e.total),t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)}),this.isTransferTrack()},isTransferTrack:function(){this.$route.query.transfer?(console.log("transfer",this.$route.query.transfer),this.getSelection(),this.setInfo()):this.closeMe()},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()}}}}});