webpackJsonp([170],{"3yB5":function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"发车时间"}},[r("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"短驳网点",prop:"orgid"}},[r("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"短驳批次",prop:"batchNo"}},[r("el-input",{attrs:{placeholder:"请输入短驳批次"},model:{value:t.searchForm.batchNo,callback:function(e){t.$set(t.searchForm,"batchNo",e)},expression:"searchForm.batchNo"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"车牌号",prop:"truckIdNumber"}},[r("el-input",{attrs:{placeholder:"请输入车牌号"},model:{value:t.searchForm.truckIdNumber,callback:function(e){t.$set(t.searchForm,"truckIdNumber",e)},expression:"searchForm.truckIdNumber"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"司机"}},[r("el-input",{attrs:{clearable:"",maxlength:10,placeholder:"司机名称"},model:{value:t.searchForm.dirverName,callback:function(e){t.$set(t.searchForm,"dirverName",e)},expression:"searchForm.dirverName"}})],1),t._v(" "),r("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},"8UOW":function(e,t,r){"use strict";var i=r("us2a"),s=r("fyBF");var a=function(e){r("Qhr/")},o=r("VU/8")(i.a,s.a,a,null,null);t.a=o.exports},"IOW+":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("x7Sc"),s=r("3yB5"),a=r("VU/8")(i.a,s.a,null,null,null);t.default=a.exports},"Qhr/":function(e,t){},SjYS:function(e,t,r){"use strict";var i=r("seR9"),s=r("msh6");var a=function(e){r("nl9Y")},o=r("VU/8")(i.a,s.a,a,null,null);t.a=o.exports},fyBF:function(e,t,r){"use strict";var i={render:function(){var r=this,e=r.$createElement,i=r._self._c||e;return r.hasCode?i("div",{staticClass:"searchAll_lyy"},[i("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":r.querySearchAsync,"popper-class":"zdycx-pop",loading:r.loading},on:{change:r.handleSelect,focus:r.initdata},model:{value:r.datalist,callback:function(e){r.datalist=e},expression:"datalist"}},r._l(r.options4,function(t,e){return i("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[r._v("\r\n        "+r._s(t.queryKey)+" "),i("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),r.deleteItem(t)}}})])})),r._v(" "),i("el-button",{attrs:{plain:""},on:{click:r.Custom}},[r._v("保存自定义")])],1),r._v(" "),i("addSave",{attrs:{code:r.hasCode,searchObj:r.searchObj,popVisible:r.popVisible},on:{close:r.closeAddDot,success:r.fetchAllloadAll}})],1):r._e()},staticRenderFns:[]};t.a=i},msh6:function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[r("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),r("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=i},nl9Y:function(e,t){},seR9:function(e,t,r){"use strict";var i=r("mvHQ"),s=r.n(i),a=r("t5DY"),o=r("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}},code:{type:String,default:""}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.code||this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var r=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;r.loading=!0,r.form.queryContent=s()(r.searchObj);var t=Object(o.objectMerge2)({},r.form);console.log("addSave_data",t),Object(a.q)(t).then(function(e){r.loading=!1,r.$message({message:"保存成功~",type:"success"}),r.closeMe(),r.$emit("success")}).catch(function(e){r.loading=!1,r.$message.warning(e.text)})})}}}},us2a:function(e,t,r){"use strict";var i=r("t5DY"),s=r("SjYS");t.a={components:{addSave:s.a},props:{searchObj:{type:[Object,Array]},value:[String,Number],code:{type:String,default:""}},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},computed:{hasCode:function(){return this.code||this.$route.meta.code||""}},watch:{value:function(e){""===e&&(this.datalist="")},searchObj:{handler:function(e,t){},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(i.a)(e.id).then(function(e){t.fetchAllloadAll(),t.datalist&&(t.datalist="")}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.code||this.$route.meta.code,Object(i.p)(this.querySearch).then(function(e){t.dataset=e.list||[],t.options4=e.list||[]})},querySearchAsync:function(e,t){var r=this.dataset,i=e?r.filter(this.createStateFilter(e)):r;t(this.options4=i)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var r=e[0].queryContent,i=JSON.parse(r);this.$emit("change",JSON.parse(r.replace(/'/g,'"'))),this.$emit("dataObj",i)}}}}},x7Sc:function(e,t,r){"use strict";var i=r("woOf"),s=r.n(i),a=r("E4LH"),o=r("o9X6"),n=r("pAQG"),c=r("0xDb"),l=r("8UOW");t.a={components:{SelectTree:o.a,querySelect:n.a,searchAll:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchAll:"1",searchObjs:{},searchForm:{orgid:"",ascriptionOrgid:"",status:"NOSETTLEMENT,PARTSETTLEMENT,ALLSETTLEMENT",truckIdNumber:"",dirverName:""},rules:{shipSn:[{validator:function(e,t,r){var i=a.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?i.test(t)?r():r(new Error("请输入最多15位数字")):r()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],pickerOptions:{shortcuts:c.pickerOptions2}}},watch:{searchTime:function(e){e&&(this.$set(this.searchObjs,"departureStartTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"departureEndTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},orgid:function(e){this.searchForm.orgId=e},searchForm:{handler:function(e,t){this.searchObjs=s()({},e),this.searchTime&&(this.$set(this.searchObjs,"departureStartTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"departureEndTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},deep:!0}},mounted:function(){this.searchForm.orgid=this.otherinfo.orgid,this.onSubmit()},methods:{getDataObj:function(e){this.searchTime=[e.departureStartTime,e.departureEndTime],this.searchForm=s()({},e),this.$emit("change",e)},onSubmit:function(){var e=s()({},this.searchForm);this.searchTime&&(this.$set(e,"departureStartTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"departureEndTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},clearForm:function(e){var t=this;this.$nextTick(function(){t.searchForm=t.$options.data().searchForm,t.searchTime=t.$options.data().searchTime,t.$refs[e].resetFields(),t.searchForm.orgid=t.otherinfo.orgid,t.searchForm.ascriptionOrgid=t.otherinfo.orgid,t.searchAll="1",setTimeout(function(){t.searchAll=""},50)})}}}}});