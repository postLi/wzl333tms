webpackJsonp([181],{"/vQs":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("jpWh"),a=s("iRzY"),i=s("VU/8")(r.a,a.a,null,null,null);t.default=i.exports},"8UOW":function(e,t,s){"use strict";var r=s("us2a"),a=s("fyBF");var i=function(e){s("Qhr/")},o=s("VU/8")(r.a,a.a,i,null,null);t.a=o.exports},"Qhr/":function(e,t){},SjYS:function(e,t,s){"use strict";var r=s("seR9"),a=s("msh6");var i=function(e){s("nl9Y")},o=s("VU/8")(r.a,a.a,i,null,null);t.a=o.exports},fyBF:function(e,t,s){"use strict";var r={render:function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("div",{staticClass:"searchAll_lyy"},[r("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":s.querySearchAsync,"popper-class":"zdycx-pop",loading:s.loading},on:{change:s.handleSelect,focus:s.initdata},model:{value:s.datalist,callback:function(e){s.datalist=e},expression:"datalist"}},s._l(s.options4,function(t,e){return r("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[s._v("\r\n        "+s._s(t.queryKey)+" "),r("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),s.deleteItem(t.id)}}})])})),s._v(" "),r("el-button",{attrs:{plain:""},on:{click:s.Custom}},[s._v("保存自定义")])],1),s._v(" "),r("addSave",{attrs:{searchObj:s.searchObj,popVisible:s.popVisible},on:{close:s.closeAddDot,success:s.fetchAllloadAll}})],1)},staticRenderFns:[]};t.a=r},iRzY:function(e,t,s){"use strict";var r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-form",{staticClass:"staff_searchinfo feeReceivableSearch clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",model:t.searchForm,"label-width":"70px"}},[s("div",{staticClass:"staff_searchinfo--input"},[s("el-form-item",{attrs:{label:"开单时间"}},[s("div",{staticClass:"block"},[s("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","picker-options":t.pickerOptions2,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),t.filter?s("el-form-item",{attrs:{label:"结算网点"}},[s("select-tree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.ascriptionOrgId,callback:function(e){t.$set(t.searchForm,"ascriptionOrgId",e)},expression:"searchForm.ascriptionOrgId"}})],1):t._e(),t._v(" "),t.isShow?s("el-form-item",{attrs:{label:"开单网点"}},[s("select-tree",{model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1):t._e(),t._v(" "),s("el-form-item",{attrs:{label:"发货人"}},[s("el-input",{attrs:{clearable:""},model:{value:t.searchForm.senderName,callback:function(e){t.$set(t.searchForm,"senderName",e)},expression:"searchForm.senderName"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"发货方"}},[s("el-input",{attrs:{clearable:""},model:{value:t.searchForm.senderCompanyName,callback:function(e){t.$set(t.searchForm,"senderCompanyName",e)},expression:"searchForm.senderCompanyName"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"出发城市"}},[s("el-input",{attrs:{clearable:""},model:{value:t.searchForm.shipFromCityCode,callback:function(e){t.$set(t.searchForm,"shipFromCityCode",e)},expression:"searchForm.shipFromCityCode"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"到达城市"}},[s("el-input",{attrs:{clearable:""},model:{value:t.searchForm.shipToCityCode,callback:function(e){t.$set(t.searchForm,"shipToCityCode",e)},expression:"searchForm.shipToCityCode"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"运单号"}},[s("el-input",{attrs:{clearable:""},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"结算状态"}},[s("select-type",{attrs:{type:"count_status"},model:{value:t.searchForm.status,callback:function(e){t.$set(t.searchForm,"status",e)},expression:"searchForm.status"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"签收状态",prop:"signStatus"}},[s("selectType",{attrs:{type:"sign_status"},model:{value:t.searchForm.signStatus,callback:function(e){t.$set(t.searchForm,"signStatus",e)},expression:"searchForm.signStatus"}},[s("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),s("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),s("el-form-item",{staticClass:"staff_searchinfo--btn"},[s("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),s("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},jpWh:function(e,t,s){"use strict";var r=s("woOf"),a=s.n(r),i=s("o9X6"),o=s("9UCZ"),n=s("0xDb"),l=s("8UOW");t.a={name:"handaccount-manage-search",components:{SelectTree:i.a,SelectType:o.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},filter:{type:Boolean,default:!1},isShow:{type:Boolean,default:!0}},data:function(){return{searchAll:"1",searchCreatTime:[],searchObjs:{},defaultTime:[Object(n.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(n.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{shipFromOrgid:"",endTime:"",startTime:"",senderName:"",senderCompanyName:"",shipFromCityCode:"",shipToCityCode:"",shipSn:"",ascriptionOrgId:"",status:"",signStatus:""},pickerOptions2:{shortcuts:n.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.shipFromOrgid=e},searchCreatTime:function(e){e&&(this.$set(this.searchObjs,"startTime",Object(n.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(n.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=a()({},e),this.searchCreatTime&&this.searchCreatTime[0]&&(this.searchObjs.startTime=this.searchCreatTime[0]+" 00:00:00",this.searchObjs.endTime=this.searchCreatTime[1]+" 23:59:59")},deep:!0}},mounted:function(){var e=this;this.searchCreatTime=this.defaultTime,this.searchForm.ascriptionOrgId=this.otherinfo.orgid,this.onSubmit(),this.eventBus.$on("updateAccountsReceivableList",function(){e.onSubmit()})},methods:{getDataObj:function(e){this.searchCreatTime=[e.startTime,e.endTime],this.searchForm=a()({},e),this.$emit("change",e)},onSubmit:function(){var e=a()({},this.searchForm);this.searchCreatTime&&this.searchCreatTime[0]&&(e.startTime=this.searchCreatTime[0]+" 00:00:00",e.endTime=this.searchCreatTime[1]+" 23:59:59"),this.$emit("change",e)},clearForm:function(){var e=this;this.searchForm=this.$options.data().searchForm,this.searchCreatTime=this.defaultTime,this.searchForm.ascriptionOrgId=this.otherinfo.orgid,this.searchAll="1",setTimeout(function(){e.searchAll=""},50)}}}},msh6:function(e,t,s){"use strict";var r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[s("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),s("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=r},nl9Y:function(e,t){},seR9:function(e,t,s){"use strict";var r=s("mvHQ"),a=s.n(r),i=s("t5DY"),o=s("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var s=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;s.loading=!0,s.form.queryContent=a()(s.searchObj);var t=Object(o.objectMerge2)({},s.form);console.log("addSave_data",t),Object(i.m)(t).then(function(e){s.loading=!1,s.$message({message:"保存成功~",type:"success"}),s.closeMe(),s.$emit("success")}).catch(function(e){s.loading=!1,s.$message.warning(e.text)})})}}}},us2a:function(e,t,s){"use strict";var r=s("t5DY"),a=s("SjYS");t.a={components:{addSave:a.a},props:{searchObj:{type:[Object,Array]},value:[String,Number]},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(r.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.$route.meta.code,Object(r.l)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var s=this.dataset,r=e?s.filter(this.createStateFilter(e)):s;t(this.options4=r)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var s=e[0].queryContent,r=JSON.parse(s);this.$emit("change",JSON.parse(s.replace(/'/g,'"'))),this.$emit("dataObj",r)}}}}}});