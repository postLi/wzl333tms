webpackJsonp([255],{"2uhx":function(t,e,i){"use strict";var o={render:function(){var i=this,t=i.$createElement,o=i._self._c||t;return o("pop-right",{directives:[{name:"loading",rawName:"v-loading",value:i.loading,expression:"loading"}],staticClass:"trackInfoPop",attrs:{title:i.popTitle,isShow:i.popVisible},on:{close:i.closeMe}},[o("template",{slot:"content"},[o("div",{staticClass:"info_box_transfer"},[o("el-row",{staticClass:"stepItem_title"},[o("el-col",{staticClass:"tracktype",attrs:{span:5}},[i._v("类型")]),i._v(" "),o("el-col",{attrs:{span:4}},[i._v("操作时间")]),i._v(" "),o("el-col",{attrs:{span:4}},[i._v("操作网点")]),i._v(" "),o("el-col",{attrs:{span:3}},[i._v("操作人")]),i._v(" "),o("el-col",{attrs:{span:8}},[i._v("操作信息")])],1),i._v(" "),o("div",{staticClass:"stepinfo"},[o("el-steps",{attrs:{direction:"vertical"}},i._l(i.trackDetail,function(e,t){return o("el-step",{key:t,class:{firstactive:0===t},nativeOn:{mouseover:function(t){return i.setThisActive(t)},mouseout:function(t){return i.offThisActive(t)}}},[o("span",{staticClass:"location",attrs:{slot:"icon"},slot:"icon"}),i._v(" "),o("template",{slot:"description"},[o("el-row",{staticClass:"stepItem"},[o("el-col",{attrs:{span:5}},[o("span",{staticClass:"typebox"},[i._v(i._s(e.trackNode))]),i._v(" "),1===e.trackType?[o("span",{staticClass:"modifybtn",attrs:{title:"编辑"},on:{click:function(t){i.editItem(e)}}}),i._v(" "),o("span",{staticClass:"deletebtn",attrs:{title:"删除"},on:{click:function(t){i.deleteTrack(e)}}})]:i._e()],2),i._v(" "),o("el-col",{attrs:{span:4}},[o("p",[i._v(i._s(i._f("parseTime")(e.createTime,"{y}-{m}-{d} {h}:{i}:{s}")))])]),i._v(" "),o("el-col",{attrs:{span:3}},[o("p",[i._v(i._s(e.orgName))])]),i._v(" "),o("el-col",{attrs:{span:4}},[o("p",[1===e.addStatus?o("i",{staticClass:"track-human"}):o("i",{staticClass:"icon_blank"}),i._v(" "+i._s(e.trackDetailed)+"\n                  ")])]),i._v(" "),o("el-col",{attrs:{span:8}},[o("p",[i._v(i._s(e.trackInfo))])])],1)],1)],2)}))],1)],1)]),i._v(" "),o("div",{staticClass:"stepinfo-footer stepFrom",attrs:{slot:"footer"},slot:"footer"},[o("el-form",{ref:"formModel",attrs:{inline:"",model:i.formModel,rules:i.ruleForm}},[o("el-form-item",{attrs:{label:"类型",prop:"trackNode"}},[o("el-input",{attrs:{maxlength:10,placeholder:"类型",size:"mini"},model:{value:i.formModel.trackNode,callback:function(t){i.$set(i.formModel,"trackNode",t)},expression:"formModel.trackNode"}})],1),i._v(" "),o("el-form-item",{attrs:{label:"时间",prop:"createTime"}},[o("el-date-picker",{attrs:{type:"datetime",placeholder:"选择时间",size:"mini"},model:{value:i.formModel.createTime,callback:function(t){i.$set(i.formModel,"createTime",t)},expression:"formModel.createTime"}})],1),i._v(" "),o("el-form-item",{attrs:{label:"操作信息",prop:"trackInfo"}},[o("el-input",{attrs:{maxlength:250,placeholder:"操作信息",size:"mini"},model:{value:i.formModel.trackInfo,callback:function(t){i.$set(i.formModel,"trackInfo",t)},expression:"formModel.trackInfo"}})],1),i._v(" "),o("el-form-item",{staticClass:"tracksavebtn"},[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){i.submitForm("formModel")}}},[i._v("保 存")]),i._v(" "),o("transition",{attrs:{name:"el-zoom-in-center"}},[i.isModify?o("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(t){i.resetForm()}}},[i._v("取 消")]):i._e()],1)],1)],1)],1)],2)},staticRenderFns:[]};e.a=o},FOOn:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("rRK3"),s=i("2uhx");var a=function(t){i("Pcqt")},r=i("VU/8")(o.a,s.a,a,null,null);e.default=r.exports},Pcqt:function(t,e){},bOdI:function(t,e,i){"use strict";e.__esModule=!0;var o,s=i("C4MV"),a=(o=s)&&o.__esModule?o:{default:o};e.default=function(t,e,i){return e in t?(0,a.default)(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}},rRK3:function(t,e,i){"use strict";var o=i("bOdI"),s=i.n(o),a=(i("E4LH"),i("P5Di")),r=i("OHys"),n=(i("NYxO"),i("t5DY")),c=i("0xDb");e.a={components:{popRight:a.a},props:{popVisible:{type:Boolean,default:!1},orgid:{required:!0},id:{type:[Number,String]},shipId:{type:[Number,String]}},data:function(){return s()({popTitle:"在途跟踪",loading:!0,isModify:!1,infoId:{},trackDetail:[],formModel:{},ruleForm:{trackNode:[{required:!0,trigger:"blur",message:"不能为空"}],createTime:[{required:!0,trigger:"blur",message:"不能为空"}],trackInfo:[{required:!0,trigger:"blur",message:"不能为空"}]},isShowBtn:!0,isFootEdit:!0},"formModel",{createTime:"",orgid:"",shipId:"",trackDetailed:"",trackInfo:"",trackNode:"",trackType:1})},watch:{id:function(){},shipId:function(t){t&&(console.log("shipId",t),this.getDetail(),this.getSystemTime())},popVisible:function(t,e){this.popVisible&&(this.getDetail(),this.getSystemTime())}},methods:{submitForm:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.formModel.id?e.$confirm("此操作将修改跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.editTrack()}):e.$confirm("此操作将添加跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.addTrack()}))})},getDetail:function(){var e=this,t=(this.id,this.shipId);r.a.getShipTrackinfo(t).then(function(t){e.trackDetail=t,e.loading=!1}).catch(function(t){e.loading=!1,e._handlerCatchMsg(t)})},closeMe:function(t){this.$emit("update:popVisible",!1),"function"==typeof t&&t()},deleteTrack:function(t){var e=this;this.$confirm("此操作将删除本跟踪信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.a.deleteTrackinfo(t.id).then(function(t){e.$message({type:"success",message:"删除成功"}),e.getDetail()}).catch(function(t){e._handlerCatchMsg(t)})})},editItem:function(t){this.formModel=Object(c.objectMerge2)({},t),this.isModify=!0},editTrack:function(){var e=this;this.formModel.createTime=Object(c.parseTime)(this.formModel.createTime,"{y}-{m}-{d} {h}:{i}:{s}"),console.log(this.formModel.createTime),r.a.putTrackinfo(this.formModel).then(function(t){e.$message({type:"success",message:"修改成功"}),e.getDetail(),e.resetForm()}).catch(function(t){e._handlerCatchMsg(t)})},addTrack:function(){var e=this,t=Object(c.objectMerge2)({},this.formModel);t.createTime=Object(c.parseTime)(+new Date(t.createTime),"{y}-{m}-{d} {h}:{i}:{s}"),t.shipId=this.shipId,t.orgid=this.otherinfo.orgid,console.log(t.createTime),r.a.postTrackinfo(t).then(function(t){e.$message({type:"success",message:"添加成功"}),e.getDetail(),e.resetForm()}).catch(function(t){e._handlerCatchMsg(t)})},getSystemTime:function(){var e=this;this.formModel.id||Object(n.f)().then(function(t){e.formModel.createTime=new Date(t.trim()),console.log("系统：",e.formModel.createTime)}).catch(function(t){e._handlerCatchMsg(t)})},resetForm:function(){var t=this;this.$nextTick(function(){t.isModify=!1,t.$refs.formModel.resetFields(),t.formModel=t.$options.data().formModel,t.getSystemTime()})},offThisActive:function(t){var e=Object(c.closest)(t.target,".el-step");e&&e.classList.remove("trackactive")},setThisActive:function(t){var e=Object(c.closest)(t.target,".el-step");e&&e.classList.add("trackactive")}}}}});
//# sourceMappingURL=255.14583dc8b9654225299f.js.map