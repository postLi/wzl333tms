webpackJsonp([75,177,331],{"0Q33":function(e,t){},"1EIs":function(e,t,i){"use strict";var r=i("0xDb"),a=i("o9X6"),s=i("pAQG");t.a={name:"order-manage-search",components:{SelectTree:a.a,querySelect:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},isbatch:{type:Boolean,dafault:!1}},data:function(){return{searchCreatTime:[],searchCreatTime2:[],defaultTime:[Object(r.parseTime)(new Date-5184e6,"{y}-{m}-{d}"),Object(r.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgid:"",shipFromCityName:"",carrierId:"",shipToCityName:""},rules:{mobile:[{}]},pickerOptions2:{shortcuts:r.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e}},mounted:function(){this.searchForm.orgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{onSubmit:function(){var e={};e.orgId=this.searchForm.orgid,this.isbatch||(e.shipFromCityName=this.searchForm.shipFromCityName,e.shipToCityName=this.searchForm.shipToCityName),this.searchCreatTime&&this.searchCreatTime[0]&&(e.transferTimeStart=this.searchCreatTime[0]+" 00:00:00",e.transferTimeEnd=this.searchCreatTime[1]+" 23:59:59"),this.searchCreatTime2&&this.searchCreatTime2[0]&&!this.isbatch&&(e.ydCreateTimeStart=this.searchCreatTime2[0]+" 00:00:00",e.ydCreateTimeEnd=this.searchCreatTime2[1]+" 23:59:59"),e.carrierId=this.searchForm.carrierId,this.$emit("change",e)},clearForm:function(){this.searchForm.orgid=this.orgid,this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.searchForm.carrierId="",this.searchCreatTime=this.defaultTime,this.searchCreatTime2=[]}}}},"71e1":function(e,t,i){e.exports=i("+dzQ")(43)},EPeO:function(e,t,i){"use strict";var r=i("//Fk"),n=i.n(r),a=i("mvHQ"),s=i.n(a),o=(i("UDRQ"),i("t5DY")),l=i("0xDb"),c=i("71e1"),p=i.n(c),h=i("Vo7i");t.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:1},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1},twocode:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[],showtc:!1,showtwocdetip:!0,twocodeurl:""}},watch:{showtc:function(){this.showtc?this.changeTwocode():clearInterval(this.uptimer)},value:{handler:function(e){if(this.showFileList){var t=Array.isArray(e)?e:e?e.split(","):[];t=t.filter(function(e){return e}),this.filelist=[],this.filelist=t.map(function(e){var t={};return t.url=e,t})}else this.filelist=e?[{url:e}]:[]},immediate:!0}},mounted:function(){},updated:function(){console.log("single image updated~~~")},beforeDestroy:function(){console.log("beforeDestroy"),clearInterval(this.uptimer)},methods:{init:function(){var t=this;return Object(o.m)().then(function(e){t.upload.OSSAccessKeyId=e.accessid,t.upload.policy=e.policy,t.upload.signature=e.signature,t.uploadUrl=e.host,t.dir=e.dir}).catch(function(){})},rmImage:function(t){this.filelist=this.filelist.filter(function(e){return e.url!==t}),this.emitInput(""),this.showtc=!1},onexceed:function(e,t){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(e,t){console.log("handleRemove:",e,t),this.filelist=t,this.emitInput()},random_string:function(e){e=e||32;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",i=t.length,r="",a=0;a<e;a++)r+=t.charAt(Math.floor(Math.random()*i));return r},emitInput:function(e){e&&this.filelist.push({url:e}),this.$emit("input",this.showFileList?this.filelist.map(function(e){return e.url}).join(","):e)},handleImageScucess:function(e){var t="";-1!==e.indexOf("Location")&&(t=(t=e.match(/<Location>([^<]+)<\/Location>/m))?t[1]:""),this.emitInput(t)},handleError:function(e){this.$message.error("上传错误："+s()(e)),this.$emit("error",e)},handleUpload:function(s){var o=this;return new n.a(function(r,a){var e=s.file.name,t=(e=e||Math.random()+".jpg").match(/([^\.]+)$/);t=t?"."+t[1]:"";var i=function(e){var t=new FormData,i=o.uploadUrl;t.append("key",o.upload.key),t.append("success_action_status","201"),t.append("OSSAccessKeyId",o.upload.OSSAccessKeyId),t.append("policy",o.upload.policy),t.append("signature",o.upload.signature),t.append("file",e),h.b.post(i,t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){r(e)}).catch(function(e){a(e),o._handlerCatchMsg(e,"上传失败:")})};/\.jpe?g/.test(t)?lrz(s.file,{width:1024}).then(function(e){i(e.file)}).catch(function(e){a(e),o._handlerCatchMsg(e,"上传失败：")}):i(s.file)})},beforeUpload:function(e){var i=this,r=/image\/\w+/.test(e.type)&&/(jpe?g|png)/i.test(e.type),a=e.size/1024/1024<5,s=e.name.match(/([^\.]+)$/);return s=s?"."+s[1]:"",new n.a(function(t,e){r?a?i.init().then(function(e){i.upload.key=i.dir+Object(l.parseTime)(new Date,"{y}{m}{d}")+"/"+i.random_string()+s,t(!0)}).catch(function(e){i._handlerCatchMsg(e),t(!1)}):(i.$message.error("上传头像图片大小不能超过 5MB!"),e(!1)):(i.$message.error("上传头像图片只能是 JPG/PNG 格式!"),e(!1))})},changeTwocode:function(){var i=this;clearInterval(this.uptimer),Object(o.k)().then(function(e){i.upid=e.data,i.startFetchData();var t="http://"+location.host+"/static/upload.html?len=1&access_token="+i.access_token+"&id="+e.data+"&url="+(window.tms_testapiurl||"");console.log("url:",t),p.a.toDataURL(t,{rendererOpts:{margin:0}}).then(function(e){i.twocodeurl=e})}).catch(function(e){i.$message.error("生成二维码出错了~")})},startFetchData:function(){var i=this;clearInterval(this.uptimer);var e=0;this.uptimer=setInterval(function(){if(57e4<(e+=5e3))return i.$message.info("二维码过期了，已重新生成~"),i.changeTwocode(),!1;Object(o.l)(i.upid).then(function(e){var t=e.data;t&&t.id===i.upid&&t.url&&(clearInterval(i.uptimer),i.showtc=!1,i.emitInput(decodeURIComponent(t.url)))}).catch(function(e){i.$message.info("二维码过期了，请重新扫描上传~")})},5e3)}}}},QbVN:function(e,t,i){"use strict";var r=i("EPeO"),a=i("jxZV");var s=function(e){i("0Q33"),i("xU5l")},o=i("VU/8")(r.a,a.a,s,"data-v-de7091b2",null);t.a=o.exports},XFlZ:function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),s=(i("E4LH"),i("Vi15"),i("P5Di")),o=i("QbVN"),n=i("o9X6"),l=i("0xDb"),c=i("exln"),p=(i("t5DY"),i("pAQG")),h=i("UQm2"),d=i("puNT");t.a={components:{popRight:s.a,Upload:o.a,SelectTree:n.a,querySelect:p.a,TableSetup:d.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1}},computed:{fixPhone:{get:function(){return this.phoneshort+"-"+this.phonelong},set:function(e){var t=e?e.split("-"):"";t?(this.phoneshort=t[1]?t[0]:"",this.phonelong=t[1]?t[1]:t[0]):(this.phoneshort="",this.phonelong="")}}},data:function(){return{visible2:!1,stepCode:"TRANSFER_LOAD-1",setupTableVisible:!1,btnsize:"mini",usersArr:[],carrierName:"",phoneshort:"",phonelong:"",form:{carrierName:"",transferTime:"",carrierMobile:"",arrivalMobile:"",remark:""},tableColumn:[{label:"序号",prop:"number",width:"100",fixed:!0,slot:function(e){return e.$index+1}},{label:"开单网点",prop:"shipFromOrgName",width:"100",fixed:!0},{label:"承运商",prop:"carrierName",width:"100"},{label:"承运商电话",prop:"carrierMobile",width:"100"},{label:"到站电话",prop:"arrivalMobile",width:"100"},{label:"运单状态",prop:"shipStatusName",width:"120"},{label:"运单号",prop:"shipSn",width:"100"},{label:"中转单号",prop:"oddNumbers",width:"100"},{label:"中转批次",prop:"transferBatchNo",width:"100"},{label:"开单时间",prop:"ydCreateTime",width:"100",slot:function(e){return""+Object(l.parseTime)(e.row.ydCreateTime,"{y}-{m}-{d}")}},{label:"中转时间",prop:"transferTime",width:"100",slot:function(e){return""+Object(l.parseTime)(e.row.transferTime,"{y}-{m}-{d}")}},{label:"中转运费",prop:"transferCharge",width:"100"},{label:"中转送货费",prop:"deliveryExpense",width:"100"},{label:"中转费其他费",prop:"transferOtherFee",width:"100"},{label:"中转费合计",prop:"totalCost",width:"100"},{label:"中转费付款方式",prop:"paymentName",width:"100"},{label:"代收货款",prop:"codService",width:"100"},{label:"发货人",prop:"shipSenderName",width:"100"},{label:"发货人电话",prop:"shipSenderMobile",width:"100"},{label:"收货人",prop:"shipReceiverName",width:"100"},{label:"收货人电话",prop:"shipReceiverMobile",width:"100"},{label:"发站",prop:"shipFromCityName",width:"100"},{label:"到站",prop:"shipToCityName",width:"100"},{label:"货品名",prop:"cargoName",width:"100"},{label:"件数",prop:"cargoAmount",width:"100"},{label:"重量",prop:"cargoWeight",width:"100"},{label:"体积",prop:"cargoVolume",width:"100"},{label:"包装",prop:"cargoPack",width:"100"},{label:"运单备注",prop:"shipRemarks",width:"100"},{label:"中转备注",prop:"remark",width:"100"},{label:"到达省",prop:"endProvince",width:"100",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[0]:""}},{label:"到达市",prop:"endCity",width:"100",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[1]:""}},{label:"到达县区",prop:"endArea",width:"100",slot:function(e){return e.row.shipToCityName?e.row.shipToCityName.split(",")[2]:""}},{label:"发货方",prop:"sendCustomerUnit",width:"100"},{label:"收货方",prop:"receiverCustomerUnit",width:"100"},{label:"发货人地址",prop:"sendDetailedAddress",width:"100"},{label:"收货人地址",prop:"receiverDetailedAddress",width:"100"},{label:"运费",prop:"shipFee",width:"100"},{label:"目的网点",prop:"shipToOrgName",width:"100"},{label:"交接方式",prop:"shipDeliveryMethodName",width:"100"},{label:"货号",prop:"shipGoodsSn",width:"100"},{label:"品种规格",prop:"description",width:"100"},{label:"件数单价",prop:"amountFee",width:"100"},{label:"重量单价",prop:"weightFee",width:"100"},{label:"体积单价",prop:"volumeFee",width:"100"},{label:"等通知放货",prop:"cgStatus",width:"100"},{label:"回单要求",prop:"shipReceiptRequireName",width:"100"},{label:"回单份数",prop:"shipReceiptNum",width:"100"},{label:"付款方式",prop:"shipPayWayName",width:"100"},{label:"现付",prop:"shipNowpayFee",width:"100"},{label:"到付",prop:"shipArrivepayFee",width:"100"},{label:"回单付",prop:"shipReceiptpayFee",width:"100"},{label:"月结",prop:"shipMonthpayFee",width:"100"},{label:"运费合计",prop:"shipTotalFee",width:"100"},{label:"制单人",prop:"shipUserName",width:"100"},{label:"回单号",prop:"shipReceiptNum",width:"100"},{label:"回扣",prop:"brokerageFee",width:"100"},{label:"客户单号",prop:"shipCustomerNumber",width:"100"},{label:"送货费",prop:"deliveryFee",width:"100"},{label:"代收款手续费",prop:"commissionFee",width:"100"},{label:"声明价值",prop:"productPrice",width:"100"},{label:"保险费",prop:"insuranceFee",width:"100"},{label:"装卸费",prop:"handlingFee",width:"100"},{label:"包装费",prop:"packageFee",width:"100"},{label:"提货费",prop:"pickupFee",width:"100"},{label:"上楼费",prop:"goupstairsFee",width:"100"},{label:"实际提货费",prop:"realityhandlingFee",width:"100"},{label:"报关费",prop:"customsFee",width:"100"},{label:"其他费收入",prop:"otherfeeIn",width:"100"},{label:"其他费支出",prop:"otherfeeOut",width:"100"}],formLabelWidth:"90px",tooltip:!1,popTitle:"中转批次：",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,transferBatchNo:"",selectDetailList:[]}},mounted:function(){this.form.orgid=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:function(e,t){this.inited||(this.inited=!0,this.initInfo())},orgid:function(e){this.form.orgid=e},info:function(e){e.transferBatchNo&&(this.popTitle="中转批次："+e.transferBatchNo,this.transferBatchNo=e.transferBatchNo,this.getUpdateTransferDetail(e.transferBatchNo))}},methods:{doAction:function(e){var t=Object(l.objectMerge2)([],this.tableColumn);switch(e){case"cancel":this.$emit("action","cancel",[this.transferBatchNo]);break;case"print":Object(h.d)({data:this.selectDetailList.length?this.selectDetailList:this.usersArr,columns:t,name:"中转-"+Object(l.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"export":Object(h.g)({data:this.selectDetailList.length?this.selectDetailList:this.usersArr,columns:t,name:"中转-"+Object(l.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")})}},setColumn:function(e){this.tableColumn=e,this.setupTableVisible=!1,this.tablekey=Math.random()},setTable:function(){this.setupTableVisible=!0},getUpdateTransferDetail:function(e){var r=this;return c.f({orgId:this.otherinfo.orgid,transferBatchNo:e}).then(function(e){if(e.length){var t=(r.usersArr=e)[0];for(var i in r.form)r.form[i]=t[i];r.form.transferTime=Object(l.parseTime)(new Date(r.form.transferTime))}else r.$alert("当前批次号不存在","提示",{confirmButtonText:"确定",callback:function(e){r.closeMe()}})}).catch(function(e){r.loading=!1,r._handlerCatchMsg(e)})},clickDetails:function(e){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selectDetailList=a()([],e)},initInfo:function(){this.loading=!1},getOrgid:function(e){this.form.orgid=e},reset:function(){this.$refs.ruleForm.resetFields()},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.tableColumn)},setTableWidth:function(e,t,i,r){var a=this,s=this.tableColumn.filter(function(e){return e.prop===i.property});s.length&&(s[0].width=e,this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){a.visible2=!1},1e4))},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},ZkwN:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("XFlZ"),a=i("piRJ");var s=function(e){i("ouXS")},o=i("VU/8")(r.a,a.a,s,null,null);t.default=o.exports},ah4N:function(e,t,i){"use strict";var r=i("Dd8w"),a=i.n(r),s=i("exln"),o=i("dpuf"),n=i("puNT"),l=i("ZkwN"),c=i("NYxO"),p=i("1onU"),h=i("0xDb"),d=i("UQm2");t.a={components:{SearchForm:o.default,Pager:p.a,TableSetup:n.a,AddOrder:l.default},computed:a()({},Object(c.mapGetters)(["otherinfo"]),{orgid:function(){return console.log(this.selectInfo.orgid,this.searchQuery.vo.orgid,this.otherinfo.orgid),this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgId||this.otherinfo.orgid}}),mounted:function(){},data:function(){var t=this;return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,AddOrderVisible:!1,isModify:!1,selectInfo:{},addCarrierVisible:!1,selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgId:1,transferTimeStart:"",transferTimeEnd:"",ydCreateTimeStart:"",ydCreateTimeEnd:"",carrierId:"",shipFromCityName:"",shipToCityName:""}},tablekey:"",tableColumn:[{label:"序号",prop:"number",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"中转批次",prop:"transferBatchNo",width:"150",slot:function(e){return e.row.transferBatchNo}},{label:"中转时间",prop:"transferTime",width:"180",slot:function(e){return""+Object(h.parseTime)(e.row.transferTime)}},{label:"承运商",prop:"carrierName",width:"150"},{label:"承运商电话",prop:"carrierMobile",width:"150"},{label:"到付(元)",prop:"shipArrivepayFee",width:"90",fixed:!1},{label:"中转件数",prop:"transferAmount",width:"150"},{label:"中转体积(kg)",prop:"transferVolume",width:"150"},{label:"中转重量(m³)",prop:"transferWeight",width:"150"},{label:"代收货款(元)",prop:"codService",width:"150"},{label:"中转运费(元)",prop:"transferCharge",width:"150"},{label:"中转送货费(元)",prop:"deliveryExpense",width:"150"},{label:"中转费其他费(元)",prop:"transferOtherFee",width:"150"},{label:"中转费合计(元)",prop:"totalCost",width:"150"},{label:"中转费付款方式",prop:"paymentName",width:"150"},{label:"中转备注",prop:"remark",width:"150"}]}},methods:{fetchAllTransfer:function(){var t=this;return this.loading=!0,s.b(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1,console.log("this.usersArr:",t.usersArr,e)}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllTransfer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=e,this.loading=!1,this.fetchData()},setAction:function(e,t){"cancel"===e&&this.cancelBatch(t)},cancelBatch:function(e){var t=this;this.$confirm("确定要取消 "+e.length+" 条运单吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){s.a(t.otherinfo.orgid,Object(h.uniqArray)(e).join(","),"").then(function(e){t.$message({type:"success",message:"取消成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:"取消失败，原因："+(e.errorInfo?e.errorInfo:e.text)})})}).catch(function(e){t.$message({type:"info",message:"已取消"})})},doAction:function(e){if(!this.selected.length&&"waifa"!==e&&"export"!==e&&"print"!==e)return this.closeAddOrder(),this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"waifa":this.isModify=!1,this.selectInfo={},this.$router.push("/operation/order/transferLoad");break;case"modify":this.isModify=!0,1<this.selected.length&&this.$message({message:"每次只能修改单条数据~",type:"warning"}),this.selectInfo=this.selected[0],this.$router.push({path:"/operation/order/transferLoad",query:{id:this.selectInfo.transferBatchNo}});break;case"track":1<this.selected.length&&this.$message({message:"每次只能操作单条数据~",type:"warning"});var t=this.selected[0].id;this.$router.push({path:"/operation/order/track",query:{transfer:t}});break;case"cancel":var i=this.selected.filter(function(e){return 67!==e.ship_status});if(i.length){var r=i.map(function(e){return e.transferBatchNo});i.map(function(e){return e.shipSn});this.cancelBatch(r)}else this.$message.warning("已签收运单不能被取消~");break;case"export":Object(d.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"中转批次列表-"+Object(h.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(d.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"中转批次列表"})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},openAddOrder:function(e){this.selectInfo=e,this.AddOrderVisible=!0},closeAddOrder:function(){this.AddOrderVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e}}}},dpuf:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("1EIs"),a=i("qfp3"),s=i("VU/8")(r.a,a.a,null,null,null);t.default=s.exports},exln:function(e,t,i){"use strict";t.e=function(e){return a.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}}).then(a.a)},t.i=function(e){return a.b.post("/api-order/order/transfer/v1/insertTransfer",e).then(a.a)},t.j=function(e){return a.b.put("/api-order/order/transfer/v1/updateTransfer",e).then(a.a)},t.g=function(e,t){return a.b.get("/api-order/order/transfer/v1/selectUpdateLoadRepertoryList",{params:{batchNo:t,orgId:e}}).then(a.a)},t.h=function(e,t){return a.b.get("/api-order/order/transfer/v1/selectUpdateTransferDetailList",{params:{batchNo:t,orgId:e}}).then(a.a)},t.c=function(e){return a.b.post("/api-order/order/transfer/v1/selectAlreadyTransferList",e).then(a.a).then(function(e){return e.data||{list:[],total:0}})},t.b=function(e){return a.b.post("/api-order/order/transfer/v1/selectTransferBatchList",e).then(a.a).then(function(e){return e.data||{list:[],total:0}})},t.f=function(e){return a.b.post("/api-order/order/transfer/v1/selectTransferBatchDetailsList",e).then(a.a).then(function(e){return e.data||[]})},t.a=function(e,t,i){return a.b.delete("/api-order/order/transfer/v1/cancelTransfer?orgId="+e+"&batchNos="+t+"&shipIds="+i).then(a.a)},t.d=function(e){return a.b.get("/api-order/order/transfer/v1/getBatchNo",{params:{orgId:e}}).then(a.a)};var r=i("//Fk"),a=(i.n(r),i("Vo7i"))},jxZV:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload-container",class:{uploadlist:t.showFileList}},[i("el-upload",{staticClass:"image-uploader",attrs:{data:t.upload,action:t.uploadUrl,multiple:!1,drag:!t.showFileList,"show-file-list":t.showFileList,"file-list":t.filelist,limit:t.limit,"before-upload":t.beforeUpload,"list-type":t.listtype,"on-exceed":t.onexceed,disabled:t.disabled,"on-remove":t.handleRemove,"on-error":t.handleError,"http-request":t.handleUpload,"on-success":t.handleImageScucess}},[t._t("content",[t.showtc?i("div",{staticClass:"twocodebox",on:{click:function(e){e.stopPropagation(),e.preventDefault()},mouseover:function(e){t.showtwocdetip=!0},mouseout:function(e){t.showtwocdetip=!1}}},[i("div",[i("img",{attrs:{src:t.twocodeurl,alt:""}})]),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"},on:{click:function(e){t.showtc=!1}}},[t._v("本地上传")]),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"},on:{click:t.changeTwocode}},[t._v("更换二维码")])],1):i("div",[t.title&&!t.showFileList?i("div",{staticClass:"upload__title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"}},[t._v("点击上传")]),t._v(" "),t.twocode?i("el-button",{staticClass:"uploadtwocode",attrs:{size:t.size,type:"primary"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.showtc=!0}}},[t._v("二维码上传")]):t._e(),t._v(" "),t.showFileList?t._e():i("div",{staticClass:"el-upload__text"},[t._v("将文件拖拽到此区域")]),t._v(" "),t.tip?i("div",{staticClass:"upload__tip"},[t._v(t._s(t.tip))]):t._e()],1)])],2),t._v(" "),t.imageUrl&&!t.showFileList?i("div",{staticClass:"image-preview"},[i("div",{staticClass:"image-preview-wrapper"},[i("img",{attrs:{src:t.imageUrl}}),t._v(" "),i("div",{staticClass:"image-preview-action"},[i("i",{staticClass:"el-icon-delete",on:{click:function(e){t.rmImage(t.imageUrl)}}})])])]):t._e()],1)},staticRenderFns:[]};t.a=r},ouXS:function(e,t){},pTeR:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("ah4N"),a=i("woKR"),s=i("VU/8")(r.a,a.a,null,null,null);t.default=s.exports},piRJ:function(e,t,i){"use strict";var r={render:function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"addTransferPop",attrs:{title:r.popTitle,isShow:r.popVisible},on:{close:r.closeMe}},[a("template",{staticClass:"addTransferPop-content",slot:"content"},[a("el-form",{ref:"ruleForm",attrs:{model:r.form,inline:!0,"label-position":"right",size:"mini"}},[a("el-form-item",{staticClass:"addCarrierInput",attrs:{label:"承运商",prop:"carrierId"}},[a("el-input",{attrs:{disabled:"",value:r.form.carrierName}})],1),r._v(" "),a("el-form-item",{attrs:{prop:"transferTime",label:"中转日期"}},[a("el-input",{attrs:{disabled:"",value:r.form.transferTime}})],1),r._v(" "),a("el-form-item",{attrs:{label:"承运商电话",prop:"carrierMobile"}},[a("el-input",{attrs:{size:"mini",disabled:"",value:r.form.carrierMobile,placeholder:"承运商电话"}})],1),r._v(" "),a("el-form-item",{attrs:{label:"到站电话",prop:"arrivalMobile"}},[a("el-input",{attrs:{size:"mini",disabled:"",value:r.form.arrivalMobile,placeholder:"到站电话"}})],1),r._v(" "),a("el-form-item",{staticClass:"remark",attrs:{label:"备注"}},[a("el-input",{attrs:{size:"mini",maxlength:300,disabled:"",value:r.form.remark,placeholder:"备注"}})],1)],1),r._v(" "),a("div",{staticClass:"btns_box clearfix"},[a("el-button",{staticClass:"cancelBtn",attrs:{type:"info",size:r.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){r.doAction("cancel")}}},[r._v("取消中转")]),r._v(" "),a("el-button",{attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){r.doAction("print")}}},[r._v("打印清单")]),r._v(" "),a("el-button",{attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){r.doAction("export")}}},[r._v("导出清单")]),r._v(" "),a("el-popover",{attrs:{placement:"top",trigger:"manual",width:"160",value:r.visible2},nativeOn:{mouseenter:function(e){return r.showSaveBox(e)},mouseout:function(e){return r.hideSaveBox(e)}}},[a("p",[r._v("表格宽度修改了，是否要保存？")]),r._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){r.visible2=!1}}},[r._v("取消")]),r._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:r.saveToTableSetup}},[r._v("确定")])],1),r._v(" "),a("el-button",{staticClass:"table_setup",attrs:{slot:"reference",type:"primary",size:r.btnsize,icon:"el-icon-setting",plain:""},on:{click:r.setTable},slot:"reference"},[r._v("表格设置")])],1)],1),r._v(" "),a("div",{staticClass:"table_wrapper"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:r.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"header-dragend":r.setTableWidth,"row-click":r.clickDetails,"selection-change":r.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),r._v(" "),r._l(r.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"","show-overflow-tooltip":"",label:i.label,width:i.width},scopedSlots:r._u([{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:r._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:r._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,"show-overflow-tooltip":"",prop:i.prop,width:i.width}})]})],2)],1),r._v(" "),a("TableSetup",{attrs:{popVisible:r.setupTableVisible,columns:r.tableColumn,code:r.stepCode},on:{close:function(e){r.setupTableVisible=!1},success:r.setColumn}})],1),r._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:r.closeMe}},[r._v("关闭")])],1)],2)},staticRenderFns:[]};t.a=r},qfp3:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,"label-width":"70px",model:t.searchForm}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"中转时间:"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right",size:t.btnsize,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"承运商:"}},[i("querySelect",{attrs:{search:"carrierName",type:"carrier",valuekey:"carrierId",show:"select",filterable:!1,placeholder:"请选择"},model:{value:t.searchForm.carrierId,callback:function(e){t.$set(t.searchForm,"carrierId",e)},expression:"searchForm.carrierId"}})],1),t._v(" "),t.isbatch?t._e():i("el-form-item",{staticClass:"searchinfo--order",attrs:{label:"发站:"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),t.isbatch?t._e():i("el-form-item",{staticClass:"searchinfo--order",attrs:{label:"到站:"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),t.isbatch?t._e():i("el-form-item",{attrs:{label:"开单时间:"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right",size:t.btnsize,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime2,callback:function(e){t.searchCreatTime2=e},expression:"searchCreatTime2"}})],1)])],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},woKR:function(e,t,i){"use strict";var r={render:function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],staticClass:"tab-content"},[a("SearchForm",{attrs:{isbatch:!0,orgid:r.otherinfo.orgid,btnsize:r.btnsize},on:{change:r.getSearchParam}}),r._v(" "),a("div",{staticClass:"tab_info"},[a("div",{staticClass:"btns_box"},[a("el-button",{directives:[{name:"has",rawName:"v-has:TRANSFER_DELETE2",arg:"TRANSFER_DELETE2"}],attrs:{type:"info",size:r.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){r.doAction("cancel")}}},[r._v("取消中转")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:TRANSFER_EXPORT2",arg:"TRANSFER_EXPORT2"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){r.doAction("export")}}},[r._v("导出")]),r._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has:TRANSFER_PRINT2",arg:"TRANSFER_PRINT2"}],attrs:{type:"primary",size:r.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){r.doAction("print")}}},[r._v("打印")]),r._v(" "),a("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:r.btnsize,icon:"el-icon-setting",plain:""},on:{click:r.setTable}},[r._v("表格设置")])],1),r._v(" "),a("div",{staticClass:"info_tab"},[a("el-table",{key:r.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:r.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":r.clickDetails,"row-dblclick":r.openAddOrder,"selection-change":r.getSelection}},[a("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"70"}}),r._v(" "),r._l(r.tableColumn,function(i){return[i.slot?a("el-table-column",{key:i.id,attrs:{fixed:i.fixed,"show-overflow-tooltip":"",sortable:"",label:i.label,width:i.width},scopedSlots:r._u([{key:"default",fn:function(t){return[i.click?a("span",{staticClass:"clickitem",domProps:{innerHTML:r._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):a("span",{domProps:{innerHTML:r._s(i.slot(t))}})]}}])}):a("el-table-column",{key:i.id,attrs:{"show-overflow-tooltip":"",fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),r._v(" "),a("div",{staticClass:"info_tab_footer"},[r._v("共计:"+r._s(r.total)+" "),a("div",{staticClass:"show_pager"},[a("Pager",{attrs:{total:r.total},on:{change:r.handlePageChange}})],1)])]),r._v(" "),a("AddOrder",{attrs:{isModify:r.isModify,info:r.selectInfo,orgid:r.orgid,popVisible:r.AddOrderVisible},on:{action:r.setAction,"update:popVisible":function(e){r.AddOrderVisible=e},close:r.closeAddOrder,success:r.fetchData}}),r._v(" "),a("TableSetup",{attrs:{popVisible:r.setupTableVisible,columns:r.tableColumn,code:"TRANSFER_LOAD"},on:{close:r.closeSetupTable,success:r.setColumn}})],1)},staticRenderFns:[]};t.a=r},xU5l:function(e,t){}});