webpackJsonp([252,274],{"+1t2":function(e,t,n){"use strict";var a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tab-wrapper tab-wrapper-100"},[n(e.component,{tag:"keep-alive"})],1)},staticRenderFns:[]};t.a=a},EpR3:function(e,t,n){"use strict";var a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tab-content chartSender"},[n("div",{staticClass:"tab_info"},[n("div",{staticClass:"btns_box"},[n("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_PRINT_7",arg:"REPORT_PRINT_7"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-printer",plain:""},on:{click:function(e){t.doAction("print")}}},[t._v("打印报表")]),t._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_VIEW_7",arg:"REPORT_VIEW_7"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-view",plain:""},on:{click:function(e){t.doAction("preview")}}},[t._v("打印预览")]),t._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has:REPORT_SETTING_7",arg:"REPORT_SETTING_7"}],attrs:{type:"primary",size:t.btnsize,icon:"el-icon-setting",plain:""},on:{click:function(e){t.doAction("setting")}}},[t._v("打印设置")])],1),t._v(" "),n("div",{staticClass:"info_tab"},[n("iframe",{ref:"senderIframe",staticClass:"chartIframe",attrs:{src:t.chartIframe,id:"senderIframe",frameborder:"0",scrolling:"auto",name:"showHere"}})])])])},staticRenderFns:[]};t.a=a},Kssm:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("s7/v"),i=n("+1t2"),r=n("VU/8")(a.a,i.a,null,null,null);t.default=r.exports},PPJV:function(e,t){},WHvx:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("dnwO"),i=n("EpR3");var r=function(e){n("PPJV")},s=n("VU/8")(a.a,i.a,r,null,null);t.default=s.exports},dnwO:function(e,t,n){"use strict";var a=n("Dd8w"),i=n.n(a),r=(n("E4LH"),n("NYxO")),s=n("o9X6"),c=n("pAQG"),o=(n("0xDb"),n("TIfe"));t.a={components:{SelectTree:s.a,querySelect:c.a},data:function(){return{chartIframe:"",query:{},btnsize:"mini"}},computed:i()({},Object(r.b)(["otherinfo"])),mounted:function(){this.getSearchParam()},methods:{doAction:function(e){switch(e){case"print":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Print","");break;case"preview":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Preview","");break;case"setting":document.getElementById("senderIframe").contentWindow.OnEvent("AF","Setting","")}},hideIframe:function(e){e?"show"!==this.hideiframe&&(this.hideiframe="show",document.getElementById("senderIframe").contentWindow.hideChart(e)):"hide"!==this.hideiframe&&(this.hideiframe="hide",document.getElementById("senderIframe").contentWindow.hideChart(e))},getSearchParam:function(){var e=Object(o.a)(),t=window.location.protocol+"//"+window.location.host+"/static/supcan/crossReport2.html?access_token="+e+"&"+(new Date).getTime();this.chartIframe=encodeURI(t)},setTable:function(){}}}},"s7/v":function(e,t,n){"use strict";var a=n("WHvx");t.a={components:{sender:a.default},data:function(){return{component:"sender"}}}}});