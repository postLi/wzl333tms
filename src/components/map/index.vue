<template>
<el-dialog custom-class="aflcmap-pop-wrapper" title="地图" @close="close" :visible.sync="dialogTableVisible">
 <div id="mapcontainer"></div>
 <div id="myPageTop">
    <table>
        <tr>
            <td>
                <label>请输入关键字：</label>
            </td>
        </tr>
        <tr>
            <td>
                <input ref="tipinput" id="tipinput"/>
            </td>
        </tr>
    </table>
</div>
<div class="aflcmap-pop-footer" slot="footer">
  <div class="addrname">当前选中的地址：{{this.thename}}<br>当前经纬度信息：{{this.thepos}}</div>
  <el-button type="primary" :disabled="noinfo" @click="submitForm">确 定</el-button>
  <el-button type="info" @click="close">取 消</el-button>
  
</div>
</el-dialog>
</template>
<script>
import { loadJs } from '@/utils/'
export default {
  props: {
    pos: {
      type: [String, Array],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    popVisible(newVal) {
      this.init()
    },
    name() {
      this.thename = this.name
    },
    pos() {
      this.thepos = this.pos
    }
  },
  mounted() {
    // this.dialogTableVisible = this.popVisible

  },
  created() {

  },
  // 关闭时清空地图数据
  destoryed() {
    this.exit()
  },
  data() {
    return {
      noinfo: true,
      dialogTableVisible: false,
      thepos: '',
      thename: '',
      theobj: {}
    }
  },
  methods: {
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
      // 当为展现时，初始化
      if (this.popVisible) {
        this.thepos = this.pos
        this.thename = this.name
        this.loadMap()
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
        loadJs('https://webapi.amap.com/maps?v=1.4.8&key=e61aa7ddc6349acdb3b57c062080f730&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder').then(() => {
         // loadJs('//webapi.amap.com/ui/1.0/main.js').then(() => {
          this.initMap()
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
      _this.map = new AMap.Map('mapcontainer', {
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
        content: ''  // 使用默认信息窗体框样式，显示信息内容
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
      AMap.event.addListener(auto, 'select', select)// 注册监听，当选中某条记录时会触发
      AMap.event.addListener(placeSearch, 'markerClick', function(e) {
        const loc = e.data.location
        findInfo(loc)
        // findInfo(loc)
      })
      function select(e) {
        console.log('select e:', e)
        placeSearch.setCity(e.poi.adcode)
        //
        placeSearch.search(e.poi.name)  // 关键字查询查询
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
    }
  }
}
</script>
<style lang="scss">
.aflcmap-pop-wrapper{
  width: 70%;
  min-width: 400px;

  .el-dialog__body{
    position: relative;
    height: 500px;
    
  }
}
#mapcontainer {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
}

.button-group {
	position: absolute;
	bottom: 20px;
	right: 20px;
	font-size: 12px;
	padding: 10px;
}

.button-group .button {
	height: 28px;
	line-height: 28px;
	background-color: #0D9BF2;
	color: #FFF;
	border: 0;
	outline: none;
	padding-left: 5px;
	padding-right: 5px;
	border-radius: 3px;
	margin-bottom: 4px;
	cursor: pointer;
}
.button-group .inputtext {
	height: 26px;
	line-height: 26px;
	border: 1px;
	outline: none;
	padding-left: 5px;
	padding-right: 5px;
	border-radius: 3px;
	margin-bottom: 4px;
	cursor: pointer;
}
.amap-info-content {
	font-size: 12px;
}

#myPageTop {
	position: absolute;
	top: 5px;
	right: 10px;
	background: #fff none repeat scroll 0 0;
	border: 1px solid #ccc;
	margin: 10px auto;
	padding:6px;
	font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
	font-size: 14px;
}
#myPageTop label {
  margin: 0 20px 10px 0;
  display: inline-block;
	color: #666666;
	font-weight: normal;
}
#myPageTop input {
  width: 250px;
  height: 30px;
  line-height: 30px;
}
#myPageTop .column2{
	padding-left: 25px;
}
.amap-sug-result{
  z-index: 3999;
}
</style>
