webpackJsonp([242],{"3gSR":function(t,e,n){"use strict";var s={render:function(){var s=this,t=s.$createElement,o=s._self._c||t;return o("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:s.loading,expression:"loading"}],attrs:{title:s.popTitle,isShow:s.popVisible},on:{close:s.closeMe}},[o("template",{slot:"content"},[o("div",{staticClass:"smsedit_wrapper"},[o("div",{staticClass:"smsedit_tite"},[o("span",[s._v(s._s(s.info.sendNode))])]),s._v(" "),o("div",{staticClass:"smsedit_search"},[o("el-autocomplete",{attrs:{"fetch-suggestions":s.querySearch,placeholder:"请输入内容","popper-class":"popperHide"},on:{select:s.handleSelect},model:{value:s.currentSearch,callback:function(t){s.currentSearch=t},expression:"currentSearch"}},[o("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"}),s._v(" "),o("template",{slot:"prepend"},[s._v(" 可配置字段 "),o("span",[s._v(s._s(s.smsColumnLen))])])],2)],1),s._v(" "),o("div",{staticClass:"smsedit_list clearfix"},[s.isEmptySearch?o("p",[s._v("暂无数据")]):s._e(),s._v(" "),o("ul",s._l(s.smsColumn,function(e,n){return 0===e.isShow?o("li",{key:e.id,attrs:{draggable:"true","data-fileName":e.colName},on:{dragstart:function(t){s.drag(t)},click:function(t){s.addTemplate(e.colName,e,n)}}},[o("el-tag",{attrs:{type:-1!==e.colName.indexOf(s.currentSearch)&&s.currentSearch?"danger":"info",size:"mini"}},[s._v(s._s(e.colName))])],1):s._e()}))]),s._v(" "),o("div",{staticClass:"smsedit_tite"},[o("span",[s._v("短信内容 "),o("b",[s._v(s._s(s.contentLen)+"/250")])])]),s._v(" "),o("div",{staticClass:"smsedit_content",on:{drop:function(t){s.drop(t)},dragover:function(t){s.allowDrop(t)}}},[o("div",{staticClass:"smsedit_content_title"},[s._v("【"+s._s(s.info.sign)+"】")]),s._v(" "),o("el-input",{staticStyle:{height:"100%"},attrs:{id:"templateContent",type:"textarea",rows:2,placeholder:"请输入内容",autofocus:!0,maxlength:250},nativeOn:{keydown:function(t){return"button"in t||!s._k(t.keyCode,"delete",[8,46],t.key,["Backspace","Delete"])?s.deleteItem(t):null}},model:{value:s.smsTemplate,callback:function(t){s.smsTemplate=t},expression:"smsTemplate"}})],1)])]),s._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:s.resetForm}},[s._v("恢复默认")]),s._v(" "),o("el-button",{on:{click:s.closeMe}},[s._v("取消")]),s._v(" "),o("el-button",{attrs:{type:"success"},on:{click:function(t){s.submitForm("formModel")}}},[s._v("保存")])],1)],2)},staticRenderFns:[]};e.a=s},"51XE":function(t,e,n){"use strict";var s=n("woOf"),o=n.n(s),i=n("P5Di"),a=n("DAYN"),r=n.n(a),m=n("l1TW"),u=n("0xDb"),l="";e.a={components:{popRight:i.a,draggable:r.a},props:{popVisible:{type:Boolean,default:!1},info:{type:Object,default:{}}},watch:{info:function(t){var e=this;t&&this.$nextTick(function(){e.postSmsSetColumnsList(),e.postSmsTemplateLog()})},popVisible:function(t){},smsColumn:function(t){t&&(this.smsColumnLen=t.length)}},computed:{contentLen:function(){var t=this.info.sign?this.info.sign.length:0;return this.smsTemplate.length+t+2},isEmptySearch:function(){return console.log(this.smsColumnLen),0===this.smsColumnLen}},data:function(){return{popTitle:"编辑短信",loading:!1,currentSearch:"",smsColumn:[],orgSmsColumn:[],smsTemplate:"",smsTemplateObj:{},smsColumnLen:0}},mounted:function(){},methods:{initTextarea:function(){var t=document.selection.createRange(),e=document.getElementById("templateContent");t.moveToElementText(e)},drag:function(t){l=t.currentTarget},drop:function(t){var n=this;t.preventDefault();var s=l.getAttribute("data-fileName");this.smsColumn.forEach(function(t,e){t.colName===s&&n.addTemplate(s,t,e)})},allowDrop:function(t){t.preventDefault()},addTemplate:function(n,t){var e="("+n+")",s=document.getElementById("templateContent"),o=this.$const.cursorPosition.get(s);if(this.contentLen<250){this.$const.cursorPosition.add(s,o,e);var i="",a="";this.smsColumn.forEach(function(t,e){t.colName===n&&(i=e)}),this.orgSmsColumn.forEach(function(t,e){t.colName===n&&(a=e)}),this.smsColumn[i].isShow=1,this.orgSmsColumn[a].isShow=1,this.smsColumn.splice(i,1),this.smsTemplate=s.value}},deleteItem:function(t){var e=document.getElementById("templateContent"),n=this.$const.cursorPosition.get(e),s=n.start;if(n.start!==n.end){t.preventDefault();var o=this.findCursorIndex(n.start+1),i=this.findCursorIndex(n.end);this.deleteStr(o[0]-(o[0]===o[1]?1:0),i[1])}else{var a=this.findCursorIndex(s);a[0]!==a[1]&&(t.preventDefault(),this.deleteStr(a[0],a[1]))}},findCursorIndex:function(t){var e=document.getElementById("templateContent").value,n=t,s=e.substring(0,n);if(")"===e.split("")[n-1])return[s.lastIndexOf("("),n];if(-1===s.indexOf("(")&&-1===s.indexOf(")"))return[t,t];if(-1!==s.lastIndexOf("(")&&s.lastIndexOf(")")<s.lastIndexOf("(")){var o=s.lastIndexOf("(");return[o,o+e.substring(o).indexOf(")")+1]}return[t,t]},deleteStr:function(t,e){var n=this,s=document.getElementById("templateContent"),o=s.value,i=o.substring(t,e),a=i.match(/(\([^)]*\))/gm),r=Object(u.objectMerge2)([],a);s.value=o.replace(i,""),this.$const.cursorPosition.set(s,{text:"",start:t,end:t}),this.smsTemplate=s.value,r.forEach(function(t,e){n.$set(r,e,t.substring(1,t.length-1))}),this.orgSmsColumn.forEach(function(e,t){r.forEach(function(t){e.colName===t&&(e.isShow=0,n.smsColumn.push(e))})})},submitForm:function(t){var e=this,n={id:this.info.id,defaultTmpId:this.info.defaultTmpId,companyId:this.info.companyId,remindTarget:this.info.remindTarget,remindTargetCode:this.info.remindTargetCode,sendNode:this.info.sendNode,sendNodeCode:this.info.sendNodeCode,templateContent:this.smsTemplate,templateContentCoded:this.info.templateContentCoded,applyStatus:this.info.applyStatus,sendStatus:this.info.sendStatus?0:1,sign:this.info.sign};console.log("submitForm",n),""!==n.templateContent?Object(m.l)(n).then(function(t){e.$message.success("更新短信模板成功！"),e.$emit("success"),e.closeMe()}).catch(function(t){e._handlerCatchMsg(t)}):this.$message.warning("短信不能为空！")},postSmsSetColumnsList:function(){var e=this,t={orgId:this.otherinfo.orgid,tmpLogId:this.info.id,defaultTmpId:""};Object(m.h)(t).then(function(t){e.smsColumn=t.filter(function(t){return 0===t.isShow}),e.orgSmsColumn=t,e.smsColumnLen=e.smsColumn.length})},postDefaultSmsTemplate:function(){var e=this,t={defaultTmpId:this.info.defaultTmpId,orgId:this.otherinfo.orgid};Object(m.f)(t).then(function(t){e.smsTemplate=t.templateContent,e.smsTemplateObj=t})},postSmsTemplateLog:function(){var e=this,t={id:this.info.id,orgId:this.otherinfo.orgid};Object(m.j)(t).then(function(t){t&&(e.smsTemplate=t.templateContent,e.smsTemplateObj=t)})},resetForm:function(){var e=this;this.loading=!0,this.postDefaultSmsTemplate();var t={orgId:this.otherinfo.orgid,tmpLogId:"",defaultTmpId:this.info.defaultTmpId};Object(m.h)(t).then(function(t){e.loading=!1,e.smsColumn=t.filter(function(t){return 0===t.isShow}),e.orgSmsColumn=t,e.smsColumnLen=e.smsColumn.length}).catch(function(t){e.loading=!1})},querySearch:function(e,t){void 0===(this.currentSearch=e)&&(this.currentSearch||(this.smsColumn=o()([],this.orgSmsColumn).filter(function(t){return 0===t.isShow})));var n=this.orgSmsColumn,s=e?n.filter(function(t){return-1!==t.colName.indexOf(e)}):n;this.smsColumn=Object(u.objectMerge2)([],s).filter(function(t){return 0===t.isShow}),t(s)},handleSelect:function(t){this.currentSearch=t.colName},closeMe:function(t){this.$emit("update:popVisible",!1),"function"==typeof t&&t()}}}},AfZR:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("51XE"),o=n("3gSR");var i=function(t){n("LceZ")},a=n("VU/8")(s.a,o.a,i,null,null);e.default=a.exports},LceZ:function(t,e){},l1TW:function(t,e,n){"use strict";e.d=function(){return s.b.get("/api-plugin/system/tmssystemsmspackages/v1/all/").then(function(t){return t.data||{}})},e.b=function(t){return s.b.get("/api-plugin/system/tmssystemsmssummary/v1/searchSmsSurplus/",t).then(function(t){return t.data})},e.e=function(t){return s.b.post("/api-plugin/system/tmssystemsmssummary/v1/buy/",{packageId:t}).then(function(t){return t.data})},e.k=function(t){return s.b.post("/api-plugin/system/tmssystemsmstemplatelog/v1.1/getSmsTemplateLogList/",t).then(function(t){return t.data||{}})},e.a=function(t){return s.b.post("/api-plugin/system/tmssystemsmssign/v1.1/updateSmsSign/",t).then(function(t){return t.data||{}})},e.i=function(t){return s.b.post("/api-plugin/system/tmssystemsmssign/v1.1/getSmsSign/",{orgId:t}).then(function(t){return t})},e.m=function(t){return s.b.post("/api-plugin/system/tmssystemsmstemplatelog/v1.1/udpateSmsTemplateLogStatus/",t).then(function(t){return t.data})},e.g=function(t){return s.b.post("/api-plugin/system/tmssystemsmssendlog/v1.1/getSmsSendLogList/",t).then(function(t){return t.data})},e.h=function(t){return s.b.post("/api-plugin/system/tmssystemsmssetcolumns/v1.1/getSmsSetColumnsList/",t).then(function(t){return t.data})},e.f=function(t){return s.b.post("/api-plugin/system/tmssystemsmstemplate/v1.1/getDefaultSmsTemplate/",t).then(function(t){return t.data})},e.j=function(t){return s.b.post("/api-plugin/system/tmssystemsmstemplatelog/v1.1/getSmsTemplateLog/",t).then(function(t){return t.data})},e.l=function(t){return s.b.post("/api-plugin/system/tmssystemsmstemplatelog/v1.1/udpateSmsTemplateLog/",t).then(function(t){return t.data})},e.c=function(t){return s.b.post("/api-plugin/system/tmssystemsmssign/v1.1/getSmsDocText/",{orgId:t}).then(function(t){return t.data})};var s=n("Vo7i")}});