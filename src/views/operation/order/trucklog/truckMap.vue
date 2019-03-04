<template>
  <div class="orderinfo-manager truck-page-log heightvhPoptree" v-loading="loading">
    <div class="info_card">
      <el-tabs tab-position="top" v-model="tabModel" @tab-click="handleTabModel">
        <el-tab-pane label="定位查询" name="1">
          <span slot="label"><i class="el-icon-location"></i> 定位查询</span>
          <el-tabs class="child_tabs" v-model="tabMap" @tab-click="handleTabMap">
            <el-tab-pane label="运单查询" name="1">
              <el-form ref="form" size="mini" :model="searchQuery" label-width="65px" v-if="showSearchCard && !isAllTable">
                <el-form-item label="运单查询">
                  <querySelect :size='btnsize' placeholder="请输入运单号" v-model="searchQuery.vo.shipSn" search="shipSn" type="order" @change="getShipSn" />
                </el-form-item>
                <el-form-item class="staff_searchinfo--btn">
                  <el-button type="warning" @click="onSubmit('location', 'order')" icon="el-icon-search" :loading="loadSearch">立即查询</el-button>
                </el-form-item>
              </el-form>
              <el-tabs class="secChild_tabs" v-if="realLocatOrderTrucks.length">
                <el-tab-pane label="查询结果">
                  <el-card class="childOrderTruckTree">
                    <div class="truckTree-group">
                      <div v-if="realLocatOrderTrucks.length === 0" class="emptyTips">暂无信息</div>
                      <div v-else v-for="(item, index) in realLocatOrderTrucks" class="truckTree-group-item" :class="actLocatOrderTruckItem[index]?'activeItem' : ''" @click="selectGroupOrderLocat(item, index)">
                        <h3>
                        <el-tag 
                        :type="index===0? 'danger':(index === 1?'warning': (index===2?'success':'primary') )" 
                        :size='btnsize'>{{index + 1}}</el-tag> 
                        {{item.truckIdNumber}} <i>[{{item.speed}} km/h]</i>
                        <i>{{item.truckLength ?(item.truckLength+'米') : ''}}</i> <i>{{item.truckTypeName || ''}}</i>
                      </h3>
                        <div class="truckTree-group-item-desc">
                          <h4>{{item.orgName}}</h4>
                          <div>
                            <i class="el-icon-mobile-phone"></i>
                            <span v-if="item.driverName || item.dirverName">
                            {{item.driverName||''}} {{item.dirverMobile|| ''}}
                         </span>
                            <span v-else>暂无关联司机</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="车辆查询" name="2">
              <el-form ref="form" size="mini" :model="searchQuery" label-width="65px" v-if="showSearchCard && !isAllTable">
                <el-form-item label="选择车辆">
                  <el-select v-model="searchQuery.vo.truckIdNumber" filterable placeholder="请输入车牌号" maxlength="8" clearable>
                    <el-option v-for="(item, index) in TruckList" :key="index" :label="item.truckIdNumber" :value="item.truckIdNumber">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="staff_searchinfo--btn">
                  <el-button type="warning" @click="onSubmit('location', 'truck')" icon="el-icon-search" :loading="loadSearch">立即查询</el-button>
                </el-form-item>
              </el-form>
              <el-card class="truckTree">
                <div class="truckTree-group">
                  <div v-for="(item, index) in TruckList" class="truckTree-group-item" :class="activeTruckItem[index]?'activeItem' : ''" @click="selectGroup(item, index, 'location','truck')">
                    <h3>
                        <el-tag 
                        :type="index===0? 'danger':(index === 1?'warning': (index===2?'success':'primary') )" 
                        :size='btnsize'>{{index + 1}}</el-tag> 
                        {{item.truckIdNumber}} 
                        <!-- <i>{{item.truckLength ?(item.truckLength+'米') : ''}}</i> <i>{{item.truckTypeName || ''}}</i> -->
                      </h3>
                    <div class="truckTree-group-item-desc">
                      <!-- <h4>{{item.orgName}}</h4> -->
                      <div>
                        <i class="el-icon-mobile-phone"></i>
                        <span v-if="item.driverName || item.dirverName">
                            {{item.dirverName||''}} {{item.dirverMobile|| ''}}
                         </span>
                        <span v-else>暂无关联司机</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="轨迹追踪" name="2">
          <span slot="label"><i class="el-icon-share"></i> 轨迹追踪</span>
          <el-tabs class="child_tabs" v-model="tabLine" @tab-click="handleTabLine">
            <el-tab-pane label="运单查询" name="1">
              <el-form ref="form" size="mini" :model="searchQuery" label-width="65px">
                <el-form-item label="运单查询">
                  <querySelect :size='btnsize' placeholder="请输入运单号" v-model="searchShipSn" search="shipSn" type="order" @change="getShipSn" />
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker v-model="searchQuery.vo.startTime" type="datetime" align="right" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsSimple">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker v-model="searchQuery.vo.endTime" type="datetime" align="right" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsSimple" placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="staff_searchinfo--btn">
                  <el-button type="success" @click="onSubmit('line', 'order')" icon="el-icon-search" :loading="loadSearch">立即查询</el-button>
                </el-form-item>
              </el-form>
              <el-tabs class="secChild_tabs" v-if="realTimeOrderTrucks.length">
                <el-tab-pane label="查询结果">
                  <el-card class="childTruckTree">
                    <div class="truckTree-group">
                      <div v-for="(item, index) in realTimeOrderTrucks" class="truckTree-group-item" :class="activeTruckItem[index]?'activeItem' : ''" @click="selectGroup(item, index, 'line', 'order')">
                        <h3>
                        <el-tag 
                        :type="index===0? 'danger':(index === 1?'warning': (index===2?'success':'primary') )" 
                        :size='btnsize'>{{index + 1}}</el-tag> 
                        {{item.truckIdNumber}} 
                        <i>{{item.truckLength ?(item.truckLength+'米') : ''}}</i> <i>{{item.truckTypeName || ''}}</i>
                      </h3>
                        <div class="truckTree-group-item-desc">
                          <h4>{{item.orgName}}</h4>
                          <div>
                            <i class="el-icon-mobile-phone"></i>
                            <span v-if="item.driverName || item.dirverName">
                            {{item.driverName||''}} {{item.dirverMobile|| ''}}
                         </span>
                            <span v-else>暂无关联司机</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="车辆查询" name="2">
              <el-form ref="form" size="mini" :model="searchQuery" label-width="65px">
                <el-form-item label="选择车辆">
                  <el-select v-model="searchQuery.vo.truckIdNumber" filterable placeholder="请输入车牌号" maxlength="8" clearable>
                    <el-option v-for="(item, index) in TruckList" :key="index" :label="item.truckIdNumber" :value="item.truckIdNumber">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker v-model="searchQuery.vo.startTime" type="datetime" align="right" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptionsSimple">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker v-model="searchQuery.vo.endTime" type="datetime" align="right" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsSimple" placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="staff_searchinfo--btn">
                  <el-button type="success" @click="onSubmit('line', 'truck')" icon="el-icon-search" :loading="loadSearch">立即查询</el-button>
                </el-form-item>
              </el-form>
              <el-tabs class="secChild_tabs" v-model="tabLineChild">
                <el-tab-pane label="全部车辆" name="1">
                  <el-card class="childTruckTree">
                    <div class="truckTree-group">
                      <div v-for="(item, index) in TruckList" class="truckTree-group-item" :class="activeTruckItem[index]?'activeItem' : ''" @click="selectGroup(item, index, 'line', 'truck')">
                        <h3>
                        <el-tag 
                        :type="index===0? 'danger':(index === 1?'warning': (index===2?'success':'primary') )" 
                        :size='btnsize'>{{index + 1}}</el-tag> 
                        {{item.truckIdNumber}} 
                        <i>{{item.truckLength ?(item.truckLength+'米') : ''}}</i> <i>{{item.truckTypeName || ''}}</i>
                      </h3>
                        <div class="truckTree-group-item-desc">
                          <h4>{{item.orgName}}</h4>
                          <div>
                            <i class="el-icon-mobile-phone"></i>
                            <span v-if="item.driverName || item.dirverName">
                            {{item.driverName||''}} {{item.dirverMobile|| ''}}
                         </span>
                            <span v-else>暂无关联司机</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-tab-pane>
                <el-tab-pane label="查询结果" name="2">
                  <el-card class="childTruckTree">
                    <div class="truckTree-group">
                      <div v-if="realTimeTrucks.length === 0" class="emptyTips">暂无信息</div>
                      <div v-for="(item, index) in realTimeTrucks" v-else class="truckTree-group-item" :class="activeTruckItem[index]?'activeItem' : ''" @click="showLine(item, index)">
                        <h3>
                        <el-tag 
                        :type="index===0? 'danger':(index === 1?'warning': (index===2?'success':'primary') )" 
                        :size='btnsize'>{{index + 1}}</el-tag> 
                        {{item.truckIdNumber}} 
                        <i>{{item.truckLength ?(item.truckLength+'米') : ''}}</i> <i>{{item.truckTypeName || ''}}</i>
                      </h3>
                        <div class="truckTree-group-item-desc">
                          <h4>{{item.orgName}}</h4>
                          <div>
                            <i class="el-icon-mobile-phone"></i>
                            <span v-if="item.driverName || item.dirverName">
                            {{item.driverName||''}} {{item.dirverMobile|| ''}}
                         </span>
                            <span v-else>暂无关联司机</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="监控中心" name="3">
          <span slot="label"><i class="el-icon-menu"></i> 监控中心</span>
          <el-card class="terminalTree">
            <div class="truckTree-group">
              <div v-if="terminalList.length === 0" class="emptyTips">暂无设备信息</div>
              <div v-for="(item, index) in terminalList" v-else class="truckTree-group-item" @click="selectTerminal(item, index)">
                <h3>
                  <el-tag 
                  :type="item.vehicleStatus===0?'info':(item.vehicleStatus===1?'success':(item.vehicleStatus===2?'warning':'info'))" 
                  :size='btnsize'>{{index + 1}}</el-tag> 
                  {{item.terminalNo}} 
                  <i>{{item.terminalType || ''}}</i> <i>{{item.terminalStatus===0?' 从未上线':(item.terminalStatus===1?' 行驶':(item.terminalStatus===2?' 停车':' 离线'))}}</i>
                </h3>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="truck-log-main">
      <div id="trucklogmap">
        <div class="popTimer" v-if="isTimer">
          <span v-if="isTimerOpen"><i class="el-icon-time"></i> {{timer}}秒后刷新轨迹</span>
          <el-button @click="timerCon" size="mini" type="text" :icon="isTimerOpen ? '' :'el-icon-time'">{{isTimerOpen ? '关闭' : '开启自动刷新'}}</el-button>
        </div>
      </div>
      <transition name="el-zoom-in-bottom">
        <div class="truck-log-table" v-if="activeTruckItem.length && tabModel==='2'">
          <div class="info-btns">
            <el-button :size="btnsize" type="primary" icon="el-icon-document" @click="exportData">导出EXCEL</el-button>
            <el-button class="btnsright" type="info" :size="btnsize" icon="el-icon-close" @click="activeTruckItem = []">关闭</el-button>
          </div>
          <div class="info_tab">
            <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border height="250px" tooltip-effect="dark" style="width:100%;" :row-class-name="classLineRed">
              <template v-for="column in tableColumn">
                <el-table-column :key="column.id" :fixed="column.fixed" :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
                </el-table-column>
                <el-table-column :key="column.id" :fixed="column.fixed" :label="column.label" v-else :width="column.width">
                  <template slot-scope="scope">
                    <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                    <span v-else v-html="column.slot(scope)"></span>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
          <div class="table-contr"></div>
          <div class="info_tab_footer">
            共计:{{ total }}
            <div class="show_pager">
              <Pager :total="total" @change="handlePageChange" :btnsize="'mini'" />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="truck-log-expand" v-if="tabModel!=='3'">
      <transition name="el-zoom-in-center">
        <div class="control-panel">
          <el-button :size="btnsize" type="text" icon="el-icon-caret-right" @click="doLine('start')" title="播放"></el-button>
          <el-button :size="btnsize" type="text" icon="el-icon-refresh" @click="doLine('resume')" title="恢复"></el-button>
          <el-button :size="btnsize" type="text" @click="doLine('pause')" class="btn-stop" title="暂停"></el-button>
          <el-button :size="btnsize" type="text" icon="el-icon-close" @click="doLine('destroy')" title="清空"></el-button>
          <span class="speed-sudu">速度:</span><i class="speed-slow">慢 </i>
          <el-slider v-model="speedSlider" class="slider-step" :min="1000" :max="1000000" :show-tooltip="false"></el-slider>
          <i class="speed-quick">快 </i>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="progressPercentage" status="success"></el-progress>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
