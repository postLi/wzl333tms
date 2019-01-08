<template>
  <div class="track-truck-log" ref="truckLog" v-loading="loading">
    <transition name="el-zoom-in-center">
      <div class="search-card" v-if="showSearchCard && !isAllTable">
        <el-form ref="form" size="mini" :model="searchQuery" label-width="65px">
          <el-form-item label="选择车辆">
            <el-input :size='btnsize' v-model="searchQuery.vo.truckIdNumber" placeholder="请输入车牌号" maxlength="8" clearable>
              <!-- <el-button slot="append" :icon="popTreeVisible?'el-icon-close':'el-icon-menu'" @click="handleTruck"></el-button> -->
            </el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker v-model="searchQuery.vo.startTime" type="datetime" align="right" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="searchQuery.vo.endTime" type="datetime" align="right" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions2" placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="staff_searchinfo--btn">
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
            <!-- <el-button :type="isShowInlineTruckMap?'success':'warning'" @click="mapTruck">查看{{isShowInlineTruckMap ? '车辆轨迹' : '实时车辆'}} <i :class="isShowInlineTruckMap ?'el-icon-share':'el-icon-location'"></i></el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </transition>
    <transition name="el-zoom-in-center">
      <el-card v-if="popTreeVisible" class="popTree" v-show="!isAllTable">
        <div class="popTree-group">
          <div v-for="(item, index) in realTimeTrucks" class="popTree-group-item" :class="" @click="selectGroup(item, index)">
            <p>{{item.truckIdNumber}}</p>
          </div>
        </div>
      </el-card>
    </transition>
    <div class="popTimer" v-if="isTimer"><i class="el-icon-time"></i> {{timer}}秒后刷新轨迹</div>
    <div id="allmap" ref="allmap"></div>
    <div class="truck-log-expand">
      <transition name="el-zoom-in-center">
        <div class="control-panel" v-show="!isAllTable&& !isShowInlineTruckMap">
          <el-button :size="btnsize" type="text" icon="el-icon-caret-right" @click="doLine('start')" title="播放"></el-button>
          <el-button :size="btnsize" type="text" icon="el-icon-refresh" @click="doLine('resume')" title="恢复"></el-button>
          <el-button :size="btnsize" type="text" @click="doLine('pause')" class="btn-stop" title="暂停"></el-button>
          <el-button :size="btnsize" type="text" icon="el-icon-close" @click="doLine('destroy')" title="清空"></el-button>
          <span>速度:</span><i style="color: green;">慢 </i>
          <el-slider v-model="speedSlider" class="slider-step" :min="1000" :max="1000000"></el-slider>
          <i style="color: #409eff;">快 </i>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="progressPercentage" status="success"></el-progress>
        </div>
      </transition>
      <div @mousedown.prevent.stop.capture="conStart" class="control-bur">
        <span>轨迹详情（盲点补传数据里程为空，无线设备系列里程为"--"）</span>
        <el-tooltip class="item" effect="dark" :content="isShowTable?'隐藏':'显示'" placement="bottom-end">
          <el-button :size="btnsize" icon="el-icon-rank" type="text" @click="hideTable"></el-button>
        </el-tooltip>
        <el-button :size="btnsize" type="text" @click="exportData">导出Excel</el-button>
      </div>
    </div>
    <transition name="el-zoom-in-bottom">
      <div class="truck-log-info" v-if="isShowTable">
        <div class="info_tab">
          <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border :height="tableHeight.height+'px'" tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}" :row-class-name="classLineRed">
            <template v-for="column in tableColumn">
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" :prop="column.prop" v-if="!column.slot" :width="column.width">
              </el-table-column>
              <el-table-column :key="column.id" :fixed="column.fixed" sortable :label="column.label" v-else :width="column.width">
                <template slot-scope="scope">
                  <span class="clickitem" v-if="column.click" v-html="column.slot(scope)" @click.stop="column.click(scope)"></span>
                  <span v-else v-html="column.slot(scope)"></span>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>
        <div class="info_tab_footer">
          共计:{{ total }}
          <div class="show_pager">
            <Pager :total="total" @change="handlePageChange" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// 请求接口
