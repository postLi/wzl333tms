<template>
  <div class="company clearfix">
    <!-- 网点管理 -->
    <!-- 用来展示次级菜单（弹窗样式） -->
    <!-- <router-view></router-view> -->
    <div class="side_left">
        <el-tree
          :data="dataTree"
          node-key="id"
          :default-expanded-keys="[1]"
          :props="defaultProps"
          ref="tree"
          @node-click="getCheckedKeys"
          >
        </el-tree>
    </div>

    <div class="side_right">
        <div class="side_right_top">
          <el-form :inline="true" class="" v-for="item in formData" :key="item.id">
            <el-form-item :label="item.label">
              <el-input v-model="item.name" readonly="readonly"></el-input>
            </el-form-item>
          </el-form>

        </div>
        <div class="side_right_bottom clearfix">
            <div class="btns_box clearfix">
              <!--表格功能-->
                <div class="btns_box_left">
                  <img src="../../../assets/icom/xinzeng.png" alt="">
                  <el-button type="primary" plain @click="doAction('addPeople')">新增员工</el-button>
                  <img src="../../../assets/icom/shanchu.png" alt="">
                  <el-button type="primary" plain @click="doAction('deletePeople')">删除员工</el-button>
                  <img src="../../../assets/icom/xiugai.png" alt="">
                  <el-button type="primary" plain @click="doAction('modifyNot')">修改网点</el-button>
                  <img src="../../../assets/icom/xinzengwangdian.png" alt="">
                  <el-button type="primary" plain @click="doAction('addNot')" >新增网点</el-button>
                </div>
              <div class="btns_box_right">
                广东广州员工
              </div>
            </div>
          <!--表格功能-->
          <!--表格内容-->
            <div class="info_news">

                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    stripe
                    border
                    tooltip-effect="dark"
                    @row-click="clickDetails"
                    @selection-change="seleClick"
                    style="width: 100%;"
                    >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="id"
                      label="序号"
                      width="60"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名"
                      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                      :filter-method="filterTag"
                      filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column
                      prop="side"
                      label="归属网点"

                      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                      :filter-method="filterTag"
                      filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column
                      prop="bumen"
                      label="归属部门"
                      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                      :filter-method="filterTag"
                      filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column
                      prop="zhiwu"
                      label="职务"
                      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                      :filter-method="filterTag"
                      filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column
                      prop="load"
                      label="登录账号"
                      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                      :filter-method="filterTag"
                      filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column
                      prop="quanxian"
                      label="权限角色"
                      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                      :filter-method="filterTag"
                      filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column
                      prop="sex"
                      label="性别"
                      width="80"
                      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                      :filter-method="filterTag"
                      filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column
                      prop="phone"
                      label="联系手机"
                      width="200"
                      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                      :filter-method="filterTag"
                      filter-placement="bottom-end">
                    </el-table-column>
                  </el-table>
            </div>
          <!--表格内容-->
<!--分页-->
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
          <!--分页-->

        </div>
    </div>
    <!--新 增 员 工-->
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

  <!--新增网点-->
    <div class="add-dot">

    </div>
    <!--修改网点-->
    <div class="revise-dot">

    </div>
    <AddDot :popVisible="addDoTotVisible" @click="closeAddDot" />
  </div>
