<template>
  <div class="load-steup">
    <!-- 新增配载 -->
    <div class="load-steup-form" v-loading="loading">
      <el-collapse v-model="loadTruck">
        <el-collapse-item name="loadTruckOne">
          <template slot="title">
            车辆信息 {{truckMessage}}
          </template>
          <div class="clearfix loadFrom">
            <el-form :model="formModel" ref="formModel" class="demo-form-inline" label-width="120px">
              <el-row :gutter="4">
                <el-col :span="6">
                  <el-form-item label="到达网点">
                    <SelectTree v-model="formModel.orgid" clearable></SelectTree>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="分摊方式">
                    <selectType v-model="formModel.apportionTypeName" type="apportion_type" clearable :type="mini"></selectType>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="车牌号码">
                    <el-input :type="mini" v-model="formModel.truckIdNumber" placeholder="车牌号码" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机名称">
                    <el-input :type="mini" v-model="formModel.dirverName" placeholder="司机名称" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机电话">
                    <el-input :type="mini" v-model="formModel.dirverMobile" placeholder="司机电话" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="可载重量">
                    <el-input :type="mini" v-model="formModel.user" placeholder="可载重量" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="可载体积">
                    <el-input :type="mini" v-model="formModel.user" placeholder="可载体积" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="短驳费">
                    <el-input :type="mini" v-model="formModel.user" placeholder="短驳费" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="审批人">
                    <el-input :type="mini" v-model="formModel.user" placeholder="审批人"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="要求到达日期">
                    <el-date-picker v-model="formModel.time2" type="date" placeholder="要求到达日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="短驳日期">
                    <el-date-picker v-model="formModel.time1" type="date" placeholder="短驳日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="备注">
                    <el-input type="textarea" :rows="2" v-model="formModel.remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="load_btn_boxs">
        <el-button size="mini" icon="el-icon-goods" plain type="primary" @click="doAction('precent')">配载率</el-button>
        <el-button size="mini" icon="el-icon-sort" plain type="primary" @click="doAction('finish')">完成配载</el-button>
        <el-button size="mini" icon="el-icon-news" plain type="primary" @click="doAction('finishTruck')">完成并发车</el-button>
      </div>
      <dataTable @loadTable="getLoadTable"></dataTable>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getBatchNo, getSelectAddLoadRepertoryList, postLoadInfo } from '@/api/operation/load'
import selectType from '@/components/selectType/index'
import dataTable from './components/dataTable'
import SelectTree from '@/components/selectTree/index'
export default {
  data() {
    return {
      tablekey: '',
      loadTruck: '',
      truckMessage: '',
      formModel: {},
      loadTruck: 'loadTruckOne',
      loading: false,
      selectedRight: [],
      selectedLeft: [],
      leftTable: [],
      rightTable: [],
      loadTableInfo: [],
      mini: 'mini',
      loadInfo: {
        tmsOrderLoad: {},
        tmsOrderLoadDetailsList: [],
        tmsOrderLoadFee: {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  components: {
    selectType,
    dataTable,
    SelectTree
  },
  mounted() {
    this.getLoadNo()
    this.getSelectAddLoadRepertoryList()
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validator(valid => {
        if (valid) {
          console.log('load form truck')
        }
      })
    },
    getLoadNo() {
      return getBatchNo(this.otherinfo.orgid).then(data => {
        this.truckMessage = data.text
      })
    },
    getSelectAddLoadRepertoryList() {
      return getSelectAddLoadRepertoryList(this.otherinfo.orgid).then(data => {
        this.leftTable = data.data
      })
    },
    changeTableKey() {
      this.tablekey = Math.random()
    },
    doAction(type) {
      switch (type) {
        case 'precent':
          break
        case 'finish':
          this.finishLoadInfo()
          break
        case 'finishTruck':
          break
      }
    },
    finishLoadInfo() {
      this.setData()
      // let loadData = Object.assign({}, this.loadData)
      // this.$set(loadData, 'tmsOrderLoad', this.formModel)
      // this.$set(loadData, 'tmsOrderLoadDetailsList', this.loadTableInfo)
      // this.$set(loadData, 'tmsOrderLoadFee', this.formModel)
      // console.log('sdfsdfsdf', this.loadTableInfo)
      this.$message({ type: 'warning', message: '要处理数据~' })
      // postLoadInfo(this.loadInfo).then(data => {
      //   console.log('添加啦')
      // })
    },
    getLoadTable(obj) {
      this.loadTableInfo = Object.assign(this.loadTableInfo, obj)
      console.log('传回来的数据', obj)
    },
    setData() { // 处理数据格式。。。
      console.log(this.loadInfo)
    }
  }
}

</script>
<style lang="scss">
.load-steup {
  height: calc(100%);
  display: flex;
  flex-direction: column;
  position: relative;
  .load-steup-form {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 10px 0 10px;
    height: 100%;
    position: relative;
    .load_btn_boxs {
      position: absolute;
      float: right;
      right: 10px;
      margin-top: 8px;
      z-index: 33;
    }
    .loadFrom {
      padding: 0 20px;
    }
    .el-collapse {
      border: 1px solid #E0E0E0;
    }
    .el-collapse-item__header {
      background: #E9F3FA;
      padding: 2px 0 0 60px;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      color: #333;
      position: relative;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .el-collapse-item__arrow {
      position: absolute;
      left: 30px;
      top: -3px;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
      .el-form-item__content>.el-input {
        width: 150px;
      }
    }
    .el-form-item--mini.el-form-item {
      margin-bottom: 5px;
    }
  }
}

</style>
