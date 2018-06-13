<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addCustomerPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <el-form  :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini" class="manage-add">
      <table>
        <tr>
          <td>运单号</td>
          <td><input type="text"/></td>
          <td>开单日期</td>
          <td><input type="text"/></td>
          <td>回单号</td>
          <td><input type="text"/></td>
          <td>回单数</td>
          <td><input type="text"/></td>
        </tr>
        <tr>
          <td>发货人</td>
          <td><input type="text"/></td>
          <td>发货人电话</td>
          <td><input type="text"/></td>
          <td>收货人</td>
          <td><input type="text"/></td>
          <td>收货人电话</td>
          <td><input type="text"/></td>
        </tr>
        <tr>
          <td>签收时间</td>
          <td><input type="text"/></td>
          <td>交接方式</td>
          <td><input type="text"/></td>
          <td>到付款</td>
          <td><input type="text"/></td>
          <td>代收货款</td>
          <td><input type="text"/></td>
        </tr>
      </table>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
// import { getAllCustomer } from '@/api/company/customerManage'
import { postAddOrder , postModifyOrder } from '@/api/operation/manage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    popRight,
    Upload,
    SelectTree,
    SelectType
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    orgid: {
      required: true
    },
    isModify: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    },
    issender: {
      type: Boolean,
      dafault: false
    }
  },
  computed: {
      ...mapGetters([
          'otherinfo'
      ])
  },
  data () {
    return {
      senderList: [],
      receiverList: [],
      searchSend: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgid": 1,
          customerType: 1
        }
      },
      searchShou: {
        "currentPage": 1,
        "pageSize": 100,
        "vo": {
          "orgid": 1,
          customerType: 2
        }
      },
      phoneshort: '', // 固话区号
      phonelong: '', // 固话号码
      //fixPhone: '',
      carObj: {
        cargoName:'',  // 货品名
        cargoAmount:'',  // 件数
        cargoWeight:'',  // 重量
        cargoVolume:'',  // 体积
        cargoPack:'',  // 包装
        description:''  // 品种规格
      },
      form: {
        
       
      },
      customSend:{
        // 发货人
        companyName:'',
        senderName:'',
        senderMobile:'',
        detailedAddress:'',
        customerType:1
      },
      customRece:{
        companyName:'',
        receiverName:'',
        receiverMobile:'',//
        detailedAddress:'',
        customerType:2
      },

      formLabelWidth: '1255px',
      tooltip: false,
      rules: {
      },
      popTitle: '新建',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      departments: [],
      groups: [],
      inited: false,

    }
  },
  mounted () {
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }
    // this.fetchAllCustomerFa(this.orgid).then(res => {
    //   this.loading = false
    //   // return res || []
    //   this.senderList = res
    //   // if(res == null){
    //   //
    //   // }
    // })
    // this.fetchAllCustomerShou(this.orgid).then(res => {
    //   this.loading = false
    //   this.receiverList = res
    // })
    // this.form.tmsOrderPre.orderFromOrgid = this.otherinfo.orgid
  },
  watch: {
    popVisible (newVal, oldVal) {
      if(!this.inited){
        this.inited = true
        this.initInfo()
      }
    },
    orgid (newVal) {
    },
    info () {
      if(this.isModify){
        this.popTitle = '修改'
        // this.customSend = this.setObject(this.customSend, this.info)
        // this.customRece = this.setObject(this.customRece, this.info)

        this.form.tmsOrderCargoList.cargoName = this.info.cargoName
        this.form.tmsOrderCargoList.cargoAmount = this.info.cargoAmount
        this.form.tmsOrderCargoList.cargoWeight = this.info.cargoWeight
        this.form.tmsOrderCargoList.cargoVolume = this.info.cargoVolume
        this.form.tmsOrderCargoList.cargoPack = this.info.cargoPack
        this.form.tmsOrderCargoList.description = this.info.description
        // 订单信息
        this.form.tmsOrderPre = this.setObject(this.form.tmsOrderPre, this.info)
      } else {
        this.popTitle = '新增'
        this.form.tmsOrderPre = this.setObject(this.form.tmsOrderPre)
        this.form.tmsOrderCargoList = [Object.assign({}, this.carObj)]
        // this.form.tmsOrderPre.orderFromOrgid = this.otherinfo.orgid

      }
      // this.form.tmsOrderPre.orderPickupMethod = 1
    }
  },
  methods: {
    querySearchSender (name) {
      let _this = this
      return function(query, cb){
        let data = _this.senderList.filter(el => {
          return el[name].indexOf(query) !== -1
        })
        cb(data)
      }
    },
    handleSelectSender(res){
      this.customSend.senderName = res.customerName
      this.customSend.companyName = res.companyName
      this.customSend.senderMobile = res.customerMobile
      this.customSend.detailedAddress = res.detailedAddress
      this.customSend.customerType = res.customerType
    },
    querySearchReceiver (name) {
      let _this = this
      return function(query, cb){
        let data = _this.receiverList.filter(el => {
          return el[name].indexOf(query) !== -1
        })
        cb(data)
      }
    },
    handleSelectReceiver(res){
      // receiverName:'',
      //   receiverMobile:'',//
      //   detailedAddress:'',
      this.customRece.receiverName = res.customerName
      this.customRece.companyName = res.companyName
      this.customRece.receiverMobile = res.customerMobile
      this.customRece.detailedAddress = res.detailedAddress
      this.customRece.customerType = res.customerType
    },
    setObject(obj1, obj2) {
      for (var i in obj1) {
        obj1[i] = obj2 ? obj2[i] : ''
      }
      return obj1
    },
    //
    // fetchAllCustomerFa () {
    //   this.loading = true
    //   return getAllCustomer(this.searchSend).then(data => {
    //     return data.list || []
    //     let res = data.list[0]
    //     if(res){
    //       this.customSend.senderName = res.customerName
    //       this.customSend.companyName = res.companyName
    //       this.customSend.senderMobile = res.customerMobile
    //       this.customSend.detailedAddress = res.detailedAddress
    //       this.customSend.customerType = res.customerType
    //     }

    //     this.loading = false
    //   })
    // },
    // fetchAllCustomerShou () {
    //   this.loading = true
    //   return getAllCustomer(this.searchShou).then(data => {
    //     return data.list || []
    //     let res = data.list[0]
    //     if(res){
    //       // for(var i in this.customRece){
    //       //   this.customRece[i] = res[i]
    //       // }
    //       this.customRece.senderName = res.customerName
    //       this.customRece.companyName = res.companyName
    //       this.customRece.senderMobile = res.customerMobile
    //       this.customRece.detailedAddress = res.detailedAddress
    //       this.customRece.customerType = res.customerType
    //     }
    //     this.loading = false
    //   })
    // },
    initInfo () {
      this.loading = false
    },
    getOrgid (id) {
      // this.form.orgid = id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.customerList[0] = this.customSend
          this.form.customerList[1] = this.customRece
          let promiseObj
          // 判断操作，调用对应的函数
          if(this.isModify){
            this.form.customerList[0].customerId = 1
            this.form.customerList[1].customerId = 1
            let data = this.form
            promiseObj = postModifyOrder(data)
          } else {
            let data = this.form
            promiseObj = postAddOrder(data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.closeMe()
                this.$emit('success')
              }
            });
          }).catch(err => {
            this.loading = false
          })
        } else {
          return false;
        }
      });
    },
    reset () {
      this.$refs['ruleForm'].resetFields()
      this.form.licensePicture = ''
      this.form.idCardPositive = ''
      this.form.idCardVerso = ''
    },
    closeMe (done) {
      this.reset()
      this.$emit('update:popVisible', false);
      if(typeof done === 'function'){
        done()
      }
    },
  }
}
</script>
<style lang="scss">
  .selectListOption_lrl{
    clear:both;
    span{
      display: inline-block;
      width: 50%;
    }
    .addr{
      text-align: right;
      color: #999;
      font-size: 12px;
    }
  }
.addCustomerPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 700px;
  max-width:  700px;

  .el-autocomplete{
    width: 100%;
  }

  .el-form--inline .el-form-item{
    margin-right: -9px;
    width: 90%;
    display: flex;
  }

  .el-form-item__content{
    flex:1;
  }

  .select-tree{
    width: 100%;
  }

  .customerPhone .el-form-item__content{
    display: flex;
  }
  .phoneshort{
    width: 78px;
  }
  .phonelong{
    flex:1;
  }

  .licensePicture{
    height: 116px;
    line-height: 1.2;
  }

  .popRight-content{
    /*padding: 20px 24px 0;*/
    box-sizing: border-box;
  }


  .idcard-pos,.idcard-ver{
    width: 234px;
    height: 136px;
    float: left;
    line-height: 1.2;

    .upload-container{
      height: 100%;
    }
  }
  .idcard-ver{
    float: right;
  }

  .el-select .el-input__inner{
    /*padding-right: 15px;*/
  }
}
  /*收货-发货方*/
.manage-add-table-top,.manage-add-table-center,.manage-add-table-foot{
  height: 100%;
  width: 100%;
}
.manage-add-table-foot{
  margin-top: 10px;
}
.manage-add-table-top th,.manage-add-table-center th,.manage-add-table-foot th{
  width: 50%;
  height: 30px;
  background: #eee;
  margin-left: 10px;
  font-size: 14px;
  padding: 2px 2px 2px 5px !important;
}
.manage-add-table-center th,.manage-add-table-foot th{
  background:transparent;
  width: 0;
}
.manage-add-table-foot{}
.manage-add-table-top th, .manage-add-table-top td , .manage-add-table-center td{
  border: 1px solid #ccc;
  padding: 2px;
  text-align: left;
  font-size: 14px;
}
.manage-add-table-top th:nth-of-type(1) {
  padding-left: 10px !important;
}
.manage-add-table-top .el-input--mini .el-input__inner,.manage-add-table-center .el-input--mini .el-input__inner{
  height: 40px;
  line-height: 40px;
  padding: 0;
}
.manage-add-table-center .el-input--mini .el-input__inner{
  height: 40px;
  line-height: 40px;
  padding-left: 5px;
}
.manage-add-table-top .el-form-item,.manage-add-table-center .el-form-item{
  margin-bottom: 0;

}
.manage-add-table-top .el-form-item__label,.manage-add-table-center .el-form-item__label{
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding-left: 10px;
}
.manage-add-table-top .el-input__inner,.manage-add-table-center .el-input__inner{
  border-color: transparent;
}
.manage-add-table-top .el-input__inner:hover,.manage-add-table-center .el-input__inner:hover{
  border-color: transparent;
}
.manage-add-table-top .el-input__inner:focus,.manage-add-table-center .el-input__inner:focus{
  border-color: transparent;
}


/*.manage-add-table-top .el-input--mini .el-input__inner, .manage-add-table-center .el-input--mini .el-input__inner{*/
  /**/
/*}*/

.manage-add-table-top .el-form-item--mini .el-form-item__content{
  line-height: 0;
}
.manage-add-table-top .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus{
  border-color: transparent;
  /*height: 30px;*/
  line-height: 30px;
}
manage-add-table-top .el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 37%;
  left: 59%;
}
.info ,.info_order{
  height: 36px;
  line-height: 36px;
  border: 1px solid #ccc;
  margin-top: 12px;
  padding-left: 10px;
  font-size: 14px;
  color: #333;
  font-weight: 600;

}
.info_order{
  margin-top:0;
  border: 1px solid transparent;
}
.manage-add-table-foot .el-form-item--mini {
  margin-left: 12px;
}

  .manage-add div.el-form-item{
    width: 40%;
  }
  .add-textarea .el-textarea__inner {
    width: 570%;
    padding: 15px 0 0 10px;
  }
</style>

