webpackJsonp([177],{"0X1M":function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),s=i("o9X6"),o=i("9UCZ"),n=i("0xDb"),l=i("66wn"),c=i("8UOW");t.a={components:{SelectTree:s.a,SelectType:o.a,SelectCity:l.a,searchAll:c.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],searchObjs:{},defaultTime:[Object(n.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(n.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{shipFromOrgid:"",shipSn:"",statusName:"NOSETTLEMENT",shipFromCityName:"",shipToCityName:""},rules:{mobile:[{validator:function(e,t,i){i()},trigger:"change"}]},pickerOptions2:{shortcuts:n.pickerOptions2}}},watch:{searchCreatTime:function(e){e&&(this.$set(this.searchObjs,"createTimeStart",Object(n.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"createTimeEnd",Object(n.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59"))},orgid:function(e){this.searchForm.shipFromOrgid=e},searchForm:{handler:function(e,t){this.searchObjs=a()({},e),this.searchCreatTime&&(this.$set(this.searchObjs,"createTimeStart",Object(n.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"createTimeEnd",Object(n.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59"))},deep:!0}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getDataObj:function(e){this.searchCreatTime=[e.createTimeStart,e.createTimeEnd],this.searchForm=a()({},e),this.$emit("change",e)},getOrgid:function(e){this.searchForm.orgId=e},onSubmit:function(){this.searchForm.createTimeStart=this.searchCreatTime?Object(n.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00":"",this.searchForm.createTimeEnd=this.searchCreatTime?Object(n.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59":"";var e=a()({},this.searchForm);this.$emit("change",e)},clearForm:function(){this.searchForm.shipFromOrgid=this.orgid,this.searchForm.shipSn="",this.searchForm.statusName="",this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.searchCreatTime=this.defaultTime}}}},"4/DS":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("0X1M"),a=i("XDMx"),s=i("VU/8")(r.a,a.a,null,null,null);t.default=s.exports},"8UOW":function(e,t,i){"use strict";var r=i("us2a"),a=i("fyBF");var s=function(e){i("Qhr/")},o=i("VU/8")(r.a,a.a,s,null,null);t.a=o.exports},"Qhr/":function(e,t){},SjYS:function(e,t,i){"use strict";var r=i("seR9"),a=i("msh6");var s=function(e){i("nl9Y")},o=i("VU/8")(r.a,a.a,s,null,null);t.a=o.exports},XDMx:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo unusual_search clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"开单网点"}},[i("SelectTree",{attrs:{type:"org_id",orgid:t.otherinfo.orgid},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"结算状态:",prop:"statusName"}},[i("el-select",{model:{value:t.searchForm.statusName,callback:function(e){t.$set(t.searchForm,"statusName",e)},expression:"searchForm.statusName"}},[i("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),i("el-option",{attrs:{label:"已结算",value:"ALLSETTLEMENT"}}),t._v(" "),i("el-option",{attrs:{label:"部分结算",value:"PARTSETTLEMENT"}}),t._v(" "),i("el-option",{attrs:{label:"未结算",value:"NOSETTLEMENT"}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"运单号"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"出发城市"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到达城市"}},[i("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},fyBF:function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{staticClass:"searchAll_lyy"},[r("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return r("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),r("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t.id)}}})])})),i._v(" "),r("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),r("addSave",{attrs:{searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1)},staticRenderFns:[]};t.a=r},msh6:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=r},nl9Y:function(e,t){},seR9:function(e,t,i){"use strict";var r=i("mvHQ"),a=i.n(r),s=i("t5DY"),o=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=a()(i.searchObj);var t=Object(o.objectMerge2)({},i.form);console.log("addSave_data",t),Object(s.m)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},us2a:function(e,t,i){"use strict";var r=i("t5DY"),a=i("SjYS");t.a={components:{addSave:a.a},props:{searchObj:{type:[Object,Array]},value:[String,Number]},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(r.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.$route.meta.code,Object(r.l)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var i=this.dataset,r=e?i.filter(this.createStateFilter(e)):i;t(this.options4=r)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,r=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",r)}}}}}});