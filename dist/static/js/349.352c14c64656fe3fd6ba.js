webpackJsonp([349],{"7Qrd":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("STNA"),s=a("PHZm"),i=a("VU/8")(r.a,s.a,null,null,null);t.default=i.exports},PHZm:function(e,t,a){"use strict";var r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"70px"}},[a("div",{staticClass:"staff_searchinfo--input"},[a("el-form-item",{attrs:{label:"送货时间"}},[a("el-date-picker",{attrs:{type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd hh:mm:ss","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"批次状态"}},[a("SelectType",{staticClass:"pickup-way",attrs:{type:"delivery_batch_type",placeholder:"请选择"},model:{value:t.searchForm.batchTypeId,callback:function(e){t.$set(t.searchForm,"batchTypeId",e)},expression:"searchForm.batchTypeId"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"送货批次"}},[a("el-input",{attrs:{maxlength:15,clearable:""},model:{value:t.searchForm.batchNo,callback:function(e){t.$set(t.searchForm,"batchNo",e)},expression:"searchForm.batchNo"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"车牌号"}},[a("el-input",{attrs:{maxlength:15,clearable:""},model:{value:t.searchForm.truckIdNumber,callback:function(e){t.$set(t.searchForm,"truckIdNumber",e)},expression:"searchForm.truckIdNumber"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"司机名称"}},[a("el-input",{attrs:{maxlength:15,clearable:""},model:{value:t.searchForm.dirverName,callback:function(e){t.$set(t.searchForm,"dirverName",e)},expression:"searchForm.dirverName"}})],1)],1),t._v(" "),a("el-form-item",{staticClass:"staff_searchinfo--btn art_marginTop"},[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},STNA:function(e,t,a){"use strict";var r=a("woOf"),s=a.n(r),i=a("E4LH"),c=a("o9X6"),o=a("9UCZ"),l=a("pAQG"),n=a("0xDb");t.a={components:{SelectTree:c.a,SelectType:o.a,querySelect:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},computed:{title:function(){}},data:function(){var r=this;return{searchTime:[Object(n.parseTime)(new Date-5184e6),Object(n.parseTime)(new Date)],searchEndTime:[Object(n.parseTime)(new Date-5184e6),Object(n.parseTime)(new Date)],defaultTime:[Object(n.parseTime)(new Date-5184e6),Object(n.parseTime)(new Date)],pickerOptions:{shortcuts:n.pickerOptions2},searchForm:{dirverName:"",truckIdNumber:"",batchTypeId:56,batchNo:"",loadTypeId:40,endTime:"",beginTime:""},rules:{mobile:[{validator:function(e,t,a){r.searchForm.mobile=t.replace(i.a.NO_NUMBER,""),a()},trigger:"change"}],dirverName:[{validator:function(e,t,a){i.a.ONLY_NUMBER_AND_LETTER(t)?a():a(new Error("请输入有效的发车批次"))},trigger:"change"}]}}},watch:{orgid:function(e){}},methods:{onSubmit:function(){this.searchTime&&(this.searchForm.loadStartTime=Object(n.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00",this.searchForm.loadEndTime=Object(n.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59"),this.$emit("change",this.searchForm)},clearForm:function(e){this.$refs[e].resetFields(),this.searchForm=s()({},this.$options.data().searchForm),this.searchTime=this.$options.data().searchTime}}}}});