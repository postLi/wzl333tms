webpackJsonp([285],{"3ZBm":function(e,t,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"relation-per"},[n("pop-right",{staticClass:"addRelationPop",attrs:{title:t.popTitle,isShow:t.popRelatVisible},on:{close:t.closeMe}},[n("template",{staticClass:"addRelationPop-content",slot:"content"},[n("el-form",{ref:"formName",staticClass:"demo-ruleForm",attrs:{inline:!0,"label-position":"right",size:"mini"}},[n("table",[n("thead",[n("tr",[n("th",[t._v("角色")]),t._v(" "),n("th",[t._v("员工")])])]),t._v(" "),n("tbody",[n("tr",[n("td",[n("el-input",{attrs:{clearable:"",disabled:""},model:{value:t.inputInfo.roleName,callback:function(e){t.$set(t.inputInfo,"roleName",e)},expression:"inputInfo.roleName"}})],1),t._v(" "),n("td",[n("el-select",{attrs:{"collapse-tags":"","popper-class":"my-autocomplete",multiple:"",filterable:"","reserve-keyword":"",placeholder:"请选择员工","filterable-method":t.querySearch,loading:t.loading},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},t._l(t.userdata,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)])])])])],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("formName")}}},[t._v("保存")]),t._v(" "),n("el-button",{on:{click:t.closeMe}},[t._v("取 消")])],1)],2)],1)},staticRenderFns:[]};t.a=i},czv6:function(e,t,n){"use strict";var s=n("u8ra"),i=n("P5Di");t.a={components:{popRight:i.a},props:{popRelatVisible:{type:Boolean,default:!1},dotInfo:Object,thePerAllUserInfo:[Object,Array]},computed:{isShow:{get:function(){return this.popRelatVisible},set:function(){}},mobilelist:function(){var n=this;return this.selected.map(function(t){var e=n.thePerAllUserInfo.filter(function(e){return e.id===t});return e[0]?e[0].mobilephone:""}).join(", ")}},watch:{popRelatVisible:function(){this.popRelatVisible&&this.init()},dotInfo:function(e){this.popRelatVisible&&this.init()},thePerAllUserInfo:function(e){console.log("this.thePerAllUserInfo",this.thePerAllUserInfo)}},data:function(){return{userdata:[],selected:[],inputInfo:{roleName:""},restaurants:[],resInfo:[{name:""}],selectInfo:{name:"",mobilephone:"",rolesId:[],id:""},loading:!1,popTitle:"关联员工",dialogVisible:"false"}},mounted:function(){},methods:{init:function(){var t=this;this.resInfo=this.thePerAllUserInfo||[],this.userdata=this.resInfo,this.inputInfo=this.dotInfo,this.selected=this.resInfo.filter(function(e){return-1!==e.rolesIdList.indexOf(t.dotInfo.id)}).map(function(e){return e.id})},querySearch:function(t,e){var n=this.resInfo,i=t?n.filter(function(e){return!!e.name&&-1!==e.name.indexOf(t)}):n;this.userdata=i,e&&e(i)},createFilter:function(t){return function(e){return-1!==e.name.indexOf(t)}},handleSelect:function(e){this.selectInfo=e},handleIconClick:function(e){console.log(e)},closeMe:function(e){this.$emit("close"),"function"==typeof e&&e()},submitForm:function(e){var i=this;this.loading=!0;var o=[];this.selected.map(function(t){var e=i.thePerAllUserInfo.filter(function(e){return e.id===t});if(e[0]){var n=e[0].rolesIdList.filter(function(e){return 0!==e});n.push(i.dotInfo.id),o.push({id:t,rolesIdList:n})}}),Object(s.j)(o).then(function(e){i.$message.success("保存成功"),i.closeMe(),i.$emit("success"),i.loading=!1}).catch(function(e){i._handlerCatchMsg(e)})}}}},dI7A:function(e,t){},sLXT:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("czv6"),o=n("3ZBm");var s=function(e){n("dI7A")},l=n("VU/8")(i.a,o.a,s,null,null);t.default=l.exports}});