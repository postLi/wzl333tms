webpackJsonp([216,318],{"+b5g":function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:t.otherinfo.orgid,btnsize:t.btnsize},on:{change:t.getSearchParam}}),t._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_1",arg:"REPORT_PRINT_1"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),r("el-button",{attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("export")}}},[t._v("导出报表")])],1),t._v(" "),r("div",{staticClass:"info_tab_report_settleRecord",attrs:{id:"report_settleRecordTotal"},on:{scroll:t.handleBottom}},[r("div",{staticClass:"dragger-line"}),t._v(" "),r("table",{staticClass:"report_settleRecordTotal_table",staticStyle:{"border-collapse":"collapse"},attrs:{id:"report_settleRecordTotal_table",border:"1px"}},[r("thead",{attrs:{border:"1"}},[r("tr",{attrs:{height:"32px"}},[r("th",{attrs:{rowspan:"2",bgcolor:"dimGray",width:"50px"}},[r("font",{attrs:{color:"white",size:"3"}},[t._v("序号")])],1),t._v(" "),r("th",{attrs:{rowspan:"2",bgcolor:"dimGray",width:"100px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("费用项目")])],1),t._v(" "),r("th",{attrs:{colspan:"4",bgcolor:"dimGray"}},[r("font",{attrs:{color:"white",size:"3"}},[t._v("应收汇总")])],1),t._v(" "),r("th",{attrs:{colspan:"4",bgcolor:"dimGray"}},[r("font",{attrs:{color:"white",size:"3"}},[t._v("应付汇总")])],1)]),t._v(" "),r("tr",{attrs:{height:"32px"}},[r("th",{attrs:{bgcolor:"dimGray",width:"100px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("应收合计")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"100px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("已收")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"100px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("未收")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"70px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("数量")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"100px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("应付合计")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"100px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("已付")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"100px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("未付")])],1),t._v(" "),r("th",{attrs:{bgcolor:"dimGray",width:"70px"}},[r("font",{attrs:{color:"white",size:"2"}},[t._v("数量")])],1)])])]),t._v(" "),r("table",{ref:"footTotalFee",staticClass:"footTotalFee_settleRecordTotal"},[r("colgroup",{attrs:{width:"50px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"70px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"100px"}}),t._v(" "),r("colgroup",{attrs:{width:"70px"}})])])])],1)},staticRenderFns:[]};t.a=o},"2be8":function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),a=r("Dd8w"),n=r.n(a),l=(r("E4LH"),r("NYxO")),s=r("o9X6"),c=r("pAQG"),d=(r("0xDb"),r("sqky")),p=(r("TIfe"),r("6b+M")),h=r("UQm2");t.a={components:{SelectTree:s.a,querySelect:c.a,SearchForm:d.default},data:function(){return{loading:!0,chartIframe:"",hideiframe:"hide",query:{typeIds:""},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"序号",prop:"id",textAlign:"center",width:"50"},{label:"费用项目",prop:"feeName",textAlign:"center",width:"100"},{label:"应收合计",prop:"totalreceivableFee",textAlign:"right",width:"100"},{label:"已收",prop:"receivableFee",textAlign:"right",width:"100"},{label:"未收",prop:"receivableUnpaidFee",textAlign:"right",width:"100"},{label:"数量",prop:"receivableCount",textAlign:"center",width:"70"},{label:"应付合计",prop:"totalpayableFee",textAlign:"right",width:"100"},{label:"已付",prop:"payableFee",textAlign:"right",width:"100"},{label:"未付",prop:"payableUnpaidFee",textAlign:"right",width:"100"},{label:"数量",prop:"payableCount",textAlign:"center",width:"70"}],countCol:["totalreceivableFee","receivableFee","receivableUnpaidFee","receivableCount|integer","totalpayableFee","payableFee","payableUnpaidFee","payableCount|integer"],countColVal:[],unCountSum:["其他费用收入","包装费","保险费","上楼费","叉车费","报关费","入仓费","税金","提货费","送货费"]}},computed:n()({},Object(l.mapGetters)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{getScrollWidth:function(){var e,t,r=document.createElement("DIV");r.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(r).clientWidth,r.style.overflowY="scroll",t=r.clientWidth,document.body.removeChild(r),this.scrollwidth=e-t},handleBottom:function(e){var t=e.target,r=t.scrollTop,o=t.offsetWidth<t.scrollWidth,i=t.offsetHeight,a=this.$refs.footTotalFee,n=r+i-a.offsetHeight;o&&(n-=this.scrollwidth),this.maxheight||(this.maxheight=t.scrollHeight),a.style.bottom="auto",a.style.top=(n>this.maxheight?this.maxheight:n)+"px",document.getElementById("tableClone").style.top=r+"px"},reportSettleRecordTotal:function(){var S=this;this.loading=!0,Object(p.c)(this.query).then(function(e){var t=e;S.loading=!1;var r=document.getElementById("report_settleRecordTotal_table");if(r){var o=r.getElementsByTagName("tbody"),i=r.getElementsByTagName("tfoot");0<o.length&&(r.removeChild(o[0]),r.removeChild(i[0]));var a=document.createElement("tbody"),n=document.createElement("tfoot");r.appendChild(a),r.appendChild(n),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px");var l=document.getElementById("report_settleRecordTotal"),s=r.cloneNode(!0);s.setAttribute("id","tableClone"),s.setAttribute("refs","tableClone"),s.className="tableCloneHead",console.log("tableClone",s),l.appendChild(s);for(var c=0;c<t.length;c++)for(var d=a.insertRow(),p=0;p<S.columns.length;p++){var h=d.insertCell();for(var u in S.countCol)-1!==S.columns[p].prop.indexOf(S.countCol[u])&&(t[c][S.columns[p].prop]=t[c][S.columns[p].prop]?Number(t[c][S.columns[p].prop]).toFixed(2):"");h.innerHTML="id"===S.columns[p].prop||"序号"===S.columns[p].label?c+1:void 0===t[c][S.columns[p].prop]||0===t[c][S.columns[p].prop]?"":t[c][S.columns[p].prop],h.style.textAlign=S.columns[p].textAlign,h.style.padding="2px 5px",h.style.fontSize="13px",h.style.width=(S.columns[p].width||120)+"px"}for(var m in S.countCol){for(var f=0,g=S.countCol[m].split("|"),b=0;b<e.length;b++)-1===S.unCountSum.join(",").indexOf(e[b].feeName)&&(f+=e[b][g[0]]?Number(e[b][g[0]]):0);(f||0===f)&&(g[1]&&"integer"===g[1]?S.countColVal[g[0]]=f||"":S.countColVal[g[0]]=f?f.toFixed(2):"")}var v=n.insertRow();for(var y in S.columns){var x=v.insertCell();x.innerHTML="序号"===S.columns[y].label?"合计":S.countColVal[S.columns[y].prop]?S.countColVal[S.columns[y].prop]:"-",x.style.textAlign=S.columns[y].textAlign,x.style.padding="2px 5px",x.style.fontSize="13px",x.setAttribute("bgcolor","gainsboro"),x.setAttribute("color","white")}var _=document.getElementsByClassName("footTotalFee_settleRecordTotal")[0],T=_.getElementsByTagName("tfoot");0<T.length&&_.removeChild(T[0]);var w=document.createElement("tfoot");_.appendChild(w),_.style.borderCollapse="collapse",_.style.border="1px solid #d0d7e5",_.setAttribute("border","1"),_.setAttribute("font","12px");var C=w.insertRow();for(var F in S.columns){var I=C.insertCell();I.innerHTML="序号"===S.columns[F].label?"合计":S.countColVal[S.columns[F].prop]?S.countColVal[S.columns[F].prop]:"-",I.style.textAlign=S.columns[F].textAlign,I.style.padding="2px 5px",I.style.fontSize="13px",I.setAttribute("bgcolor","gainsboro"),I.setAttribute("color","white")}}}).catch(function(e){S.loading=!1,S._handlerCatchMsg(e)})},doAction:function(e){switch(e){case"print":Object(h.e)({id:"report_settleRecordTotal",countCol:this.countCol});break;case"export":Object(h.h)({id:"report_settleRecordTotal",name:"应收应付汇总表",countCol:this.countCol})}},getSearchParam:function(e){this.query=i()({},e),this.reportSettleRecordTotal()}}}},"5jAc":function(e,t){},"6b+M":function(e,t,r){"use strict";t.c=function(e){return o.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return o.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName).then(function(e){return e.data})},t.e=function(e){return o.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return o.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return o.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var o=r("Vo7i")},"9JBM":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("2be8"),i=r("+b5g");var a=function(e){r("5jAc")},n=r("VU/8")(o.a,i.a,a,null,null);t.default=n.exports},Sedy:function(e,t,r){"use strict";var o=r("woOf"),i=r.n(o),a=r("E4LH"),n=r("o9X6"),l=r("pAQG"),s=r("9UCZ"),c=r("0xDb"),d=r("t5DY");t.a={components:{SelectTree:n.a,querySelect:l.a,SelectType:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{orgId:"",senderId:"",typeIds:[]},rules:{shipSn:[{validator:function(e,t,r){var o=a.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?o.test(t)?r():r(new Error("请输入最多15位数字")):r()},tigger:"blur"}]},searchTime:[Object(c.parseTime)(new Date-5184e6),Object(c.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:c.pickerOptions2},feeIdsArr:[]}},mounted:function(){this.searchForm.orgId=this.orgid,this.getSelectType(),this.onSubmit()},methods:{getSelectType:function(){var t=this;Object(d.h)("fee_type",this.orgid).then(function(e){t.feeIdsArr=e})},multiple:function(){this.hideIframe(!1)},selectFeeType:function(e){},onSubmit:function(){var e=i()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(c.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"endTime",Object(c.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){t.$refs[e].resetFields(),t.searchForm=t.$options.data().searchForm,t.searchForm.orgId=t.orgid,console.log(t.searchForm)})}}}},a5lq:function(e,t,r){"use strict";var o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[r("div",{staticClass:"staff_searchinfo--input"},[r("el-form-item",{attrs:{label:"时间"}},[r("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"网点",prop:"orgId"}},[r("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"费用项目",prop:"typeIds"}},[r("el-select",{attrs:{multiple:"","collapse-tags":"",placeholder:"请选择"},on:{focus:function(){t.hideIframe(!0)},"visible-change":function(e){t.hideIframe(e)}},model:{value:t.searchForm.typeIds,callback:function(e){t.$set(t.searchForm,"typeIds",e)},expression:"searchForm.typeIds"}},t._l(t.feeIdsArr,function(e){return r("el-option",{key:e.id,attrs:{label:e.dictName,value:e.id}})}))],1)],1),t._v(" "),r("el-form-item",{staticClass:"staff_searchinfo--btn"},[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),r("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=o},sqky:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("Sedy"),i=r("a5lq"),a=r("VU/8")(o.a,i.a,null,null,null);t.default=a.exports}});