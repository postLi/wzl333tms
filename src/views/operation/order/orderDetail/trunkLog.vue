<template>
  <div class="orderinfo-manager truck-log " v-loading="loading">
   
      <div class="search-card">
        <el-form ref="form" size="mini" :model="form" label-width="65px">
          <el-form-item label="选择车辆">
            <el-input :size='btnsize' v-model="form.truckIdNumber">
              <el-button slot="append" icon="el-icon-menu" @click="handleTruck"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker v-model="searchTime" type="daterange" align="right" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" :picker-options="pickerOptions2" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="staff_searchinfo--btn">
            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
        
      </div>
       <transition name="el-zoom-in-center">
        <el-card v-if="popTreeVisible" class="popTree">
          <div class="popTree-group">
            <div v-for="(group, gindex) in groupList">
              <i class="el-icon-star-on"></i> {{group.name}}
              <div class="popTree-child">
                <div v-for=" (item, index) in group.truck ">{{item.truckNumber}}</div>
              </div>
            </div>
          </div>
        </el-card>
    </transition>
    <div id="allmap"></div>
    <div class="truck-log-expand">
      <span>轨迹详情（盲点补传数据里程为空，无线设备系列里程为"--"）</span>
      <el-button :size="btnsize" icon="el-icon-rank" type="text"></el-button>
      <el-button :size="btnsize" type="text" @click="exportData">导出</el-button>
    </div>
    <div class="truck-log-info">
      <div class="info_tab">
        <el-table ref="multipleTable" :key="tablekey" :data="dataList" stripe border :height="tableHeight + 'px'" show-summary tooltip-effect="dark" style="width:100%;" :default-sort="{prop: 'id', order: 'ascending'}">
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
      form: {},
      btnsize: 'mini',
      searchTime: [parseTime(new Date() - 60 * 24 * 60 * 60 * 1000), parseTime(new Date())],
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      groupList: [{
        name: '安发车组',
        truck: [{
          truckNumber: '粤L1Y998'
        },
        {
          truckNumber: '粤S1Y688'
        }]
      }],
      tableColumn: [{
        label: '序号',
        prop: 'number',
        width: '70',
        fixed: true
      }, {
        label: '车牌号码',
        prop: 'truckNumber',
        width: '110',
        fixed: true
      }, {
        label: '时间',
        prop: 'time',
        width: '150'
      }, {
        label: '速度 km/h',
        prop: 'speed',
        width: '100'
      }, {
        label: '方向',
        prop: 'dirction',
        width: '100'
      }, {
        label: '里程 km',
        prop: 'li',
        width: '80'
      },{
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
        prop: 'location'
      }
      ],
      total: 0,
      searchQuery: {
        currentPage: 1,
        pageSize: 100,
        vo: {}
      },
      tableHeight: '300'
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
      this.$message.warning('功能尚在开发中 ~')
    },
    exportData () { // 导出数据表格
      this.$message.warning('功能尚在开发中 ~')
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
          // loadJs('//webapi.amap.com/ui/1.0/main.js').then(() => {
          // this.initMap()
          // })
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
    submitForm() {
      this.$emit('success', this.thepos, this.thename, this.theobj)
      this.close()
    },
    fetchData() {
      console.log('this.orderdata.tmsOrderShipInfo:', this.orderdata.tmsOrderShipInfo)
      if (this.orderdata.tmsOrderShipInfo) {
        this.start = this.orderdata.tmsOrderShipInfo.shipFromCityName || '广州市'
        this.end = this.orderdata.tmsOrderShipInfo.shipToCityName || '杭州市'
        return
      }
    }
  }
}

</script>
