<template>
  <pop-right :title="popTitle" :isShow="popVisible" @close="closeMe" class="addDriverPop" v-loading="loading">
    <template class="addDriverPop-content" slot="content">
      <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" :inline="true" label-position="right" size="mini">
        <div class="box1">
          <h4 class="titles">运单信息</h4>
          <el-form-item label="运单号" prop="shipSn">
            <el-input v-model="form.shipSn" @change="fetchShipInfo('shipSn')" maxlength="20" auto-complete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="货号" prop="shipGoodsSn">
            <el-input v-model="form.shipGoodsSn"  @change="fetchShipInfo('shipGoodsSn')" maxlength="20" auto-complete="off"></el-input>
          </el-form-item>
  
          <el-form-item label="开单时间" prop="createTime">
            <el-input v-model="form.createTime" maxlength="20" auto-complete="off" disabled="disabled" ></el-input>
          </el-form-item>
          <el-form-item label="货品名" prop="cargoName">
            <el-input v-model="form.cargoName" maxlength="18" auto-complete="off" disabled="disabled" ></el-input>
          </el-form-item>
          <el-form-item label="包装" prop="cargoPack">
            <el-input v-model="form.cargoPack" maxlength="20" auto-complete="off" disabled="disabled" ></el-input>
          </el-form-item>
          <el-form-item label="件数" prop="cargoAmount">
            <el-input v-model="form.cargoAmount" maxlength="20" auto-complete="off" disabled="disabled" ></el-input>
          </el-form-item>
        </div>
        <div class="box1" style="height:600px">
           <h4 class="titles">异常登记</h4>
          <el-form-item label="异常编号" prop="abnormalNo">
          <el-input maxlength="20" v-model="form.abnormalNo" auto-complete="off"  disabled="disabled" ></el-input>
          </el-form-item>
          <el-form-item label="登记时间" prop="registerTime">
            <el-input v-model="form.registerTime" maxlength="20" auto-complete="off" disabled="disabled" ></el-input>
            <!-- <template slot-scope="scope">{{ scope.row.registerTime | parseTime('{y}{m}{d}') }}</template> -->
          </el-form-item>
          <el-form-item label="登记网点" prop="orgId"  >
            <SelectTree v-model="form.orgId" disabled="disabled"/>
          </el-form-item>
          <el-form-item label="登记人" prop="disposeName" >
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="form.disposeName"
              :fetch-suggestions="querySearch"
              placeholder="请选择员工~"
              @select="handleSelect">
              <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="异常类型" prop="abnormalType">
            <SelectType v-model="form.abnormalType" type="abnormal_type" />
          </el-form-item>
          <el-form-item label="异常件数" prop="abnormalAmount">
            <el-input v-model="form.abnormalAmount" maxlength="20" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="处理网点" prop="disposeOrgId">
            <SelectTree v-model="form.disposeOrgId" />
          </el-form-item>
          <el-form-item label="异常金额" prop="registerFee">
            <el-input v-model="form.registerFee" maxlength="20" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="责任网点" prop="dutyOrgId">
            <SelectTree v-model="form.dutyOrgId" />
          </el-form-item>
        <el-form-item class="driverRemarks" label="异常描述" prop="abnormalDescribe">
          <el-input type="textarea" maxlength="125" v-model="form.abnormalDescribe"></el-input>
          <p class="ts">注意：问题描述最多输入200字</p>
          <p><label>图片上传</label><em class="ts">注：最多可上传6张图片，每张图片不能大于5M</em></p>
        </el-form-item>

        <div class="clearfix uploadcard">
          <upload :title="'本地上传'" :showFileList="true" :limit="6" listtype="picture"  v-model="form.abnormalPicture" />
        </div>
        
        </div>
      </el-form>
    </template>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </pop-right>
