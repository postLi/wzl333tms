webpackJsonp([339],{K1X5:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("rMU5"),_=n("iM+U"),a=n("VU/8")(s.a,_.a,null,null,null);e.default=a.exports},"iM+U":function(t,e,n){"use strict";var s={render:function(){var n=this,t=n.$createElement,s=n._self._c||t;return s("div",{staticClass:"component"},[s("h2",[n._v("获取指定类型的下拉框")]),n._v(" "),s("SelectType",{attrs:{type:"department_type"},model:{value:n.selected,callback:function(t){n.selected=t},expression:"selected"}}),n._v(" "),s("p",[n._v("选中的值： "+n._s(n.selected))]),n._v(" "),s("blockquote",[n._v("\n      引用地址：\n      components/selectType/index.vue\n    ")]),n._v(" "),s("h3",[n._v("SLOT")]),n._v(" "),s("p",[n._v("作用域插槽： item")]),n._v(" "),s("select-type",{attrs:{type:"driving_type"},scopedSlots:n._u([{key:"default",fn:function(t){var e=t.item;return[s("el-option",{key:e.id,attrs:{label:e.dictName,value:e.id}},[s("span",{staticStyle:{float:"left"}},[n._v(n._s(e.dictName))]),n._v(" "),s("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[n._v("id: "+n._s(e.id))])])]}}]),model:{value:n.selected2,callback:function(t){n.selected2=t},expression:"selected2"}}),n._v(" "),s("p",[n._v("选中的值： "+n._s(n.selected2))]),n._v(" "),s("p",[n._v("插槽： head")]),n._v(" "),s("p",[n._v("插入到所有选项的前面")]),n._v(" "),s("select-type",{attrs:{type:"driving_type"},scopedSlots:n._u([{key:"default",fn:function(t){var e=t.item;return[s("el-option",{key:e.id,attrs:{label:e.dictName,value:e.id}},[s("span",{staticStyle:{float:"left"}},[n._v(n._s(e.dictName))]),n._v(" "),s("span",{staticStyle:{float:"right",color:"#8492a6","font-size":"13px"}},[n._v("id: "+n._s(e.id))])])]}}]),model:{value:n.selected3,callback:function(t){n.selected3=t},expression:"selected3"}},[s("template",{slot:"head"},[s("el-option",{attrs:{label:"全部",value:""}})],1)],2),n._v(" "),s("p",[n._v("插槽： foot")]),n._v(" "),s("p",[n._v("插入到所有选项的后面")]),n._v(" "),s("h3",[n._v("prop")]),n._v(" "),n._m(0),n._v(" "),s("h3",[n._v("type可选的值")]),n._v(" "),s("p",{staticClass:"important"},[n._v("只要后台字典数据库存在的字段，即可查询获取，不仅限于以下所列。。。。。。")]),n._v(" "),s("pre",[n._v("network_type\t网点类型\nmanage_type\t经营类型\ndriving_type\t驾驶证类型\ndepartment_type\t部门类型\nupType\tupRemark\npayment_type\t中转付款方式\ndepartment_type\t部门类型\nmenu_type\t菜单类型\nnetwork_status\t网点状态\nship_time_rule\t开单时间规则\nnotify_cargo_rule\t通知放货规则\nload_type\t配载类型\napportion_type\t分摊方式\nshort_batch_type\t短驳批次状态\nmain_batch_type\t干线批次状态\ndelivery_batch_type\t送货批次状态\nship_status\t运单状态\nship_delivery_method\t交接方式\nship_pay_way\t付款方式\nship_receipt_require\t回单要求\nship_shipping_type\t运输方式\nship_business_type\t业务类型\nship_effective\t时效性\nsign_cocument_type\t签收证件\nsign_type\t签收类型\nship_pay_way\t付款方式\nrec_status\t回单回收状态\nsend_status\t回单寄出状态\naccept_status\t回单接收状态\ngiveout_status\t回单发放状态\nrec_type\t回单回收情况\naccept_type\t回单接收情况\nabnormal_status\t异常状态\nabnormal_type\t异常类型\ntruck_source\t车辆来源\ntruck_type\t车型\nship_other\t其他\ntype\t备注\ndepartment_type\t部门类型\n    ")])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",{staticClass:"info-require"},[t._v("v-model"),n("div",{staticClass:"type"},[t._v(" [Number, String]")]),t._v("用来绑定值")]),t._v(" "),n("li",{staticClass:"info-require"},[t._v("type"),n("div",{staticClass:"type"},[t._v("String")]),t._v("下拉框要请求的类型")]),t._v(" "),n("li",[t._v("orgid"),n("div",{staticClass:"type"},[t._v("String")]),t._v("网点id，如果不传则引用当前用户的公司id")]),t._v(" "),n("li",[t._v("placeholder"),n("div",{staticClass:"type"},[t._v("Boolean")]),t._v("替代显示文案")])])}]};e.a=s},rMU5:function(t,e,n){"use strict";var s=n("9UCZ");e.a={name:"SelectTypeDemo",components:{SelectType:s.a},data:function(){return{orgid:1,selected:"",selected3:"",selected2:""}},methods:{getOrgid:function(t){console.log("pagenation",t)}}}}});