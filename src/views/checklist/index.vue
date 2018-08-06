<template>
<el-container :key="viewKey">
  <el-header style="height:87px">
    <div></div>
    <div class="top_content" v-if="type===1">
      <h6>初始化检查：能帮助你在使用系统时，哪些需要维护的数据，保证系统的完整性，帮忙你更好的使用系统。</h6>
      <p class="top_ts">（上次检查还有<span class="top_num">{{dataset.totals}}</span>项基础数据未维护）</p>
    </div>
    <div class="box_top" v-else-if="type===2">
      <div class="top_content2" >
        <i class="el-icon-warning wzlicon"></i>
        <h6 v-if="!ischecked" id="oTitle1">初始化检查中<el-button type="primary"  plain @click="doAction('check')" class="btn_qx">{{ cancelAni ? '继续检查' : '取消'}}</el-button></h6>
        <h6 v-if="ischecked" id="oTitle2">初始化检查已完成，有<span class="top_num">{{dataset.totals}}</span>项基础功能没维护<el-button type="primary"   plain @click="doAction('check')" class="btn_qx">重新检查</el-button></h6>
        <p class="top_ts">当前检查：<span class="top_num">网点管理</span></p>
      </div>
      <progressbar :cancelAni="cancelAni" :isani="showani" />
    </div>
    <div class="top_content" v-else-if="type===3">
      <h6>初始化检查已取消</h6>
      <p class="top_ts">（上次检查还有<span class="top_num">7</span>项基础数据未维护）</p>
    </div>
    <div class="top_content" v-else>
      <h6>初始化检查已完成，有{{dataset.totals}}项基础功能没维护</h6>
    </div>
    <!-- <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress> -->
  </el-header>
  <el-main>
    <div class="main_content" v-if="type===1">
      <el-button type="primary" @click="doAction('init')">初始化检查</el-button>
    </div>
    <div class="main_content2" v-else-if="type===2">
      <!-- 初始化检查中
      <el-button type="primary" @click="doAction('check')">初始化检查中 返回</el-button> -->
      <h6>公司管理</h6>
      <div class="company_content">
        <ul  id="oDiv" :class="{'showani': showani, 'cancelAni': cancelAni}" @animationend="ischecked = true">
          <li v-for="(item, index) in countList" :key="index">
            <p v-if="item.value > 0">
              <i :class="item.value > 0 ? 'el-icon-success ' : ''"></i>{{item.title}}: {{item.message}}，{{item.message1}}
              <el-button type="primary"  plain @click="doAction(item.label)" class="btn_qx1">{{item.button1}}</el-button>
            </p>
            <p v-else-if="item.value < 1 && item.label==='orgCount' && !isParentOrg">
              <i class="el-icon-warning"></i>{{item.title}}：{{item.message1}}。
              <el-button type="error"   plain @click="addDoTotVisible = true" class="btn_qx">{{item.button2}}</el-button>
            </p>
            <p v-else-if="item.value < 1 && item.label!=='orgCount'">
              <i class="el-icon-warning"></i>{{item.title}}：{{item.message1}}。
              <el-button type="primary"   plain @click="addDoTotVisible = true" class="btn_qx">{{item.button2}}</el-button>
            </p>
          </li>
        </ul>
        <!-- <template v-if="isParentOrg">
          <p v-if="dataset.orgCount > 0"><i :class="dataset.orgCount > 0 ? 'el-icon-success ' : ''"></i>网点管理：网点{{dataset.orgCount}}个，需要增加点击右边增加按钮。<el-button type="primary"   plain @click="addDoTotVisible = true" class="btn_qx1">增加</el-button></p>
          <p v-else><i class="el-icon-warning"></i>网点管理：你还没有增加网点，请点击右边添加按钮。<el-button type="primary"   plain @click="addDoTotVisible = true" class="btn_qx">添加</el-button></p>
        </template> -->
        
      </div>
      <div class="btn_content" v-if="flog">
        <p>所有的基础数据已经维护好了，我们去开一张单吧！<el-button type="primary" class="btn_kd">开单</el-button></p>
      </div>
      <NewOrg :orgid="otherinfo.orgid"  :companyId="otherinfo.companyId" :isModify="false" @success="addNewSuccess('addorg')"  :popVisible="addDoTotVisible" @close="closeAddDot" />
    </div>
     <div class="main_content" v-else-if="type===3">
      <el-button type="primary" @click="initSystem">初始化检查</el-button>
    </div>
     <div class="main_content" v-else-if="type===4">
      <el-button type="primary" @click="initSystem">初始化检查</el-button>
    </div>
     <div class="main_content" v-else>
      <el-button type="primary" @click="initSystem">初始化检查</el-button>
    </div>
    
  </el-main>
  
