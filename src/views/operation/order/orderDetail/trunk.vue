<template>
  <div class="orderinfo-manager" v-loading="loading" >
    <div id="allmap"></div>
  </div>
</template>
<script>
// 请求接口
import orderManage from '@/api/operation/orderManage'
import { loadJs } from '@/utils/'

window.initBaiduMap = false
window.initialize = function() {
  window.initBaiduMap = true
}
export default {
  props: {
    orderid: [String, Number],
    orderdata: [Object]
  },
  data() {
    return {
      loading: false
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
    this.init(2222)
  },
  methods: {
    initMap() {
      const BMap = window.BMap
      if (BMap) {
        var map = new BMap.Map('allmap', { minZoom: 5 })

        map.addControl(new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        }))

        map.centerAndZoom(new BMap.Point(116.404, 39.915), 7)
        // 三种驾车策略：最少时间，最短距离，避开高速
        var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS]

        var start = this.start || '广州市'
        var end = this.end || '杭州市'
        // 所在网点
        var arr = new Array(1)
        // arr[0] = '上饶'
        map.clearOverlays()
        map.enableScrollWheelZoom(true)     // 开启鼠标滚轮缩放

        function search(start, end, route) {
          var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }, policy: route })
          driving.search(start, end)
        }

        search(start, end, routePolicy[0])
        var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }})
        driving.search(start, end, { waypoints: arr })// waypoints
      } else {
        console.error('=========加载地图失败=======')
      }
    },
    loadMap() {
      if (window.BMap) {
        return Promise.resolve('')
      } else {
        return new Promise((resolve, reject) => {
          loadJs('http://api.map.baidu.com/api?v=2.0&ak=ycTgY5YTSnk5PsqumqZboxtXaKU6Io6K&callback=initialize').then(() => {
            const fn = () => {
              if (!window.initBaiduMap) {
                setTimeout(() => {
                  fn()
                }, 200)
              } else {
                resolve()
              }
            }
            fn()
          }).catch(() => {
            reject()
          })
        })
      }
    },

    init(fromflag) {
      console.log('fromflag:', fromflag)
      this.fetchData()
      return Promise.all([this.loadMap()]).then(() => {
        this.initMap()
      })
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
<style lang="scss">
#allmap{height:100%;width:100%;}
</style>