</template>
<script type="text/javascript">
    import AddDot from './addDot'

    import { getAllOrgInfo , getOrgId , isEmpty , fmtDate } from '../../../api/company/groupManage'

    export default {
      components: {
        AddDot
      },
        data() {
            var checkName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入用户姓名(务必真实)'));
                }else{
                    callback();
                }

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

             }
            return {
              addDoTotVisible:false,
              //新建网点
              ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
              },
              ruleData: {
                name: [
                  { required: true, message: '请输入活动名称', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                  { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                  { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                  { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                  { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                  { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                  { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
              },
              //新建网点
              formData: [],
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
                //表格内容
              selected:[],
                tableData3:[
                  {
                      id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',  quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                  },
                  {
                      id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',  quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                  },
                  {
                      id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',  quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                  },{
                      id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',  quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                  }
                  ,{
                      id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',  quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                  },{
                      id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',  quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                  },
                  {
                      id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',  quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                  },
                  {
                      id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',  quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12'
                  }
                ],
                //左边树形初始化数据
                dataTree:[],
                defaultProps: {
                  children: 'children',
                  label: 'name'
                },
                //左边树形初始化数据
                getOrgId: '',//根据组织id获取列表
                formData: [
                  {
                    label:"网点名称：",
                  name:''},
                  {
                    label:"网点类型：",
                    name:''},
                  {
                    label:"网点状态：",
                    name:''},
                  {
                    label:"客服人员：",
                    name:''},
                  {
                    label:"客服电话：",
                    name:''},
                  {
                    label:"上级网点：",
                    name:''},
                  {
                    label:"经营类型：",
                    name:''},
                  {
                    label:"创建时间：",
                    name:''},
                  {
                    label:"网点代码：",
                    name:''},
                  {
                    label:"代收款限额：",
                    name:''},
                  {
                    label:"负 责 人：",
                    name:''},
                  {
                    label:"负责人电话：",
                    name:''},
                     {
                    label:"所在城市：",
                    name:''},
                     {
                    label:"所在城市：",
                    name:''},
                    {
                    label:"预警额度：",
                    name:''}
                    ],
                  // 缓存节点数据
                  orgInfoCache: {}
              };
            },
        mounted () {
          this.fetchOrg()//左边树形数据
          // this.fetchOrgFindId() //根据组织id获取列表
        },
        methods: {
          //左边树形数据
          fetchOrg() {
            getAllOrgInfo().then(res => {
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i] == '') {
                  console.log('暂无数据')
                } else {
                  this.dataTree = res.data
                  this.fetchOrgId(this.dataTree[0].id)//根据组织id显示列表
                }
              }
            })
          },
          // 处理返回的节点数据
          handleOrgInfo(data){
            if(data.orgType = 1){
              this.formData[1].name = '营业网点'
            }else{
              this.formData[1].name ="分拨中心"
            }
            if(data.status = 1){
              this.formData[2].name ="无效"
            }else{
              this.formData[2].name ="有效"
            }
            if(data.manageType = 1){
              this.formData[6].name ="自营"
            }else{
              this.formData[6].name ="加盟"
            }

            this.formData[0].name = isEmpty(data.orgName);
            this.formData[3].name = isEmpty(data.serviceName);
            this.formData[4].name = isEmpty(data.servicePhone);
            this.formData[5].name = isEmpty(data.parentName);
            this.formData[7].name = fmtDate(data.createTime);
            this.formData[8].name = isEmpty(data.networkCode);
            this.formData[9].name = isEmpty(data.collectionFee);
            this.formData[10].name = isEmpty(data.responsibleName);
            this.formData[11].name = isEmpty(data.responsibleTelephone);
            this.formData[12].name = isEmpty(data.city);
            this.formData[13].name = isEmpty(data.lockMachineQuota);
            this.formData[14].name = isEmpty(data.warningQuota);
          },
          // 根据组织id显示列表
          fetchOrgId(id) {

            if(this.orgInfoCache[id]){
              this.handleOrgInfo(this.orgInfoCache[id])
            } else {
              getOrgId(id).then(res => {
                this.orgInfoCache[id] = res.data
                this.handleOrgInfo(res.data)
              })
            }
          },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          },
          //表格内容
          clickDetails(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection(row)
          },
          seleClick(selected) {
            this.selected = selected
            console.log(this.selected)
          },
          doAction(type){
          //  判断是否有选中项
            console.log(this.selected);
              if(!this.selected.length && type !== 'addPeople' && type !== 'addNot') {
              this.$message({
                message: '请选择要操作的员工~',
                type: 'warning'
              })
              return false
            }

            switch (type){
                //新增员工
              case 'addPeople':
                // this.closeAddDot()
                break;
              //  新增网点
              case 'addNot':
                this.closeAddDot()
                break;
            //    删除员工
              case 'deletePeople':
                let deleteItem = this.selected.length > 1 ? this.selected.length + '名': this.selected[0].name
               this.$confirm('确定要删除'+deleteItem+'员工吗?','提示',{
                 confirmButtonText:'删除',
                 cancelButtonText:'取消',
                 type:'warning'
               }).then(() => {
                 // 模拟操作，删除选中项
                 this.tableData3 = this.tableData3.filter(el=>{
                   return this.selected.indexOf(el) === -1
                 })
                 return new Promise(reslove => {
                   this.selected = []
                   this.$message({
                     type:'success',
                     message:'删除成功!'
                   });
                   reslove()
                 })
               }).catch(() => {
                 this.$message({
                   type:'info',
                   message:'已取消删除'
                 })
               });
              break;
              //修改网点
              case 'modifyNot':
                if(this.selected.length > 1){
                  this.$message({
                    message:'每次只能修改单条数据~',
                    type:'warning'
                  })
                }
            //    开窗口
                break;

            }
          },
          //表头筛选
          filterTag(value, row) {
            return row.tag === value
          },
          getCheckedKeys() {
            this.getOrgId = this.$refs.tree._data.currentNode.node.data.id
            this.fetchOrgId(this.getOrgId)//根据组织id显示列表
          },
          //新增网点
          closeAddDot(){
            this.addDoTotVisible = true
          }
        }
      }
</script>

<style type="text/css" lang="scss">
  @import "../../../styles/mixin.scss";
  @import "./css/index.css";


</style>
