webpackJsonp([268],{"93w0":function(t,o){},ARoL:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var a=e("bPRz"),r=e("B1Cq");var i=function(t){e("93w0")},s=e("VU/8")(a.a,r.a,i,null,null);o.default=s.exports},B1Cq:function(t,o,e){"use strict";var a={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"dashboard-container"},[e("div",{staticClass:"index-flow"},[e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("功能：安排车辆上门提货\n        ")]),t._v(" "),e("router-link",{staticClass:"flowitem send-01tihuo",attrs:{to:"/operation/order/pickUp"}},[e("i",{staticClass:"flowicon tihuo"}),t._v(" "),e("p",[t._v("提货")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("功能：批量导入运单。\n        ")]),t._v(" "),e("router-link",{staticClass:"flowitem send-02daoru",attrs:{to:"/operation/order/manage/import"}},[e("i",{staticClass:"flowicon daoru"}),t._v(" "),e("p",[t._v("运单导入")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("功能：客户通过网络，电话下单。\n        ")]),t._v(" "),e("router-link",{staticClass:"flowitem send-03dingdna",attrs:{to:"/operation/order/manage/service"}},[e("i",{staticClass:"flowicon dingdna"}),t._v(" "),e("p",[t._v("客户订单")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("功能：发货方，承运方之间的凭证\n        ")]),t._v(" "),e("router-link",{staticClass:"flowitem send-04yundan",attrs:{to:"/operation/order/orderManage/All"}},[e("i",{staticClass:"flowicon yundan"}),t._v(" "),e("p",[t._v("正式运单")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("功能：将运单转给第三方承运商\n        ")]),t._v(" "),e("router-link",{staticClass:"flowitem send-04zhongzhuan",attrs:{to:"/operation/order/transfer/transfered"}},[e("i",{staticClass:"flowicon zhongzhuan"}),t._v(" "),e("p",[t._v("中转外发")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("功能：开单收货，网点到货形成库存\n        ")]),t._v(" "),e("router-link",{staticClass:"flowitem send-06fahuokc",attrs:{to:"/operation/order/repertory/deliver"}},[e("i",{staticClass:"flowicon fahuokc"}),t._v(" "),e("p",[t._v("发货库存")])])],1),t._v(" "),e("el-tooltip",{attrs:{placement:"top"}},[e("div",{attrs:{slot:"content"},slot:"content"},[t._v("功能：同个区域不同网点货物配载到分拨中心。\n        ")]),t._v(" "),e("router-link",{staticClass:"flowitem send-07duanbo",attrs:{to:"/operation/order/shortDepart/arrival"}},[e("i",{staticClass:"flowicon duanbo"}),t._v(" "),e("p",[t._v("短驳接收")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：在公司网点间走货运输",placement:"top"}},[e("router-link",{staticClass:"flowitem send-08peizai",attrs:{to:"/operation/order/arteryDepart"}},[e("i",{staticClass:"flowicon peizai"}),t._v(" "),e("p",[t._v("配载发车")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"中转跟踪",placement:"top"}},[e("router-link",{staticClass:"flow-add-1",attrs:{to:"/operation/order/track/transfer"}},[t._v("中转跟踪")])],1),t._v(" "),e("el-tooltip",{attrs:{content:"智能在途跟踪",placement:"top"}},[e("router-link",{staticClass:"flow-add-2",attrs:{to:"/operation/order/track/artery"}},[t._v("智能在途跟踪")])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：接收其他网点发运到本网点的货物，以车为单位",placement:"top"}},[e("router-link",{staticClass:"flowitem receive-09daohuo",attrs:{to:"/operation/order/arteryDelivery"}},[e("i",{staticClass:"flowicon daohuo"}),t._v(" "),e("p",[t._v("到车/到货")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：将运单转给第三方承运商",placement:"top"}},[e("router-link",{staticClass:"flowitem receive-04zhongzhuan",attrs:{to:"/operation/order/transfer/transfered"}},[e("i",{staticClass:"flowicon zhongzhuan"}),t._v(" "),e("p",[t._v("中转外发")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：开单,网点接货,并未配载出库",placement:"top"}},[e("router-link",{staticClass:"flowitem receive-10kucun",attrs:{to:"/operation/order/repertory/arrival"}},[e("i",{staticClass:"flowicon kucun"}),t._v(" "),e("p",[t._v("到货库存")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：通过短驳把货物运输到配送网点",placement:"top"}},[e("router-link",{staticClass:"flowitem receive-11duobofache",attrs:{to:"/operation/order/shortDepart/deliver"}},[e("i",{staticClass:"flowicon duobofache"}),t._v(" "),e("p",[t._v("短驳发车")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：对自提运单进行签收",placement:"top"}},[e("router-link",{staticClass:"flowitem receive-12ziti",attrs:{to:"/operation/order/sign/Pick"}},[e("i",{staticClass:"flowicon ziti"}),t._v(" "),e("p",[t._v("自提")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：目的网点对需要送货上门的运单安排送货",placement:"top"}},[e("router-link",{staticClass:"flowitem receive-13songhuosm",attrs:{to:"/operation/order/deliverManage"}},[e("i",{staticClass:"flowicon songhuosm"}),t._v(" "),e("p",[t._v("送货上门")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：对自提，送货上门，中转外发运单进行签收",placement:"top"}},[e("router-link",{staticClass:"flowitem receive-14qianshou",attrs:{to:"/operation/order/sign/Pick"}},[e("i",{staticClass:"flowicon qianshou"}),t._v(" "),e("p",[t._v("签收")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：开单网点把回单发放给客户",placement:"bottom"}},[e("router-link",{staticClass:"flowitem receipt-18fafang",attrs:{to:"/operation/order/receipt/Grant"}},[e("i",{staticClass:"flowicon fafang"}),t._v(" "),e("p",[t._v("回单发放")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：对目的网点寄回的回单做接收",placement:"top"}},[e("router-link",{staticClass:"flowitem receipt-17jieshou",attrs:{to:"/operation/order/receipt/Accept"}},[e("i",{staticClass:"flowicon jieshou"}),t._v(" "),e("p",[t._v("回单接收")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：目的网点把回单寄到开单网点",placement:"bottom"}},[e("router-link",{staticClass:"flowitem receipt-16jichu",attrs:{to:"/operation/order/receipt/Send"}},[e("i",{staticClass:"flowicon jichu"}),t._v(" "),e("p",[t._v("回单寄出")])])],1),t._v(" "),e("el-tooltip",{attrs:{content:"功能：从收货人处回收回单",placement:"top"}},[e("router-link",{staticClass:"flowitem receipt-15huishou",attrs:{to:"/operation/order/receipt/Recycle"}},[e("i",{staticClass:"flowicon huishou"}),t._v(" "),e("p",[t._v("回单回收")])])],1)],1)])},staticRenderFns:[]};o.a=a},bPRz:function(t,o,e){"use strict";var a=e("Dd8w"),r=e.n(a),i=e("NYxO");o.a={name:"dashboard",computed:r()({},Object(i.b)(["name","roles"]))}}});