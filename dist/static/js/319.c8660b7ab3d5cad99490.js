webpackJsonp([319],{"5dwe":function(e,t,s){"use strict";var o=s("Dd8w"),i=s.n(o),n=s("u8ra"),r=s("P5Di"),a=s("NYxO");t.a={components:{popRight:r.a},props:{popVisible:{type:Boolean,default:!1},users:{type:Array,default:[]}},computed:i()({},Object(a.mapGetters)(["otherinfo"]),{myusers:function(){var t=this;return console.log("users",this.users),this.form.users={},this.users.map(function(e){t.$set(t.form.users,e.id,e.rolesIdList)}),this.users}}),data:function(){return{form:{rolesId:[],users:{}},loading:!1,roles:[],inited:!1}},watch:{popVisible:function(e){e&&(this.inited||(this.inited=!0,this.initInfo()))}},methods:{initInfo:function(){var t=this;return this.loading=!0,Object(n.e)(this.otherinfo.orgid).then(function(e){t.roles=e.list,t.loading=!1}).catch(function(e){t.loading=!1,t.inited=!1,t._handlerCatchMsg(e)})},submitForm:function(){var t=this;console.log("closeMe1"),this.loading=!0;var e=[];for(var s in this.form.users)e.push({id:s,rolesId:this.form.users[s].join(",")});Object(n.l)(e).then(function(e){t.loading=!1,t.$message.success("保存成功"),t.closeMe(),t.$emit("success")}).catch(function(e){t.loading=!1,t._handlerCatchMsg(e)})},closeMe:function(){console.log("closeMe2"),this.form.users={},this.$emit("update:popVisible",!1)},getId:function(e,t){console.log("change:: ",e,t)}}}},awDT:function(e,t){},pajN:function(e,t,s){"use strict";var o={render:function(){var s=this,e=s.$createElement,o=s._self._c||e;return o("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:s.loading,expression:"loading"}],staticClass:"setUserAuthPop",attrs:{title:"员工授权",isShow:s.popVisible},on:{close:s.closeMe}},[o("template",{staticClass:"setUserAuthPop-content",slot:"content"},[o("table",[o("thead",[o("tr",[o("th",[s._v("员工")]),s._v(" "),o("th",[s._v("权限角色")])])]),s._v(" "),o("tbody",s._l(s.myusers,function(t){return o("tr",{key:t.username},[o("td",[s._v("\n            "+s._s(t.name)+"\n          ")]),s._v(" "),o("td",[o("el-select",{attrs:{size:"mini",multiple:"",placeholder:"请选择权限"},on:{change:function(e){s.getId(t.id)}},model:{value:s.form.users[t.id],callback:function(e){s.$set(s.form.users,t.id,e)},expression:"form.users[user.id]"}},s._l(s.roles,function(e){return o("el-option",{key:e.id,attrs:{label:e.roleName,value:e.id}})}))],1)])}))])]),s._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:function(e){s.submitForm()}}},[s._v("保存")]),s._v(" "),o("el-button",{on:{click:s.closeMe}},[s._v("取 消")])],1)],2)},staticRenderFns:[]};t.a=o},qz27:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("5dwe"),i=s("pajN");var n=function(e){s("awDT")},r=s("VU/8")(o.a,i.a,n,null,null);t.default=r.exports}});