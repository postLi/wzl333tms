webpackJsonp([203,325],{"/inG":function(e,t){},"6b+M":function(e,t,i){"use strict";t.c=function(e){return r.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return r.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName+"&shipToOrgid="+e.shipToOrgid+"&shipToCityName="+e.shipToCityName+"&shipFromCityName="+e.shipFromCityName).then(function(e){return e.data})},t.e=function(e){return r.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return r.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return r.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var r=i("Vo7i")},"7mzR":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("qj+C"),o=i("RujC"),n=i("VU/8")(r.a,o.a,null,null,null);t.default=n.exports},ICvs:function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_3",arg:"REPORT_PRINT_3"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印报表")]),i._v(" "),r("el-button",{attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出报表")]),i._v(" "),r("el-popover",{attrs:{placement:"right-end",width:"160",trigger:"manual"},nativeOn:{mouseenter:function(e){return i.showSaveBox(e)},mouseout:function(e){return i.hideSaveBox(e)}},model:{value:i.visible2,callback:function(e){i.visible2=e},expression:"visible2"}},[r("p",[i._v("表格宽度修改了，是否要保存？")]),i._v(" "),r("div",{staticStyle:{"text-align":"right",margin:"0"}},[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){i.visible2=!1}}},[i._v("取消")]),i._v(" "),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:i.saveToTableSetup}},[i._v("确定")])],1),i._v(" "),r("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"})],1)],1),i._v(" "),r("div",{staticClass:"tab_report"},[r("el-table",{key:i.tablekey,ref:"multipleTableRight",staticStyle:{width:"100%"},attrs:{slot:"reference",data:i.dataList,"show-summary":!0,height:"100%",border:"","tooltip-effect":"dark",triped:"","show-overflow-tooltip":!0,"header-row-style":i.rowStyle,"summary-method":i.getSummary},on:{"header-dragend":i.setTableWidth},slot:"reference"},[r("el-table-column",{staticClass:"tableTitle",attrs:{label:i.tableTitle}},[i._l(i.columns,function(t){return[t.scope?r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:t.prop,label:t.label,width:t.width,fixed:t.fixed},scopedSlots:i._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:i._s(t.slot(e))}})]}}])}):r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:t.prop,label:t.label,width:t.width,fixed:t.fixed}})]})],2)],1)],1),i._v(" "),r("div",{staticClass:"info_tab_report",staticStyle:{display:"none"},attrs:{id:"report_turnoverTotal"},on:{scroll:i.handleBottom}},[r("table",{staticClass:"report_turnoverTotal_table",attrs:{id:"report_turnoverTotal_table"}}),i._v(" "),r("table",{ref:"footTotalFee",staticClass:"footTotalFee_turnoverTotal"})])]),i._v(" "),r("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.columns,code:i.thecode},on:{close:function(e){i.setupTableVisible=!1},success:i.setColumn}})],1)},staticRenderFns:[]};t.a=r},RujC:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"开单时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd",clearable:!1,"start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"开单网点",prop:"shipFromOrgid"}},[i("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)},orgid:t.otherinfo.orgid},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.shipFromOrgid,callback:function(e){t.$set(t.searchForm,"shipFromOrgid",e)},expression:"searchForm.shipFromOrgid"}})],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},cCju:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("o+UU"),o=i("ICvs");var n=function(e){i("/inG")},a=i("VU/8")(r.a,o.a,n,null,null);t.default=a.exports},"o+UU":function(e,t,i){"use strict";var r=i("woOf"),o=i.n(r),n=i("Dd8w"),a=i.n(n),s=(i("E4LH"),i("NYxO")),M=i("0xDb"),l=i("7mzR"),c=i("6b+M"),h=i("UQm2");t.a={components:{SearchForm:l.default},data:function(){return{res:{},tableTitle:"",tablekey:0,dataList:[],setupTableVisible:!1,thecode:"FINANCE_TURNOVERREPORT",visible2:!1,loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"序号",prop:"number",textAlign:"center"},{label:"开单网点",prop:"orgidName",textAlign:"center"},{label:"总运费(元)",prop:"totalFee",textAlign:"right"},{label:"实收费用(元)",prop:"shipTotalFee",textAlign:"right"},{label:"回扣(元)",prop:"brokerageFee",textAlign:"right"},{label:"现付(元)",prop:"nowPayFee",textAlign:"right"},{label:"到付(元)",prop:"arrivePayFee",textAlign:"right"},{label:"回单付(元)",prop:"receiptPayFee",textAlign:"right"},{label:"月结(元)",prop:"monthPayFee",textAlign:"right"}],countCol:["nowPayFee","arrivePayFee","shipReceiptpayFee","monthPayFee","totalFee","brokerageFee","receiptPayFee","shipTotalFee"],countColVal:[]}},computed:a()({},Object(s.mapGetters)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{rowStyle:function(e){e.row;if(0===e.rowIndex)return this.query.createTimeStart&&this.query.createTimeEnd?this.tableTitle=Object(M.parseTime)(this.query.createTimeStart,"{y}年{m}月{d}日")+"~"+Object(M.parseTime)(this.query.createTimeEnd,"{y}年{m}月{d}日")+"营业额汇总表":this.tableTitle="营业额汇总表",{fontSize:"16px"}},getScrollWidth:function(){var e,t,i=document.createElement("DIV");i.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(i).clientWidth,i.style.overflowY="scroll",t=i.clientWidth,document.body.removeChild(i),this.scrollwidth=e-t},fetchData:function(){var t=this;Object(c.e)(this.query).then(function(e){e&&e.list&&e.list.forEach(function(e,t){e.number=t+1}),t.res=e||{list:[]},t.report()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},report:function(){this.loading=!0;var e=this.res.list,t=e||[];this.dataList=t;this.loading=!1;var i=document.getElementById("report_turnoverTotal"),r=document.getElementById("report_turnoverTotal_table");if(r){var o=r.getElementsByTagName("thead"),n=r.getElementsByTagName("tbody"),a=r.getElementsByTagName("tfoot");0<o.length&&(r.removeChild(o[0]),r.removeChild(n[0]),r.removeChild(a[0]));var s=document.createElement("thead"),l=document.createElement("tbody"),c=document.createElement("tfoot"),h=document.createElement("tr"),u=document.createElement("tr"),m=document.createElement("th"),d=document.createElement("font"),p="营业额汇总表";m.setAttribute("colspan",this.columns.length),m.setAttribute("height","32px"),m.setAttribute("bgcolor","gray"),d.setAttribute("color","white"),this.timeobj.createTimeStart&&(p=Object(M.parseTime)(this.timeobj.createTimeStart,"{y}年{m}月{d}日")+"~"+Object(M.parseTime)(this.timeobj.createTimeEnd,"{y}年{m}月{d}日")+p),d.innerHTML=p,m.appendChild(d),u.appendChild(m),s.appendChild(u),r.appendChild(s),r.appendChild(l),r.appendChild(c),s.appendChild(h),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px"),h.setAttribute("height","32px"),h.setAttribute("width","100%");for(var b=0;b<this.columns.length;b++){var f=document.createElement("th"),g=document.createElement("font");g.innerHTML=this.columns[b].label,g.setAttribute("size",2),g.setAttribute("color","white"),f.setAttribute("border",1),f.setAttribute("bgcolor","dimGray"),f.appendChild(g),h.appendChild(f)}var v=r.cloneNode(!0);v.setAttribute("id","tableClone"),v.setAttribute("refs","tableClone"),v.className="tableCloneHead",i.appendChild(v);for(var T=0;T<e.length;T++)for(var y=l.insertRow(),C=0;C<this.columns.length;C++){var x=y.insertCell();for(var _ in this.countCol)-1!==this.columns[C].prop.indexOf(this.countCol[_])&&(e[T][this.columns[C].prop]=e[T][this.columns[C].prop]?Number(e[T][this.columns[C].prop]).toFixed(2):"0.00",t=e);var w="number"===this.columns[C].prop||"序号"===this.columns[C].label?T+1:void 0===e[T][this.columns[C].prop]?"":e[T][this.columns[C].prop];x.innerHTML=w,t[T][this.columns[C].prop]=w,x.style.textAlign=this.columns[C].textAlign,x.style.padding="2px 5px",x.style.fontSize="13px",x.style.width=(this.columns[C].width||120)+"px",x.style.wordBreak="break-all"}this.dataList=t;var F=this.res.list;for(var S in this.countCol){for(var O=0,A=this.countCol[S].split("|"),E=0;E<F.length;E++)O+=F[E][A[0]]?Number(F[E][A[0]]):0;(O||0===O)&&(A[1]&&"integer"===A[1]?this.countColVal[A[0]]=O||"0.00":this.countColVal[A[0]]=O?O.toFixed(2):"0.00")}var k=c.insertRow();for(var N in this.columns){var j=k.insertCell();j.innerHTML="序号"===this.columns[N].label?"合计":this.countColVal[this.columns[N].prop]?this.countColVal[this.columns[N].prop]:"-",j.style.textAlign=this.columns[N].textAlign,j.style.padding="2px 5px",j.style.fontSize="13px",j.setAttribute("bgcolor","gainsboro"),j.setAttribute("color","white"),j.style.wordBreak="break-all"}var I=document.getElementsByClassName("footTotalFee_turnoverTotal")[0],R=I.getElementsByTagName("tfoot");0<R.length&&I.removeChild(R[0]);var z=document.createElement("tfoot");I.appendChild(z),I.style.borderCollapse="collapse",I.style.border="1px solid #d0d7e5",I.setAttribute("border","1"),I.setAttribute("font","12px");var P=z.insertRow();for(var B in this.columns){var V=P.insertCell();V.innerHTML="序号"===this.columns[B].label?"合计":this.countColVal[this.columns[B].prop]?this.countColVal[this.columns[B].prop]:"-",V.style.textAlign=this.columns[B].textAlign,V.style.padding="2px 5px",V.style.fontSize="13px",V.setAttribute("bgcolor","gainsboro"),V.setAttribute("color","white"),V.style.wordBreak="break-all"}}},doAction:function(e){switch(this.report(),e){case"print":Object(h.e)({id:"report_turnoverTotal",countCol:this.countCol});break;case"export":Object(h.h)({id:"report_turnoverTotal",name:"营业额汇总表",countCol:this.countCol})}},getSearchParam:function(e,t){this.query=o()(this.query,e),this.timeobj=t,this.tableTitle=Object(M.parseTime)(this.query.createTimeStart,"{y}年{m}月{d}日")+"~"+Object(M.parseTime)(this.query.createTimeEnd,"{y}年{m}月{d}日")+"营业额汇总表",this.fetchData()},handleBottom:function(e){var t=e.target,i=t.scrollTop,r=t.offsetWidth<t.scrollWidth,o=t.offsetHeight,n=this.$refs.footTotalFee,a=i+o-n.offsetHeight;r&&(a-=this.scrollwidth),this.maxheight||(this.maxheight=t.scrollHeight),n.style.bottom="auto",n.style.top=(a>this.maxheight?this.maxheight:a)+"px",document.getElementById("tableClone").style.top=i+"px"},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)},setTableWidth:function(e,t,i,r){var o=this,n=this.columns.filter(function(e){return e.prop===i.property});n.length&&(n[0].width=e+"",this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){o.visible2=!1},1e4)),console.log("setTableWidth",e,t,i,r,this.columns)},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.columns)},setColumn:function(e){this.columns=e,this.tablekey=Math.random()},getSummary:function(e){var r=this,t=e.columns,o=(e.data,[]);return o[0]="合计",t.forEach(function(e,t){for(var i in r.countColVal)e.property===i&&(o[t]=r.countColVal[i]+"")}),o}}}},"qj+C":function(e,t,i){"use strict";var r=i("woOf"),o=i.n(r),n=(i("E4LH"),i("o9X6")),a=i("pAQG"),s=i("0xDb");t.a={components:{SelectTree:n.a,querySelect:a.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{shipFromOrgid:""},rules:{},searchTime:[Object(s.parseTime)(new Date-5184e6),Object(s.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:s.pickerOptions2}}},mounted:function(){this.searchForm.shipFromOrgid=this.orgid,this.onSubmit()},methods:{onSubmit:function(){var e=o()({},this.searchForm);this.searchTime&&(this.$set(e,"createTimeStart",Object(s.parseTime)(this.searchTime[0],"{y}-{m}-{d}")),this.$set(e,"createTimeEnd",Object(s.parseTime)(this.searchTime[1],"{y}-{m}-{d}"))),this.$emit("change",e,{createTimeStart:this.searchTime[0]||"",createTimeEnd:this.searchTime[1]||""})},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){o()(t.$data,t.$options.data()),t.$refs[e].resetFields()})}}}}});