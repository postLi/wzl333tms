webpackJsonp([150,204,221,284],{"+RRO":function(e,t,r){"use strict";var i=r("woOf"),o=r.n(i),n=r("Dd8w"),a=r.n(n),s=(r("E4LH"),r("NYxO")),l=r("o9X6"),c=r("pAQG"),d=(r("0xDb"),r("//0s")),p=r("TIfe");t.a={components:{SelectTree:l.a,querySelect:c.a,SearchForm:d.default},data:function(){return{chartIframe:"",query:{currentPage:1,pageSize:100},btnsize:"mini"}},computed:a()({},Object(s.b)(["otherinfo"])),methods:{doAction:function(e){switch(e){case"print":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Print","");break;case"preview":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Preview","");break;case"setting":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Setting","")}},hideIframe:function(e){e?"show"!==this.hideiframe&&(this.hideiframe="show",document.getElementById("senderIframe").contentWindow.hideChart(e)):"hide"!==this.hideiframe&&(this.hideiframe="hide",document.getElementById("senderIframe").contentWindow.hideChart(e))},getSearchParam:function(e){this.query=o()(this.query,e);var t=Object(p.a)();this.$set(this.query,"access_token",t);var r="?";for(var i in this.query)r+=i+"="+String(this.query[i]).trim()+"&";var n=window.location.protocol+"//"+window.location.host+"/static/supcan/turnoverDaily.html"+r+"&"+(new Date).getTime();this.chartIframe=encodeURI(n)},setTable:function(){}}}},"//0s":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("CnyF"),n=r("8Om5"),o=r("VU/8")(i.a,n.a,null,null,null);t.default=o.exports},"6b+M":function(e,t,r){"use strict";t.c=function(e){return i.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return i.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName).then(function(e){return e.data})},t.e=function(e){return i.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return i.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return i.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var i=r("Vo7i")},"8Om5":function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[r("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发货人",prop:"senderCustomerName"}},[r("el-input",{model:{value:t.searchForm.senderCustomerName,callback:function(e){t.$set(t.searchForm,"senderCustomerName",e)},expression:"searchForm.senderCustomerName"}})],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=i},CnyF:function(e,t,r){"use strict";var i=r("woOf"),n=r.n(i),o=r("E4LH"),a=r("o9X6"),s=r("pAQG"),l=r("0xDb");t.a={components:{SelectTree:a.a,querySelect:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:"",senderCustomerName:""},rules:{shipSn:[{validator:function(e,t,r){var i=o.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?i.test(t)?r():r(new Error("请输入最多15位数字")):r()},tigger:"blur"}]},searchTime:[Object(l.parseTime)(new Date-5184e6),Object(l.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:l.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var e=n()({},this.searchForm);this.searchTime&&(this.$set(e,"createTimeStart",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"createTimeEnd",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){t.$refs[e].resetFields(),t.searchForm=t.$options.data().searchForm,console.log(t.searchForm),t.searchForm.shipFromOrgid=t.orgid})}}}},IDkV:function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam,hideIframe:t.hideIframe}}),t._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_2",arg:"REPORT_PRINT_2"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_VIEW_2",arg:"REPORT_VIEW_2"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-view",plain:""},on:{click:function(e){t.doAction("preview")}}},[t._v("打印预览")]),t._v(" "),r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_SETTING_2",arg:"REPORT_SETTING_2"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){t.doAction("setting")}}},[t._v("打印设置")])],1),t._v(" "),r("div",{staticClass:"info_tab"},[r("iframe",{ref:"senderIframe",staticClass:"chartIframe",attrs:{src:t.chartIframe,id:"senderIframe",frameborder:"0",scrolling:"none",name:"showHere"}})])])],1)},staticRenderFns:[]};t.a=i},IyQW:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("+RRO"),n=r("IDkV");var o=function(e){r("b8y3")},a=r("VU/8")(i.a,n.a,o,null,null);t.default=a.exports},PnK4:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("rnGW"),n=r("yF/J"),o=r("VU/8")(i.a,n.a,null,null,null);t.default=o.exports},RUXP:function(e,t,r){"use strict";var i=r("woOf"),n=r.n(i),o=r("Dd8w"),a=r.n(o),s=(r("E4LH"),r("NYxO")),l=(r("0xDb"),r("//0s")),c=r("6b+M"),d=r("UQm2");t.a={components:{SearchForm:l.default},data:function(){return{loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"序号",prop:"id",textAlign:"center",width:"70"},{label:"开单网点",prop:"orgidName",textAlign:"center",width:"190"},{label:"签收网点",prop:"signOrgidName",textAlign:"center",width:"180"},{label:"到达城市",prop:"shipToCityName",textAlign:"center",width:"200"},{label:"发货人",prop:"senderCustomerName",textAlign:"center",width:"140"},{label:"货品名",prop:"cargoName",textAlign:"center"},{label:"现付(元)",prop:"shipNowpayFee",textAlign:"right"},{label:"到付(元)",prop:"shipArrivepayFee",textAlign:"right"},{label:"回单付(元)",prop:"shipReceiptpayFee",textAlign:"right"},{label:"月结(元)",prop:"shipMonthpayFee",textAlign:"right"},{label:"运费合计(元)",prop:"totalFee",textAlign:"right"},{label:"回扣(元)",prop:"brokerageFee",textAlign:"right"},{label:"代收货款(元)",prop:"agencyFund",textAlign:"right"},{label:"实收金额(元)",prop:"amountCollected",textAlign:"right"}],countCol:["shipNowpayFee","shipArrivepayFee","shipReceiptpayFee","shipMonthpayFee","totalFee","brokerageFee","agencyFund","amountCollected"],countColVal:[]}},computed:a()({},Object(s.b)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{getScrollWidth:function(){var e,t,r=document.createElement("DIV");r.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(r).clientWidth,r.style.overflowY="scroll",t=r.clientWidth,document.body.removeChild(r),this.scrollwidth=e-t},report:function(){var N=this;this.loading=!0,Object(c.d)(this.query).then(function(e){var t=e.list;N.loading=!1;var r=document.getElementById("report_turnoverDaily_table");if(r){var i=r.getElementsByTagName("thead"),n=r.getElementsByTagName("tbody"),o=r.getElementsByTagName("tfoot");0<i.length&&(r.removeChild(i[0]),r.removeChild(n[0]),r.removeChild(o[0]));var a=document.createElement("thead"),s=document.createElement("tbody"),l=document.createElement("tfoot"),c=document.createElement("tr");r.appendChild(a),r.appendChild(s),r.appendChild(l),a.appendChild(c),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px"),r.setAttribute("width","780px"),c.setAttribute("height","32px"),c.setAttribute("width","100%");for(var d=0;d<N.columns.length;d++){var p=document.createElement("th"),u=document.createElement("font");u.innerHTML=N.columns[d].label,u.setAttribute("size",2),u.setAttribute("color","white"),p.setAttribute("border",1),p.setAttribute("bgcolor","dimGray"),p.appendChild(u),p.setAttribute("width",(N.columns[d].width||120)+"px"),c.appendChild(p)}for(var h=0;h<t.length;h++)for(var m=s.insertRow(),f=0;f<N.columns.length;f++){var g=m.insertCell();for(var v in N.countCol)-1!==N.columns[f].prop.indexOf(N.countCol[v])&&(t[h][N.columns[f].prop]=t[h][N.columns[f].prop]?Number(t[h][N.columns[f].prop]).toFixed(2):"");g.innerHTML="id"===N.columns[f].prop||"序号"===N.columns[f].label?h+1:void 0===t[h][N.columns[f].prop]||0===t[h][N.columns[f].prop]?"":t[h][N.columns[f].prop],g.style.textAlign=N.columns[f].textAlign,g.style.padding="2px 3px",g.style.fontSize="13px",g.setAttribute("width",(N.columns[f].width||120)+"px")}var b=e.list;for(var y in N.countCol){for(var _=0,x=N.countCol[y].split("|"),w=0;w<b.length;w++)_+=b[w][x[0]]?Number(b[w][x[0]]):0;(_||0===_)&&(x[1]&&"integer"===x[1]?N.countColVal[x[0]]=_||"":N.countColVal[x[0]]=_?_.toFixed(2):"")}var T=l.insertRow();for(var C in N.columns){var F=T.insertCell();F.innerHTML="序号"===N.columns[C].label?"合计":N.countColVal[N.columns[C].prop]?N.countColVal[N.columns[C].prop]:"-",F.style.textAlign=N.columns[C].textAlign,F.style.padding="2px 5px",F.style.fontSize="13px",F.setAttribute("bgcolor","gainsboro"),F.setAttribute("color","white")}var O=document.getElementsByClassName("footTotalFee")[0],A=O.getElementsByTagName("tfoot");0<A.length&&O.removeChild(A[0]);var E=document.createElement("tfoot");O.appendChild(E),O.style.borderCollapse="collapse",O.style.border="1px solid #d0d7e5",O.setAttribute("border","1"),O.setAttribute("font","12px");var I=E.insertRow();for(var R in N.columns){var S=I.insertCell();S.innerHTML="序号"===N.columns[R].label?"合计":N.countColVal[N.columns[R].prop]?N.countColVal[N.columns[R].prop]:"-",S.style.textAlign=N.columns[R].textAlign,S.style.padding="2px 5px",S.style.fontSize="13px",S.setAttribute("bgcolor","gainsboro"),S.setAttribute("color","white")}}}).catch(function(e){N.loading=!1,N._handlerCatchMsg(e)})},doAction:function(e){switch(e){case"print":Object(d.e)({id:"report_turnoverDaily",countCol:this.countCol});break;case"export":Object(d.h)({id:"report_turnoverDaily",name:"营业额日报表",countCol:this.countCol})}},getSearchParam:function(e){this.query=n()(this.query,e),this.report()},handleBottom:function(e){var t=e.target,r=t.scrollTop,i=t.offsetWidth<t.scrollWidth,n=t.offsetHeight,o=this.$refs.footTotalFee,a=r+n-o.offsetHeight;i&&(a-=this.scrollwidth),this.maxheight||(this.maxheight=t.scrollHeight),o.style.bottom="auto",o.style.top=(a>this.maxheight?this.maxheight:a)+"px"}}}},YeJj:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("RUXP"),n=r("zX6D");var o=function(e){r("oEcg")},a=r("VU/8")(i.a,n.a,o,null,null);t.default=a.exports},b8y3:function(e,t){},oEcg:function(e,t){},rnGW:function(e,t,r){"use strict";var i=r("IyQW"),n=r("YeJj");t.a={components:{sender:i.default,list:n.default},data:function(){return{component:"list"}}}},"yF/J":function(e,t,r){"use strict";var i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tab-wrapper tab-wrapper-100"},[t(this.component,{tag:"keep-alive"})],1)},staticRenderFns:[]};t.a=i},zX6D:function(e,t,r){"use strict";var i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam}}),t._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_2",arg:"REPORT_PRINT_2"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),r("el-button",{attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("export")}}},[t._v("导出报表")])],1),t._v(" "),r("div",{staticClass:"info_tab_report",attrs:{id:"report_turnoverDaily"},on:{scroll:t.handleBottom}},[t._m(0),t._v(" "),r("table",{ref:"footTotalFee",staticClass:"footTotalFee"},[r("colgroup",{attrs:{width:"58px"}}),t._v(" "),r("colgroup",{attrs:{width:"155px"}}),t._v(" "),r("colgroup",{attrs:{width:"145px"}}),t._v(" "),r("colgroup",{attrs:{width:"165px"}}),t._v(" "),r("colgroup",{attrs:{width:"120px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"98px"}})])])])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("table",{attrs:{id:"report_turnoverDaily_table"}},[r("colgroup",{attrs:{width:"58px"}}),e._v(" "),r("colgroup",{attrs:{width:"155px"}}),e._v(" "),r("colgroup",{attrs:{width:"145px"}}),e._v(" "),r("colgroup",{attrs:{width:"165px"}}),e._v(" "),r("colgroup",{attrs:{width:"120px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"100px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}}),e._v(" "),r("colgroup",{attrs:{width:"120px"}}),e._v(" "),r("colgroup",{attrs:{width:"98px"}})])}]};t.a=i}});