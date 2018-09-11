<template>
  <div class="loadInfo_wrapper">
    <div class="loadInfo_btns clraefix">
      <el-button type="primary" @click="submitLoad('formModel')" icon="el-icon-refresh" plain size="mini">计算配载
      </el-button>
      <el-button type="success" @click="submitForm()" icon="el-icon-document" plain size="mini">保存配载
      </el-button>
      <el-button type="danger" @click="cancelButtonText" icon="el-icon-circle-close-outline" plain size="mini">取消
      </el-button>
    </div>
    <div class="loadInfo_tab">
      <el-tabs type="border-card">
        <el-tab-pane label="方案一">
          <div class="loadInfo_content">
            <div class="content_left">
              <el-form :model="intelligentLeftData" :size="btnsize" ref="formModel" label-width="65px"
                       :rules="formModelRules">
                <el-form-item label="到达网点" prop="arriveOrgid">
                  <SelectTree v-model="intelligentLeftData.arriveOrgid" :orgid="otherinfo.orgid" clearable
                              class="orgClass" disabled></SelectTree>
                  <!--<el-input v-model="intelligentLeftData.arriveOrgid" disabled></el-input>-->
                </el-form-item>
                <el-form-item label="分摊方式" prop="apportionTypeId">
                  <selectType v-model="intelligentLeftData.apportionTypeId" type="apportion_type" clearable
                              size="mini" class="apportClass"></selectType>
                </el-form-item>
              </el-form>
            </div>
            <div class="loadInfo_collapse">
              <el-form :model="intelligentData" :rules="rules" ref="ruleForm" label-width="76px" :inline="true"
                       label-position="right" size="mini" class="loadInfo_collapse_list" :key="valkey">
                <!-- <el-form :model="intelligentData" label-width="63px" inline class="loadInfo_collapse_list"> -->
                <div class="loadInfo_item" v-for="(item, index) in dataList"
                     :style="{width: showCurrenFormStyle[index]?'calc(100% - 185px)': ''}" v-show="isShowCurPages">
                  <el-button class="verticalBtn" @click="selectCurrentTuck(item, index)"
                             :class="{'verticalBtnActive':showCurrenFormStyle[index]}">
                             <i class="lll-ntelligent-del" :class="{'lll-ntelligent-delActive':showCurrenFormStyle[index]}" @click="delCurTruck(index,item)"></i>
                             车型{{ changeNumCN[index]}}
                  </el-button>
                  
                  <div class="loadInfo_item_form" v-show="showCurrenFormStyle[index]">
                    <div class="loadInfo_item_form_row">
                      <el-form-item label="车型" class="nameClass">
                        <el-input disabled :size="btnsize" v-model="item.name"></el-input>

                      </el-form-item>
                      <el-form-item label="车牌号" prop="" :key="changeTruckKey" prop="truckIdNumber">
                        <el-autocomplete popper-class="lll-autocomplete" v-model="intelligentData.truckIdNumber"
                                         :fetch-suggestions="querySearchTruck" placeholder="车牌号码" size="mini"
                                         @select="handleSelectTruckNum" auto-complete="off" @blur="blurTruck"
                                         :maxlength="8">
                          <i class="intAddF" slot="suffix" @click="doAction('addTruck')"><icon-svg icon-class="inadd_lll"></icon-svg></i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.truckIdNumber }}</div>
                            <span class="addr">{{ item.driverName }}</span>
                            <br>
                            <span class="addr">{{ item.dirverMobile}}</span>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                      <!--</el-form-item>-->
                      <el-form-item label="可载方" prop="">
                        <el-input v-model="item.volume" :maxlength="3"
                                  @change="(val) =>changeLoadNum(val, index, 'volume')"></el-input>
                      </el-form-item>
                      <el-form-item label="可载吨" prop="">
                        <el-input v-model="item.weight" :maxlength="3"
                                  @change="(val) =>changeLoadNum(val, index, 'weight')"></el-input>
                      </el-form-item>
                    </div>
                    <div class="loadInfo_item_form_row">
                      <el-form-item label="车费" prop="">
                        <el-input :size="btnsize" v-model="item.price">
                          <i class="intEditF" slot="suffix"
                             @click="addFreight(item.price, index)"><icon-svg icon-class="intlDel_lll"></icon-svg></i>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="司机" prop="dirverName" class="formItemTextDanger" :key="changeDriverKey">
                        <el-autocomplete popper-class="lll-autocomplete" v-model="intelligentData.dirverName"
                                         :fetch-suggestions="querySearch" placeholder="司机名称" size="mini"
                                         @select="handleSelectName" auto-complete="off" :maxlength="10">
                          <i class="intAddF" slot="suffix" @click="doAction('addDriver')">
                            <icon-svg icon-class="inadd_lll"></icon-svg>
                          </i>
                          <template slot-scope="{ item }">
                            <div class="name">{{ item.driverName }}</div>
                            <span class="addr">{{ item.driverMobile }}</span>
                            <br>
                            <span class="addr">{{ item.truckIdNumber }}</span>
                          </template>
                        </el-autocomplete>
                      </el-form-item>
                      <el-form-item label="司机电话" prop="dirverMobile">
                        <el-input v-model="intelligentData.dirverMobile"></el-input>
                      </el-form-item>
                      <el-form-item label="到达日期">
                        <el-date-picker size="mini" v-model="intelligentData.planArrivedTime"
                                        value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="预计到达时间">
                        </el-date-picker>
                        <!--<el-date-picker size="mini" v-model="intelligentData.planArrivedTime"-->
                        <!--value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="到达日期">-->
                        <!--</el-date-picker>-->
                        <!--<el-input :size="btnsize" v-model="intelligentData.dirverMobile"></el-input>-->
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <el-button class="verticalBtn verticalBtnAdd" @click="addtuck">增加+</el-button>

                <div class="verticalBtnTransfer">
                  <el-button class="verticalBtnSort" @click="pretruck" icon="el-icon-d-arrow-left"
                             :disabled="pretruckDisable"></el-button>
                  <el-button class="verticalBtnSort" @click="nexttruck" icon="el-icon-d-arrow-right"
                             :disabled="nexttruckDisable"></el-button>
                </div>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <addTruckInfo :truckSources="truckSources" :truckTypes="truckTypes" :issender="true" :isModify="isModify"
                  :info="selectInfo" :orgid="otherinfo.orgid" :popVisible.sync="addTruckVisible"
                  @close="closeAddTruckVisible" @success="fetchData"></addTruckInfo>
    <addDriverInfo :licenseTypes="licenseTypes" :issender="true" :isModifyDriver="isModifyDriver"
                   :infoDriver="selectInfoDriver" :orgid="otherinfo.orgid" :popVisible.sync="addDriverVisible"
                   @close="closeAddDriver" @success="fetchData"></addDriverInfo>
    <AddLntelligentFreight :popVisible.sync="lntelligentFVisible" @close="openlntelligent"
                           @getIntFreight="getIntFreight" :intFreightItem="intFreightItem" :sendDataList="dataList"
                           :intFreightIndex="intFreightIndex"></AddLntelligentFreight>
  </div>
