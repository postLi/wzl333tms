webpackJsonp([199,282],{"6b+M":function(e,t,r){"use strict";t.c=function(e){return o.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return o.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName).then(function(e){return e.data})},t.e=function(e){return o.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return o.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return o.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var o=r("Vo7i")},"7mzR":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("qj+C"),i=r("RujC"),n=r("VU/8")(o.a,i.a,null,null,null);t.default=n.exports},ICvs:function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam}}),t._v(" "),r("div",{staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_3",arg:"REPORT_PRINT_3"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),r("el-button",{attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("export")}}},[t._v("导出报表")])],1),t._v(" "),r("div",{staticClass:"info_tab_report",attrs:{id:"report_turnoverTotal"},on:{scroll:t.handleBottom}},[r("table",{attrs:{id:"report_turnoverTotal_table"}}),t._v(" "),r("table",{ref:"footTotalFee",staticClass:"footTotalFee"},[r("colgroup",{attrs:{width:"65px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}}),t._v(" "),r("colgroup",{attrs:{width:"110px"}})])])])],1)},staticRenderFns:[]};t.a=o},RujC:function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"开单时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[r("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=o},VsiZ:function(e,t){},cCju:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("o+UU"),i=r("ICvs");var n=function(e){r("VsiZ")},a=r("VU/8")(o.a,i.a,n,null,null);t.default=a.exports},"o+UU":function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),n=r("Dd8w"),a=r.n(n),s=(r("E4LH"),r("NYxO")),l=(r("0xDb"),r("7mzR")),c=r("6b+M"),p=r("UQm2");t.a={components:{SearchForm:l.default},data:function(){return{chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"序号",prop:"id",textAlign:"center",width:"70"},{label:"开单网点",prop:"orgidName",textAlign:"center"},{label:"总运费(元)",prop:"totalFee",textAlign:"right"},{label:"实收费用(元)",prop:"shipTotalFee",textAlign:"right"},{label:"回扣(元)",prop:"brokerageFee",textAlign:"right"},{label:"现付(元)",prop:"nowPayFee",textAlign:"right"},{label:"到付(元)",prop:"arrivePayFee",textAlign:"right"},{label:"回单付(元)",prop:"receiptPayFee",textAlign:"right"},{label:"月结(元)",prop:"monthPayFee",textAlign:"right"}],countCol:["nowPayFee","arrivePayFee","shipReceiptpayFee","monthPayFee","totalFee","brokerageFee","receiptPayFee","shipTotalFee"],countColVal:[]}},computed:a()({},Object(s.b)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{getScrollWidth:function(){var e,t,r=document.createElement("DIV");r.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(r).clientWidth,r.style.overflowY="scroll",t=r.clientWidth,document.body.removeChild(r),this.scrollwidth=e-t},report:function(){var P=this;Object(c.e)(this.query).then(function(e){var t=e.list,r=document.getElementById("report_turnoverTotal_table");if(r){var o=r.getElementsByTagName("thead"),i=r.getElementsByTagName("tbody"),n=r.getElementsByTagName("tfoot");0<o.length&&(r.removeChild(o[0]),r.removeChild(i[0]),r.removeChild(n[0]));var a=document.createElement("thead"),s=document.createElement("tbody"),l=document.createElement("tfoot"),c=document.createElement("tr");r.appendChild(a),r.appendChild(s),r.appendChild(l),a.appendChild(c),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px"),r.setAttribute("width","780px"),c.setAttribute("height","32px"),c.setAttribute("width","100%");for(var p=0;p<P.columns.length;p++){var d=document.createElement("th"),u=document.createElement("font");u.innerHTML=P.columns[p].label,u.setAttribute("size",2),u.setAttribute("color","white"),d.setAttribute("border",1),d.setAttribute("bgcolor","dimGray"),d.appendChild(u),c.appendChild(d)}for(var m=0;m<t.length;m++)for(var h=s.insertRow(),f=0;f<P.columns.length;f++){var g=h.insertCell();for(var b in P.countCol)-1!==P.columns[f].prop.indexOf(P.countCol[b])&&(t[m][P.columns[f].prop]=t[m][P.columns[f].prop]?Number(t[m][P.columns[f].prop]).toFixed(2):"0.00");g.innerHTML="id"===P.columns[f].prop||"序号"===P.columns[f].label?m+1:void 0===t[m][P.columns[f].prop]?"":t[m][P.columns[f].prop],g.style.textAlign=P.columns[f].textAlign,g.style.padding="2px 5px",g.style.fontSize="13px",g.style.width=(P.columns[f].width||120)+"px"}var v=e.list;for(var y in P.countCol){for(var T=0,x=P.countCol[y].split("|"),C=0;C<v.length;C++)T+=v[C][x[0]]?Number(v[C][x[0]]):0;(T||0===T)&&(x[1]&&"integer"===x[1]?P.countColVal[x[0]]=T||"0.00":P.countColVal[x[0]]=T?T.toFixed(2):"0.00")}var F=l.insertRow();for(var _ in P.columns){var w=F.insertCell();w.innerHTML="序号"===P.columns[_].label?"合计":P.countColVal[P.columns[_].prop]?P.countColVal[P.columns[_].prop]:"-",w.style.textAlign=P.columns[_].textAlign,w.style.padding="2px 5px",w.style.fontSize="13px",w.setAttribute("bgcolor","gainsboro"),w.setAttribute("color","white")}var A=document.getElementsByClassName("footTotalFee")[0],O=A.getElementsByTagName("tfoot");0<O.length&&A.removeChild(O[0]);var S=document.createElement("tfoot");A.appendChild(S),A.style.borderCollapse="collapse",A.style.border="1px solid #d0d7e5",A.setAttribute("border","1"),A.setAttribute("font","12px");var E=S.insertRow();for(var I in P.columns){var z=E.insertCell();z.innerHTML="序号"===P.columns[I].label?"合计":P.countColVal[P.columns[I].prop]?P.countColVal[P.columns[I].prop]:"-",z.style.textAlign=P.columns[I].textAlign,z.style.padding="2px 5px",z.style.fontSize="13px",z.setAttribute("bgcolor","gainsboro"),z.setAttribute("color","white")}}}).catch(function(e){P.loading=!1,P._handlerCatchMsg(e)})},doAction:function(e){switch(e){case"print":Object(p.f)({id:"report_turnoverTotal",countCol:this.countCol});break;case"export":Object(p.i)({id:"report_turnoverTotal",name:"营业额汇总表",countCol:this.countCol})}},getSearchParam:function(e){this.query=i()(this.query,e),this.report()},handleBottom:function(e){var t=e.target,r=t.scrollTop,o=t.offsetWidth<t.scrollWidth,i=t.offsetHeight,n=this.$refs.footTotalFee,a=r+i-n.offsetHeight;o&&(a-=this.scrollwidth),this.maxheight||(this.maxheight=t.scrollHeight),n.style.bottom="auto",n.style.top=(a>this.maxheight?this.maxheight:a)+"px"}}}},"qj+C":function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),n=(r("E4LH"),r("o9X6")),a=r("pAQG"),s=r("0xDb");t.a={components:{SelectTree:n.a,querySelect:a.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:""},rules:{},searchTime:[Object(s.parseTime)(new Date-5184e6),Object(s.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:s.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var e=i()({},this.searchForm);this.searchTime&&(this.$set(e,"createTimeStart",Object(s.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"createTimeEnd",Object(s.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){i()(t.$data,t.$options.data()),t.$refs[e].resetFields()})}}}}});