</el-container>
 
</template>
<script>
import { getInitializationCheck } from '@/api/common'
import progressbar from './components/progressbar'
import NewOrg from '@/views/company/groupManage/addDot'

export default {
  components: {
    progressbar,
    NewOrg
  },
  data() {
    return {
      ischecked: false,
      showAni: false,
      cancelAni: false,
      dataset: [],
      type: 1,
      showani: false,
      viewKey: 0,
      addDoTotVisible: false,
      flog: false,
      countList: [{
        value: 0,
        label: 'orgCount',
        title: '网点管理',
        message: '网点' + this.valueCount + '个',
        message1: '你还没有添加网点，请点击右边添加按钮',
        button1: '增加',
        button2: '添加'
      }, {
        value: 0,
        label: 'roleCount',
        title: '权限管理',
        message: '系统默认' + this.valueCount + '个角色权限',
        message1: '你还没有添加角色权限，请点击右边添加按钮',
        button1: '增加',
        button2: '添加'
      }, {
        value: 0,
        label: 'userCount',
        title: '员工管理',
        message: '已经有' + this.valueCount + '位员工',
        message1: '你还没有添加员工，请点击右边添加按钮',
        button1: '增加',
        button2: '添加'
      }, {
        value: 0,
        label: 'senderCustomerCount',
        title: '客户管理',
        message: '已经有' + this.valueCount + '位发货客户',
        message1: '你还没有添加发货客户，请点击右边添加按钮',
        button1: '增加',
        button2: '添加'
      }, {
        value: 0,
        label: 'receiverCustomerCount',
        title: '客户管理',
        message: '已经有' + this.valueCount + '位收货客户',
        message1: '你还没有添加收货客户，请点击右边添加按钮',
        button1: '增加',
        button2: '添加'
      }, {
        value: 0,
        label: 'driverCount',
        title: '司机管理',
        message: '已经有' + this.valueCount + '位司机',
        message1: '你还没有添加司机，请点击右边添加按钮',
        button1: '增加',
        button2: '添加'
      }, {
        value: 0,
        label: 'truckCount',
        title: '车辆管理',
        message: '已经有' + this.valueCount + '部车辆',
        message1: '你还没有添加车辆，请点击右边添加按钮',
        button1: '增加',
        button2: '添加'
      }, {
        value: 0,
        label: 'carrierCount',
        title: '承运商管理',
        message: '已经有' + this.valueCount + '个承运商',
        message1: '你还没有添加承运商，请点击右边添加按钮',
        button1: '增加',
        button2: '添加'
      }, {
        value: 0,
        label: 'settingCount',
        title: '系统设置',
        message: '打印机连接已连接，需要设置点击右边设置按钮',
        message1: '打印机连接还没连接，请点击右边设置按钮',
        button1: '设置',
        button2: '设置'
      }]
    }
  },
  mounted() {
    this.isParentOrg()
    getInitializationCheck().then(data => {
      this.dataset = data
      var totals = 0
      for (const total in data) {
        if (data[total] === 0 || data[total] === null) {
          totals++
        }
      }
      if (totals > 0) {
        this.flog = false
      } else {
        this.flog = true
      }

      console.log(totals, '数量')
      this.$set(this.dataset, 'totals', totals)
    })
  },
  methods: {
    isParentOrg() {
      console.log('asdasd', this.otherinfo.orgid === this.otherinfo.companyId)
      return this.otherinfo.orgid === this.otherinfo.companyId
    },
    addNewSuccess(type) {
      if (type === 'addorg') {
        // ..
      }
    },
    closeAddDot() {
      this.addDoTotVisible = false
    },
    doAction(type) {
      switch (type) {
        case 'init':
          this.initSystem()
          break
        case 'check':
          // this.checkSystem()
          // this.type = 3
          this.cancelAni = !this.cancelAni
          break
        case 'orgCount':
          this.addDoTotVisible = true
          break
      }
    },
    initSystem() {
      this.viewKey = Math.random()
      this.type = 2

      getInitializationCheck().then(data => {
        this.showani = true
        this.dataset = data
        for (const item in this.countList) {
          this.countList[item].value = data[ this.countList[item].label]
          this.countList[item].message = this.countList[item].message.replace(/undefined/, String(this.countList[item].value))
        }
        var resuct = 0
        for (const total in data) {
          if (data[total] === 0 || data[total] === null) {
            resuct++
          }
        }
        this.$set(this.dataset, 'totals', resuct)
        // console.log(resuct, '数量0000')
        /* const oDiv = document.getElementById('oDiv')
        const liList = oDiv.querySelectorAll('li')
        const oTitle1 = document.getElementById('oTitle1')
        const oTitle2 = document.getElementById('oTitle2')
        oTitle2.style.display = 'none'
        var idx = 0
        function slideDown() {
          var t = setInterval(function() {
            if (idx < liList.length) {
              liList[idx].style.display = 'block'
              // oTitle1.style.display = 'none'
              // oTitle2.style.display = 'block'
              idx++
            } else {
              clearInterval(t)
            }
          }, 100)
        }
        slideDown() */
      })
    },
   /*  initSystem() {
      this.viewKey = Math.random()
      this.type = 2

      getInitializationCheck().then(data => {
        this.showani = true
        this.dataset = data
        for (const item in this.countList) {
          this.countList[item].value = data[ this.countList[item].label]
          this.countList[item].message = this.countList[item].message.replace(/undefined/, String(this.countList[item].value))
        }
        var resuct = 0
        for (const total in data) {
          if (data[total] === 0 || data[total] === null) {
            resuct++
          }
        }
        this.$set(this.dataset, 'totals', resuct)
        // console.log(resuct, '数量0000')
        const oDiv = document.getElementById('oDiv')
        const liList = oDiv.querySelectorAll('li')
        const oTitle1 = document.getElementById('oTitle1')
        const oTitle2 = document.getElementById('oTitle2')
        oTitle2.style.display = 'none'
        var idx = 0
        function slideDown() {
          var t = setInterval(function() {
            if (idx < liList.length) {
              liList[idx].style.display = 'block'
              // oTitle1.style.display = 'none'
              // oTitle2.style.display = 'block'
              idx++
            } else {
              clearInterval(t)
            }
          }, 100)
        }
        slideDown()
      })
    }, */
    checkSystem() {
      this.viewKey = Math.random()
      this.type = 1
    },
    stopAnimate() {
      // this.slideDown()
    }
  }
}
</script>
<style lang="scss">
@keyframes showUlAni{
  0%,10%{
    height: 0;
  }
  11%, 21%{
    height: 30px;
  }
  22%, 32%{
    height: 60px;
  }
  33%, 43%{
    height: 90px;
  }
  44%, 54%{
    height: 120px;
  }
  55%, 65%{
    height: 150px;
  }
  66%, 76%{
    height: 180px;
  }
  77%, 87%{
    height: 210px;
  }
  88%, 99%{
    height: 240px;
  }
  100%{
    height: 100%;
  }
}
.el-container{
  .el-header{
     margin-top:20px;
    .top_content{
        border:1px solid rgba(188, 188, 188, 1);
        height: 87px;
        background:rgb(250,245,231);
        padding: 15px 60px;
        h6{
          font-size: 17px;
          color:rgba(190, 134, 51, 1);
          font-weight: normal;
        }
        .top_ts{
          margin-top:8px;
          font-size: 15px;
          font-weight: normal;
          color: #333333;
          .top_num{
            color:#ff0000;
          }
        }
    }
    .box_top{
      .top_content2{
        height: 75px;
        line-height: 24px;
        padding: 10px 103px;
        border: 1px solid #bcbcbc;
        background: #99ccff;
        position: relative;
        h6{
          font-size: 17px;
          color:#fff;
          font-weight: normal;
          .btn_qx{
            padding: 4px 12px;
            border:1px solid #fff;
            background:#99ccff;
            color:#fff;
            margin-left:12px;
          }
        }
        .top_ts{
          margin-top:8px;
          font-size: 15px;
          font-weight: normal;
          color: #fff;
          .top_num{
            color:#fff;
          }
        }
        .wzlicon{
          font-size: 40px;
          color:#fff;
          position:absolute;
          left:26px;
          top:14px;
        }
      }
    }
    
  }
  .el-main{
    .btn_qx{
      padding: 3px 10px;
      margin-left:12px;
      font-size:12px;
    }
    .btn_qx1{
      padding: 3px 10px;
      margin-left:12px;
      font-size:12px;
      border:1px solid rgba(188, 188, 188, 1);
      color:rgba(188, 188, 188, 1);
    }
    
    padding:0 20px;
    .main_content{
      text-align: center;
      .el-button{
        width:300px;
        height:66px;
        font-size:20px;
        margin-top:20%;
      }
    }
    .main_content2{
      border:1px solid rgba(188, 188, 188, 1);
      padding:10px 40px;
     
      h6{
        height: 46px;
        line-height: 46px;
        font-size: 16px;
        font-weight: normal;
         border-bottom: 1px solid  rgba(188, 188, 188, 1);
      }
      p{
        font-size:14px;
        .el-icon-success{
          color: rgb(0,204,0);
          margin-right: 10px;
        }
        .el-icon-warning{
          color:rgb(255,0,0); 
          margin-right: 10px;
        }
      }
      .company_content{
        min-height: 320px;
        padding:10px 20px;
        // display:none;
        ul{
          height: 0;
          overflow: hidden;
          animation: showUlAni 10s linear  forwards;
          animation-play-state: paused;
          &.showani{
            animation-play-state: running;
          }
          &.cancelAni{
            animation-play-state: paused;
          }

          li{
            height: 30px;
          }
          // li{
          //   width: 100%;
          //   animation:myfirst 4s;
          //   -moz-animation:myfirst 4s; /* Firefox */
          //   -webkit-animation:myfirst 4s; /* Safari and Chrome */
          //   -o-animation:myfirst 4s; /* Opera */
          // }
          // @keyframes myfirst
          // {
          // from {width: 0%;height: 0%;}
          // to {width: 100%;}
          // }
          // @-moz-keyframes myfirst /* Firefox */
          // {
          // from {width: 0%;height: 0%;}
          // to {width: 100%;}
          // }
          // @-webkit-keyframes myfirst /* Safari and Chrome */
          // {
          // from {width: 0%;height: 0%;}
          // to {width: 100%;}
          // }
          // @-o-keyframes myfirst /* Opera */
          // {
          // from {width: 0%;height: 0%;}
          // to {width: 100%;}
          // }
        }
      }
      .btn_content{
        text-align: center;
        //  display:none;
        .btn_kd{
          width:110px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