</template>
<script>
import { REGEX }  from '@/utils/validate'
import {GetAbnormalNo, PostNewAbnormal, PutXiuGai,GetLook } from '@/api/operation/dashboard'
import {getAllUser} from '@/api/company/employeeManage'
import orderManage from '@/api/operation/orderManage'
import popRight from '@/components/PopRight/index'
import Upload from '@/components/Upload/singleImage'
import SelectTree from '@/components/selectTree/index'
import SelectType from '@/components/selectType/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    popRight,
    Upload,
    SelectTree,
    SelectType
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    orgid: {
      required: true
    },
    isModify: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number,String]
    },
    companyId: {
      type: [Number,String]
    },
    info: {
      type: Object,
      default: () => {}
    },
    licenseTypes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
      ...mapGetters([
          'otherinfo'
      ])
  },
  data () {
    const _this = this
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    }

    const validateFormMobile = function (rule, value, callback) {
      if(REGEX.MOBILE.test(value)){
        callback()
      } else {
        callback(new Error('请输入有效的手机号码'))
      }
    }

    const validateFormNumber = function (rule, value, callback) {
      console.log('rule:', rule)
      _this.form[rule.field] = value.replace(REGEX.NO_NUMBER, '')
      callback()
    }

    return {
      form: {
        "abnormalAmount": "",
        "abnormalDescribe": "",
        "abnormalNo": "",
        "abnormalPicture": "",
        "abnormalStatus": "",
        "abnormalType": '',
        "childShipId": "",
        "createTime": "",
        "disposeOpinion": "",
        "disposeOrgId": "",
        "disposePicture": "",
        "disposeResult": "",
        "disposeTime": "",
        "disposeUserId": "",
        "dutyOrgId": "",
        "orgId": "",
        "registerFee": "",
        "registerUserId": "",
        "shipId": ""
      },
      formLabelWidth: '80px',
      tooltip: false,
      rules: {
        driverName: [
          { required: true, message: '请输入司机名称', trigger: 'blur' }
        ],
        orgid: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        driverMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur', pattern: REGEX.MOBILE }
          // { validator: validateFormNumber, trigger: 'change'}
        ]
      },
      // fileList2:[],
      popTitle: '',
      orgArr: [],
      rolesArr: [],
      departmentArr: [],
      loading: false,
      roles: [],
      departments: [],
      groups: [],
      inited: false,
      disabled:'',
      resInfo: [],
      pickOption2: {
        firstDayOfWeek:1,
        disabledDate(time) {
          return time .getTime() < Date.now()
        }
      }

    }
  },
  mounted () {
    this.form.orgid = this.orgid
    if(!this.inited){
      this.inited = true
      this.initInfo()
    }
   
     
  },
  watch: {
    popVisible (newVal, oldVal) {
      if(!this.inited){
        this.inited = true
        this.initInfo();
      }
    },
    orgid (newVal) {
      this.form.orgid = newVal
    },
    isModify: {
      handler(newVal) {
        if(this.isModify){
          this.popTitle = '异常修改'
          GetLook(this.id).then(res => {
            this.form = res;
          })
        }else{
          this.popTitle = '异常登记'
          this.form.orgId = this.orgid
          this.form.registerTime = new Date().toString();
          this.dengji();   
        }
      },
      immediate: true
    }
    // info () {
    //   if(this.isModify){
    //     this.popTitle = '异常修改'
    //     let data = Object.assign({},this.info)
    //     for(let i in this.form){
    //       this.form[i] = data[i]
    //     }
    //     this.form.id = data.id
    //   } else {
    //     this.popTitle = '异常登记'
    //     for(let i in this.form){
    //       this.form[i] = ''
    //     }
    //     delete this.form.id
    //     this.form.orgid = this.orgid
    //   }
    // }
  },
  methods: {
    // handleRemove(file, fileList) {
    //     console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    dengji(){
      return GetAbnormalNo().then(res=>{
          // this.form = res;
          this.form.abnormalNo = res
          console.log(res, "this.form.abnormalNo: ", this.form);
        })
    },
    querySearch(queryString, cb) {
        var restaurants = this.resInfo;
        var results = queryString ? restaurants.filter(item => {
          return item.name ? item.name.indexOf(queryString) !== -1 : false
        }) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return restaurant.name.indexOf(queryString) !== -1
        };
      },
      handleSelect(item) {
        this.form.disposeName = item.name
      },
    initInfo () {
      this.loading = false
      getAllUser(this.orgid, '', '').then(res=>{
        this.resInfo = res.list
      })
    },
    getOrgid (id) {
      this.form.orgid = id
    },
    fetchShipInfo (type) {
      orderManage.getFindByShipSnOrGoodSn({
        [type]: this.form[type]
      }).then(res => {
        let data = res.data
        this.form.shipSn = data.shipSn
        this.form.shipGoodsSn = data.shipGoodsSn
        this.form.createTime = data.createTime
        this.form.cargoName = data.cargoName
        this.form.cargoPack = data.cargoPack
        this.form.cargoAmount = data.cargoAmount
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let data = Object.assign({},this.form)
          data.fixPhone = this.fixPhone
          let promiseObj
          // 判断操作，调用对应的函数
          if(this.isModify){
            promiseObj = PutXiuGai(data)
          } else {
            promiseObj = PostNewAbnormal(data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.closeMe()
                this.$emit('success')
              }
            });
          }).catch(err => {
            this.loading = false
          })
        } else {
          return false;
        }
      });
    },
    reset () {
      const oldVal = this.form.abnormalNo
      this.$refs['ruleForm'].resetFields()
      if(!this.isModify){
        this.form.abnormalNo = oldVal
      }
    },
    closeMe (done) {
      this.reset()
      this.$emit('update:popVisible', false);
      if(typeof done === 'function'){
        done()
      }
    },
  }
}
</script>
<style lang="scss">
.uploadlist{
  width: 100%;
  li{
    float: left;
    width: 200px;
    margin-right: 10px;
    &:nth-child(4){
      clear: left;
    }
  }
}
.addDriverPop{
  left: auto;
  top: 50px;
  bottom: auto;
  min-width: 880px;
  max-width:  880px;
   
  .box1{
    border:1px solid #C6E2FF;
    border-top:none;
    margin:10px;
    .el-form--inline .el-form-item{
      margin-right: -17px;
      width: 50%;
      float: left;
      display: flex;
      .el-form-item{
        margin-right: -17px;
      }
    }

   

    .el-form--inline .driverRemarks{
      width: 600px;
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }

    .el-form-item__label{
      font-size: 12px;
    }

    .el-form-item__content{
      flex:1;
    }

    .select-tree{
      width: 100%;
    }

    .drviercard,.certcard,.idcard{
      float: left;
      width: 100%;
      height: 136px;
      margin-bottom: 14px;
      margin-left:13%;
      position:absolute;
      right:111px;
      top:111px;
    }

    .upload-container{
      height: 100%;
    }

    .drviercard{
      float: right;
    }

    .licensePicture{
      height: 116px;
      line-height: 1.2;
    }

    .popRight-content{
      padding: 20px 10px 0;
      box-sizing: border-box;
    }

    .el-select .el-input__inner{
      padding-right: 15px;
    }
    .titles{
      font-size: 14px;
      height:30px;
      line-height: 30px;
      color:#ccc;
      padding-left:15px;
      border-top:2px solid #333333;
      border-bottom:1px solid #C6E2FF;
      margin-bottom:5px;
      color:black;
    }
    .el-input--prefix .el-input__inner {
        padding-right: 3px;
    }
    .el-textarea__inner{
        width: 207%;
        height: 50%;
        line-height: 1.5;
    }
    .ts{
      color:orange;
    }
  }
  
}
</style>

