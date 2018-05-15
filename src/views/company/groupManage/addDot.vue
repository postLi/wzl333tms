<template>
  <div class="add-dot">
  <pop-right :title='popTitle' :isShow="popVisible" @close="closeMe" class='addEmployeerPop'>
    <template class='addEmployeerPop-content' slot="content">
          <el-form :model="form" :rules="rules" ref="ruleForm"  class="demo-ruleForm" :inline="true" label-position="right" size="mini">
            <el-form-item label="网点名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="网点类型" :label-width="formLabelWidth">
              <el-select v-model="form.dotType">
                <el-option label="营业网点" value="nan"></el-option>
                <el-option label="分拨中心" value="nv"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="网点状态" :label-width="formLabelWidth" disabled="disabled">
              <el-select v-model="form.dotState">
                <el-option label="有效" value="nan"></el-option>
                <el-option label="无效" value="nv"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="上级网点" :label-width="formLabelWidth">
              <el-select v-model="form.parentDot">
                <el-option label="营业网点" value="nan"></el-option>
                <el-option label="分拨中心" value="nv"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经营类型" :label-width="formLabelWidth">
              <el-select v-model="form.manType">
                <el-option label="自营" value="nan"></el-option>
                <el-option label="分拨中心" value="nv"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth" prop="creatTime">
              <el-input v-model="form.creatTime"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth" prop="chargePerson">
              <el-input v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责人电话" :label-width="formLabelWidth" prop="checkPhone">
              <el-input  v-model="form.phone"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth">
              <el-input v-model="form.city" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="客服人员" :label-width="formLabelWidth" prop="chargePerson">
              <el-input v-model="form.chargePeople" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="客服电话" :label-width="formLabelWidth" prop="checkPhone">
              <el-input v-model="form.chargePhone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="网点代码" :label-width="formLabelWidth" prop="dotCode">
              <el-input v-model="form.dotCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="代收款限额" :label-width="formLabelWidth">
              <el-input v-model="form.company" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="体现基准" :label-width="formLabelWidth">
              <el-input v-model="form.zhiwei" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="预警额度" :label-width="formLabelWidth">
              <el-input v-model="form.zhiwei" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="锁机额度" :label-width="formLabelWidth">
              <el-input v-model="form.zhiwei" auto-complete="off"></el-input>
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
                v-model="textarea">
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
      }
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
          console.log(value);
          callback();
        }
      }
      var checkPhone = (rule, value, callback) => {
        if (validateMobile(value)) {
          console.log(value.length);
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
        // submitDateInfo:{
        //   name:'',
        //   dotType:'',
        //   dotState:'',
        //   parentDot:'',
        //   manType:'',
        //   username:'',
        //   phone:'',
        //   city:'',
        //   chargePeople:'',//客服人员
        //   address:'',
        //   dotCode:'',
        //   arentDot:'',
        //   manType:'',
        //   username:'',
        //   phone:'',
        //   city:'',
        //   chargePeople:'',//客服人员
        //   manType:'',
        //   username:''
        // },
        popTitle: '新增网点',
        //多选框
        checked: true,
        textarea: '', //文本域
        form: {
          name: '',
          phone: '',
          creatTime:'',
          username: '',
          zhiwei:'',
          parentDot:'',//上级网点
          dotCode:'',//网点代码
          company:'',//代收款额度
          dotType:'营业网点',
          dotState: '有效',
          manType:'自营',
          site:'广州网点',
          delivery: false,
          quanxianjuese:'',
          chargePeople:''
        },
        rules: {
          //网点代码
          dotCode: [
            { required: true,validator: checkDotCode, trigger: 'blur' },
            { min: 2,  message: '用户姓名最少2个字符', trigger: 'blur' },
            { max: 10, message: '用户姓名不可超过10个字符', trigger: 'blur' }
          ],
          chargePerson:[
            { validator: checkChargePerson, trigger: 'blur' },
            { min: 2,  message: '最少2个字符', trigger: 'blur' },
            { max: 10, message: '不可超过10个字符', trigger: 'blur' }
          ],
          name: [
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
      // this.submitDate()
    },
    methods: {
      submitDate(){
        postOrgSaveDate().then(res =>{
          console.log(res)
        })
      },
      closeMe(done){
        this.$emit('close')
        this.$refs['ruleForm'].resetFields()
        if(typeof done === 'function'){
          done()
        }
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if(valid){
            console.log(valid+'111')
            alert('提交数据')
          }else{
            return false
          }
        })
      }
    }
  };
</script>
<style>
  @import "../../../styles/mixin.scss";
  @import "./css/addDot.css";
  .addEmployeerPop{
    left: auto;
    top: 50px;
    bottom: auto;
    height: 100%;
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

