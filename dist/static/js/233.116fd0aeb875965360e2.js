webpackJsonp([233,320],{"8Bi2":function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tab-content chartSender"},[i("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam,hideIframe:t.hideIframe}}),t._v(" "),i("div",{staticClass:"tab_info"},[i("div",{staticClass:"btns_box"},[i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_5",arg:"REPORT_PRINT_5"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_VIEW_5",arg:"REPORT_VIEW_5"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-view",plain:""},on:{click:function(e){t.doAction("preview")}}},[t._v("打印预览")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_SETTING_5",arg:"REPORT_SETTING_5"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){t.doAction("setting")}}},[t._v("打印设置")])],1),t._v(" "),i("div",{staticClass:"info_tab"},[i("iframe",{ref:"senderIframe",staticClass:"chartIframe",attrs:{src:t.chartIframe,id:"senderIframe",frameborder:"0",scrolling:"none",name:"showHere"}})])])],1)},staticRenderFns:[]};t.a=r},"96kn":function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),n=i("Dd8w"),s=i.n(n),o=(i("E4LH"),i("NYxO")),c=i("o9X6"),m=i("pAQG"),d=(i("0xDb"),i("jnQ6")),l=i("TIfe");t.a={components:{SelectTree:c.a,querySelect:m.a,SearchForm:d.default},data:function(){return{chartIframe:"",query:{},btnsize:"mini"}},computed:s()({},Object(o.mapGetters)(["otherinfo"])),methods:{hideIframe:function(e){e?"show"!==this.hideiframe&&(this.hideiframe="show",document.getElementById("senderIframe").contentWindow.hideChart(e)):"hide"!==this.hideiframe&&(this.hideiframe="hide",document.getElementById("senderIframe").contentWindow.hideChart(e))},doAction:function(e){switch(e){case"print":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Print","");break;case"preview":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Preview","");break;case"setting":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Setting","")}},getSearchParam:function(e){this.query=a()(this.query,e);var t=Object(l.b)();this.$set(this.query,"access_token",t);var i="?";for(var r in this.query)i+=r+"="+String(this.query[r]).trim()+"&";var n=window.location.protocol+"//"+window.location.host+"/static/supcan/incomeTotal.html"+i+"&"+(new Date).getTime();this.chartIframe=encodeURI(n)},setTable:function(){}}}},TBKO:function(e,t){},WBva:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("96kn"),n=i("8Bi2");var a=function(e){i("TBKO")},s=i("VU/8")(r.a,n.a,a,null,null);t.default=s.exports},j1X1:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[i("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},jnQ6:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("y6c7"),n=i("j1X1"),a=i("VU/8")(r.a,n.a,null,null,null);t.default=a.exports},y6c7:function(e,t,i){"use strict";var r=i("woOf"),n=i.n(r),a=i("E4LH"),s=i("o9X6"),o=i("pAQG"),c=i("0xDb");t.a={components:{SelectTree:s.a,querySelect:o.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:""},rules:{shipSn:[{validator:function(e,t,i){var r=a.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?r.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:c.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var e=n()({},this.searchForm);this.searchTime&&(this.$set(e,"startCreatTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"endCreatTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){n()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchForm.shipFromOrgid=t.orgid})}}}}});