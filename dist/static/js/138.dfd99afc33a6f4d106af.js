webpackJsonp([138,269],{"/2Zc":function(e,t,i){"use strict";var n={render:function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("el-form",{ref:"searchForm",staticClass:"tableHeadItemForm",attrs:{inline:"","label-position":"right",model:i.searchForm,"label-width":"70px"}},[t("el-form-item",{attrs:{label:"目的网点"}},[t("el-autocomplete",{attrs:{size:i.btnsize,"popper-class":"popperHide","fetch-suggestions":function(e,t){return i.querySearch("shipToOrgName",e,t)},placeholder:"到站搜索"},on:{select:i.handleSelect},nativeOn:{keyup:function(e){return"button"in e||!i._k(e.keyCode,"enter",13,e.key,"Enter")?i.handleSelectAll(e):null}},model:{value:i.searchForm.shipToOrgName,callback:function(e){i.$set(i.searchForm,"shipToOrgName",e)},expression:"searchForm.shipToOrgName"}})],1),i._v(" "),t("el-form-item",{attrs:{label:"到站"}},[t("el-autocomplete",{attrs:{size:i.btnsize,"popper-class":"popperHide","fetch-suggestions":function(e,t){return i.querySearch("shipToCityName",e,t)},placeholder:"到站搜索"},on:{select:i.handleSelect},nativeOn:{keyup:function(e){return"button"in e||!i._k(e.keyCode,"enter",13,e.key,"Enter")?i.handleSelectAll(e):null}},model:{value:i.searchForm.shipToCityName,callback:function(e){i.$set(i.searchForm,"shipToCityName",e)},expression:"searchForm.shipToCityName"}})],1),i._v(" "),t("el-form-item",{staticClass:"curSearchShipSn",attrs:{label:"运单号"}},[t("el-autocomplete",{attrs:{size:i.btnsize,"popper-class":"popperHide","fetch-suggestions":function(e,t){return i.querySearch("shipSn",e,t)},placeholder:"运单号搜索"},on:{select:i.handleSelect},nativeOn:{keyup:function(e){return"button"in e||!i._k(e.keyCode,"enter",13,e.key,"Enter")?i.handleSelectAll(e):null}},model:{value:i.searchForm.shipSn,callback:function(e){i.$set(i.searchForm,"shipSn",e)},expression:"searchForm.shipSn"}})],1)],1)},staticRenderFns:[]};t.a=n},"2Um6":function(e,t,i){"use strict";var n=i("woOf"),r=i.n(n),l=i("pAQG"),o=i("o9X6"),a=i("0xDb");t.a={components:{querySelect:l.a,SelectTree:o.a},data:function(){return{senderSearch:"",searchForm:{shipToCityName:"",shipSn:"",shipToOrgName:""},btnsize:"mini",selectVal:"",resultList:[]}},props:{info:{type:Array,default:[]},showSearch:{type:String,default:""}},methods:{changeTree:function(e,t){console.log("changeTree",e,t);var i=t.name,n=this.commonFilter("shipToOrgName",i),l=[];n.forEach(function(e){l.push(e)}),this.resultList=r()([],l),this.$emit("change",l),1===l.length&&this.handleSelectAll()},commonFilter:function(e,t){var i=this.info;for(var n in this.searchForm[e]=t,this.selectVal=e,this.searchForm)void 0!==this.searchForm[n]&&""!==this.searchForm[n]||this.$emit("change",Object(a.objectMerge2)([],this.info));return t?i.filter(this.createFilter(new RegExp(t,"gi"),e)):i},querySearch:function(e,t,i){console.log(e,t);var n=this.commonFilter(e,t);i(n);var l=[];n.forEach(function(e){l.push(e)}),this.resultList=r()([],l),this.$emit("change",l),1===l.length&&"shipSn"===e&&this.handleSelectAll()},createFilter:function(t,i){return function(e){return t.test(e[i])}},handleSelect:function(e){this.searchForm[this.selectVal]=e[this.selectVal],this.selectVal="";var t=[];t.push(e),this.$emit("change",t)},clearSender:function(e){this.searchForm=this.$options.data().searchForm},handleSelectAll:function(){var e=this;clearTimeout(this.ttimer),this.ttimer=setTimeout(function(){(e.searchForm.shipSn||e.searchForm.shipToCityName||e.searchForm.shipToOrgName)&&e.resultList.length&&(e.$emit("keyupEneter"),e.searchForm=e.$options.data().searchForm)},500)}}}},"5hGn":function(e,t){},"7ueC":function(e,t){},"9cTb":function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"transferTable"},[i("div",{staticClass:"transferTable_header"},[i("div",{staticClass:"transferTable_searchs"},[i("div",{staticClass:"transferTable_fresh"},[t._t("tableRefresh")],2),t._v(" "),t._t("tableSearch")],2),t._v(" "),i("div",{staticClass:"transferTable_header_btn_direction"},[i("el-tooltip",{attrs:{effect:"dark",content:"向左侧拉伸",placement:"top-end"}},[i("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-arrow-right",type:"primary",circle:"",disabled:t.isShowLeft,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllLeft")}}})],1),t._v(" "),i("el-tooltip",{attrs:{effect:"dark",content:"向右侧拉伸",placement:"top-start"}},[i("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-arrow-left",type:"primary",circle:"",disabled:t.isShowRight,size:"mini",plain:""},on:{click:function(e){t.doAction("showAllRight")}}})],1),t._v(" "),i("transition",{attrs:{name:"el-zoom-in-bottom"}},[t.isShowReback?i("el-button",{staticClass:"btn-leftright",attrs:{icon:"el-icon-refresh",type:"primary",circle:"",size:"mini",plain:""},on:{click:function(e){t.doAction("showReback")}}}):t._e()],1),t._v(" "),i("div",{staticClass:"transferTable_header_btn_box clearfix"},[t._t("btnsBox")],2)],1)]),t._v(" "),i("div",{staticClass:"transferTable_content"},[i("div",{staticClass:"transferTable_content_table paddingRight",class:t.leftTableClass},[t._t("tableLeft",[t._v("左边表格区")])],2),t._v(" "),i("div",{staticClass:"transferTable_content_table",class:t.rightTableClass},[t._t("tableRight",[t._v("右边表格区")])],2)])])},staticRenderFns:[]};t.a=n},FrGO:function(e,t,i){"use strict";var n=i("woOf"),l=i.n(n),r=i("Dd8w"),o=i.n(r),a=i("bOdI"),s=i.n(a),h=i("NYxO"),c=(i("TsW9"),i("IcMT")),d=i("0xDb"),g=i("sJaV"),u=i("0xDb"),f=i("lRwf"),m=i.n(f);t.a={data:function(){var e;return e={searchQuery:{},loading:!1,tablekey:"",loadTruck:"",truckMessage:"",formModel:{}},s()(e,"loadTruck","loadTruckOne"),s()(e,"btnsize","mini"),s()(e,"selectedRight",[]),s()(e,"selectedLeft",[]),s()(e,"orgLeftTable",[]),s()(e,"leftTable",[]),s()(e,"rightTable",[]),s()(e,"orgData",{left:[],right:[]}),s()(e,"isOrgLeftTable",!0),s()(e,"isCountFooter",!0),s()(e,"orgcolumnsLeft",[{field:"number",title:"序号",width:60,isFrozen:!0,titleAlign:"center",columnAlign:"center",formatter:function(e,t,i,n){return t+1}},{field:"customeAdv",title:"",width:50,titleAlign:"center",columnAlign:"center",isFrozen:!0,componentName:"addItemBtn"},{field:"shipGoodsSn",title:"货号",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipFromOrgName",title:"开单网点",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipDeliveryMethodName",title:"交接方式",width:90,titleAlign:"center",columnAlign:"center"},{field:"shipSn",title:"运单号",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipArrivepayFee",title:"到付(元)",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipTotalFee",title:"运费合计(元)",width:140,titleAlign:"center",columnAlign:"center"},{field:"brokerageFee",title:"回扣(元)",width:140,titleAlign:"center",columnAlign:"center"},{field:"shipFromCityName",title:"发站",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipToCityName",title:"到站",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipSenderName",title:"发货人",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipSenderMobile",title:"发货人电话",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipReceiverName",title:"收货人",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipReceiverMobile",title:"收货人电话",width:120,titleAlign:"center",columnAlign:"center"},{field:"cargoName",title:"货品名",width:120,titleAlign:"center",columnAlign:"center"},{field:"cargoPack",title:"包装",width:120,titleAlign:"center",columnAlign:"center"},{field:"repertoryAmount",title:"库存件数",width:120,titleAlign:"center",columnAlign:"center"},{field:"repertoryWeight",title:"库存重量(千克)",width:140,titleAlign:"center",columnAlign:"center"},{field:"repertoryVolume",title:"库存体积(方)",width:140,titleAlign:"center",columnAlign:"center"},{field:"cargoAmount",title:"运单件数",width:120,titleAlign:"center",columnAlign:"center"},{field:"cargoWeight",title:"运单重量(千克)",width:140,titleAlign:"center",columnAlign:"center"},{field:"cargoVolume",title:"运单体积(方)",width:140,titleAlign:"center",columnAlign:"center"},{field:"shipRemarks",title:"运单备注",width:120,titleAlign:"center",columnAlign:"center"}]),s()(e,"orgcolumnsRight",[{field:"number",title:"序号",width:60,isFrozen:!0,titleAlign:"center",columnAlign:"center",formatter:function(e,t,i,n){return t+1}},{field:"customeAdv",title:"",width:50,titleAlign:"center",columnAlign:"center",isFrozen:!0,componentName:"minusItemBtn"},{field:"shipGoodsSn",title:"货号",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipFromOrgName",title:"开单网点",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipDeliveryMethodName",title:"交接方式",width:90,titleAlign:"center",columnAlign:"center"},{field:"shipSn",title:"运单号",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipArrivepayFee",title:"到付(元)",width:120,titleAlign:"center",columnAlign:"center"},{field:"handlingFee",title:"操作费(元)",width:140,hide:!0,titleAlign:"center",columnAlign:"center",componentName:"expandInput"},{field:"deliveryFeeToPay",title:"实付送货费(元)",width:140,hide:!0,titleAlign:"center",columnAlign:"center",componentName:"expandInput"},{field:"loadAmount",title:"配载件数",width:120,hide:!0,titleAlign:"center",columnAlign:"center",componentName:"expandInput"},{field:"loadWeight",title:"配载重量(千克)",width:120,hide:!0,titleAlign:"center",columnAlign:"center",componentName:"expandInput"},{field:"loadVolume",title:"配载体积(方)",width:120,hide:!0,titleAlign:"center",columnAlign:"center",componentName:"expandInput"},{field:"shipTotalFee",title:"运费合计(元)",width:120,titleAlign:"center",columnAlign:"center"},{field:"brokerageFee",title:"回扣(元)",width:120,titleAlign:"center",columnAlign:"center"},{field:"repertoryAmount",title:"库存件数",width:120,titleAlign:"center",columnAlign:"center"},{field:"repertoryWeight",title:"库存重量(千克)",width:140,titleAlign:"center",columnAlign:"center"},{field:"repertoryVolume",title:"库存体积(方)",width:140,titleAlign:"center",columnAlign:"center"},{field:"cargoAmount",title:"运单件数",width:120,titleAlign:"center",columnAlign:"center"},{field:"cargoWeight",title:"运单重量(千克)",width:140,titleAlign:"center",columnAlign:"center"},{field:"cargoVolume",title:"运单体积(方)",width:140,titleAlign:"center",columnAlign:"center"},{field:"shipRemarks",title:"运单备注",width:120,titleAlign:"center",columnAlign:"center"},{field:"cargoPack",title:"包装",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipFromCityName",title:"发站",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipToCityName",title:"到站",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipSenderName",title:"发货人",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipSenderMobile",title:"发货人电话",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipReceiverName",title:"收货人",width:120,titleAlign:"center",columnAlign:"center"},{field:"shipReceiverMobile",title:"收货人电话",width:120,titleAlign:"center",columnAlign:"center"},{field:"cargoName",title:"货品名",width:120,titleAlign:"center",columnAlign:"center"}]),s()(e,"footerLeft",[[]]),s()(e,"footerRight",[[]]),e},props:{setLoadTable:{type:Object,default:function(){}},isModify:{type:Boolean,default:!1},handlingFeeInfo:{type:Object,default:function(){}},isRestorage:{type:Boolean,default:!1}},computed:o()({},Object(h.mapGetters)(["otherinfo"]),{loadTypeId:{get:function(){return Number(this.$route.query.loadTypeId)},set:function(){}},columnsLeft:function(){return this.orgcolumnsLeft},columnsRight:function(){var t=this;return this.orgcolumnsRight.filter(function(e){return!e.hide||("handlingFee"!==e.field||40!==t.loadTypeId)&&("deliveryFeeToPay"!==e.field||40===t.loadTypeId)})}}),components:{transferTable:c.a,currentSearch:g.default},watch:{isModify:{handler:function(e,t){this.getList()},immediate:!0},setLoadTable:{handler:function(e,t){e&&(this.orgData=Object(d.objectMerge2)({},e),this.getList())},deep:!0},handlingFeeInfo:{handler:function(e,t){if(this.$route.query){if(!e.handlingFeeAll||0===this.rightTable.length)return;this.countHandingFee(),this.setBothFooterData()}},deep:!0}},mounted:function(){this.getList()},methods:{changeKeyLeft:function(e){this.total=0,this.searchQuery=e,this.loading},resizeVTable:function(){var e=this;this.loading=!0,setTimeout(function(){e.isOrgLeftTable?e.$refs.orgLeftTable.resize():e.$refs.leftTable.resize(),e.$refs.rightTable.resize(),e.loading=!1},900)},countHandingFee:function(){var n=this;if(this.handlingFeeInfo.apportionTypeId&&this.handlingFeeInfo.handlingFeeAll&&!(this.rightTable.length<1)){var l=this.handlingFeeInfo;switch(l.params=40===Number(this.$route.query.loadTypeId)?"deliveryFeeToPay":"handlingFee",this.handlingFeeInfo.apportionTypeId){case 45:var r=0,o=0;this.rightTable.forEach(function(e){r=u.tmsMath._add(r,e.brokerageFee?e.brokerageFee:0),o=u.tmsMath._add(o,e.shipTotalFee?e.shipTotalFee:0)}),this.rightTable.forEach(function(e,t){var i=u.tmsMath._sub(e.shipTotalFee,e.brokerageFee);e[l.params]=i<0?0:n.calc(u.tmsMath._mul(u.tmsMath._div(u.tmsMath._sub(e.shipTotalFee,e.brokerageFee),u.tmsMath._sub(o,r)),n.handlingFeeInfo.handlingFeeAll))});break;case 44:this.rightTable.forEach(function(e,t){e[l.params]=n.calc(u.tmsMath._div(n.handlingFeeInfo.handlingFeeAll,n.rightTable.length))});break;case 43:var i=0;this.rightTable.map(function(e){i=u.tmsMath._add(i,e.loadWeight)}),this.rightTable.forEach(function(e,t){e[l.params]=n.calc(u.tmsMath._mul(u.tmsMath._div(e.loadWeight,i),n.handlingFeeInfo.handlingFeeAll))});break;case 42:var a=0;this.rightTable.map(function(e){a=u.tmsMath._add(a,e.loadVolume)}),this.rightTable.forEach(function(e,t){e[l.params]=n.calc(u.tmsMath._mul(u.tmsMath._div(e.loadVolume,a),n.handlingFeeInfo.handlingFeeAll))});break;case 41:var s=0;this.rightTable.map(function(e){s=u.tmsMath._add(s,e.loadAmount)}),this.rightTable.forEach(function(e,t){e[l.params]=n.calc(u.tmsMath._mul(u.tmsMath._div(e.loadAmount,s),n.handlingFeeInfo.handlingFeeAll))})}var h=0,c=0,e=this.rightTable.length;this.rightTable.forEach(function(e,t){(h=u.tmsMath._add(h,e[l.params]))>n.handlingFeeInfo.handlingFeeAll&&(e[l.params]=u.tmsMath._sub(e[l.params],u.tmsMath._sub(h,n.handlingFeeInfo.handlingFeeAll))),e[l.params]=e[l.params]?e[l.params]:0,0===e[l.params]&&c++}),h<this.handlingFeeInfo.handlingFeeAll&&(this.rightTable[this.rightTable.length-1][l.params]=u.tmsMath._add(this.rightTable[this.rightTable.length-1][l.params],u.tmsMath._sub(this.handlingFeeInfo.handlingFeeAll,h))),this.handlingFeeInfo.apportionTypeId&&this.handlingFeeInfo.handlingFeeAll&&c===e&&(this.$notify.info({title:"消息",message:"运单相关数据不足以分摊操作，默认为【按票数分摊】。"}),this.$emit("resetHandlingFeeInfo",{apportionTypeId:44}))}},calc:function(e){return u.tmsMath._div(Math.round(u.tmsMath._mul(e,100)),100)},getList:function(){console.log("getList1",this.isModify),this.leftTable=this.$options.data().leftTable,this.rightTable=this.$options.data().rightTable,this.orgLeftTable=this.$options.data().orgLeftTable,this.isModify?console.log("getList2"):console.log("getList3"),this.leftTable=this.orgData.left,this.rightTable=this.orgData.right,this.orgLeftTable=this.orgData.left,this.$emit("loadTable",this.rightTable),this.$emit("repertoryList",this.orgLeftTable),this.setBothFooterData()},regetList:function(){this.$emit("reset")},getSearch:function(e){this.isOrgLeftTable=!1,this.leftTable=e,this.setBothFooterData()},getSearchEnter:function(){this.isOrgLeftTable=!0,this.leftTable.length&&this.addALLList(),this.leftTable=l()([],this.orgLeftTable),this.setBothFooterData()},clickDetailsRight:function(e){this.$refs.multipleTableRight.toggleRowSelection(e)},clickDetailsLeft:function(e){this.$refs.multipleTableLeft.toggleRowSelection(e)},getSelectionRight:function(e){this.selectedRight=e},getSelectionLeft:function(e){this.selectedLeft=e},changeTableKey:function(){this.tablekey=Math.random()},doAction:function(e){switch(e){case"goLeft":this.goLeft();break;case"goRight":this.goRight()}},changLoadData:function(e,t,i){console.log(e,t,i),this.$set(this.rightTable[e],i,Number(t)||""),console.log(this.rightTable[e][i]);var n=this.rightTable[e].loadAmount,l=this.rightTable[e].loadWeight,r=this.rightTable[e].loadVolume,o=this.rightTable[e].repertoryAmount,a=this.rightTable[e].repertoryWeight,s=this.rightTable[e].repertoryVolume;return o<n||n<1||a<l||l<0||s<r||r<0?(this.$notify({title:"警告",message:"配载件数不能小于1,配载重量和体积不能小于0,都不能大于库存数量,默认为该库存数量",type:"warning"}),this.rightTable[e].loadAmount=o,this.rightTable[e].loadWeight=a,this.rightTable[e].loadVolume=s):n===o?(this.$notify({title:"提示",message:"配载件数等于该库存大小,即所有配载数量为库存数量",type:"warning"}),this.rightTable[e].loadAmount=o):r===s&&l===a&&(this.$notify({title:"提示",message:"配载重量与配载体积都等于该库存大小,即所有配载数量为库存数量",type:"warning"}),this.rightTable[e].loadWeight=a,this.rightTable[e].loadVolume=s),40!==this.$route.query.loadTypeId&&this.countHandingFee(),this.$emit("loadTable",this.rightTable),this.$emit("repertoryList",this.orgLeftTable),this.setBothFooterData(),this.rightTable[e].loadAmount&&this.rightTable[e].loadWeight&&this.rightTable[e].loadVolume},changHandlingFee:function(e,t,i){var n=Object(d.objectMerge2)({},this.handlingFeeInfo);n.params=40===Number(this.$route.query.loadTypeId)?"deliveryFeeToPay":"handlingFee",this.$set(this.rightTable[e],i,Number(t)||""),this.setBothFooterData();var l=0;this.rightTable.forEach(function(e){l=u.tmsMath._add(l,e[i]?e[i]:0)});var r=0,o=n.deliveryHandlingFee;o&&(0<=(r=l-o)?l=r:n.deliveryHandlingFee=0),n.value=l,n.handlingFeeAll=l,this.$emit("changeHandlingFeeAll",n)},goLeft:function(){var n=this;if(console.log("goLeft 数据从左边穿梭到右边"),0===this.selectedRight.length)this.$message({type:"warning",message:"请在左边表格选择数据"});else{var l=Object(d.objectMerge2)([],this.rightTable),r=Object(d.objectMerge2)([],this.leftTable),o=Object(d.objectMerge2)([],this.orgLeftTable);this.selectedRight.forEach(function(t,e){if(n.$route.query){var i=40===Number(n.$route.query.loadTypeId)?"deliveryFeeToPay":"handlingFee";t[i]=0}t.loadAmount=t.repertoryAmount,t.loadWeight=t.repertoryWeight,t.loadVolume=t.repertoryVolume,(l=l.filter(function(e){return e.repertoryId!==t.repertoryId})).push(t),r=r.filter(function(e){return e.repertoryId!==t.repertoryId}),o=o.filter(function(e){return e.repertoryId!==t.repertoryId})}),this.rightTable=l,this.leftTable=r,this.orgLeftTable=o,this.selectedRight=[],this.countHandingFee(),this.$emit("loadTable",this.rightTable),this.$emit("repertoryList",this.orgLeftTable),this.loading=!1}},goRight:function(){if(console.log("goRight 数据从右边穿梭到左边"),0===this.selectedLeft.length)this.$message({type:"warning",message:"请在右边表格选择数据"});else{var i=Object(d.objectMerge2)([],this.rightTable),n=Object(d.objectMerge2)([],this.leftTable),l=Object(d.objectMerge2)([],this.orgLeftTable);this.selectedLeft.forEach(function(t,e){n=n.filter(function(e){return e.repertoryId!==t.repertoryId}),l=l.filter(function(e){return e.repertoryId!==t.repertoryId}),n.push(t),l.push(t),i=i.filter(function(e){return e.repertoryId!==t.repertoryId})}),this.rightTable=i,this.leftTable=n,this.orgLeftTable=l,this.selectedLeft=[],this.countHandingFee(),this.$emit("loadTable",this.rightTable),this.$emit("repertoryList",this.orgLeftTable),this.loading=!1}},addItem:function(e,t){this.selectedRight=[],this.selectedRight[t]=e,this.doAction("goLeft"),this.setBothFooterData()},minusItem:function(e,t){this.selectedLeft=[],this.selectedLeft[t]=e,this.doAction("goRight"),this.setBothFooterData()},addALLList:function(){this.loading=!0,this.selectedRight=l()([],this.leftTable),this.doAction("goLeft"),this.setBothFooterData()},minusAllList:function(){this.loading=!0,this.selectedLeft=l()([],this.rightTable),this.doAction("goRight"),this.setBothFooterData()},dclickAddItem:function(e,t,i){console.log("row",e,t,i),this.selectedRight=[],this.selectedRight.push(t),this.doAction("goLeft"),this.setBothFooterData()},dclickMinusItem:function(e,t,i){this.selectedLeft=[],this.selectedLeft.push(t),this.doAction("goRight"),this.setBothFooterData()},_processSearch:function(e,t){obj.nextTime=obj.nextTime||300,this.timer&&clearTimeout(this.timer),obj.queryString?this.timer=setTimeout(function(){t()},obj.nextTime):t()},setBothFooterData:function(){var e=this;this.isCountFooter&&(this.timer&&clearTimeout(this.timer),this.isCountFooter=!1,this.timer=setTimeout(function(){e.leftTable.length?e.footerLeft=e.setFooterData({columns:e.columnsLeft,data:Object(d.objectMerge2)([],e.leftTable)},["_index|2|单","brokerageFee","shipTotalFee","shipArrivepayFee|","repertoryAmount|","repertoryWeight|","repertoryVolume|","cargoAmount|","cargoWeight|","cargoVolume|"]):e.footerLeft=[[]],e.rightTable.length?e.footerRight=e.setFooterData({columns:e.columnsRight,data:Object(d.objectMerge2)([],e.rightTable)},["_index|2|单","brokerageFee","shipTotalFee","shipArrivepayFee|","handlingFee","repertoryAmount|","repertoryWeight|","repertoryVolume|","cargoAmount|","cargoWeight|","cargoVolume|","loadAmount|","loadWeight|","loadVolume|"]):e.footerRight=[[]],e.isCountFooter=!0},100))},setFooterData:function(e,t){var i=[],n=Object(u.getSummariesVtable)(e,t);return i.push(n),i},doActionExpandTable:function(e){switch(e.type){case"addItemBtn":this.addItem(e.row,e.index);break;case"minusItemBtn":this.minusItem(e.row,e.index);break;case"expandInput":/(handlingFee|deliveryFeeToPay)/.test(e.field)?this.changHandlingFee(e.index,e.value,e.field):this.changLoadData(e.index,e.value,e.field)}}}},m.a.component("addItemBtn",{template:'<button class="tableItemBtn" size="mini" @click="addItem(rowData, field,index)">\n        </button>',props:{rowData:{type:Object},field:{type:String},index:{type:Number}},methods:{addItem:function(e,t,i){this.$emit("on-custom-comp",{row:e,index:i,type:"addItemBtn"})}}}),m.a.component("minusItemBtn",{template:'<button class="tableItemBtnMinus" size="mini" @click="minusItem(rowData,field, index)">\n        </button>',props:{rowData:{type:Object},field:{type:String},index:{type:Number}},methods:{minusItem:function(e,t,i){this.$emit("on-custom-comp",{row:e,index:i,type:"minusItemBtn"})}}}),m.a.component("expandInput",{template:'<input placeholder="请输入"\n  class="vtableInput"\n  :maxlength="10"\n   v-model.number="rowData[field]" \n  @dblclick.stop.prevent.native \n  @click.stop.prevent.native\n  @change="(e) => handleChange(e.target.value, rowData, field, index)" />',props:{rowData:{type:Object},field:{type:String},index:{type:Number}},methods:{handleChange:function(e,t,i,n){this.$emit("on-custom-comp",{row:t,index:n,type:"expandInput",value:e,field:i})}}})},IcMT:function(e,t,i){"use strict";var n=i("PI8x"),l=i("9cTb");var r=function(e){i("7ueC")},o=i("VU/8")(n.a,l.a,r,"data-v-4bbec734",null);t.a=o.exports},PI8x:function(e,t,i){"use strict";t.a={data:function(){return{loading:!1,isShowLeft:!1,isShowRight:!1,isShowReback:!1,searchForm:""}},computed:{leftTableClass:function(){return this.isShowLeft?"showTableLeft":this.isShowRight?"shortTableLeft":"averageTable"},rightTableClass:function(){return this.isShowRight?"showTableRight":this.isShowLeft?"shortTableRight":"averageTable"}},methods:{doAction:function(e){switch(this.loading=!0,e){case"showAllLeft":this.showAllLeft();break;case"showAllRight":this.showAllRight();break;case"showReback":this.showReback()}this.$emit("resizeVTable"),this.loading=!1},showAllLeft:function(){this.isShowLeft=!0,this.isShowRight=!1,this.isShowReback=!0},showAllRight:function(){this.isShowLeft=!1,this.isShowRight=!0,this.isShowReback=!0},showReback:function(){this.isShowReback=!1,this.isShowLeft=!1,this.isShowRight=!1}}}},TsW9:function(e,t,i){"use strict";t.a=function(e,t){return n.b.get("/api-order/order/load/v1/getBatchNo/",{params:{orgId:e,loadTypeId:t}})},t.i=function(e){return n.b.post("/api-order/order/load/v1/",e)},t.j=function(e){return n.b.put("/api-order/order/load/v1/",e)},t.d=function(e){return n.b.get("/api-order/order/load/v1/selectAddLoadRepertoryList/",{params:{orgId:e}})},t.g=function(e,t){return n.b.get("/api-order/order/load/v1/selectUpdateLoadRepertoryList/?orgId="+e+"&loadId="+t)},t.h=function(e,t){return n.b.get("/api-order/order/load/v1/selectUpdateLoadDetailList/?orgId="+e+"&loadId="+t)},t.e=function(e){return n.b.get("/api-order/order/load/v1/selectLoadDetailList/",{params:{loadId:e}})},t.f=function(){return n.b.get("/api-system/system/trunk/v1/findCarAndDriver/").then(function(e){return e})},t.b=function(){return n.b.get("/api-system/system/trunk/v1/findDriverAndCar/").then(function(e){return e})},t.c=function(e){return n.b.post("/api-order/order/tmsordertrailterminal/v1/list",e).then(function(e){return e.data})};var n=i("Vo7i")},fU87:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("FrGO"),l=i("vCUH");var r=function(e){i("sppa")},o=i("VU/8")(n.a,l.a,r,null,null);t.default=o.exports},sJaV:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("2Um6"),l=i("/2Zc");var r=function(e){i("5hGn")},o=i("VU/8")(n.a,l.a,r,null,null);t.default=o.exports},sppa:function(e,t){},vCUH:function(e,t,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transferTable",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],on:{resizeVTable:t.resizeVTable}},[i("el-button",{attrs:{slot:"tableRefresh",icon:"el-icon-refresh",size:"mini",type:"primary",plain:"",circle:""},on:{click:t.regetList},slot:"tableRefresh"}),t._v(" "),i("div",{staticClass:"tableHeadItemForm clearfix",attrs:{slot:"tableSearch"},slot:"tableSearch"},[i("currentSearch",{attrs:{info:t.orgLeftTable},on:{change:t.getSearch,keyupEneter:t.getSearchEnter}})],1),t._v(" "),i("div",{staticClass:"vtableHeadItemBtn",attrs:{slot:"tableLeft"},slot:"tableLeft"},[i("el-button",{staticClass:"tableAllBtn",attrs:{size:"mini"},on:{click:t.addALLList}}),t._v(" "),i("v-table",{directives:[{name:"show",rawName:"v-show",value:t.isOrgLeftTable,expression:"isOrgLeftTable"}],ref:"orgLeftTable",staticStyle:{width:"100%"},attrs:{noTitle:!0,"column-width-drag":"","is-horizontal-resize":"","is-vertical-resize":"","row-hover-color":"#eee","vertical-resize-offset":30,columns:t.columnsLeft,"table-data":t.leftTable,footer:t.footerLeft,"footer-row-height":30,"row-dblclick":t.dclickAddItem},on:{"on-custom-comp":t.doActionExpandTable},scopedSlots:t._u([{key:"header",fn:function(e){return[i("tableHeaderSearch",{attrs:{scope:e.row,query:t.searchQuery},on:{change:t.changeKeyLeft}})]}}])}),t._v(" "),i("v-table",{directives:[{name:"show",rawName:"v-show",value:!t.isOrgLeftTable,expression:"!isOrgLeftTable"}],ref:"leftTable",staticStyle:{width:"100%"},attrs:{"column-width-drag":"","is-horizontal-resize":"","is-vertical-resize":"","vertical-resize-offset":18,"row-hover-color":"#eee",columns:t.columnsLeft,"table-data":t.leftTable,footer:t.footerLeft,"footer-row-height":30,"row-dblclick":t.dclickAddItem},on:{"on-custom-comp":t.doActionExpandTable}})],1),t._v(" "),i("div",{staticClass:"vtableHeadItemBtn",attrs:{slot:"tableRight"},slot:"tableRight"},[i("el-button",{staticClass:"tableAllBtnMinus",attrs:{size:"mini"},on:{click:t.minusAllList}}),t._v(" "),i("v-table",{ref:"rightTable",staticStyle:{width:"100%"},attrs:{"column-width-drag":"","is-horizontal-resize":"","is-vertical-resize":"","row-hover-color":"#eee","vertical-resize-offset":18,columns:t.columnsRight,"table-data":t.rightTable,footer:t.footerRight,"footer-row-height":30,"row-dblclick":t.dclickMinusItem},on:{"on-custom-comp":t.doActionExpandTable}})],1)],1)},staticRenderFns:[]};t.a=n}});