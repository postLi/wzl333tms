webpackJsonp([218,314],{"7mzR":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("qj+C"),n=i("RujC"),a=i("VU/8")(r.a,n.a,null,null,null);t.default=a.exports},"8uW9":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("NwSo"),n=i("HjaT");var a=function(e){i("n6OH")},s=i("VU/8")(r.a,n.a,a,null,null);t.default=s.exports},HjaT:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tab-content chartSender"},[i("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam,hideIframe:t.hideIframe}}),t._v(" "),i("div",{staticClass:"tab_info"},[i("div",{staticClass:"btns_box"},[i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_3",arg:"REPORT_PRINT_3"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_VIEW_3",arg:"REPORT_VIEW_3"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-view",plain:""},on:{click:function(e){t.doAction("preview")}}},[t._v("打印预览")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_SETTING_3",arg:"REPORT_SETTING_3"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){t.doAction("setting")}}},[t._v("打印设置")])],1),t._v(" "),i("div",{staticClass:"info_tab"},[i("iframe",{ref:"senderIframe",staticClass:"chartIframe",attrs:{src:t.chartIframe,id:"senderIframe",frameborder:"0",scrolling:"auto",name:"showHere"}})])])],1)},staticRenderFns:[]};t.a=r},NwSo:function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),n=i("Dd8w"),s=i.n(n),o=(i("E4LH"),i("NYxO")),c=i("o9X6"),m=i("pAQG"),l=(i("0xDb"),i("7mzR")),d=i("TIfe");t.a={components:{SelectTree:c.a,querySelect:m.a,SearchForm:l.default},data:function(){return{chartIframe:"",query:{},btnsize:"mini"}},computed:s()({},Object(o.mapGetters)(["otherinfo"])),methods:{doAction:function(e){switch(e){case"print":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Print","");break;case"preview":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Preview","");break;case"setting":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Setting","")}},hideIframe:function(e){e?"show"!==this.hideiframe&&(this.hideiframe="show",document.getElementById("senderIframe").contentWindow.hideChart(e)):"hide"!==this.hideiframe&&(this.hideiframe="hide",document.getElementById("senderIframe").contentWindow.hideChart(e))},getSearchParam:function(e){this.query=a()(this.query,e);var t=Object(d.b)();this.$set(this.query,"access_token",t);var i="?";for(var r in this.query)i+=r+"="+String(this.query[r]).trim()+"&";var n=window.location.protocol+"//"+window.location.host+"/static/supcan/turnoverTotal.html"+i+(new Date).getTime();this.chartIframe=encodeURI(n)},setTable:function(){}}}},RujC:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd",clearable:!1,"start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[i("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},n6OH:function(e,t){},"qj+C":function(e,t,i){"use strict";var r=i("woOf"),n=i.n(r),a=(i("E4LH"),i("o9X6")),s=i("pAQG"),o=i("0xDb");t.a={components:{SelectTree:a.a,querySelect:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:""},rules:{},searchTime:[Object(o.parseTime)(new Date-5184e6),Object(o.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:o.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var e=n()({},this.searchForm);this.searchTime&&(this.$set(e,"createTimeStart",Object(o.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"createTimeEnd",Object(o.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e,{createTimeStart:this.searchTime[0]||"",createTimeEnd:this.searchTime[1]||""})},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){n()(t.$data,t.$options.data()),t.$refs[e].resetFields()})}}}}});