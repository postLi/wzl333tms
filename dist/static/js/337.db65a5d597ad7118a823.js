webpackJsonp([337],{"+eew":function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{staticClass:"staff_searchinfo wzl clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right","label-width":"70px",rules:t.rules,model:t.searchForm}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("div",{staticClass:"block"},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","popper-class":"searchCreatTime","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions2,"end-placeholder":"结束日期"},model:{value:t.searchCreatTime,callback:function(e){t.searchCreatTime=e},expression:"searchCreatTime"}})],1)]),t._v(" "),r("el-form-item",{attrs:{label:"开单网点"}},[r("SelectTree",{model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"签收网点"}},[r("SelectTree",{attrs:{orgid:t.otherinfo.orgid},model:{value:t.searchForm.signOrgid,callback:function(e){t.$set(t.searchForm,"signOrgid",e)},expression:"searchForm.signOrgid"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"签收状态",prop:"signStatus"}},[r("selectType",{attrs:{type:"sign_status"},model:{value:t.searchForm.signStatus,callback:function(e){t.$set(t.searchForm,"signStatus",e)},expression:"searchForm.signStatus"}},[r("el-option",{attrs:{slot:"head",label:"全部",value:""},slot:"head"})],1)],1),t._v(" "),r("el-form-item",{attrs:{label:"凭证状态",prop:"signCertificate"}},[r("selectType",{attrs:{type:"sign_certificate"},model:{value:t.searchForm.signCertificate,callback:function(e){t.$set(t.searchForm,"signCertificate",e)},expression:"searchForm.signCertificate"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"运单号",prop:"shipSn"}},[r("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipSn,callback:function(e){t.$set(t.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发站"}},[r("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipFromCityName,callback:function(e){t.$set(t.searchForm,"shipFromCityName",e)},expression:"searchForm.shipFromCityName"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"到站"}},[r("el-input",{attrs:{maxlength:20,"auto-complete":"off",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onSubmit(e):null}},model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:t.clearForm}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},"3qpv":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("eawI"),s=r("+eew"),a=r("VU/8")(i.a,s.a,null,null,null);t.default=a.exports},eawI:function(e,t,r){"use strict";var i=r("woOf"),s=r.n(i),a=r("o9X6"),o=r("9UCZ"),n=r("66wn"),l=r("0xDb");t.a={components:{SelectTree:a.a,SelectCity:n.a,SelectType:o.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},issender:{type:Boolean,dafault:!1}},computed:{},data:function(){return{searchCreatTime:[],defaultTime:[Object(l.parseTime)(+new Date-5184e6,"{y}-{m}-{d}"),Object(l.parseTime)(new Date,"{y}-{m}-{d}")],thestatus:"",searchForm:{shipFromOrgid:"",signOrgid:"",shipSn:"",shipFromCityName:"",shipToCityName:"",signCertificate:230,signStatus:226,startTime:"",endTime:""},rules:{},pickerOptions2:{shortcuts:l.pickerOptions2}}},watch:{orgid:function(e){this.searchForm.shipFromOrgid=e}},mounted:function(){this.searchForm.shipFromOrgid="",this.searchForm.signOrgid=this.otherinfo.orgid,this.searchCreatTime=this.defaultTime,this.onSubmit()},methods:{onSubmit:function(){this.searchForm.startTime=this.searchCreatTime?Object(l.parseTime)(this.searchCreatTime[0],"{y}-{m}-{d}")+" 00:00:00":"",this.searchForm.endTime=this.searchCreatTime?Object(l.parseTime)(this.searchCreatTime[1],"{y}-{m}-{d}")+" 23:59:59":"";var e=s()({},this.searchForm);this.$emit("change",e)},clearForm:function(){this.searchForm.signOrgid=this.otherinfo.orgid,this.searchForm.shipFromOrgid="",this.searchForm.signStatus="",this.searchForm.signCertificate="",this.searchForm.shipSn="",this.searchForm.shipFromCityName="",this.searchForm.shipToCityName="",this.searchCreatTime=this.defaultTime}}}}});