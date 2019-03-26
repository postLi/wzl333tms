<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="storagesPopDelivery" v-loading="loading">
    <template class="addCPop-content" slot="content">
      <!-- 实际到车时间 弹出框 -->
      <actualSendtime :popVisible.sync="timeInfoVisible" @time="getActualTime" :title="'到车'" :isArrival="true"></actualSendtime>
      <div class="batchTypeNo">
        批次：{{getBatchNo}}
      </div>
      <div class="storagesInfoPop_content">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tab-card">
          <el-tab-pane label="批次详情" name="first">
            <div class="tabs-cont" v-loading="loading">
              <div class="info_form">
                <!--<el-form-item label="网点">-->
                <!--<SelectTree v-model="otherinfo.orgid" />-->
                <!--</el-form-item>-->
                <el-form :inline="true" :size="btnsize" label-position="right" label-width="110px" class="st_searchinfo clearfix" :model="formModel">
                  <el-form-item label="到达网点:">
                    <el-input v-model="formModel.arriveOrgName" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="车牌号码:">
                    <el-input v-model="formModel.truckIdNumber" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="司机姓名:">
                    <el-input v-model="formModel.dirverName" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="司机电话:">
                    <el-input v-model="formModel.dirverMobile" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="可载体积:">
                    <el-input v-model="formModel.truckVolume" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="可载重量:">
                    <el-input v-model="formModel.truckLoad" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="分摊方式:">
                    <el-input v-model="formModel.apportionTypeName" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="配载日期:">
                    <el-input :value="formModel.loadTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}')" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="要求到达日期:" class="art_arriveTime">
                    <el-input :maxlength="15" clearable disabled :value="formModel.requireArrivedTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}')">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="备注:" class="art_remk">
                    <el-input v-model="formModel.remark" clearable :maxlength="300" auto-complete="off" type="textarea" disabled>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="infos_table_">
                <el-form :inline="true" :size="btnsize" label-position="right" label-width="80px" class="st_searchinfo clearfix" :model="formModel" :rules="ruleData">
                  <ul>
                    <li>
                      <p>现付车费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.nowpayCarriage" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>现付油卡</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.nowpayOilCard" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>回付车费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.backpayCarriage" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>回付油卡</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.backpayOilCard" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>到付车费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.arrivepayCarriage" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>到付油卡</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.arrivepayOilCard" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>整车保险费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.carloadInsuranceFee" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>发站装卸费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.leaveHandlingFee" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>发站其他费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.leaveOtherFee" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p> 到站装卸费</p>
                      <el-form-item prop="">
                        <el-input :maxlength="10" v-model="formModel.arriveHandlingFee" :disabled="isModify" v-number-only:point></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p> 到站其他费</p>
                      <el-form-item prop="">
                        <el-input :maxlength="10" v-model="formModel.arriveOtherFee" :disabled="isModify" v-number-only:point></el-input>
                      </el-form-item>
                    </li>
                    <li style="width: 12%;">
                      <p>封签号</p>
                      <el-form-item prop="sealNumber">
                        <el-input :maxlength="10" v-model="formModel.sealNumber" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li style="width: 12%;">
                      <p>油卡号</p>
                      <el-form-item prop="oilCardNumber">
                        <el-input :maxlength="10" v-model="formModel.oilCardNumber" disabled></el-input>
                      </el-form-item>
                    </li>
                  </ul>
                </el-form>
              </div>
              <div class="tab_info artDelivery_table">
                <div class="_btns_box">
                 
                  <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('sure')" v-if="!isAlFun" class="table_poptitle">{{popTitle}}
                  </el-button>
                   <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置
                  </el-button>
                  <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('printer')" plain class="table_export">打印清单
                  </el-button>
                  <el-button type="success" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain class="table_import">导出
                  </el-button>
                  
                </div>
                <div class="infos_tab">
                  <el-table ref="multipleTable" :data="detailList" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" :key="tablekey" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" :row-class-name="classLineRed">
                    <el-table-column fixed sortable type="selection" width="50"></el-table-column>
                    <template v-for="column in tableColumn">
                      <!--有数据-->
                      <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :width="column.width">
                        <!--状态-->
                        <template slot-scope="scope">
                          <div v-if="column.checkfn">
                            <!-- <span v-if="column.checkfn(scope.row)">
                               {{scope.row[column.prop]}}
                            </span> -->
                            <span v-if="column.checkfn(scope.row)" v-html="column.slot(scope)"></span>
                            <span v-else-if="column.prop==='actualAmount'">
                               <el-input
                               @dblclick.stop.prevent.native :class="{'textChangeDanger': detailList[scope.$index][column.prop + 'lyy']}"
                                @click.stop.prevent.native
                                 v-model.number="scope.row[column.prop]"
                                 :size="btnsize"
                                 v-number-only
                                 @change="(val) => changeData(scope.$index, column.prop, val)"
                               >
                              </el-input>
                            </span>
                            <span v-else>
                               <el-input
                               @dblclick.stop.prevent.native :class="{'textChangeDanger': detailList[scope.$index][column.prop + 'lyy']}"
                                @click.stop.prevent.native
                                 v-model.number="scope.row[column.prop]"
                                 :size="btnsize"
                                 v-number-only:point
                                 @change="(val) => changeData(scope.$index, column.prop, val)"
                               >
                              </el-input>
                            </span>
                          </div>
                          <div v-else-if="column.expand">
                            <el-input @dblclick.stop.prevent.native :class="{'textChangeDanger': detailList[scope.$index][column.prop + 'lyy']}" v-model.number="scope.row[column.prop]" :size="btnsize" v-number-only @click.stop.prevent.native @change="(val) => changeData(scope.$index, column.prop, val)">
                            </el-input>
                          </div>
                          <span class="clickitem" v-else-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)">
                          </span>
                          <span v-else-if="column.slot" v-html="column.slot(scope)">
                          </span>
                          <span v-else>
                            {{scope.row[column.prop]}}
                          </span>
                          <!--<span v-else v-html="column.slot(scope)"></span>-->
                        </template>
                      </el-table-column>
                    </template>
                  </el-table>
                </div>
              </div>
            </div>
            <TableSetup code="ORDER_ARTER-3" :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn"></TableSetup>
          </el-tab-pane>
          <el-tab-pane label="批次跟踪" name="second">
            <div class="deliveryinfo_box" v-loading="loading">
              <el-row class="stepItem_title">
                <el-col :span="5" class="tracktype">类型</el-col>
                <el-col :span="4">操作时间</el-col>
                <el-col :span="3">操作网点</el-col>
                <el-col :span="2">操作信息</el-col>
                <el-col :span="6">操作明细</el-col>
              </el-row>
              <div class="stepinfo">
                <el-steps direction="vertical">
                  <el-step @mouseover.native="setThisActive" @mouseout.native="offThisActive" :class="{'firstactive': index===0}" v-for="(item, index) in trackDetail" :key="index">
                    <span slot="icon" class="location"></span>
                    <template slot="description">
                      <el-row class="stepItem">
                        <el-col :span="5">
                          <span class="typebox">{{item.loadStatus}}</span>
                          <template v-if="item.addStatus===1">
                            <span title="编辑" @click="editItem(item)" class="modifybtn"></span>
                            <span title="删除" @click="deleteTrack(item)" class="deletebtn"></span>
                          </template>
                        </el-col>
                        <el-col :span="4" class="textcenter">
                          <p>{{item.operatorTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
                        </el-col>
                        <el-col :span="3" class="textcenter">
                          <p>{{item.orgName}}</p>
                        </el-col>
                        <el-col :span="4">
                          <p>
                            <i class="track-human" v-if="item.addStatus===1"></i>
                            <i class="icon_blank" v-else></i> {{item.operatorUsername}}
                          </p>
                        </el-col>
                        <el-col :span="8">
                          <p>{{item.operatorInfo}}</p>
                        </el-col>
                      </el-row>
                    </template>
                  </el-step>
                  <!-- <el-step>
                    <span slot="icon" class="location"></span>
                  </el-step> -->
                </el-steps>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="运输合同" name="third">
            <div class="pact">
              <el-form :model="formModel">
                <div class="pact_top">
                  <h3>货物运输合同</h3>
                  <!--<div class="top_num">-->
                  <!--<el-form-item label="合同模板">-->
                  <!--<el-input  placeholder="1" size="mini"></el-input>-->
                  <!--</el-form-item>-->
                  <!--</div>-->
                  <div class="top_no">
                    <el-form-item label="NO.">
                      <el-input placeholder="1" size="mini" disabled v-model="formModel.batchNo"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="pact_content">
                  <div class="pact_title">
                    <span>委托方:</span>
                    <p style="">{{formModel.orgName}}</p>
                    <span>(以下简称甲方)</span>
                  </div>
                  <div class="pact_title">
                    <span>承运方:</span>
                    <p style="">{{iscarrier}}</p>
                    <span>(以下简称乙方)</span>
                  </div>
                  <p class="p_salf">为确保本货物安全运输，根据互利原则，经双方共同协商，签订本运输合同：</p>
                  <div class="p_cont">
                    <p>一、乙方必须证件齐全、真实，车辆车况必须良好，且必须配备完整的防雨防盗设施，运输途中被水淋湿或被盗，乙方无条件地承担全部责任；</p>
                    <p>二、乙方承运途中各项费用开支全由自己承担，途中若因意外交通事故及其他原因造成货物损失、变质、短缺等责任由乙方承担，若甲方有带路人员，乙方 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要负担其伙食费；</p>
                    <p>三、车辆装货期间，甲乙双方必须当场清点核实数量，并负责将甲方有关票据带到个卸货点，运输途中不得把甲方货物转让给第三者承运，也不允许乙方途 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中私自增载非甲方的其他货物，否则甲方有权拒付车费；</p>
                    <p>四、乙方在承运途中，若遇交通事故，交通堵塞或车辆故障应及时向甲方反映真实情况，并在甲方允许的时间内排除车辆故障，否则甲方另行排除换装，乙 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方不得擅自做主叫车换货；</p>
                  </div>
                  <div class="p_input">
                    <span></span>
                    <el-form-item label="五、本车货物总为">
                      <el-input size="mini" disabled v-model="formModel.loadAmountall"></el-input>
                      件
                      <el-input size="mini" disabled v-model="formModel.loadWeightall"></el-input>
                      千克
                      <el-input size="mini" disabled v-model="formModel.loadVolumeall"></el-input>
                      方,全程车费
                      <el-input size="mini" disabled v-model="formModel.shipFeeAmount"></el-input>
                      元，甲乙双方不得任意减价或涨 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价，乙方不得收取其他劳务费，本车现付车费
                      <el-input size="mini" disabled v-model="formModel.nowpayCarriage"></el-input>
                      元，现付油卡
                      <el-input size="mini" disabled v-model="formModel.nowpayOilCard"></el-input>
                      元，到付车费
                      <el-input size="mini" disabled v-model="formModel.arrivepayCarriage"></el-input>
                      ，到付油 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;卡
                      <el-input size="mini" disabled v-model="formModel.arrivepayOilCard"></el-input>
                      元，回付车费
                      <el-input size="mini" disabled v-model="formModel.backpayCarriage"></el-input>
                      元，回付油卡
                      <el-input size="mini" disabled v-model="formModel.backpayOilCard"></el-input>
                      元，保险费
                      <el-input size="mini" disabled v-model="formModel.carloadInsuranceFee"></el-input>
                      元 。乙方必须将货物安全 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;完整及时运到本公司货运仓库，经双方验收无误后，甲方应一次性付清下次车费；
                    </el-form-item>
                  </div>
                  <div class="p_input">
                    <span></span>
                    <el-form-item label="六、本次发车时间为">
                      <el-input size="mini" disabled :value="formModel.actualSendtime"></el-input>
                      ，到达时间为
                      <!--<el-input size="mini" disabled :value="formModel.departureTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}')"></el-input>，到达时间为-->
                      <el-input size="mini" disabled :value="formModel.actualArrivetime"></el-input>
                      。
                    </el-form-item>
                    <p class="p_salf">司机在行驶途中手机不得关机，以便甲方跟进了解运输途中情况；</p>
                  </div>
                  <div class="p_cont">
                    <p>七、本合同一式两份，双方各执一份，未尽事宜，双方另行协商，签字后生效。</p>
                    <el-form-item label="关于本车:" class="p_textarea">
                      <el-input type="textarea" size="mini" v-model="formModel.remark"></el-input>
                    </el-form-item>
                    <!--<p class="p_about">关于本车：直送致兴和樵鸿</p>-->
                    <p class="p_about">附：驾驶员、车辆登记</p>
                  </div>
                  <div class="p_table">
                    <el-form-item label="司机名称:">
                      <el-input size="mini" disabled v-model="formModel.dirverName"></el-input>
                    </el-form-item>
                    <el-form-item label="家庭住址:">
                      <el-input size="mini" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="家庭电话:">
                      <el-input size="mini" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="车架号:">
                      <el-input size="mini" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="配载人员:">
                      <el-input size="mini" disabled v-model="formModel.userName"></el-input>
                    </el-form-item>
                    <span>甲方签章:</span>
                  </div>
                  <div class="p_table">
                    <el-form-item label="身份证号:">
                      <el-input size="mini" disabled v-model="formModel.driverCardid "></el-input>
                    </el-form-item>
                    <el-form-item label="随车电话:">
                      <el-input size="mini" disabled v-model="formModel.dirverMobile"></el-input>
                    </el-form-item>
                    <el-form-item label="车牌号:">
                      <el-input size="mini" disabled v-model="formModel.truckIdNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="发动机号:">
                      <el-input size="mini" disabled></el-input>
                    </el-form-item>
                    <span>乙方签章:</span>
                  </div>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <div slot="footer" class="stepinfo-footer stepFrom" v-if="isFootSecond">
      <el-form inline :model="formModelTrack" :rules="ruleForm" ref="formModelTrack">
        <el-form-item label="类型" prop="loadStatus">
          <el-input v-model="formModelTrack.loadStatus" placeholder="类型" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="operatorTime">
          <el-date-picker v-model.trim="formModelTrack.operatorTime" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="operatorInfo">
          <el-input v-model="formModelTrack.operatorInfo" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item class="tracksavebtn">
          <el-button type="primary" @click="submitForm('formModelTrack')" size="mini">保 存</el-button>
          <transition name="el-zoom-in-center">
            <el-button v-if="isCancelFootEdit" type="warning" @click="resetForm()" size="mini">取 消</el-button>
          </transition>
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
import { getLoadDetail, deleteTrack, postAddTrack, putUpdateTrack, getSelectLoadList } from '@/api/operation/track'
import { postSelectLoadMainInfoList, postAddRepertory, postConfirmToCar } from '@/api/operation/arteryDelivery'
import { getLookContract } from '@/api/operation/arteryDepart'
// import { getExportExcel } from '@/api/company/customerManage'
import { mapGetters } from 'vuex'
import SelectTree from '@/components/selectTree/index'
import { objectMerge2, parseTime, closest } from '@/utils/'
import TableSetup from '@/components/tableSetup'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import actualSendtime from '../../load/components/actualSendtimeDialog'

export default {
  data() {
    const validateNum = function(rule, value, callback) {
      if (!REGEX.ONLY_NUMBER.test(value)) {
        callback(new Error('请输入数字~'))
      } else if (REGEX.KONGE.test(value)) {
        // this.$message.error('不能输入空格~')
        callback(new Error('不能输入空格~'))
      } else {
        callback()
      }
    }

    return {
      formModelTrack: {
        loadStatus: '',
        operatorTime: +new Date(),
        operatorInfo: ''
      },
      ruleData: {
        arriveHandlingFee: [
          { validator: validateNum, trigger: 'blur' }
        ], //
        arriveOtherFee: [
          { validator: validateNum, trigger: 'blur' }
        ]
      },
      tablekey: '1',
      timeInfoVisible: false,
      // titleIcon:"到车确定",
      // titleIcon:"到车入库",
      getBatchNo: '',
      popTitle: '到车入库',
      activeName: 'first',
      trackDetail: [],
      ruleForm: {},
      loading: true,
      isFootEdit: false,
      isFootSecond: false,
      isFootOther: false,
      isCancelFootEdit: false,
      isHiddenBtn: false,
      isEditActual: false,
      iscarrier: '',
      propsId: '',
      formModel: {},
      textChangeDanger: [],
      label: '序号',
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
      detailList: [],
      selectDetailList: [],
      selected: [],
      // 加载状态
      // loading: true,
      setupTableVisible: false,
      // AddCustomerVisible: false,
      formMode1: {},
      sendTypeId: {
        typeId: 54 // 等于54为干线到车确认
      },
      batchTypeName: '',
      sendModel: {
        'tmsOrderLoad': {
          'id': ''
        },
        tmsOrderLoadFee: {
          'id': '',
          'arriveHandlingFee': '',
          'arriveOtherFee': ''
        },
        tmsOrderLoadDetailsList: [
          // {
          //   id:'',
          //   actualAmount:'',
          //   actualWeight:'',
          //   actualVolume:''
          // }
        ]
      },
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        'vo': {
          'loadId': 1
        }
      },
      tableColumn: [{
        label: '序号',
        prop: 'number',
        width: '100',
        fixed: true,
        slot: (scope) => {
          return scope.$index + 1
        }
      }, {
        label: '开单网点',
        prop: 'shipFromOrgName',
        width: '120',
        fixed: true
      }, {
        label: '运单号',
        prop: 'shipSn',
        width: '150',
        fixed: true
      }, {
        label: '子运单号',
        prop: 'childShipSn',
        width: '120',
        fixed: false
      },
      {
        label: '到付(元)',
        prop: 'shipArrivepayFee',
        width: '90',
        fixed: false
      },
      {
        label: '操作费(元)',
        prop: 'handlingFee',
        width: '100',
        fixed: false
      },
        //   {
        //   label: '应到件数',
        //   prop: 'loadAmount',
        //   width: '100',
        //   fixed: false
        // }, {
        //   label: '应到重量',
        //   prop: 'loadWeight',
        //   width: '100',
        //   fixed: false
        // }, {
        //   label: '应到体积',
        //   prop: 'loadVolume',
        //   width: '100',
        //   fixed: false
        // },
        // v-if="isAlFun"   入库前的
      {
        label: '实到件数',
        prop: 'actualAmount',
        width: '100',
        isAlFun: true,
        expand: true,
        fixed: false,
        checkfn: (row) => {
          return row.warehouStatus === 1 || row.unloadSign === 1
        },

        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.loadAmount, row.actualAmount, null, row.actualAmount)
        }
      }, {
        label: '实到重量(kg)',
        prop: 'actualWeight',
        width: '120',
        expand: true,
        checkfn: (row) => {
          return row.warehouStatus === 1 || row.unloadSign === 1
        },
        fixed: false,
        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.loadWeight, row.actualWeight, null, row.actualWeight)
        }
      }, {
        label: '实到体积(m³)',
        prop: 'actualVolume',
        width: '120',
        expand: true,
        checkfn: (row) => {
          return row.warehouStatus === 1 || row.unloadSign === 1
        },
        fixed: false,

        slot: (scope) => {
          const row = scope.row
          return this._setTextColor(row.loadVolume, row.actualVolume, null, row.actualVolume)
        }
      },
        // v-if="!isAlFun"  入库后的
        // {
        //   label: '实到件数',
        //   prop: 'actualAmount',
        //   width: '100',
        //   checkfn: (row)=>{
        //     return row.warehouStatus === 1
        //   },
        //   fixed: false
        // }, {
        //   label: '实到重量',
        //   prop: 'actualWeight',
        //   width: '100',
        //   checkfn: (row)=>{
        //     return row.warehouStatus === 1
        //   },
        //   fixed: false
        // }, {
        //   label: '实到体积',
        //   prop: 'actualVolume',
        //   width: '100',
        //   checkfn: (row)=>{
        //     return row.warehouStatus === 1
        //   },
        //   fixed: false
        // },
        //
      {
        label: '配载件数',
        prop: 'loadAmount',
        width: '100',
        fixed: false
      }, {
        label: '配载重量(kg)',
        prop: 'loadWeight',
        width: '120',
        fixed: false
      }, {
        label: '配载体积(m³)',
        prop: 'loadVolume',
        width: '120',
        fixed: false
      }, {
        label: '发站',
        prop: 'shipFromCityName',
        width: '100',
        fixed: false
      }, {
        label: '到站',
        prop: 'shipToCityName',
        width: '100',
        fixed: false
      }, {
        label: '发货人',
        prop: 'shipSenderName',
        width: '100',
        fixed: false
      }, {
        label: '发货人电话',
        prop: 'shipSenderMobile',
        width: '120',
        fixed: false
      }, {
        label: '收货人',
        prop: 'shipReceiverName',
        width: '100',
        fixed: false
      }, {
        label: '收货人电话',
        prop: 'shipReceiverMobile',
        width: '120',
        fixed: false
      }, {
        label: '货品名',
        prop: 'cargoName',
        width: '100',
        fixed: false
      }, {
        label: '货号',
        prop: 'shipGoodsSn',
        width: '130',
        fixed: false
      }, {
        label: '运单备注',
        prop: 'shipRemarks',
        width: '110',
        fixed: false
      }
      ]
    }
  },
  components: {
    popRight,
    SelectTree,
    selectType,
    TableSetup,
    actualSendtime

  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid() {
      // console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)

      // return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    isModify: {
      type: Boolean,
      default: false
    },
    isAlFun: {
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
    arrivalStatus: {
      type: String,
      default: ''
    },
    id: {
      type: [String, Number],
      dafault: false
    }
  },
  watch: {
    arrivalStatus() {},
    validateIsEmpty(msg = '不能为空！') {
      return (rule, value, callback) => {
        if (!value) {
          callback(new Error(msg))
        } else {
          callback()
        }
      }
    },
    id(newVal) {},
    info: {
      handler(cval, oval) {
        if (this.isModify) {
          this.popTitle = '到车确定'
        } else if (this.isAlFun) {
          this.popTitle = '查看详情'
        } else {
          this.popTitle = '到车入库'
        }
        this.getBatchNo = this.info.batchNo
        this.propsId = this.info.id
        this.fetchGetLookContracts()
        this.getDetail()
        this.fetchAllCustomer()
        this.fetchSelectLoadMainInfoList()
      },
      deep: true
    },
    isAlFun(newVal) {
      this.tablekey = +new Date()
      if (this.isModify) {
        this.popTitle = '到车确定'
      } else if (this.isAlFun) {
        this.popTitle = '查看详情'
      } else {
        this.popTitle = '到车入库'
      }
    },
    isModify(newVal) {
      this.tablekey = +new Date()
      if (this.isModify) {
        this.popTitle = '到车确定'
      } else if (this.isAlFun) {
        this.popTitle = '查看详情'
      } else {
        this.popTitle = '到车入库'
      }
    },
    popVisible(newVal, oldVal) {
      if (!this.inited) {
        this.inited = true
        this.initInfo()
      }
      if (newVal) {
        this.formModelTrack = this.$options.data().formModelTrack
      }
    }
  },
  mounted() {
    this.propsId = this.info.id
    if (this.popVisible) {
      this.fetchGetLookContracts()
      this.getDetail()
      this.fetchAllCustomer()
      this.fetchSelectLoadMainInfoList()
    }
  },
  methods: {
    classLineRed(row) { // 行样式
      if (this.detailList.length) {
        if (row.row.unloadSign === 1) {
          return 'rowDisable'
        } else {
          return ''
        }
      }
    },
    changeData(index, prop, newVal) { // 判断当行
      this.detailList[index][prop] = Number(newVal)
      const curAmount = this.detailList[index].actualAmount // 实到件数
      const curWeight = this.detailList[index].actualWeight // 实到重量
      const curVolume = this.detailList[index].actualVolume // 实到体积
      const curloadAmount = this.detailList[index].loadAmount // 配载件数
      const curloadWeight = this.detailList[index].loadWeight // 配载重量
      const curloadVolume = this.detailList[index].loadVolume // 配载体积
      if (this.selectDetailList.length === 1 && curAmount === 0) {
        // console.log(this.selectDetailList.length, this.detailList.length)
        this.detailList[index].actualAmount = curloadAmount
        this.detailList[index].actualWeight = curloadWeight
        this.detailList[index].actualVolume = curloadVolume
        this.$notify({
          title: '提示',
          message: '实到件数不能为0',
          type: 'warning'
        })
      }
      // if (curAmount !== 0 && curWeight === 0 && curVolume === 0) {
      //   console.log(this.selectDetailList.length, this.detailList.length)
      //   this.detailList[newVal].actualAmount = curloadAmount
      //   this.detailList[newVal].actualWeight = curloadWeight
      //   this.detailList[newVal].actualVolume = curloadVolume
      //   this.$notify({
      //     title: '提示',
      //     message: '实到重量和实到体积不能同时为0',
      //     type: 'warning'
      //   })
      // }
      if (curAmount === 0 && curVolume === 0 && curWeight === 0) {
        this.$refs.multipleTable.toggleRowSelection(this.detailList[index], false)
        // console.log(this.selectDetailList.length)
        if (this.selectDetailList.length === 0) {
          this.$refs.multipleTable.toggleRowSelection(this.detailList[index], true)
          this.detailList[index].actualAmount = curloadAmount
          this.detailList[index].actualWeight = curloadWeight
          this.detailList[index].actualVolume = curloadVolume
        }
        this.$notify({
          title: '提示',
          message: '实到数量都为0时,取消本条运单入库,但必须有一条运单',
          type: 'warning'
        })
      } else if (curAmount < 0 || curWeight < 0 || curVolume < 0) {
        this.$notify({
          title: '提示',
          message: '实到件数/实到重量/实到体积不能小于0,默认为该库存数量',
          type: 'warning'
        })
        this.detailList[index].actualAmount = curloadAmount
        this.detailList[index].actualWeight = curloadWeight
        this.detailList[index].actualVolume = curloadVolume
        this.$refs.multipleTable.toggleRowSelection(this.detailList[index], true)
      }
      // else if (curAmount > curloadAmount || curAmount < 0 || curWeight > curloadWeight || curWeight < 0 || curVolume > curloadVolume || curVolume < 0) {
      //   this.$notify({
      //     title: '提示',
      //     message: '实到件数/实到重量/实到体积不能小于0大于库存数量,默认为该库存数量',
      //     type: 'warning'
      //   })
      //   this.detailList[newVal].actualAmount = curloadAmount
      //   this.detailList[newVal].actualWeight = curloadWeight
      //   this.detailList[newVal].actualVolume = curloadVolume
      //   this.$refs.multipleTable.toggleRowSelection(this.detailList[newVal], true)
      // }
      else {
        this.$refs.multipleTable.toggleRowSelection(this.detailList[index], true)
      }

      if (curAmount !== curloadAmount || curWeight !== curloadWeight || curVolume !== curloadVolume) {
        // this.textChangeDanger[index] = true
        this.$set(this.detailList[index], prop + 'lyy', true)
      } else {
        if (curAmount === curloadAmount && curWeight === curloadWeight && curVolume === curloadVolume) {
          // this.textChangeDanger[index] = false
          this.$set(this.detailList[index], prop + 'lyy', false)
        }
      }
      return this.detailList[index].actualAmount && this.detailList[index].actualWeight && this.detailList[index].actualVolume
    },
    fetchSelectLoadMainInfoList() {
      this.loading = true
      const selectMainId = this.propsId
      this.searchQuery.vo.loadId = selectMainId
      return postSelectLoadMainInfoList(this.searchQuery).then(data => {
        this.formModel = data.list[0]
        this.batchTypeName = this.formModel.batchTypeName
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    fetchAllCustomer() { // 获取运单列表
      this.loading = true
      const _id = this.propsId
      // console.log(_id);
      return getSelectLoadList(_id).then(data => {
        this.detailList = data
        this.toggleAllRows()
        this.loading = false
        this.$nextTick(() => { // 默认设置实到数量为配载数量
          this.detailList.forEach(e => {
            // 入库前
            if (!this.isAlFun) {
              if (e.warehouStatus !== 1) {
                e.actualAmount = e.loadAmount
                e.actualWeight = e.loadWeight
                e.actualVolume = e.loadVolume
              }
            }
          })
        })
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    fetchGetLookContracts() {
      this.loading = true
      const _isid = this.propsId
      return getLookContract(_isid).then(data => {
        this.iscarrier = data.data.carrier
        this.loading = false
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    getDetail() {
      const id = this.propsId
      return getLoadDetail(id).then(data => {
        this.trackDetail = Object.assign([], data)
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    toggleAllRows() {
      this.$nextTick(() => {
        this.detailList.forEach((e, index) => {
          // this.$refs.multipleTable.toggleRowSelection(e, true)
          if (e.warehouStatus === 1 || e.unloadSign === 1) {
            this.$refs.multipleTable.toggleRowSelection(e, false)
          } else {
            this.$refs.multipleTable.toggleRowSelection(e, true)
          }
        })
      })
    },
    handleClick(tab, event) {
      if (this.activeName === 'second') {
        this.isFootSecond = true
      } else {
        this.isFootSecond = false
      }
    },
    initInfo() {
      this.loading = false
    },
    getOrgid(id) {
      // this.form.orgid = id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formModelTrack.id) {
            this.editTrack()
            console.log('FORMMODEL_EDIT', this.formModelTrack)
          } else {
            this.addTrack()
            console.log('FORMMODEL_ADD', this.formModelTrack)
          }
        }
        this.closeMe()
      })
    },
    reset() {},
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    },
    deleteTrack(item) {
      console.log(item)
      return deleteTrack(item.id).then(data => {
        this.$message({ type: 'success', message: '删除成功' })
        this.getDetail()
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    editItem(item) {
      // this.resetForm()
      this.formModelTrack = objectMerge2({}, item)
      this.isCancelFootEdit = true
    },
    editTrack() {
      console.log('修改', this.info)
      this.formModelTrack.transferId = 0
      this.formModelTrack.operatorTime = parseTime(this.formModelTrack.operatorTime, '{y}-{m}-{d} {h}:{i}:{s}')
      return putUpdateTrack(this.formModelTrack).then(data => {
        this.$message({ type: 'success', message: '修改成功' })
        this.getDetail()
        this.resetForm()
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    addTrack() {
      console.log('添加', this.info)
      this.formModelTrack.loadId = this.info.id
      this.formModelTrack.addStatus = 1 // 0-自动添加 1-手动添加
      this.formModelTrack.operatorTime = parseTime(this.formModelTrack.operatorTime, '{y}-{m}-{d} {h}:{i}:{s}')
      return postAddTrack(this.formModelTrack).then(data => {
        this.$message({ type: 'success', message: '添加成功' })
        this.getDetail()
        this.resetForm()
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs['formModelTrack'].resetFields()
        this.formModelTrack = this.$options.data().formModelTrack
        this.isCancelFootEdit = false
      })
    },
    fetchData() {
      this.fetchAllCustomer()
    },
    showImport() {
      // 显示导入窗口
    },
    doAction(type) {
      // 判断是否有选中项
      if (!this.selected.length && type !== 'export' && type !== 'printer') {
        this.closeAddCustomer()
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }
      const obj = {}
      for (const item in this.info) {
        obj[item] = (this.info[item] === null || this.info[item] === undefined) ? '' : this.info[item]
      }
      let appendTopStr = '<style>body{width: 100%;}</style>'
      appendTopStr += '<body width="100%" style="font-family: {content_font_family}"><table width="100%" style="font-size: {content_word_size}px;font-family: {content_font_family}"><tr><td colspan="9" align="center" style="font-size: {heading_word_size}px;font-weight: 500;padding: 10px 0;">' +
        this.otherinfo.companyName +
        '交接清单</td></tr><tr><td align="right">运行区间: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.orgName + '   →   ' + obj.endOrgName +
        '</td><td align="right">发车时间: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.loadTime +
        '</td><td align="right">发车批次: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.batchNo +
        '</td></tr><tr><td align="right">车牌号码: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.truckIdNumber +
        '</td><td align="right">司机名称: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.dirverName +
        '</td><td align="right">联系电话: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.dirverMobile +
        '</td></tr></table></body>'

      switch (type) {
        // 导出
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.detailList,
            columns: this.tableColumn,
            name: '批次详情'
          })
          break
          // 打印
        case 'printer':
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.detailList,
            columns: this.tableColumn,
            name: '批次详情',
            appendTop: appendTopStr,
            type: 'load' // 配载单
          })
          break
          // 添加客户
        case 'sure':
          console.log('批次状态：', this.arrivalStatus)
          if (this.arrivalStatus === '在途中' || this.info.bathStatusName === '在途中') {
            this.timeInfoVisible = true
          } else {
            this.getActualTime()
          }
          break
      }
      if (type !== 'sure') {
        // 清除选中状态，避免影响下个操作
        // this.$refs.multipleTable.clearSelection()
      }
    },
    getActualTime(obj) {
      let data
      if (this.popTitle === '到车确定') {
        data = 54
        postConfirmToCar(this.formModel.id, data).then(res => {
          this.$message({
            type: 'success',
            message: '到车确定成功'
          })
          this.$emit('update:isModify', false)
          this.$emit('success')
          this.loading = false
        }).catch(err => {
          this._handlerCatchMsg(err)
          this.loading = false
        })
      } else {
        const countActual = 0
        let countStatus = 0
        this.selected.forEach((value, index, array) => {
          if (value.actualAmount === 0 && value.actualWeight === 0 && value.actualVolume === 0) {
            countStatus += 1
          }
          if (value.warehouStatus === 1) {
            countStatus += 1
          }
        })
        if (countActual > 0) {
          this.$message({
            type: 'info',
            message: '实到件数/实到重量/实到体积不能小于0'
          })
          return false
        }
        if (countStatus > 0) {
          this.$message({
            type: 'info',
            message: '不能再次到车入库'
          })
          this.toggleAllRows()
          return false
        }

        if (this.formModel.arriveHandlingFee === '' || this.formModel.arriveOtherFee === '') {
          this.formModel.arriveHandlingFee = 0
          this.formModel.arriveOtherFee = 0
        }
        this.sendModel.tmsOrderLoad.id = this.formModel.id
        this.sendModel.tmsOrderLoadFee.id = this.formModel.loadFeeId
        this.sendModel.tmsOrderLoadFee.arriveHandlingFee = this.formModel.arriveHandlingFee
        this.sendModel.tmsOrderLoadFee.arriveOtherFee = this.formModel.arriveOtherFee
        this.sendModel.tmsOrderLoadDetailsList = []
        this.selected.forEach((value, index, array) => {
          this.sendModel.tmsOrderLoadDetailsList.push({
            id: value.id,
            actualAmount: value.actualAmount,
            actualWeight: value.actualWeight,
            actualVolume: value.actualVolume,
            warehouStatus: value.warehouStatus
          })
        })
        data = this.sendModel
        if (obj) {
          this.$set(data.tmsOrderLoad, 'actualArrivetime', obj.actualArrivetime)
        }
        postAddRepertory(55, data).then(res => {
          this.$message({
            type: 'success',
            message: '到车入库成功'
          })
          this.$emit('success')
          this.$refs.multipleTable.clearSelection()
        }).catch(err => {
          this._handlerCatchMsg(err)
        })
        this.closeMe()
      }
    },
    setTable() {
      this.setupTableVisible = true
    },
    closeSetupTable() {
      this.setupTableVisible = false
    },
    openAddCustomer() {
      this.AddCustomerVisible = true
    },
    closeAddCustomer() {
      this.AddCustomerVisible = false
    },
    clickDetails(row, event, column) {
      if (row.unloadSign !== 1) {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    },
    getSelection(selection) {
      const arr = []
      this.detailList.forEach((el, index) => {
        selection.forEach((em, idx) => {
          if (el.repertoryId === em.repertoryId) {
            if (em.unloadSign === 1) {
              this.$refs.multipleTable.toggleRowSelection(el, false)
            } else {
              arr.push(em)
            }
          }
        })
      })
      this.selected = arr
    },
    // 取消高亮样式
    offThisActive(e) {
      const p = closest(e.target, '.el-step')
      if (p) {
        p.classList.remove('trackactive')
      }
    },
    // 设置高亮样式
    setThisActive(e) {
      const p = closest(e.target, '.el-step')
      if (p) {
        p.classList.add('trackactive')
      }
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = new Date().getTime() // 刷新表格视图
      this.$refs.multipleTable.doLayout()
    }
  }
  // }
}

</script>
<style lang="scss">
.tabs-cont {
  // height: calc(100% - 33px);
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 78px;
  .tab_info.artDelivery_table {
    padding: 0;
  }
  .tab_info {
    padding: 0 10px;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    ._btns_box {
      /*padding-top: 17px;*/
      margin-bottom: 10px;
      border-top: 2px dotted #c8c8c8;
      position: relative;
      padding: 17px 10px 0 10px;
      .el-button {
        margin-right: 0;
      }
      .el-button.table_poptitle {
        position: absolute;
      }
      .el-button.table_export,
      .el-button.table_import {
        float: right;
      }
      .table_setup {
        float: right;
        margin-right: 0;
      }
    }
    .infos_tab {
      width: 100%;
      height: calc(100vh - 570px);
      flex-grow: 1;
      padding: 0 10px;
      .el-table {
        table {
          th,
          td {
            text-align: center;
          }
          th {
            color: #606266;
            font-weight: 400;
          }
        }
        .unauth {
          color: #f00;
        }
      }
      .rowDisable {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
        .el-checkbox {
          .el-checkbox__input {
            cursor: not-allowed;
          }
          .el-checkbox__inner {
            background-color: #ccc;
          }
        }
      }
      .el-table td,
      .el-table th {
        padding: 5px 0;
      }
      .actuaNum {}
      .el-table__row {
        .el-table_2_column_43 {
          .el-input__inner {
            border-color: #3e9ff1;
          }
        }
        .el-table_2_column_44 {
          .el-input__inner {
            border-color: #3e9ff1;
          }
        }
        .el-table_2_column_45 {
          .el-input__inner {
            border-color: #3e9ff1;
          }
        }
      }
    }
  }
  .infos_tab_footer {
    padding-left: 20px;
    background: #eee;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -2px 2px rgba(0, 0, 0, .1);
    position: relative;
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .show_pager {
    float: right;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
  }
  .info_form {
    /*margin-top: 85px;*/
    /*padding-bottom: 10px;*/
    .st_searchinfo {
      border-left: #d4d4d4;
      .el-form-item {
        margin-right: 35px;
        margin-bottom: 10px;
      }
      .el-form-item:nth-of-type(3) {
        margin-right: 0;
      }
      .el-form-item:nth-of-type(6) {
        margin-right: 0;
      }
      .el-form-item:nth-of-type(9) {
        margin-right: 0;
      }
      .el-form-item.art_remk {
        width: 100%;
        .el-form-item__content {
          width: 88%;
          .el-textarea.is-disabled {
            .el-textarea__inner {
              background-color: #fff;
              color: #3e9ff1;
            }
          }
        }
      }
      .el-form-item--mini {}
    }
    .el-input.is-disabled .el-input__inner {
      color: #3e9ff1
    }
  }
  .infos_table_ {
    padding: 0 10px 10px 10px;
    margin-top: 10px;
    border-color: #dcdfe6;
    .st_searchinfo {
      border-left: 1px solid #d4d4d4;
      border-right: 1px solid #d4d4d4;
      ul {
        /*border-top: 2px dotted #bbbbbb;
            margin: 10px -10px -10px 0;
            padding: 5px 10px 10px 10px;
            /*background-color: #fbfbfb;*/
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: row;
        flex-direction: row;
        li:nth-of-type(1) {
          padding-left: 0;
        }
        li:last-of-type {
          border-right: none;
        }
        li {
          border: 1px solid #eee;
          width: 10%;
          border-bottom: none;
          border-left: none;
          p {
            font-size: 14px;
            text-align: center;
            line-height: 34px;
            border-right-color: transparent;

            i {
              color: red;
            }
          }
          p:last-of-type {}
        }
        .el-form-item {
          margin-bottom: 0;
          margin-right: 0;
        }
      }
    }

    .el-input.is-disabled .el-input__inner {
      color: #3e9ff1;
      text-align: center;
      border-radius: 0;
      border-left-color: transparent;
      background: transparent;
      border-radius: 0;
    }
  }
}

.deliveryinfo_box {
  margin: 76px 10px 0 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* 覆盖ele样式 */
  .el-form--inline .el-form-item {
    margin-bottom: 0;
  }
  .el-step.is-vertical .el-step__head {
    width: 18px;
    position: relative;
    top: 0px;
  }
  .el-step.is-vertical .el-step__line {
    left: 8px;
  }
  .el-step__icon.is-text {
    border-color: transparent;
    border: 0;
    width: 18px;
    height: 18px;
  }
  .el-steps--vertical {
    height: auto;
  }
  .el-step__main {
    padding-bottom: 10px;
  }
  .el-step__description {
    padding-right: 0;
    font-size: 14px;
    color: #333;
  }

  .textcenter {
    text-align: center;
  }
  .typebox {
    background: url("../../../../../assets/png/track-bg.png") no-repeat;
    width: 118px;
    height: 24px;
    padding-left: 16px;
    text-align: center;
    color: #333;
    display: inline-block;
    line-height: 24px;
  }
  .location {
    background: url("../../../../../assets/png/unactive-icon.png") no-repeat;
    width: 18px;
    height: 18px;
    display: inline-block;
  }
  .modifybtn,
  .deletebtn {
    display: inline-block;
    display: none;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 3px;
    background: url("../../../../../assets/png/delete-icon.png") no-repeat;

    &:hover {}
  }
  /* 鼠标划过样式 */
  .trackactive {
    .modifybtn,
    .deletebtn {
      display: inline-block;
    }
  }
  .trackactive,
  .firstactive {
    .typebox {
      background: url("../../../../../assets/png/track-active.png") no-repeat;
      color: #fff;
    }
    .location {
      background: url("../../../../../assets/png/active-point.png") no-repeat;
    }
    .el-step__line {
      background-color: #3e9ff1;
    }
  }
  .modifybtn {
    margin-left: 10px;
    background: url("../../../../../assets/png/edit-icon.png") no-repeat;
    margin-right: 8px;
  }
  .steptitle {
    font-size: 14px;
    color: #333;
    height: 34px;
  }
  .stepItem_title {
    color: #333;
    margin-top: 10px;
    padding-left: 34px;
    height: 34px;
    .el-col {
      text-align: center;
    }
    .tracktype {
      text-align: left;
      text-indent: 20px;
    }
  }

  .stepItem {
    /* 解决当出现空值项造成高度为0，使得样式坍塌的异常 */
    .el-col>p {
      min-width: 1px;
      min-height: 1px;
    }
  }
  .stepinfo {
    flex: 1;
    overflow: auto;
  }
  .stepinfo-footer {
    border-top: 1px solid #d8d8d8;
    height: 70px;
    padding-top: 30px;
  }
}

.stepFrom {
  background-color: #f2f2f2;
  box-shadow: -1px -1px 10px #bbb;
  text-align: left;
  padding: 0 10px;
  .el-form-item__content {
    vertical-align: middle;
  }
}

.tabs-cont {
  .info_form,
  .infos_table {
    .el-input.is-disabled .el-input__inner {
      background-color: #fff;
    }
  }
}
/*批次详情*/

.storagesPopDelivery {
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 1100px;
  max-width: 1100px;
  // height: 100%;
  .el-tabs {
    height: 100%;
    .el-tabs__content {
      height: 100%;
      .el-tab-pane {
        height: calc(100% - 90px);
      }
    }
  }
  .el-input.is-disabled {
    .el-input__inner {
      background-color: transparent;
    }
  }


.batchTypeNo {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background: rgb(223, 233, 245);
  padding-left: 15px;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 34;
}

.icon_blank {
  background-size: 15px;
  display: inline-block;
  width: 14px;
  height: 16px;
  vertical-align: middle;
}

.content_head {
  background-color: #E9F3FA;
  line-height: 36px;
  height: 36px;
  padding: 0 10px;
}

.storagesInfoPop_content {
  height: 100%;
  .tab-card {
    .el-tabs__content {
      padding: 0 !important;
    }
  }
  .el-tabs__header {
    position: absolute;
    z-index: 34;
    top: 36px;
    left: 0;
    padding: 0 10px;
    background-color: #ffffff;
    width: 100%;
  }
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
  /*货物运输合同*/
  .pact {
    padding: 0 10px;
    margin-top: 85px;
    height: calc(100% - 85px);
    overflow: auto;
    .pact_top {
      position: relative;
      height: 40px;
      margin-top: 20px;
      margin-bottom: 10px;
      h3 {
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
      }
      .top_num {
        position: absolute;
        right: 10px;
        top: -18px;
        .el-form-item {
          display: flex;
        }
      }
      .top_no {
        position: absolute;
        right: 10px;
        top: -5px;
        .el-form-item {
          display: flex;
          .el-form-item__content {
            .el-input.is-disabled {
              .el-input__inner {
                background-color: #fff;
                border-color: #fff;
              }
            }
          }
        }
      }
    }
    .cont_styles {
      color: #606266;
      font-size: 14px;
    }
    .pact_content {
      .pact_title {
        color: #606266;
        font-size: 14px;
        margin: 10px 0 0 25px;
        p {
          display: inline-block;
          width: 250px;
          border-bottom: 1px solid;
          padding-left: 10px;
        }
      }
      .p_cont,
      .p_input {

        font-size: 14px;
        .el-input__inner {
          color: #606266;
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }
      .p_cont {
        .p_textarea.el-form-item {
          display: inline-flex;
          padding-left: 25px;
          margin-bottom: 0;
          .el-textarea {
            width: 250%;
          }
        }
        p.p_about {
          padding-left: 25px;
          margin: 10px 0 10px 0;
        }
        p {
          margin-bottom: 5px;
        }
      }
      p.p_salf {
        color: #606266;
        font-size: 14px;
        padding-left: 25px;
        margin: 10px 0 10px 0;
      }
      .p_input {
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__content {
            .el-input.el-input--mini.is-disabled {
              width: 13%;
              color: #606266;
              .el-input__inner {
                background: #fff;
              }
            }
          }
        }
      }
      .p_table {
        float: left;
        padding-left: 80px;
        width: 400px;
        margin-bottom: 150px;
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__content {
            .el-input.el-input--mini.is-disabled {
              width: 59%;
              .el-input__inner {
                width: 200px;
                color: #606266;
              }
            }
            .el-input.el-input--mini {
              width: 59%;
              input.el-input__inner {
                width: 200px;
                color: #606266;
              }
            }

            /*.el-input.el-input--mini.is-disabled{*/
            /*width: 20%*/
            /*}*/
          }
          .el-input__inner {
            border-top-color: transparent;
            border-left-color: transparent;
            border-right-color: transparent;
          }
        }
        .el-form-item:last-of-type {
          margin-bottom: 30px;
        }
      }
      .p_table:last-of-type {
        /*<!--top:-204px;-->*/
        /*left: 550px;*/
        float: right;
        padding-left: 0;
        /*padding-left: 300px;*/
        .el-form-item:last-of-type {
          margin-bottom: 50px;
        }
        span {
          margin-bottom: 100px;
        }
      }
    }
  }
}

.cont_rules .el-input--mini .el-input__inner {
  background: #409eff;
}

.p_table .el-input--mini .el-input__inner {
  width: 200px;
}
}
</style>
