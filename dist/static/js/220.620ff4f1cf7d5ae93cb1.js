webpackJsonp([220,323],{"2IIl":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("anTx"),n=i("6+Yw");var o=function(e){i("t3jv")},a=i("VU/8")(r.a,n.a,o,null,null);t.default=a.exports},"6+Yw":function(e,t,i){"use strict";var r={render:function(){var i=this,e=i.$createElement,r=i._self._c||e;return r("div",{staticClass:"tab-content chartSender"},[r("SearchForm",{attrs:{orgid:i.otherinfo.orgid,btnsize:i.btnsize},on:{change:i.getSearchParam}}),i._v(" "),r("div",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"tab_info"},[r("div",{staticClass:"btns_box"},[r("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_4",arg:"REPORT_PRINT_4"}],attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("print")}}},[i._v("打印报表")]),i._v(" "),r("el-button",{attrs:{type:"primary",size:i.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){i.doAction("export")}}},[i._v("导出报表")]),i._v(" "),r("el-popover",{attrs:{placement:"right-end",width:"160",trigger:"manual"},nativeOn:{mouseenter:function(e){return i.showSaveBox(e)},mouseout:function(e){return i.hideSaveBox(e)}},model:{value:i.visible2,callback:function(e){i.visible2=e},expression:"visible2"}},[r("p",[i._v("表格宽度修改了，是否要保存？")]),i._v(" "),r("div",{staticStyle:{"text-align":"right",margin:"0"}},[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){i.visible2=!1}}},[i._v("取消")]),i._v(" "),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:i.saveToTableSetup}},[i._v("确定")])],1),i._v(" "),r("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"})],1)],1),i._v(" "),r("div",{staticClass:"tab_report"},[r("el-table",{key:i.tablekey,ref:"multipleTableRight",staticStyle:{width:"100%"},attrs:{slot:"reference",data:i.dataList,height:"100%",border:"","tooltip-effect":"dark",triped:"","show-overflow-tooltip":!0},on:{"header-dragend":i.setTableWidth},slot:"reference"},[i._l(i.columns,function(t){return[t.scope?r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:t.prop,label:t.label,width:t.width,fixed:t.fixed},scopedSlots:i._u([{key:"default",fn:function(e){return[r("span",{domProps:{innerHTML:i._s(t.slot(e))}})]}}])}):r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:t.prop,label:t.label,width:t.width,fixed:t.fixed}})]})],2)],1),i._v(" "),r("div",{staticClass:"info_tab_report_operation",staticStyle:{display:"none"},attrs:{id:"report_operation"},on:{scroll:i.handleBottom}},[r("table",{attrs:{id:"report_operation_table"}})])]),i._v(" "),r("TableSetup",{attrs:{popVisible:i.setupTableVisible,columns:i.columns,code:i.thecode},on:{close:function(e){i.setupTableVisible=!1},success:i.setColumn}})],1)},staticRenderFns:[]};t.a=r},"6b+M":function(e,t,i){"use strict";t.c=function(e){return r.b.get("/api-finance/finance/report/v1/FeeAggregation?orgId="+e.orgId+"&startTime="+e.startTime+"&endTime="+e.endTime+"&typeIds="+e.typeIds+"&senderId="+e.senderId).then(function(e){return e.data||{list:[],totalCount:0}})},t.d=function(e){return r.b.get("/api-finance/finance/report/v1/dateReport?currentPage="+e.currentPage+"&pageSize="+e.pageSize+"&createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid+"&senderCustomerName="+e.senderCustomerName+"&shipToOrgid="+e.shipToOrgid+"&shipToCityName="+e.shipToCityName+"&shipFromCityName="+e.shipFromCityName).then(function(e){return e.data})},t.e=function(e){return r.b.get("/api-finance/finance/report/v1/turnoverReport?createTimeStart="+e.createTimeStart+"&createTimeEnd="+e.createTimeEnd+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})},t.b=function(e){return r.b.get("/api-finance/finance/report/v1/findOperationReport?startTime="+e.startTime+"&endTime="+e.endTime+"&orgId="+e.orgId+"&selectType="+e.selectType+"&shipToCityName="+e.shipToCityName+"&businessType="+e.businessType).then(function(e){return e.data})},t.a=function(e){return r.b.get("/api-finance/finance/report/v1/findDetail?startCreatTime="+e.startCreatTime+"&endCreatTime="+e.endCreatTime+"&shipFromOrgid="+e.shipFromOrgid).then(function(e){return e.data})};var r=i("Vo7i")},"7kH5":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("iz4D"),n=i("Xkbo"),o=i("VU/8")(r.a,n.a,null,null,null);t.default=o.exports},Xkbo:function(e,t,i){"use strict";var r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-form",{ref:"searchForm",staticClass:"staff_searchinfo clearfix",attrs:{inline:!0,size:t.btnsize,"label-position":"right",rules:t.rules,model:t.searchForm,"label-width":"80px"}},[i("div",{staticClass:"staff_searchinfo--input"},[i("el-form-item",{attrs:{label:"时间"}},[i("el-date-picker",{attrs:{"default-value":t.defaultTime,type:"daterange","unlink-panels":"",align:"right","value-format":"yyyy-MM-dd","start-placeholder":"开始日期","picker-options":t.pickerOptions,"end-placeholder":"结束日期"},on:{focus:function(e){t.hideIframe(!0)},blur:function(e){t.hideIframe(!1)}},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"网点",prop:"orgId"}},[i("SelectTree",{attrs:{focus:function(){t.hideIframe(!0)}},on:{change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.orgId,callback:function(e){t.$set(t.searchForm,"orgId",e)},expression:"searchForm.orgId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"到站",prop:"shipToCityName"}},[i("el-input",{model:{value:t.searchForm.shipToCityName,callback:function(e){t.$set(t.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"时间类型",prop:"selectType"}},[i("el-select",{on:{focus:function(){t.hideIframe(!0)},change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.selectType,callback:function(e){t.$set(t.searchForm,"selectType",e)},expression:"searchForm.selectType"}},t._l(t.selectType,function(e,t){return i("el-option",{key:e.key,attrs:{label:e.label,value:e.value}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"业务类型",prop:"businessType"}},[i("el-select",{on:{focus:function(){t.hideIframe(!0)},change:function(){t.hideIframe(!1)}},model:{value:t.searchForm.businessType,callback:function(e){t.$set(t.searchForm,"businessType",e)},expression:"searchForm.businessType"}},t._l(t.businessType,function(e,t){return i("el-option",{key:e.key,attrs:{label:e.label,value:e.value}})}))],1)],1),t._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"info",plain:""},on:{click:function(e){t.clearForm("searchForm")}}},[t._v("清空")])],1)],1)},staticRenderFns:[]};t.a=r},anTx:function(e,t,i){"use strict";var r=i("woOf"),n=i.n(r),o=i("Dd8w"),a=i.n(o),s=(i("E4LH"),i("NYxO")),l=(i("0xDb"),i("7kH5")),c=i("6b+M"),u=i("UQm2"),p=i("puNT");t.a={components:{SearchForm:l.default,TableSetup:p.a},data:function(){return{res:{},tablekey:0,dataList:[],setupTableVisible:!1,thecode:"FINANCE_findOperationReport",visible2:!1,loading:!0,chartIframe:"",hideiframe:"hide",query:{currentPage:1,pageSize:100},fontSizeHeadMini:2,bgcolorHead:"yellow",btnsize:"mini",isShow:!0,columns:[{label:"时间",prop:"time",textAlign:"center"},{label:"总运费(元)",prop:"shipFee",textAlign:"right"},{label:"件数",prop:"shipAmount",textAlign:"right"},{label:"重量(千克)",prop:"shipWeight",textAlign:"right"},{label:"体积(方)",prop:"shipVolume",textAlign:"right"}],countCol:[],countColVal:[]}},computed:a()({},Object(s.mapGetters)(["otherinfo"])),mounted:function(){this.getScrollWidth()},methods:{getScrollWidth:function(){var e,t,i=document.createElement("DIV");i.style.cssText="position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;",e=document.body.appendChild(i).clientWidth,i.style.overflowY="scroll",t=i.clientWidth,document.body.removeChild(i),this.scrollwidth=e-t},fetchData:function(){var t=this;Object(c.b)(this.query).then(function(e){t.res=e||[],t.report()}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},report:function(){this.loading=!0;var e=this.res,t=e||[];this.dataList=t;this.loading=!1;var i=document.getElementById("report_operation"),r=document.getElementById("report_operation_table");if(r){var n=r.getElementsByTagName("thead"),o=r.getElementsByTagName("tbody");0<n.length&&(r.removeChild(n[0]),r.removeChild(o[0]));var a=document.createElement("thead"),s=document.createElement("tbody"),l=document.createElement("tr");r.appendChild(a),r.appendChild(s),a.appendChild(l),r.style.borderCollapse="collapse",r.style.border="1px solid #d0d7e5",r.setAttribute("border","1"),r.setAttribute("font","12px"),l.setAttribute("height","32px"),l.setAttribute("width","100%");for(var c=0;c<this.columns.length;c++){var u=document.createElement("th"),p=document.createElement("font");p.innerHTML=this.columns[c].label,p.setAttribute("size",2),p.setAttribute("color","white"),u.setAttribute("border",1),u.setAttribute("bgcolor","dimGray"),u.appendChild(p),u.setAttribute("width",(this.columns[c].width||120)+"px"),l.appendChild(u)}var h=r.cloneNode(!0);h.setAttribute("id","tableClone"),h.setAttribute("refs","tableClone"),h.className="tableCloneHead",i.appendChild(h);for(var d=0;d<e.length;d++)for(var m=s.insertRow(),f=0;f<this.columns.length;f++){var b=m.insertCell();for(var v in this.countCol)-1!==this.columns[f].prop.indexOf(this.countCol[v])&&(e[d][this.columns[f].prop]=e[d][this.columns[f].prop]?e[d][this.columns[f].prop]:"0.00",t=e);var g="id"===this.columns[f].prop||"序号"===this.columns[f].label?d+1:void 0===e[d][this.columns[f].prop]?"":e[d][this.columns[f].prop];b.innerHTML=g,t[d][this.columns[f].prop]=g,b.style.textAlign=this.columns[f].textAlign,b.style.padding="2px 5px",b.style.fontSize="13px",b.style.width=(this.columns[f].width||120)+"px",b.style.wordBreak="break-all"}this.dataList=t}},doAction:function(e){switch(this.report(),e){case"print":Object(u.e)({id:"report_operation",countCol:this.countCol});break;case"export":Object(u.h)({id:"report_operation",name:"营运统计分析",countCol:this.countCol})}},getSearchParam:function(e){this.query=n()(this.query,e),this.fetchData()},handleBottom:function(e){var t=e.target,i=t.scrollTop;t.offsetWidth,t.scrollWidth,t.offsetHeight;this.maxheight||(this.maxheight=t.scrollHeight),document.getElementById("tableClone").style.top=i+"px"},showSaveBox:function(){clearTimeout(this.tabletimer)},hideSaveBox:function(){var e=this;clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){e.visible2=!1},1e4)},setTableWidth:function(e,t,i,r){var n=this,o=this.columns.filter(function(e){return e.prop===i.property});o.length&&(o[0].width=e+"",this.visible2=!0,clearTimeout(this.tabletimer),this.tabletimer=setTimeout(function(){n.visible2=!1},1e4)),console.log("setTableWidth",e,t,i,r,this.columns)},saveToTableSetup:function(){this.visible2=!1,this.eventBus.$emit("tablesetup.change",this.thecode,this.columns)},setColumn:function(e){this.columns=e,this.tablekey=Math.random()}}}},iz4D:function(e,t,i){"use strict";var r=i("woOf"),n=i.n(r),o=i("E4LH"),a=i("o9X6"),s=i("9UCZ"),l=i("0xDb");t.a={components:{SelectTree:a.a,SelectType:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){return{searchForm:{orgId:"",selectType:"",businessType:"",shipToCityName:""},businessType:[{value:0,label:"全部"},{value:1,label:"走货业务"},{value:2,label:"来货业务"}],selectType:[{value:1,label:"按月"},{value:2,label:"按日"}],rules:{shipSn:[{validator:function(e,t,i){var r=o.a.ONLY_NUMBER;""!==t&&null!==t&&t&&void 0!==t?r.test(t)?i():i(new Error("请输入最多15位数字")):i()},tigger:"blur"}]},searchTime:[Object(l.parseTime)(new Date-5184e6),Object(l.parseTime)(new Date)],defaultTime:[+new Date-5184e6,+new Date],pickerOptions:{shortcuts:l.pickerOptions2}}},mounted:function(){this.searchForm.orgId=this.orgid,this.searchForm.selectType=1,this.searchForm.businessType=1,this.onSubmit()},methods:{onSubmit:function(){var e=n()({},this.searchForm);this.searchTime&&(this.$set(e,"startTime",Object(l.parseTime)(this.searchTime[0],"{y}-{m}-{d} ")+"00:00:00"),this.$set(e,"endTime",Object(l.parseTime)(this.searchTime[1],"{y}-{m}-{d} ")+"23:59:59")),this.$emit("change",e)},hideIframe:function(e){this.$emit("hideIframe",e)},clearForm:function(e){var t=this;this.$nextTick(function(){n()(t.$data,t.$options.data()),t.$refs[e].resetFields(),t.searchForm.orgId=t.orgid})}}}},t3jv:function(e,t){}});