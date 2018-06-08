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
            <el-form :model="formModel" ref="formModel" class="demo-form-inline" label-width="110px" :rules="formModelRules">
              <!-- 基本信息 -->
              <el-row :gutter="4">
                <el-col :span="6">
                  <el-form-item label="到达网点">
                    <SelectTree v-model="formModel.arriveOrgid" clearable size="mini">
                    </SelectTree>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="分摊方式">
                    <selectType v-model="formModel.apportionTypeName" type="apportion_type" clearable size="mini"></selectType>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="车牌号码">
                    <el-autocomplete popper-class="my-autocomplete" v-model="formModel.truckIdNumber" :fetch-suggestions="querySearchTruck" placeholder="车牌号码" size="mini" @select="handleSelectTruck">
                      <i class="el-icon-plus el-input__icon" slot="suffix" @click="doAction('addTruck')"></i>
                      <template slot-scope="{ item }">
                        <div class="name">{{ item.truckIdNumber }}</div>
                      </template>
                    </el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机名称">
                    <el-autocomplete popper-class="my-autocomplete" v-model="formModel.dirverName" :fetch-suggestions="querySearch" placeholder="司机名称" size="mini" @select="handleSelect">
                      <i class="el-icon-plus el-input__icon" slot="suffix" @click="doAction('addDriver')"></i>
                      <template slot-scope="{ item }">
                        <div class="name">{{ item.driverName }}</div>
                        <span class="addr">{{ item.driverMobile? item.driverMobile : '无手机号码' }}</span>
                      </template>
                    </el-autocomplete>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机电话">
                    <el-input size="mini" v-model="formModel.dirverMobile" placeholder="司机电话">
                      <i slot="suffix" class="el-input__icon el-icon-plus" @click="doAction('addDriver')"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="可载重量">
                    <el-input size="mini" v-model.number="formModel.truckLoad" placeholder="可载重量" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="可载体积">
                    <el-input size="mini" v-model="formModel.truckVolume" placeholder="可载体积" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="配载日期">
                    <el-date-picker size="mini" v-model="formModel.loadTime" type="datetime" placeholder="配载日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="预计到达日期">
                    <el-date-picker size="mini" v-model="formModel.planArrivedTime" type="datetime" placeholder="预计到达日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="备注">
                    <el-input size="mini" type="textarea" :rows="2" v-model="formModel.remark" maxlength="10"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!-- 费用参数 -->
            <el-form label-width="0px" :model="formFee" :rules="formFeeRules">
              <ul class="feeList">
                <li>
                  <p>现付运费</p>
                  <el-form-item prop="nowpayCarriage">
                    <el-input v-model="formFee.nowpayCarriage" maxlength="10"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>现付油卡</p>
                  <el-form-item prop="nowpayOilCard">
                    <el-input v-model="formFee.nowpayOilCard" maxlength="10"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>回付运费</p>
                  <el-form-item prop="backpayCarriage">
                    <el-input v-model="formFee.backpayCarriage" maxlength="10"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>回付油卡</p>
                  <el-form-item prop="backpayOilCard">
                    <el-input v-model="formFee.backpayOilCard" maxlength="10"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>到付运费</p>
                  <el-form-item prop="arrivepayCarriage">
                    <el-input v-model="formFee.arrivepayCarriage" maxlength="10"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>到付油卡</p>
                  <el-form-item prop="arrivepayOilCard">
                    <el-input v-model="formFee.arrivepayOilCard" maxlength="10"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>整车保险费</p>
                  <el-form-item prop="carloadInsuranceFee">
                    <el-input v-model="formFee.carloadInsuranceFee" maxlength="10"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>发站装卸费</p>
                  <el-form-item prop="leaveHandlingFee">
                    <el-input v-model="formFee.leaveHandlingFee" maxlength="10"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>发站其他费</p>
                  <el-form-item prop="leaveOtherFee">
                    <el-input v-model="formFee.leaveOtherFee" maxlength="10"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>到站装卸费</p>
                  <el-form-item prop="arriveHandlingFee">
                    <el-input v-model="formFee.arriveHandlingFee" maxlength="10"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>到站其他费</p>
                  <el-form-item prop="arriveOtherFee">
                    <el-input v-model="formFee.arriveOtherFee" maxlength="10"></el-input>
                  </el-form-item>
                </li>
              </ul>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 操作按钮区 -->
      <div class="load_btn_boxs">
        <el-button size="mini" icon="el-icon-goods" plain type="primary" @click="doAction('precent')">配载率</el-button>
        <el-button size="mini" icon="el-icon-sort" plain type="primary" @click="doAction('finish')">完成配载</el-button>
        <el-button size="mini" icon="el-icon-news" plain type="primary" @click="doAction('finishTruck')">完成并发车</el-button>
      </div>
      <!-- 穿梭框 -->
      <dataTable @loadTable="getLoadTable"></dataTable>
      <!-- 添加车辆信息 -->
      <addTruckInfo :truckSources="truckSources" :truckTypes="truckTypes" :issender="true" :isModify="isModify" :info="selectInfo" :orgid="orgid" :popVisible.sync="addTruckVisible" @close="closeAddTruckVisible" @success="fetchData"></addTruckInfo>
      <!-- 添加司机信息 -->
      <addDriverInfo :licenseTypes="licenseTypes" :issender="true" :isModifyDriver="isModifyDriver" :infoDriver="selectInfoDriver" :orgid="orgid" :popVisible.sync="addDriverVisible" @close="closeAddDriver" @success="fetchData"></addDriverInfo>
    </div>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { getBatchNo, getSelectAddLoadRepertoryList, postLoadInfo } from '@/api/operation/load'