</template>
<script>
  import SelectTree from '@/components/selectTree/index'
  import {REGEX} from '@/utils/validate'
  import {objectMerge2, parseTime, pickerOptions2} from '@/utils/index'
  import {mapGetters} from 'vuex'
  import SelectType from '@/components/selectType/index'
  import addTruckInfo from '@/views/company/trunkManage/components/add'
  import addDriverInfo from '@/views/company/driverManage/components/add'
  import {getDrivers, getTrucK, postLoadInfo} from '@/api/operation/load'
  import {getAllDriver} from '@/api/company/driverManage'
  import {getSystemTime} from '@/api/common'
  import AddLntelligentFreight from './intelligentFreight'
  import {postIntnteSmartLoad} from '@/api/operation/arteryDepart'

  export default {
    components: {
      SelectTree,
      SelectType,
      addTruckInfo,
      addDriverInfo,
      AddLntelligentFreight
    },
    props: {
      orgid: [Number, String],
      dofo: [Array, Object],
      model: [Array, Object],
      loadTable: {
        type: Array
      }
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ]),
    },
    data() {

      return {
        intFreightItem: '',
        intFreightIndex: '',
        intFreight: '',
        intFreightObj: {},
        sendorgid: '',
        searchCreatTime: [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
        pickerOptions2: {
          shortcuts: pickerOptions2
        },
        isShowViewChart: false,
        isShowViewTable: false, // 穿梭框 false-不全屏 true-全屏
        isModify: false,
        isModifyDriver: false,
        addTruckVisible: false,
        addDriverVisible: false,
        lntelligentFVisible: false,
        inited: false,
        formModel: {
          truckLoad: 80,
          truckVolume: 120
        },
        loadInfoPercentOrg: [],

        loadTableInfo: [],
        valkey: '',
        truckSources: [],
        truckTypes: [],
        licenseTypes: [],
        selectInfo: {},
        selectInfoDriver: {},
        cacheDriverList: {},
        cacheTruckList: {},
        Drivers: [],
        Trucks: [],
        contractNo: '',
        intelligentRouterData: [],
        intelligentData: {

          contractNo: '',
          batchNo: '',
          batchTypeId: 52,
          loadTypeId: 39,
          truckIdNumber: '',
          dirverName: '',
          dirverMobile: '',
          truckLoad: '',
          truckVolume: '',
          loadTime: parseTime(new Date()),
          planArrivedTime: '',
          requireArrivedTime: '',
          truckUserId: '',
          remark: ''
        },
        intelligentLeftData: {
          apportionTypeId: '',
          arriveOrgid: '',
        },
        searchTable: {},
        changeDriverKey: '',
        changeTruckKey: '',
        rules: {
          truckIdNumber: [
            {required: true, message: '请选择车牌号~'}
          ],
          dirverName: [
            {required: true, message: '请选择司机~'}
          ],
          dirverMobile: [
            {required: true, message: '请选择司机电话~'}
          ]
          // truckIdNumber: [{required: true, validator: this.validateIsEmpty('请选择车牌号!'), trigger: 'blur'}]
        },
        showCurrenFormStyle: [true],
        btnsize: 'mini',
        formModel: {
          arriveOrgid: ''
        },
        currentIndex: 0,
        formModelRules: {},
        changeNumCN: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十','十一','十二','十三','十四'],
        dataList: [{}, {}, {}],
        pretruckDisable: true,
        nexttruckDisable: false,
        loadDataArray: [],
        truckPageSize: 3,
        truckTotalPage: 0,
        isShowCurPages: true
      }
    },
    watch: {
      orgid: {
        handler(newVal) {
          this.intelligentLeftData.arriveOrgid = this.orgid

        },
        deep: true
      },
      dofo: {
        handler(newVal) {
          this.dataList = this.dofo
          this.dataList.forEach((e, index) => {
            let data = {}
            this.$set(data, 'nowpayCarriage', e.price)
            this.$set(e, 'tmsOrderLoadFee', data)
            data = {}
          })
          this.$emit('truckIndex', this.currentIndex)
          this.$emit('truckPrecent', this.dataList[0])
        }
      },
      loadTable: {
        handler(cval, oval) {

        }
      }
    },
    mounted() {

      this.init()
      this.getSystemTime()
      this.intelligentLeftData.arriveOrgid = this.orgid

    },
    activated() {
      this.init()
      this.getSystemTime()
      this.intelligentLeftData.arriveOrgid = this.orgid
    },
    methods: {
      validateIsEmpty(msg = '不能为空！') {
        return (rule, value, callback) => {
          if (!value) {
            // this.showMessage(msg)
            callback(new Error(msg))
          } else {
            callback()
          }
        }
      },
      getIntFreight(data) {
        this.intFreight = data.val
        this.intFreightObj = data.obj
        this.$set(this.dataList[this.intFreightIndex], 'price', this.intFreight)

      },
      doAction(type) {
        switch (type) {
          case 'addTruck': // 添加车辆信息
            this.addTruck()
            break
          case 'addDriver': // 添加司机信息
            this.addDriver()
            break
          // case 'addFreight':
          //   this.openlntelligent()
          //   break
        }
      },
      cancelButtonText() {
        this.$confirm('页面没保存，确定关闭吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已关闭成功!'
          });
          this.eventBus.$emit('replaceCurrentView', '/operation/order/arteryDepart')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已成功取消!'
          });
        });
      },
      addFreight(val, index) {
        this.intFreightItem = val
        this.intFreightIndex = index
        this.openlntelligent()
      },
      getSystemTime() { // 获取系统时间
      },
      querySearch(queryString, cb) {
        const driverList = this.Drivers
        const results = queryString ? driverList.filter(this.createFilter(new RegExp(queryString, 'gi'), 'driverName')) : driverList
        // 调用 callback 返回司机列表的数据
        cb(results)
      },
      querySearchTruck(queryString, cb) {
        const truckList = this.Trucks
        const results = queryString ? truckList.filter(this.createFilter(new RegExp(queryString, 'gi'), 'truckIdNumber')) : truckList
        // 调用 callback 返回车辆列表的数据
        cb(results)
      },
      createFilter(queryString, prop) {
        return (data) => {
          if (data[prop]) {
            return (queryString.test(data[prop]))
          }
        }
      },
      blurTruck() { // 车牌输入框失去响应时
        const data = ''
        // this.Trucks.find(el => {
        //   if (this.formModel.truckIdNumber === el.truckIdNumber) {
        //     this.formModel.truckIdNumber = el.truckIdNumber
        //   } else {
        //     this.formModel.truckIdNumber = undefined
        //   }
        // })
      },
      init() {

        this.intelligentData = this.$options.data().intelligentData
        // this.$refs['ruleForm'].resetFields()
        // this.setLoadTypeId()
        // this.initIsEdit()
        this.intelligentData.orgid = this.orgid
        this.DriverList = this.Drivers
        this.TruckList = this.Trucks
        // this.getSelectAddLoadRepertoryList()
        if (!this.inited) {
          this.inited = true
          this.initInfo()
        }

      },
      initInfo() {
        this.loading = false
        // this.truckKey = new Date().getTime()
        // this.driverKey = new Date().getTime()
        this.changeDriverKey = Math.random()
        this.changeTruckKey = Math.random()
        this.Drivers = this.$options.data().Drivers
        this.Trucks = this.$options.data().Trucks
        this.cacheDriverList = this.$options.data().cacheDriverList
        this.cacheTruckList = this.$options.data().cacheTruckList
        // 切换组织了列表时更新司机列表信息
        this.getDrivers(this.otherinfo.orgid)
        this.getTrucks(this.otherinfo.orgid)

      },
      getDrivers(orgid) {
        if (this.cacheDriverList[orgid]) {
          this.Drivers = this.cacheDriverList[orgid]
        } else {
          getDrivers().then(data => {
            this.Drivers = data.data
            this.cacheDriverList[orgid] = data.data

          })
        }
      },
      getTrucks(orgid) {
        if (this.cacheTruckList[orgid]) {
          this.Trucks = this.cacheTruckList[orgid]
        } else {
          getTrucK().then(data => {
            this.Trucks = data.data
            this.cacheTruckList[orgid] = data.data
          }).catch(error => {
            this.$message.error(error.errorInfo || error.text)
          })
        }
      },
      handleSelectName(item) {
        // this.driverKey = new Date().getTime()
        this.changeDriverKey = Math.random()
        if (this.intelligentData.truckIdNumber === '' || this.intelligentData.truckIdNumber === undefined) {
          this.intelligentData.truckIdNumber = item.truckIdNumber
        }
        this.intelligentData.dirverMobile = item.driverMobile
        this.intelligentData.dirverName = item.driverName
        this.isDriverSelect = true
      },
      handleSelectTruckNum(item) {

        // this.truckKey = new Date().getTime()
        this.changeTruckKey = Math.random()
        this.intelligentData.truckIdNumber = item.truckIdNumber
        this.intelligentData.dirverMobile = item.driverMobile
        this.intelligentData.dirverName = item.driverName

        this.$set(this.intelligentData, 'truckLoad', Number(item.truckLoad))
        this.$set(this.intelligentData, 'truckVolume', Number(item.truckVolume))
        // this.formModel.truckLoad = item.truckLoad
        // this.formModel.truckVolume = item.truckVolume
      },
      fetchData() {
        this.initInfo() // 添加完司机或车辆之后，刷新下拉数据
      },
      addTruck() { // 添加车辆信息
        this.addTruckVisible = true
      },
      addDriver() { // 添加司机信息
        this.infoDriver = {}
        this.addDriverVisible = true
      },
      closeAddDriver() {
        this.addDriverVisible = false
      },
      closeAddTruckVisible() {
        this.addTruckVisible = false
      },
      openlntelligent() {
        this.lntelligentFVisible = true
      },
      submitLoad(formName) {
        this.$message({type: 'warning', message: '计算配载'})
      },
      setData() {
        let arr = []
        let data = {} // 数组中的单个对象
        arr = Object.assign([], this.dataList)
        arr.forEach((e, index) => {
          this.$set(arr[index], 'carLoadDetail', this.loadTable[index])
          if (index === this.intFreightIndex) {
            this.$set(arr[index], 'tmsOrderLoadFee', this.intFreightObj)
          } else {
          }

        })

        arr.forEach((e, index) => {
          let curinfo = {
            apportionTypeId: this.intelligentLeftData.apportionTypeId,
            arriveOrgid: this.intelligentLeftData.arriveOrgid,
            contractNo: this.intelligentData.contractNo,
            batchNo: this.intelligentData.batchNo,
            batchTypeId: this.intelligentData.batchTypeId,
            truckIdNumber: this.intelligentData.truckIdNumber,
            dirverName: this.intelligentData.dirverName,
            dirverMobile: this.intelligentData.dirverMobile,
            truckLoad: this.intelligentData.truckLoad,
            truckVolume: this.intelligentData.truckVolume,
            loadTime: this.intelligentData.loadTime,
            planArrivedTime: this.intelligentData.planArrivedTime,
            requireArrivedTime: this.intelligentData.requireArrivedTime,
            truckUserId: this.intelligentData.truckUserId,
            loadTypeId: this.intelligentData.loadTypeId,
            orgid: this.otherinfo.orgid,
            remark: this.intelligentData.remark
          }
          this.$set(e, 'tmsOrderLoad', curinfo)
          this.$set(data, 'tmsOrderLoad', e.tmsOrderLoad)
          this.$set(data, 'tmsOrderLoadFee', e.tmsOrderLoadFee)
          e.carLoadDetail.forEach(em => {
            em.loadAmount = em.repertoryAmount
            em.loadWeight = em.repertoryWeight
            em.loadVolume = em.repertoryVolume
          })
          this.$set(data, 'tmsOrderLoadDetailsList', e.carLoadDetail)
          this.$set(this.loadDataArray, index, data)
          data = {}
          curinfo = {}
        })


      },
      submitForm() {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                this.loading = true
                this.setData()
                // console.log('loadDataArray', this.loadDataArray)
                postIntnteSmartLoad(this.loadDataArray).then(res => {
                  this.$message({type: 'success', message: '保存配载'})
                  this.eventBus.$emit('replaceCurrentView', '/operation/order/arteryDepart')
                  this.loading = false
                }).catch(err => {
                  this.$message.error('错误：' + (err.text || err.errInfo || err.data || JSON.stringify(err)))
                  this.loading = false
                })

              } else {
                return false
              }
            })
          }
        })
      },
      changeLoadNum(val, index, type) {

        this.$emit('truckPrecent', this.dataList[index])
      },
      selectCurrentTuck(item, index) {
        this.currentIndex = index
        this.showCurrenFormStyle = []
        this.showCurrenFormStyle[index] = true
        this.$emit('truckIndex', this.currentIndex)
        this.$emit('truckPrecent', this.dataList[this.currentIndex])
      },
      delCurTruck(index,item){
        this.$message.warning('暂无此功能！')
        // this.currentIndex = index
        // this.$emit('truckIndex', this.currentIndex)
        // this.dataList =  this.dataList.filter((e, index) => {
        //   return index !== this.currentIndex
        // })
        // console.log(index)
      },
      addtuck() {
        ++this.currentIndex
        this.dataList.push({})
        this.intelligentData.push({})
        this.$emit('truckIndex', this.currentIndex)
        this.$emit('truckPrecent', this.dataList[this.currentIndex])
      },
      pretruck() { // 展示上一个车型
        if (this.dataList.length < 2) { // 列表为空或者有一条数据的时候 都不可以切换
          this.pretruckDisable = true
          this.nexttruckDisable = true
        } else {
          if (this.currentIndex === 0) {
            this.pretruckDisable = true
            this.nexttruckDisable = false
          } else {
            --this.currentIndex
            this.showCurrenFormStyle = []
            this.showCurrenFormStyle[this.currentIndex] = true
            this.nexttruckDisable = false
            if (this.currentIndex === 0) {
              this.pretruckDisable = true
            }
          }
          this.$emit('truckPrecent', this.dataList[this.currentIndex])
        }
        this.$emit('truckIndex', this.currentIndex)
      },
      nexttruck() { // 展示下一个车型
        if (this.dataList.length < 2) { // 列表为空或者有一条数据的时候 都不可以切换
          this.pretruckDisable = true
          this.nexttruckDisable = true
        } else {
          if (this.currentIndex === this.dataList.length - 1) {
            this.nexttruckDisable = true
            this.pretruckDisable = false
          } else {
            ++this.currentIndex
            this.showCurrenFormStyle = []
            this.showCurrenFormStyle[this.currentIndex] = true
            this.pretruckDisable = false
            if (this.currentIndex === this.dataList.length - 1) {
              this.nexttruckDisable = true
            }
          }
        }
        // if (this.dataList.length / this.truckPageSize > parseInt(this.dataList.length / this.truckPageSize)) {

        // }
        this.$emit('truckIndex', this.currentIndex)
        this.$emit('truckPrecent', this.dataList[this.currentIndex])
      }
    }
  }

