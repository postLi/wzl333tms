<template>
  <div class="add-dot">
    <!-- Form -->
    <!--<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

    <el-dialog title="新 增 网 点" :visible.sync="isShow" :close-on-modal="true" :before-close="closeMe">
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
        <el-form-item label="网点状态" :label-width="formLabelWidth">
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
          <el-input v-model="form.zhiwei" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="客服人员" :label-width="formLabelWidth" prop="chargePerson">
          <el-input v-model="form.zhiwei" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" :label-width="formLabelWidth">
          <el-input v-model="form.chargePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.zhiwei" auto-complete="off"></el-input>
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
        <!--<el-form-item label="锁机额度" :label-width="formLabelWidth">-->
          <!--<el-input v-model="form.zhiwei" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="性别" :label-width="formLabelWidth">-->
          <!--<el-select v-model="form.sex">-->
            <!--<el-option label="男" value="nan"></el-option>-->
            <!--<el-option label="女" value="nv"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="归属网点" :label-width="formLabelWidth">-->
          <!--<el-select v-model="form.site">-->
            <!--<el-option label="广州网点" value="guangzhou"></el-option>-->
            <!--<el-option label="广州网点" value="guangzhou"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="归属部门" :label-width="formLabelWidth">-->
          <!--<el-select v-model="form.bumen">-->
            <!--<el-option label="财务部" value="caiwubu"></el-option>-->
            <!--<el-option label="人力行政部" value="renli"></el-option>-->
            <!--<el-option label="调度部" value="diaodu"></el-option>-->
            <!--<el-option label="销售部" value="sale"></el-option>-->
            <!--<el-option label="运营部" value="yunying"></el-option>-->
            <!--<el-option label="客服部" value="kefu"></el-option>-->
            <!--<el-option label="项目部" value="xiangmu"></el-option>-->
            <!--<el-option label="专线部" value="zhuanxian"></el-option>-->
            <!--<el-option label="仓管部" value="cangguan"></el-option>-->
            <!--<el-option label="业务部" value="yewu"></el-option>-->
            <!--<el-option label="客户" value="kehu"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="权限角色" :label-width="formLabelWidth">-->
          <!--<el-select v-model="form.quanxianjuese">-->
            <!--<el-option label="财务部" value="caiwubu"></el-option>-->
            <!--<el-option label="人力行政部" value="renli"></el-option>-->
            <!--<el-option label="调度部" value="diaodu"></el-option>-->
            <!--<el-option label="销售部" value="sale"></el-option>-->
            <!--<el-option label="运营部" value="yunying"></el-option>-->
            <!--<el-option label="客服部" value="kefu"></el-option>-->
            <!--<el-option label="项目部" value="xiangmu"></el-option>-->
            <!--<el-option label="专线部" value="zhuanxian"></el-option>-->
            <!--<el-option label="仓管部" value="cangguan"></el-option>-->
            <!--<el-option label="业务部" value="yewu"></el-option>-->
            <!--<el-option label="客户" value="kehu"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->

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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="closeMe">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { postOrgSaveDate} from '../../../api/company/groupManage'
  export default {
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
          callback();
        }

      }
      var checkPhone = (rule, value, callback) => {
        if (!value) {
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

      };
      var checkPassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户密码'));
        }else if(!/^[0-9a-zA-Z!@#$%^&*]{8,}$/.test(value)){
          return callback(new Error('用户账号只能为数字、字母或者特殊符号'));
        }
        else{
          callback();
        }

      }
      return {
        //多选框
        checked: true,
        textarea: '', //文本域
        form: {
          name: '',
          phone: '',
          creatTime:'',
          username: '',
          password: '',
          zhiwei:'',
          parentDot:'',//上级网点
          dotCode:'',//网点代码
          company:'元',//代收款额度
          dotType:'营业网点',
          dotState: '有效',
          manType:'自营',
          site:'广州网点',
          delivery: false,
          quanxianjuese:'',
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
            { min: 2,  message: '用户姓名最少2个字符', trigger: 'blur' },
            { max: 10, message: '用户姓名不可超过10个字符', trigger: 'blur' }
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
</style>

