<template>
  <div class="add-people">
    <!-- Form -->
    <!--<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

    <el-dialog title="新 增 员 工" :visible.sync="isShow" :close-on-modal="true" :before-close="closeMe">
        <el-form :model="form" :rules="rules" ref="ruleForm"  class="demo-ruleForm" :inline="true" label-position="right" size="mini">
          <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="form.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="登录账号" :label-width="formLabelWidth" prop="username">
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input  v-model="form.password"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-input v-model="form.zhiwei" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex">
              <el-option label="男" value="nan"></el-option>
              <el-option label="女" value="nv"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属网点" :label-width="formLabelWidth">
            <el-select v-model="form.site">
              <el-option label="广州网点" value="guangzhou"></el-option>
              <el-option label="广州网点" value="guangzhou"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属部门" :label-width="formLabelWidth">
            <el-select v-model="form.bumen">
              <el-option label="财务部" value="caiwubu"></el-option>
              <el-option label="人力行政部" value="renli"></el-option>
              <el-option label="调度部" value="diaodu"></el-option>
              <el-option label="销售部" value="sale"></el-option>
              <el-option label="运营部" value="yunying"></el-option>
              <el-option label="客服部" value="kefu"></el-option>
              <el-option label="项目部" value="xiangmu"></el-option>
              <el-option label="专线部" value="zhuanxian"></el-option>
              <el-option label="仓管部" value="cangguan"></el-option>
              <el-option label="业务部" value="yewu"></el-option>
              <el-option label="客户" value="kehu"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限角色" :label-width="formLabelWidth">
            <el-select v-model="form.quanxianjuese">
              <el-option label="财务部" value="caiwubu"></el-option>
              <el-option label="人力行政部" value="renli"></el-option>
              <el-option label="调度部" value="diaodu"></el-option>
              <el-option label="销售部" value="sale"></el-option>
              <el-option label="运营部" value="yunying"></el-option>
              <el-option label="客服部" value="kefu"></el-option>
              <el-option label="项目部" value="xiangmu"></el-option>
              <el-option label="专线部" value="zhuanxian"></el-option>
              <el-option label="仓管部" value="cangguan"></el-option>
              <el-option label="业务部" value="yewu"></el-option>
              <el-option label="客户" value="kehu"></el-option>
            </el-select>
          </el-form-item>
          <div class="rem">
            <img src="../../../assets/icom/xinzengwangdian.png" alt="">
            <span>注： 密码默认为 123456</span>
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
          return callback(new Error('请输入用户姓名(务必真实)'));
        }else{
          callback();
        }

      }
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        }else if(!/^1[34578]\d{9}$/.test(value)){
          return callback(new Error('请输入正确的手机号码'));
        }
        else{
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
        form: {
          name: '',
          phone: '',
          username: '',
          password: '123456',
          zhiwei:'',
          sex:'男',
          site:'广州网点',
          delivery: false,
          quanxianjuese:'',
        },
        rules: {
          name: [
            { required: true,validator: checkName, trigger: 'blur' },
            { min: 2,  message: '用户姓名最少2个字符', trigger: 'blur' },
            { max: 10, message: '用户姓名不可超过10个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true,validator: checkPhone, trigger: ['blur', 'change'] },
          ],
          username: [
            { required: true, validator: checkUsername, trigger: ['blur', 'change'] },
            { min: 6,  message: '用户账号最少6个字符', trigger: 'blur' },
            { max: 15, message: '用户账号不可超过15个字符', trigger: 'blur' }

          ],
          password: [
            { validator: checkPassword, trigger: ['blur', 'change'] },
            { min: 6,  message: '密码最少6个字符', trigger: 'blur' },
            { min: 3, max: 30, message: '密码不可超过30个字符', trigger: 'blur' }

          ]
        },
        dialogVisible: false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      closeMe(done){
        this.$emit('close')
        this.$refs['ruleForm'].resetFields()
        console.log(done)
        if(typeof done === 'function'){
          done()
        console.log(this.$emit('close'))
        }
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          console.log('submitForm')
          if(valid){
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
  @import "./css/addPeople.css";
</style>

