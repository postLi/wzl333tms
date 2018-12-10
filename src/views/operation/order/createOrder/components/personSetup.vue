<template>
  <el-dialog
    title="个人设置"
    class="personalPopSetup"
    :visible="dialogVisiblePerson"
    custom-class="feeSetupDialog"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    append-to-body
    @opened="getPersonalSetup"
    width="725px"
    :before-close="close">
    <el-form :model="form" label-width="120px" ref="ruleForm" :inline="true" label-position="right" size="mini">
     <el-collapse v-model="activeNames">
      <el-collapse-item name="setup1" title="运单默认值设置">
        <el-form-item>
          <el-checkbox true-label="1"  false-label="0" v-model="form.shipDefault.openOrderAndTransferInfo">开单页面附带中转信息</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox true-label="1" disabled false-label="0" v-model="form.shipDefault.aloneWindow">开单页面独立窗口</el-checkbox>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item name="setup2" title="快捷键设置">
        <div @keydown.stop.prevent @keyup.stop.prevent @keypress.stop.prevent>
        <el-form-item label="清空">
          <el-input :disabled="!form.printKey.cleanKeyVisible" v-model="form.printKey.cleanKey" @keydown.stop.prevent.native="showkeycode('cleanKey', $event)" placeholder=""><template slot="append"><el-checkbox v-model="form.printKey.cleanKeyVisible" :true-label="1" :false-label="0" title="是否显示"></el-checkbox></template></el-input>
        </el-form-item>
        <el-form-item label="打印标签">
          <el-input :disabled="!form.printKey.printLibkeyVisible" v-model="form.printKey.printLibkey" placeholder="" @keydown.prevent.stop.native="showkeycode('printLibkey', $event)"><template slot="append"><el-checkbox v-model="form.printKey.printLibkeyVisible" :true-label="1" :false-label="0" title="是否显示"></el-checkbox></template></el-input>
        </el-form-item>
        <el-form-item label="打印运单">
          <el-input :disabled="!form.printKey.printShipKeyVisible" v-model="form.printKey.printShipKey" placeholder="" @keydown.prevent.stop.native="showkeycode('printShipKey', $event)"><template slot="append"><el-checkbox v-model="form.printKey.printShipKeyVisible" :true-label="1" :false-label="0" title="是否显示"></el-checkbox></template></el-input>
        </el-form-item>
        <el-form-item label="保存运单">
          <el-input :disabled="!form.printKey.saveShipKeyVisible" v-model="form.printKey.saveShipKey" placeholder="" @keydown.prevent.stop.native="showkeycode('saveShipKey', $event)"><template slot="append"><el-checkbox v-model="form.printKey.saveShipKeyVisible" :true-label="1" :false-label="0" title="是否显示"></el-checkbox></template></el-input>
        </el-form-item>
        <el-form-item label="保存并新增">
          <el-input :disabled="!form.printKey.saveInsertKeyVisible" v-model="form.printKey.saveInsertKey" placeholder="" @keydown.prevent.stop.native="showkeycode('saveInsertKey', $event)"><template slot="append"><el-checkbox v-model="form.printKey.saveInsertKeyVisible" :true-label="1" :false-label="0" title="是否显示"></el-checkbox></template></el-input>
        </el-form-item>
        <el-form-item label="保存并打印">
          <el-input :disabled="!form.printKey.savePrintKeyVisible" v-model="form.printKey.savePrintKey" placeholder="" @keydown.prevent.stop.native="showkeycode('savePrintKey', $event)"><template slot="append"><el-checkbox v-model="form.printKey.savePrintKeyVisible" :true-label="1" :false-label="0" title="是否显示"></el-checkbox></template></el-input>
        </el-form-item>
        <el-form-item label="打印运单和标签">
          <el-input :disabled="!form.printKey.printLibShipKeyVisible" v-model="form.printKey.printLibShipKey" placeholder="" @keydown.prevent.stop.native="showkeycode('printLibShipKey', $event)"><template slot="append"><el-checkbox v-model="form.printKey.printLibShipKeyVisible" :true-label="1" :false-label="0" title="是否显示"></el-checkbox></template></el-input>
        </el-form-item>
        <el-form-item label="保存新增并打印">
          <el-input :disabled="!form.printKey.saveInsertPrintKeyVisible" v-model="form.printKey.saveInsertPrintKey" placeholder="" @keydown.prevent.stop.native="showkeycode('saveInsertPrintKey', $event)"><template slot="append"><el-checkbox v-model="form.printKey.saveInsertPrintKeyVisible" :true-label="1" :false-label="0" title="是否显示"></el-checkbox></template></el-input>
        </el-form-item>
        </div>
      </el-collapse-item>
      <el-collapse-item name="setup3" title="运单默认值设置">
        <el-form-item label="交接方式">
          <SelectType type="ship_delivery_method" v-model="form.shipSetKey.handoverModeDefualt">
            <template slot-scope="{item}">
              <el-option class="checkSelectLabel" :disabled="!!form.shipSetKey.handoverMode[item.id]" :key="item.id" :label="item.dictName" :value="item.id">
                {{item.dictName}}<el-checkbox @click.stop.prevent.native="setSelectItem(form.shipSetKey.handoverMode,item.id)"  v-model="form.shipSetKey.handoverMode[item.id]" :true-label="0" :false-label="1" title="是否显示"></el-checkbox>
              </el-option>
            </template>
          </SelectType>
        </el-form-item>
        <el-form-item label="回单类型">
          <SelectType type="ship_receipt_require" v-model="form.shipSetKey.receiptType">
          </SelectType>
        </el-form-item>
        <el-form-item label="回单份数">
          <el-input class="huidanfenshu" v-model="form.shipSetKey.receiptNum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="付款方式">
          <SelectType type="ship_pay_way" v-model="form.shipSetKey.paymentMode">
          </SelectType>
        </el-form-item>
        <el-form-item label="运输方式">
          <SelectType type="ship_shipping_type" v-model="form.shipSetKey.transportMode">
          </SelectType>
        </el-form-item>
        <el-form-item label="业务类型">
          <SelectType type="ship_business_type" v-model="form.shipSetKey.businessType">
          </SelectType>
        </el-form-item>
        
      </el-collapse-item>
    </el-collapse>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="resetSetup">恢复默认设置</el-button>
      <el-button size="mini" type="primary" @click="submitFeeSetup">确 定</el-button>
      <el-button size="mini" @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import OrderApi from '@/api/operation/orderManage'
