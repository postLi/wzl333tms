<template>
  <div class="fee-steup" v-loading="loading">
    <div class="fee-steup-form">
      <el-collapse v-model="feeInfo">
        <el-collapse-item name="feeInfoOne">
          <template slot="title">
            车辆信息
          </template>
          <div class="feeFrom clearfix">
            <el-form :model="formModel" :size="btnsize" ref="formModel" label-width="110px" :rules="formModelRules">
              <div class="feeFrom-type-baseInfo">
                <el-form-item label="单据号" prop="settlementSn">
                  <querySelect v-model="formModel.settlementSn" search="shipSn" type="order" valuekey="shipSn" clearable></querySelect>
                </el-form-item>
                <el-form-item label="收入金额" prop="amount">
                  <el-input :size="btnsize" v-model="formModel.amount" clearable placeholder="收入金额"></el-input>
                </el-form-item>
                <el-form-item label="发生时间" prop="settlementTime">
                  <el-date-picker size="mini" v-model="formModel.settlementTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="发生时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="经办人" prop="agent">
                  <querySelect :size="btnsize" v-model="formModel.agent" valuekey="id" search="name" label="name" placeholder="选择经办人" />
                </el-form-item>
              </div>
              <div class="feeFrom-type-baseInfo">
                <el-form-item label="收支方式" prop="financialWay">
                  <selectType :size="btnsize" v-model="formModel.financialWay" type="financial_way_type" clearable placeholder="选择收支方式"></selectType>
                </el-form-item>
                <el-form-item label="银行卡号" prop="bankAccount">
                  <el-input :size="btnsize" v-model="formModel.bankAccount" clearable></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="wechatAccount">
                  <el-input :size="btnsize" v-model="formModel.wechatAccount" placeholder="微信号" clearable></el-input>
                </el-form-item>
                <el-form-item label="支付宝号" prop="alipayAccount">
                  <el-input :size="btnsize" v-model="formModel.alipayAccount" placeholder="支付宝号" clearable></el-input>
                </el-form-item>
              </div>
              <el-form-item label="说明">
                <el-input :size="btnsize" v-model="formModel.remark" placeholder="说明" clearable></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 操作按钮区 -->
      <div class="fee_btn_boxs">
        <el-button :size="btnsize" plain type="primary" @click="doAction('save')" icon="el-icon-printer">保存并打印</el-button>
        <el-button :size="btnsize" plain type="primary" @click="doAction('save')" icon="el-icon-document">保存</el-button>
        <el-button :size="btnsize" plain type="primary" @click="doAction('cancel')" icon="el-icon-circle-close-outline">取消</el-button>
      </div>
      <!-- 穿梭框 -->
      <div class="fee_btn_transferTable">
        <dataTable @loadTable="getLoadTable" :setLoadTable="setLoadTableList" :isModify="isEdit" @change="getTableChange"></dataTable>
      </div>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import selectType from '@/components/selectType/index'
import SelectTree from '@/components/selectTree/index'
import querySelect from '@/components/querySelect/index'
import { objectMerge2, parseTime } from '@/utils/index'
import { getSystemTime } from '@/api/common'
import dataTable from './components/dataTable'
import { getFeeInfo, getOrderShipList } from '@/api/finance/settleLog'
export default {
  components: {
    SelectTree,
    selectType,
    querySelect,
    dataTable
  },
  data() {
    return {
      paymentsType: 1, // 收支类型, 0 收入, 1 支出
      loading: false,
      feeInfo: 'feeInfoOne',
      btnsize: 'mini',
      formModel: {
        settlementTime: new Date()
      },
      formModelRules: {},
      setLoadTableList: {},
      isEdit: false
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  mounted() {
    this.getFeeInfo()
  },
  methods: {
    getFeeInfo() {
      getFeeInfo(this.otherinfo.orgid, this.paymentsType).then(data => {
        this.formModel = data.szDtoList[0]
        console.log('getFeeInfo', data)
      })
    },
    doAction(type) {
      switch (type) {
        case 'save': // 保存
          this.save()
          break
        case 'cancel': // 取消
          this.cancel()
          break
      }
    },
    save() {},
    cancel() {},
    getLoadTable(obj) {
      console.log(obj)
    },
    getTableChange(obj) {
      console.log(obj)
    }
  }
}

</script>
<style lang="scss">
.fee-steup {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  .fee_btn_transferTable {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }
  .fee_btn_boxs {
    position: relative;
    top: 18px;
    right: 10px;
    z-index: 33;
    text-align: right;
    height: 0;
  }
  .fee-steup-form {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 10px 0 10px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    .feeFrom {
      margin-bottom: 10px;
      padding: 0 10px;
      .feeFrom-type {
        position: absolute;
        z-index: 33;
        right: 40px;
        top: 20px;
      }
      .formItemTextDanger {
        .el-form-item__label {
          color: #ef0000;
        }
      }
    }
    .el-collapse {
      border: 2px solid #cdf;
    }
    .el-collapse-item__content {
      padding: 0;
    }
    .el-collapse-item__header {
      border-bottom: 2px solid #cdf;
      background-color: #FFFFFF;
      padding: 0 0 0 20px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #333;
      position: relative;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .el-collapse-item__arrow {
      position: absolute;
      left: 20px;
      top: 5px;
    }
    .feeFrom-type-baseInfo {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: -10px;
      .el-input {
        width: 220px;
      }
    }
  }
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}

ul.feeList {
  margin: 10px;
  border: 1px solid #d0d7e5;
  display: flex;
  li {
    text-align: center;
    height: 70px;
    border-right: 1px solid #d0d7e5;
    p {
      background-color: #eaf0ff;
      line-height: 36px;
      margin-bottom: -5px;
    }
    .el-input__inner {
      margin-top: -5px;
      height: 33px;
      border: none;
    }
    .el-input__inner:focus {
      background-color: #d0d7e5;
      border-radius: 0px;
    }
    .el-form-item__error {
      margin-top: -6px;
    }
  }
}

</style>
