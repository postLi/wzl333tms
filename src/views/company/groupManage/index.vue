<template>
  <div class="company clearfix">
    <!-- 网点管理 -->
    <!-- 用来展示次级菜单（弹窗样式） -->
    <!-- <router-view></router-view> -->
    <div class="side_left">
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1]"
          :default-checked-keys="[1]"
          :props="defaultProps">
        </el-tree>
    </div>
    <div class="side_right">
        <div class="side_right_top">
            <label>网点名称：<input type="text" value="广东广州" /></label>
            <label>网点名称：<input type="text" value="广东广州" /></label>
            <label>网点名称：<input type="text" value="广东广州" /></label>
            <br/>
            <label>网点名称：<input type="text" value="广东广州" /></label>
            <label>网点名称：<input type="text" value="广东广州" /></label>
            <label>网点名称：<input type="text" value="广东广州" /></label>
            <br/>
            <label>负责人：<input type="text" value="广东广州" /></label>
            <label>负责人电话：<input type="text" value="广东广州" /></label>
            <label>所在地：<input type="text" value="广东广州" /></label>
        </div>
        <div class="side_right_bottom clearfix">
            <div class="btns_box clearfix">
                <el-button type="primary" plain @click="addStaff = true">新增员工</el-button>
                <el-button type="primary" plain>删除员工</el-button>
                <el-button type="primary" plain>修改网点</el-button>
                <el-button type="primary" plain>新增网点</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    stripe
                    border
                    tooltip-effect="dark"
                    @row-click="clickDetails"
                    style="width: 100%">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="id"
                      label="序号">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="side"
                      label="归属网点">
                    </el-table-column>
                    <el-table-column
                      prop="bumen"
                      label="归属部门">
                    </el-table-column>
                    <el-table-column
                      prop="zhiwu"
                      label="职务">
                    </el-table-column>
                    <el-table-column
                      prop="load"
                      label="登录账号">
                    </el-table-column>
                    <el-table-column
                      prop="quanxian"
                      label="权限角色">
                    </el-table-column>
                    <el-table-column
                      prop="sex"
                      label="性别"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="phone"
                      label="联系手机"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      label="创建日期">
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                  </el-table>
            </div>

            <div class="Pagination ">
                <div class="block">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[100, 200, 300, 400]"
                      :page-size="100"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="400">
                    </el-pagination>
                  </div>
            </div>
        </div>
    </div>
    <div class="addstaff"> 
        <el-dialog title="新 增 员 工" :visible.sync="addStaff">
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addStaff = false">确 定</el-button>
            <el-button @click="addStaff = false">取 消</el-button>
          </div>
        </el-dialog>
    </div>
  </div>
</template> 
<script>

    import fetch from '../../../utils/fetch'

    export default {
        data() {
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入用户姓名(务必真实)'));
                }else{
                    callback();
                }

                // fetch(){

                // }

             };
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入手机号码'));
                }else if(!/^1[34578]\d{9}$/.test(value)){
                    return callback(new Error('请输入正确的手机号码'));
                }
                else{
                    callback();
                }

             };
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

             };
            return {
                addStaff: false,
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
               formLabelWidth: '120px',
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                tableData3:[
                {
                    id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                },
                {
                    id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                },
                {
                    id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                },{
                    id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                }
                ,{
                    id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                },{
                    id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                },
                {
                    id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                },
                {
                    id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                }
                ],
                data2: [{
                  id: 1,
                  label: '山东卓鑫',
                  children: [{
                    id: 4,
                    label: '济宁卓鑫',
                    children: [{
                      id: 9,
                      label: '济宁xxx'
                    }, {
                      id: 10,
                      label: '济宁xxx'
                    }]
                  },{
                    id: 5,
                    label: '广东广州',
                    children: [{
                      id: 9,
                      label: '广州白云'
                    }, {
                      id: 10,
                      label: '广州天河'
                    }]
                  }]
                }],
                defaultProps: {
                  children: 'children',
                  label: 'label'
                }

              };
            },
        methods: {
             handleSizeChange(val) {
               console.log(`每页 ${val} 条`);
             },
             handleCurrentChange(val) {
               console.log(`当前页: ${val}`);
             },
             clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row)
            }
           },
      };
</script>

<style type="text/css" lang="scss">
    .company{
        height:100%;
        
        .side_left{
            width: 15%;
            height:100%;
            float:left;
            padding-top:10px;
            
        }
        .side_right{
            width:85%;
            float:left;
            padding-top:18px;
            .side_right_top{
                border-bottom:1px solid #ccc;
                label{
                    display: inline-block;
                    width: 300px;
                    height:40px;
                    text-align:right;
                }
            }
            .side_right_bottom{
                .btns_box{
                    float:right;
                    padding-right:300px;
                    padding-top:10px;
                    margin-bottom:10px;
                }
                .info_news{
                    .el-table{
                        width: 100% !important;

                        table{
                            width: 100% !important;
                            th,td{
                                text-align:center;
                            }
                        }
                    }
                }
            }
        }

        .addstaff{
            .el-dialog{
                margin-top: 17vh !important;
                .el-dialog__header{
                    border-bottom:1px solid #ccc;
                    text-align:center;
                    background:#ddd;

                }
                .el-dialog__body{
                    .el-form{
                        .el-form-item{
                            .el-input{

                            }
                        }
                    }
                }
            }
        }
    }
    

</style>