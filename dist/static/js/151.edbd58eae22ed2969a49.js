webpackJsonp([151,205,222,285],{"+b5g":function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam}}),t._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_1",arg:"REPORT_PRINT_1"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),r("el-button",{attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("export")}}},[t._v("导出报表")])],1),t._v(" "),r("div",{staticClass:"info_tab_report",attrs:{id:"report_settleRecordTotal"},on:{scroll:t.handleBottom}},[r("table",{staticStyle:{"border-collapse":"collapse"},attrs:{id:"report_settleRecordTotal_table",width:"780px",border:"1px"}},[r("thead",{attrs:{border:"1"}},[r("tr",{attrs:{height:"32px"}},[r("th",{attrs:{rowspan:"2",bgcolor:"dimGray",width:"70px"}},[r("font",{attrs:{color:"white",size:"3"}},[t._v("序号")])],1),t._v(" "),r("th",{attrs:{rowspan:"2",bgcolor:"dimGray",width:"270px"}},[r("font",{attrs:{color:"white",size:"3"}},[t._v("费用项目")])],1),t._v(" "),r("th",{attrs:{colspan:"4",bgcolor:"dimGray"}},[r("font",{attrs:{color:"white",size:"3"}},[t._v("应收汇总")])],1),t._v(" "),r("th",{attrs:{colspan:"4",bgcolor:"dimGray"}},[r("font",{attrs:{color:"white",size:"3"}},[t._v("应付汇总")])],1)]),t._v(" "),r("tr",{attrs:{height:"32px"}},[r("th",{attrs:{bgcolor:"dimGray",width:"90px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("应收合计")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"90px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("已收")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"90px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("未收")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"90px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("数量")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"90px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("应付合计")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"90px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("已付")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"90px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("未付")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"90px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("数量")])],1)])])]),t._v(" "),r("table",{ref:"footTotalFee",staticClass:"footTotalFee"},[r("colgroup",{attrs:{width:"53px"}}),t._v(" "),r("colgroup",{attrs:{width:"200px"}}),t._v(" "),r("colgroup",{attrs:{width:"90px"}}),t._v(" "),r("colgroup",{attrs:{width:"90px"}}),t._v(" "),r("colgroup",{attrs:{width:"90px"}}),t._v(" "),r("colgroup",{attrs:{width:"90px"}}),t._v(" "),r("colgroup",{attrs:{width:"90px"}}),t._v(" "),r("colgroup",{attrs:{width:"90px"}}),t._v(" "),r("colgroup",{attrs:{width:"90px"}}),t._v(" "),r("colgroup",{attrs:{width:"90px"}})])])])],1)},staticRenderFns:[]};t.a=o},"0I0F":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("oEJ3"),i=r("cun1"),n=r("VU/8")(o.a,i.a,null,null,null);t.default=n.exports},"2be8":function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),n=r("Dd8w"),a=r.n(n),s=(r("E4LH"),r("NYxO")),l=r("o9X6"),c=r("pAQG"),d=(r("0xDb"),r("sqky")),p=(r("TIfe"),r("6b+M")),u=r("UQm2");t.a={components:{SelectTree:l.a,querySelect:c.a,SearchForm:d.default},data:function(){return{loading:!0,chartIframe:"",hideiframe:"hide",query:{typeIds:""},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"序号",prop:"id",textAlign:"center",width:"70"},{label:"费用项目",prop:"feeName",textAlign:"center"},{label:"应收合计",prop:"totalreceivableFee",textAlign:"right"},{label:"已收",prop:"receivableFee",textAlign:"right"},{label:"未收",prop:"receivablUnpaidFee",textAlign:"right"},{label:"数量",prop:"receivableCount",textAlign:"center"},{label:"应付合计",prop:"totalpayableFee",textAlign:"right"},{label:"已付",prop:"payableFee",textAlign:"right"},{label:"未付",prop:"payableUnpaidFee",textAlign:"right"},{label:"数量",prop:"payableCount",textAlign:"center"}],countCol:["totalreceivableFee","receivableFee","receivablUnpaidFee","receivableCount|integer","totalpayableFee","payableFee","payableUnpaidFee","payableCount|integer"],countColVal:[],unCountSum:["其他费用收入","包装费","保险费","上楼费","叉车费","报关费","入仓费","税金","提货费","送货费"]}},computed:a()({},Object(s.b)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{getScrollWidth:function(){var e,t,r=document.createElement("DIV");r.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(r).clientWidth,r.style.overflowY="scroll",t=r.clientWidth,document.body.removeChild(r),this.scrollwidth=e-t},reportSettleRecordTotal:function(){var C=this;this.loading=!0,Object(p.c)(this.query).then(function(e){var t=e;C.loading=!1;var r=document.getElementById("report_settleRecordTotal_table");if(r){var o=r.getElementsByTagName("tbody"),i=r.getElementsByTagName("tfoot");0<o.length&&(r.removeChild(o[0]),r.removeChild(i[0]));var n=document.createElement("tbody"),a=document.createElement("tfoot");r.appendChild(n),r.appendChild(a),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px");for(var s=0;s<t.length;s++)for(var l=n.insertRow(),c=0;c<C.columns.length;c++){var d=l.insertCell();for(var p in C.countCol)-1!==C.columns[c].prop.indexOf(C.countCol[p])&&(t[s][C.columns[c].prop]=t[s][C.columns[c].prop]?Number(t[s][C.columns[c].prop]).toFixed(2):"");d.innerHTML="id"===C.columns[c].prop||"序号"===C.columns[c].label?s+1:void 0===t[s][C.columns[c].prop]||0===t[s][C.columns[c].prop]?"":t[s][C.columns[c].prop],d.style.textAlign=C.columns[c].textAlign,d.style.padding="2px 5px",d.style.fontSize="13px",d.style.width=(C.columns[c].width||120)+"px"}for(var u in C.countCol){for(var h=0,m=C.countCol[u].split("|"),f=0;f<e.length;f++)-1===C.unCountSum.join(",").indexOf(e[f].feeName)&&(h+=e[f][m[0]]?Number(e[f][m[0]]):0);(h||0===h)&&(m[1]&&"integer"===m[1]?C.countColVal[m[0]]=h||"":C.countColVal[m[0]]=h?h.toFixed(2):"")}var g=a.insertRow();for(var v in C.columns){var b=g.insertCell();b.innerHTML="序号"===C.columns[v].label?"合计":C.countColVal[C.columns[v].prop]?C.countColVal[C.columns[v].prop]:"-",b.style.textAlign=C.columns[v].textAlign,b.style.padding="2px 5px",b.style.fontSize="13px",b.setAttribute("bgcolor","gainsboro"),b.setAttribute("color","white")}var y=document.getElementsByClassName("footTotalFee")[0],_=y.getElementsByTagName("tfoot");0<_.length&&y.removeChild(_[0]);var w=document.createElement("tfoot");y.appendChild(w),y.style.borderCollapse="collapse",y.style.border="1px solid #d0d7e5",y.setAttribute("border","1"),y.setAttribute("font","12px");var T=w.insertRow();for(var x in C.columns){var I=T.insertCell();I.innerHTML="序号"===C.columns[x].label?"合计":C.countColVal[C.columns[x].prop]?C.countColVal[C.columns[x].prop]:"-",I.style.textAlign=C.columns[x].textAlign,I.style.padding="2px 5px",I.style.fontSize="13px",I.setAttribute("bgcolor","gainsboro"),I.setAttribute("color","white")}}}).catch(function(e){C.loading=!1,C._handlerCatchMsg(e)})},doAction:function(e){switch(e){case"print":Object(u.e)({id:"report_settleRecordTotal",countCol:this.countCol});break;case"export":Object(u.h)({id:"report_settleRecordTotal",name:"应收应付汇总表",countCol:this.countCol})}},getSearchParam:function(e){this.query=i()({},e),this.reportSettleRecordTotal()},handleBottom:function(e){var t=e.target,r=t.scrollTop,o=t.offsetWidth<t.scrollWidth,i=t.offsetHeight,n=this.$refs.footTotalFee,a=r+i-n.offsetHeight;o&&(a-=this.scrollwidth),this.maxheight||(this.maxheight=t.scrollHeight),n.style.bottom="auto",n.style.top=(a>this.maxheight?this.maxheight:a)+"px"}}}},"5jAc":function(e,t){},"6b+M":function(e,t,r){"use strict";t.c=function(e){return o.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return o.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName).then(function(e){return e.data})},t.e=function(e){return o.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return o.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return o.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var o=r("Vo7i")},"9JBM":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("2be8"),i=r("+b5g");var n=function(e){r("5jAc")},a=r("VU/8")(o.a,i.a,n,null,null);t.default=a.exports},"FX7+":function(e,t){},JtF3:function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam,hideIframe:t.hideIframe}}),t._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_1",arg:"REPORT_PRINT_1"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_VIEW_1",arg:"REPORT_VIEW_1"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-view",plain:""},on:{click:function(e){t.doAction("preview")}}},[t._v("打印预览")]),t._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_SETTING_1",arg:"REPORT_SETTING_1"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){t.doAction("setting")}}},[t._v("打印设置")])],1),t._v(" "),r("div",{staticClass:"info_tab"},[r("div",{staticClass:"hidetrigger"}),t._v(" "),r("iframe",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],ref:"senderIframe",staticClass:"chartIframe",attrs:{src:t.chartIframe,id:"senderIframe",frameborder:"0",scrolling:"auto",name:"showHere"}})])])],1)},staticRenderFns:[]};t.a=o},Sedy:function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),n=r("E4LH"),a=r("o9X6"),s=r("pAQG"),l=r("9UCZ"),c=r("0xDb"),d=r("t5DY");t.a={components:{SelectTree:a.a,querySelect:s.a,SelectType:l.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{orgId:"",senderId:"",typeIds:[]},rules:{shipSn:[{validator:function(e,t,r){var o=n.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?o.test(t)?r():r(new Error("请输入最多15位数字")):r()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:c.pickerOptions2},feeIdsArr:[]}},mounted:function(){this.searchForm.orgId=this.orgid,this.getSelectType(),this.onSubmit()},methods:{getSelectType:function(){var t=this;Object(d.e)("fee_type",this.orgid).then(function(e){t.feeIdsArr=e})},multiple:function(){this.hideIframe(!1)},selectFeeType:function(e){},onSubmit:function(){var e=i()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"endTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){t.$refs[e].resetFields(),t.searchForm=t.$options.data().searchForm,t.searchForm.orgId=t.orgid,console.log(t.searchForm)})}}}},ZBHt:function(e,t,r){"use strict";var o=r("woOf"),n=r.n(o),i=r("Dd8w"),a=r.n(i),s=(r("E4LH"),r("NYxO")),l=r("o9X6"),c=r("pAQG"),d=(r("0xDb"),r("sqky")),p=r("TIfe");t.a={components:{SelectTree:l.a,querySelect:c.a,SearchForm:d.default},data:function(){return{chartIframe:"",hideiframe:"hide",query:{typeIds:""},btnsize:"mini",isShow:!0}},computed:a()({},Object(s.b)(["otherinfo"])),methods:{doAction:function(e){switch(e){case"print":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Print","");break;case"preview":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Preview","");break;case"setting":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Setting","")}},hideIframe:function(e){e?"show"!==this.hideiframe&&(this.hideiframe="show",document.getElementById("senderIframe").contentWindow.hideChart(e)):"hide"!==this.hideiframe&&(this.hideiframe="hide",document.getElementById("senderIframe").contentWindow.hideChart(e))},getSearchParam:function(e){this.query=n()(this.query,e);var t=Object(p.a)();this.$set(this.query,"access_token",t);var r="?";for(var o in this.query)r+=o+"="+String(this.query[o]).trim()+"&";var i=window.location.protocol+"//"+window.location.host+"/static/supcan/settleRecordTotal.html"+r+(new Date).getTime();this.chartIframe=encodeURI(i)},setTable:function(){}}}},a5lq:function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"网点",prop:"orgId"}},[r("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"费用项目",prop:"typeIds"}},[r("el-select",{attrs:{multiple:"","collapse-tags":"",placeholder:"请选择"},on:{focus:function(){t.hideIframe(!0)},"visible-change":function(e){t.hideIframe(e)}},model:{value:t.searchForm.typeIds,callback:function(e){t.$set(t.searchForm,"typeIds",e)},expression:"searchForm.typeIds"}},t._l(t.feeIdsArr,function(e){return r("el-option",{key:e.id,attrs:{label:e.dictName,value:e.id}})}))],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=o},cun1:function(e,t,r){"use strict";var o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tab-wrapper tab-wrapper-100"},[t(this.component,{tag:"keep-alive"})],1)},staticRenderFns:[]};t.a=o},oEJ3:function(e,t,r){"use strict";var o=r("ydjL"),i=r("9JBM");t.a={components:{sender:o.default,list:i.default},data:function(){return{component:"list"}}}},sqky:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("Sedy"),i=r("a5lq"),n=r("VU/8")(o.a,i.a,null,null,null);t.default=n.exports},ydjL:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("ZBHt"),i=r("JtF3");var n=function(e){r("FX7+")},a=r("VU/8")(o.a,i.a,n,null,null);t.default=a.exports}});
//# sourceMappingURL=151.edbd58eae22ed2969a49.js.map