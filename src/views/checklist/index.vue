<template>
<el-container :key="viewKey">
  <el-header style="height:87px">
    <div></div>
    <div class="top_content" v-if="type===1">
      <h6>初始化检查：能帮助你在使用系统时，哪些需要维护的数据，保证系统的完整性，帮忙你更好的使用系统。</h6>
      <p class="top_ts">（上次检查还有<span class="top_num">7</span>项基础数据未维护）</p>
    </div>
    <div class="box_top" v-else-if="type===2">
      <div class="top_content2" >
        <i class="el-icon-warning wzlicon"></i>
        <h6>初始化检查中<el-button type="primary"   plain @click="doAction('send')" class="btn_qx">取消</el-button></h6>
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
       <p>{{dataset.driverCount}}</p>
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
export default {
  components: {
    progressbar
  },
  data() {
    return {
      dataset: [],
      type: 1,
      showani: false,
      viewKey: 0
    }
  },
  mounted() {

  },
  methods: {
    doAction(type) {
      switch (type) {
        case 'init':
          this.initSystem()
          break
        case 'check':
          this.checkSystem()
          break
      }
    },
    initSystem() {
      this.viewKey = Math.random()
      this.type = 2
      getInitializationCheck().then(data => {
        this.showani = true
        this.dataset = data
        console.log(data)
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
            // height: 25px;
            // line-height: 3px;
            padding: 4px 12px;
            border:1px solid #fff;
            background:#99ccff;
            color:#fff;
            margin-left:12px;
            // .el-button--primary.is-pla{
            //   line-height: 6px;
            // }
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
    .main_content{
      text-align: center;
      // position: relative;
      .el-button{
        // position:absolute;
        width:300px;
        height:66px;
        font-size:20px;
        margin-top:20%;
      }
    }
    .main_content2{
      border:1px solid rgba(188, 188, 188, 1);
    }
  }
}
</style>
