webpackJsonp([269],{Cc2w:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=a("pgZP"),r=a("pb5J");var v=function(e){a("K4UR")},l=a("VU/8")(c.a,r.a,v,null,null);t.default=l.exports},K4UR:function(e,t){},pb5J:function(e,t,a){"use strict";var c={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"component"},[t("h2",[a._v("获取各种列表")]),a._v(" "),t("blockquote",[a._v("\n      引用地址：\n      components/querySelect/index.vue\n    ")]),a._v(" "),t("querySelect",{attrs:{search:"name",label:"name",name:a.city},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="name" label="name"  :name="city" @change="getcity" />')]),a._v(" "),t("h4",[a._v("搜索手机号码 + slot显示名字 "+a._s(a.val))]),a._v(" "),t("querySelect",{attrs:{valuekey:"mobilephone",search:"mobilephone",label:"mobilephone"},on:{change:a.getcity},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[a._v("\n        "+a._s(t.name)+" : "+a._s(t.mobilephone)+"\n      ")]}}]),model:{value:a.val,callback:function(e){a.val=e},expression:"val"}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect v-model="val" valuekey="mobilephone" search="mobilephone" label="mobilephone" @change="getcity" >\n      <template slot-scope="{ item }">\n        \\{\\{ item.name }} : \\{\\{ item.mobilephone }}\n      </template>\n    </querySelect>')]),a._v(" "),t("h4",[a._v("每次都请求服务器")]),a._v(" "),t("querySelect",{attrs:{search:"name",label:"name",name:a.city,remote:!0},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="name" label="name" :name="city" @change="getcity" :remote="true" />')]),a._v(" "),t("h4",[a._v("用select框展示")]),a._v(" "),t("querySelect",{attrs:{search:"name",label:"name",name:a.city,show:"select"},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="name" label="name" :name="city" @change="getcity" show="select" />')]),a._v(" "),t("h4",[a._v("用select框展示 + 每次都请求")]),a._v(" "),t("querySelect",{attrs:{search:"name",label:"name",name:a.city,remote:!0,show:"select"},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="name" label="name" :name="city" @change="getcity" :remote="true" show="select" />')]),a._v(" "),t("h4",[a._v("用select框展示 + slot替换展示元素")]),a._v(" "),t("p",{staticStyle:{color:"#f00"}},[a._v("需指定slot位置，如remote为false时，设置为 select； 如remote为true时，设置为 select-remote")]),a._v(" "),t("querySelect",{attrs:{search:"name",label:"name",name:a.city,show:"select"},on:{change:a.getcity},scopedSlots:a._u([{key:"select",fn:function(e){var t=e.item;return[a._v("\n        "+a._s(t.name)+" : "+a._s(t.mobilephone)+"\n      ")]}}])}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="name" label="name" :name="city" @change="getcity" show="select" >\n      <template slot="select" slot-scope="{item}">\n        \\{\\{ item.name }} : \\{\\{ item.mobilephone }}\n      </template>\n    </querySelect>')]),a._v(" "),t("h4",[a._v("用select框展示 + slot替换展示元素 + 每次都请求")]),a._v(" "),t("querySelect",{attrs:{search:"name",label:"name",name:a.city,remote:!0,show:"select"},on:{change:a.getcity},scopedSlots:a._u([{key:"select-remote",fn:function(e){var t=e.item;return[a._v("\n        "+a._s(t.name)+" : "+a._s(t.mobilephone)+"\n      ")]}}])}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="name" label="name" :name="city" @change="getcity" :remote="true" show="select" >\n      <template slot="select-remote" slot-scope="{item}">\n        \\{\\{ item.name }} : \\{\\{ item.mobilephone }}\n      </template>\n    </querySelect>')]),a._v(" "),t("h4",[a._v("获取城市")]),a._v(" "),t("querySelect",{attrs:{search:"name",type:"city",label:"longAddr",name:a.city,remote:!0},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="name" type="city" label="longAddr" :name="city" @change="getcity" :remote="true" />')]),a._v(" "),t("h4",[a._v("获取承运商")]),a._v(" "),t("querySelect",{attrs:{search:"carrierName",type:"carrier",label:"carrierName",name:a.city,remote:!0},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="carrierName" type="carrier" label="carrierName" :name="city" @change="getcity" :remote="true" />')]),a._v(" "),t("h4",[a._v("获取司机")]),a._v(" "),t("querySelect",{attrs:{search:"driverName",type:"driver",label:"driverName",name:a.city,remote:!0},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="driverName" type="driver" label="driverName" :name="city" @change="getcity" :remote="true" />')]),a._v(" "),t("h4",[a._v("获取发货人")]),a._v(" "),t("querySelect",{attrs:{search:"customerName",type:"sender",label:"customerName",name:a.city,remote:!0},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="customerName" type="sender" label="customerName" :name="city" @change="getcity" :remote="true" />')]),a._v(" "),t("h4",[a._v("获取收货人的手机号码: "+a._s(a.receiver))]),a._v(" "),t("querySelect",{attrs:{search:"customerMobile",type:"receiver",label:"customerName",name:a.city,valuekey:"customerId"},on:{change:a.getcity},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[a._v("\n        "+a._s(t.customerName)+" : "+a._s(t.customerMobile)+"\n      ")]}}]),model:{value:a.receiver,callback:function(e){a.receiver=e},expression:"receiver"}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="customerMobile" v-model="receiver" type="receiver" label="customerName" :name="city" valuekey="customerId" @change="getcity" >\n    <template slot-scope="{item}">\n        \\{\\{ item.customerName }} : \\{\\{ item.customerMobile }}\n      </template>\n    </querySelect>')]),a._v(" "),t("h4",[a._v("获取收货人的id + 自定义的搜索过滤函数")]),a._v(" "),a._m(0),a._v(" "),t("querySelect",{attrs:{search:"customerMobile",searchFn:a.findId,type:"receiver",label:"customerName",name:a.city,valuekey:"customerId"},on:{change:a.getcity},scopedSlots:a._u([{key:"default",fn:function(e){var t=e.item;return[a._v("\n        "+a._s(t.customerName)+" : "+a._s(t.customerMobile)+"\n      ")]}}]),model:{value:a.receiver,callback:function(e){a.receiver=e},expression:"receiver"}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="customerMobile" :searchFn="findId" v-model="receiver" type="receiver" label="customerName" :name="city" valuekey="customerId" @change="getcity" >\n    <template slot-scope="{item}">\n        \\{\\{ item.customerName }} : \\{\\{ item.customerMobile }}\n      </template>\n    </querySelect>')]),a._v(" "),t("h4",[a._v("获取司机")]),a._v(" "),t("querySelect",{attrs:{search:"driverName",type:"driver",name:a.city,remote:!0},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="driverName" type="driver" :name="city" @change="getcity" :remote="true" />')]),a._v(" "),t("h4",[a._v("获取车辆")]),a._v(" "),t("querySelect",{attrs:{search:"truckIdNumber",type:"trunk",name:a.city},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="truckIdNumber" type="trunk" :name="city" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取异常列表")]),a._v(" "),t("querySelect",{attrs:{search:"abnormalNo",type:"abnormal",name:a.city},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="abnormalNo" type="abnormal" :name="city" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取控货列表")]),a._v(" "),t("querySelect",{attrs:{search:"shipGoodsSn",type:"controlgoods",name:a.city},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="shipGoodsSn" type="controlgoods" :name="city" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取订单列表")]),a._v(" "),t("querySelect",{attrs:{search:"orderSn",type:"preorder",name:a.city},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="orderSn" type="preorder" :name="city" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取运单列表")]),a._v(" "),t("querySelect",{attrs:{search:"shipSn",type:"order",name:a.city},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="shipSn" type="order" :name="city" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取提货单列表")]),a._v(" "),t("querySelect",{attrs:{search:"pickupBatchNumber",type:"pickup",name:a.city},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="pickupBatchNumber" type="pickup" :name="city" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取回单列表")]),a._v(" "),t("querySelect",{attrs:{search:"acceptStatusName",type:"receipt",name:a.city},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="acceptStatusName" type="receipt" :name="city" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取回单 寄出 列表")]),a._v(" "),t("querySelect",{attrs:{search:"sendStatusName",type:"receipt",name:a.city,param:{pageType:2}},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="sendStatusName" type="receipt" :name="city" @change="getcity" :param="{\'pageType\': 2}" />')]),a._v(" "),t("h4",[a._v("获取库存列表")]),a._v(" "),t("querySelect",{attrs:{search:"cargoName",type:"repertory",name:a.city},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="cargoName" type="repertory" :name="city" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取批次列表")]),a._v(" "),t("querySelect",{attrs:{search:"batchNumber",valuekey:"bathId",show:"select",type:"batch",name:a.city},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="batchNumber" valuekey="bathId" show="select" type="batch" :name="city" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取货品名称")]),a._v(" "),t("querySelect",{attrs:{search:"value",remote:!0,valuekey:"value",type:"cargoName"}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="value" valuekey="value" type="cargoName"  />')]),a._v(" "),t("h4",[a._v("获取货品包装")]),a._v(" "),t("querySelect",{attrs:{search:"value",valuekey:"value",type:"cargoPack"},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="value" valuekey="value" type="cargoPack" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取备注列表")]),a._v(" "),t("querySelect",{attrs:{search:"value",valuekey:"value",type:"remark"},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="value" valuekey="value" type="remark" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取收支方式")]),a._v(" "),t("querySelect",{attrs:{search:"financialWay",valuekey:"financialWay",type:"payway"},on:{change:a.getcity}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="financialWay" valuekey="financialWay" type="payway" @change="getcity" />')]),a._v(" "),t("h4",[a._v("获取最近出发城市")]),a._v(" "),t("querySelect",{attrs:{search:"value",remote:!0,valuekey:"value",type:"fromcity"}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="value" valuekey="value" type="fromcity"  />')]),a._v(" "),t("h4",[a._v("获取最近到达城市")]),a._v(" "),t("querySelect",{attrs:{search:"value",remote:!0,valuekey:"value",type:"tocity"}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="value" valuekey="value" type="tocity"  />')]),a._v(" "),t("hr"),a._v(" "),t("h2",[a._v("带初始值的示例")]),a._v(" "),t("querySelect",{attrs:{search:"value",remote:!0,valuekey:"value",type:"tocity"},model:{value:a.city2,callback:function(e){a.city2=e},expression:"city2"}}),a._v(" "),t("pre",{staticClass:"code"},[a._v('<querySelect search="value" valuekey="value" type="tocity"  />')]),a._v(" "),t("h4",[a._v("valuekey跟显示字段不一致的回显")]),a._v(" "),t("querySelect",{attrs:{search:"driverName",type:"driver",remote:!0},on:{change:a.getdriver},model:{value:a.driver,callback:function(e){a.driver=e},expression:"driver"}}),a._v(" "),t("br"),a._v(" "),t("querySelect",{attrs:{search:"driverName",type:"driver",name:"张晓吉",remote:!0},on:{change:a.getdriver},model:{value:a.driver2,callback:function(e){a.driver2=e},expression:"driver2"}}),a._v(" "),t("br"),a._v(" "),t("querySelect",{attrs:{search:"longAddr",name:a.fromCityName,type:"city",getinput:!0,remote:!0},on:{change:a.selectFromCity},model:{value:a.city3,callback:function(e){a.city3=e},expression:"city3"}}),a._v(" "),t("h3",[a._v("prop")]),a._v(" "),t("hr"),a._v(" "),a._m(1),a._v(" "),t("h3",[a._v("event")]),a._v(" "),t("hr"),a._v(" "),a._m(2),a._v(" "),t("h3",[a._v("type的取值")]),a._v(" "),t("hr"),a._v(" "),a._m(3)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("目前组件内默认的搜索过滤是当作字符串处理，使用indexOf模糊匹配。"),a("br"),e._v("如有特殊需求，如数值全等于判断、布尔值判断等，可以通过传搜索函数进行自定义的过滤处理。")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",{staticClass:"info-require"},[e._v("type"),a("div",{staticClass:"type"},[e._v("  String")]),e._v("搜索的表格，默认搜用户列表数据 user")]),e._v(" "),a("li",[e._v("v-model"),a("div",{staticClass:"type"},[e._v("  [String, Number, Object]")]),e._v("用来绑定值，获取由 valuekey 指定的字段值")]),e._v(" "),a("li",[e._v("label"),a("div",{staticClass:"type"},[e._v("  String")]),e._v("指定控件里要显示的字段值，如果不设置则取search指定的值")]),e._v(" "),a("li",[e._v("search"),a("div",{staticClass:"type"},[e._v("  String")]),e._v("搜索匹配的字段")]),e._v(" "),a("li",[e._v("count"),a("div",{staticClass:"type"},[e._v("  Number")]),e._v("请求多少条数据, 默认100")]),e._v(" "),a("li",[e._v("valuekey"),a("div",{staticClass:"type"},[e._v("  String")]),e._v("指定需要获得的value对应的字段，默认 id")]),e._v(" "),a("li",[e._v("show"),a("div",{staticClass:"type"},[e._v("  String")]),e._v("控件展示形式 可取 input  select， 默认input")]),e._v(" "),a("li",[e._v("remote"),a("div",{staticClass:"type"},[e._v("  Boolean")]),e._v("是否每次搜索都请求数据，默认 false")]),e._v(" "),a("li",[e._v("name"),a("div",{staticClass:"type"},[e._v("  String")]),e._v("用来初次显示在输入框的值")]),e._v(" "),a("li",[e._v("orgid"),a("div",{staticClass:"type"},[e._v("  [String, Number]")]),e._v("网点id，不传就获取当前用户的组织id")]),e._v(" "),a("li",[e._v("param"),a("div",{staticClass:"type"},[e._v("  Object")]),e._v("额外的请求参数，用来合并到vo中")]),e._v(" "),a("li",[e._v("searchFn"),a("div",{staticClass:"type"},[e._v("  Function")]),e._v("自定义的搜索函数，传入的参数为当前项，函数执行需返回true/false")]),e._v(" "),a("li",[e._v("nochangeparam"),a("div",{staticClass:"type"},[e._v("  Boolean")]),e._v("是否需要处理参数，默认false")]),e._v(" "),a("li",[e._v("filterable"),a("div",{staticClass:"type"},[e._v("  Boolean")]),e._v("select是否开启搜索，默认为true")]),e._v(" "),a("li",[e._v("popClass"),a("div",{staticClass:"type"},[e._v("  String")]),e._v("弹窗的自定义样式类名，方便控制下拉框里的样式")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[a("div",{staticClass:"function"},[e._v("change")]),e._v("返回当前选择的项 ")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[e._v("user 用户列表")]),e._v(" "),a("li",[e._v("city 城市名")]),e._v(" "),a("li",[e._v("carrier 承运商")]),e._v(" "),a("li",[e._v("sender 发货人")]),e._v(" "),a("li",[e._v("receiver 收货人")]),e._v(" "),a("li",[e._v("driver 司机")]),e._v(" "),a("li",[e._v("trunk 车辆")]),e._v(" "),a("li",[e._v("abnormal 异常")]),e._v(" "),a("li",[e._v("controlgoods 控货")]),e._v(" "),a("li",[e._v("preorder 订单")]),e._v(" "),a("li",[e._v("order 运单")]),e._v(" "),a("li",[e._v("pickup 提货")]),e._v(" "),a("li",[e._v("receipt 回单")]),e._v(" "),a("li",[e._v("repertory 库存")]),e._v(" "),a("li",[e._v("batch 获取批次列表")]),e._v(" "),a("li",[e._v("cargoName 获取货品名称")]),e._v(" "),a("li",[e._v("cargoPack 获取货品包装")]),e._v(" "),a("li",[e._v("fromcity 获取最近出发城市")]),e._v(" "),a("li",[e._v("tocity 获取最近到达城市")]),e._v(" "),a("li",[e._v("remark 获取备注列表")]),e._v(" "),a("li",[e._v("payway 获取收支方式")])])}]};t.a=c},pgZP:function(e,t,a){"use strict";var c=a("pAQG");t.a={components:{querySelect:c.a},data:function(){return{city:"",city2:"",val:"",receiver:"",driver:4,driver2:"",city3:"",fromCityName:""}},watch:{city3:function(e){console.log("city3 change:",e)}},mounted:function(){var e=this;setTimeout(function(){e.driver=5},5e3)},methods:{selectFromCity:function(e,t){console.log("selectFromCity:",e,t),console.log("this.city3:",this.city3)},getdriver:function(e){console.log("driver:",e),console.log("driver2:",this.driver2)},getcity:function(e){console.log("pagenation",e),this.city=e.longAddr},findId:function(e,t){return e.customerId.toString()===t}}}}});