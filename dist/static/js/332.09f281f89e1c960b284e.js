webpackJsonp([332],{8735:function(e,r,t){"use strict";var a=t("woOf"),s=t.n(a),o=t("E4LH"),i=t("o9X6"),c=t("9UCZ"),l=t("pAQG"),n=t("0xDb");r.a={components:{SelectTree:i.a,selectBatchType:c.a,querySelect:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchTime:[Object(n.parseTime)(new Date-5184e6),Object(n.parseTime)(new Date)],searchForm:{orgId:"",loadTypeId:38,batchTypeId:46,truckIdNumber:"",dirverName:""},rules:{orgid:[{validator:function(e,r,t){var a=o.a.ONLY_NUMBER;""!==r&&null!==r&&r&&void 0!==r?a.test(r)?t():t(new Error("请输入最多15位数字")):t()},tigger:"blur"}]},defaultTime:[Object(n.parseTime)(new Date-5184e6),Object(n.parseTime)(new Date)],pickerOptions2:{shortcuts:n.pickerOptions2}}},mounted:function(){this.searchForm.orgId=this.orgid,this.onSubmit()},methods:{onSubmit:function(){this.searchTime&&(this.searchForm.loadStartTime=Object(n.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00",this.searchForm.loadEndTime=Object(n.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),this.$emit("change",this.searchForm)},clearForm:function(e){this.$refs[e].resetFields(),this.searchForm=s()({},this.$options.data().searchForm),this.searchTime=this.$options.data().searchTime,this.searchForm.orgId=this.orgid}}}},G9t1:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=t("8735"),s=t("bwj6"),o=t("VU/8")(a.a,s.a,null,null,null);r.default=o.exports},bwj6:function(e,r,t){"use strict";var a={render:function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:"mini","label-position":"right",rules:r.rules,model:r.searchForm,"label-width":"70px"}},[t("div",{staticClass:"staff_searchinfo--input"},[t("el-form-item",{attrs:{label:"配载时间"}},[t("el-date-picker",{attrs:{type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":r.pickerOptions2,"end-placeholder":"结束日期"},model:{value:r.searchTime,callback:function(e){r.searchTime=e},expression:"searchTime"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"批次状态",prop:"batchTypeId"}},[t("selectBatchType",{attrs:{type:"short_batch_type",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!r._k(e.keyCode,"enter",13,e.key,"Enter")?r.onSubmit(e):null}},model:{value:r.searchForm.batchTypeId,callback:function(e){r.$set(r.searchForm,"batchTypeId",e)},expression:"searchForm.batchTypeId"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"发车批次",prop:"batchNo"}},[t("el-input",{attrs:{maxlength:15,"auto-complete":"off",placeholder:"发车批次",clearable:""},model:{value:r.searchForm.batchNo,callback:function(e){r.$set(r.searchForm,"batchNo",e)},expression:"searchForm.batchNo"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"车牌号"}},[t("el-input",{attrs:{maxlength:8,"auto-complete":"off",placeholder:"车牌号",clearable:""},model:{value:r.searchForm.truckIdNumber,callback:function(e){r.$set(r.searchForm,"truckIdNumber",e)},expression:"searchForm.truckIdNumber"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"司机名称"}},[t("el-input",{attrs:{maxlength:10,"auto-complete":"off",placeholder:"司机名称",clearable:""},model:{value:r.searchForm.dirverName,callback:function(e){r.$set(r.searchForm,"dirverName",e)},expression:"searchForm.dirverName"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"发车网点"}},[t("SelectTree",{attrs:{orgid:r.otherinfo.orgid},model:{value:r.searchForm.orgId,callback:function(e){r.$set(r.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),r._v(" "),t("el-form-item",{attrs:{label:"到达网点"}},[t("SelectTree",{attrs:{clearable:""},model:{value:r.searchForm.arriveOrgid,callback:function(e){r.$set(r.searchForm,"arriveOrgid",e)},expression:"searchForm.arriveOrgid"}})],1)],1),r._v(" "),t("el-form-item",{staticClass:"staff_searchinfo--btn"},[t("el-button",{attrs:{type:"primary"},on:{click:r.onSubmit}},[r._v("查询")]),r._v(" "),t("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){r.clearForm("searchForm")}}},[r._v("清空")])],1)],1)},staticRenderFns:[]};r.a=a}});