<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="discharge-pop" v-loading="loading">
    <template slot="content">
      <div class="discharge-head">
        批次号：{{formModel.batchNo}}
      </div>
      <div class="discharge-content">
        <el-form inline v-model="formModel" label-width="100" class="base-info">
          <table>
            <tbody>
              <tr>
                <th>途径网点</th>
                <td>
                  <el-input v-model="formModel.userOrgName" :size="btnsize" disabled></el-input>
                </td>
                <th>司机名称</th>
                <td>
                  <el-input v-model="formModel.dirverName" :size="btnsize" disabled></el-input>
                </td>
                <th>司机电话</th>
                <td>
                  <el-input v-model="formModel.dirverMobile" :size="btnsize" disabled></el-input>
                </td>
              </tr>
              <tr>
                <th>车牌号码</th>
                <td>
                  <el-input v-model="formModel.truckIdNumber" :size="btnsize" disabled></el-input>
                </td>
                <th>发车时间</th>
                <td>
                  <el-input v-model="formModel.departureTime" :size="btnsize" disabled></el-input>
                </td>
                <th>备注</th>
                <td>
                  <el-input v-model="formModel.remark" :size="btnsize" disabled></el-input>
                </td>
              </tr>
            </tbody>
          </table>
        </el-form>
        <div class="discharge-table">
          <div class="btns_box">
            <el-button :size="btnsize" type="warning" icon="el-icon-circle-plus" plain @click="doAction('discharge')">卸货</el-button>
            <el-popover @mouseenter.native="showSaveBox" @mouseout.native="hideSaveBox" placement="top" trigger="manual" width="160" :value="visible2">
              <p>表格宽度修改了，是否要保存？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="saveToTableSetup">确定</el-button>
              </div>
              <el-button slot="reference" type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup" :code="code">表格设置</el-button>
            </el-popover>
            <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('export')" plain class="table_setup">导出清单</el-button>
            <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain class="table_setup">打印清单</el-button>
          </div>
          <div class="detail-table">
            <el-table ref="multipleTable" @header-dragend="setTableWidth" :reserve-selection="true" :data="dataList" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" stripe>
              <el-table-column fixed sortable type="selection" width="50"></el-table-column>
              <template v-for="column in tableColumn">
                <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width"></el-table-column>
                <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
                  <template slot-scope="scope">
                    <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                    <span v-else v-html="column.slot(scope)"></span>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
        </div>
        <TableSetup code="" :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn"></TableSetup>
      </div>
    </template>
    <div slot="footer">
      <div class="discharge-footer">
        <el-button @click="closeMe">关闭</el-button>
      </div>
    </div>
  </pop-right>
