<template>
  <div class="add-dot" v-loading="loading">
  <pop-right :title='popTitle' :isShow="popVisible" @close="closeMe" class='addEmployeerPop'>
    <template class='addEmployeerPop-content' slot="content">
          <el-form :model="form" :rules="rules" ref="ruleForm"  class="demo-ruleForm" :inline="true" label-position="right" size="mini">
            <el-form-item label="网点名称" :label-width="formLabelWidth" prop="orgName">
              <el-input v-model="form.orgName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="网点类型" :label-width="formLabelWidth">
              <el-select v-model="form.orgType">
                <el-option label="营业网点" :value="1"></el-option>
                <el-option label="分拨中心" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="网点状态" :label-width="formLabelWidth" disabled="disabled">
              <el-select v-model="form.status">
                <el-option label="有效" :value="32"></el-option>
                <el-option label="无效" :value="31"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="上级网点" :label-width="formLabelWidth">
              <el-select v-model="form.parentName">
                <el-option label="山东卓鑫" value="nan"></el-option>
                <!--<el-option label="分拨中心" value="nv"></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="经营类型" :label-width="formLabelWidth">
              <el-select v-model="form.manageType">
                <el-option label="自营" :value="3"></el-option>
                <el-option label="加盟" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth" prop="creatTime">
              <el-input v-model="form.creatTime"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth" prop="chargePerson">
              <el-input v-model="form.responsibleName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责人电话" :label-width="formLabelWidth" prop="checkPhone">
              <el-input  v-model="form.responsibleTelephone"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth">
              <el-input v-model="form.city" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="客服人员" :label-width="formLabelWidth" prop="chargePerson">
              <el-input v-model="form.serviceName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="客服电话" :label-width="formLabelWidth" prop="checkPhone">
              <el-input v-model="form.servicePhone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="form.detailedAddr" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="网点代码" :label-width="formLabelWidth" prop="networkCode">
              <el-input v-model="form.networkCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="代收款限额" :label-width="formLabelWidth">
              <el-input v-model="form.collectionFee" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="提现基准" :label-width="formLabelWidth">
              <el-input v-model="form.benchmark" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="预警额度" :label-width="formLabelWidth">
              <el-input v-model="form.warningQuota" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="锁机额度" :label-width="formLabelWidth">
              <el-input v-model="form.lockMachineQuota" auto-complete="off"></el-input>
            </el-form-item>

            <div class="ad-add-dot">
              <el-checkbox v-model="checked">开通管理员账号</el-checkbox>
              <p>登录账号：网点名称 密码：123456</p>
            </div>

            <div class="rem-add-dot">
              <span>备注</span>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="不可超300字"
                v-model="form.remarks">
              </el-input>
            </div>

          </el-form>
      <div class="spanDiv">
        <span>元</span>
        <span>元</span>
        <span>元</span>
      </div>
    </template>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="closeMe">取 消</el-button>
          </div>
  </pop-right>
  </div>
</template>

<script>
  import { validateMobile , isvalidUsername } from "@/utils/validate";
  import { postOrgSaveDate} from '../../../api/company/groupManage'
  import popRight from '@/components/PopRight/index'
  export default {
    components: {
      popRight
    },
    props: {
      popVisible: {
        type:Boolean,
        default:false
      },
      isModify: {
        type:Boolean,
        default:false
      },
      dotInfo: Object
    },
    computed: {
      isShow: {
        get(){
          return this.popVisible
        },
        set(){

        }
      }
    },
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入网点名称'));
        } else{
          callback();
        }
      }
      var checkPhone = (rule, value, callback) => {
        if (validateMobile(value)) {
          return callback(new Error('请输入手机号码'));
        } else if (!/^1[34578]\d{9}$/.test(value)) {
          return callback(new Error('请输入正确的手机号码'));
        } else {
          callback();
        }

      }
      var checkChargePerson= (rule, value, callback) => {
        // if (!value) {
        //   return callback(new Error('请输入网点名称'));
        // } else{
        //   callback();
        // }
        callback();
      }
      var checkDotCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入网点代码'));
        } else{
          callback();
        }

      }

      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户账号'));
        }else if(!/^[0-9a-zA-Z\u2E80-\u9FFF]{1,}$/.test(value)){
          return callback(new Error('用户账号只能为数字、字母和中文'));
        }
        else{
          callback();
        }

      }
      return {
        popTitle: '新增网点',
        //多选框
        checked: true,
        loading: false,
        form: {
          orgName: '',
          orgType:1,
          status:32,
          responsibleTelephone: '',
          // creatTime:'',
          responsibleName: '',
          city:'',
          serviceName:'',
          parentName:'山东卓鑫',//上级网点
          servicePhone:'',
          detailedAddr:'',
          networkCode:'',//网点代码
          collectionFee:'',//代收款额度
          benchmark:'',
          warningQuota:'',
          lockMachineQuota:'',
          manageType:3,
          remarks:'',
          //默认值
          accountStatus:'0',
          //id:1,
          parentId:0

        },
        rules: {
          //网点代码
          networkCode: [
            { required: true,validator: checkDotCode, trigger: 'blur' },
            { min: 2,  message: '用户姓名最少2个字符', trigger: 'blur' },
            { max: 10, message: '用户姓名不可超过10个字符', trigger: 'blur' }
          ],
          chargePerson:[
            { validator: checkChargePerson, trigger: 'blur' },
            { min: 2,  message: '最少2个字符', trigger: 'blur' },
            { max: 10, message: '不可超过10个字符', trigger: 'blur' }
          ],
          orgName: [
            { required: true,validator: checkName, trigger: 'blur' },
            { min: 2,  message: '最少2个字符', trigger: 'blur' },
            { max: 10, message: '不可超过15个字符', trigger: 'blur' }
          ],
          chargePhone: [
            { required: true,validator: checkPhone, trigger: ['blur', 'change'] },
          ],
          username: [
            { required: true, validator: checkUsername, trigger: ['blur', 'change'] },
            { min: 6,  message: '用户账号最少6个字符', trigger: 'blur' },
            { max: 15, message: '用户账号不可超过15个字符', trigger: 'blur' }

          ],
        },
        dialogVisible: false,
        formLabelWidth: '120px'
      }
    },
    mounted(){
      console.log(this.isModify);
      if(this.isModify){

        console.log(this.dotInfo);
        this.form = this.dotInfo
        console.log(this.form)
      }
    },
    methods: {
      // submitDate(){
      //   postOrgSaveDate().then(res =>{
      //     console.log(res)
      //   })
      // },
      closeMe(done){
        this.$emit('close')
        this.$refs['ruleForm'].resetFields()
        if(typeof done === 'function'){
          done()
        }
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            console.log(JSON.stringify(this.form));
            this.loading = true
            postOrgSaveDate(this.form).then(res=>{
              console.log(res);
              this.$alert('保存成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.loading = false
                  this.closeMe()
                  this.$emit('success')
                }
              })

            })
          }else{
            return false
          }
        })
      }
    }
  };
</script>
<style type="text/css" lang="scss">
  @import "../../../styles/mixin.scss";
  @import "./css/addDot.css";
  .addEmployeerPop{
    left: auto;
    top: 50px;
    bottom: auto;
    min-width: 600px;
    max-width:  600px;

  }
  .popRight-content{
    padding: 20px 20px 0;
    box-sizing: border-box;
  }
  .el-select .el-input__inner{
    padding-right: 15px;
  }
</style>

