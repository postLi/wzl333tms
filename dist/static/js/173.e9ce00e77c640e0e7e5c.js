webpackJsonp([173],{"8UOW":function(e,t,i){"use strict";var r=i("us2a"),s=i("fyBF");var a=function(e){i("Qhr/")},o=i("VU/8")(r.a,s.a,a,null,null);t.a=o.exports},Ln7j:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("VY1p"),s=i("b/n2"),a=i("VU/8")(r.a,s.a,null,null,null);t.default=a.exports},"Qhr/":function(e,t){},SjYS:function(e,t,i){"use strict";var r=i("seR9"),s=i("msh6");var a=function(e){i("nl9Y")},o=i("VU/8")(r.a,s.a,a,null,null);t.a=o.exports},VY1p:function(e,t,i){"use strict";var r=i("woOf"),s=i.n(r),a=i("0xDb"),o=i("o9X6"),n=i("9UCZ"),l=i("8UOW");t.a={name:"order-manage-search",components:{SelectTree:o.a,SelectType:n.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},data:function(){return{searchCreatTime:[],defaultTime:[Object(a.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(a.parseTime)(new Date,"{y}-{m}-{d}")],searchForm:{orgid:"",shipSn:"",shipFormCityName:""},rules:{mobile:[{}]},pickerOptions2:{shortcuts:a.pickerOptions2},searchObjs:{},searchAll:"1"}},watch:{orgid:function(e){this.searchForm.orgid=e},searchForm:{handler:function(e,t){this.searchObjs=s()({},e)},deep:!0}},mounted:function(){this.searchForm.orgid=this.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{getDataObj:function(e){this.searchForm=s()({},e),this.$emit("change",e)},onSubmit:function(){var e={};e.shipFromOrgid=this.searchForm.orgid,e.shipFormCityName=this.searchForm.shipFormCityName,e.startTime=this.searchCreatTime?this.searchCreatTime[0]+" 00:00:00":"",e.endTime=this.searchCreatTime?this.searchCreatTime[1]+" 23:59:59":"",e.shipSn=this.searchForm.shipSn,this.searchForm.startTime=e.startTime,this.searchForm.endTime=e.endTime,this.$emit("change",e)},clearForm:function(){var e=this;this.searchCreatTime=this.defaultTime,this.searchForm.orgid=this.orgid,this.searchForm.shipFormCityName="",this.searchForm.startTime="",this.searchForm.endTime="",this.searchForm.shipSn="",this.searchAll="1",setTimeout(function(){e.searchAll=""},66)}}}},"b/n2":function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right","label-width":"70px",rules:t.rules,model:t.searchForm}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("div",{staticClass:"block"},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right",size:t.btnsize,"value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),i("el-form-item",{attrs:{label:"开单网点:"}},[i("select-tree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),i("el-form-item",{staticClass:"searchinfo--order",attrs:{label:"运单号"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),i("el-form-item",{staticClass:"searchinfo--order",attrs:{label:"出发城市"}},[i("el-input",{attrs:{maxlength:"15",clearable:""},on:{change:t.onSubmit},model:{value:t.searchForm.shipFormCityName,callback:function(e){t.$set(t.searchForm,"shipFormCityName",e)},expression:"searchForm.shipFormCityName"}})],1),t._v(" "),i("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},fyBF:function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{staticClass:"searchAll_lyy"},[r("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":i.querySearchAsync,"popper-class":"zdycx-pop",loading:i.loading},on:{change:i.handleSelect,focus:i.initdata},model:{value:i.datalist,callback:function(e){i.datalist=e},expression:"datalist"}},i._l(i.options4,function(t,e){return r("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[i._v("\r\n        "+i._s(t.queryKey)+" "),r("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),i.deleteItem(t.id)}}})])})),i._v(" "),r("el-button",{attrs:{plain:""},on:{click:i.Custom}},[i._v("保存自定义")])],1),i._v(" "),r("addSave",{attrs:{searchObj:i.searchObj,popVisible:i.popVisible},on:{close:i.closeAddDot,success:i.fetchAllloadAll}})],1)},staticRenderFns:[]};t.a=r},msh6:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[i("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),i("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=r},nl9Y:function(e,t){},seR9:function(e,t,i){"use strict";var r=i("mvHQ"),s=i.n(r),a=i("t5DY"),o=i("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;i.loading=!0,i.form.queryContent=s()(i.searchObj);var t=Object(o.objectMerge2)({},i.form);console.log("addSave_data",t),Object(a.m)(t).then(function(e){i.loading=!1,i.$message({message:"保存成功~",type:"success"}),i.closeMe(),i.$emit("success")}).catch(function(e){i.loading=!1,i.$message.warning(e.text)})})}}}},us2a:function(e,t,i){"use strict";var r=i("t5DY"),s=i("SjYS");t.a={components:{addSave:s.a},props:{searchObj:{type:[Object,Array]},value:[String,Number]},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(r.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.$route.meta.code,Object(r.l)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var i=this.dataset,r=e?i.filter(this.createStateFilter(e)):i;t(this.options4=r)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var i=e[0].queryContent,r=JSON.parse(i);this.$emit("change",JSON.parse(i.replace(/'/g,'"'))),this.$emit("dataObj",r)}}}}}});
//# sourceMappingURL=173.e9ce00e77c640e0e7e5c.js.map