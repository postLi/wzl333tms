<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="_storagesPop" v-loading="loading">
    <template class="addCustomerPop-content" slot="content">
      <div class="batchTypeNo">
        批次：{{getBatchNo}}
      </div>
      <div class="storagesInfoPop_content">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tab-card">
          <el-tab-pane label="批次详情" name="first">
            <div class="_tabs-cont" v-loading="loading">
              <div class="info_form">
                <!--<el-form-item label="网点">-->
                <!--<SelectTree v-model="otherinfo.orgid" />-->
                <!--</el-form-item>-->
                <el-form :inline="true" :size="btnsize" label-position="right" label-width="110px" class="st_searchinfo clearfix" :model="formModel">
                  <el-form-item label="到达网点">
                    <el-input v-model="formModel.arriveOrgName" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="车牌号码">
                    <el-input v-model="formModel.truckIdNumber" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="司机姓名">
                    <el-input v-model="formModel.dirverName" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="司机电话">
                    <el-input v-model="formModel.dirverMobile" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="可载体积">
                    <el-input v-model="formModel.truckVolume" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="可载重量">
                    <el-input v-model="formModel.truckLoad" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="分摊方式">
                    <el-input v-model="formModel.apportionTypeName" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="配载日期">
                    <el-input :value="formModel.loadTime " :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="预计到达日期" class="art_arriveTime">
                    <!--<el-input :value="formModel.requireArrivedTime | parseTime('{y}/{m}/{d}')" :maxlength="15" clearable disabled>-->
                    <el-input :value="formModel.planArrivedTime " :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                   <el-form-item label="追货宝">
                    <el-input v-model="formModel.terminalNo" :maxlength="15" clearable disabled>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="备注:" class="art_remk">
                    <el-input v-model="formModel.remark" clearable :maxlength="300" auto-complete="off" type="textarea" disabled>
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="infos_table">
                <el-form :inline="true" :size="btnsize" label-position="right" label-width="80px" class="st_searchinfo clearfix">
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
                      <p>到站装卸费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.arriveHandlingFee" disabled></el-input>
                      </el-form-item>
                    </li>
                    <li>
                      <p>到站其他费</p>
                      <el-form-item prop="nowpayCarriage">
                        <el-input :maxlength="10" v-model="formModel.arriveOtherFee" disabled></el-input>
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
              <div class="tab_info artDepart_table ">
                <div class="btns_box_send">
                  <el-popover @mouseenter.native="showSaveBox" @mouseout.native="hideSaveBox" placement="top" width="160" trigger="manual" v-model="visible2">
                    <p>表格宽度修改了，是否要保存？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="saveToTableSetup">确定</el-button>
                    </div>
                    <el-button slot="reference" type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
                  </el-popover>
                  <el-button type="success" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain class="table_print">打印清单
                  </el-button>
                  <el-button type="success" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain class="table_import">导出清单
                  </el-button>
                  
                </div>
                <div class="infos_tab">
                  <el-table :class="hideFixTable" row-key="repertoryId" @header-dragend="setTableWidth" :key="tablekey" ref="multipleTable" :data="usersArr" border @row-click="clickDetails" @selection-change="getSelection" height="100%" tooltip-effect="dark" style="width:100%;" stripe>
                    <el-table-column fixed type="selection" width="50" sortable></el-table-column>
                    <template v-for="column in tableColumn">
                      <el-table-column show-overflow-tooltip :key="column.id" :fixed="column.fixed" :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width" sortable></el-table-column>
                      <el-table-column sortable show-overflow-tooltip :key="column.id" :fixed="column.fixed" :prop="column.prop" :label="column.label" v-else :width="column.width">
                        <template slot-scope="scope">
                          <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                          <span v-else v-html="column.slot(scope)"></span>
                        </template>
                      </el-table-column>
                    </template>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="批次跟踪" name="second">
            <div class="deliveryinfo_box" v-loading="loading">
              <el-row class="stepItem_title">
                <el-col :span="5" class="tracktype">类型</el-col>
                <el-col :span="4">操作时间</el-col>
                <el-col :span="3">操作网点</el-col>
                <el-col :span="4">操作人</el-col>
                <el-col :span="8">操作信息</el-col>
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
                        <el-col :span="4" class="">
                          <p>{{item.operatorTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
                        </el-col>
                        <el-col :span="3" class="">
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
                  <!--  <el-step>
                     <span slot="icon" class="location"></span>
                   </el-step> -->
                </el-steps>
              </div>
            </div>
            <!--  <div class="tab_box">
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
                          <p>{{item.operatorTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
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
            </div> -->
          </el-tab-pane>
          <el-tab-pane label="运输合同" name="third">
            <div class="pact" id="contract">
              <el-form :model="sendContract" :rules="rules" ref="formName">
                <div class="sComName">{{ sendContract.nomineeCompany }}</div>
                <div class="pact_top">
                  <!--<h3>货物运输合同</h3>-->
                  <div class="sTitle">
                    <el-form-item label="" prop="contractName" class="contractNameClass">
                      <el-input v-model="sendContract.contractName" auto-complete="off" :disabled="!editFn" clearable :maxlength="18"></el-input>
                      <span></span>
                      <!--<el-tooltip class="item" effect="dark" placement="top" :enterable="false" :manual="true" :value="tooltip"-->
                      <!--tabindex="-1">-->
                      <!--<div slot="content">双击可修改合同名称</div>-->
                      <!--<el-input :class="{'showBg':disabledName === false}" v-model.trim="checkBillName" clearable-->
                      <!--@dblclick.native="(disabledName = false) ; (tooltip = false)" :disabled="disabledName"-->
                      <!--auto-complete="off" @mouseover.native=" disabledName === true && (tooltip = true)"-->
                      <!--@blur="tooltip = false;disabledName = true"-->
                      <!--@mouseenter.native=" disabledName === true && (tooltip = true)"-->
                      <!--@mouseleave.native="tooltip = false;disabledName = true" ></el-input>\-->
                      <!--</el-tooltip>-->
                      <!--<el-input v-model="checkBillName" auto-complete="off" :disabled="disabledName" @mouseover.native="billNameOver"></el-input><span></span>-->
                    </el-form-item>
                  </div>
                  <div class="top_no">
                    <el-form-item label="NO." prop="contractNo">
                      <el-input size="mini" :disabled="!editFn" v-model="sendContract.contractNo" :maxlength="20"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="pact_content">
                  <div class="pact_title">
                    <el-form-item label="委托方:" prop="nomineeCompany">
                      <el-input v-model="sendContract.nomineeCompany" auto-complete="off" :disabled="!editFn" clearable :maxlength="20"></el-input>
                    </el-form-item>
                    <span class="orgSpan">(以下简称甲方)</span>
                    <!--<span>委托方:</span>-->
                    <!--<p style="">{{formModel.orgName}}</p>-->
                    <!--<span>(以下简称甲方)</span>-->
                  </div>
                  <div class="pact_title">
                    <el-form-item label="承运方:" prop="">
                      <el-select v-model="sendContract.carrier" :disabled="!editFn">
                        <el-option v-for="item in carrierItem" :key="item.value" :label="item.value" :value="item.value" class="artselect-lll" style="width: 340px">
                        </el-option>
                      </el-select>
                      <!--<el-input v-model="formModel.dirverName" auto-complete="off" disabled clearable></el-input>-->
                    </el-form-item>
                    <span class="orgSpan">(以下简称乙方)</span>
                  </div>
                  <p class="p_salf">为确保本货物安全运输，根据互利原则，经双方共同协商，签订本运输合同：</p>
                  <div class="p_cont">
                    <p>一、乙方必须证件齐全、真实，车辆车况必须良好，且必须配备完整的防雨防盗设施，运输途中被水淋湿或被盗，乙方无条件地承担全部责任；</p>
                    <p>二、乙方承运途中各项费用开支全由自己承担，途中若因意外交通事故及其他原因造成货物损失、变质、短缺等责任由乙方承担，若甲方有带路人员，乙方要负担其伙食费；</p>
                    <p>三、车辆装货期间，甲乙双方必须当场清点核实数量，并负责将甲方有关票据带到个卸货点，运输途中不得把甲方货物转让给第三者承运，也不允许乙方途中私自增载非甲方的其他货物，否则甲方有权拒付车费；</p>
                    <p>四、乙方在承运途中，若遇交通事故，交通堵塞或车辆故障应及时向甲方反映真实情况，并在甲方允许的时间内排除车辆故障，否则甲方另行排除换装，乙方不得擅自做主叫车换货；</p>
                  </div>
                  <div class="p_input">
                    <span></span>
                    <el-form-item label="五、本车货物总为">
                      <el-input size="mini" disabled v-model="formModel.loadAmountall" class="editInput"></el-input>
                      件
                      <el-input size="mini" disabled v-model="formModel.loadWeightall"></el-input>
                      千克
                      <el-input size="mini" disabled v-model="formModel.loadVolumeall"></el-input>
                      方,全程车费
                      <el-input size="mini" disabled v-model="formModel.shipFeeAmount"></el-input>
                      元，甲乙双方不得任意减价或涨价，乙方不得收取其他劳务费，本车现付车费
                      <el-input size="mini" disabled v-model="formModel.nowpayCarriage"></el-input>
                      元，现付油卡
                      <el-input size="mini" disabled v-model="formModel.nowpayOilCard"></el-input>
                      元，到付车费
                      <el-input size="mini" disabled v-model="formModel.arrivepayCarriage"></el-input>
                      ，到付油卡
                      <el-input size="mini" disabled v-model="formModel.arrivepayOilCard"></el-input>
                      元，回付车费
                      <el-input size="mini" disabled v-model="formModel.backpayCarriage"></el-input>
                      元，回付油卡
                      <el-input size="mini" disabled v-model="formModel.backpayOilCard"></el-input>
                      元，保险费
                      <el-input size="mini" disabled v-model="formModel.carloadInsuranceFee"></el-input>
                      元 。乙方必须将货物安全完整及时运到本公司货运仓库，经双方验收无误后，甲方应一次性付清下次车费；
                    </el-form-item>
                  </div>
                  <div class="p_input">
                    <span></span>
                    <el-form-item label="六、本次发车时间为">
                      <el-input size="mini" disabled :value="formModel.actualSendtime"></el-input>
                      ，到达时间为
                      <el-input size="mini" disabled :value="formModel.receivingTime"></el-input>
                      。
                    </el-form-item>
                    <p class="p_salf">司机在行驶途中手机不得关机，以便甲方跟进了解运输途中情况；</p>
                  </div>
                  <div class="p_cont">
                    <p>七、本合同一式两份，双方各执一份，未尽事宜，双方另行协商，签字后生效。</p>
                    <el-form-item label="关于本车:" class="p_textarea">
                      <el-input type="textarea" size="mini" v-model="sendContract.aboutLocal" :disabled="!editFn"></el-input>
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
                    <!--  <el-form-item label="车架号:">
                       <el-input size="mini" disabled></el-input>
                     </el-form-item> -->
                    <el-form-item label="车架号:">
                      <el-input size="mini" disabled v-model="formModel.frameNum"></el-input>
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
                      <el-input size="mini" disabled v-model="formModel.engineNum"></el-input>
                    </el-form-item>
                    <span>乙方签章:</span>
                  </div>
                </div>
                <div class="pact_bottom"></div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" :code="thecode" @close="setupTableVisible = false" @success="setColumn"></TableSetup>
    </template>
    <div slot="footer" class="stepinfo-footer stepFrom" v-if="isFootSecond">
      <el-form inline :model="formModelTrack" :rules="ruleForm" ref="formModelTrack">
        <el-form-item label="类型" prop="loadStatus">
          <el-input :maxlength="10" v-model="formModelTrack.loadStatus" placeholder="类型" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="operatorTime">
          <el-date-picker v-model.trim="formModelTrack.operatorTime" type="datetime" placeholder="选择时间" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作信息" prop="operatorInfo">
          <el-input :maxlength="250" v-model="formModelTrack.operatorInfo" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item class="tracksavebtn">
          <el-button type="primary" @click="submitForm('formModelTrack')" size="mini">保 存</el-button>
          <transition name="el-zoom-in-center">
            <el-button v-if="isCancelEdit" type="warning" @click="resetForm()" size="mini">取 消</el-button>
          </transition>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" v-else-if="isFootFirst">
      <el-button @click="closeMe">关闭</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-else>
      <template v-if="!activeECheckBillName">
        <el-button @click="print" type="success" icon="el-icon-printer" v-if="activeName === 'third'" round>打印合同
        </el-button>
        <el-button @click="editCheckBillName" icon="el-icon-edit-outline" type="info" round v-if="activeName === 'third'">修改
        </el-button>
        <el-button @click="closeMe" round type="warning" icon="el-icon-close" v-if="activeName === 'third'">关闭
        </el-button>
      </template>
      <template v-else>
        <el-button @click="saveCheckBillName('formName')" round type="success" icon="el-icon-check">保存</el-button>
        <el-button @click="remCheckBillName" round type="" icon="el-icon-close">取消</el-button>
      </template>
    </div>
  </pop-right>
</template>
<script>
import { REGEX } from '@/utils/validate'
import popRight from '@/components/PopRight/index'
import selectType from '@/components/selectType/index'
import { getLoadDetail, deleteTrack, postAddTrack, putUpdateTrack, getSelectLoadList } from '@/api/operation/track'
import { postSelectLoadMainInfoList } from '@/api/operation/arteryDelivery'
import { getExportExcel } from '@/api/company/customerManage'
import { mapGetters } from 'vuex'
import SelectTree from '@/components/selectTree/index'
// import TableSetup from '@/components/tableSetup'
import { objectMerge2, parseTime, closest } from '@/utils/'
import { PrintContract } from '@/utils/lodopFuncs'
import { PrintInFullPage, SaveAsFile } from '@/utils/lodopFuncs'
import { getLookContract, getEditContract, updateLoadSort } from '@/api/operation/arteryDepart'
import Sortable from 'sortablejs'

export default {
  data() {
    return {
      thecode: 'ORDER_ARTER',
      visible2: false,
      formModelTrack: {
        loadStatus: '',
        operatorTime: +new Date(),
        operatorInfo: ''
      },
      activeECheckBillName: false,
      activeSCheckBillName: false,
      activeRCheckBillName: false,
      editFn: false,
      tooltip: false,
      disabledName: true,
      changeName: false,
      checkBillName: '货物运输合同',
      tablekey: 0,
      getBatchNo: '',
      popTitle: '查看详情',
      activeName: 'first',
      trackDetail: [],
      ruleForm: {},
      loading: false,
      isFootEdit: false,
      isFootFirst: true,
      isFootSecond: false,
      isFootThird: false,
      isFootOther: false,
      isCancelEdit: false,
      propsId: '',
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
      // 加载状态
      loading: true,
      setupTableVisible: false,
      AddCustomerVisible: false,
      // isModify: false,
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
        //  nowpayCarriage:'',//现付车费
        //  nowpayOilCard:'',//现付油卡
        //  backpayCarriage:'',//回付车费
        //  backpayOilCard:'',//回付油卡
        //  arrivepayCarriage:'',//到付车费
        //  arrivepayOilCard:'',//到付油卡
        //  carloadInsuranceFee:'',//整车保险费
        //  leaveHandlingFee:'',//发站装卸费
        //  leaveOtherFee:'',//发站其他费
        //  arriveHandlingFee:'',//到站装卸费
        //  arriveOtherFee:'',//到站其他费
        //   userName //配载人员
      },
      sendTypeId: {
        typeId: 54 // 等于54为干线到车确认
      },
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
        width: '150',
        fixed: true
      },
      {
        label: '运单号',
        prop: 'shipSn',
        width: '120',
        fixed: true
      }, {
        label: '子运单号',
        prop: 'childShipSn',
        width: '180',
        fixed: false
      }, {
        label: '到付(元)',
        prop: 'shipArrivepayFee',
        width: '100',
        fixed: false
      },
      {
        label: '操作费(元)',
        prop: 'handlingFee',
        width: '100',
        fixed: false
      }, {
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
        label: '运单件数',
        prop: 'cargoAmount',
        width: '100',
        fixed: false
      }, {
        label: '运单重量(kg)',
        prop: 'cargoWeight',
        width: '120',
        fixed: false
      }, {
        label: '运单体积(m³)',
        prop: 'cargoVolume',
        width: '120',
        fixed: false
      }, {
        label: '发站',
        prop: 'shipFromCityName',
        width: '120',
        fixed: false
      }, {
        label: '到站',
        prop: 'shipToCityName',
        width: '120',
        fixed: false
      }, {
        label: '发货人',
        prop: 'shipSenderName',
        width: '100',
        fixed: false
      }, {
        label: '发货人电话',
        prop: 'shipSenderMobile',
        width: '110',
        fixed: false
      }, {
        label: '收货人',
        prop: 'shipReceiverName',
        width: '120',
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
        label: '回扣',
        prop: 'brokerageFee',
        width: '120',
        fixed: false
      }, {
        label: '货号',
        prop: 'shipGoodsSn',
        width: '130',
        fixed: false
      }, {
        label: '运单备注',
        prop: 'shipRemarks',
        width: '120',
        fixed: false
      }
      ],
      rules: {
        contractName: [
          { required: true, message: '合同名称不能为空!', trigger: 'blur' }
        ],
        contractNo: [
          { required: true, message: '合同编号不能为空!', trigger: 'blur' },
          { message: '只能输入字母和数字', pattern: REGEX.ONLY_NUMBER_AND_LETTER }
        ],
        nomineeCompany: [
          { required: true, message: '委托方不能为空!', trigger: 'blur' }
        ]
      },
      sendContract: {
        loadId: '',
        nomineeCompany: '',
        contractName: '',
        contractNo: '',
        carrier: '',
        remark: ''
      },
      oldList: [],
      newList: [],
      sortable: null,
      carrierItem: [],
      hideFixTable: ''
    }
  },
  components: {
    popRight,
    SelectTree,
    selectType
    // TableSetup

  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
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
      type: [String, Number],
      dafault: 0
    }
  },
  watch: {

    info(newVal) {
      if (newVal) {
        this.propsId = this.info.id
        this.getDetail()
        this.fetchAllCustomer()
        this.fetchSelectLoadMainInfoList()
        this.fetchGetLookContract()
        this.getBatchNo = this.info.batchNo
        this.initSort()
      }
    },
    isModify(newVal) {},
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
    this.propsId = this.info.id ? this.info.id : ''
    if (this.popVisible) {
      this.getDetail()
      this.fetchAllCustomer()
      this.fetchSelectLoadMainInfoList()
      this.fetchGetLookContract()
    }
  },
  methods: {
    initSort() {
      this.$nextTick(() => {
        const obj = {
          selector: '.infos_tab .el-table__body-wrapper > table > tbody',
          sortable: this.sortable
        }
        this.setSort(obj)
        this.oldList = this.usersArr.map(v => v.repertoryId)
        this.newList = this.oldList.slice()
      })
    },
    setSort(obj) { // 右边列表行拖拽
      const el = document.querySelectorAll(obj.selector)[0]
      obj.sortable = Sortable.create(el, {
        animation: 150, // 动画参数
        ghostClass: 'sortables-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onStart: evt => {
          console.log('sdfsfw')
          this.hideFixTable = 'hideFixTable'
        },
        onEnd: evt => {
          const targetRow = this.usersArr.splice(evt.oldIndex, 1)[0]
          this.usersArr.splice(evt.newIndex, 0, targetRow)
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
          this.putUpdateLoadSort()
          this.hideFixTable = ''
        }
      })
    },
    putUpdateLoadSort() {
      const arr = this.usersArr.map(el => {
        if (el) {
          return el.id
        }
      })
      const shipSn = []
      this.usersArr.forEach(el => {
        shipSn.push(el.shipSn)
      })
      console.log('列表shipSn', shipSn)
      updateLoadSort(arr).then(data => {
        this.$message.success('排序保存成功！')
        const selected = []
        this.usersArr.forEach(el => {
          this.selected.forEach(e => {
            if (e.repertoryId === el.repertoryId) {
              selected.push(e)
            }
          })
        })
        this.selected = objectMerge2([], selected)
      })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    comInfo(item) {
      this.sendContract = {
        loadId: item.loadId,
        nomineeCompany: item.nomineeCompany,
        contractName: item.contractName,
        contractNo: item.contractNo,
        carrier: item.carrier,
        aboutLocal: item.aboutLocal
      }
    },
    fetchGetLookContract() {
      this.loading = true
      const loadId = this.propsId
      return getLookContract(loadId).then(data => {
        this.sendContract = data.data
        this.carrierItem = data.data.carrierList
        this.comInfo(this.sendContract)
        this.loading = false
      }).catch(err => {
        this._handlerCatchMsg(err)
      })
    },
    handleClick(tab, event) {
      this.isFootFirst = false
      this.isFootSecond = false
      this.isFootThird = false
      if (this.activeName === 'first') {
        this.isFootFirst = true
      } else if (this.activeName === 'second') {
        this.isFootSecond = true
      } else {
        this.isFootThird = true
        this.editFn = false
      }
    },
    editCheckBillName() {
      this.activeECheckBillName = true
      this.editFn = true
    },
    saveCheckBillName(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          getEditContract(this.sendContract).then(res => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$emit('success')
            this.activeECheckBillName = false
            this.editFn = false
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    remCheckBillName() {
      this.activeECheckBillName = false
      this.editFn = false
    },
    fetchSelectLoadMainInfoList() {
      this.loading = true
      const selectMainId = this.propsId
      this.searchQuery.vo.loadId = selectMainId
      return postSelectLoadMainInfoList(this.searchQuery).then(data => {
        this.formModel = data.list[0]
        this.sendContract.loadId = this.formModel.loadId
        this.loading = false
      })
    },
    fetchAllCustomer() {
      this.loading = true
      const _id = this.propsId
      return getSelectLoadList(_id).then(data => {
        data = data || []
        this.usersArr = data.map(el => {
          const start = (el.shipFromCityName || '').split(',')
          const end = (el.shipToCityName || '').split(',')
          el.shipFromCityName = start[2] || start[1] || start[0] || ''
          el.shipToCityName = end[2] || end[1] || end[0] || ''

          return el
        })

        this.loading = false
        this.toggleAllRows()
      })
    },
    getDetail() {
      const id = this.propsId
      return getLoadDetail(id).then(data => {
        this.trackDetail = Object.assign([], data)
      })
    },
    toggleAllRows() {
      this.$nextTick(() => {
        this.usersArr.forEach((e, index) => {
          this.$refs.multipleTable.toggleRowSelection(e, true)
        })
      })
    },
    initInfo() {
      this.loading = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formModelTrack.id) {
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
      this.resetForm()
      this.formModelTrack = Object.assign({}, item)
      this.isCancelEdit = true
    },
    editTrack() {
      console.log('修改')
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
      console.log('添加')
      this.formModelTrack.loadId = this.info.loadId
      this.formModelTrack.addStatus = 1
      this.formModelTrack.operatorTime = parseTime(this.formModelTrack.operatorTime, '{y}-{m}-{d} {h}:{i}:{s}')
      return postAddTrack(this.formModelTrack).then(data => {
        if (data) {
          this.$message({ type: 'success', message: '添加成功' })
          this.getDetail()
          this.resetForm()
        }
      }).catch((err) => {
        this.loading = false
        this._handlerCatchMsg(err)
      })
    },
    resetForm() {
      this.$refs['formModelTrack'].resetFields()
      this.formModelTrack = this.$options.data().formModelTrack
      this.isCancelEdit = false
    },
    fetchData() {
      this.fetchAllCustomer()
    },
    showImport() {
      // 显示导入窗口
    },
    doAction(type) {
      console.log('form', this.formModel, JSON.stringify(this.formModel))
      const obj = {}
      for (const item in this.info) {
        obj[item] = (this.info[item] === null || this.info[item] === undefined) ? '' : this.info[item]
      }
      let appendTopStr = '<style>body{width: 100%;}</style>'
      appendTopStr += '<body width="100%" style="font-family: {content_font_family}"><table width="100%" style="font-size: {content_word_size}px;font-family: {content_font_family}"><tr><td colspan="9" align="center" style="font-size: {heading_word_size}px;font-weight: 500;padding: 10px 0;">{heading_content}</td></tr><tr><td align="right">运行区间: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.orgName + '   →   ' + obj.arriveOrgName +
        '</td><td align="right">发车时间: </td><td colspan="2" style="padding-left: 20px;">' +
        (obj.actualSendtime || '无') +
        '</td><td align="right">发车批次: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.batchNo +
        '</td></tr><tr><td align="right">车牌号码: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.truckIdNumber +
        '</td><td align="right">司机名称: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.dirverName +
        '</td><td align="right">联系电话: </td><td colspan="2" style="padding-left: 20px;">' +
        obj.dirverMobile +
        '</td></tr></table></body>'
      const columnArr = objectMerge2([], this.tableColumn)
      // columnArr.unshift({
      //   label: '序号',
      //   prop: 'number',
      //   width: '40',
      //   fixed: true,
      //   slot: (scope) => {
      //     return scope.$index + 1
      //   }
      // })
      switch (type) {
        // 导出数据table_import
        // 导出
        case 'export':
          SaveAsFile({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: columnArr,
            name: '干线发车-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          })
          break
          // 打印
        case 'print':
          const shipSns = []
          this.usersArr.forEach(el => { shipSns.push(el.shipSn) })
          // console.log('this.usersArr', shipSns, this.usersArr)
          PrintInFullPage({
            data: this.selected.length ? this.selected : this.usersArr,
            columns: columnArr,
            appendTop: appendTopStr,
            type: 'load' // 配载单
          })
          break
      }
      // 清除选中状态，避免影响下个操作
      // this.$refs.multipleTable.clearSelection()
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
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      this.selected = selection
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
    print() { // 打印合同
      const str = '?'
      this.formModel.checkBillName = this.sendContract.contractName
      const formModel = Object.assign({}, this.formModel)
      this.$set(formModel, 'carrier', this.sendContract.carrier)
      this.$set(formModel, 'orgName', this.sendContract.nomineeCompany)
      formModel.contractNo = this.sendContract.contractNo
      formModel.remark = this.sendContract.aboutLocal
      // formModel.content_font_family = this.otherinfo.systemSetup.printFontSetting ? this.otherinfo.systemSetup.printFontSetting.contract : ''
      console.log('formModel', formModel)
      PrintContract(formModel)
    },
    setColumn(obj) { // 重绘表格列表
      this.tableColumn = obj
      this.tablekey = new Date().getTime() // 刷新表格视图
      this.$refs.multipleTable.doLayout()
      setTimeout(() => {
        this.initSort()
      }, 300)
    },
    setTableWidth(newWidth, oldWidth, column, event) {
      console.log('set table:', newWidth, oldWidth, column)
      // column.property
      // column.label

      /* this.columnWidthData = {
        prop: column.property,
        label: column.label,
        width: newWidth
      } */
      const find = this.tableColumn.filter(el => el.prop === column.property)
      if (find.length) {
        find[0].width = newWidth

        this.visible2 = true
        clearTimeout(this.tabletimer)
        this.tabletimer = setTimeout(() => {
          this.visible2 = false
        }, 10000)
      }
    },
    saveToTableSetup() {
      this.visible2 = false
      this.eventBus.$emit('tablesetup.change', this.thecode, this.tableColumn)
      this.initSort()
    },
    showSaveBox() {
      clearTimeout(this.tabletimer)
    },
    hideSaveBox() {
      clearTimeout(this.tabletimer)
      this.tabletimer = setTimeout(() => {
        this.visible2 = false
      }, 10000)
    }
  }
  // }
}

</script>
<style lang="scss">
._tabs-cont {
  // height: calc(100%);
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 80px;
  .tab_info.artDepart_table {
    /*padding-right: 10px;*/
    padding: 0;
  }
  .tab_info {

    padding: 0 10px;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .btns_box_send {
      border-top: 2px dotted #dcdfe6;
      padding: 10px 10px 0 0;
      margin-bottom: 10px;
      position: relative;

      .el-button.table_print {
        // position: absolute;
        // right: 220px;
      }
      .el-button.table_import {
        // position: absolute;
        // right: 110px;
      }
      .el-button {
        margin-right: 0;
        margin-left: 10px;
        float: right;
      }
      .table_setup {
        float: right;
        margin-right: 0;
      }
    }
    .sortable-ghost.hover-row {

      opacity: .8;
      color: #fff !important;
      background: #42b983 !important;
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
      .el-table td,
      .el-table th {
        padding: 5px 0;
      }
      .el-table .cell,
      .el-table th,
      .el-table td {
        overflow: visible;
        text-overflow: clip;
        color: #000;
      }
      .el-table td {
        overflow: hidden;
      }

      .el-table th {
        font-weight: bold;
      }
      .el-table th div,
      .el-table .cell {
        padding: 0;
        text-align: center;
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
        width: 53%;
        .el-form-item__content{
          width: 82%;
        }
        .el-input--mini{
          width: 100%;
        }
        // .el-form-item__content {
        //   width: 88%;
        // }
      }
    }
  }
  .hideFixTable{
      .el-table__body tr.hover-row > td{
        background:#fff;
      }
    }
  .infos_table {
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
          }
        }
        .el-form-item {
          margin-bottom: 0;
          margin-right: 0;
        }
      }
    }
  }
}

.tabs-content {
  .info_form,
  .infos_table {
    .el-input.is-disabled .el-input__inner {
      background-color: #fff;
    }
  }
}













/*批次详情*/

._storagesPop {
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 1200px;
  max-width: 1200px;
  .el-tabs {
    height: 100%;
    .el-tabs__content {
      height: 100%;
      .el-tab-pane {
        height: calc(100% - 90px);
      }
    }
  }
  .st_searchinfo {
    .el-input.is-disabled {
      .el-input__inner {
        color: #3e9ff1;
        background-color: transparent;

        /*text-align: center;*/
      }
    }
    .el-textarea.is-disabled {
      .el-textarea__inner {
        color: #3e9ff1;
        background-color: transparent;
      }
    }
  }

  .infos_table {
    .el-input.is-disabled {
      .el-input__inner {
        border-radius: 0;
        text-align: center;
      }
    }
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

.stepFrom {
  background-color: #f2f2f2;
  box-shadow: -1px -1px 10px #bbb;
  text-align: left;
  padding: 0 10px;
  .el-form-item__content {
    vertical-align: middle;
  }
}

.storagesInfoPop_content {
  height: 100%;
  .tab-card {
    .el-tabs__content {
      padding: 0 !important;
    }
  }
  .tab_descript {}
  .el-tabs__header {
    position: absolute;
    z-index: 34;
    top: 36px;
    left: 0;
    padding: 0 10px;
    background-color: #ffffff;
    width: 100%;
  }
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
      padding-left: 28px;
      height: 34px;
      .el-col {
        text-align: left;
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

  /*货物运输合同*/
  .pact {
    margin-top: 85px;
    padding-left: 20px;
    height: 100%;
    overflow: auto;
    .sComName {
      text-align: center;
      font-size: 18px;
      margin: 10px 0;
      font-weight: bold;
    }

    .pact_top {
      position: relative;
      height: 40px;
      margin-bottom: 10px;
      h3 {
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
      }



      .sTitle {
        /*flex: 1;*/
        text-align: center;
        .el-form-item {
          width: 100%;
          .el-form-item__content {
            width: 100%;
            cursor: pointer;
            /*showBg*/
            .el-tooltip.showBg {
              .el-input__inner {
                border-left-color: #c0c4cc;
                border-right-color: #c0c4cc;
                color: #fff;
                font-weight: 600;
                background: rgba(64, 158, 255, 0.6);
                text-align: center;
              }
            }
            .el-input__suffix {
              left: -20px;
              top: -20px;
            }
            .el-input--suffix .el-input__inner {
              padding-right: 0;
              text-align: center;
            }
            .el-input.is-disabled .el-input__inner {
              background-color: #fff;
              text-align: center;
            }
            /*/*showBg*/
            span {
              position: relative;
              top: -20px;
              left: 200px;
              font-size: 18px;
              color: #333333;
              font-weight: 600;
            }
            .el-input__inner {
              /*border-color: transparent;*/
              border-left-color: transparent;
              border-right-color: transparent;
              border-top-color: transparent;
              border-bottom: 1px solid #409EFF;
              font-size: 18px;
              color: #333333;
              font-weight: 600;
              cursor: pointer;
            }

            .el-input__inner:focus {
              border-bottom-color: #c0c4cc;
              text-align: center;
            }
            .el-input {
              width: 50%;
              text-align: center;
            }
          }
        }
        .el-form-item.contractNameClass.is-error {
          .el-form-item__error {
            left: 50%;
          }
        }
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
        top: 2px;
        cursor: pointer;
        .el-form-item {
          display: flex;
          .el-form-item__content {
            .el-input.is-disabled {
              .el-input__inner {
                background-color: #fff;
                border-left-color: transparent;
                border-right-color: transparent;
                border-top-color: transparent;
                border-bottom: 1px solid #409EFF;
                color: #666;
              }
            }
            .el-input {
              .el-input__inner {
                background-color: #fff;
                border-left-color: transparent;
                border-right-color: transparent;
                border-top-color: transparent;
                border-bottom: 1px solid #409EFF;
                color: #666;
                cursor: pointer;
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
      .pact_title:first-of-type {
        cursor: pointer;
        .el-input {
          width: 160%;
          .el-input__inner {
            background-color: #fff;
            border-color: #409EFF;
            color: #666;
          }
        }
      }
      .pact_title {
        color: #606266;
        font-size: 14px;
        margin: 10px 0 0 25px;
        .el-form-item:first-of-type {
          margin-bottom: 10px;
        }
        .el-form-item {
          display: inline-block;
          margin-bottom: 0;
          .el-form-item__content {
            float: left;
            .el-input {
              width: 160%;
              .el-input__inner {
                background-color: #fff;
                /*border-color: #409EFF;*/
                color: #666;
              }
            }
          }
        }
        span.orgSpan {
          position: relative;
          top: -15px;
          right: -15%;
        }
      }
      .p_cont,
      .p_input {
        color: #606266;
        font-size: 14px;
      }
      .p_cont {
        .p_textarea.el-form-item {
          display: inline-flex;
          padding-left: 25px;
          margin-bottom: 0;
          .el-textarea {
            width: 250%;
          }
          .el-textarea.is-disabled .el-textarea__inner {
            background-color: #fff;
            border-color: #409EFF;
            color: #666;
          }
          .el-textarea .el-textarea__inner {
            background-color: #fff;
            border-color: #409EFF;
            color: #666;
            cursor: pointer;
          }
        }
        p.p_about {
          padding-left: 25px;
          margin: 5px 0 5px 0;
        }
        p {
          margin-bottom: 2px;
        }
      }
      p.p_salf {
        color: #606266;
        font-size: 14px;
        padding-left: 25px;
        margin: 5px 0 10px 0;
      }
      .p_input {
        .el-form-item {
          margin-bottom: 0;
          .el-form-item__label {
            padding: 0;
            line-height: 28px
          }
          .el-form-item__content {
            line-height: 30px;
            .el-input.el-input--mini.is-disabled {
              width: 13%;
              .el-input__inner {
                background: #fff;
                border-top-color: transparent;
                border-left-color: transparent;
                border-right-color: transparent;
                text-align: center;
                color: #666;
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
            line-height: 30px;
            .el-input.el-input--mini.is-disabled {
              width: 59%;

              .el-input__inner {
                width: 200px;
                background-color: #fff;
                color: #666;
                border-top-color: transparent;
                border-left-color: transparent;
                border-right-color: transparent;
              }
            }
            .el-input.el-input--mini {
              width: 59%;
              input.el-input__inner {
                width: 200px;
              }
            }

            /*.el-input.el-input--mini.is-disabled{*/
            /*width: 20%*/
            /*}*/
          }
        }
        .el-form-item:last-of-type {
          margin-bottom: 20px;
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

    .pact_bottom {}
  }
}

.cont_rules .el-input--mini .el-input__inner {
  background: #409eff;
}

.p_table .el-input--mini .el-input__inner {
  width: 200px;
}

</style>