import SelectType from '@/components/selectType/index'
import hotkeys from '@/utils/hotkeys'

export default {
  components: {
    SelectType
  },
  props: {
    dialogVisiblePerson: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      feeData: [],
      // 用来搜索项
      query: '',
      sortOption: {
        group: 'item',
        sort: true,
        dataIdAttr: ''
      },
      activeNames: ['setup1', 'setup2', 'setup3', 'setup4'],
      form: {
        'shipDefault': {
          'openOrderAndTransferInfo': '0',
          'aloneWindow': '0'
        },
        'printKey': {
          'printLibkey': '',
          'savePrintKey': '',
          'saveShipKey': '',
          'cleanKey': '',
          'printShipKey': '',
          'saveInsertKey': '',
          'printLibShipKey': '',
          'saveInsertPrintKey': '',
          'printLibkeyVisible': 1,
          'savePrintKeyVisible': 1,
          'saveShipKeyVisible': 1,
          'cleanKeyVisible': 1,
          'printShipKeyVisible': 1,
          'saveInsertKeyVisible': 1,
          'printLibShipKeyVisible': 1,
          'saveInsertPrintKeyVisible': 1
        },
        'shipSetKey': {
          // 0 show
          // 1 hidden
          handoverMode: {
            '68': 0,
            '69': 0,
            '70': 0,
            '71': 0,
            '72': 0,
            '73': 0,
            '74': 0,
            '75': 0
          },
          handoverModeDefualt: '68',
          'receiptType': '',
          'receiptNum': '',
          'paymentMode': '',
          'transportMode': '',
          'businessType': ''
        }
      },
      'userId': 1
    }
  },
  mounted() {
    this.userId = this.otherinfo.id
  },
  methods: {
    setSelectItem(item, id) {
      const val = item[id]
      if (val === 0) {
        item[id] = 1
      } else {
        item[id] = 0
      }
    },
    close(done) {
      this.$emit('update:dialogVisiblePerson', false)
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    // 当打开设置窗口时，从后台获取最新的设置
    getPersonalSetup() {
      return OrderApi.getPersonalSetup(this.userId).then(res => {
        this.form = res
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    // 重置
    resetSetup() {
      return OrderApi.resetPersonalSetup(this.userId).then(res => {
        this.$message('重置成功！')
        this.getPersonalSetup(this.userId)
        // this.close()
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    // 提交修改
    submitFeeSetup() {
      const data = Object.assign({}, this.form)
      data.userId = this.userId
      return OrderApi.putPersonalSetup(data).then(res => {
        this.$message('修改成功！')
        this.$emit('success', data)
        this.close()
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    // 显示按键对应键名
    showkeycode(type, e) {
      e.preventDefault()
      e.stopPropagation()
      console.log('showkeycode:', e)
      this.$set(this.form.printKey, type, hotkeys.getPressedKey(e))
      // 需要判断是否与现有的快捷键冲突
      return false
    }
  }
}
</script>
<style lang="scss">
.checkSelectLabel .el-checkbox{
  float: right;
}
.personalPopSetup{
  .el-dialog__header, .el-dialog__footer{
    background: #eee;
    padding: 10px;
  }
  .el-dialog__headerbtn{
    top: 10px;
    right: 10px;
  }
  .el-dialog__body{
    padding: 10px;
    position: relative;
    min-height: 300px;
  }
  .el-dialog__title{
    font-size: 14px;
  }
  .el-switch__label{
    color: #999;
    font-size: 12px;
  }
  .el-switch__label.is-active{
    color: #409EFF;
  }

  

  .el-select{
    width: 178px;
  }

  .setup-info-fee{
    height: 258px;
    overflow: auto;
  }
  .dragArea{

  }
  .huidanfenshu{
    display: block;
    width: 178px;
    .el-input__inner{
      padding-right: 30px;
    }
  }
  .list-complete-item{
    clear: both;
    overflow: hidden;
    padding: 3px 0;
    border: 1px solid #fff;

    .el-checkbox{
      float: left;
      width: 186px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .switch-box{
      float: right;
      width: 70px;
    }
  }
  .searchinput,.tip-info{
    position: absolute;
    width: 100%;
    left: 0;
  }
  .searchinput{
    top: 5px;
    width: 90%;
    left: 5%;
  }
  .tip-info{
    font-size: 12px;
    color: #999;
    text-align: center;
    line-height: 20px;
    bottom: 0;
  }
  .sortable-ghost{
    border:1px dashed #f00;
    background: #ffe;
  }
}
</style>

