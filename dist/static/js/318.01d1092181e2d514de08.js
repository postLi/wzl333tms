webpackJsonp([318],{"5dwe":function(t,e,s){"use strict";var i=s("Dd8w"),o=s.n(i),n=s("u8ra"),r=s("P5Di"),a=s("NYxO");e.a={components:{popRight:r.a},props:{popVisible:{type:Boolean,default:!1},users:{type:Array,default:[]}},computed:o()({},Object(a.mapGetters)(["otherinfo"]),{myusers:function(){var e=this;return console.log("users",this.users),this.form.users={},this.users.map(function(t){e.$set(e.form.users,t.id,t.rolesIdList)}),this.users}}),data:function(){return{form:{rolesId:[],users:{}},loading:!1,roles:[],inited:!1}},watch:{popVisible:function(t){this.inited||(this.inited=!0,this.initInfo())}},mounted:function(){this.inited||(this.inited=!0,this.initInfo())},methods:{initInfo:function(){var e=this;return this.loading=!0,Object(n.e)(this.otherinfo.orgid).then(function(t){e.roles=t.list,e.loading=!1}).catch(function(t){e.loading=!1,e.inited=!1,e._handlerCatchMsg(t)})},submitForm:function(){var e=this;console.log("closeMe1"),this.loading=!0;var t=[];for(var s in this.form.users)t.push({id:s,rolesId:this.form.users[s].join(",")});Object(n.k)(t).then(function(t){e.loading=!1,e.$message.success("保存成功"),e.closeMe(),e.$emit("success")}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},closeMe:function(){console.log("closeMe2"),this.form.users={},this.$emit("update:popVisible",!1)},getId:function(t,e){console.log("change:: ",t,e)}}}},awDT:function(t,e){},pajN:function(t,e,s){"use strict";var i={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:s.loading,expression:"loading"}],staticClass:"setUserAuthPop",attrs:{title:"员工授权",isShow:s.popVisible},on:{close:s.closeMe}},[i("template",{staticClass:"setUserAuthPop-content",slot:"content"},[i("table",[i("thead",[i("tr",[i("th",[s._v("员工")]),s._v(" "),i("th",[s._v("权限角色")])])]),s._v(" "),i("tbody",s._l(s.myusers,function(e){return i("tr",{key:e.username},[i("td",[s._v("\n            "+s._s(e.name)+"\n          ")]),s._v(" "),i("td",[i("el-select",{attrs:{size:"mini",multiple:"",placeholder:"请选择权限"},on:{change:function(t){s.getId(e.id)}},model:{value:s.form.users[e.id],callback:function(t){s.$set(s.form.users,e.id,t)},expression:"form.users[user.id]"}},s._l(s.roles,function(t){return i("el-option",{key:t.id,attrs:{label:t.roleName,value:t.id}})}))],1)])}))])]),s._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){s.submitForm()}}},[s._v("保存")]),s._v(" "),i("el-button",{on:{click:s.closeMe}},[s._v("取 消")])],1)],2)},staticRenderFns:[]};e.a=i},qz27:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("5dwe"),o=s("pajN");var n=function(t){s("awDT")},r=s("VU/8")(i.a,o.a,n,null,null);e.default=r.exports}});