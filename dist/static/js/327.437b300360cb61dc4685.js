webpackJsonp([327],{O6eg:function(e,t,r){"use strict";var a={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"配载时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"批次状态",prop:"batchTypeId"}},[r("selectBatchType",{attrs:{type:"short_batch_type",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.batchTypeId,callback:function(e){t.$set(t.searchForm,"batchTypeId",e)},expression:"searchForm.batchTypeId"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发车批次"}},[r("el-input",{attrs:{maxlength:15,"auto-complete":"off",placeholder:"发车批次",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.batchNo,callback:function(e){t.$set(t.searchForm,"batchNo",e)},expression:"searchForm.batchNo"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"车牌号"}},[r("el-input",{attrs:{maxlength:8,"auto-complete":"off",placeholder:"车牌号",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.truckIdNumber,callback:function(e){t.$set(t.searchForm,"truckIdNumber",e)},expression:"searchForm.truckIdNumber"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"司机名称"}},[r("el-input",{attrs:{maxlength:8,"auto-complete":"off",placeholder:"司机名称",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.dirverName,callback:function(e){t.$set(t.searchForm,"dirverName",e)},expression:"searchForm.dirverName"}})],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=a},"i/o2":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("x1yf"),n=r("O6eg"),o=r("VU/8")(a.a,n.a,null,null,null);t.default=o.exports},x1yf:function(e,t,r){"use strict";var a=r("woOf"),n=r.n(a),o=r("E4LH"),i=r("o9X6"),s=r("pAQG"),c=r("9UCZ"),l=r("0xDb");t.a={components:{SelectTree:i.a,selectBatchType:c.a,querySelect:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{loadTypeId:38,orgId:0,batchTypeId:46},searchData:{loadTypeId:38,orgId:0},cityName:{},rules:{shipSn:[{validator:function(e,t,r){var a=o.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?a.test(t)?r():r(new Error("请输入最多15位数字")):r()},tigger:"blur"}]},searchTime:[Object(l.parseTime)(new Date-5184e6),Object(l.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:l.pickerOptions2}}},mounted:function(){this.searchForm.batchTypeId=this.$options.data().searchForm.batchTypeId,this.onSubmit()},methods:{onSubmit:function(){this.searchTime&&(this.searchForm.startTime=Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00",this.searchForm.endTime=Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),this.$emit("change",this.searchForm)},clearForm:function(e){this.$refs[e].resetFields(),this.searchTime=this.$options.data().searchTime,this.searchForm=n()({},this.$options.data().searchForm)}}}}});