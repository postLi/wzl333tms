<template>
  <el-container class="check_box">
    <el-header :key="viewKey" style="height:87px">
      <div></div>
      <div class="top_content" v-if="type===1">
        <h6>系统体检：能帮助你在使用系统时检查哪些需要维护的数据，保证系统的完整性，帮您更好的使用系统。</h6>
        <p class="top_ts">（上次检查还有<span class="top_num">{{ dataset.totals}}项</span>基础数据未维护）</p>
      </div>
      <div class="box_top" v-else-if="type===2">
        <div class="top_content2">
          <i class="wzlicon"></i>
          <h6 v-if="!ischecked">初始化检查中<el-button type="primary"  plain @click="doAction('check')" class="btn_qx">{{ cancelAni ? '继续检查' : '取消'}}</el-button></h6>
          <h6 v-if="ischecked">初始化检查已完成，有<span class="top_num">{{dataset.totals}}</span>项基础功能没维护<el-button type="primary"   plain @click="doAction('agane')" class="btn_qx">重新检查</el-button></h6>
          <div class="top_ts" id="oTitle">
            <!-- <span class="center_title"  v-for="(item,index) in countList" :key="index" >当前检查：{{item.title}}</span> -->
            <ul>
              <!-- <li v-for="(item,index) in countList" :key="index" >当前检查：{{item.title}}</li> -->
              <li v-if="contTitleNull">{{contTitle}}</li>
            </ul>
          </div>
        </div>
        <progressbar :cancelAni="cancelAni" :isani="showani" />
      </div>
      <div class="top_content" v-else>
        <h6>初始化检查已完成，有{{dataset.totals}}项基础功能没维护</h6>
      </div>
    </el-header>
    <el-main>
      <div class="main_checker" v-if="type===1">
        <el-button type="primary" @click="doAction('init')">初始化检查</el-button>
      </div>
      <div class="main_checker2" v-else-if="type===2">
        <h6>公司管理</h6>
        <div class="company_content" :key="viewKey">
          <ul :class="{'showani': showani, 'cancelAni': cancelAni}" @animationend="ischecked = true">
            <li v-for="(item, index) in countList" :key="index">
              <p v-if="item.value > 0">
                <i :class="item.value > 0 ? 'el-icon-success ' : ''"></i>{{item.title}}: {{item.message ? item.message + '，' : ''}}{{item.message2}}
                <el-button type="primary" plain @click="doAction(item.label, item)" class="btn_qx1">{{item.button1}}</el-button>
              </p>
              <p v-else-if="item.value < 1 && item.label==='orgCount' && iscompany">
                <i class="el-icon-warning"></i>{{item.title}}：{{item.message1}}。
                <el-button type="error" plain @click="doAction(item.label, item)" class="btn_qx">{{item.button2}}</el-button>
              </p>
              <p v-else-if="item.value < 1 && item.label!=='orgCount'">
                <i class="el-icon-warning"></i>{{item.title}}：{{item.message1}}。
                <el-button type="primary" plain @click="doAction(item.label, item)" class="btn_qx">{{item.button2}}</el-button>
              </p>
            </li>
            <div class="btn_content">
              <p v-if="flog">所有的基础数据已经维护好了，我们去开一张单吧！
                <el-button type="primary" class="btn_kd" @click="doAction('order')">开单</el-button>
              </p>
              <p v-else>
                <el-button type="primary" class="btn_h">开单</el-button>
              </p>
            </div>
          </ul>
          <!-- <template v-if="isParentOrg">
          <p v-if="dataset.orgCount > 0"><i :class="dataset.orgCount > 0 ? 'el-icon-success ' : ''"></i>网点管理：网点{{dataset.orgCount}}个，需要增加点击右边增加按钮。<el-button type="primary"   plain @click="addDoTotVisible = true" class="btn_qx1">增加</el-button></p>
          <p v-else><i class="el-icon-warning"></i>网点管理：你还没有增加网点，请点击右边添加按钮。<el-button type="primary"   plain @click="addDoTotVisible = true" class="btn_qx">添加</el-button></p>
        </template> -->
        </div>
        <!-- 网点管理 -->
        <NewOrg v-if="addDoTotShow" :orgid="otherinfo.orgid" :companyId="otherinfo.companyId" :isModify="false" :popVisible="addDoTotVisible" @close="closeAddDot" @success="fetchData('addOrg')" :checkSystem="true" />
        <!-- 权限管理 -->
        <Newrole v-if="addDoTotShow1" :orgid="otherinfo.orgid" :createrId="otherinfo.id" :companyId="otherinfo.companyId" :isModify="false" :popVisible.sync="addDoTotVisible1" @close="closeAddDot" @success="fetchData('addRole')" :checkSystem="true" />
        <!-- 员工管理 -->
        <Newuser v-if="addDoTotShow2" :orgid="otherinfo.orgid" :companyId="otherinfo.companyId" :isModify="false" :popVisible.sync="addDoTotVisible2" @success="fetchData('addUser')" :checkSystem="true" />
        <!-- 发货客户 -->
        <AddCustomer v-if="addDoTotShow3" :issender="true" :orgid="otherinfo.orgid" :info="info" :companyId="otherinfo.companyId" :isModify="false" :popVisible.sync="addDoTotVisible3" @success="fetchData('addReciveCustomer')" :checkSystem="true" />
        <!-- 收货客户 -->
        <AddCustomer v-if="addDoTotShow4" :orgid="otherinfo.orgid" :info="info" :companyId="otherinfo.companyId" :isModify="false" :popVisible.sync="addDoTotVisible4" @success="fetchData('addSendCustomer')" :checkSystem="true" />
        <!-- 司机管理 -->
        <Newdriver v-if="addDoTotShow5" :companyId="otherinfo.companyId" :orgid="otherinfo.orgid" :popVisible.sync="addDoTotVisible5" @success="fetchData('addDiver')" :checkSystem="true" />
        <!-- 车辆管理 -->
        <Newtruck v-if="addDoTotShow6" :issender="true" :orgid="otherinfo.orgid" :companyId="otherinfo.companyId" :isModify="false" :popVisible.sync="addDoTotVisible6" @success="fetchData('addTruck')" :checkSystem="true" />
        <!-- 承运商管理 -->
        <Newcarrier v-if="addDoTotShow7" :issender="true" :orgid="otherinfo.orgid" :companyId="otherinfo.companyId" :isModify="false" :popVisible.sync="addDoTotVisible7" @success="fetchData('addCarrier')" :checkSystem="true" />
        <!-- 开单页面创建运单 -->
        <!-- 底部按钮操作部分 -->
        <!-- <FooterBtns :isChange="changeFlag" @doAction="doAction" @doCommand="handleCommand" /> -->
        <!-- 弹窗 -->
        <!-- <FeeDialog :dialogVisible.sync="dialogVisible" />
      <PersonDialog @success="getKeySetup" :dialogVisiblePerson.sync="dialogVisiblePerson" />
      <ManageRemarks @success="setRemark" :popVisible.sync="popVisible" /> -->
      </div>
      <!-- <div class="main_checker" v-else-if="type===3">
      <el-button type="primary" @click="initSystem">初始化检查</el-button>
    </div>
     <div class="main_checker" v-else-if="type===4">
      <el-button type="primary" @click="initSystem">初始化检查</el-button>
    </div> -->
      <div class="main_checker" v-else>
        <el-button type="primary" @click="initSystem">初始化检查</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { getInitializationCheck } from '@/api/common'