// 请求接口
import orderManage from '@/api/operation/orderManage'
import { loadJs, objectMerge2, pickerOptionsSimple, parseTime } from '@/utils/'
import Pager from '@/components/Pagination/index'
import { trajectoryOrder, trajectoryTruck, realTimeLocationOrder, realTimeLocationByTruckIdNumber, getTruckIdNumbers, getTerminalLocation } from '@/api/operation/truckLog'
import { SaveAsFile } from '@/utils/lodopFuncs'
import querySelect from '@/components/querySelect/'
import { getAllTrunk } from '@/api/company/trunkManage'
import { getOrdertrailterminal } from '@/api/operation/load'
export default {
  components: {
    Pager,
    querySelect
  },
  props: {
    orderid: [String, Number],
    orderdata: [Object]
  },
  data() {
    return {
      actLocatOrderTruckItem: [],
      tabModel: '1',
      tabMap: '1',
      tabLine: '1',
      tabTerminal: '2',
      activeName: '1',
      tabLineChild: '1',
      realTimeLocateList: [], // 实时定位列表
      tableStyle: false,
      activeTruckItem: [], // 当前展示的车辆列表
      showDataList: [], // 点击的当前车辆的所有轨迹数据
      dataList: [], // 点击的当前车辆的所有轨迹数据的分页后当前页面展示的数据
      truckInfoList: [],
      truckCollapse: 1,
      searchShipSn: '', // 运单号
      isTimerOpen: true, // true-开始自动刷新并显示文字 false-关闭自动刷新并隐藏文字
      loadSearch: false,
      isAllTable: false, // true-表格全屏
      showSearchCard: true, // true-显示搜索框 false-隐藏搜索框
      isShowInlineOrderMap: true, // true-实时车辆货物地图 false-车辆轨迹地图
      speedSlider: 520130,
      popTreeVisible: false,
      gridData: [],
      tablekey: 0,
      loading: false,
      noinfo: true,
      dialogTableVisible: false,
      thepos: '',
      thename: '',
      theobj: {},
      btnsize: 'mini',
      pickerOptionsSimple: {
        shortcuts: pickerOptionsSimple
      },
      groupList: [],
      tableColumn: [{
          label: '序号',
          prop: 'number',
          width: '100',
          fixed: true
        }, {
          label: '车辆定位时间',
          prop: 'time',
          width: '160'
        }, {
          label: '速度 km/h',
          prop: 'speed',
          width: '90'
        },
        //  {
        //   label: '方向',
        //   prop: 'direction',
        //   width: '80'
        // },
        {
          label: '部件状态',
          prop: 'status',
          width: '90',
          slot: (scope) => {
            return ' - '
          }
        }, {
          label: '里程 km',
          prop: 'li',
          width: '80',
          slot: (scope) => {
            return ' - '
          }
        }, {
          label: '海拔 m',
          prop: 'altitude',
          width: '80'
        },
        {
          label: '车牌号码',
          prop: 'truckIdNumber',
          width: '100'
        },
        {
          label: '司机名称',
          prop: 'dirverName'
        }
      ],
      total: 0,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          truckIdNumber: '', // 陕YH0009
          startTime: parseTime(new Date() - 60 * 24 * 60 * 7 * 1000),
          endTime: parseTime(new Date()),
          shipId: '',
          shipSn: ''
        }
      },
      timer: 60,
      isTimer: true, // 是否需要添加自动刷新功能
      pathSimplifierIns: {},
      map: {},
      allPathData: [],
      imgurl: require('../../../../assets/truck_log/car.png'),
      closeurl: require('../../../../assets/login_images/bb3.png'),
      initedPath: false,
      orgPageDataList: [],
      orgDataList: [],
      allList: [],
      markers: [], // 所有的实时车辆标注
      pathNavigs: [],
      comDis: false,
      totalPageSize: 0,
      progressPercentage: 0,
      curCursor: {}, // 移动时当前位置下标
      TruckList: [], // 公司车辆列表
      realTimeTrucks: [], // 实时车辆信息
      org_order_realTimeTrucks: [], // 存储切换视图前的车辆信息
      org_truck_realTimeTrucks: [], // 存储切换视图前的车辆信息
      lineColor: ['#3366cc', '#329262', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#dc3912', '#5574a6', '#3b3eac', '#409eff', '#008000', '#40E0D0', '#22aa99', '#9400D3', '#FFC0CB', '#0000FF', '#FFA500', '#B22222', '#808080', '#00FFFF', '#8A2BE2', '#5F9EA0', '#7FFF00', '#DAA520'],
      terminalList: [], // 追货宝设备列表
      curTerminalList: [], // 添加到定位列表的追货宝
      realTimeOrderTrucks: [], // 轨迹追踪-运单查询-结果列表
      m: false,
      realLocatOrderTrucks: [], // 运单定位的车辆返回列表
    }
  },
  watch: {
    orderid(newVal) {
      if (newVal !== '') {
        // this.init(111)
      }
    },
    orderdata: {
      handler() {
        this.init(333)
      },
      deep: true
    },
    speedSlider(newVal) {
      if (newVal) {
        if (this.pathNavigs.length) { // 更新轨迹播放速度
          this.pathNavigs.forEach((el, index) => {
            if (el) {
              el.setSpeed(newVal)
            }
          })
        }
      }
    },
    '$route': {
      handler(to, from) {
        if (this.isTimer) { // 添加自动刷新功能时
          if (window.AMapUI) { // 开启自动刷新时
            if (to.fullPath && to.fullPath.indexOf('/operation/order/trucklog') !== -1) {} else {
              this.isTimerOpen = false
              clearInterval(this.timerOption)
            }
          }
        }
        if (to.query) {
          if (to.query.searchQuery && this.map && window.AMap && window.AMapUI) {
            this.$nextTick(() => {
              this.openRouteLineTruck()
            })
          }
        }
        console.log('to', to)
        console.log('from', from)
      },
      immediate: true
    },
    curCursor: {
      handler(cval, oval) {
        if (cval) {
          if (this.pathNavigs[0]) { // 单辆车的时候 才显示进度条
            let idx = cval.idx
            let total = this.allPathData[0].path.length
            let num = Math.floor(idx / total * 100)
            let page = Math.floor(idx / this.searchQuery.pageSize)
            // 进度条 comDis为true时表示完成路径
            this.progressPercentage = this.comDis ? 100 : (num >= 0 ? num : 0)
            // this.pathNavigs[0] 不存在时（销毁） 表格需要从第一页显示
            this.searchQuery.currentPage = this.pathNavigs[0] ? page : 0
            this.dataList = this.orgPageDataList[this.searchQuery.currentPage]

          } else {
            this.progressPercentage = 0
          }

        } else {
          this.progressPercentage = 0
        }
      },
      deep: true
    },
    activeTruckItem: {
      handler(cval, oval) {
        if (cval && cval.length) {
          this.initLine()
        }
      },
      immediate: true
    }
  },
  computed: {
    routeSearch() {
      let query = {
        searchQuery: {},
        flag: ''
      }
      if (this.$route.query && this.$route.query.searchQuery) {
        let searchQuery = JSON.parse(this.$route.query.searchQuery)
        query.searchQuery = objectMerge2({}, searchQuery)
        query.flag = this.$route.query.flag
        query.type = this.$route.query.type
      }
      return query
    }
  },
  mounted() {
    console.log('测试车辆：陕YH0009')
    const _this = this
    window.loadedGaodeMap = function() {
      loadJs('//webapi.amap.com/ui/1.0/main.js').then(() => {
        _this.initMap()
        _this.hasLoadedMap = true
        _this.getPathSimplifierIns()
        // this.onSubmit()
        console.log('window.AMap', window.AMap)
        console.log('window.AMapUI', window.AMapUI)
        console.log('this.map', this.map)
        _this.openRouteLineTruck()
      })
    }
    this.init(2222)
    this.fetchTruck() // 获取公司车辆信息
    this.fetchTerminal() // 获取设备列表

  },
  // 关闭时清空地图数据
  destoryed() {
    this.exit()
    clearInterval(this.timerOption)
  },
  activated() {


  },
  methods: {

    selectGroupOrderLocat(row, index) {
      let map = this.map
      let lnglat = [Number(row.longitude), Number(row.latitude)]
      this.actLocatOrderTruckItem = []
      this.actLocatOrderTruckItem[index] = true
      this.closeInfoWindow() // 关闭之前的窗口
      this.infoWindow(row)
      window.infoWindow.open(map, lnglat)
      console.log('row', row, index, row.truckIdNumber, lnglat)
      map.setFitView()
    },
    handleTabModel(obj) {
      console.log('当前选中的tab::', obj)
    },
    handleTabMap(obj) {
      console.log('当前选中的二级tab::Map', obj)
      this.fetchTruck()
    },
    handleTabLine(obj) {
      console.log('当前选中的二级tab::Line', obj)
    },
    terminalToLine(obj) {
      return () => {
        alert()
      }
    },
    openCheckLineTruck(obj) {
      this.tabModel = '2'
      this.tabLine = '2'
      this.$set(this.searchQuery.vo, 'truckIdNumber', obj.truckIdNumber)
      this.onSubmit('line', 'truck')
    },
    openRouteLineTruck() { // 路由跳转后需要查询轨迹或定位
      console.log('init route query ', this.routeSearch)
      if (this.routeSearch && this.routeSearch.searchQuery.truckIdNumber) {
        // 如果路由中有查询参数表示 干线短驳和送货列表需要查询
        if (this.routeSearch.type === 'truck') { // 车辆查询
          switch (this.routeSearch.flag) {
            case 'line': // 查轨迹
              this.tabModel = '2'
              this.tabLine = '2'
              this.$set(this.searchQuery.vo, 'truckIdNumber', this.routeSearch.searchQuery.truckIdNumber)
              this.$set(this.searchQuery.vo, 'startTime', this.routeSearch.searchQuery.startTime || '')
              this.onSubmit('line', 'truck')
              break
            case 'location': // 查定位
              this.tabModel = '1'
              this.tabMap = '2'
              this.$set(this.searchQuery.vo, 'truckIdNumber', this.routeSearch.searchQuery.truckIdNumber)
              this.onSubmit('location', 'truck')
              break
          }
        } else { // 运单查询
          switch (this.routeSearch.flag) {
            case 'line': // 查轨迹
              this.tabModel = '2'
              this.tabLine = '1'
              this.$set(this.searchQuery.vo, 'shipSn', this.routeSearch.searchQuery.shipSn)
              this.$set(this.searchQuery.vo, 'startTime', this.routeSearch.searchQuery.startTime || '')
              this.onSubmit('line', 'truck')
              break
            case 'location': // 查定位
              this.tabModel = '1'
              this.tabMap = '1'
              this.$set(this.searchQuery.vo, 'shipSn', this.routeSearch.searchQuery.shipSn)
              this.onSubmit('location', 'truck')
              break
          }
        }
      }
    },
    closeInfoWindow() { // 清除信息窗体
      const AMap = window.AMap
      const AMapUI = window.AMapUI
      const map = this.map
      map.clearInfoWindow()
    },
    createInfoWindow(obj) {
      const AMap = window.AMap
      const AMapUI = window.AMapUI
      const map = this.map

      this.closeInfoWindow()
      let content = []

      window.globalMapFn = () => {
        console.log(obj)
        this.$message.warning('暂无该功能~')

      }
      window.globalLineTruck = () => {
        this.openCheckLineTruck(obj) // 查车辆轨迹
      }

      window.closeInfoWindow = () => {
        map.clearInfoWindow()
      }

      if (this.tabModel === '1') {
        for (let item in obj) {
          obj[item] = obj[item] || '-无数据-'
        }
        content.push('<div class="mapwin">')
        content.push('<div class="winhead"><i>' + obj.truckIdNumber + '</i><a href="javascript:;" onclick="closeInfoWindow()"><img src="' + this.closeurl + '" /></a></div>')
        content.push('<div class="winmain">')
        content.push('<p>速度: <span>' + obj.speed + 'km/h</span></p>')
        content.push('<p>关联司机: <span>' + obj.dirverName + 'km</span></p>')
        content.push('<p>司机号码: <span>' + obj.dirverMobile + '</span></p>')
        content.push('<p>地址: <span>' + obj.address + '</span></p>')
        // content.push('<p>定位时间: <span>' + obj.locationTime + '</span></p>')
        content.push('</div>')
        content.push('<div class="winfoot">')
        // content.push('<a href="javascript:;" onclick="globalMapFn()"><i class="el-icon-date"></i> 跟踪</a>')
        content.push('<a href="javascript:;" onclick="globalLineTruck()"><i class="el-icon-share"></i> 轨迹</a>')
        // content.push('<a href="javascript:;" onclick="globalMapFn()"><i class="el-icon-setting"></i> 设置</a>')
        content.push('</div>')
        content.push('</div>')
      } else {

        let posStyle = obj.posStyle === '0' ? '不定位' : (obj.posStyle === '1' ? 'GPS' : (obj.posStyle === '2' ? 'WIFI' : (obj.posStyle === '3' ? '多基站' : '单基站')))
        let vehicleStatus = obj.vehicleStatus === '0' ? '从未上线' : (obj.vehicleStatus === '1' ? '行驶' : (obj.vehicleStatus === '2' ? '停车' : '离线'))

        for (let item in obj) {
          obj[item] = obj[item] || '-无数据-'
        }

        content.push('<div class="mapwin">')
        content.push('<div class="winhead"><i>' + obj.terminalNo + '</i> [ ' + obj.terminalType + ' / <span>电量: ' + obj.lastPower + '%</span> ]<a href="javascript:;" onclick="closeInfoWindow()"><img src="' + this.closeurl + '" /></a></div>')
        content.push('<div class="winmain">')
        content.push('<p>速度: <span>' + obj.speed + 'km/h</span></p>')
        content.push('<p>里程: <span>' + obj.mlileage + 'km</span></p>')
        content.push('<p>信号时间: <span>' + obj.gpsTime + '</span></p>')
        content.push('<p>定位时间: <span>' + obj.gpsTime + '</span></p>')
        content.push('<p>定位: <span>' + posStyle + '</span></p>')
        content.push('<p>车辆状态: <span>' + obj.formatTime + '</span></p>')
        content.push('<p>报警: <span>' + obj.alarmInfo + '</span></p>')
        content.push('<p>地址: <span>' + obj.address + '</span></p>')
        content.push('</div>')
        // content.push('<div class="winfoot">')
        // content.push('<a href="javascript:;" onclick="globalMapFn()"><i class="el-icon-date"></i> 跟踪</a>')
        // content.push('<a href="javascript:;" onclick="globalMapFn()"><i class="el-icon-share"></i> 轨迹</a>')
        // content.push('<a href="javascript:;" onclick="globalMapFn()"><i class="el-icon-setting"></i> 设置</a>')
        content.push('</div>')
        content.push('</div>')
      }


      return content.join('')
    },
    infoWindow(obj) {
      const AMap = window.AMap
      const AMapUI = window.AMapUI
      const map = this.map
      const _this = this
      window.infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: _this.createInfoWindow(obj),
        offset: new AMap.Pixel(5, -45),
        showShadow: true
      })
    },
    tomapTerminal() { // 追货宝-转高德坐标
      const AMap = window.AMap
      const AMapUI = window.AMapUI
      const map = this.map
      const _this = this

      console.log('markers', this.markers)
      console.log('curTerminalList', this.curTerminalList)


      map.remove(this.markers)
      let lnglat = []
      let marker
      this.markers = []

      // 坐标转换
      if (this.curTerminalList.length) {
        this.curTerminalList.forEach((e, index) => {
          if (e.lon !== null && e.lat !== null) {
            lnglat[index] = [e.lon, e.lat]
            marker = new AMap.Marker({
              map: map,
              position: lnglat[index]
            })

            // 创建信息窗体
            _this.infoWindow(e)
            window.infoWindow.open(map, marker.getPosition())

            //鼠标点击marker弹出自定义的信息窗体
            marker.on('click', function(em) {
              _this.infoWindow(e)
              window.infoWindow.open(map, em.lnglat)
            })

            marker.setLabel({
              offset: new AMap.Pixel(20, 20),
              icon: _this.imgurl
            })
            this.markers.push(marker)
            map.setFitView()
          }
        })
        console.log('实时设备定位：：', this.curTerminalList, lnglat, this.map)
      }
    },
    selectTerminal(item, index) { // 左边列表选择当前的追货宝
      if (window.pathSimplifierIns) {
        window.pathSimplifierIns.setData([]) // 给巡航器设置数据为空
      }
      // 判断mark定位列表中是否有相同的
      let flag = this.curTerminalList.filter(el => el.terminalNo === item.terminalNo).length
      console.log('flag', flag)
      if (!flag || flag < 1) {

        if (process.env.NODE_ENV !== 'production') {
          if (this.otherinfo.companyId !== 160) {
            item.vehicleId = '7F174725C0EFB5334DF029FF4DF6BCA1'
          }
        }

        this.fetchTerminalLocation(item.vehicleId)
      }
      this.curTerminal = item
      console.log('选中的设备', item, item.terminalNo)

    },
    fetchTerminalLocation(terminalNo) { // 获取当前追货宝的定位信息
      getTerminalLocation(terminalNo).then(data => {
          if (data && data.terminalNo) {
            console.log('dadta', data)
            this.$message.success('设备查询成功~')
            this.curTerminalList.push(data)
            // if (process.env.NODE_ENV !== 'production') {
            //   this.curTerminalList.push({
            //     lon: '113.001817',
            //     lat: '23.23185',
            //     lastPower: '20',
            //     terminalNo: '0863014532659660'
            //   })

            //   if (this.m) {
            //     this.curTerminalList.push({
            //       lon: '112.001817',
            //       lat: '23.23185',
            //       lastPower: '10',
            //       terminalNo: '0863014532659650'
            //     })
            //   }
            //   this.m = true
            // }


            this.tomapTerminal()
          } else {
            this.$message.warning('暂无数据, 请稍后重试~')
          }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    fetchTerminal(terminalNo = '') { // 获取本公司追货宝列表
      let companyId = this.otherinfo.companyId
      if (process.env.NODE_ENV !== 'production') {
        companyId = (companyId === 160) ? 160 : 1
      }
      let query = {
        currentPage: 1,
        pageSize: 10000,
        vo: {
          companyId: companyId, // 公司id
          terminalNo: terminalNo // 设备号 模糊搜索
        }
      }
      getOrdertrailterminal(query).then(data => {
          if (data) {
            console.log('Terminals', data)
            this.terminalList = data.list
          }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },

    getShipSn(item) {
      console.log('运单选择item', item)
      if (this.tabModel === '1') {
        this.searchQuery.vo.shipSn = item.shipSn
        this.searchShipSn = item.shipSn
      } else {
        this.searchQuery.vo.shipId = item.shipSn
        this.searchShipSn = item.shipSn
      }
    },
    classLineRed(row) { // 行样式
      if (this.allPathData.length) {
        if (row.row.number === this.curCursor.idx) {
          return 'rowSelect'
        } else {
          return ''
        }
      }
    },
    timerCon() { // 用户控制是否需要自动刷新
      if (this.isTimerOpen) { // 关闭自动刷新
        this.isTimerOpen = false
        clearInterval(this.timerOption)
      } else { // 开启自动刷新
        this.initTimer()
      }
    },
    initTimer() { // 默认添加自动刷新功能
      clearInterval(this.timerOption)
      if (this.isTimer) {
        const _this = this
        _this.isTimerOpen = true
        _this.timer = _this.$options.data().timer
        this.timerOption = setInterval(() => {
          _this.timer = _this.timer - 1
          if (_this.timer <= 0) {
            _this.onSubmit()
            _this.timer = _this.$options.data().timer
          }
        }, 1000)
      }
    },
    handleSearchView() { // 修改视图
      if (this.isShowInlineOrderMap) {
        this.org_order_realTimeTrucks = objectMerge2([], this.realTimeTrucks)
        this.realTimeTrucks = objectMerge2([], this.org_truck_realTimeTrucks)
      } else {
        this.org_truck_realTimeTrucks = objectMerge2([], this.realTimeTrucks)
        this.realTimeTrucks = objectMerge2([], this.org_order_realTimeTrucks)
        this.fetchTruck()
      }
      this.isShowInlineOrderMap = !this.isShowInlineOrderMap

      this.showSearchCard = false
      setTimeout(() => {
        this.showSearchCard = true
      }, 300)
    },
    handlePageChange(obj) {
      console.log('handlePageChange', obj)
      // 判断pagesize是否修改
      // flag === true如果修改了就要重新计算分页数据
      // flag === false否则直接表格展示相应页面的数据
      let flag = (obj.pageSize !== this.searchQuery.pageSize)

      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      if (flag) {
        this.setPage() // 重新计算分页数据
      } else {
        this.tablekey = new Date().getTime()
        this.dataList = this.orgPageDataList[this.searchQuery.currentPage - 1]
      }
    },
    handleTruck() { // 修改车辆信息
      this.popTreeVisible = !this.popTreeVisible
      this.fetchTruck()
    },
    fetchTruck() { // 获取车辆列表
      getTruckIdNumbers().then(data => {
          if (data) {
            this.TruckList = data
          }
        })
        .catch(err => {
          this._handlerCatchMsg(err)
        })
    },
    showPopTrucktree() { // 显示车辆树
      this.showDataList = false
      this.popTreeVisible = false
      setTimeout(() => {
        this.popTreeVisible = true
      }, 300)
    },
    setPage() { // 设置表格数据分页
      // 设置表格分页
      // 设置总数量
      this.total = this.showDataList.length || 0
      // 设置总页数
      this.totalPageSize = Math.floor(this.total / this.searchQuery.pageSize) + 1
      for (let i = 0; i < this.totalPageSize; i++) {
        this.orgPageDataList[i] = [] // 初始化分页数据(前端做简单分页)
      }
      this.showDataList.forEach((el, index) => {
        let _index = Math.floor(index / this.searchQuery.pageSize)
        this.orgPageDataList[_index].push(el) // 填充分页数据数组
      })
      this.dataList = this.orgPageDataList[this.searchQuery.currentPage - 1]
    },
    validateForm(type, childtype, query) { // 表单验证
      let flag = true

      switch (type) {
        case 'location': // 定位
          if (childtype === 'order') {
            if (!this.searchQuery.vo.shipSn) {
              this.$message.warning('请选择运单号~')
              flag = false
            }
          } else {
            if (!this.searchQuery.vo.truckIdNumber) {
              this.$message.warning('请选择车牌号~')
              flag = false
            }
          }
          break
        case 'line': // 轨迹
          if (!this.searchQuery.vo.startTime || !this.searchQuery.vo.endTime) {
            this.$message.warning('时间范围不能为空~')
            flag = false
          }
          if (childtype === 'order') {
            if (!this.searchQuery.vo.shipId) {
              this.$message.warning('运单号不能为空~')
              flag = false
            }
          } else {
            if (!this.searchQuery.vo.truckIdNumber) {
              this.$message.warning('车牌号不能为空~')
              flag = false
            }
          }
          break
        case 'terminal':
          break
      }

      return flag
    },
    showLine(row, index) {
      this.showDataList = []
      this.searchQuery.currentPage = 1
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      console.log('选中的车：：', index, row.truckIdNumber, row.longitude, row.latitude, row)
      if (this.activeTruckItem[index]) {
        this.activeTruckItem = []
      } else {
        this.activeTruckItem = []
        this.$set(this.searchQuery.vo, 'truckIdNumber', row.truckIdNumber)
        this.showDataList = objectMerge2([], row.trajectoryList)
        this.activeTruckItem[index] = true // 车辆列表高亮
        this.setPage() // 设置表格数据分页
      }
      this.initLine() // 设置巡航器
    },
    selectGroup(row, index, type, childtype) {
      console.log('选中的项:', row, index, type, childtype)
      // row 当前选中的对象
      // index 当前对象的索引
      // type 一级类型 location-定位 line-轨迹 terminal-监控
      // childtype 二级类型 order-运单 truck-车辆
      // 
      this.searchQuery.currentPage = 1
      this.searchQuery.pageSize = this.$options.data().searchQuery.pageSize
      switch (type) {
        case 'location': // 查定位
          if (childtype === 'truck') {
            this.$set(this.searchQuery.vo, 'truckIdNumber', row.truckIdNumber)
            this.onSubmit(type, childtype, { truckIdNumber: row.truckIdNumber }, 'select')
          } else {
            this.onSubmit(type, childtype, { shipSn: row.shipSn }, 'select')
          }
          break
        case 'line': //  查轨迹
          if (childtype === 'truck') {
            this.searchQuery.vo.truckIdNumber = row.truckIdNumber
            this.onSubmit(type, childtype)
          } else {
            this.showLine(row, index)
          }
          break
        case 'terminal': // 查监控设备号

          break
      }
    },
    onSubmit(type, childtype, query, selecttype) {
      // type 一级类型 location-定位 line-轨迹 terminal-监控
      // childtype 二级类型 order-运单 truck-车辆
      // query 请求参数
      // selecttype 直接选中还是点击查询

      let _this = this
      _this.loadSearch = true



      if (!this.validateForm(type, childtype)) { // 判断输入
        _this.loadSearch = false
        return false
      }
      console.log('72384238478')

      // 查询定位及轨迹
      // 0、清空定时刷新， 清空巡航器
      // 1、获取查询数据，this.isShowInlineOrderMap判断是查询运单true[2.1]还是车辆false[2.2]
      // 2.1、根据运单ID:shipId来查询定位和轨迹
      // 2.1.1运单ID查询定位，不需要传时间
      // 2.1.2运单ID查询轨迹
      // 2.2、根据车牌号:truckIdNumber来查询车辆定位和轨迹
      // 2.2.1车牌号truckIdNumber查询定位，不需要传时间
      // 2.2.2车牌号truckIdNumber查询轨迹
      // 3、清空当前map上面的标注及轨迹
      // 4、格式化获取到的数据，否则提示“暂无车辆轨迹数据！”
      // 5、设置巡航器， 绘制轨迹及定位
      // 6、设置刷新定时器

      _this.progressPercentage = 0
      _this.pathNavigs = []
      _this.activeTruckItem = []
      _this.realTimeTrucks = []
      clearInterval(_this.timerOption) // 清除定时刷新
      if (window.pathSimplifierIns) {
        window.pathSimplifierIns.setData([]) // 给巡航器设置数据为空
      }
      if (this.map) {
        this.closeInfoWindow() // 清除窗体
      }

      // 方法：格式化车辆轨迹数据
      let fn = (lineData) => {
        if (!lineData) { return }
        _this.orgDataList = []
        _this.dataList = []
        // _this.realTimeTrucks = []
        // _this.realTimeOrderTrucks = []

        let resList = []

        if (lineData && lineData.length) {
          _this.showPopTrucktree() // 显示车辆列表
          // _this.realTimeTrucks = objectMerge2([], lineData) // 设置当前车辆列表数据
          resList = objectMerge2([], lineData) // 设置当前车辆列表数据
          lineData.forEach((em, emindex) => {
            let emData = []
            em.trajectoryList.forEach((el, index) => {
              el.dirverMobile = em.dirverMobile
              el.dirverName = em.dirverName
              el.truckIdNumber = em.truckIdNumber
              el.number = index + 1
              _this.orgDataList[index] = el
              emData[index] = el
            })
            _this.allList[emindex] = emData
            resList[emindex].trajectoryList = objectMerge2([], emData)
            resList[emindex]._index = emindex
            // _this.realTimeTrucks[emindex].trajectoryList = objectMerge2([], emData)
            // _this.realTimeTrucks[emindex]._index = emindex
            console.log('allList', _this.allList)
            console.log('realTimeTrucks', resList)
          })
        }

        if (childtype === 'order') {
          _this.realTimeOrderTrucks = resList
        } else {
          _this.realTimeTrucks = resList
        }
      }


      // fetch 判断请求接口 运单&车牌号
      let fetch = childtype === 'order' ? trajectoryOrder : trajectoryTruck
      let params = selecttype ? query : objectMerge2({}, _this.searchQuery.vo)

      if (process.env.NODE_ENV !== 'production') {
        if (!selecttype) {
          // params.truckIdNumber = '粤L18782'
          // params.shipId = '1064817474404352000'
          // params.startTime = "2019-02-05 10:38:56"
        }
      }


      // let params = objectMerge2({}, _this.searchQuery.vo)
      // 删除不需要的参数
      if (type === 'location') {
        delete params.startTime
        delete params.endTime
        delete params.shipId
      }
      if (type === 'line') {
        delete params.shipSn
      }
      if (childtype === 'order') {
        delete params.truckIdNumber
      } else {
        delete params.shipId
      }
      console.log('params', params)
      if (type === 'location') { // 查定位
        if (params) {
          _this.getRealTimeLocate(childtype, params)
          _this.loadSearch = false
        } else {
          _this.loadSearch = false
        }
      } else if (type === 'line') { // 查轨迹及定位  默认查轨迹及定位
        if (params) {
          fetch(params).then(data => {
              // 定时刷新
              _this.initTimer()
              this.tabLineChild = '2'
              if (data && data.length > 0) {
                // 格式化数据
                fn(data)
                // 初始化轨迹
                _this.initLine()
              } else {
                this.$message.warning('暂无轨迹跟踪数据！')
              }
              _this.loadSearch = false
            })
            .catch(err => {
              _this.loadSearch = false
              this._handlerCatchMsg(err)
            })
        } else {
          this.$message.warning('请输入查询参数~')
          _this.loadSearch = false
        }
      }
    },
    getRealTimeLocate(type, query) { // 实时定位查询
      // type类型 order-运单 truck-车辆 
      // query传参
      // 

      // 判断是不是 查询运单界面
      let isOrder = type === 'order'
      // 判断调接口  运单&车牌号
      let fetch = isOrder ? realTimeLocationOrder : realTimeLocationByTruckIdNumber
      // 判断参数 用户输入的 运单号&车牌号
      // let flag = query
      // let flag = isOrder ? this.searchShipSn : this.searchQuery.vo.truckIdNumber
      if (query) {
        // let params = isOrder ? { shipSn: flag } : { truckIdNumber: flag }
        fetch(query).then(data => {
            if (data) {
              if (isOrder && data.length > 0) {
                this.realTimeLocateList = data
                this.realLocatOrderTrucks = data
              } else if (data.truckIdNumber) {
                this.realTimeLocateList = []
                this.realTimeLocateList.push(data)
              }
              this.loadSearch = false
              // 转高德坐标
              this.tomap()
              this.$message.success('查询成功~')
            } else {
              this.$message.warning('暂无车辆定位数据！')
            }
          })
          .catch(err => {
            this._handlerCatchMsg(err)
          })
      }
    },

    tomap() { // 转高德坐标
      const AMap = window.AMap
      const AMapUI = window.AMapUI
      const map = this.map
      const _this = this
      map.remove(this.markers)
      let lnglat = []
      let marker
      this.markers = []
      // let content = []

      // 坐标转换
      if (this.realTimeLocateList.length) {
        this.realTimeLocateList.forEach((e, index) => {
          if (e.longitude !== null && e.latitude !== null) {
            lnglat[index] = [e.longitude, e.latitude]
            marker = new AMap.Marker({
              map: map,
              position: lnglat[index]
            })
            // content.push(e.terminalNo)

            // 创建信息窗体
            _this.infoWindow(e)
            window.infoWindow.open(map, marker.getPosition())

            //鼠标点击marker弹出自定义的信息窗体
            marker.on('click', function(em) {
              _this.infoWindow(e)
              window.infoWindow.open(map, em.lnglat)
            })

            marker.setLabel({
              offset: new AMap.Pixel(20, 20),
              // content: ''
            })
            this.markers.push(marker)
            map.setFitView()
          }
        })
        console.log('实时车辆定位：：', this.realTimeLocateList, lnglat, this.map)
      }
    },
    exportData() { // 导出数据表格
      SaveAsFile({
        data: this.orgDataList,
        columns: this.tableColumn,
        name: '轨迹详情' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
      })
    },
    getPathSimplifierIns() { // 初始化轨迹配置信息
      console.log('初始化轨迹配置信息')
      const _this = this
      const AMapUI = window.AMapUI
      const map = _this.map
      AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }

        let colors = _this.lineColor
        let pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          setFitView: -1,
          map: map, //所属的地图实例
          getPath: function(pathData, pathIndex) {
            return pathData.path;
          },
          getHoverTitle: function(pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
              return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
            }
            return pathData.name + '，点数量' + pathData.path.length;
          },
          renderOptions: {
            pathLineStyle: {
              dirArrowStyle: true
            },
            getPathStyle: function(pathItem, zoom) {
              let color = colors[pathItem.pathIndex],
                lineWidth = Math.round(4 * Math.pow(1.1, zoom - 3));
              return {
                pathLineStyle: {
                  strokeStyle: color,
                  lineWidth: lineWidth
                },
                pathLineSelectedStyle: {
                  lineWidth: lineWidth + 2
                },
                pathNavigatorStyle: {
                  fillStyle: color
                }
              }
            },
            startPointStyle: {
              radius: 6,
              fillStyle: '#109618',
              lineWidth: 1,
              strokeStyle: '#eeeeee'
            },
            endPointStyle: {
              radius: 6,
              fillStyle: '#dc3912',
              lineWidth: 1,
              strokeStyle: '#eeeeee'
            }
          }
        })
        window.PathSimplifier = PathSimplifier
        window.pathSimplifierIns = pathSimplifierIns
      })
    },
    getNavg(pathIndex, row) { // 绘制轨迹
      const _this = this
      const AMap = window.AMap
      const AMapUI = window.AMapUI
      const map = _this.map

      let pathSimplifierIns = window.pathSimplifierIns
      if (!_this.pathNavigs[pathIndex]) {
        function onload() {
          pathSimplifierIns.renderLater();
        }

        function onerror(e) {
          _this.$message.info('巡航器图片加载失败！')
        }
        //创建一个轨迹巡航器
        let navgtr = pathSimplifierIns.createPathNavigator(pathIndex, {
          loop: false,
          speed: _this.speedSlider,
          pathNavigatorStyle: {
            width: 24,
            height: 24,
            content: PathSimplifier.Render.Canvas.getImageContent(_this.imgurl, onload, onerror)
          }
        })

        navgtr.onDestroy(function() {
          _this.pathNavigs[pathIndex] = null
        })

        navgtr.on('start resume', function() {
          navgtr._startTime = Date.now()
          navgtr._startDist = this.getMovedDistance()
        })

        navgtr.on('stop pause', function() {
          navgtr._movedTime = Date.now() - navgtr._startTime
          navgtr._movedDist = this.getMovedDistance() - navgtr._startDist
          navgtr._realSpeed = (navgtr._movedDist / navgtr._movedTime * 3600)
          let totalDis = Math.round(this.getMovedDistance() / 1000) || 0 // 总行进距离
          let curDis = Math.round(navgtr._movedDist / 1000) || 0 // 本段行进距离
          let msgInfo = {
            '状态': this.getNaviStatus(),
            '设定速度': this.getSpeed() + ' km/h',
            '总行进距离': totalDis + ' km',
            '本段行进距离': curDis + ' km',
            '本段耗时': (navgtr._movedTime / 1000) + ' s',
            '本段实际速度': Math.round(navgtr._realSpeed) + ' km/h'
          }
          this.comDis = (totalDis === curDis) // 判断是否完成路径
          _this.refreshNavgButtons(pathIndex)
        })

        navgtr.on('move', function() {
          let msgInfo = {
            '状态': this.getNaviStatus(),
            '设定速度': this.getSpeed() + ' km/h',
            '总行进距离': Math.round(this.getMovedDistance() / 1000) + ' km'
          }
          if (_this.allPathData && _this.allPathData.length === 1) {
            _this.curCursor = navgtr.getCursor()
            // console.log('当前下标', _this.curCursor, _this.curCursor.idx, _this.curCursor.tail)
          }
        })
        _this.pathNavigs[pathIndex] = navgtr
      }
      return _this.pathNavigs[pathIndex]
    },
    setDataLine() { // 设置轨迹需要的经纬度数据
      let arr = []
      this.allList.forEach((row, pathIndex) => {
        if (row.length) {
          let obj = {
            name: '',
            path: []
          }
          if (this.activeTruckItem && this.activeTruckItem.length) {
            // 选择一辆车
            let flagIndex = 0
            for (let item in this.activeTruckItem) {
              flagIndex = Number(item)
            }
            if (pathIndex === flagIndex) {
              // 选择所有车
              row.forEach((e, index) => {
                let location = [Number(e.longitude), Number(e.latitude)]
                obj.name = e.truckIdNumber
                obj.path.push(location)
              })
              arr.push(obj)
            }
          } else {
            // 选择所有车
            row.forEach((e, index) => {
              let location = [Number(e.longitude), Number(e.latitude)]
              obj.name = e.truckIdNumber
              obj.path.push(location)
            })
            arr.push(obj)
          }
        }
      })
      this.allPathData = arr
      return arr
    },
    initLine() { // 初始化轨迹
      if (window.pathSimplifierIns) {
        const map = this.map
        map.remove(this.markers) // 移除标注
        let pathSimplifierIns = window.pathSimplifierIns
        let pathData = this.setDataLine() // 格式化数据
        pathSimplifierIns.setData(this.setDataLine()) // 给巡航器设置数据
        pathData.forEach((row, pathIndex) => {
          let navg = this.getNavg(pathIndex, row) // 创建轨迹
        })
      } else {
        if (!this.initedPath) {
          this.getPathSimplifierIns()
          this.initedPath = true
        }
      }
    },
    doLine(type) { // 轨迹控制器
      if (window.pathSimplifierIns) {
        if (/(start|resume|pause)/.test(type)) {
          clearInterval(this.timerOption)
          this.isTimerOpen = false
        } else {
          this.initTimer()
        }
        let pathSimplifierIns = window.pathSimplifierIns
        this.allPathData.forEach((row, pathIndex) => {
          let navg = this.getNavg(pathIndex, row) // 创建轨迹
          navg[type]()
          this.refreshNavgButtons(pathIndex)
        })
      } else {
        if (!this.initedPath) {
          this.getPathSimplifierIns()
          this.initedPath = true
        }
      }
    },
    refreshNavgButtons(pathIndex) {
      if (pathIndex < 0) {
        return
      }
      let navgStatus = 'stop',
        navgExists = !!this.pathNavigs[pathIndex]
      let navgtr = this.pathNavigs[pathIndex]
      if (navgExists) {
        navgStatus = navgtr.getNaviStatus()
      }
    },
    refreshNavg() {
      this.searchQuery.currentPage = 1
      this.dataList = this.orgPageDataList[this.searchQuery.currentPage - 1]
    },
    exit() {
      if (this.map && this.map.destroy && typeof this.map.destroy === 'function') {
        this.map.destroy()
        this.map = {}
      }
      this.thepos = ''
      this.thename = ''
      this.theobj = {}
      this.noinfo = true
    },
    init() {
      this.dialogTableVisible = this.popVisible
      this.loadMap()
      // 当为展现时，初始化
      if (this.popVisible) {
        this.thepos = this.pos
        this.thename = this.name
      } else {
        // 隐藏时，摧毁地图对象
        this.exit()
      }
    },
    loadMap() {
      if (window.AMap) {
        // 稍微延时下渲染，以改进展现质量
        // 如果不延时，地图对象所要绑定的DOM元素可能还没初始化好
        setTimeout(() => {
          this.initMap()
          this.getPathSimplifierIns()
          // this.onSubmit()
        }, 500)
      } else {
        loadJs('https://webapi.amap.com/maps?v=1.4.8&key=e61aa7ddc6349acdb3b57c062080f730&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder&callback=loadedGaodeMap').then(() => {

        })
      }

    },
    close(done) {
      this.exit()
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    },
    initMap() {
      const _this = this
      const AMap = window.AMap
      const AMapUI = window.AMapUI
      // 地图加载
      _this.map = new AMap.Map('trucklogmap', {
        resizeEnable: true,
        zoom: 6,
        // mapStyle: "amap://styles/darkblue"
      })

    },
    // 设置获取到的信息
    setData(pos, addr, obj) {
      this.thepos = pos
      this.thename = addr
      this.theobj = obj
      this.noinfo = false
      console.log(obj)
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}

</script>
