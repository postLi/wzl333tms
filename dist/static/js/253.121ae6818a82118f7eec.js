webpackJsonp([253],{"1gcj":function(t,e){},BNTJ:function(t,e,i){"use strict";var s={render:function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"remarksPopSetup",attrs:{title:"常用备注",visible:i.popVisible,"custom-class":"feeSetupDialog","close-on-click-modal":!1,"modal-append-to-body":!1,"append-to-body":"",width:"300px","before-close":i.close},on:{open:i.getRemarkSetup}},[s("div",{staticClass:"setup-info-remark"},[i.isAdd?s("div",{staticClass:"addNew"},[s("el-input",{attrs:{size:"mini"},model:{value:i.newItem,callback:function(t){i.newItem="string"==typeof t?t.trim():t},expression:"newItem"}}),s("el-button",{staticClass:"add-btn",attrs:{size:"mini",icon:"el-icon-check"},on:{click:i.addItem}}),s("el-button",{staticClass:"delete-btn",attrs:{size:"mini",icon:"el-icon-close"},on:{click:i.reset}})],1):i._e(),i._v(" "),s("ul",i._l(i.remarksData,function(e,t){return s("li",{key:t},[i.isedit?s("div",{staticClass:"remarks-edit"},[s("el-input",{attrs:{size:"mini",value:e.value},on:{change:function(t){i.changeItem(e.id,t)}}}),i._v(" "),s("el-button",{staticClass:"add-btn",attrs:{size:"mini",icon:"el-icon-check"},on:{click:function(t){i.modifyItem(e.id)}}}),i._v(" "),s("el-button",{staticClass:"delete-btn",attrs:{size:"mini",icon:"el-icon-close"},on:{click:function(t){i.deleteItem(e.id)}}})],1):s("div",{staticClass:"remark-info",attrs:{title:e.value}},[i._v(i._s(e.value))])])}))]),i._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i.isAdd?i._e():s("el-button",{attrs:{size:"mini"},on:{click:i.canAdd}},[i._v("添 加")]),i._v(" "),i.isedit?i._e():s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:i.canEdit}},[i._v("编 辑")]),i._v(" "),i.isedit||i.isAdd?s("el-button",{attrs:{size:"mini",type:"info"},on:{click:i.reset}},[i._v("返 回")]):i._e()],1)])},staticRenderFns:[]};e.a=s},pSyG:function(t,e,i){"use strict";var s=i("OHys");e.a={props:{popVisible:{type:Boolean,default:!1}},computed:{searchList:function(){var e=this;return this.query?this.remarksData.filter(function(t){return-1!==t.name.indexOf(e.query)}):[]}},data:function(){return{remarksData:[],query:"",loading:!1,isedit:!1,newItem:"",modifyObj:{},isAdd:!1}},methods:{close:function(t){this.reset(),this.$emit("update:popVisible",!1),this.$emit("close"),"function"==typeof t&&t()},reset:function(){this.isedit&&this.getRemarkSetup(),this.isedit=!1,this.isAdd=!1,this.newItem=""},addItem:function(t){var e=this;""!==this.newItem?s.a.postRemark({type:3,userId:this.otherinfo.id,value:this.newItem}).then(function(t){e.newItem="",e.$message.success("添加成功~"),e.getRemarkSetup()}).catch(function(t){e.$message.error("出错了："+t.text)}):this.$message.warning("请先填写内容~")},changeItem:function(t,e){this.modifyObj[t]=e},modifyItem:function(t){var e=this;this.modifyObj[t]?s.a.putRemark(t,{value:this.modifyObj[t]}).then(function(t){e.$message.success("修改成功")}).catch(function(t){e.$message.error("修改失败："+t.text)}):this.$message.warning("不能修改为空！")},deleteItem:function(t){var e=this;this.$confirm("确定要删除id: "+t+" 这条吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){s.a.deleteRemark(t).then(function(t){e.$message({type:"success",message:"删除成功!"}),e.getRemarkSetup()}).catch(function(t){e.$message({type:"info",message:"删除失败，原因："+(t.text?t.text:t)})})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},getRemarkSetup:function(){var e=this;return this.loading=!0,s.a.getRemarkList().then(function(t){e.remarksData=t.list,t.list.forEach(function(t){e.modifyObj[t.id]=t.value}),e.loading=!1})},canEdit:function(){this.isedit=!0,this.isAdd=!1},canAdd:function(){this.isAdd=!0,this.isedit=!1}}}},uRhD:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("pSyG"),n=i("BNTJ");var a=function(t){i("1gcj")},o=i("VU/8")(s.a,n.a,a,null,null);e.default=o.exports}});