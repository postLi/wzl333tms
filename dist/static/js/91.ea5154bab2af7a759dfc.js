webpackJsonp([91,221,236,324],{"/wB2":function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_5",arg:"REPORT_PRINT_5"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印报表")]),i._v(" "),r("el-button",{attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出报表")]),i._v(" "),r("el-popover",{attrs:{placement:"right-end",width:"160",trigger:"manual"},nativeOn:{mouseenter:function(e){return i.showSaveBox(e)},mouseout:function(e){return i.hideSaveBox(e)}},model:{value:i.visible2,callback:function(e){i.visible2=e},expression:"visible2"}},[r("p",[i._v("表格宽度修改了，是否要保存？")]),i._v(" "),r("div",{staticStyle:{"text-align":"right",margin:"0"}},[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){i.visible2=!1}}},[i._v("取消")]),i._v(" "),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:i.saveToTableSetup}},[i._v("确定")])],1),i._v(" "),r("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"})],1)],1),i._v(" "),r("div",{staticClass:"tab_report"},[r("el-table",{key:i.tablekey,ref:"multipleTableRight",staticStyle:{width:"100%"},attrs:{slot:"reference",data:i.dataList,height:"100%",border:"","tooltip-effect":"dark",triped:"","show-overflow-tooltip":!0},on:{"header-dragend":i.setTableWidth},slot:"reference"},[i._l(i.columns,function(t){return[t.scope?r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:t.prop,label:t.label,width:t.width,fixed:t.fixed},scopedSlots:i._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:i._s(t.slot(e))}})]}}])}):r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:t.prop,label:t.label,width:t.width,fixed:t.fixed}})]})],2)],1),i._v(" "),i._m(0)]),i._v(" "),r("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.columns,code:i.thecode},on:{close:function(e){i.setupTableVisible=!1},success:i.setColumn}})],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"info_tab_report_incomeTotal",staticStyle:{display:"none"},attrs:{id:"report_incomeTotal"}},[t("table",{attrs:{id:"report_incomeTotal_table"}})])}]};t.a=r},"6b+M":function(e,t,i){"use strict";t.c=function(e){return r.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return r.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName+"&shipToOrgid="+e.shipToOrgid+"&shipToCityName="+e.shipToCityName+"&shipFromCityName="+e.shipFromCityName).then(function(e){return e.data})},t.e=function(e){return r.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return r.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return r.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var r=i("Vo7i")},"8Bi2":function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tab-content chartSender"},[i("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam,hideIframe:t.hideIframe}}),t._v(" "),i("div",{staticClass:"tab_info"},[i("div",{staticClass:"btns_box"},[i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_5",arg:"REPORT_PRINT_5"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_VIEW_5",arg:"REPORT_VIEW_5"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-view",plain:""},on:{click:function(e){t.doAction("preview")}}},[t._v("打印预览")]),t._v(" "),i("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_SETTING_5",arg:"REPORT_SETTING_5"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){t.doAction("setting")}}},[t._v("打印设置")])],1),t._v(" "),i("div",{staticClass:"info_tab"},[i("iframe",{ref:"senderIframe",staticClass:"chartIframe",attrs:{src:t.chartIframe,id:"senderIframe",frameborder:"0",scrolling:"none",name:"showHere"}})])])],1)},staticRenderFns:[]};t.a=r},"92/o":function(e,t,i){"use strict";var r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tab-wrapper tab-wrapper-100"},[t(this.component,{tag:"keep-alive"})],1)},staticRenderFns:[]};t.a=r},"96kn":function(e,t,i){"use strict";var r=i("woOf"),a=i.n(r),n=i("Dd8w"),o=i.n(n),s=(i("E4LH"),i("NYxO")),c=i("o9X6"),l=i("pAQG"),d=(i("0xDb"),i("jnQ6")),u=i("TIfe");t.a={components:{SelectTree:c.a,querySelect:l.a,SearchForm:d.default},data:function(){return{chartIframe:"",query:{},btnsize:"mini"}},computed:o()({},Object(s.mapGetters)(["otherinfo"])),methods:{hideIframe:function(e){e?"show"!==this.hideiframe&&(this.hideiframe="show",document.getElementById("senderIframe").contentWindow.hideChart(e)):"hide"!==this.hideiframe&&(this.hideiframe="hide",document.getElementById("senderIframe").contentWindow.hideChart(e))},doAction:function(e){switch(e){case"print":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Print","");break;case"preview":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Preview","");break;case"setting":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Setting","")}},getSearchParam:function(e){this.query=a()(this.query,e);var t=Object(u.b)();this.$set(this.query,"access_token",t);var i="?";for(var r in this.query)i+=r+"="+String(this.query[r]).trim()+"&";var n=window.location.protocol+"//"+window.location.host+"/static/supcan/incomeTotal.html"+i+"&"+(new Date).getTime();this.chartIframe=encodeURI(n)},setTable:function(){}}}},R2ba:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("XzOO"),n=i("/wB2");var a=function(e){i("axkB")},o=i("VU/8")(r.a,n.a,a,null,null);t.default=o.exports},TBKO:function(e,t){},WBva:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("96kn"),n=i("8Bi2");var a=function(e){i("TBKO")},o=i("VU/8")(r.a,n.a,a,null,null);t.default=o.exports},XzOO:function(e,t,i){"use strict";var r=i("woOf"),n=i.n(r),a=i("Dd8w"),o=i.n(a),s=(i("E4LH"),i("NYxO")),c=(i("0xDb"),i("jnQ6")),l=i("6b+M"),d=i("UQm2"),u=i("puNT");t.a={components:{SearchForm:c.default,TableSetup:u.a},data:function(){return{res:{},tablekey:0,dataList:[],setupTableVisible:!1,thecode:"FINANCE_findDetail",visible2:!1,loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"总收入(元)",prop:"totalFee",textAlign:"right"},{label:"现付(元)",prop:"nowPayFee",textAlign:"right"},{label:"到付(元)",prop:"arrivePayFee",textAlign:"right"},{label:"回单付(元)",prop:"receiptPayFee",textAlign:"right"},{label:"月结(元)",prop:"monthPayFee",textAlign:"right"},{label:"异动费用(元)",prop:"changeFee",textAlign:"right"}],countCol:[],countColVal:[]}},computed:o()({},Object(s.mapGetters)(["otherinfo"])),methods:{fetchData:function(){var t=this;Object(l.a)(this.query).then(function(e){t.res=e||{},t.report()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},report:function(){this.loading=!0;var e=this.res;this.dataList=[],this.dataList.push(e);this.loading=!1;var t=document.getElementById("report_incomeTotal_table");if(t){var i=t.getElementsByTagName("thead"),r=t.getElementsByTagName("tbody");0<i.length&&(t.removeChild(i[0]),t.removeChild(r[0]));var n=document.createElement("thead"),a=document.createElement("tbody"),o=document.createElement("tr");t.appendChild(n),t.appendChild(a),n.appendChild(o),t.style.borderCollapse="collapse",t.style.border="1px solid #d0d7e5",t.setAttribute("border","1"),t.setAttribute("font","12px"),o.setAttribute("height","32px"),o.setAttribute("width","100%");for(var s=0;s<this.columns.length;s++){var c=document.createElement("th"),l=document.createElement("font");l.innerHTML=this.columns[s].label,l.setAttribute("size",2),l.setAttribute("color","white"),c.setAttribute("border",1),c.setAttribute("bgcolor","dimGray"),c.appendChild(l),o.appendChild(c)}var d=a.insertRow();for(var u in this.columns){var m=d.insertCell();m.innerHTML=e[this.columns[u].prop]?Number(e[this.columns[u].prop]).toFixed(2):"0.00",m.style.textAlign=this.columns[u].textAlign,m.style.padding="2px 5px",m.style.fontSize="13px",m.style.wordBreak="break-all",m.style.width=(this.columns[u].width||120)+"px"}}},doAction:function(e){switch(this.report(),e){case"print":Object(d.e)({id:"report_incomeTotal",countCol:this.countCol});break;case"export":Object(d.h)({id:"report_incomeTotal",name:"收入统计",countCol:this.countCol})}},getSearchParam:function(e){this.query=n()(this.query,e),this.fetchData()},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)},setTableWidth:function(e,t,i,r){var n=this,a=this.columns.filter(function(e){return e.prop===i.property});a.length&&(a[0].width=e+"",this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){n.visible2=!1},1e4)),console.log("setTableWidth",e,t,i,r,this.columns)},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.columns)},setColumn:function(e){this.columns=e,this.tablekey=Math.random()}}}},axkB:function(e,t){},ht5A:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("ju1q"),n=i("92/o"),a=i("VU/8")(r.a,n.a,null,null,null);t.default=a.exports},j1X1:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[i("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},jnQ6:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("y6c7"),n=i("j1X1"),a=i("VU/8")(r.a,n.a,null,null,null);t.default=a.exports},ju1q:function(e,t,i){"use strict";var r=i("WBva"),n=i("R2ba");t.a={components:{sender:r.default,list:n.default},data:function(){return{component:"list"}}}},y6c7:function(e,t,i){"use strict";var r=i("woOf"),n=i.n(r),a=i("E4LH"),o=i("o9X6"),s=i("pAQG"),c=i("0xDb");t.a={components:{SelectTree:o.a,querySelect:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:""},rules:{shipSn:[{validator:function(e,t,i){var r=a.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?r.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:c.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var e=n()({},this.searchForm);this.searchTime&&(this.$set(e,"startCreatTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"endCreatTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){n()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchForm.shipFromOrgid=t.orgid})}}}}});