webpackJsonp([198],{"7C/P":function(e,t,s){"use strict";var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[s("div",{staticClass:"staff_searchinfo--input"},[s("el-form-item",{attrs:{label:"开单时间"}},[s("div",{staticClass:"block"},[s("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),s("el-form-item",{attrs:{label:t.title+"状态",prop:"thestatus"}},[s("selectType",{attrs:{type:t.type},model:{value:t.thestatus,callback:function(e){t.thestatus=e},expression:"thestatus"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"运单号"}},[s("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"发站"}},[s("el-input",{attrs:{maxlength:20,clearable:"","auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"到站"}},[s("el-input",{attrs:{clearable:"",maxlength:20,"auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"发货人"}},[s("el-input",{attrs:{clearable:"",maxlength:15,"auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.senderName,callback:function(e){t.$set(t.searchForm,"senderName",e)},expression:"searchForm.senderName"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"收货人"}},[s("el-input",{attrs:{clearable:"",maxlength:15,"auto-complete":"off"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.receiverName,callback:function(e){t.$set(t.searchForm,"receiverName",e)},expression:"searchForm.receiverName"}})],1),t._v(" "),s("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj}})],1),t._v(" "),s("el-form-item",{staticClass:"staff_searchinfo--btn"},[s("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),s("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},"8UOW":function(e,t,s){"use strict";var i=s("us2a"),r=s("fyBF");var a=function(e){s("Qhr/")},o=s("VU/8")(i.a,r.a,a,null,null);t.a=o.exports},"K4+e":function(e,t,s){"use strict";var i=s("woOf"),r=s.n(i),a=s("E4LH"),o=s("o9X6"),n=s("9UCZ"),c=s("66wn"),l=s("0xDb"),u=s("8UOW");t.a={components:{SelectTree:o.a,SelectCity:c.a,SelectType:n.a,searchAll:u.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},type:String,title:String,status:String,issender:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(l.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(l.parseTime)(new Date,"{y}-{m}-{d}")],thestatus:"",searchForm:{shipSn:"",shipFromCityName:"",shipToCityName:"",senderName:"",receiverName:"",startTime:"",endTime:""},rules:{shipSn:[{required:!0,trigger:"blur",validator:function(e,t,s){""!==t&&null!==t&&t&&void 0!==t?a.a.ONLY_NUMBER_AND_LETTER.test(t)?s():s(new Error("只能输字母和数字")):s(new Error("请输入运单号"))}}]},pickerOptions2:{shortcuts:l.pickerOptions2},searchObjs:{}}},watch:{orgid:function(e){this.searchForm.orgid=e},type:{handler:function(e){console.log(e),"funds_rec_status"===e&&(this.thestatus=254),"funds_remittance_status"===e&&(this.thestatus=257),"funds_account_status"===e&&(this.thestatus=260),"funds_giveout_status"===e&&(this.thestatus=263)},immediate:!0},searchCreatTime:function(e){e&&(this.$set(this.searchObjs,"startTime",Object(l.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(l.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=r()({},e),this.searchObjs[this.status]=this.thestatus,this.searchCreatTime&&(this.$set(this.searchObjs,"startTime",Object(l.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(l.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59"))},deep:!0}},mounted:function(){this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getDataObj:function(e){this.type=this.status,this.thestatus=e[this.status],this.searchForm[this.status]=e[this.status],this.searchCreatTime=[e.startTime,e.endTime],this.searchForm=r()({},e),this.$emit("change",e)},getOrgid:function(e){this.searchForm.orgid=e},onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(l.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(l.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"",this.searchForm[this.status]=this.thestatus;var e=r()({},this.searchForm);this.$emit("change",e)},clearForm:function(){this.searchForm.shipSn="",this.searchForm.receiverName="",this.searchForm.senderName="",this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.thestatus="",this.searchCreatTime=this.defaultTime}}}},"Qhr/":function(e,t){},SjYS:function(e,t,s){"use strict";var i=s("seR9"),r=s("msh6");var a=function(e){s("nl9Y")},o=s("VU/8")(i.a,r.a,a,null,null);t.a=o.exports},ZhWi:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("K4+e"),r=s("7C/P"),a=s("VU/8")(i.a,r.a,null,null,null);t.default=a.exports},fyBF:function(e,t,s){"use strict";var i={render:function(){var s=this,e=s.$createElement,i=s._self._c||e;return s.hasCode?i("div",{staticClass:"searchAll_lyy"},[i("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":s.querySearchAsync,"popper-class":"zdycx-pop",loading:s.loading},on:{change:s.handleSelect,focus:s.initdata},model:{value:s.datalist,callback:function(e){s.datalist=e},expression:"datalist"}},s._l(s.options4,function(t,e){return i("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[s._v("\r\n        "+s._s(t.queryKey)+" "),i("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),s.deleteItem(t.id)}}})])})),s._v(" "),i("el-button",{attrs:{plain:""},on:{click:s.Custom}},[s._v("保存自定义")])],1),s._v(" "),i("addSave",{attrs:{code:s.hasCode,searchObj:s.searchObj,popVisible:s.popVisible},on:{close:s.closeAddDot,success:s.fetchAllloadAll}})],1):s._e()},staticRenderFns:[]};t.a=i},msh6:function(e,t,s){"use strict";var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[s("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),s("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=i},nl9Y:function(e,t){},seR9:function(e,t,s){"use strict";var i=s("mvHQ"),r=s.n(i),a=s("t5DY"),o=s("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var s=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;s.loading=!0,s.form.queryContent=r()(s.searchObj);var t=Object(o.objectMerge2)({},s.form);console.log("addSave_data",t),Object(a.p)(t).then(function(e){s.loading=!1,s.$message({message:"保存成功~",type:"success"}),s.closeMe(),s.$emit("success")}).catch(function(e){s.loading=!1,s.$message.warning(e.text)})})}}}},us2a:function(e,t,s){"use strict";var i=s("t5DY"),r=s("SjYS");t.a={components:{addSave:r.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(i.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(i.o)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var s=this.dataset,i=e?s.filter(this.createStateFilter(e)):s;t(this.options4=i)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var s=e[0].queryContent,i=JSON.parse(s);this.$emit("change",JSON.parse(s.replace(/'/g,'"'))),this.$emit("dataObj",i)}}}}}});