import { getAllDriver } from '@/api/company/driverManage'
import { getAllTrunk } from '@/api/company/trunkManage'
import selectType from '@/components/selectType/index'
import dataTable from './components/dataTable'
import SelectTree from '@/components/selectTree/index'
import addTruckInfo from './components/addTruckInfo'
import addDriverInfo from './components/addDriverInfo'
export default {
  data() {
    const validatetruckIdNumber = function(rule, value, callback) {}
    const validateFormMobile = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (REGEX.MOBILE.test(value)) {
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }
    const validateInt = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (REGEX.ONLY_NUMBER_GT.test(value)) {
        callback()
      } else {
        callback(new Error('请输入整数'))
      }
    }
    const validateBigDecimal = function(rule, value, callback) {
      if (value === '' || value === null || !value || value === undefined) {
        callback(new Error('不能为空'))
      } else if (REGEX.FLOAT2ING.test(value)) {
        callback()
      } else {
        callback(new Error('请输入最多两位小数'))
      }
    }
    return {
      tablekey: '',
      loadTruck: '',
      truckMessage: '',
      formModel: {
        'orgid': '',
        tmsOrderLoadFee: {},
        tmsOrderLoad: {
          arriveOrgid: ''
        }
      },
      formFee: {},
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
      },
      isModify: false,
      addTruckVisible: false,
      truckSources: [],
      truckTypes: [],
      selectInfo: {},
      licenseTypes: [],
      isModifyDriver: false,
      selectInfoDriver: {},
      addDriverVisible: false,
      DriverList: [],
      TruckList: [],
      cacheDriverList: {},
      cacheTruckList: {},
      Drivers: [],
      Trucks: [],
      inited: false,
      formModelRules: {},
      formFeeRules: {
        nowpayCarriage: [{ required: true, trigger: 'blur', validator: validateInt }],
        nowpayOilCard: [{ required: true, trigger: 'blur', validator: validateInt }],
        backpayCarriage: [{ required: true, trigger: 'blur', validator: validateBigDecimal }],
        backpayOilCard: [{ required: true, trigger: 'blur', validator: validateBigDecimal }],
        arrivepayCarriage: [{ required: true, trigger: 'blur', validator: validateBigDecimal }],
        arrivepayOilCard: [{ required: true, trigger: 'blur', validator: validateBigDecimal }],
        carloadInsuranceFee: [{ required: true, trigger: 'blur', validator: validateBigDecimal }],
        leaveHandlingFee: [{ required: true, trigger: 'blur', validator: validateBigDecimal }],
        leaveOtherFee: [{ required: true, trigger: 'blur', validator: validateBigDecimal }],
        arriveHandlingFee: [{ required: true, trigger: 'blur', validator: validateBigDecimal }],
        arriveOtherFee: [{ required: true, trigger: 'blur', validator: validateBigDecimal }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    arriveOrgid(newVal) {
      this.formModel.tmsOrderLoad.arriveOrgid = newVal
      // return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    },
    orgid() {}
  },
  components: {
    selectType,
    dataTable,
    SelectTree,
    addTruckInfo,
    addDriverInfo
  },
  mounted() {
    this.getLoadNo()
    this.getSelectAddLoadRepertoryList()
    this.formModel.orgid = this.orgid
    this.DriverList = this.Drivers
    this.TruckList = this.Trucks
    if (!this.inited) {
      this.inited = true
      this.initInfo()
    }
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
        case 'precent': // 设置配载率
          break
        case 'finish': // 完成配载
          this.finishLoadInfo()
          break
        case 'finishTruck': // 完成并发车
          break
        case 'addTruck': // 添加车辆信息
          this.addTruck()
          break
        case 'addDriver': // 添加司机信息
          this.addDriver()
          break
        case 'addOrg': // 添加网点
          this.addOrg()
      }
    },
    finishLoadInfo() {
      this.setData()
      console.log('postInfo', this.loadInfo)
      this.$nextTick(() => {
        this.$message({ type: 'warning', message: '功能未完成，敬请期待~' })
        // postLoadInfo(this.loadInfo).then(data => {
        //   this.$message({ type: 'success', message: '操作成功' })
        // })
      })
    },
    getLoadTable(obj) {
      this.loadTableInfo = Object.assign(this.loadTableInfo, obj)
    },
    setData() { // 处理数据格式。。。
      this.$set(this.formModel.tmsOrderLoad, 'batchNo', this.truckMessage)
      this.$set(this.formModel.tmsOrderLoad, 'orgid', this.otherinfo.orgid)
      this.$set(this.formModel.tmsOrderLoad, 'loadTypeId', 1) // 配载类型： 1-干线
      this.$set(this.formModel.tmsOrderLoad, 'batchTypeId', 1) // 批次状态： 1-干线
      this.loadInfo.tmsOrderLoadFee = Object.assign(this.loadInfo.tmsOrderLoadFee, this.formFee)
      this.loadInfo.tmsOrderLoad = Object.assign(this.loadInfo.tmsOrderLoad, this.formModel)
      this.loadInfo.tmsOrderLoadDetailsList = Object.assign(this.loadInfo.tmsOrderLoadDetailsList, this.loadTableInfo)
    },
    addTruck() {
      console.log('添加车辆信息')
      this.addTruckVisible = true
    },
    addDriver() {
      this.infoDriver = {}
      this.addDriverVisible = true
      console.log('添加司机信息')
    },
    addOrg() {
      console.log('添加网点信息')
    },
    fetchData() {},
    closeAddDriver() {
      this.addDriverVisible = false
    },
    closeAddTruckVisible() {
      this.addTruckVisible = false
    },
    initInfo() {
      this.loading = false
      this.getTreeOrgid(this.otherinfo.orgid)
    },
    getTreeOrgid(orgid) {
      // 切换组织了列表时更新司机列表信息
      this.getDrivers(orgid)
      this.getTrucks(orgid)
    },
    getDrivers(orgid) {
      if (this.cacheDriverList[orgid]) {
        this.Drivers = this.cacheDriverList[orgid]
      } else {
        getAllDriver({
          "currentPage": 1,
          "pageSize": 200,
          "vo": {
            "orgid": orgid
          }
        }).then(data => {
          this.Drivers = data.list
          this.cacheDriverList[orgid] = data.list
        })
      }
    },
    getTrucks(orgid) {
      if (this.cacheTruckList[orgid]) {
        this.Trucks = this.cacheTruckList[orgid]
      } else {
        getAllTrunk({
          "currentPage": 1,
          "pageSize": 200,
          "vo": {
            "orgid": orgid
          }
        }).then(data => {
          this.Trucks = data.list
          this.cacheTruckList[orgid] = data.list
        })
      }
    },
    handleSelect(item) {
      this.formModel.tmsOrderLoad.dirverMobile = item.driverMobile
      this.formModel.tmsOrderLoad.dirverName = item.driverName
    },
    handleSelectTruck(item) {
      this.formModel.tmsOrderLoad.truckIdNumber = item.truckIdNumber
    },
    querySearch(queryString, cb) {
      var driverList = this.Drivers
      var results = queryString ? driverList.filter(this.createFilter(queryString)) : driverList
      // 调用 callback 返回司机列表的数据
      cb(results)
    },
    querySearchTruck(queryString, cb) {
      var truckList = this.Trucks
      var results = queryString ? truckList.filter(this.createFilter(queryString)) : truckList
      // 调用 callback 返回车辆列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (data) => {
        return this.DriverList
      }
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
      padding: 0 20px 20px 0;
      .el-form-item {
        margin-bottom: 5px;
      }
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
  border-top: 2px dotted #bbbbbb;
  margin: 10px -10px -10px 0;
  padding: 5px 10px 10px 10px;
  background-color: #fbfbfb;
  width: 100%;
  display: flex;
  flex-direction: row;
  li {
    border: 1px solid #eeeeee;
    width: 10%;
    p {
      text-align: center;
      line-height: 36px;
      font-size: 14px;
    }
  }
}

</style>