</template>
<script>
import popRight from '@/components/PopRight/index'
import TableSetup from '@/components/tableSetup'
import SelectTree from '@/components/selectTree/index'
import { objectMerge2, parseTime } from '@/utils/index'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import { selectLoadDetailList, selectLoadMainInfoList, unload } from '@/api/operation/discharge'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: [Array, Object],
      default: () => {}
    }
  },
  components: {
    popRight,
    SelectTree,
    TableSetup,
  },
  data() {
    return {
      code: '',
      thecode: '',
      btnsize: 'mini',
      loading: true,
      popTitle: '中途卸货',
      dataList: [],
      selectList: [],
      tablekey: 0,
      visible2: false,
      setupTableVisible: false,
      formModel: {},
      searchQuery: {
        currentPage: 1,
        pageSize: 9999,
        vo: {
          loadId: ''
        }
      },
      tableColumn: [{
          label: '序号',
          prop: 'number',
          width: '50',
          fixed: true,
          slot: (scope) => {
            return scope.$index + 1
          }
        }, {
          label: '开单网点',
          prop: 'shipFromOrgName',
          width: '100'
        },
        {
          label: '运单号',
          prop: 'shipSn',
          width: '100'
        },
        {
          label: '子运单号',
          prop: 'childShipSn',
          width: '100'
        },
        {
          label: '到付(元)',
          prop: 'shipArrivepayFee',
          width: '100'
        },
        {
          label: '操作费(元)',
          prop: 'handlingFee',
          width: '100'
        },
        {
          label: '配载件数',
          prop: 'loadAmount',
          width: '100'
        },
        {
          label: '配载重量(kg)',
          prop: 'loadWeight',
          width: '100'
        },
        {
          label: '配载体积(m³)',
          prop: 'loadVolume',
          width: '100'
        },
        {
          label: '发站',
          prop: 'shipFromCityName',
          width: '100'
        },
        {
          label: '到站',
          prop: 'shipToCityName',
          width: '100'
        },
        {
          label: '货品名',
          prop: 'cargoName',
          width: '100'
        },
        {
          label: '发货人',
          prop: 'shipSenderName',
          width: '100'
        },
        {
          label: '发货人电话',
          prop: 'shipSenderMobile',
          width: '100'
        },
        {
          label: '收货人',
          prop: 'shipReceiverName',
          width: '100'
        },
        {
          label: '收货人电话',
          prop: 'shipReceiverMobile',
          width: '100'
        },
        {
          label: '货号',
          prop: 'shipGoodsSn',
          width: '100'
        },
        {
          label: '运单备注',
          prop: 'shipRemarks',
          width: '150'
        }
      ]
    }
  },
  watch: {
    popVisible(cval, oval) {},
    info: {
      handler(cval, oval) {
        this.loading = true
        this.fetchData()
        this.fetchBase()
      },
      deep: true
    }
  },
  mounted() {

  },
  methods: {
    init() {},
    doAction(type) {
      switch (type) {
        case 'discharge': // 卸货
          if (this.info.unloadSignName !== '未卸货') {
            this.discharge()
          } else {
            this.$message.warning('该批次已经卸货~')
          }
          break
        case 'export': // 导出
          SaveAsFile({
            data: this.dataList,
            columns: this.tableColumn,
            name: '途径卸货-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
        case 'print': // 打印
          PrintInFullPage({
            data: this.dataList,
            columns: this.tableColumn
          })
          break
      }
    },
    discharge() { // 卸货
      if (this.selectList.length < 1) {
        this.$message.warning('请选择需要卸货的运单')
        return false
      }
      let selectList = []
      this.selectList.forEach((el, index) => {
        selectList.push(el.id)
      })
      this.$confirm('请核对好卸货的运单哦！不要卸错货物~', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        unload(selectList).then(data => {
            this.$message.success('卸货成功!')
            this.$emit('success')
            this.closeMe()
          })
          .catch(err => {
            this._handlerCatchMsg(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

    },
    fetchData() { // 清单列表
      selectLoadDetailList(this.info.loadId).then(data => {
          if (data) {
            this.dataList = data
            this.toggleAllRows()
          }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    fetchBase() { // 批次详情
      this.searchQuery.vo.loadId = this.info.loadId
      selectLoadMainInfoList(this.searchQuery).then(data => {
          if (data && data.list.length) {
            this.formModel = data.list[0]
            this.formModel.userOrgName = this.otherinfo.orgName
          }
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this._handlerCatchMsg(err)
        })
    },
    toggleAllRows() {
      this.$nextTick(() => {
        this.dataList.forEach((e, index) => {
          this.$refs.multipleTable.toggleRowSelection(e, true)
          if (e.shipToOrgid === this.otherinfo.orgid && e.unloadSign !== 1) {
            this.$refs.multipleTable.toggleRowSelection(e, true)
          } else {
            this.$refs.multipleTable.toggleRowSelection(e, false)
          }
        })
      })
    },
    setTableWidth(newWidth, oldWidth, column, event) {
      console.log('set table:', newWidth, oldWidth, column)
      let find = this.tableColumn.filter(el => el.prop === column.property)
      if (find.length) {
        find[0].width = newWidth
        console.log('应该要显示保存框了')
        this.visible2 = true
        clearTimeout(this.tabletimer)
        this.tabletimer = setTimeout(() => {
          this.visible2 = false
        }, 10000)
      }
    },
    showSaveBox() {
      clearTimeout(this.tabletimer)
    },
    hideSaveBox() {
      clearTimeout(this.tabletimer)
      this.tabletimer = setTimeout(() => {
        this.visible2 = false
      }, 10000)
    },
    saveToTableSetup() {
      this.visible2 = false
      this.eventBus.$emit('tablesetup.change', this.thecode, this.tableColumn)
    },
    getSelection(list) {
      this.selectList = Object.assign([], list)
    },
    clickDetails(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    setTable() {
      this.$message.warning('功能尚在开发中,敬请期待~')
      // this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    closeMe(done) {
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = new Date().getTime() // 刷新表格视图
    }
  }
}

</script>
<style lang="scss">
$backgroundColor:#E9F3FA;
.discharge-pop {
  width: 1000px !important;
  .popRight-content {
    display: flex;
    flex-direction: column;
  }
  .discharge-head {
    background-color: $backgroundColor;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
  }
  .discharge-content {
    padding: 10px;
    height: 100%;
    .base-info {
      border-bottom: 2px dotted #ddd;
      padding-bottom: 10px;
      background-color: #fff;
      table {
        width: 100%;
        tbody {
          tr {
            font-size: 14px;
            th {
              color: #606266;
              font-weight: 400;
              width: 12%;
              height: 34px;
            }
            td {
              width: 21.3%;
              padding: 0 3px;
              .el-input.is-disabled .el-input__inner {
                background-color: #fff;
                color: #3e9ff1;
              }
            }
          }
        }
      }
    }
    .discharge-table {
      padding: 10px 0;
      height: calc(100% - 120px);
      display: flex;
      flex-direction: column;
      .btns_box {
        height: 28px;
        margin-bottom: 10px;
        clear: both;
        .table_setup {
          float: right;
          margin-right: 0px;
          margin-left: 5px;
        }
      }
      .detail-table {
        flex-grow: 1;
        height: calc(100%);
        .el-table {
          table {
            th,
            td {
              text-align: center;
            }
          }
        }
      }
    }
  }
  .discharge-footer {
    background-color: $backgroundColor;
  }
}

</style>
