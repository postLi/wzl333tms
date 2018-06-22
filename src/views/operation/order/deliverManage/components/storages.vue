<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="storagesPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <div class="batchTypeNo">
        批次：{{getBatchNo}}
      </div>
      <div class="storagesInfoPop_content">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tab-card">
          <el-tab-pane label="批次详情" name="first">
            <div class="tab-content" v-loading="loading">
              <div class="info_form">
                <!--<el-form-item label="网点">-->
                <!--<SelectTree v-model="otherinfo.orgid" />-->
                <!--</el-form-item>-->
                <el-form :inline="true" :size="btnsize" label-position="right" label-width="110px" class="sta_searchinfo clearfix" :model="formModel">
                  <el-form-item label="送货费:">
                    <el-input
                      v-model="formModel.arriveOrgName"
                      maxlength="15"
                      clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="分摊方式:">
                    <el-input
                      v-model="formModel.apportionTypeName"
                      maxlength="15"
                      clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="车牌号码:">
                    <el-input
                      v-model="formModel.truckIdNumber"
                      maxlength="15"
                      clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="司机姓名:" >
                    <el-input
                      v-model="formModel.dirverName"
                      maxlength="15"
                      clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="司机电话:">
                    <el-input
                      v-model="formModel.dirverMobile"
                      maxlength="15"
                      clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="可载体积:" >
                    <el-input
                      v-model="formModel.truckVolume"
                      maxlength="15"
                      clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="可载重量:" >
                    <el-input
                      v-model="formModel.truckLoad"
                      maxlength="15"
                      clearable disabled>
                    </el-input>
                  </el-form-item>

                  <el-form-item label="送货日期:">
                    <!--<template slot-scope="scope">
                      <!--{{ scope.row.loadTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
                    <!--</template>-->
                    <el-input
                      v-model="formModel.loadTime"
                      maxlength="15"
                      clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="要求到达日期:" class="art_arriveTime">
                    <el-input
                      v-model="formModel.requireArrivedTime"
                      maxlength="15"
                      clearable disabled
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="备注:" class="art_remk">
                    <el-input
                      v-model="formModel.remark"
                      clearable
                      maxlength="300"
                      auto-complete="off"
                      type="textarea" disabled
                    >
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <!--<SearchForm :orgid="otherinfo.orgid" :issender="true" @change="getSearchParam" :btnsize="btnsize" />-->
              <div class="tab_info">
                <div class="btns_box">
                  <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('sure')">{{popTitle}}</el-button>

                  <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain class="table_export">打印清单</el-button>
                  <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('export')" plain class="table_import">导入清单</el-button>
                  <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
                </div>
                <div class="info_tab">
                  <el-table
                    ref="multipleTable"
                    :data="usersArr"
                    stripe
                    border
                    @row-click="clickDetails"
                    @selection-change="getSelection"
                    height="200px"
                    tooltip-effect="dark"
                    :default-sort = "{prop: 'id', order: 'ascending'}"
                    style="width: 100%">
                    <el-table-column
                      fixed
                      sortable
                      type="selection"
                      width="50">
                    </el-table-column>
                    <!--<el-table-column-->
                      <!--fixed-->
                      <!--sortable-->
                      <!--prop=""-->
                      <!--label="序号"-->
                      <!--width="80">-->
                    <!--</el-table-column>-->
                    <el-table-column
                      fixed
                      sortable
                      prop="shipFromOrgName"
                      width="120"
                      label="开单网点">
                    </el-table-column>
                    <el-table-column
                      prop="shipId"
                      width="120"
                      sortable
                      label="运单号">
                    </el-table-column>
                    <el-table-column
                      prop="loadAmount"
                      label="配载件数"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      sortable
                      prop="loadWeight"
                      width="110"
                      label="配载重量">
                    </el-table-column>
                    <el-table-column
                      prop="loadVolume"
                      label="配载体积"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="loadVolume"
                      label="库存件数"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="loadVolume"
                      label="库存重量"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="loadVolume"
                      label="库存体积"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="loadVolume"
                      label="运单件数"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="loadVolume"
                      label="运单重量"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="loadVolume"
                      label="运单体积"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shipFromCityName"
                      label="出发城市"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shipToCityName"
                      label="到达城市"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shipSenderName"
                      label="发货人"
                      width="100"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shipSenderMobile"
                      label="发货人电话"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shipReceiverName"
                      label="收货人"
                      width="100"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shipReceiverMobile"
                      label="收货人电话"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="cargoName"
                      label="货品名"
                      width="100"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shipGoodsSn"
                      label="货号"
                      width="100"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shipRemarks"
                      label="运单备注"
                      width="120"
                      sortable
                    >
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="批次跟踪" name="second">
            <div class="tab_box">
              <div class="tab_box_item">
                <el-row class="stepItem_title">
                  <el-col :span="4" :offset="4"><b>操作时间</b></el-col>
                  <el-col :span="3"><b>操作网点</b></el-col>
                  <el-col :span="2"><b>操作人</b></el-col>
                  <el-col :span="3"><b>操作信息</b></el-col>
                </el-row>
                <el-steps direction="vertical">
                  <el-step v-for="(item, index) in trackDetail" :key="item.key" icon="el-icon-location">
                    <template slot="description">
                      <el-row class="stepItem">
                        <el-col :span="4">
                          <el-popover placement="right" width="50" trigger="hover" v-if="item.addStatus===1?true:false">
                            <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
                              <el-button type="text" icon="el-icon-edit-outline" @click="editItem(item)"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                              <el-button type="text" icon="el-icon-delete" @click="deleteTrack(item)"></el-button>
                            </el-tooltip>
                            <el-button size="mini" slot="reference">{{item.loadStatus}}</el-button>
                          </el-popover>
                          <el-button size="mini" v-else>{{item.loadStatus}}</el-button>
                        </el-col>
                        <el-col :span="5">
                          <p>{{item.operatorTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}</p>
                        </el-col>
                        <el-col :span="3">
                          <p>{{item.orgName}}</p>
                        </el-col>
                        <el-col :span="3">
                          <p>
                            <i class="icon_man" v-if="item.addStatus===1?true:false"></i>
                            <i class="icon_blank" v-else></i> {{item.operatorUsername}}
                          </p>
                        </el-col>
                        <el-col :span="8">
                          <p>{{item.operatorInfo}}</p>
                        </el-col>
                      </el-row>
                    </template>
                  </el-step>
                  <el-step icon="el-icon-location"></el-step>
                </el-steps>
              </div>
              <div class="tab_box_item">
              </div>
            </div>
          </el-tab-pane>

        </el-tabs>
      </div>

    </template>
    <div slot="footer" class="dialog-footer stepFrom" v-if="isFootSecond">
      <el-form inline :model="formModel" :rules="ruleForm" label-width="80px" ref="formModel">
        <el-form-item label="类型" prop="loadStatus">
          <el-input v-model="formModel.loadStatus" placeholder="类型" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="operatorTime">
          <el-date-picker v-model="formModel.operatorTime" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="operatorInfo">
          <el-input v-model="formModel.operatorInfo" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formModel')" size="mini">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <el-button @click="closeMe">关闭</el-button>
    </div>
  </pop-right>
</template>

<script>
  import { REGEX } from '@/utils/validate'
  import popRight from '@/components/PopRight/index'
  import selectType from '@/components/selectType/index'
  import { getLoadDetail, deleteTrack, postAddTrack, putUpdateTrack   ,getSelectLoadList} from '@/api/operation/track'
  import {getBatchNoId,postSelectLoadMainInfoList,postAddRepertory,postConfirmToCar} from '@/api/operation/arteryDelivery'
  import { getAllCustomer, deleteSomeCustomerInfo, getExportExcel } from '@/api/company/customerManage'
  import { mapGetters } from 'vuex'
  import SelectTree from '@/components/selectTree/index'
    export default {
      data () {
        return {
          getBatchNo:'',
          popTitle:'到车入库',
          activeName: 'first',
          trackDetail: [],
          ruleForm: {},
          loading:false,
          isFootEdit: false,
          isFootSecond: false,
          isFootOther: false,
          propsId:'',
          formModel: {},
          // formModel: {
          //   addStatus: 1,
          //   id: 0,
          //   loadId: 0,
          //   loadStatus: '',
          //   operatorInfo: '',
          //   operatorOrgid: 1,
          //   operatorTime: '',
          //   operatorUserid: 0
          // },
          btnsize: 'mini',
          usersArr: [],
          selected: [],
          //加载状态
          loading: true,
          setupTableVisible: false,
          AddCustomerVisible: false,
          isModify: false,
          formMode1: {
            // arriveOrgName:'',//到达网点
            // truckIdNumber:'',//车牌号码
            // dirverName:'',//司机姓名
            // dirverMobile:'',//司机电话
            // truckVolume:'',//可载体积
            // truckLoad:'',//可载重量
            // apportionTypeName:'',//分摊方式
            // DateTimeFormat:'',//配载日期
            // requireArrivedTime:'',//要求到达日期：
            // remark:'',
          //  nowpayCarriage:'',//现付运费
          //  nowpayOilCard:'',//现付油卡
          //  backpayCarriage:'',//回付运费
          //  backpayOilCard:'',//回付油卡
          //  arrivepayCarriage:'',//到付运费
          //  arrivepayOilCard:'',//到付油卡
          //  carloadInsuranceFee:'',//整车保险费
          //  leaveHandlingFee:'',//发站装卸费
          //  leaveOtherFee:'',//发站其他费
          //  arriveHandlingFee:'',//到站装卸费
          //  arriveOtherFee:'',//到站其他费
          //   userName //配载人员
          },
          sendTypeId:{
            typeId:54,//等于54为干线到车确认
          },
          sendModel:{
            "tmsOrderLoad" :{
              "id":""
            },
            tmsOrderLoadFee :{
              "id":"",
              "arriveHandlingFee":"",
              "arriveOtherFee":""
            },
            tmsOrderLoadDetailsList :[
              // {
              //   id:'',
              //   actualAmount:'',
              //   actualWeight:'',
              //   actualVolume:''
              // }
            ]
          },
          searchQuery: {
            "currentPage": 1,
            "pageSize": 100,
            "vo": {
              "loadId": 1
            }
          }
        }
      },
      components: {
        popRight,
        SelectTree,
        selectType

      },
      computed: {
        ...mapGetters([
          'otherinfo'
        ]),
        orgid () {
          // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)

          // return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
        }
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
        },
        id: {
          type: [String,Number],
          dafault: false
        }
      },
      watch: {
        id(newVal){
          // this.propsId = this.id
          // console.log(this.id)
        },
        info(newVal){
          if(this.isModify){
          }else{

          }
          this.propsId = this.info.id
          // this.formModel = this.info
          this.getDetail()
          this.fetchAllCustomer()
          this.fetchSelectLoadMainInfoList()
        },
        isModify(newVal){
          if(this.isModify){
            this.popTitle = '到车确定'

          }else{
            this.popTitle = '到车入库'
          }
        },
        popVisible(newVal, oldVal) {
          if (!this.inited) {
            this.inited = true
            this.initInfo()
          }
        },
      },
      mounted() {

        this.propsId = this.info.id

        this.fetchBatchNo()
        // this.fetchSelectLoadList()
        if (this.popVisible) {
          this.getDetail()
          this.fetchAllCustomer()
          this.fetchSelectLoadMainInfoList()
        }
      },
      methods: {
        //批次id
        fetchBatchNo() {
          this.loading = true
          return getBatchNoId(this.otherinfo.orgid,39).then(data => {
            this.getBatchNo = data.data
            this.loading = false
          })

        },
        fetchSelectLoadMainInfoList() {
          this.loading = true
          let selectMainId = this.propsId
          this.searchQuery.vo.loadId = selectMainId
          return postSelectLoadMainInfoList(this.searchQuery).then(data => {
            this.formModel = data.list[0]
            // console.log(this.formModel);
            this.loading = false
          })

        },
        fetchAllCustomer() {
          this.loading = true
          let _id = this.propsId
          // console.log(_id);
          return getSelectLoadList(_id).then(data => {
            this.usersArr = data
            // console.log(this.usersArr);
            this.loading = false
          })

        },
        getDetail() {
          let id = this.propsId
          return getLoadDetail(id).then(data => {
            this.trackDetail = Object.assign([], data)
          })
        },
        handleClick(tab, event) {
          if (this.activeName === 'second') {
            this.isFootSecond = true
          } else {
            this.isFootSecond = false
          }
        },
        initInfo () {
          this.loading = false
        },
        getOrgid (id) {
          // this.form.orgid = id
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if (this.formModel.id) {
                this.editTrack()
              } else {
                this.addTrack()
              }
            }
            this.closeMe()
          })
        },
        reset() {},
        closeMe(done) {
          this.reset()
          this.$emit('update:popVisible', false);
          if (typeof done === 'function') {
            done()
          }
        },
        deleteTrack(item) {
          console.log(item)
          return deleteTrack(item.id).then(data => {
            this.$message({ type: 'success', message: '删除成功' })
            this.getDetail()
          })
        },
        editItem(item) {
          this.resetForm()
          this.formModel = Object.assign({}, item)
        },
        editTrack() {
          console.log('修改')
          this.formModel.transferId = 0
          return putUpdateTrack(this.formModel).then(data => {
            this.$message({ type: 'success', message: '修改成功' })
            this.getDetail()
            this.resetForm()
          })
        },
        addTrack() {
          console.log('添加')
          this.formModel.loadId = this.id
          return postAddTrack(this.formModel).then(data => {
            this.$message({ type: 'success', message: '添加成功' })
            this.getDetail()
            this.resetForm()
          })
        },
        resetForm() {
          this.$refs['formModel'].resetFields()
        },
        fetchData () {
          this.fetchAllCustomer()
        },
        handlePageChange (obj) {
          this.searchQuery.currentPage = obj.pageNum
          this.searchQuery.pageSize = obj.pageSize
        },
        getSearchParam (obj) {
          this.searchQuery.vo.orgid = obj.orgid
          this.searchQuery.vo.customerMobile = obj.mobile
          this.searchQuery.vo.customerName = obj.name
          this.fetchAllCustomer()
        },
        showImport () {
          // 显示导入窗口
        },
        doAction (type) {
          if(type==='import'){
            this.showImport()
            return false
          }
          // 判断是否有选中项
          if(!this.selected.length ){
            this.closeAddCustomer()
            this.$message({
              message: '请选择要操作的项~',
              type: 'warning'
            })
            return false
          }
          switch (type) {
            // 添加客户
            case 'sure':
              let data
              if(this.popTitle === '到车确定'){
                  data = 54
                console.log(typeof this.formModel.id)
                console.log(typeof data)
                postConfirmToCar(this.formModel.id,data).then(res => {
                  this.$message({
                    type: 'success',
                    message: '到车确定成功'
                  })
                  this.closeMe()
                })
              }else{
                // data.tmsOrderLoad.id = this.formModel.id
                // data.tmsOrderLoadFee.loadFeeId = this.formModel.loadFeeId
                this.sendModel.tmsOrderLoad.id = this.formModel.id
                this.sendModel.tmsOrderLoadFee.id = this.formModel.loadFeeId
                this.sendModel.tmsOrderLoadFee.arriveOtherFee = this.formModel.arriveHandlingFee
                this.sendModel.tmsOrderLoadFee.arriveOtherFee = this.formModel.arriveOtherFee
                this.sendModel.tmsOrderLoadDetailsList = []
                this.selected.forEach( (value,index,array) => {
                  this.sendModel.tmsOrderLoadDetailsList.push({
                      id:value.id,
                      actualAmount:value.actualAmount,
                      actualWeight:value.actualWeight,
                      actualVolume:value.actualVolume
                    })
                })
                data = this.sendModel
                postAddRepertory(55,data).then(res => {
                  this.$message({
                    type: 'success',
                    message: '到车入库成功'
                  })
                })
                this.closeMe()
              }
              // this.isModify = false
              // this.selectInfo = {}
              // this.openAddCustomer()
              break;
            // 导出数据
            case 'export':
              let ids2 = this.selected.map(el => {
                return el.customerId
              })
              getExportExcel(ids2.join(',')).then(res => {
                this.$message({
                  type: 'success',
                  message: '即将自动下载!'
                })
              })
              break;
          }
          // 清除选中状态，避免影响下个操作
          this.$refs.multipleTable.clearSelection()
        },
        setTable () {
          this.setupTableVisible = true
        },
        closeSetupTable () {
          this.setupTableVisible = false
        },
        openAddCustomer () {
          this.AddCustomerVisible = true
        },
        closeAddCustomer () {
          this.AddCustomerVisible = false
        },
        clickDetails(row, event, column){
          this.$refs.multipleTable.toggleRowSelection(row)
        },
        getSelection (selection) {
          this.selected = selection
        },
      }
      // }
    }
