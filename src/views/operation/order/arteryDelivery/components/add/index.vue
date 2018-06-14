<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="arteryDeliveryPop" v-loading="loading">
    <template class="arteryDeliveryPop-content" slot="content">
      <div class="customer-manager">

        <div class="eltab clearfix">
          <span @click="component = 'Sender'" class="tab-label" :class="{'active-tab': component.indexOf('ender')!==-1}">批次详情</span>
          <span @click="component = 'Receiver'" class="tab-label" :class="{'active-tab': component.indexOf('eceiver')!==-1}">批次跟踪</span>
          <span @click="component = 'Receiver'" class="tab-label" :class="{'active-tab': component.indexOf('eceiver')!==-1}">运输合同</span>
        </div>
        <keep-alive>
          <component v-bind:is="component"></component>
        </keep-alive>
      </div>
    </template>
    <div slot="footer">
      <!--<el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>-->
      <!--<el-button @click="closeMe">取 消</el-button>-->
    </div>
  </pop-right>
  <!--<div class="customer-manager">-->
    <!--<div class="eltab clearfix">-->
      <!--<span @click="component = 'Sender'" class="tab-label" :class="{'active-tab': component.indexOf('ender')!==-1}">发货人</span>-->
      <!--<span @click="component = 'Receiver'" class="tab-label" :class="{'active-tab': component.indexOf('eceiver')!==-1}">收货人</span>-->
    <!--</div>-->
    <!--<keep-alive>-->
      <!--<component v-bind:is="component"></component>-->
    <!--</keep-alive>-->
  <!--</div>-->
</template>

<script>
  import popRight from '@/components/PopRight/index'
import Sender from './sender'
import Receiver from './receiver'

export default {
  components: {
    Sender,
    Receiver,
    popRight

  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      popTitle: '新增发货人',
      component: 'Sender'
    }
  },
  methods: {
    submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.loading = true
      //     let data = Object.assign({},this.form)
      //     data.fixPhone = this.fixPhone
      //     let promiseObj
      //     // 判断操作，调用对应的函数
      //     if(this.isModify){
      //       promiseObj = putCustomer(data)
      //     } else {
      //       promiseObj = postCustomer(data)
      //     }
      //
      //     promiseObj.then(res => {
      //       this.loading = false
      //       this.$alert('操作成功', '提示', {
      //         confirmButtonText: '确定',
      //         callback: action => {
      //           this.closeMe()
      //           this.$emit('success')
      //         }
      //       });
      //     }).catch(err => {
      //       this.loading = false
      //     })
      //   } else {
      //     return false;
      //   }
      // });
    },
    closeMe (done) {
      // this.reset()
      this.$emit('update:popVisible', false);
      if(typeof done === 'function'){
        done()
      }
    },
  }
}
</script>
<style lang="scss" scoped>
  .arteryDeliveryPop {
    left: auto;
    top: 50px;
    bottom: auto;
    min-width: 900px;
    max-width: 900px;
  }
  .arteryDeliveryPop .popRight-content{
    padding: 0 !important;
  }
  /*.arteryDelivery_lrl{*/
    /*padding: 0 !important;*/
  /*}*/
  .customer-manager{
    height: 100%;
    /*padding-top: 12px;*/
    .eltab{
      width: 100%;
      height: 32px;
      line-height: 30px;
      border-bottom: 1px solid #91cbf7;
    }
    .tab-label:first-child{
      margin-left: 1px;
      border-left-width: 1px;

    }
    .tab-label{
      float: left;
      padding-left: 12px;
      padding-right: 12px;
      border-radius: 3px 3px 0px 0px;
      border: solid 1px #d2d2d2;
      font-size: 14px;
      border-left-width: 0;
      border-bottom: 1px solid #3e9ff1;
      position: relative;
      top: 0px;
      cursor: pointer;

      &:hover{
        background: #ffffee;
      }
    }
    .active-tab{
      color:#3e9ff1;
      border-color: #3e9ff1;
      border-bottom-color: #fff;
      z-index: 2;
      left: -1px;
      top: -1px;
      border-left: 1px solid #3e9ff1;
      border-top-width: 2px;
    }
    .tab-content{
      width: 100%;
      /*padding: 0 20px;*/
    }
  }
</style>

