<template>
  <div class="component">
    <h2>表格设置</h2>
    <el-button type="primary" icon="el-icon-setting" size="mini" plain @click="setTable">表格设置</el-button>
    <el-table ref="multipleTable" :data="repertoryArr" border :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" stripe>
      <el-table-column fixed sortable type="selection" width="50">
      </el-table-column>
      <template v-for="column in tableColumn">
        <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
        </el-table-column>
        <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
          <template slot-scope="scope">
            <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
            <span v-else v-html="column.slot(scope)"></span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <TableSetup :popVisible="setupTableVisible" :columns='tableColumn' @close="closeSetupTable" @success="setColumn"></TableSetup>
    <div class="component-remark">
      <h4>【表格设置组件】-用法</h4>
      <h5>1/父组件引入：</h5>
      <el-alert title="// html   复制后自己格式化一下~" type="primary" :closable="false">
      	<div v-html class="component-remark-html">
      		{{htmlMessage1}} <el-button type="info" icon="el-icon-document" size="mini" plain v-clipboard:copy='htmlMessage1' v-clipboard:success='clipboardSuccess'>copy</el-button><br><br>
      		{{htmlMessage2}} <el-button type="info" icon="el-icon-document" size="mini" plain v-clipboard:copy='htmlMessage2' v-clipboard:success='clipboardSuccess'>copy</el-button><br><br>
      		{{htmlMessage3}} <el-button type="info" icon="el-icon-document" size="mini" plain v-clipboard:copy='htmlMessage3' v-clipboard:success='clipboardSuccess'>copy</el-button>
      	</div>
      </el-alert>
      <el-alert title="// script" type="primary" :closable="false">
       <div v-html class="component-remark-html">
      	import TableSetup from '@/components/tableSetup' <br>
	    export default { <br>
	    &nbsp;&nbsp;components: { TableSetup }, <br>
	    &nbsp;&nbsp;data () { <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;return { <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setupTableVisible: false, // 默认弹出框关闭 <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tablekey: 0, // 初始化表格视图key <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tableColumn: [] // 后台接口获取到的列表数据 <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;}, <br>
	    &nbsp;&nbsp;methods: { <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;setTable() { <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.setupTableVisible = true <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;}, <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;closeSetupTable() { // 关闭弹出框 <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.setupTableVisible = false <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;}, <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;setColumn(obj) { // 重绘表格列表 <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.tableColumn = obj <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.tablekey = Math.random() // 刷新表格视图 <br>
	    &nbsp;&nbsp;&nbsp;&nbsp;} <br>
	    &nbsp;&nbsp;} <br>
	     } <br>
      </div>
      </el-alert>
      <h5>2/数据结构：</h5>
       <el-alert title="" type="primary" :closable="false">
      <div class="component-remark-html">
      	<b>【 tableColumn 】：对应< el-table >上的列column <el-tag size="mini" type="info">Array</el-tag></b><br>
      	label: 数据字段展示名称 <el-tag size="mini" type="info">String</el-tag> <el-tag size="mini">必填项</el-tag><br>
      	prop: 数据字段绑定值 <el-tag size="mini" type="info">String</el-tag> <el-tag size="mini">必填项</el-tag><br>
      	width: 数据展示长度 <el-tag size="mini" type="info">String | Number</el-tag> <el-tag size="mini">非必填项</el-tag><br>
      	fixed: 该列是否固定 <el-tag size="mini" type="info">Boolean</el-tag> <el-tag size="mini">非必填项</el-tag> flase-不固定 true-固定<br>
      	slot: 相当于template solt-scope=""可以自定义当前表格项,方便用闭包 <el-tag size="mini" type="info">Function</el-tag> <el-tag size="mini">非必填项</el-tag> flase-不固定 true-固定<br><br>
      	^^举个栗子^^：<br>
      	tableColumn: [{<br>
        &nbsp;&nbsp;label: '运单标识',<br>
        &nbsp;&nbsp;prop: 'shipIdentifying',<br>
        &nbsp;&nbsp;width: '150',<br>
        &nbsp;&nbsp;fixed: false,<br>
        &nbsp;&nbsp;slot: function(scope) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;return parseShipStatus(scope.row.shipIdentifying)<br>
        &nbsp;&nbsp;}<br>
        }],<br>
        <br>
        <b>【 repertoryArr 】：表格的数据,< el-table :data="repertoryArr" > <el-tag size="mini" type="info">Array</el-tag></b><br>
        <b>【 setupTableVisible 】：表格设置弹出框是否关闭 <el-tag size="mini" type="info">Boolean</el-tag> false-关闭 true-显示</b><br>
        <b>【 tablekey 】：表格视图key， 可以刷新当前table视图 <el-tag size="mini" type="info">Number</el-tag> 可采用Math.random()或者 new Date().getTime()</b><br>
      </div>
    </el-alert>
    </div>
  </div>
</template>
<script>
import TableSetup from '@/components/tableSetup'
import { parseShipStatus } from '@/utils/dict'
export default {
  components: {
    TableSetup
  },
  data() {
    return {
      repertoryArr: [{
          shipSn: '234234234',
          shipStatusName: '已发货',
          shipIdentifying: '控'
        },
        {
          shipSn: '19082334',
          shipStatusName: '已发货',
          shipIdentifying: '控'
        }
      ],
      setupTableVisible: false, // 默认弹出框关闭
      tablekey: 0, // 初始化表格视图key
      tableColumn: [{ // 后台接口获取到的列表数据,
          label: '运单号',
          prop: 'shipSn',
          width: '150',
          fixed: true
        },
        {
          label: '运单状态',
          prop: 'shipStatusName',
          width: '150',
          fixed: false
        },
        {
          label: '运单标识',
          prop: 'shipIdentifying',
          width: '150',
          fixed: false,
          slot: function(scope) {
            return parseShipStatus(scope.row.shipIdentifying)
          }
        },
        {
          label: '入库时间',
          prop: 'repertoryCreateTime',
          width: '180',
          // slot: (scope) => {
          //   return `${parseTime(scope.row.repertoryCreateTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          // },
          fixed: false
        },
        {
          label: '库存时长',
          prop: 'hashours',
          width: '150',
          fixed: false
        },
        {
          label: '开单网点',
          prop: 'fromOrgName',
          width: '150',
          fixed: false
        },
        {
          label: '开单时间',
          prop: 'createTime',
          width: '180',
          // slot: (scope) => {
          //   return `${parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')}`
          // },
          fixed: false
        },
        {
          label: '货品名',
          prop: 'cargoName',
          width: '150',
          fixed: false
        },
        {
          label: '库存件数',
          prop: 'repertoryAmount',
          width: '150',
          fixed: false
        },
        {
          label: '库存重量',
          prop: 'repertoryWeight',
          width: '150',
          fixed: false
        },
        {
          label: '库存体积',
          prop: 'repertoryVolume',
          width: '150',
          fixed: false
        },
        {
          label: '运单件数',
          prop: 'cargoAmount',
          width: '150',
          fixed: false
        },
        {
          label: '运单重量',
          prop: 'cargoWeight',
          width: '150',
          fixed: false
        },
        {
          label: '运单体积',
          prop: 'cargoVolume',
          width: '150',
          fixed: false
        },
        {
          label: '发站',
          prop: 'shipFromCityName',
          width: '150',
          fixed: false
        },
        {
          label: '到站',
          prop: 'shipToCityName',
          width: '150',
          fixed: false
        },
        {
          label: '发货人',
          prop: 'senderCustomerName',
          width: '150',
          fixed: false
        },
        {
          label: '发货人电话',
          prop: 'receiverCustomerMobile',
          width: '150',
          fixed: false
        },
        {
          label: '收货人',
          prop: 'receiverCustomerName',
          width: '150',
          fixed: false
        },
        {
          label: '收货人电话',
          prop: 'receiverCustomerMobile',
          width: '150',
          fixed: false
        },
        {
          label: '交接方式',
          prop: 'shipDeliveryMethodName',
          width: '150',
          fixed: false
        },
        {
          label: '运费',
          prop: 'shipTotalFee',
          width: '150',
          fixed: false
        },
        {
          label: '提货费',
          prop: 'pickupFee',
          width: '150',
          fixed: false
        },
        {
          label: '回扣',
          prop: 'brokerageFee',
          width: '150',
          fixed: false
        },
        {
          label: '保险费',
          prop: 'insuranceFee',
          width: '150',
          fixed: false
        },
        {
          label: '声明价值',
          prop: 'productPrice',
          width: '150',
          fixed: false
        },
        {
          label: '包装费',
          prop: 'packageFee',
          width: '150',
          fixed: false
        },
        {
          label: '送货费',
          prop: 'deliveryFee',
          width: '150',
          fixed: false
        },
        {
          label: '运费合计',
          prop: 'shipTotalFee',
          width: '150',
          fixed: false
        },
        {
          label: '付款方式',
          prop: 'shipPayWayName',
          width: '150',
          fixed: false
        },
        {
          label: '现付',
          prop: 'shipNowpayFee',
          width: '150',
          fixed: false
        },
        {
          label: '到付',
          prop: 'shipArrivepayFee',
          width: '150',
          fixed: false
        },
        {
          label: '回单付',
          prop: 'shipReceiptpayFee',
          width: '150',
          fixed: false
        },
        {
          label: '月结',
          prop: 'shipMonthpayFee',
          width: '150',
          fixed: false
        },
        {
          label: '备注',
          prop: 'shipRemarks',
          width: '150',
          fixed: false
        },
        {
          label: '发货方',
          prop: 'senderCustomerUnit',
          width: '150',
          fixed: false
        },
        {
          label: '发货地址',
          prop: 'senderDetailedAddress',
          width: '150',
          fixed: false
        },
        {
          label: '收货方',
          prop: 'receiverCustomerUnit',
          width: '150',
          fixed: false
        },
        {
          label: '收货地址',
          prop: 'receiverDetailedAddress',
          width: '150',
          fixed: false
        },
        {
          label: '货号',
          prop: 'shipGoodsSn',
          width: '150',
          fixed: false
        },
        {
          label: '品种规格',
          prop: 'description',
          width: '150',
          fixed: false
        },
        {
          label: '件数单价',
          prop: 'amountFee',
          width: '150',
          fixed: false
        },
        {
          label: '重量单价',
          prop: 'weightFee',
          width: '150',
          fixed: false
        },
        {
          label: '体积单价',
          prop: 'volumeFee',
          width: '150',
          fixed: false
        },
        {
          label: '回单号',
          prop: 'shipReceiptSn',
          width: '150',
          fixed: false
        },
        {
          label: '回单要求',
          prop: 'shipReceiptRequireName',
          width: '150',
          fixed: false
        },
        {
          label: '回单份数',
          prop: 'shipReceiptNum',
          width: '150',
          fixed: false
        },
        {
          label: '代收货款',
          prop: 'agencyFund',
          width: '150',
          fixed: false
        },
        {
          label: '代收款手续费',
          prop: 'commissionFee',
          width: '150',
          fixed: false
        },
        {
          label: '制单人',
          prop: 'userName',
          width: '150'
        },
        {
          label: '客户单号',
          prop: 'shipCustomerNumber',
          width: '150',
          fixed: false
        },
        {
          label: '运输方式',
          prop: 'shipShippingTypeName',
          width: '150',
          fixed: false
        },
        {
          label: '业务类型',
          prop: 'shipBusinessType',
          width: '150',
          fixed: false
        },
        {
          label: '是时效',
          prop: 'shipEffectiveName',
          width: '150',
          fixed: false
        },
        {
          label: '上楼费',
          prop: 'goupstairsFee',
          width: '150',
          fixed: false
        },
        {
          label: '叉车费',
          prop: 'forkliftFee',
          width: '150',
          fixed: false
        },
        {
          label: '装卸费',
          prop: 'handlingFee',
          width: '150',
          fixed: false
        },
        {
          label: '入仓费',
          prop: 'housingFee',
          width: '150',
          fixed: false
        }
      ],
      htmlMessage1: '<el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>',
      htmlMessage2: '<el-table ref="multipleTable" :data="repertoryArr" border :key="tablekey" style="width:100%;" :default-sort="{prop: "id", order: "ascending"}" stripe><el-table-column fixed sortable type="selection" width="50"></el-table-column><template v-for="column in tableColumn"><el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column><el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width"><template slot-scope="scope"><span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span><span v-else v-html="column.slot(scope)"></span></template></el-table-column></template></el-table>',
      htmlMessage3: ' <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn"></TableSetup>'
    }
  },
  methods: {
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() { // 关闭弹出框
      this.setupTableVisible = false
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = Math.random() // 刷新表格视图
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}

</script>
<style lang="scss">
.component-remark {
  width: 100%;
  background-color: #eee;
  padding: 10px 20px;
  margin-top: 10px;
  h5 {
    margin: 10px;
  }
  .component-remark-html{
  	font-size:13px;
  	line-height: 18px;
  }
}

</style>