import progressbar from './components/progressbar'
import NewOrg from '@/views/company/groupManage/addDot'
import Newrole from '@/views/company/permissionManage/addRole'
import Newuser from '@/views/company/employeeManage/add'
import AddCustomer from '@/views/company/customerManage/components/add'
import Newdriver from '@/views/company/driverManage/components/add'
import Newtruck from '@/views/company/trunkManage/components/add'
import Newcarrier from '@/views/company/carrierManage/components/add'
import { mapGetters } from 'vuex'
// 创建运单页面
// import FooterBtns from '@/views/operation/order/createOrder/components/btns'
// import FeeDialog from '@/views/operation/order/createOrder/feePop'
// import PersonDialog from '@/views/operation/order/createOrder/personSetup'
// import ManageRemarks from '@/views/operation/order/createOrder/remarks'
export default {
  components: {
    progressbar,
    NewOrg,
    Newrole,
    Newuser,
    AddCustomer,
    Newdriver,
    Newtruck,
    Newcarrier
    // FooterBtns,
    // FeeDialog,
    // PersonDialog,
    // ManageRemarks
  },
  data() {
    return {
      // loading: false,
      info: {},
      ischecked: false,
      showAni: false,
      cancelAni: false,
      dataset: [],
      type: 1,
      showani: false,
      viewKey: 0,
      addDoTotShow: false,
      addDoTotShow1: false,
      addDoTotShow2: false,
      addDoTotShow3: false,
      addDoTotShow4: false,
      addDoTotShow5: false,
      addDoTotShow6: false,
      addDoTotShow7: false,
      addDoTotVisible: false,
      addDoTotVisible1: false,
      addDoTotVisible2: false,
      addDoTotVisible3: false,
      addDoTotVisible4: false,
      addDoTotVisible5: false,
      addDoTotVisible6: false,
      addDoTotVisible7: false,
      addDoTotVisible8: false,
      dialogVisible: false,
      dialogVisiblePerson: false,
      popVisible: false,
      contTitle: [],
      // printSetOrderVisible: false,
      flog: false,
      disabled: false,
      countList: [{
        value: 0,
        label: 'orgCount',
        title: '网点管理',
        message: '网点' + this.valueCount + '个',
        message1: '你还没有添加网点，请点击右边添加按钮',
        message2: '需要增加点击右边增加按钮',
        button1: '增加',
        button2: '添加',
        code: 'ORGTREELIST_ADD'
      }, {
          value: 0,
          label: 'userCount',
          title: '员工管理',
          message: '已经有' + this.valueCount + '位员工',
          message1: '你还没有添加员工，请点击右边添加按钮',
          message2: '需要增加点击右边增加按钮',
          button1: '增加',
          button2: '添加',
          code: 'ORGTREELIST_ADD'
        }, {
          value: 0,
          label: 'senderCustomerCount',
          title: '发货客户',
          message: '已经有' + this.valueCount + '位发货客户',
          message1: '你还没有添加发货客户，请点击右边添加按钮',
          message2: '需要增加点击右边增加按钮',
          button1: '增加',
          button2: '添加',
          code: 'SENDER_ADD'
        }, {
          value: 0,
          label: 'receiverCustomerCount',
          title: '收货客户',
          message: '已经有' + this.valueCount + '位收货客户',
          message1: '你还没有添加收货客户，请点击右边添加按钮',
          message2: '需要增加点击右边增加按钮',
          button1: '增加',
          button2: '添加',
          code: 'REVER_ADD'
        }, {
          value: 0,
          label: 'driverCount',
          title: '司机管理',
          message: '已经有' + this.valueCount + '位司机',
          message1: '你还没有添加司机，请点击右边添加按钮',
          message2: '需要增加点击右边增加按钮',
          button1: '增加',
          button2: '添加',
          code: 'DRIVER_ADD'
        }, {
          value: 0,
          label: 'truckCount',
          title: '车辆管理',
          message: '已经有' + this.valueCount + '部车辆',
          message1: '你还没有添加车辆，请点击右边添加按钮',
          message2: '需要增加点击右边增加按钮',
          button1: '增加',
          button2: '添加',
          code: 'TUNK_ADD'
        }, {
          value: 0,
          label: 'carrierCount',
          title: '承运商管理',
          message: '已经有' + this.valueCount + '个承运商',
          message1: '你还没有添加承运商，请点击右边添加按钮',
          message2: '需要增加点击右边增加按钮',
          button1: '增加',
          button2: '添加',
          code: 'CARRIER_ADD'
        }, {
          value: 0,
          label: 'settingCount',
          title: '系统设置',
          message: '',
          message2: '打印机连接已连接，需要设置点击右边设置按钮',
          message1: '打印机连接还没连接，请点击右边设置按钮',
          button1: '设置',
          button2: '设置',
          code: 'SETTING'
        }, {
          value: 0,
          label: 'smsTemplateCount',
          title: '短信设置',
          message: '已经有' + this.valueCount + '个短信模板',
          message1: '你还没有维护短信模板，请点击右边设置按钮',
          message2: '需要设置点击右边设置按钮',
          button1: '设置',
          button2: '设置',
          code: 'SMS'
        },
      {
        value: 0,
        label: 'fiSubjectCount',
        title: '财务科目设置',
        message: '已经有' + this.valueCount + '个财务科目',
        message1: '你还没有维护财务科目，请点击右边设置按钮',
        message2: '需要设置点击右边设置按钮',
        button1: '设置',
        button2: '设置',
        code: 'INIT_SUBJECT_DEFINE'
      }
      ],
      contTitleNull: false
    }
  },
  watch: {
    contTitle() {
      if (this.contTitle.length === 0) {
        this.contTitleNull = false
      } else {
        this.contTitleNull = true
      }
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    // 判断是否为公司网点
    iscompany() {
      return this.otherinfo.orgid === this.otherinfo.companyId
    }
  },
  mounted() {
    // this.loading = true
    this.isParentOrg()

    getInitializationCheck().then(data => {
      if (data) {
          this.dataset = data
          var totals = 0
          for (const total in data) {
            if (total !== 'roleCount' && data[total] === 0 && total !== 'smsTemplateCount') {
              if (this.iscompany) { // 如果是总公司那么就计算网点管理
                totals++
              } else {
                if (total !== 'orgCount') {
                  totals++
                }
              }
              console.log('---total', totals, total, data[total])
            }
            console.log(data[total], total, '数量')
          }
          if (totals > 0) {
            this.flog = false
          } else {
            this.flog = true
          }
          this.$set(this.dataset, 'totals', totals)
        }
    })
      .catch(err => {
        this._handlerCatchMsg(err)
      })
  },
  methods: {
    isParentOrg() {
      console.log('isParentOrg是否是总公司：', this.otherinfo.orgid === this.otherinfo.companyId)
      return this.otherinfo.orgid === this.otherinfo.companyId
    },
    fetchData(type) {
      // 写这么多分支，里面执行的代码不都是一样的的嘛。。。
      if (type === 'addUser') {
        this.initSystem()
      }
      if (type === 'addOrg') {
        this.initSystem()
        // this.closeAddDot()
      }
      if (type === 'addRole') {
        this.initSystem()
        // this.closeAddDot()
      }
      if (type === 'addReciveCustomer') {
        this.initSystem()
        // this.closeAddDot()
      }
      if (type === 'addSendCustomer') {
        this.initSystem()
        // this.closeAddDot()
      }
      if (type === 'addDiver') {
        this.initSystem()
        // this.closeAddDot()
      }
      if (type === 'addTruck') {
        this.initSystem()
        // this.closeAddDot()
      }
      if (type === 'addCarrier') {
        this.initSystem()
        // this.closeAddDot()
      }
      if (type === 'addSetting') {
        this.initSystem()
        // this.closeAddDot()
      }
    },
    closeAddDot(obj) {
      console.log(obj)
      this.addDoTotVisible = false
      this.addDoTotVisible1 = false
      this.addDoTotVisible2 = false
      this.addDoTotVisible3 = false
      this.addDoTotVisible4 = false
      this.addDoTotVisible5 = false
      this.addDoTotVisible6 = false
      this.addDoTotVisible7 = false
      this.addDoTotVisible8 = false
      this.dialogVisible = false
      this.dialogVisiblePerson = false
      this.popVisible = false
      // this.printSetOrderVisible = false
    },
    doAction(type, item) {
      if (item) { // 判断是否有权限添加信息
        let isCode = this.$_has_permission(item.code)
        if (!isCode) {
          this.$message.warning('您没有权限，请联系管理员！')
          return false
        }
      }
      switch (type) {
        case 'init':
          this.initSystem()
          break
        case 'check':
          this.cancelAni = !this.cancelAni
          if (this.cancelAni) {
            clearInterval(this.timer)
          } else {
            var idx = 0
            var arr = this.countList
            var len = this.countList.length
            var j = 0
            const self = this
            self.timer = setInterval(() => {
              this.contTitleNull = true
              if (idx < len) {
                self.contTitle = arr[j++].title
                idx++
              } else {
                clearInterval(self.timer)
                idx = 0
              }
            }, 150)
          }
          break
        case 'agane':
          this.type = 3
          this.ischecked = false
          this.initSystem()
          break
        case 'order':
          // this.dialogVisible = true
          // this.dialogVisiblePerson = true
          // this.popVisible = true
          // this.$router.push({ path: '../../operation/order/orderManage' })
          // this.eventBus.$emit('showCreateOrder', {
          // })
          this.$router.push({ path: '../../operation/order/createOrder' })
          break
        case 'orgCount':
          if (!this.addDriverShow) {
            this.addDoTotShow = true
            setTimeout(() => {
              this.addDoTotVisible = true
            })
          } else {
            this.addDoTotVisible = true
          }
          break
        case 'roleCount':
          if (!this.addDriverShow1) {
            this.addDoTotShow1 = true
            setTimeout(() => {
              this.addDoTotVisible1 = true
            })
          } else {
            this.addDoTotVisible1 = true
          }
          break
        case 'userCount':
          if (!this.addDriverShow2) {
            this.addDoTotShow2 = true
            setTimeout(() => {
              this.addDoTotVisible2 = true
            })
          } else {
            this.addDoTotVisible2 = true
          }
          break
        case 'senderCustomerCount':
          if (!this.addDriverShow3) {
            this.addDoTotShow3 = true
            setTimeout(() => {
              this.addDoTotVisible3 = true
            })
          } else {
            this.addDoTotVisible3 = true
          }
          break
        case 'receiverCustomerCount':
          if (!this.addDriverShow4) {
            this.addDoTotShow4 = true
            setTimeout(() => {
              this.addDoTotVisible4 = true
            })
          } else {
            this.addDoTotVisible4 = true
          }
          break
        case 'driverCount':
          if (!this.addDriverShow5) {
            this.addDoTotShow5 = true
            setTimeout(() => {
              this.addDoTotVisible5 = true
            })
          } else {
            this.addDoTotVisible5 = true
          }
          break
        case 'truckCount':
          if (!this.addDriverShow6) {
            this.addDoTotShow6 = true
            setTimeout(() => {
              this.addDoTotVisible6 = true
            })
          } else {
            this.addDoTotVisible6 = true
          }
          break
        case 'carrierCount':
          if (!this.addDriverShow7) {
            this.addDoTotShow7 = true
            setTimeout(() => {
              this.addDoTotVisible7 = true
            })
          } else {
            this.addDoTotVisible7 = true
          }
          break
        case 'settingCount':
          // this.addDoTotVisible8 = true
          this.$router.push({ path: '../../company/systemSetup' })
          break
        case 'smsTemplateCount':
          // this.addDoTotVisible8 = true
          this.$router.push({ path: '../../company/smsManage/customized' })
          break
        case 'fiSubjectCount':
          // this.addDoTotVisible8 = true
          this.$router.push({ path: '../../finance/financeInfo/subjectInfo' })
          break
      }
    },
    changeTitle(item) {
      console.log(item + 'uuuuu')
      this.initSystem()
    },

    initSystem() {
      this.viewKey = new Date().getTime()
      this.type = 2
      this.dataset = {}
      // options获取原来的数据
      this.countList = this.$options.data().countList
      getInitializationCheck().then(data => {
        this.showani = true
        this.dataset = data
        for (const item in this.countList) {
          this.countList[item].value = data[this.countList[item].label]
          this.countList[item].message = this.countList[item].message.replace(/undefined/, String(this.countList[item].value))
        }
        let resuct = 0
        for (const total in data) {
          if (total !== 'roleCount' && data[total] === 0) {
            resuct++
          }
        }
        if (data.isNeededVoucher === '2') {
          this.countList = this.countList.filter((e, index) => {
            return e.label !== 'fiSubjectCount'
          })
        }

        // for (var i = 0; i < this.countList.length; i++) {
        //   var j = 0
        //   var arr = this.countList
        //   setTimeout(() => {
        //     this.contTitle = arr[j++].title
        //     console.log(this.contTitle, 8888)
        //   }, i * 1000)
        // }

        var idx = 0
        var arr = this.countList
        var len = this.countList.length
        var j = 0
        const self = this

        function slideDown() {
          self.timer = setInterval(() => {
            if (idx < len) {
              // console.log(idx, len, arr[j].title, 666666)
              self.contTitle = arr[j++].title
              idx++
            } else {
              clearInterval(self.timer)
              idx = 0
            }
          }, 150)
        }
        slideDown()
        this.$set(this.dataset, 'totals', resuct)
      })
      .catch(err => {
        this._handlerCatchMsg(err)
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
    }
  }
}

</script>
<style lang="scss">
@keyframes showUlAni {
  0%,
  10% {
    height: 0;
  }
  11%,
  21% {
    height: 30px;
  }
  22%,
  32% {
    height: 60px;
  }
  33%,
  43% {
    height: 90px;
  }
  44%,
  54% {
    height: 120px;
  }
  55%,
  65% {
    height: 150px;
  }
  66%,
  76% {
    height: 180px;
  }
  77%,
  87% {
    height: 210px;
  }
  88%,
  99% {
    height: 240px;
  }
  100% {
    height: 100%;
  }
}

.check_box {
  min-width: 1100px;
  .el-header {
    margin-top: 20px;
    .top_content {
      border: 1px solid rgba(188, 188, 188, 1);
      height: 143px;
      background-image: url(../../assets/checkImg/bgo1.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover; // background-size: 100%;
      padding: 45px 54px;
      box-sizing: border-box;
      h6 {
        font-size: 22px;
        font-weight: normal;
        color: #ffffff;
      }
      .top_ts {
        margin-top: 8px;
        font-size: 16px;
        font-weight: normal;
        color: #ffffff;
        .top_num {
          color: #ff0000;
          margin: 0 5px;
          font-weight: bold
        }
      }
    }
    .box_top {
      .top_content2 {
        height: 140px;
        line-height: 24px;
        padding: 45px 126px;
        border: 1px solid #bcbcbc; // background-color: #09abff;
        background-image: url(../../assets/checkImg/bgo1.png);
        background-image: url(../../assets/checkImg/bgo1.png);
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        h6 {
          font-size: 30px;
          color: #fff;
          font-weight: normal;
          .btn_qx {
            padding: 4px 12px;
            border: 1px solid #fff;
            background: #409EFF;
            color: #fff;
            margin-left: 12px;
          }
          .btn_qx:hover {
            background: #fff;
            color: #409EFF;
          }
          .top_num {
            color: #ff0000;
            margin: 0 5px;
          }
        }
        .top_ts {
          width: 144px;
          height: 20px;
          font-size: 16px;
          font-weight: normal;
          color: #fff;
          overflow: hidden;
          margin-top: 10px;
          .center_title {
            color: #fff;
          }
        }
        .wzlicon {
          width: 40px;
          height: 45px;
          background-image: url(../../assets/checkImg/anquan.png);
          font-size: 45px;
          color: #fff;
          position: absolute;
          left: 62px;
          top: 35px;
        }
      }
    }
  }
  .el-main {
    .btn_qx {
      padding: 3px 10px;
      margin: 14px 0;
      font-size: 14px;
      width: 58px;
      float: right;
    }
    .btn_qx1 {
      width: 58px;
      padding: 3px 10px;
      margin: 14px 0;
      font-size: 14px;
      float: right;
      border: 1px solid rgba(188, 188, 188, 1);
      color: rgba(188, 188, 188, 1);
      display: block;
    }
     :hover.btn_qx1 {
      border: 1px solid #3e9ff1;
      background: #fff;
      color: #3e9ff1;
    }
    padding:0 20px;
    .main_checker {
      text-align: center;
      margin-top: 50px;
      .el-button {
        // width:300px;
        // height:66px;
        width: 260px;
        height: 60px;
        background-color: #07a6f9;
        font-size: 30px;
        margin-top: 20%;
      }
    }
    .main_checker2 {
      border: 1px solid rgba(188, 188, 188, 1); // padding:10px 40px;
      h6 {
        height: 46px;
        line-height: 46px;
        font-size: 16px;
        font-weight: normal;
        border-bottom: 1px solid rgba(188, 188, 188, 1);
      }
      p {
        font-size: 14px;
        .el-icon-success {
          color: rgb(0, 204, 0);
          margin-right: 10px;
        }
        .el-icon-warning {
          color: rgb(255, 0, 0);
          margin-right: 10px;
        }
      }
      .company_content {
        min-height: 320px; // padding:10px 20px;
        // display:none;
        margin-top: -11px;
        ul {
          height: 0;
          margin-top: 25px;
          overflow: hidden;
          animation: showUlAni 1.2s linear forwards;
          animation-play-state: paused;
          &.showani {
            animation-play-state: running;
          }
          &.cancelAni {
            animation-play-state: paused;
          }

          li {
            // height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
            padding: 0 60px;
          } // li{
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
      .btn_content {
        text-align: center;
        margin: 20px 0;
        .btn_kd {
          width: 110px;
          font-size: 16px;
        }
        .btn_h {
          width: 110px;
          font-size: 16px;
          background-color: #ccc;
          border: 1px solid #ccc;
        }
      } // .btn_content .btn_h:hover{
      //   opacity: 0.8;
      //   background:#fff;
      //   color:#3e9ff1;
      //   border:1px solid #3e9ff1;
      // }
    }
  }
}

</style>
