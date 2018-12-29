<template>
  <div class="orderinfo-manager truck-log" ref="truckLog" v-loading="loading">
    <transition name="el-zoom-in-center">
      <div class="search-card" v-if="showSearchCard && !isAllTable">
        <el-form ref="form" size="mini" :model="searchQuery" label-width="65px">
          <el-form-item label="选择车辆">
            <el-input :size='btnsize' v-model="searchQuery.vo.truckIdNumber" placeholder="请输入车牌号" maxlength="8" clearable>
              <el-button slot="append" :icon="popTreeVisible?'el-icon-close':'el-icon-menu'" @click="handleTruck"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker v-model="searchTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions2" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="staff_searchinfo--btn">
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
            <el-button :type="isShowInlineTruckMap?'success':'warning'" @click="mapTruck">查看{{isShowInlineTruckMap ? '车辆轨迹' : '实时车辆'}} <i :class="isShowInlineTruckMap ?'el-icon-share':'el-icon-location'"></i></el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
    <transition name="el-zoom-in-center">
      <el-card v-if="popTreeVisible" class="popTree" v-show="!isAllTable">
        <div class="popTree-group">
          <div v-for="(item, index) in groupList" class="popTree-group-item" :class="" @click="selectGroup(item, index)">
            <p>{{item.name}}</p>
          </div>
        </div>
        <div class="popTree-child">
          <div v-for=" (item, index) in truckList " @click="selectTruck(item, index)" class="popTree-child-item">
            <p>{{item.truckIdNumber}}</p>
          </div>
        </div>
      </el-card>
    </transition>
    <div id="allmap" ref="allmap"></div>
    <div class="truck-log-expand">
      <transition name="el-zoom-in-center">
        <div class="control-panel" v-show="!isAllTable">
          <el-button :size="btnsize" type="text" icon="el-icon-caret-right" @click="doLine('start')"></el-button>
          <el-button :size="btnsize" type="text" icon="el-icon-refresh" @click="doLine('end')"></el-button>
          <span>速度:</span><i style="color: green;">慢 </i>
          <el-slider v-model="sliderStep" class="slider-step"></el-slider>
          <i style="color: #409eff;">快 </i>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="70" status="success"></el-progress>
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
          <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border :height="tableHeight.height+'px'" show-summary tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}">
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
      isShowInlineTruckMap: true, // true-实时车辆货物地图 false-车辆轨迹地图
      sliderStep: 0,
      resouseData: {
        "currentPage": 1,
        "pageSize": 10000,
        "totalCount": 2,
        "totalPage": 1,
        "list": [{
          "id": "1078222090932322307",
          "orderSerial": "AFTC201812271731180738822",
          "driverId": "1076033378458796032",
          "address": "广东省广州市天河区天河东路240号靠近中国工商银行(广州天河支行)",
          "dirverName": "13560000001",
          "latitude": "23.132086",
          "longitude": "113.333569",
          "locationTime": 1545903154000,
          "createTime": 1545903154000,
          "updateTime": 1545903154000,
          "creater": "13560000001",
          "updater": "13560000001",
          "version": null,
          "truckIdNumber": '粤L1Y998'
        }, {
          "id": "1078222289415176192",
          "orderSerial": "AFTC201812271731180738822",
          "driverId": "1076033378458796032",
          "address": "广东省广州市天河区天河东路240号靠近中国工商银行(广州天河支行)",
          "dirverName": "13560000001",
          "latitude": "26.904987",
          "longitude": "116.405289",
          "locationTime": 1545903201000,
          "createTime": 1545903201000,
          "updateTime": 1545903201000,
          "creater": "13560000001",
          "updater": "13560000001",
          "version": null,
          "truckIdNumber": '粤L1Y998'
        }]
      },
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
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      truckList: [],
      groupList: [{
        name: '安发车组',
        truck: [{
            truckIdNumber: '粤L1Y998'
          },
          {
            truckIdNumber: '粤S1Y688'
          }
        ]
      }, {
        name: '纽枯禄车组',
        truck: [{
            truckIdNumber: '川A1Y221'
          },
          {
            truckIdNumber: '京B1Y463'
          }
        ]
      }, {
        name: '洁柔车组',
        truck: [{
            truckIdNumber: '豫A1Y221'
          },
          {
            truckIdNumber: '鲁B1Y463'
          }
        ]
      }],
      tableColumn: [{
          label: '序号',
          prop: 'number',
          width: '70',
          slot: (scope) => {
            return ((this.searchQuery.currentPage - 1) * this.searchQuery.pageSize) + scope.$index + 1
          },
          fixed: true
        }, {
          label: '车牌号码',
          prop: 'truckIdNumber',
          width: '110',
          fixed: true
        },
        {
          label: '司机名称',
          prop: 'dirverName',
          width: '110',
          fixed: true
        }, {
          label: '车辆定位时间',
          prop: 'locationTime',
          width: '160',
          slot: (scope) => {
            return parseTime(scope.row.locationTime, '{y}-{m}-{d} {h}:{i}:{s}')
          }
        }, {
          label: '速度 km/h',
          prop: 'speed',
          width: '100'
        }, {
          label: '方向',
          prop: 'direction',
          width: '100'
        }, {
          label: '里程 km',
          prop: 'li',
          width: '80'
        }, {
          label: '海拔 m',
          prop: 'li',
          width: '80'
        },
        {
          label: '部件状态',
          prop: 'status',
          width: '90'
        }, {
          label: '位置',
          prop: 'address'
        }
      ],
      total: 0,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {
          truckIdNumber: '',
          startTime: '',
          endTime: ''
        }
      },
      tableHeight: {
        height: 300,
        x: 0,
        y: 0
      },
      pathSimplifierIns: {},
      map: {},
      isDrag: false
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
    }
  },
  mounted() {
    const _this = this
    window.loadedGaodeMap = function() {
      _this.initMap()
      _this.hasLoadedMap = true
    }
    this.init(2222)
  },
  // 关闭时清空地图数据
  destoryed() {
    this.exit()
  },
  methods: {
    conStart(event) {
      let eventY = event.pageY //鼠标当前位置的y坐标
      this.tableHeight.y = eventY
      this.tableHeight.orgheight = this.tableHeight.height
      if (!this.isShowTable) {
        this.isShowTable = true
        this.tableHeight.height = 36
      }
      this.isDrag = true
      console.log('conStart eventY', eventY)

      console.log('allmap', this.$refs.allmap.offsetHeight)
    },
    conMove(event) {
      if (this.isDrag) {
        console.log(this.$refs.allmap.offsetHeight)
        let h = this.tableHeight.y - event.pageY
        let height = this.tableHeight.orgheight + h
        this.isShowTable = height >= 37
        this.isAllTable = this.$refs.allmap.offsetHeight < 190
        this.tableHeight.height = height
      }
    },
    conEnd(event) {
      if (this.isDrag) {
        this.tableHeight.y = event.pageY
        this.isDrag = false
      }
    },
    calcWH() {

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
    selectGroup(row, index) {
      this.truckList = row.truck
    },
    selectTruck(row, index) {
      console.log('选择车辆', index, row)
      this.$set(this.searchQuery.vo, 'truckIdNumber', row.truckIdNumber)
      this.popTreeVisible = false
    },
    handlePageChange() {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
      this.getAllList()
    },
    handleTruck() { // 修改车辆信息
      this.popTreeVisible = !this.popTreeVisible
      // this.$message.warning('功能尚在开发中 ~')
    },
    onSubmit() { // 查询
      // this.$message.warning('功能尚在开发中 ~')
      let data = this.resouseData
      this.dataList = data.list
      this.isShowTable = true
    },
    exportData() { // 导出数据表格
      this.$message.warning('功能尚在开发中 ~')
    },
    doLine(type) {
      switch (type) {
        case 'start':
          this.getNavg()
          break
        case 'end':
          break
      }
    },
    getNavg() {
      const _this = this
      const AMapUI = window.AMapUI
      const map = _this.map
      AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }
        console.log('getNavg this.map', map)
        var pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          map: map, //所属的地图实例
          getPath: function(pathData, pathIndex) {
            return pathData.path;
          },
          getHoverTitle: function(pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
              //point 
              return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
            }
            return pathData.name + '，点数量' + pathData.path.length;
          },
          renderOptions: {
            renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
          }
        })
        window.pathSimplifierIns = pathSimplifierIns
        //设置数据
        pathSimplifierIns.setData(_this.setDataLine())
        //对第一条线路（即索引 0）创建一个巡航器
        var navg1 = pathSimplifierIns.createPathNavigator(0, {
          loop: false, //循环播放
          speed: 1000000 //巡航速度，单位千米/小时
        })
        navg1.start()
      })
    },
    setDataLine() { // 设置经纬度数据
      let arr = []
      let obj = {
        name: '',
        path: []
      }
      this.dataList.forEach((e, index) => {
        let location = [Number(e.longitude), Number(e.latitude)]
        obj.name = e.truckIdNumber
        obj.path.push(location)
      })
      arr.push(obj)
      console.log('setDataLine', arr)
      return arr
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
      console.log('this.popVisible:', this.popVisible)
      this.loadMap()
      // 当为展现时，初始化
      if (this.popVisible) {
        this.thepos = this.pos
        this.thename = this.name
      } else {
        // 隐藏时，摧毁地图对象
        // this.exit()
      }
      this.onSubmit()
      this.bindKey()
    },
    loadMap() {
      if (window.AMap) {
        // 稍微延时下渲染，以改进展现质量
        // 如果不延时，地图对象所要绑定的DOM元素可能还没初始化好
        setTimeout(() => {
          this.initMap()
        }, 500)
      } else {
        loadJs('https://webapi.amap.com/maps?v=1.4.8&key=e61aa7ddc6349acdb3b57c062080f730&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder&callback=loadedGaodeMap').then(() => {
          loadJs('//webapi.amap.com/ui/1.0/main.js').then(() => {
            this.initMap()
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
        console.log('1111111111111', pos)
        var haspx = !!pos.lat

        console.log('geocodeer:', data)
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
    },
    // submitForm() {
    //   this.$emit('success', this.thepos, this.thename, this.theobj)
    //   this.close()
    // },
    // fetchData() {
    //   console.log('this.orderdata.tmsOrderShipInfo:', this.orderdata.tmsOrderShipInfo)
    //   if (this.orderdata.tmsOrderShipInfo) {
    //     this.start = this.orderdata.tmsOrderShipInfo.shipFromCityName || '广州市'
    //     this.end = this.orderdata.tmsOrderShipInfo.shipToCityName || '杭州市'
    //     return
    //   }
    // }
  }
}

</script>