import orderManage from '@/api/operation/orderManage'
import { loadJs, objectMerge2, pickerOptions2, parseTime } from '@/utils/'
import Pager from '@/components/Pagination/index'
import { trajectoryByTruckIdNumber } from '@/api/operation/truckLog'
import { SaveAsFile } from '@/utils/lodopFuncs'
export default {
  components: {
    Pager
  },
  props: {
    orderid: [String, Number],
    orderdata: [Object]
  },
  data() {
    return {

      isAllTable: false, // true-表格全屏
      isShowTable: false, // true-显示table false-隐藏table
      showSearchCard: true, // true-显示搜索框 false-隐藏搜索框
      isShowInlineTruckMap: false, // true-实时车辆货物地图 false-车辆轨迹地图
      speedSlider: 520130,
      popTreeVisible: false,
      gridData: [],
      tablekey: 0,
      dataList: [],
      loading: false,
      noinfo: true,
      dialogTableVisible: false,
      thepos: '',
      thename: '',
      theobj: {},
      btnsize: 'mini',
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      groupList: [],
      tableColumn: [{
          label: '序号',
          prop: 'number',
          width: '55',
          fixed: true
        }, {
          label: '车牌号码',
          prop: 'truckIdNumber',
          width: '100',
          fixed: true
        },
        {
          label: '司机电话',
          prop: 'dirverMobile',
          width: '110',
          fixed: true
        },
        {
          label: '司机名称',
          prop: 'dirverName',
          fixed: true
        }, {
          label: '车辆定位时间',
          prop: 'time',
          width: '160'
        }, {
          label: '速度 km/h',
          prop: 'speed',
          width: '90'
        }, {
          label: '方向',
          prop: 'direction',
          width: '90'
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
          label: '部件状态',
          prop: 'status',
          width: '90',
          slot: (scope) => {
            return ' - '
          }
        }
      ],
      total: 0,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          truckIdNumber: '陕YH0009',
          startTime: parseTime(new Date() - 60 * 24 * 60 * 4 * 1000),
          endTime: parseTime(new Date())
        }
      },
      tableHeight: {
        height: 300,
        x: 0,
        y: 0
      },
      timer: 5,
      isTimer: false,
      pathSimplifierIns: {},
      map: {},
      allPathData: [],
      imgurl: require('../../../../assets/truck_log/car.png'),
      isDrag: false,
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
      realTimeTrucks: [], // 实时车辆信息
      lineColor: ['#3366cc', '#329262', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#dc3912', '#5574a6', '#3b3eac', '#409eff', '#008000', '#40E0D0', '#22aa99', '#9400D3', '#FFC0CB', '#0000FF', '#FFA500', '#B22222', '#808080', '#00FFFF', '#8A2BE2', '#5F9EA0', '#7FFF00', '#DAA520']
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
    curCursor: {
      handler(cval, oval) {
        if (cval) {
          if (this.pathNavigs.length === 1) { // 单辆车的时候 才显示进度条

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
    }
  },
  mounted() {
    const _this = this
    window.loadedGaodeMap = function() {
      _this.initMap()
      _this.hasLoadedMap = true
    }
    this.init(2222)
    this.initTimer()
  },
  // 关闭时清空地图数据
  destoryed() {
    this.exit()
  },
  methods: {
    classLineRed(row) { // 行样式
      if (this.allPathData.length) {
        if (row.row.number === this.curCursor.idx) {
          return 'rowSelect'
        } else {
          return ''
        }
      }
    },
    initTimer() {
      if (this.isTimer) { // 是否定时刷新
        this.timer = this.$options.data().timer
        let timer = setInterval(() => {
          this.timer--
            if (this.timer <= 0) {
              this.onSubmit()
              setTimeout(() => {
                this.timer = 60
              }, 1000)
            }
        }, 1000)
      }
    },
    selectGroup(row, index) {
      console.log('选中的车：：', index, row.truckIdNumber, row.longitude, row.latitude, row)
      this.$set(this.searchQuery.vo, 'truckIdNumber', row.truckIdNumber)
      this.popTreeVisible = false
    },
    conStart(event) {
      let eventY = event.pageY //鼠标当前位置的y坐标
      this.tableHeight.y = eventY
      this.tableHeight.orgheight = this.tableHeight.height || 0
      this.truckLogHeight = this.$refs.truckLog.offsetHeight - 90
      if (!this.isShowTable) {
        this.isShowTable = true
        this.tableHeight.height = 36
      }
      this.isDrag = true
      console.log('conStart eventY', eventY, this.truckLogHeight)
    },
    conMove(event) {
      if (this.isDrag) {
        let mapH = this.$refs.allmap.offsetHeight
        let h = event.pageY - this.tableHeight.y
        let height = this.tableHeight.orgheight - h
        this.isShowTable = height >= 37
        this.isAllTable = this.$refs.allmap.offsetHeight < 240
        this.tableHeight.height = height > this.truckLogHeight ? this.truckLogHeight : height
      }
    },
    conEnd(event) {
      if (this.isDrag) {
        this.tableHeight.y = event.pageY
        this.isDrag = false
      }
    },
    bindKey() {
      document.addEventListener('mousemove', this.conMove, true)
      document.addEventListener('mouseup', this.conEnd, true)
    },
    unbindKey() {
      document.addEventListener('mousemove', this.conMove)
      document.addEventListener('mouseup', this.conEnd)
    },
    mapTruck() {
      this.isShowInlineTruckMap = !this.isShowInlineTruckMap
      this.showSearchCard = false
      setTimeout(() => {
        this.showSearchCard = true
      }, 300)
    },
    hideTable() {
      this.isShowTable = !this.isShowTable
    },
    handlePageChange(obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.dataList = this.orgPageDataList[this.searchQuery.currentPage - 1]
    },
    handleTruck() { // 修改车辆信息
      this.popTreeVisible = !this.popTreeVisible
    },
    onSubmit() { // 查询
      let _this = this
      _this.progressPercentage = 0
      _this.pathNavigs = []
      if (window.pathSimplifierIns) {
        window.pathSimplifierIns.setData([]) // 给巡航器设置数据
      }
      if (!this.isShowInlineTruckMap) { // 轨迹接口
          // 查询车辆轨迹数据
        let fn = (lineData, type) => {
          if (!lineData) { return }
          _this.orgPageDataList = []
          _this.orgDataList = []
          _this.dataList = []
          if (lineData && lineData.length) {
            lineData.forEach((em, emindex) => {
              let emData = []
              if (type === 'simple') {
                _this.total = em.trajectoryList.length || 0 // 设置总页数
                _this.totalPageSize = Math.floor(_this.total / this.searchQuery.pageSize) + 1
                for (let i = 0; i < _this.totalPageSize; i++) {
                  _this.orgPageDataList[i] = [] // 初始化分页数据(前端做简单分页)
                }
              }
              em.trajectoryList.forEach((el, index) => {
                el.dirverMobile = em.dirverMobile
                el.dirverName = em.dirverName
                el.truckIdNumber = em.truckIdNumber
                el.number = index + 1
                _this.orgDataList[index] = el
                emData[index] = el
                if (type === 'simple') {
                  let _index = Math.floor(index / _this.searchQuery.pageSize)
                  _this.orgDataList[index] = el
                  _this.orgPageDataList[_index].push(el) // 填充分页数据数组
                }
              })
              _this.allList[emindex] = emData
              // 当前页面的数据
              _this.dataList = _this.orgPageDataList[_this.searchQuery.currentPage - 1]
            })
          }
        }

        let query = objectMerge2({}, this.searchQuery.vo)
        trajectoryByTruckIdNumber(query).then(data => {
           if (data && data.trajectoryList.length) {
              _this.initedPath = false
              if (data.trajectoryList.length === 1 || this.searchQuery.vo.truckIdNumber) { // 单辆车轨迹
                fn([data], 'simple')
                console.warn('格式化（单辆车）：', this.allList)
                _this.initLine()
                _this.isShowTable = true
              } else { 
               
              }
              _this.$notify({
                title: '成功',
                message: '车辆轨迹查询成功',
                type: 'success'
              })
            } else {
              this.$message.warning('暂无车辆轨迹数据！')
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
      // 坐标转换
      if (this.realTimeTrucks.length) {
        this.realTimeTrucks.forEach((e, index) => {
          lnglat[index] = [e.longitude, e.latitude]
          marker = new AMap.Marker({
            map: map,
            position: lnglat[index]
          })
          marker.setLabel({
            offset: new AMap.Pixel(20, 20),
            content: '<div class="markerContent"><h3>' + e.truckIdNumber + ' <i>' + e.speed + 'km/h</i></h3><p>' + e.dirverName + ' <i>' + e.dirverMobile + '</i></p><p>' + e.address + '</p></div>'
          })
          this.markers.push(marker)
          map.setFitView()
        })
        console.log('实时车辆定位：：', this.realTimeTrucks, lnglat, this.map)
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
          console.log(e, window.PathSimplifier, PathSimplifier)
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
          console.warn('msgInfo start', navgtr)
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
          console.warn('msgInfo stop', msgInfo)
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
          row.forEach((e, index) => {
            let location = [Number(e.longitude), Number(e.latitude)]
            obj.name = e.truckIdNumber
            obj.path.push(location)
          })
          arr.push(obj)
        }
      })
      this.allPathData = arr
      return arr
    },
    initLine() {
      if (window.pathSimplifierIns) {
        console.log('initLine')
        const map = this.map
        map.remove(this.markers) // 移除标注
        let pathSimplifierIns = window.pathSimplifierIns
        let pathData = this.setDataLine() // 格式化数据
        pathSimplifierIns.setData(this.setDataLine()) // 给巡航器设置数据
        pathData.forEach((row, pathIndex) => {
          console.log(row)
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
      console.log('navgExists', navgExists)
      if (navgExists) {
        navgStatus = navgtr.getNaviStatus()
        console.log('navgStatus', navgStatus)
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

      this.bindKey()
    },
    loadMap() {
      console.log('loadMap1', window.AMap)
      if (window.AMap) {
        console.log('loadMap2', window.AMap)
        // 稍微延时下渲染，以改进展现质量
        // 如果不延时，地图对象所要绑定的DOM元素可能还没初始化好
        setTimeout(() => {
          this.initMap()
          this.getPathSimplifierIns()
          this.onSubmit()
        }, 500)
      } else {
        console.log('loadMap3', window.AMap)
        loadJs('https://webapi.amap.com/maps?v=1.4.8&key=e61aa7ddc6349acdb3b57c062080f730&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder&callback=loadedGaodeMap').then(() => {
          loadJs('//webapi.amap.com/ui/1.0/main.js').then(() => {
            this.initMap()
            this.getPathSimplifierIns()
            this.onSubmit()
            console.log('window.AMap', window.AMap)
            console.log('window.AMapUI', window.AMapUI)
            console.log('this.map', this.map)
          })
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
      _this.map = new AMap.Map('allmap', {
        resizeEnable: true

      })

      const map = this.map
      // 输入提示
      var autoOptions = {
        input: 'tipinput'
      }
      var auto = new AMap.Autocomplete(autoOptions)
      // 初始化搜索框信息
      var placeSearch = new AMap.PlaceSearch({
        map: map,
        extensions: 'base' // all base
        // type: '商务住宅|生活服务|公司企业|地名地址信息'
      })
      const name = this.name
      if (name) {
        this.$refs['tipinput'].value = name.replace('市辖区', '')
        placeSearch.search(name)
      }
      /* AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
        var map = new AMap.Map('container', {
          zoom: 16
        })
        var positionPicker = new PositionPicker({
          mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map// 依赖地图对象
        })
    // TODO:事件绑定、结果处理等
        positionPicker.on('success', function(positionResult) {
          console.log('success:', positionResult)
        })
        positionPicker.on('fail', function(positionResult) {
          console.log('fail:', positionResult)
        })
        // start方法可以接受一个经纬度参数作为，拖拽的起始点
        positionPicker.start()
      }) */

      var infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -30),
        content: '' // 使用默认信息窗体框样式，显示信息内容
      })
      var geocoder = new AMap.Geocoder({
        radius: 1000 // 范围，默认：500
      })
      // infoWindow.open(map, map.getCenter())
      var contextMenu = new AMap.ContextMenu()
      var contextMenuPositon = []
      var marker

      function clearMarker() {
        if (marker) {
          marker.setMap(null)
          marker = null
        }
      }
      // 右键添加Marker标记
      contextMenu.addItem('添加标记', function(e) {
        // 删除上一个标记
        clearMarker()
        // 清除搜素结果
        placeSearch.clear()
        // 关闭上一个信息窗口
        infoWindow.close()

        findInfo(contextMenuPositon)
      }, 3)

      function findInfo(pos) {
        console.log('2222', pos)
        geocoder.getAddress(pos, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            geocoder_CallBack(result, pos)
          } else {
            clearMarker()
            alert('获取不到当前位置的地址信息~')
          }
        })
      }

      // 地图绑定鼠标右击事件——弹出右键菜单
      map.on('rightclick', function(e) {
        console.log('right click:', e)
        var pos = e.lnglat

        contextMenu.open(map, pos)
        contextMenuPositon = pos
      })

      function geocoder_CallBack(data, pos) {
        var haspx = !!pos.lat

        var addr = data.regeocode.formattedAddress
        if (haspx) {
          marker = new AMap.Marker({
            map: map,
            position: pos // 基点位置
          })

          marker.on('click', function(e) {
            infoWindow.open(map, e.target.getPosition())
          })
          marker.emit('click', {
            target: marker
          })
          infoWindow.setContent(addr)
        }

        _this.setData(haspx ? pos.lng + ',' + pos.lat : pos, addr, data.regeocode)
      }

      map.on('click', function(e) {
        console.log('e:', e)
      })
      // 构造地点查询类
      map.plugin(['AMap.ToolBar'], function() {
        map.addControl(new AMap.ToolBar())
      })
      AMap.event.addListener(auto, 'select', select) // 注册监听，当选中某条记录时会触发
      AMap.event.addListener(placeSearch, 'markerClick', function(e) {
        const loc = e.data.location
        findInfo(loc)
        // findInfo(loc)
      })

      function select(e) {
        console.log('select e:', e)
        placeSearch.setCity(e.poi.adcode)
        //
        placeSearch.search(e.poi.name) // 关键字查询查询
      }
    },
    // 设置获取到的信息
    setData(pos, addr, obj) {
      this.thepos = pos
      this.thename = addr
      this.theobj = obj
      this.noinfo = false
      console.log(obj)
    }
  }
}

</script>
