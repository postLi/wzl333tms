webpackJsonp([29,162,192],{"0Q33":function(e,t){},"2faE":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("OoT8"),s=i("Mzpx");var a=function(e){i("lF23")},r=i("VU/8")(o.a,s.a,a,null,null);t.default=r.exports},"71e1":function(e,t,i){e.exports=i("+dzQ")(43)},"851T":function(e,t,i){"use strict";var o=i("woOf"),s=i.n(o),a=i("Dd8w"),r=i.n(a),n=i("OHys"),l=i("Ln7j"),c=i("puNT"),d=i("2faE"),u=i("NYxO"),p=i("1onU"),h=i("0xDb"),m=i("Mqi+"),f=i("UQm2");t.a={components:{SearchForm:l.default,Pager:p.a,TableSetup:c.a,AddOrder:d.default},computed:r()({},Object(u.mapGetters)(["otherinfo"]),{orgid:function(){return console.log(this.selectInfo.orgid,this.searchQuery.vo.orgid,this.otherinfo.orgid),this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),mounted:function(){},data:function(){var t=this;return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,AddOrderVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{shipFromOrgid:1,startTime:"",shipIsUpdate:1,endTime:""}},tablekey:"",tableColumn:[{label:"序号",prop:"number",width:"70",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"运单号",prop:"shipSn",width:"100",fixed:!0},{label:"运单状态",prop:"shipStatusName",width:"120",fixed:!1},{label:"运单标识",prop:"shipIdentifying",width:"150",slot:function(e){return Object(m.b)(e.row.shipIdentifying)}},{label:"修改内容",prop:"updateContent",width:"150"},{label:"旧值",prop:"oldValue",width:"150"},{label:"新值",prop:"newValue",width:"150"},{label:"修改人",prop:"updateName",width:"150"},{label:"修改日期",prop:"updateTime",width:"150"},{label:"开单网点",prop:"fromOrgName",width:"150"},{label:"开单时间",prop:"createTime",width:"180",slot:function(e){return""+Object(h.parseTime)(e.row.createTime,"{y}-{m}-{d}")}},{label:"发货人",prop:"shipSenderName",width:"150"},{label:"发货人电话",prop:"shipSenderMobile",width:"150"},{label:"收货人",prop:"shipReceiverName",width:"150"},{label:"收货人电话",prop:"shipReceiverMobile",width:"150"},{label:"交接方式",prop:"shipDeliveryMethodName",width:"150"},{label:"货号",prop:"shipGoodsSn",width:"150"},{label:"货物名称",prop:"cargoName",width:"150"},{label:"品种规格",prop:"description",width:"150"},{label:"件数",prop:"cargoAmount",width:"150"},{label:"重量",prop:"cargoWeight",width:"150"},{label:"体积",prop:"cargoVolume",width:"150"},{label:"件数单价",prop:"amountFee",width:"150"},{label:"重量单价",prop:"weightFee",width:"150"},{label:"体积单价",prop:"volumeFee",width:"150"},{label:"发站",prop:"shipFromCityName",width:"150"},{label:"到站",prop:"shipToCityName",width:"150"},{label:"送货方式",prop:"shipShippingTypeName",width:"150"},{label:"付款方式",prop:"shipPayWayName",width:"150"},{label:"现付",prop:"shipNowpayFee",width:"150"},{label:"到付",prop:"shipArrivepayFee",width:"150"},{label:"回单付",prop:"shipReceiptpayFee",width:"150"},{label:"月结",prop:"shipMonthpayFee",width:"150"},{label:"运费合计",prop:"shipTotalFee",width:"150"},{label:"备注",prop:"shipRemarks",width:"150"},{label:"制单人",prop:"userName",hidden:!0,width:"150"},{label:"发货方",prop:"shipSenderUnit",hidden:!0,width:"150"},{label:"收货方",prop:"shipReceiverUnit",hidden:!0,width:"150"},{label:"发货人地址",prop:"shipSenderAddress",hidden:!0,width:"150"},{label:"收货人地址",prop:"shipReceiverAddress",hidden:!0,width:"150"}],showtip:!1}},methods:{fetchAllOrder:function(){var t=this;return this.loading=!0,n.a.getAllShip(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllOrder()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchData()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo=s()(this.searchQuery.vo,e),this.loading=!1,this.fetchData()},doAction:function(e){var t=this;if(!this.selected.length&&"add"!==e&&"export"!==e&&"print"!==e)return this.closeAddOrder(),this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"add":this.isModify=!1,this.selectInfo={},this.openAddOrder();break;case"modify":this.isModify=!0,1<this.selected.length&&this.$message({message:"每次只能修改单条数据~",type:"warning"}),this.selectInfo=this.selected[0],this.openAddOrder();break;case"delete":1<this.selected.length&&this.$message({message:"每次只能操作单条数据~",type:"warning"});var i=this.selected[0].shipSn,o=this.selected[0].id;this.$confirm("确定要删除 "+i+" 运单吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){n.a.deleteOrderInfoById(o).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:e.errorInfo})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})});break;case"cancel":1<this.selected.length&&this.$message({message:"每次只能操作单条数据~",type:"warning"});var s=this.selected[0].shipSn,a=this.selected[0].id;this.$confirm("确定要作废 "+s+" 运单吗？","提示",{confirmButtonText:"作废",cancelButtonText:"取消",type:"warning"}).then(function(){n.a.deleteCancleOrderById(a).then(function(e){t.$message({type:"success",message:"作废成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:e.errorInfo})})}).catch(function(){t.$message({type:"info",message:"已取消作废"})});break;case"export":Object(f.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"改单记录-"+Object(h.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"print":Object(f.d)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"改单记录-"+Object(h.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")})}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=Math.random()},openAddOrder:function(){this.AddOrderVisible=!0},closeAddOrder:function(){this.AddOrderVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},showDetail:function(e){this.eventBus.$emit("showOrderDetail",e.id,e.shipSn,!0)}}}},"8UOW":function(e,t,i){"use strict";var o=i("us2a"),s=i("fyBF");var a=function(e){i("Qhr/")},r=i("VU/8")(o.a,s.a,a,null,null);t.a=r.exports},EPeO:function(e,t,i){"use strict";var o=i("//Fk"),n=i.n(o),s=i("mvHQ"),a=i.n(s),r=(i("UDRQ"),i("t5DY")),l=i("0xDb"),c=i("71e1"),d=i.n(c),u=i("Vo7i");t.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:1},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1},twocode:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[],showtc:!1,showtwocdetip:!0,twocodeurl:""}},watch:{showtc:function(){this.showtc?this.changeTwocode():clearInterval(this.uptimer)},value:{handler:function(e){if(this.showFileList){var t=Array.isArray(e)?e:e?e.split(","):[];t=t.filter(function(e){return e}),this.filelist=[],this.filelist=t.map(function(e){var t={};return t.url=e,t})}else this.filelist=e?[{url:e}]:[]},immediate:!0}},mounted:function(){},updated:function(){console.log("single image updated~~~")},beforeDestroy:function(){console.log("beforeDestroy"),clearInterval(this.uptimer)},methods:{init:function(){var t=this;return Object(r.m)().then(function(e){t.upload.OSSAccessKeyId=e.accessid,t.upload.policy=e.policy,t.upload.signature=e.signature,t.uploadUrl=e.host,t.dir=e.dir}).catch(function(){})},rmImage:function(t){this.filelist=this.filelist.filter(function(e){return e.url!==t}),this.emitInput(""),this.showtc=!1},onexceed:function(e,t){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(e,t){console.log("handleRemove:",e,t),this.filelist=t,this.emitInput()},random_string:function(e){e=e||32;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",i=t.length,o="",s=0;s<e;s++)o+=t.charAt(Math.floor(Math.random()*i));return o},emitInput:function(e){e&&this.filelist.push({url:e}),this.$emit("input",this.showFileList?this.filelist.map(function(e){return e.url}).join(","):e)},handleImageScucess:function(e){var t="";-1!==e.indexOf("Location")&&(t=(t=e.match(/<Location>([^<]+)<\/Location>/m))?t[1]:""),this.emitInput(t)},handleError:function(e){this.$message.error("上传错误："+a()(e)),this.$emit("error",e)},handleUpload:function(a){var r=this;return new n.a(function(o,s){var e=a.file.name,t=(e=e||Math.random()+".jpg").match(/([^\.]+)$/);t=t?"."+t[1]:"";var i=function(e){var t=new FormData,i=r.uploadUrl;t.append("key",r.upload.key),t.append("success_action_status","201"),t.append("OSSAccessKeyId",r.upload.OSSAccessKeyId),t.append("policy",r.upload.policy),t.append("signature",r.upload.signature),t.append("file",e),u.b.post(i,t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){o(e)}).catch(function(e){s(e),r._handlerCatchMsg(e,"上传失败:")})};/\.jpe?g/.test(t)?lrz(a.file,{width:1024}).then(function(e){i(e.file)}).catch(function(e){s(e),r._handlerCatchMsg(e,"上传失败：")}):i(a.file)})},beforeUpload:function(e){var i=this,o=/image\/\w+/.test(e.type)&&/(jpe?g|png)/i.test(e.type),s=e.size/1024/1024<5,a=e.name.match(/([^\.]+)$/);return a=a?"."+a[1]:"",new n.a(function(t,e){o?s?i.init().then(function(e){i.upload.key=i.dir+Object(l.parseTime)(new Date,"{y}{m}{d}")+"/"+i.random_string()+a,t(!0)}).catch(function(e){i._handlerCatchMsg(e),t(!1)}):(i.$message.error("上传头像图片大小不能超过 5MB!"),e(!1)):(i.$message.error("上传头像图片只能是 JPG/PNG 格式!"),e(!1))})},changeTwocode:function(){var i=this;clearInterval(this.uptimer),Object(r.k)().then(function(e){i.upid=e.data,i.startFetchData();var t="http://"+location.host+"/static/upload.html?len=1&access_token="+i.access_token+"&id="+e.data+"&url="+(window.tms_testapiurl||"");console.log("url:",t),d.a.toDataURL(t,{rendererOpts:{margin:0}}).then(function(e){i.twocodeurl=e})}).catch(function(e){i.$message.error("生成二维码出错了~")})},startFetchData:function(){var i=this;clearInterval(this.uptimer);var e=0;this.uptimer=setInterval(function(){if(57e4<(e+=5e3))return i.$message.info("二维码过期了，已重新生成~"),i.changeTwocode(),!1;Object(r.l)(i.upid).then(function(e){var t=e.data;t&&t.id===i.upid&&t.url&&(clearInterval(i.uptimer),i.showtc=!1,i.emitInput(decodeURIComponent(t.url)))}).catch(function(e){i.$message.info("二维码过期了，请重新扫描上传~")})},5e3)}}}},Ln7j:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("VY1p"),s=i("b/n2"),a=i("VU/8")(o.a,s.a,null,null,null);t.default=a.exports},Mzpx:function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"addOrderManagePop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[i("template",{staticClass:"addOrderManagePop-content",slot:"content"},[i("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[t.isModify?t._e():i("el-form-item",{staticClass:"clearfix"},[i("div",{staticClass:"selectType",class:{checked:2===t.form.companyType},on:{click:function(e){e.stopPropagation(),t.form.companyType=2}}},[i("span",{staticClass:"icon"},[i("icon-svg",{attrs:{"icon-class":"qiye"}})],1),t._v(" "),i("strong",[t._v("企业")]),t._v(" "),i("p",[t._v("有合法营业执照等企业")])]),t._v(" "),i("div",{staticClass:"selectType single",class:{checked:1===t.form.companyType},on:{click:function(e){e.stopPropagation(),t.form.companyType=1}}},[i("span",{staticClass:"icon"},[i("icon-svg",{attrs:{"icon-class":"geren"}})],1),t._v(" "),i("strong",[t._v("个人")]),t._v(" "),i("p",[t._v("具备有效身份的自然人")])])]),t._v(" "),2===t.form.companyType?[i("div",{staticClass:"info info-require"},[t._v("公司名称")]),t._v(" "),i("el-form-item",{attrs:{prop:"companyName"}},[i("el-input",{attrs:{maxlength:25,placeholder:"公司全称","auto-complete":"off"},model:{value:t.form.companyName,callback:function(e){t.$set(t.form,"companyName",e)},expression:"form.companyName"}})],1),t._v(" "),i("el-form-item",[i("upload",{staticClass:"licensePicture",attrs:{tip:"（有年检章，jpg/png。小于5M）"},model:{value:t.form.licensePicture,callback:function(e){t.$set(t.form,"licensePicture",e)},expression:"form.licensePicture"}})],1),t._v(" "),i("div",{staticClass:"info"},[t._v("公司法人信息")]),t._v(" "),i("el-form-item",{attrs:{prop:"legalPersonname"}},[i("el-input",{attrs:{maxlength:25,placeholder:"公司法人名称","auto-complete":"off"},model:{value:t.form.legalPersonname,callback:function(e){t.$set(t.form,"legalPersonname","string"==typeof e?e.trim():e)},expression:"form.legalPersonname"}})],1)]:t._e(),t._v(" "),i("el-form-item",{staticClass:"clearfix"},[i("div",{staticClass:"idcard-pos"},[i("upload",{attrs:{title:1===t.form.companyType?"自然人身份证正面":"法人身份证正面"},model:{value:t.form.idCardPositive,callback:function(e){t.$set(t.form,"idCardPositive",e)},expression:"form.idCardPositive"}})],1),t._v(" "),i("div",{staticClass:"idcard-ver"},[i("upload",{attrs:{title:1===t.form.companyType?"自然人身份证反面":"法人身份证反面"},model:{value:t.form.idCardVerso,callback:function(e){t.$set(t.form,"idCardVerso",e)},expression:"form.idCardVerso"}})],1)]),t._v(" "),i("div",{staticClass:"info"},[t._v(t._s(t.issender?"发":"收")+"货信息")]),t._v(" "),i("el-form-item",{attrs:{label:(t.issender?"发":"收")+"货方",prop:"customerUnit"}},[i("el-input",{attrs:{maxlength:25,"auto-complete":"off"},model:{value:t.form.customerUnit,callback:function(e){t.$set(t.form,"customerUnit",e)},expression:"form.customerUnit"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"联系人",prop:"customerName"}},[i("el-input",{attrs:{maxlength:25,"auto-complete":"off"},model:{value:t.form.customerName,callback:function(e){t.$set(t.form,"customerName",e)},expression:"form.customerName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"手机",prop:"customerMobile"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.customerMobile,callback:function(e){t.$set(t.form,"customerMobile",e)},expression:"form.customerMobile"}})],1),t._v(" "),i("el-form-item",{staticClass:"customerPhone",attrs:{label:"电话",prop:"customerPhone"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],staticClass:"phoneshort",attrs:{maxlength:"4","auto-complete":"off"},model:{value:t.phoneshort,callback:function(e){t.phoneshort=e},expression:"phoneshort"}}),t._v(" - "),i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],staticClass:"phonelong",attrs:{maxlength:8,"auto-complete":"off"},model:{value:t.phonelong,callback:function(e){t.phonelong=e},expression:"phonelong"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"归属网点",prop:"orgid"}},[i("SelectTree",{model:{value:t.form.orgid,callback:function(e){t.$set(t.form,"orgid",e)},expression:"form.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"客户VIP号",prop:"vipNum"}},[i("el-input",{attrs:{maxlength:11,"auto-complete":"off"},model:{value:t.form.vipNum,callback:function(e){t.$set(t.form,"vipNum",e)},expression:"form.vipNum"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"身份证号码",prop:"idcard"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:t.form.idcard,callback:function(e){t.$set(t.form,"idcard",e)},expression:"form.idcard"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开户行",prop:"openBank"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.openBank,callback:function(e){t.$set(t.form,"openBank",e)},expression:"form.openBank"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"银行名称",prop:"bankName"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.bankName,callback:function(e){t.$set(t.form,"bankName",e)},expression:"form.bankName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"银行卡号",prop:"bankCardNumber"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.bankCardNumber,callback:function(e){t.$set(t.form,"bankCardNumber",e)},expression:"form.bankCardNumber"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"详细地址",prop:"detailedAddress"}},[i("el-input",{attrs:{placeholder:"最多输入50个字符",maxlength:50,"auto-complete":"off"},model:{value:t.form.detailedAddress,callback:function(e){t.$set(t.form,"detailedAddress",e)},expression:"form.detailedAddress"}})],1)],2)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保 存")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=o},OoT8:function(e,t,i){"use strict";var o=i("woOf"),s=i.n(o),a=i("Dd8w"),r=i.n(a),n=i("E4LH"),l=i("Vi15"),c=i("P5Di"),d=i("QbVN"),u=i("o9X6"),p=i("NYxO");t.a={components:{popRight:c.a,Upload:d.a,SelectTree:u.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1}},computed:r()({},Object(p.mapGetters)(["otherinfo"]),{fixPhone:{get:function(){return this.phoneshort+"-"+this.phonelong},set:function(e){var t=e?e.split("-"):"";t?(this.phoneshort=t[1]?t[0]:"",this.phonelong=t[1]?t[1]:t[0]):(this.phoneshort="",this.phonelong="")}}}),data:function(){return{phoneshort:"",phonelong:"",form:{bankCardNumber:"",bankName:"",companyName:"",companyType:2,customerMobile:"",customerName:"",customerType:this.issender?1:2,customerUnit:"",detailedAddress:"",fixPhone:"",idCardPositive:"",idCardVerso:"",idcard:"",legalPersonname:"",licensePicture:"",openBank:"",orgid:0,vipNum:""},formLabelWidth:"90px",tooltip:!1,rules:{companyName:[{required:!0,message:"请输入公司名称",trigger:"blur"},{min:2,max:25,message:"长度在 2 到 25 个字符",trigger:"blur"}],orgid:[{required:!0,message:"请选择所属机构",trigger:"blur"}],customerMobile:[{required:!0,message:"请输入手机号码",trigger:"blur",pattern:n.a.MOBILE}],customerName:[{required:!0,message:"请输入联系人",trigger:"blur"},{max:30,message:"不能超过30个字符",trigger:"blur"}]},popTitle:"新增发货人",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1}},mounted:function(){this.form.orgid=this.orgid,this.inited||(this.inited=!0,this.initInfo())},watch:{popVisible:function(e,t){this.inited||(this.inited=!0,this.initInfo())},orgid:function(e){this.form.orgid=e},info:function(){if(this.isModify){this.popTitle="修改"+(this.issender?"发":"收")+"货人";var e=s()({},this.info);for(var t in this.form)this.form[t]=e[t];this.form.customerId=e.customerId,console.log("this.fixphone",this.fixPhone,this.form.fixPhone,e),this.fixPhone=this.form.fixPhone}else{for(var i in this.popTitle="新增"+(this.issender?"发":"收")+"货人",this.form)this.form[i]="";delete this.form.customerId,this.form.companyType=2,this.form.customerType=this.issender?1:2,this.form.orgid=this.orgid,this.fixPhone=""}}},methods:{initInfo:function(){this.loading=!1},getOrgid:function(e){this.form.orgid=e},submitForm:function(e){var i=this;this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0;var t=s()({},i.form);t.fixPhone=i.fixPhone;(i.isModify?Object(l.e)(t):Object(l.d)(t)).then(function(e){i.loading=!1,i.$message.success("保存成功"),i.closeMe(),i.$emit("success")}).catch(function(e){i._handlerCatchMsg(e),i.loading=!1})})},reset:function(){this.$refs.ruleForm.resetFields(),this.form.licensePicture="",this.form.idCardPositive="",this.form.idCardVerso=""},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},QbVN:function(e,t,i){"use strict";var o=i("EPeO"),s=i("jxZV");var a=function(e){i("0Q33"),i("xU5l")},r=i("VU/8")(o.a,s.a,a,"data-v-de7091b2",null);t.a=r.exports},"Qhr/":function(e,t){},RNOs:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("851T"),s=i("szgL"),a=i("VU/8")(o.a,s.a,null,null,null);t.default=a.exports},SjYS:function(e,t,i){"use strict";var o=i("seR9"),s=i("msh6");var a=function(e){i("nl9Y")},r=i("VU/8")(o.a,s.a,a,null,null);t.a=r.exports},VY1p:function(e,t,i){"use strict";var o=i("woOf"),s=i.n(o),a=i("0xDb"),r=i("o9X6"),n=i("9UCZ"),l=i("8UOW");t.a={name:"order-manage-search",components:{SelectTree:r.a,SelectType:n.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},data:function(){return{searchCreatTime:[],defaultTime:[Object(a.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(a.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgid:"",shipSn:"",shipFormCityName:""},rules:{mobile:[{}]},pickerOptions2:{shortcuts:a.pickerOptions2},searchObjs:{},searchAll:"1"}},watch:{orgid:function(e){this.searchForm.orgid=e},searchForm:{handler:function(e,t){this.searchObjs=s()({},e)},deep:!0}},mounted:function(){this.searchForm.orgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getDataObj:function(e){this.searchForm=s()({},e),this.$emit("change",e)},onSubmit:function(){var e={};e.shipFromOrgid=this.searchForm.orgid,e.shipFormCityName=this.searchForm.shipFormCityName,e.startTime=this.searchCreatTime?this.searchCreatTime[0]+" 00:00:00":"",e.endTime=this.searchCreatTime?this.searchCreatTime[1]+" 23:59:59":"",e.shipSn=this.searchForm.shipSn,this.searchForm.startTime=e.startTime,this.searchForm.endTime=e.endTime,this.$emit("change",e)},clearForm:function(){var e=this;this.searchCreatTime=this.defaultTime,this.searchForm.orgid=this.orgid,this.searchForm.shipFormCityName="",this.searchForm.startTime="",this.searchForm.endTime="",this.searchForm.shipSn="",this.searchAll="1",setTimeout(function(){e.searchAll=""},66)}}}},"b/n2":function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right","label-width":"70px",rules:t.rules,model:t.searchForm}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right",size:t.btnsize,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"开单网点:"}},[i("select-tree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),i("el-form-item",{staticClass:"searchinfo--order",attrs:{label:"运单号"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{staticClass:"searchinfo--order",attrs:{label:"发站"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.shipFormCityName,callback:function(e){t.$set(t.searchForm,"shipFormCityName",e)},expression:"searchForm.shipFormCityName"}})],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=o},fyBF:function(e,t,i){"use strict";var o={render:function(){var i=this,e=i.$createElement,o=i._self._c||e;return i.hasCode?o("div",{staticClass:"searchAll_lyy"},[o("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[o("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return o("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),o("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t)}}})])})),i._v(" "),o("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),o("addSave",{attrs:{code:i.hasCode,searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1):i._e()},staticRenderFns:[]};t.a=o},jxZV:function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload-container",class:{uploadlist:t.showFileList}},[i("el-upload",{staticClass:"image-uploader",attrs:{data:t.upload,action:t.uploadUrl,multiple:!1,drag:!t.showFileList,"show-file-list":t.showFileList,"file-list":t.filelist,limit:t.limit,"before-upload":t.beforeUpload,"list-type":t.listtype,"on-exceed":t.onexceed,disabled:t.disabled,"on-remove":t.handleRemove,"on-error":t.handleError,"http-request":t.handleUpload,"on-success":t.handleImageScucess}},[t._t("content",[t.showtc?i("div",{staticClass:"twocodebox",on:{click:function(e){e.stopPropagation(),e.preventDefault()},mouseover:function(e){t.showtwocdetip=!0},mouseout:function(e){t.showtwocdetip=!1}}},[i("div",[i("img",{attrs:{src:t.twocodeurl,alt:""}})]),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"},on:{click:function(e){t.showtc=!1}}},[t._v("本地上传")]),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"},on:{click:t.changeTwocode}},[t._v("更换二维码")])],1):i("div",[t.title&&!t.showFileList?i("div",{staticClass:"upload__title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"}},[t._v("点击上传")]),t._v(" "),t.twocode?i("el-button",{staticClass:"uploadtwocode",attrs:{size:t.size,type:"primary"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.showtc=!0}}},[t._v("二维码上传")]):t._e(),t._v(" "),t.showFileList?t._e():i("div",{staticClass:"el-upload__text"},[t._v("将文件拖拽到此区域")]),t._v(" "),t.tip?i("div",{staticClass:"upload__tip"},[t._v(t._s(t.tip))]):t._e()],1)])],2),t._v(" "),t.imageUrl&&!t.showFileList?i("div",{staticClass:"image-preview"},[i("div",{staticClass:"image-preview-wrapper"},[i("img",{attrs:{src:t.imageUrl}}),t._v(" "),i("div",{staticClass:"image-preview-action"},[i("i",{staticClass:"el-icon-delete",on:{click:function(e){t.rmImage(t.imageUrl)}}})])])]):t._e()],1)},staticRenderFns:[]};t.a=o},lF23:function(e,t){},msh6:function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=o},nl9Y:function(e,t){},seR9:function(e,t,i){"use strict";var o=i("mvHQ"),s=i.n(o),a=i("t5DY"),r=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=s()(i.searchObj);var t=Object(r.objectMerge2)({},i.form);console.log("addSave_data",t),Object(a.q)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},szgL:function(e,t,i){"use strict";var o={render:function(){var i=this,e=i.$createElement,o=i._self._c||e;return o("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab-content"},[o("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),o("div",{staticClass:"tab_info"},[o("div",{staticClass:"btns_box"},[o("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_E2",arg:"ORDER_E2"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出")]),i._v(" "),o("el-button",{directives:[{name:"has",rawName:"v-has:ORDER_P1",arg:"ORDER_P1"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印")]),i._v(" "),o("span",{staticClass:"viewtip"},[i._v("\n          双击查看详情\n        ")]),i._v(" "),o("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:i.btnsize,icon:"el-icon-setting",plain:""},on:{click:i.setTable}},[i._v("表格设置")])],1),i._v(" "),o("div",{staticClass:"info_tab",on:{mouseover:function(e){i.showtip=!0},mouseout:function(e){i.showtip=!1}}},[o("el-table",{key:i.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:i.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":i.clickDetails,"row-dblclick":i.showDetail,"selection-change":i.getSelection}},[o("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),i._v(" "),i._l(i.tableColumn,function(t){return[t.slot?o("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",label:t.label,width:t.width},scopedSlots:i._u([{key:"default",fn:function(e){return[o("div",{domProps:{innerHTML:i._s(t.slot(e))}})]}}])}):o("el-table-column",{key:t.id,attrs:{fixed:t.fixed,sortable:"",label:t.label,prop:t.prop,width:t.width}})]})],2)],1),i._v(" "),o("div",{staticClass:"info_tab_footer"},[i._v("共计:"+i._s(i.total)+" "),o("div",{staticClass:"show_pager"},[o("Pager",{attrs:{total:i.total},on:{change:i.handlePageChange}})],1)])]),i._v(" "),o("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.tableColumn,code:"ORDER_UP"},on:{close:i.closeSetupTable,success:i.setColumn}})],1)},staticRenderFns:[]};t.a=o},us2a:function(e,t,i){"use strict";var o=i("t5DY"),s=i("SjYS");t.a={components:{addSave:s.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){""===e&&(this.datalist="")},searchObj:{handler:function(e,t){},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(o.a)(e.id).then(function(e){t.fetchAllloadAll(),t.datalist&&(t.datalist="")}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(o.p)(this.querySearch).then(function(e){t.dataset=e.list||[],t.options4=e.list||[]})},querySearchAsync:function(e,t){var i=this.dataset,o=e?i.filter(this.createStateFilter(e)):i;t(this.options4=o)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,o=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",o)}}}}},xU5l:function(e,t){}});