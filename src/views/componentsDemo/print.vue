<template>
  <div class="component">
    <h2>打印导出  <el-button @click="downloadFile" icon="el-icon-download" type="success" size="mini">下载插件</el-button></h2>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="【敲黑板】用打印导出功能的两个重要前提是：1、下载插件。 2、要做好【表格设置】的功能。elementUI重新封装了table，LODOP打印插件不能识别
          < el-table>数据，并且根据以下需求完成打印导出功能。" name="1">
        <!-- <p>用打印导出功能的一个重要前提是： 要做好【表格设置】的功能。elementUI重新封装了table，LODOP打印插件不能识别
          < el-table>数据，并且根据以下需求完成打印导出功能。</p> -->
        <el-button type="primary" icon="el-icon-setting" size="mini" plain @click="setTable">表格设置</el-button>
        <br>
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
      </el-collapse-item>
    </el-collapse>
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="打印导出表格设置中的表格" name="first">
        <el-row :gutter="12">
          <el-col :span="12">
            <div class="component-remark">
              <!-- <p>【需求】：列表中有
                <el-tag>打勾选择项</el-tag> 就打印或者导出该项，若没有，就根据搜索条件打印或者导出当页列表中的所有数据。</p> -->
              <el-alert title="// script ^^举个栗子^^" type="primary" :closable="false" style="margin-top: 10px;">
                <div v-html class="component-remark-html">
                  import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs' // 引入通用方法
                  <br> export default {
                  <br> &nbsp;&nbsp;components: { TableSetup },
                  <br> &nbsp;&nbsp;data () {
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;return {
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setupTableVisible: false, // 默认弹出框关闭
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tablekey: 0, // 初始化表格视图key
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tableColumn: [] // table数据列
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repertoryArr: [] // 后台接口获取到的列表数据
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;},
                  <br> &nbsp;&nbsp;methods: {
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;doAction(type) {
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;switch (type) {
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'print': // 打印表格常用方法
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PrintInFullPage({
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data: this.repertoryArr, // 列表中的数据
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns: this.tableColumn, // 表格设置好的列
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: '全部库存' // 文件名称
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case 'export': // 导出表格常用方法
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SaveAsFile({
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data: this.repertoryArr,// 列表中的数据
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns: this.tableColumn, // 表格设置好的列
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: '全部库存' // 文件名称
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
                  <br> &nbsp;&nbsp;}
                  <br> }
                  <br>
                </div>
              </el-alert>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="component-remark">
              <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
                <el-button type="primary" icon="el-icon-setting" size="mini" plain @click="doAction('print')">打印</el-button>
                <el-button type="primary" icon="el-icon-setting" size="mini" plain @click="doAction('export')">导出</el-button>
              </el-alert>
              <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
                <h3>需求</h3>
                <p>列表中有
                  <el-tag size="mini">打勾选择项</el-tag> 就打印或者导出该项，若没有，就根据搜索条件打印或者导出当页列表中的所有数据。</p>
              </el-alert>
              <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
                <h3>打印参数 PrintInFullPage <el-tag size="mini" type="info">Function</el-tag> </h3>
                <p>data: 需要打印的列表数据
                  <el-tag size="mini" type="success">Array</el-tag>
                  <el-tag size="mini">必填项</el-tag>
                </p>
                <p>columns: 表格设置状态中的table列
                  <el-tag size="mini" type="success">Array</el-tag>
                  <el-tag size="mini">必填项</el-tag>
                </p>
                <p>name: 自定义导出文件名
                  <el-tag size="mini" type="success">String</el-tag>
                  <el-tag size="mini" type="warning">非必填项</el-tag>
                </p>
              </el-alert>
              <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
                <h3>导出参数 SaveAsFile <el-tag size="mini" type="info">Function</el-tag>  </h3>
                <p>data: 需要导出的列表数据
                  <el-tag size="mini" type="success">Array</el-tag>
                  <el-tag size="mini">必填项</el-tag>
                </p>
                <p>columns: 表格设置状态中的table列
                  <el-tag size="mini" type="success">Array</el-tag>
                  <el-tag size="mini">必填项</el-tag>
                </p>
                <p>name: 自定义导出文件名
                  <el-tag size="mini" type="success">String</el-tag>
                  <el-tag size="mini" type="warning">非必填项</el-tag>
                </p>
              </el-alert>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="打印标签或运单" name="second">
        <el-row :gutter="12">
          <el-col :span="12">
            <div class="component-remark">
              <el-alert title="// script ^^举个栗子^^" type="primary" :closable="false" style="margin-top: 10px;">
                <div v-html class="component-remark-html">
                  <br>// 打印插件
                  <br>import { CreatePrintPage } from '@/utils/lodopFuncs'
                  <br>// 获取打印位置参数接口
                  <br>import { getPrintOrderItems, getPrintLibItems } from '@/api/operation/print'
                  <br>
                  <br> doAction(type) {
                  <br> &nbsp;&nbsp;switch (type) {
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;case 'printLibkey': // 打印标签（已保存）
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getPrintLibItems(this.form.tmsOrderShipInfo.id).then(data => { // 调接口-已保存打印标签
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CreatePrintPage(data) // 打印运单或标签通用方法
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;break
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;case 'printShipKey': // 打印运单（已保存）
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getPrintOrderItems(this.form.tmsOrderShipInfo.id).then(data => { // 调接口-已保存打印标签
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CreatePrintPage(data) // 打印运单或标签通用方法
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;break
                  <br> &nbsp;&nbsp;&nbsp;&nbsp;}
                  <br> &nbsp;&nbsp;}
                </div>
              </el-alert>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="component-remark">
              <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
                <h3>需求</h3>
                <p>
                  <el-tag type="warning" size="mini">未保存</el-tag>打印标签或者运单需要拼接打印脚本，
                  <el-tag type="warning" size="mini">已保存</el-tag>的运单可以传
                  <el-tag size="mini">运单ID</el-tag>调接口后台返回拼接好的脚本直接打印。</p>
              </el-alert>
              <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
                <h3>打印参数 CreatePrintPage  <el-tag size="mini" type="info">Function</el-tag></h3>
                <p>data: 后台返回的脚本字符串
                  <el-tag size="mini" type="success">String</el-tag>
                  <el-tag size="mini">必填项</el-tag>
                </p>
              </el-alert>
              <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
                <h3>标签打印方法 getPrintLibItems 
                   <el-tag size="mini" type="info">Function</el-tag>
                </h3>
                <p>params: 运单ID 
                  <el-tag size="mini" type="success">String</el-tag>
                  <el-tag size="mini">必填项</el-tag>
                </p>
              </el-alert>
              <el-alert title="" type="primary" :closable="false" style="margin-top: 10px;">
                <h3>运单打印方法 getPrintOrderItems 
                   <el-tag size="mini" type="info">Function</el-tag>
                </h3>
                <p>params: 运单ID 
                  <el-tag size="mini" type="success">String</el-tag>
                  <el-tag size="mini">必填项</el-tag>
                </p>
              </el-alert>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="打印核销单" name="third">打印核销单</el-tab-pane>
      <el-tab-pane label="打印合同" name="fourth">打印合同</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import { downloadFile } from '@/api/common'
// import TableSetup from '@/components/tableSetup'
import { parseShipStatus } from '@/utils/dict'
export default {
  components: {
    // TableSetup
  },
  data() {
    return {
      activeName2: 'first',
      repertoryArr: [{
        shipSn: '234234234',
        shipStatusName: '已发货',
        shipIdentifying: '控',
        repertoryCreateTime: '2018-09-11 19:55:02',
        hashours: '6'
      },
      {
        shipSn: '19082334',
        shipStatusName: '已发货',
        shipIdentifying: '控',
        repertoryCreateTime: '2018-09-11 19:55:02',
        hashours: '1'
      }
      ],
      activeName: 1,
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
      }
      ]
    }
  },
  methods: {
    doAction(type) {
      switch (type) {
        case 'print':
          PrintInFullPage({
            data: this.repertoryArr,
            columns: this.tableColumn,
            name: '全部库存'
          })
          break
        case 'export':
          SaveAsFile({
            data: this.repertoryArr,
            columns: this.tableColumn,
            name: '全部库存'
          })
          break
      }
    },
    downloadFile() { // 下载系统所需插件
      window.open(downloadFile())
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() { // 关闭弹出框
      this.setupTableVisible = false
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = new Date().getTime() // 刷新表格视图
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
