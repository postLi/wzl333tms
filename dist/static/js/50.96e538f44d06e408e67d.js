webpackJsonp([50,202,398],{"//Ie":function(e,t,i){"use strict";var o=i("woOf"),s=i.n(o),a=i("Dd8w"),r=i.n(a),n=i("E4LH"),l=i("Vi15"),c=i("P5Di"),d=i("QbVN"),u=i("o9X6"),m=i("NYxO");t.a={components:{popRight:c.a,Upload:d.a,SelectTree:u.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},isModify:{type:Boolean,default:!1},info:{type:Object,default:function(){}},issender:{type:Boolean,dafault:!1}},computed:r()({},Object(m.mapGetters)(["otherinfo"]),{fixPhone:{get:function(){return this.phoneshort+"-"+this.phonelong},set:function(e){var t=e?e.split("-"):"";t?(this.phoneshort=t[1]?t[0]:"",this.phonelong=t[1]?t[1]:t[0]):(this.phoneshort="",this.phonelong="")}},customphoneisok:function(){}}),data:function(){return{phoneshort:"",phonelong:"",form:{bankCardNumber:"",bankName:"",companyName:"",companyType:2,customerMobile:"",customerName:"",customerType:this.issender?1:2,customerUnit:"",detailedAddress:"",fixPhone:"",idcardPositive:"",idcardVerso:"",idcard:"",legalPersonname:"",licensePicture:"",openBank:"",orgid:0,vipNum:""},formLabelWidth:"90px",tooltip:!1,rules:{companyName:[],orgid:[{required:!0,message:"请选择所属机构"}],customerMobile:[{required:!0,message:"请输入手机号码",trigger:"change"}],customerName:[{required:!0,message:"请输入联系人"},{max:30,message:"不能超过30个字符"}],vipNum:[{pattern:n.a.ONLY_NUMBER_AND_LETTER,trigger:"blur",message:"客户的VIP号只能输入字母和阿拉伯数字"}],idcard:[{pattern:n.a.ONLY_NUMBER_AND_LETTER,trigger:"blur",message:"身份证号码只能输入字母和数字"}]},popTitle:"新增发货人",orgArr:[],rolesArr:[],departmentArr:[],loading:!1,roles:[],departments:[],groups:[],inited:!1,isSaveAndAdd:!0}},mounted:function(){this.form.orgid=this.orgid,this.inited||(this.inited=!0,this.initInfo()),console.log(this.issender),console.log(this.popTitle)},watch:{"form.customerMobile":function(e){this.isSaveAndAdd&&(console.log("33333"),this.$refs.ruleForm.validateField("customerMobile"))},popVisible:function(e,t){this.inited||(this.inited=!0,this.initInfo()),e&&this.setTitle(),console.log(this.popTitle)},orgid:function(e){this.form.orgid=e},info:function(){if(this.isModify){this.popTitle="修改"+(this.issender?"发":"收")+"货人";var e=s()({},this.info);for(var t in this.form)this.form[t]=e[t];this.form.customerId=e.customerId,console.log("this.fixphone",this.fixPhone,this.form.fixPhone,e),this.fixPhone=this.form.fixPhone}else{for(var i in console.log(this.issender),this.popTitle="新增"+(this.issender?"发":"收")+"货人",this.form)this.form[i]="";delete this.form.customerId,this.form.companyType=2,this.form.customerType=this.issender?1:2,this.form.orgid=this.orgid,this.fixPhone=""}}},methods:{setTitle:function(){if(this.isModify){this.popTitle="修改"+(this.issender?"发":"收")+"货人";var e=s()({},this.info);for(var t in this.form)this.form[t]=e[t];this.form.customerId=e.customerId,console.log("this.fixphone",this.fixPhone,this.form.fixPhone,e),this.fixPhone=this.form.fixPhone}else{for(var i in console.log(this.issender),this.popTitle="新增"+(this.issender?"发":"收")+"货人",this.form)this.form[i]="";delete this.form.customerId,this.form.companyType=2,this.form.customerType=this.issender?1:2,this.form.orgid=this.orgid,this.fixPhone=""}},initInfo:function(){this.loading=!1},getOrgid:function(e){this.form.orgid=e},submitForm:function(e,i){var o=this;this.$refs[e].validate(function(e){if(!e)return!1;o.loading=!0;var t=s()({},o.form);t.fixPhone=o.fixPhone;(o.isModify?Object(l.e)(t):Object(l.d)(t)).then(function(e){o.loading=!1,o.$message.success("保存成功"),i||o.closeMe(),o.$emit("success"),o.reset()}).catch(function(e){o._handlerCatchMsg(e),o.loading=!1})})},reset:function(){var e=this;this.isSaveAndAdd=!1;var t=this.form.orgid;this.$refs.ruleForm.resetFields(),this.form.licensePicture="",this.form.idcardPositive="",this.form.idcardVerso="",this.fixPhone="",this.form.fixPhone="",this.form.customerMobile="",this.form.orgid=t,console.log(this.form,"///////////////"),this.$nextTick(function(){e.isSaveAndAdd=!0})},closeMe:function(e){this.reset(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()}}}},"0Q33":function(e,t){},"2R4k":function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right","label-width":"70px",rules:t.rules,model:t.searchForm}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"网点"}},[i("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:t.title+"货人"}},[i("el-input",{attrs:{placeholder:t.title+"货方或"+t.title+"货人",maxlength:"15",clearable:""},model:{value:t.searchForm.name,callback:function(e){t.$set(t.searchForm,"name",e)},expression:"searchForm.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"手机号码"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{placeholder:"请输入手机号码",maxlength:"11",clearable:""},model:{value:t.searchForm.mobile,callback:function(e){t.$set(t.searchForm,"mobile",e)},expression:"searchForm.mobile"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=o},"2yNd":function(e,t,i){"use strict";var o=i("Dd8w"),s=i.n(o),a=i("Vi15"),r=i("jtQt"),n=i("puNT"),l=i("ftoq"),c=i("NYxO"),d=i("1onU"),u=i("ijWn"),m=i("0xDb"),p=i("UQm2");t.a={components:{SearchForm:r.default,Pager:d.a,TableSetup:n.a,AddCustomer:l.default,ImportDialog:u.a},computed:s()({},Object(c.mapGetters)(["otherinfo"]),{orgid:function(){return console.log(this.selectInfo.orgid,this.searchQuery.vo.orgid,this.otherinfo.orgid),this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}}),mounted:function(){var t=this;this.searchQuery.vo.orgid=this.otherinfo.orgid,this.fetchAllCustomer(this.otherinfo.orgid).then(function(e){t.loading=!1})},data:function(){var t=this;return{btnsize:"mini",usersArr:[],total:0,loading:!0,importDialogVisible:!1,setupTableVisible:!1,AddCustomerVisible:!1,isModify:!1,selectInfo:{},selected:[],searchQuery:{currentPage:1,pageSize:100,vo:{orgid:1,customerType:1,customerMobile:"",customerName:""}},tablekey:"",tableColumn:[{label:"序号",prop:"id",width:"60",fixed:!0,slot:function(e){return(t.searchQuery.currentPage-1)*t.searchQuery.pageSize+e.$index+1}},{label:"发货公司",prop:"companyName",width:"120",fixed:!0},{label:"发货方",prop:"customerUnit",width:"120",fixed:!1},{label:"发货人",prop:"customerName",width:"120",fixed:!1},{label:"手机号码",prop:"customerMobile",width:"120",fixed:!1},{label:"归属网点",prop:"orgName",width:"120",fixed:!1},{label:"公司法人",prop:"legalPersonname",width:"120",fixed:!1},{label:"VIP号",prop:"vipNum",width:"180"},{label:"身份证号码",prop:"idcard",width:200,fixed:!1},{label:"银行名称",prop:"bankName",width:"120",fixed:!1},{label:"银行卡号",prop:"bankCardNumber",width:"180",fixed:!1},{label:"开户行",prop:"openBank",width:"120",fixed:!1},{label:"详细地址",prop:"detailedAddress",width:"180",fixed:!1},{label:"身份证图片",prop:"idCardPositive",width:"180",fixed:!1,ispic:!0}]}},methods:{fetchAllCustomer:function(){var t=this;return this.loading=!0,Object(a.b)(this.searchQuery).then(function(e){t.usersArr=e.list,t.total=e.total,t.loading=!1}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},fetchData:function(){this.fetchAllCustomer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchAllCustomer()},getSearchParam:function(e){this.searchQuery.currentPage=this.$options.data().searchQuery.currentPage,this.searchQuery.pageSize=this.$options.data().searchQuery.pageSize,this.searchQuery.vo.orgid=e.orgid,this.searchQuery.vo.customerMobile=e.mobile,this.searchQuery.vo.customerName=e.name,this.fetchAllCustomer()},doAction:function(e){var t=this;if(!this.selected.length&&"add"!==e&&"import"!==e&&"export"!==e)return this.closeAddCustomer(),this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"add":this.isModify=!1,this.selectInfo={},this.openAddCustomer();break;case"modify":this.isModify=!0,1<this.selected.length&&this.$message({message:"每次只能修改单条数据~",type:"warning"}),this.selectInfo=this.selected[0],this.openAddCustomer();break;case"delete":var i=1<this.selected.length?this.selected.length+"名":this.selected[0].customerName,o=this.selected.map(function(e){return e.customerId});o=o.join(","),this.$confirm("确定要删除 "+i+" 客户吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a.a)(o).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:e.errorInfo})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})});break;case"export":Object(p.g)({data:this.selected.length?this.selected:this.usersArr,columns:this.tableColumn,name:"发货人列表-"+Object(m.parseTime)(new Date,"{y}{m}{d}{h}{i}{s}")});break;case"import":this.importDialogVisible=!0}this.$refs.multipleTable.clearSelection()},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},setColumn:function(e){this.tableColumn=e,this.tablekey=(new Date).getTime()},openAddCustomer:function(){this.AddCustomerVisible=!0},closeAddCustomer:function(){this.AddCustomerVisible=!1},clickDetails:function(e,t,i){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e}}}},"5aUT":function(e,t,i){"use strict";var s=i("E4LH"),o=i("o9X6");t.a={components:{SelectTree:o.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},computed:{title:function(){return this.issender?"发":"收"}},data:function(){var o=this;return{searchForm:{orgid:"",name:"",mobile:"",customerUnit:""},rules:{mobile:[{validator:function(e,t,i){o.searchForm.mobile=t.replace(s.a.NO_NUMBER,""),i()},trigger:"change"}]}}},watch:{orgid:function(e){this.searchForm.orgid=e}},mounted:function(){this.searchForm.orgid=this.orgid},methods:{getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.name="",this.searchForm.orgid=this.orgid,this.searchForm.mobile=""}}}},"71e1":function(e,t,i){e.exports=i("+dzQ")(43)},CoRh:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("2yNd"),s=i("iroG"),a=i("VU/8")(o.a,s.a,null,null,null);t.default=a.exports},EPeO:function(e,t,i){"use strict";var o=i("//Fk"),n=i.n(o),s=i("mvHQ"),a=i.n(s),r=(i("UDRQ"),i("t5DY")),l=i("0xDb"),c=i("71e1"),d=i.n(c),u=i("Vo7i");t.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:1},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1},twocode:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[],showtc:!1,showtwocdetip:!0,twocodeurl:""}},watch:{showtc:function(){this.showtc?this.changeTwocode():clearInterval(this.uptimer)},value:{handler:function(e){if(this.showFileList){var t=Array.isArray(e)?e:e?e.split(","):[];t=t.filter(function(e){return e}),this.filelist=[],this.filelist=t.map(function(e){var t={};return t.url=e,t})}else this.filelist=e?[{url:e}]:[]},immediate:!0}},mounted:function(){},updated:function(){console.log("single image updated~~~")},beforeDestroy:function(){console.log("beforeDestroy"),clearInterval(this.uptimer)},methods:{init:function(){var t=this;return Object(r.m)().then(function(e){t.upload.OSSAccessKeyId=e.accessid,t.upload.policy=e.policy,t.upload.signature=e.signature,t.uploadUrl=e.host,t.dir=e.dir}).catch(function(){})},rmImage:function(t){this.filelist=this.filelist.filter(function(e){return e.url!==t}),this.emitInput(""),this.showtc=!1},onexceed:function(e,t){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(e,t){console.log("handleRemove:",e,t),this.filelist=t,this.emitInput()},random_string:function(e){e=e||32;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",i=t.length,o="",s=0;s<e;s++)o+=t.charAt(Math.floor(Math.random()*i));return o},emitInput:function(e){e&&this.filelist.push({url:e}),this.$emit("input",this.showFileList?this.filelist.map(function(e){return e.url}).join(","):e)},handleImageScucess:function(e){var t="";-1!==e.indexOf("Location")&&(t=(t=e.match(/<Location>([^<]+)<\/Location>/m))?t[1]:""),this.emitInput(t)},handleError:function(e){this.$message.error("上传错误："+a()(e)),this.$emit("error",e)},handleUpload:function(a){var r=this;return new n.a(function(o,s){var e=a.file.name,t=(e=e||Math.random()+".jpg").match(/([^\.]+)$/);t=t?"."+t[1]:"";var i=function(e){var t=new FormData,i=r.uploadUrl;t.append("key",r.upload.key),t.append("success_action_status","201"),t.append("OSSAccessKeyId",r.upload.OSSAccessKeyId),t.append("policy",r.upload.policy),t.append("signature",r.upload.signature),t.append("file",e),u.b.post(i,t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){o(e)}).catch(function(e){s(e),r._handlerCatchMsg(e,"上传失败:")})};/\.jpe?g/.test(t)?lrz(a.file,{width:1024}).then(function(e){i(e.file)}).catch(function(e){s(e),r._handlerCatchMsg(e,"上传失败：")}):i(a.file)})},beforeUpload:function(e){var i=this,o=/image\/\w+/.test(e.type)&&/(jpe?g|png)/i.test(e.type),s=e.size/1024/1024<5,a=e.name.match(/([^\.]+)$/);return a=a?"."+a[1]:"",new n.a(function(t,e){o?s?i.init().then(function(e){i.upload.key=i.dir+Object(l.parseTime)(new Date,"{y}{m}{d}")+"/"+i.random_string()+a,t(!0)}).catch(function(e){i._handlerCatchMsg(e),t(!1)}):(i.$message.error("上传头像图片大小不能超过 5MB!"),e(!1)):(i.$message.error("上传头像图片只能是 JPG/PNG 格式!"),e(!1))})},changeTwocode:function(){var i=this;clearInterval(this.uptimer),Object(r.k)().then(function(e){i.upid=e.data,i.startFetchData();var t="http://"+location.host+"/static/upload.html?len=1&access_token="+i.access_token+"&id="+e.data+"&url="+(window.tms_testapiurl||"");console.log("url:",t),d.a.toDataURL(t,{rendererOpts:{margin:0}}).then(function(e){i.twocodeurl=e})}).catch(function(e){i.$message.error("生成二维码出错了~")})},startFetchData:function(){var i=this;clearInterval(this.uptimer);var e=0;this.uptimer=setInterval(function(){if(57e4<(e+=5e3))return i.$message.info("二维码过期了，已重新生成~"),i.changeTwocode(),!1;Object(r.l)(i.upid).then(function(e){var t=e.data;t&&t.id===i.upid&&t.url&&(clearInterval(i.uptimer),i.showtc=!1,i.emitInput(decodeURIComponent(t.url)))}).catch(function(e){i.$message.info("二维码过期了，请重新扫描上传~")})},5e3)}}}},QbVN:function(e,t,i){"use strict";var o=i("EPeO"),s=i("jxZV");var a=function(e){i("0Q33"),i("xU5l")},r=i("VU/8")(o.a,s.a,a,"data-v-de7091b2",null);t.a=r.exports},XRGj:function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"addCustomerPop",attrs:{title:t.popTitle,isShow:t.popVisible},on:{close:t.closeMe}},[i("template",{staticClass:"addCustomerPop-content",slot:"content"},[i("el-form",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[t.isModify?t._e():i("el-form-item",{staticClass:"clearfix"},[i("div",{staticClass:"selectType",class:{checked:2===t.form.companyType},on:{click:function(e){e.stopPropagation(),t.form.companyType=2}}},[i("span",{staticClass:"icon"},[i("icon-svg",{attrs:{"icon-class":"qiye"}})],1),t._v(" "),i("strong",[t._v("企业")]),t._v(" "),i("p",[t._v("有合法营业执照等企业")])]),t._v(" "),i("div",{staticClass:"selectType single",class:{checked:1===t.form.companyType},on:{click:function(e){e.stopPropagation(),t.form.companyType=1}}},[i("span",{staticClass:"icon"},[i("icon-svg",{attrs:{"icon-class":"geren"}})],1),t._v(" "),i("strong",[t._v("个人")]),t._v(" "),i("p",[t._v("具备有效身份的自然人")])])]),t._v(" "),2===t.form.companyType?[i("div",{staticClass:"info"},[t._v("公司名称")]),t._v(" "),i("el-form-item",{attrs:{prop:"companyName"}},[i("el-input",{attrs:{maxlength:25,placeholder:"公司全称"},model:{value:t.form.companyName,callback:function(e){t.$set(t.form,"companyName","string"==typeof e?e.trim():e)},expression:"form.companyName"}})],1),t._v(" "),i("el-form-item",[i("upload",{staticClass:"licensePicture",attrs:{twocode:"",tip:"（有年检章，jpg/png。小于5M）"},model:{value:t.form.licensePicture,callback:function(e){t.$set(t.form,"licensePicture",e)},expression:"form.licensePicture"}})],1),t._v(" "),i("div",{staticClass:"info"},[t._v("公司法人信息")]),t._v(" "),i("el-form-item",{attrs:{prop:"legalPersonname"}},[i("el-input",{attrs:{maxlength:25,placeholder:"公司法人名称","auto-complete":"off"},model:{value:t.form.legalPersonname,callback:function(e){t.$set(t.form,"legalPersonname","string"==typeof e?e.trim():e)},expression:"form.legalPersonname"}})],1)]:t._e(),t._v(" "),i("el-form-item",{staticClass:"clearfix"},[i("div",{staticClass:"idcard-pos"},[i("upload",{attrs:{twocode:"",title:1===t.form.companyType?"自然人身份证正面":"法人身份证正面"},model:{value:t.form.idcardPositive,callback:function(e){t.$set(t.form,"idcardPositive",e)},expression:"form.idcardPositive"}})],1),t._v(" "),i("div",{staticClass:"idcard-ver"},[i("upload",{attrs:{twocode:"",title:1===t.form.companyType?"自然人身份证反面":"法人身份证反面"},model:{value:t.form.idcardVerso,callback:function(e){t.$set(t.form,"idcardVerso",e)},expression:"form.idcardVerso"}})],1)]),t._v(" "),i("div",{staticClass:"info"},[t._v(t._s(t.issender?"发":"收")+"货信息")]),t._v(" "),i("el-form-item",{attrs:{label:(t.issender?"发":"收")+"货方",prop:"customerUnit"}},[i("el-input",{attrs:{maxlength:25,"auto-complete":"off"},model:{value:t.form.customerUnit,callback:function(e){t.$set(t.form,"customerUnit",e)},expression:"form.customerUnit"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"联系人",prop:"customerName"}},[i("el-input",{attrs:{maxlength:25,"auto-complete":"off"},model:{value:t.form.customerName,callback:function(e){t.$set(t.form,"customerName",e)},expression:"form.customerName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"手机",prop:"customerMobile"}},[i("input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"},{name:"model",rawName:"v-model.trim",value:t.form.customerMobile,expression:"form.customerMobile",modifiers:{trim:!0}}],staticClass:"nativeinput",attrs:{type:"text","auto-complete":"off",maxlength:"20"},domProps:{value:t.form.customerMobile},on:{input:function(e){e.target.composing||t.$set(t.form,"customerMobile",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),i("el-form-item",{staticClass:"customerPhone",attrs:{label:"电话",prop:"customerPhone"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],staticClass:"phoneshort",attrs:{maxlength:4,"auto-complete":"off"},model:{value:t.phoneshort,callback:function(e){t.phoneshort=e},expression:"phoneshort"}}),t._v(" - "),i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],staticClass:"phonelong",attrs:{maxlength:8,"auto-complete":"off"},model:{value:t.phonelong,callback:function(e){t.phonelong=e},expression:"phonelong"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"归属网点",prop:"orgid"}},[i("SelectTree",{attrs:{filterable:"",orgid:t.otherinfo.orgid},model:{value:t.form.orgid,callback:function(e){t.$set(t.form,"orgid",e)},expression:"form.orgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"客户VIP号",prop:"vipNum"}},[i("el-input",{attrs:{maxlength:25,"auto-complete":"off"},model:{value:t.form.vipNum,callback:function(e){t.$set(t.form,"vipNum",e)},expression:"form.vipNum"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"身份证号码",prop:"idcard"}},[i("el-input",{attrs:{maxlength:18,"auto-complete":"off"},model:{value:t.form.idcard,callback:function(e){t.$set(t.form,"idcard",e)},expression:"form.idcard"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开户行",prop:"openBank"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.openBank,callback:function(e){t.$set(t.form,"openBank",e)},expression:"form.openBank"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"银行名称",prop:"bankName"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off"},model:{value:t.form.bankName,callback:function(e){t.$set(t.form,"bankName",e)},expression:"form.bankName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"银行卡号",prop:"bankCardNumber"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:25,"auto-complete":"off"},model:{value:t.form.bankCardNumber,callback:function(e){t.$set(t.form,"bankCardNumber","string"==typeof e?e.trim():e)},expression:"form.bankCardNumber"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"详细地址",prop:"detailedAddress"}},[i("el-input",{attrs:{type:"textarea",placeholder:"最多输入50个字符",maxlength:50,"auto-complete":"off"},model:{value:t.form.detailedAddress,callback:function(e){t.$set(t.form,"detailedAddress",e)},expression:"form.detailedAddress"}})],1)],2)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.isModify?t._e():i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm",!0)}}},[t._v("保存并新增")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保 存")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=o},bPPU:function(e,t,i){"use strict";var l=i("t5DY");t.a={props:{isSubjectInfo:{type:Boolean,default:!1},popVisible:{type:Boolean,default:!1},info:{type:String,default:""}},watch:{isSubjectInfo:function(e){this.titlePop=e?"导入模板":"批量导入"}},data:function(){return{titlePop:"批量导入",importType:{},isInitDialog:!0,resMessage:{failInfoList:[]},percentage:0,isProgress:!0,dataInfo:[],tableKey:0,uploadStatus:!0}},computed:{isShow:{get:function(){return this.popVisible&&this.init(),this.popVisible},set:function(){}}},methods:{init:function(){this.$set(this.importType,"sender",this.$const.CUSTOMER_SENDER_EXCEL),this.$set(this.importType,"receiver",this.$const.CUSTOMER_RECEIVER_EXCEL),this.$set(this.importType,"truck",this.$const.TRUCK_EXCEL),this.$set(this.importType,"carrier",this.$const.CARRIER_EXCEL),this.$set(this.importType,"driver",this.$const.DRIVER_EXCEL),this.$set(this.importType,"subinfo",this.$const.SUBINFO_EXCEL),this.isInitDialog=!0},doAction:function(e){switch(e){case"import":break;case"download":this.downloadFile()}},downloadFile:function(){this.info&&window.open(this.importType[this.info])},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},handleChange:function(){},uploadHandleFile:function(e){var t=this;this.uploadStatus=!0;var i=e.file,o="",s=i.name.toLowerCase(),a=s.lastIndexOf(".");if(-1<a&&(o=s.substring(a)),o&&".xlsx"===o){var r=new FormData,n=void 0;r.append("uploadfile",i),this.isProgress=!0,this.isSubjectInfo?n=Object(l.o)(r):(r.append("excelSign",this.info),n=Object(l.n)(r)),n.then(function(e){e&&(console.log("res",e),t.resMessage=e,t.failInfoList=e.failInfoList,t.uploadStatus=!0,t.percentageAnimated(),t.$emit("success"),t.$message({type:"success",message:"操作成功"})),t.isInitDialog=!1}).catch(function(e){t.resMessage=e,t.isInitDialog=!1,t.uploadStatus=!1,t.percentageAnimated(),t._handlerCatchMsg(e)})}else this.$message({type:"info",message:"只能上传 .xlsx 模板文件"})},percentageAnimated:function(){var e=this,t=0,i=setInterval(function(){t+=1,100===(e.percentage=t)&&(e.isProgress=!1,window.clearInterval(i))},10)}}}},ftoq:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("//Ie"),s=i("XRGj");var a=function(e){i("nveU")},r=i("VU/8")(o.a,s.a,a,null,null);t.default=r.exports},ijWn:function(e,t,i){"use strict";var o=i("bPPU"),s=i("j///"),a=i("VU/8")(o.a,s.a,null,null,null);t.a=a.exports},iroG:function(e,t,i){"use strict";var o={render:function(){var o=this,e=o.$createElement,s=o._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:o.loading,expression:"loading"}],staticClass:"tab-content"},[s("SearchForm",{attrs:{orgid:o.otherinfo.orgid,issender:!0,btnsize:o.btnsize},on:{change:o.getSearchParam}}),o._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{directives:[{name:"has",rawName:"v-has:SENDER_ADD",arg:"SENDER_ADD"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-circle-plus",plain:""},on:{click:function(e){o.doAction("add")}}},[o._v("新增")]),o._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:SENDER_UP",arg:"SENDER_UP"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-edit",plain:""},on:{click:function(e){o.doAction("modify")}}},[o._v("修改")]),o._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:SENDER_DEL",arg:"SENDER_DEL"}],attrs:{type:"danger",size:o.btnsize,icon:"el-icon-delete",plain:""},on:{click:function(e){o.doAction("delete")}}},[o._v("删除")]),o._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:SENDER_EXP",arg:"SENDER_EXP"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){o.doAction("export")}}},[o._v("导出")]),o._v(" "),s("el-button",{directives:[{name:"has",rawName:"v-has:SENDER_EOP",arg:"SENDER_EOP"}],attrs:{type:"primary",size:o.btnsize,icon:"el-icon-edit-outline",plain:""},on:{click:function(e){o.doAction("import")}}},[o._v("批量导入")]),o._v(" "),s("el-button",{staticClass:"table_setup",attrs:{type:"primary",size:o.btnsize,icon:"el-icon-setting",plain:""},on:{click:o.setTable}},[o._v("表格设置")])],1),o._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{key:o.tablekey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:o.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":o.clickDetails,"selection-change":o.getSelection}},[s("el-table-column",{attrs:{fixed:"",sortable:"",type:"selection",width:"50"}}),o._v(" "),o._l(o.tableColumn,function(i){return[i.ispic?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width},scopedSlots:o._u([{key:"default",fn:function(e){return[e.row[i.prop]?s("el-button",{directives:[{name:"showPicture",rawName:"v-showPicture"}],attrs:{size:"mini",type:"text",icon:"el-icon-picture-outline",imgurl:e.row[i.prop]}},[o._v("预览("+o._s(e.row[i.prop].split(",").length)+")")]):o._e()]}}])}):i.slot?s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,width:i.width||""},scopedSlots:o._u([{key:"default",fn:function(t){return[i.click?s("span",{staticClass:"clickitem",domProps:{innerHTML:o._s(i.slot(t))},on:{click:function(e){e.stopPropagation(),i.click(t)}}}):s("span",{domProps:{innerHTML:o._s(i.slot(t))}})]}}])}):s("el-table-column",{key:i.id,attrs:{fixed:i.fixed,sortable:"",label:i.label,prop:i.prop,width:i.width}})]})],2)],1),o._v(" "),s("div",{staticClass:"info_tab_footer"},[o._v("共计:"+o._s(o.total)+" "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{total:o.total},on:{change:o.handlePageChange}})],1)])]),o._v(" "),s("AddCustomer",{attrs:{issender:!0,isModify:o.isModify,info:o.selectInfo,orgid:o.orgid,popVisible:o.AddCustomerVisible},on:{"update:popVisible":function(e){o.AddCustomerVisible=e},close:o.closeAddCustomer,success:o.fetchData}}),o._v(" "),s("TableSetup",{attrs:{issender:!0,popVisible:o.setupTableVisible,columns:o.tableColumn},on:{close:o.closeSetupTable,success:o.setColumn}}),o._v(" "),s("ImportDialog",{attrs:{popVisible:o.importDialogVisible,info:"sender"},on:{close:function(e){o.importDialogVisible=!1},success:o.fetchData}})],1)},staticRenderFns:[]};t.a=o},"j///":function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"tms_dialog tms_dialog_import",attrs:{title:t.titlePop,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe,width:"500px"},on:{"update:visible":function(e){t.isShow=e}}},[t.isInitDialog?i("el-row",[i("el-col",{attrs:{span:12}},[i("el-upload",{attrs:{"show-file-list":!1,"on-change":t.handleChange,action:"","http-request":t.uploadHandleFile}},[i("div",{staticClass:"bigIconBtn_primary",on:{click:function(e){t.doAction("import")}}},[i("i",{staticClass:"icon-export-btn"}),t._v(" "),i("br"),t._v(" "),i("span",[t._v("上传文件")])])])],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("div",{staticClass:"bigIconBtn_success",on:{click:function(e){t.doAction("download")}}},[i("i",{staticClass:"icon-import-btn"}),t._v(" "),i("br"),t._v(" "),i("span",[t._v("下载标准模板")])])]),t._v(" "),i("el-col",{attrs:{span:22,offset:2}},[t.isSubjectInfo?i("ul",{staticClass:"importTips",attrs:{type:"1"}},[i("li",[t._v("1、导入前，需要先下载标准版，按照标准模板后再上传。")]),t._v(" "),i("li",[t._v("2、每次最多能导入1000条，超过1000条，只导入前1000条。")])]):i("ul",{staticClass:"importTips",attrs:{type:"1"}},[i("li",[t._v("1、导入前，需要先下载标准版，按照标准模板后再上传。")]),t._v(" "),i("li",[t._v("2、发货人，手机号码必须填写，且不能与已有客户重复。")]),t._v(" "),i("li",[t._v("3、导入所属网点默认为本网点。")]),t._v(" "),i("li",[t._v("4、每次最多能导入1000条，超过1000条，只导入前1000条。")])])])],1):i("div",{staticClass:"import_result"},[t.isProgress?i("el-progress",{attrs:{"text-inside":!0,"stroke-width":15,percentage:t.percentage,status:t.uploadStatus&&40<t.percentages?"success":"exception"}}):i("p",[t._v(t._s(t.resMessage.resultInfo))]),t._v(" "),i("el-table",{key:t.tableKey,ref:"multipleTable",class:11<(t.resMessage.failInfoList&&t.resMessage.failInfoList.length)?"failinScroll":"",staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:t.resMessage.failInfoList,stripe:"",border:"","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}}},[i("el-table-column",{attrs:{sortable:"",type:"index",width:"60",label:"序号"}}),t._v(" "),i("el-table-column",{attrs:{prop:"failExcelNum",width:"130",label:"失败行"}}),t._v(" "),i("el-table-column",{attrs:{prop:"failInfo",label:"失败字段"}})],1)],1)],1)},staticRenderFns:[]};t.a=o},jtQt:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("5aUT"),s=i("2R4k"),a=i("VU/8")(o.a,s.a,null,null,null);t.default=a.exports},jxZV:function(e,t,i){"use strict";var o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload-container",class:{uploadlist:t.showFileList}},[i("el-upload",{staticClass:"image-uploader",attrs:{data:t.upload,action:t.uploadUrl,multiple:!1,drag:!t.showFileList,"show-file-list":t.showFileList,"file-list":t.filelist,limit:t.limit,"before-upload":t.beforeUpload,"list-type":t.listtype,"on-exceed":t.onexceed,disabled:t.disabled,"on-remove":t.handleRemove,"on-error":t.handleError,"http-request":t.handleUpload,"on-success":t.handleImageScucess}},[t._t("content",[t.showtc?i("div",{staticClass:"twocodebox",on:{click:function(e){e.stopPropagation(),e.preventDefault()},mouseover:function(e){t.showtwocdetip=!0},mouseout:function(e){t.showtwocdetip=!1}}},[i("div",[i("img",{attrs:{src:t.twocodeurl,alt:""}})]),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"},on:{click:function(e){t.showtc=!1}}},[t._v("本地上传")]),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"},on:{click:t.changeTwocode}},[t._v("更换二维码")])],1):i("div",[t.title&&!t.showFileList?i("div",{staticClass:"upload__title"},[t._v(t._s(t.title))]):t._e(),t._v(" "),i("el-button",{attrs:{size:t.size,type:"primary"}},[t._v("点击上传")]),t._v(" "),t.twocode?i("el-button",{staticClass:"uploadtwocode",attrs:{size:t.size,type:"primary"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.showtc=!0}}},[t._v("二维码上传")]):t._e(),t._v(" "),t.showFileList?t._e():i("div",{staticClass:"el-upload__text"},[t._v("将文件拖拽到此区域")]),t._v(" "),t.tip?i("div",{staticClass:"upload__tip"},[t._v(t._s(t.tip))]):t._e()],1)])],2),t._v(" "),t.imageUrl&&!t.showFileList?i("div",{staticClass:"image-preview"},[i("div",{staticClass:"image-preview-wrapper"},[i("img",{attrs:{src:t.imageUrl}}),t._v(" "),i("div",{staticClass:"image-preview-action"},[i("i",{staticClass:"el-icon-delete",on:{click:function(e){t.rmImage(t.imageUrl)}}})])])]):t._e()],1)},staticRenderFns:[]};t.a=o},nveU:function(e,t){},xU5l:function(e,t){}});