</script>
<style lang="scss">
  .loadInfo_wrapper {
    position: relative;
    .loadInfo_btns {
      position: absolute;
      top: 16px;
      right: 20px;
      z-index: 2;
    }
    .loadInfo_tab {
      padding: 10px 10px 0px 10px;
      .el-tabs--border-card {
        box-shadow: none;
        border: 1px solid #cdf;
        .el-tabs__header.is-top {
          .el-tabs__nav-wrap {
            background: rgb(251, 255, 244);
          }
        }
      }
      .el-tabs--border-card > .el-tabs__content {
        padding: 10px;
      }
      .loadInfo_content {
        display: flex;
        flex-direction: row;
        .content_left {
          border-top: 2px solid rgb(184, 203, 213);
          border-right: 1px solid rgb(232, 233, 234);
          border-bottom: 1px solid rgb(232, 233, 234);
          border-left: 1px solid rgb(232, 233, 234);
          padding: 10px 5px 0 10px;
          .el-form {
            padding-top: 15px;
            .orgClass {
              .el-input.is-disabled {
                .el-input__inner {
                  color: #606266;
                }
              }
            }
          }
          .el-form-item--mini.el-form-item,
          .el-form-item--small.el-form-item {
            margin-bottom: 10px;
          }
        }
        .loadInfo_collapse {
          width: 100%;
          border-top: 2px solid rgb(184, 203, 213);
          border-right: 1px solid rgb(232, 233, 234);
          border-bottom: 1px solid rgb(232, 233, 234);
          border-left: 1px solid rgb(232, 233, 234);
          padding: 0px;
          margin-left: 10px;
          position: relative;
          .el-form-item--mini.el-form-item,
          .el-form-item--small.el-form-item {
            margin-bottom: 10px;
          }
          .el-button {
            white-space: normal;
            border-radius: 0px;
          }
          .verticalBtn {
            width: 45px;
            height: 110px;
            padding: 10px;
            font-family: '微软雅黑';
            background-color: #fff;
            border: 1px solid rgb(5,136,195);
            font-size: 16px;
            line-height: 20px;
            word-wrap: break-word;
            color: rgb(5,136,195);
            font-weight: 600;
              position: relative;
          }
          .verticalBtn:hover {
            color: #fff;
            transition: 0.3s;
           background-color:#0c6e9b;
          }
          .verticalBtnActive {
            color: #fff;
            background-color: rgb(5,136,195);
          }

          .verticalBtn:hover i.lll-ntelligent-del::before{
            background-image: url(../../../../../assets/icom/load/07sc.png);
            background-repeat: no-repeat;
            transition: 0.3s;

          }
          i.lll-ntelligent-del:before{
            content: '';
            display: block;
            position:absolute;
            top:0px;
            right:-7px;
            width: 20px;
            height: 20px;
            background-image: url(../../../../../assets/icom/load/09sc.png);
            background-repeat: no-repeat;
            transition: 0.3s;
          }
          
          i.lll-ntelligent-delActive:before{
            content: '';
            display: block;
            position:absolute;
            top:0px;
            right:-7px;
            width: 20px;
            height: 20px;
            background-image: url(../../../../../assets/icom/load/07sc.png);
            background-repeat: no-repeat;
            transition: 0.3s;
          }
          .loadInfo_collapse_list {
            width: 100%;
            display: flex;
            flex-direction: row;
            overflow: hidden;
            .verticalBtnAdd {
              float: right;
              right: 0px;
              top: 0;
            }
            .verticalBtnTransfer {
              display: flex;
              flex-direction: column;
              position: absolute;
              right: 0px;
              top: 0px;
              .el-button + .el-button {
                margin-left: 0px;
              }
              .el-button {
                padding: 10px;
              }
              .verticalBtnSort {
                width: 45px;
                height: 55px;
              }
            }
            .loadInfo_item {
              display: flex;
              flex-direction: row;
              .loadInfo_item_form {
                padding-top: 15px;
                min-width: 1000px;
                display: inline-block;
                .loadInfo_item_form_row {
                  display: flex;
                  flex-direction: row;
                  margin-bottom: 10px;
                  margin-top: 10px;
                  .el-form-item {
                    margin-bottom: 0px;
                    .el-input {
                      max-width: 160px;
                    }
                  }
                  .el-form-item.nameClass {
                    .el-input.is-disabled {
                      .el-input__inner {
                        color: #606266;
                      }
                    }
                  }
                  .el-form-item--mini.el-form-item,
                  .el-form-item--small.el-form-item {
                    margin-bottom: 0px;
                  }

                }
              }
            }
            i.intEditF{
              font-size: 20px;
              cursor: pointer;
            }
            i.intAddF{
              font-size: 20px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .lll-autocomplete {
    li {
      line-height: normal;
      padding: 7px;
      .name, .addr {
        font-size: 12px;
      }
    }
  }

</style>
