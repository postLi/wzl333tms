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
        <h6>初始化检查中<el-button type="primary"   plain @click="doAction" class="btn_qx">取消</el-button></h6>
        <p class="top_ts">当前检查：<span class="top_num">网点管理</span></p>
      </div>
      <progressbar :isani="showani" />
    </div>
    <div class="top_content" v-else-if="type===3">
      <h6>初始化检查已取消</h6>
      <p class="top_ts">（上次检查还有<span class="top_num">7</span>项基础数据未维护）</p>
    </div>
    <div class="top_content" v-else>
      <h6>初始化检查已完成，有2项基础功能没维护</h6>
      <p class="top_ts">（上次检查还有<span class="top_num">7</span>项基础数据未维护）</p>
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
         <ul>
           <li v-for="(item, index) in countList" :key="index">
             <p v-if="item.value > 0">
              <i :class="item.value > 0 ? 'el-icon-success ' : ''"></i>{{item.title}}: {{item.message}}，需要增加点击右边增加按钮。
             <el-button type="primary"  plain @click="doAction(item.label)" class="btn_qx1">增加</el-button>
             </p>
            <p v-else><i class="el-icon-warning"></i>网点管理：你还没有增加网点，请点击右边添加按钮。<el-button type="primary"   plain @click="addDoTotVisible = true" class="btn_qx">增加</el-button></p>
           </li>
         </ul>
         
         <!-- <template v-if="isParentOrg">
            <p v-if="dataset.orgCount > 0"><i :class="dataset.orgCount > 0 ? 'el-icon-success ' : ''"></i>网点管理：网点{{dataset.orgCount}}个，需要增加点击右边增加按钮。<el-button type="primary"   plain @click="addDoTotVisible = true" class="btn_qx1">增加</el-button></p>
            <p v-else><i class="el-icon-warning"></i>网点管理：你还没有增加网点，请点击右边添加按钮。<el-button type="primary"   plain @click="addDoTotVisible = true" class="btn_qx">增加</el-button></p>
         </template>
        

         <p v-if="dataset.roleCount > 0"><i :class="dataset.roleCount > 0 ? 'el-icon-success ' : ''"></i>权限管理：系统默认{{dataset.roleCount}}个角色权限，需要增加点击右边增加按钮。<el-button type="primary"   plain @click="doAction" class="btn_qx1">增加</el-button></p>
         <p v-else><i class="el-icon-warning"></i>权限管理：你还没有增加角色权限，请点击右边添加按钮。<el-button type="primary"   plain @click="doAction" class="btn_qx">增加</el-button></p>

         <p v-if="dataset.userCount > 0"><i :class="dataset.userCount > 0 ? 'el-icon-success ' : ''"></i>员工管理：已经有{{dataset.userCount}}位员工，需要增加请点击右边增加按钮。<el-button type="primary"   plain @click="doAction" class="btn_qx1">增加</el-button></p>
         <p v-else><i class="el-icon-warning"></i>员工管理：你还没有增加员工，请点击右边添加按钮。<el-button type="primary"   plain @click="doAction" class="btn_qx">增加</el-button></p>

        <p v-if="dataset.senderCustomerCount > 0">
          <i :class="dataset.senderCustomerCount > 0 ? 'el-icon-success ' : ''"></i>
           客户管理：已经有{{dataset.senderCustomerCount}}位发货客户，需要添加请点击右边增加按钮。
          <el-button type="primary"   plain @click="doAction" class="btn_qx1">增加</el-button>
        </p>
        <p v-else>
          <i class="el-icon-warning"></i>
          客户管理：你还没有添加发货客户，请点击右边增加按钮。
          <el-button type="primary"   plain @click="doAction" class="btn_qx">增加</el-button>
        </p>

        <p v-if="dataset.receiverCustomerCount > 0">
          <i :class="dataset.receiverCustomerCount > 0 ? 'el-icon-success ' : ''"></i>
           客户管理：已经有{{dataset.receiverCustomerCount}}位收货客户，需要增加请点击右边增加按钮。
          <el-button type="primary"   plain @click="doAction" class="btn_qx1">增加</el-button>
        </p>
        <p v-else>
          <i class="el-icon-warning"></i>
          客户管理：你还没有添加收货客户，请点击右边增加按钮。
          <el-button type="primary"   plain @click="doAction" class="btn_qx">增加</el-button>
        </p>


         <p v-if="dataset.driverCount > 0"><i :class="dataset.driverCount > 0 ? 'el-icon-success ' : ''"></i>司机管理：已经有{{dataset.driverCount}}位司机，需要增加请点击右边增加按钮。<el-button type="primary"   plain @click="doAction" class="btn_qx1">增加</el-button></p>
         <p v-else><i class="el-icon-warning"></i>员工管理：你还没有添加司机，请点击右边增加按钮。<el-button type="primary"   plain @click="doAction" class="btn_qx">增加</el-button></p>


        <p v-if="dataset.truckCount > 0">
          <i :class="dataset.truckCount > 0 ? 'el-icon-success ' : ''"></i>
           车辆管理：已经有{{dataset.truckCount}}部车辆，需要增加请点击右边增加按钮。
          <el-button type="primary"   plain @click="doAction" class="btn_qx1">增加</el-button>
        </p>
        <p v-else>
          <i class="el-icon-warning"></i>
          客户管理：你还没有添加车辆，请点击右边增加按钮。
          <el-button type="primary"   plain @click="doAction" class="btn_qx">增加</el-button>
        </p>

        <p v-if="dataset.carrierCount > 0">
          <i :class="dataset.carrierCount > 0 ? 'el-icon-success ' : ''"></i>
           承运商管理：已经有{{dataset.carrierCount}}个承运商，需要增加请点击右边增加按钮。
          <el-button type="primary"   plain @click="doAction" class="btn_qx1">增加</el-button>
        </p>
        <p v-else>
          <i class="el-icon-warning"></i>
          客户管理：你还没有添加承运商，请点击右边增加按钮。
          <el-button type="primary"  plain @click="doAction" class="btn_qx">增加</el-button>
        </p>


        <p v-if="dataset.settingCount > 0">
          <i :class="dataset.settingCount > 0 ? 'el-icon-success ' : ''"></i>
           系统设置：已完成打印机设置，需要增加请点击右边增加按钮。
          <el-button type="primary"   plain @click="doAction" class="btn_qx1">增加</el-button>
        </p>
        <p v-else>
          <i class="el-icon-warning"></i>
          系统设置：打印机连接还没连接，请点击右边设置按钮。
          <el-button type="primary"   plain @click="doAction" class="btn_qx">设置</el-button>
        </p> -->

        <ul>
          <!-- <li v-for="item in dataset"></li> -->
        </ul>
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
      dataset: [],
      type: 1,
      showani: false,
      viewKey: 0,
      addDoTotVisible: false,
      countList: [{
        value: 0,
        label: 'orgCount',
        title: '网点数量',
        message: '网点' + this.valueCount + '个'
      }, {
        value: 0,
        label: 'roleCount',
        title: '角色权限',
        message: '系统默认' + this.valueCount + '个角色权限'
      }]
      // NAMES:{
      //   orgCount: '网点数量',
      //   roleCount: '角色权限'
      // }
    }
  },
  computed: {
    isParentOrg() {
      return this.otherinfo.orgid === this.otherinfo.companyId
    }
  },
  mounted() {
    getInitializationCheck().then(data => {
      this.dataset = data
      var totals = 0
      for (const total in data) {
        if (data[total] === 0 || data[total] === null) {
          totals++
        }
      }
      console.log(totals, '数量')
      this.$set(this.dataset, 'totals', totals)
    })
  },
  methods: {
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
          this.checkSystem()
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
        console.log(this.countList)
      })
    },
    checkSystem() {
      this.viewKey = Math.random()
      this.type = 1
    }
  }
}
</script>
<style lang="scss">
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
        margin:10px;
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
        padding:10px 20px;
        transition: all 10s ease;
      }
    }
  }
}
</style>
