webpackJsonp([194],{"8UOW":function(e,t,r){"use strict";var s=r("us2a"),i=r("fyBF");var a=function(e){r("Qhr/")},o=r("VU/8")(s.a,i.a,a,null,null);t.a=o.exports},"Qhr/":function(e,t){},SjYS:function(e,t,r){"use strict";var s=r("seR9"),i=r("msh6");var a=function(e){r("nl9Y")},o=r("VU/8")(s.a,i.a,a,null,null);t.a=o.exports},WE62:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("xK1H"),i=r("wLV8"),a=r("VU/8")(s.a,i.a,null,null,null);t.default=a.exports},fyBF:function(e,t,r){"use strict";var s={render:function(){var r=this,e=r.$createElement,s=r._self._c||e;return s("div",{staticClass:"searchAll_lyy"},[s("el-form-item",{staticClass:"zdycx",attrs:{label:"自定义查询"}},[s("el-select",{attrs:{filterable:"",placeholder:"请选择","filter-method":r.querySearchAsync,"popper-class":"zdycx-pop",loading:r.loading},on:{change:r.handleSelect,focus:r.initdata},model:{value:r.datalist,callback:function(e){r.datalist=e},expression:"datalist"}},r._l(r.options4,function(t,e){return s("el-option",{key:e,attrs:{label:t.queryKey,value:t.id}},[r._v("\r\n        "+r._s(t.queryKey)+" "),s("i",{staticClass:"el-icon-circle-close-outline",on:{click:function(e){e.stopPropagation(),e.preventDefault(),r.deleteItem(t.id)}}})])})),r._v(" "),s("el-button",{attrs:{plain:""},on:{click:r.Custom}},[r._v("保存自定义")])],1),r._v(" "),s("addSave",{attrs:{searchObj:r.searchObj,popVisible:r.popVisible},on:{close:r.closeAddDot,success:r.fetchAllloadAll}})],1)},staticRenderFns:[]};t.a=s},msh6:function(e,t,r){"use strict";var s={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{staticClass:"wzl_settleLogSave",attrs:{title:t.popTitle,visible:t.isShow,"close-on-click-modal":!1,"before-close":t.closeMe},on:{close:t.closeMe,"update:visible":function(e){t.isShow=e}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.form,rules:t.rules,"label-width":t.formLabelWidth,inline:!0,"label-position":"right",size:"mini"}},[r("el-form-item",{attrs:{label:"名称：",prop:"queryKey"}},[r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.form.queryKey,expression:"form.queryKey",modifiers:{trim:!0}}],attrs:{maxlength:20,placeholder:"请定义名称"},domProps:{value:t.form.queryKey},on:{input:function(e){e.target.composing||t.$set(t.form,"queryKey",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})])],1),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",disabled:0===t.form.queryKey.length},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("确 定")]),t._v(" "),r("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],1)},staticRenderFns:[]};t.a=s},nl9Y:function(e,t){},seR9:function(e,t,r){"use strict";var s=r("mvHQ"),i=r.n(s),a=r("t5DY"),o=r("0xDb");t.a={computed:{isShow:{get:function(){return this.popVisible},set:function(){}}},components:{},props:{popVisible:{type:Boolean,default:!1},dotInfo:[Object,Array],searchQuery:[Object,Array],isDepMain:{type:Boolean,default:!1},createrId:[Number,String],isModify:{type:Boolean,default:!1},isAccept:{type:Boolean,default:!1},proptitle:String,searchObj:{type:[Array,Object],default:function(){}}},data:function(){return{form:{userId:"",orgId:"",menuCode:"",queryKey:"",queryContent:""},searchCreatTime:+new Date,pickOption2:"",formLabelWidth:"75px",tooltip:!1,rules:{},queryKey:"",checked1:!0,popTitle:"自定义标签",loading:!1,type:""}},mounted:function(){},watch:{orgid:function(e){this.form.orgid=e},popVisible:function(e){e&&(this.form.userId=this.otherinfo.userId,this.form.orgId=this.otherinfo.orgid,this.form.menuCode=this.$route.meta.code)}},methods:{reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},submitForm:function(e){var r=this;this.loading||this.$refs[e].validate(function(e){if(!e)return!1;r.loading=!0,r.form.queryContent=i()(r.searchObj);var t=Object(o.objectMerge2)({},r.form);console.log("addSave_data",t),Object(a.m)(t).then(function(e){r.loading=!1,r.$message({message:"保存成功~",type:"success"}),r.closeMe(),r.$emit("success")}).catch(function(e){r.loading=!1,r.$message.warning(e.text)})})}}}},us2a:function(e,t,r){"use strict";var s=r("t5DY"),i=r("SjYS");t.a={components:{addSave:i.a},props:{searchObj:{type:[Object,Array]},value:[String,Number]},data:function(){return{isModify:!1,popVisible:!1,setupTableVisible:!1,dataset:[],datalist:"",timeout:null,loading:!1,options4:[],querySearch:{currentPage:1,pageSize:10,vo:{orgId:"",userId:"",menuCode:""}}}},watch:{value:function(e){console.log("nnn:",e),""===e&&(this.datalist="")},searchObj:{handler:function(e,t){this.$nextTick(function(){console.log("searchAll_cval",e,t)})},deep:!0}},mounted:function(){},methods:{initdata:function(){var t=this;this.inited||(this.inited=!0,this.loading=!0,this.fetchAllloadAll().then(function(e){t.loading=!1}))},deleteItem:function(e){var t=this;Object(s.a)(e).then(function(e){t.fetchAllloadAll()}).catch(function(e){t._handlerCatchMsg(e)})},Custom:function(){this.isModify=!0,this.popVisible=!0},closeAddDot:function(){this.popVisible=!1},fetchAllloadAll:function(){var t=this;return this.querySearch.vo.orgId=this.otherinfo.orgid,this.querySearch.vo.userId=this.otherinfo.userId,this.querySearch.vo.menuCode=this.$route.meta.code,Object(s.l)(this.querySearch).then(function(e){t.dataset=e.list,t.options4=e.list})},querySearchAsync:function(e,t){var r=this.dataset,s=e?r.filter(this.createStateFilter(e)):r;t(this.options4=s)},createStateFilter:function(t){return function(e){return 0===e.queryKey.toLowerCase().indexOf(t.toLowerCase())}},handleSelect:function(t){var e=this.options4.filter(function(e){return e.id===t});if(e.length){var r=e[0].queryContent,s=JSON.parse(r);this.$emit("change",JSON.parse(r.replace(/'/g,'"'))),this.$emit("dataObj",s)}}}}},wLV8:function(e,t,r){"use strict";var s={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[t.isTransferSel||t.isAbnormal?r("SelectTree",{model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}}):r("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),t.isTransferSel?r("el-form-item",{attrs:{label:"中转网点",prop:"transferOrgid"}},[r("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.transferOrgid,callback:function(e){t.$set(t.searchForm,"transferOrgid",e)},expression:"searchForm.transferOrgid"}})],1):t._e(),t._v(" "),t.isAbnormal?r("el-form-item",{attrs:{label:"结算网点",prop:"orgid"}},[r("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.orgid,callback:function(e){t.$set(t.searchForm,"orgid",e)},expression:"searchForm.orgid"}})],1):t._e(),t._v(" "),r("el-form-item",{attrs:{label:"结算状态",prop:"status"}},[r("el-select",{attrs:{placeholder:"结算状态"},model:{value:t.searchForm.status,callback:function(e){t.$set(t.searchForm,"status",e)},expression:"searchForm.status"}},t._l(t.$const.COUNT_STATUS,function(e,t){return r("el-option",{key:t,attrs:{value:t,label:e}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[r("el-input",{attrs:{maxlength:t.maxlength,clearable:""},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发货方",prop:"senderUnit"}},[r("el-input",{attrs:{clearable:"",maxlength:t.maxlength},model:{value:t.searchForm.senderUnit,callback:function(e){t.$set(t.searchForm,"senderUnit",e)},expression:"searchForm.senderUnit"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发货人",prop:"senderName"}},[r("el-input",{attrs:{clearable:"",maxlength:t.maxlength},model:{value:t.searchForm.senderName,callback:function(e){t.$set(t.searchForm,"senderName",e)},expression:"searchForm.senderName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"出发城市"}},[r("el-input",{attrs:{clearable:"",maxlength:t.maxlength},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"到达城市"}},[r("el-input",{attrs:{clearable:"",maxlength:t.maxlength},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"签收状态",prop:"signStatus"}},[r("selectType",{attrs:{type:"sign_status"},model:{value:t.searchForm.signStatus,callback:function(e){t.$set(t.searchForm,"signStatus",e)},expression:"searchForm.signStatus"}},[r("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),r("searchAll",{attrs:{searchObj:t.searchObjs},on:{dataObj:t.getDataObj},model:{value:t.searchAll,callback:function(e){t.searchAll=e},expression:"searchAll"}})],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=s},xK1H:function(e,t,r){"use strict";var s=r("woOf"),i=r.n(s),a=r("E4LH"),o=r("o9X6"),n=r("pAQG"),l=r("0xDb"),c=r("8UOW"),h=r("9UCZ");t.a={components:{SelectTree:o.a,querySelect:n.a,searchAll:c.a,SelectType:h.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},isTransferSel:{type:Boolean,default:!1},isAbnormal:{type:Boolean,default:!1}},data:function(){return{searchAll:"1",maxlength:25,searchObjs:{},searchForm:{shipFromOrgid:"",orgid:"",signStatus:"",shipSn:"",status:""},rules:{shipSn:[{validator:function(e,t,r){var s=a.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?s.test(t)?r():r(new Error("请输入最多15位数字")):r()},tigger:"blur"}]},searchTime:[Object(l.parseTime)(new Date-5184e6),Object(l.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:l.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.orgid=e},searchTime:function(e){e&&(this.$set(this.searchObjs,"startTime",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"))},searchForm:{handler:function(e,t){this.searchObjs=i()({},e),this.searchTime&&(this.$set(this.searchObjs,"startTime",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(this.searchObjs,"endTime",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),console.log(this.searchObjs,e,t)},deep:!0}},mounted:function(){this.isTransferSel&&(this.searchForm.transferOrgid=this.orgid),this.isAbnormal&&(this.searchForm.orgid=this.orgid),this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{getDataObj:function(e){this.searchTime=[e.startTime,e.endTime],this.searchForm=i()({},e),this.$emit("change",e)},onSubmit:function(){var e=i()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},clearForm:function(e){var t=this;this.$nextTick(function(){i()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchForm.shipFromOrgid=t.orgid,t.searchAll="1",setTimeout(function(){t.searchAll=""},50)})}}}}});
//# sourceMappingURL=194.740d3df9299f8166d25e.js.map