</script>

<style scoped lang="scss">
  .tab-content{
    height: calc(100% - 33px);
    display: flex;
    flex-direction:column;
    position: relative;

    .tab_info{
      /*padding:10px 30px 40px;*/
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction:column;

      .btns_box{
        margin-bottom:10px;
        .el-button{
          margin-right:0;
        }
        .table_setup{
          float: right;
          margin-right: 0;
        }
        .table_export{
          margin-left: 510px;
        }
        /*.table_ixport{*/
        /*margin-left: 400px;*/
        /*}*/
      }
      .info_tab{
        width: 100%;
        height: calc(100% - 68px);
        flex-grow: 1;

        .el-table{
          table{
            th,td{
              text-align:center;
            }
          }
          .unauth{
            color: #f00;
          }
        }
        .el-table td, .el-table th{
          padding: 5px 0;
        }
      }
    }
    .info_tab_footer{
      padding-left: 20px;
      background: #eee;
      height: 40px;
      line-height: 40px;
      box-shadow: 0 -2px 2px rgba(0,0,0,.1);
      position: relative;
      z-index: 10;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    .show_pager{
      float: right;
      line-height: 40px;
      height: 40px;
      overflow: hidden;
    }
    .info_form{
      padding-bottom: 10px;
      border-bottom: 1px solid #dcdfe6;
      .sta_searchinfo{
        .el-form-item{
          margin-right: 0;
          margin-bottom: 15px;
        }

      }

    }
    .info_table{
      margin-top: 10px ;
      border-color: #dcdfe6;
      ul{
        /*border-top: 2px dotted #bbbbbb;
        margin: 10px -10px -10px 0;
        padding: 5px 10px 10px 10px;
        /*background-color: #fbfbfb;*/
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: row;
        flex-direction: row;
        li:nth-of-type(1){
          padding-left: 0;
        }
        li:last-of-type{
          border-right: none;
        }
        li{
          border: 1px solid #eee;
          width: 10%;
          border-bottom: none;
          border-left: none;
          p{
            font-size: 14px;
            text-align: center;
            line-height: 34px;

          }
        }
        .el-form-item{
          margin-bottom: 0;
          margin-right: 0;

        }
      }

    }

  }

  .tab-content{
    .info_form,.info_table{
      .el-input.is-disabled .el-input__inner {
        background-color: #fff;
        /*border-color: #e4e7ed;*/
        /*color: #c0c4cc;*/
        /*cursor: not-allowed;*/
      }
    }

  }


  /*批次详情*/
.storagesPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 1000px;
  max-width:  1000px;

}
.batchTypeNo{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background: rgb(223,233,245);
  padding-left: 15px;
}
.icon_man {
  background-image: url(../../../../../assets/icom/human.svg);
  background-size: 24px;
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.icon_blank {
  background-size: 24px;
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.content_head {
  background-color: #E9F3FA;
  line-height: 36px;
  height: 36px;
  padding: 0 10px;
}

.stepFrom {
  .el-form--inline .el-form-item {
    margin-right: 0;
    float: left;
    display: flex;
  .el-input {
    width: 150px;
    padding: 0;
    margin-left: -5px;
  }
    .el-button {
      margin-left: 10px;
    }
  }
}

.storagesInfoPop_content {
  .tab-card{
    .el-tabs__content{
      padding: 0 !important;
    }
  }
  /*.el-tabs--border-card>.el-tabs__content{*/
    /*padding: 0 !important;*/
  /*}*/
  /*padding: 0 10px 0 10px;*/
  .tab_descript {}
  .info {
    background-color: rgb(238, 241, 246);
    margin-top: -30px;
    padding: 10px;
  }
  .info p {
    font-weight: 900;
    font-size: 16px;
    margin-bottom: 0px;
  }
  .info-content {
    margin-top: 10px;
    padding: 20px 10px 10px;
    background-color: #FFF;
    border: 2px dotted rgb(238, 241, 246);
  }
  .itemRecharge {
    background-color: rgb(238, 241, 246);
    padding: 10px;
  }
  .tab_box {
    padding-left: 10px;
    display: flex;
    flex-direction: row;
  .stepItem_title {
    margin: 10px 0 10px 10px;
    font-size: 14px;
    width: 165%;
  }
    .stepItem {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
      width: 160%;
      p {
        word-wrap: break-word;
        word-break: normal;
        display: block;
      }
    }
  }

}
.cont_rules .el-input--mini .el-input__inner{
  background: #409eff;
}
  .p_table .el-input--mini .el-input__inner{
    width: 200px;
  }
</style>
