<template>
  <el-dialog
    title="个人设置"
    class="personalPopSetup"
    :visible="dialogVisiblePersion"
    custom-class="feeSetupDialog"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    @open="getFeeSetup"
    width="600px"
    :before-close="close">
    <el-form :model="form" label-width="100px" ref="ruleForm" :inline="true" label-position="right" size="mini">
     <el-collapse v-model="activeNames">
      <el-collapse-item name="setup1" title="运单默认值设置">
        <el-form-item>
          <el-checkbox true-label="1"  false-label="0" v-model="form.shipFee">开单页面附带中转信息</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox true-label="1" disabled false-label="0" v-model="form.shipFee">开单页面独立窗口</el-checkbox>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item name="setup2" title="快捷键设置">
        <el-form-item label="清空">
          <el-input v-model="form.clear" @keydown.native="showkeycode('clear', $event)" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="打印标签">
          <el-input v-model="form.printTag" placeholder="" @keydown.native="showkeycode('printTag', $event)"></el-input>
        </el-form-item>
        <el-form-item label="打印运单">
          <el-input v-model="form.printOrder" placeholder="" @keydown.native="showkeycode('printOrder', $event)"></el-input>
        </el-form-item>
        <el-form-item label="保存运单">
          <el-input v-model="form.save" placeholder="" @keydown.native="showkeycode('save', $event)"></el-input>
        </el-form-item>
        <el-form-item label="保存并打印">
          <el-input v-model="form.saveAndPrint" placeholder="" @keydown.native="showkeycode('saveAndPrint', $event)"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item name="setup3" title="运单默认值设置">
        <el-form-item label="交接方式">
          <SelectType type="ship_delivery_method" v-model="form.shipPageFunc">
          </SelectType>
        </el-form-item>
        <el-form-item label="回单类型">
          <SelectType type="ship_receipt_require" v-model="form.shipPageFunc">
          </SelectType>
        </el-form-item>
        <el-form-item label="回单份数">
          <el-input v-model="form.cargoNo" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="付款方式">
          <SelectType type="ship_pay_way" v-model="form.shipPageFunc">
          </SelectType>
        </el-form-item>
        <el-form-item label="运输方式">
          <SelectType type="ship_shipping_type" v-model="form.shipPageFunc">
          </SelectType>
        </el-form-item>
        <el-form-item label="业务类型">
          <SelectType type="ship_business_type" v-model="form.shipPageFunc">
          </SelectType>
        </el-form-item>
        
      </el-collapse-item>
    </el-collapse>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="close">恢复默认设置</el-button>
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button size="mini" type="primary" @click="close">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import OrderApi from  '@/api/operation/orderManage'
import SelectType from '@/components/selectType/index'
import hotkeys from '@/utils/hotkeys'

export default {
  components: {
    SelectType
  },
  props: {
    dialogVisiblePersion: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 搜索项不参与拖拉排序
    searchList () {
      if(this.query){
        return this.feeData.filter(el=>{
          return el.name.indexOf(this.query) !== -1
        })
      } else {
        return []
      }
    }
  },
  data () {
    return {
      feeData: [],
      // 用来搜索项
      query: "",
      sortOption: {
        group:'item',
        sort: true,
        dataIdAttr: ''
      },
      activeNames: ['setup1','setup2','setup3','setup4'],
      form: {}
    }
  },
  mounted () {

  },
  methods: {
    close(done){
      this.$emit('update:dialogVisiblePersion', false)
      this.$emit('close')
      if(typeof done === 'function'){
        done()
      }
    },
    // 当打开设置窗口时，从后台获取最新的设置
    getFeeSetup() {
      return OrderApi.getFeeSetup().then(res => {
        this.feeData = res
      })
    },
    submitFeeSetup() {
      return OrderApi.putChangeFeeSetup()
    },
    changeList(el){

      console.log(this.feeData)
    },
    search () {
      
    },
    canDragStart(list){
      return !list.draggedContext.element.isfixed
    },
    showkeycode (type, e) {
      let name = e.code
      let code = e.keyCode
      // 数字0-9 字母a-z
      if((code >= 65 && code <= 90) || (code >= 48 && code <= 57)){
        name = e.key
      } else if(code >= 96 && code <= 105) {
        // 小键盘0-9
        name = "numpad " + e.key
      }
      console.log("showkeycode:",e.code,e.key,e.keyCode,e)
      this.$set(this.form, type, name)
      e.preventDefault()
      //alert(e)
    }
  }
}
</script>
<style lang="scss">
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

  .el-collapse-item__header{
    background: #E9F3FA;
    text-align: left;
    text-indent: 40px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #333;
    position: relative;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .el-collapse-item__arrow{
    position: absolute;
    left: 12px;
    top: 0;
    line-height: 30px;
    text-indent: 0;
  }
  .el-collapse-item__content{
    padding-bottom: 10px;
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

