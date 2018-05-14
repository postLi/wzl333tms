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
                <p>广东广州员工</p>
                <!--分页-->

                <!--分页-->
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

        </div>
    </div>
    <!--新 增 员 工-->




    <!--</div>-->
    <AddDot :popVisible="addDoTotVisible" @close="closeAddDot" />
    <AddPeople :popVisible="addPeopleVisible" @close="closeAddPeople" />
  </div>
</template>
<script type="text/javascript">
    import AddDot from './addDot'
    import AddPeople from './addPeople'
    import { getAllOrgInfo , getOrgId , isEmpty , fmtDate } from '../../../api/company/groupManage'

    export default {
      components: {
        AddDot,
        AddPeople
      },
        data() {
            return {
              addDoTotVisible:false,
              addPeopleVisible:false,
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
                this.addPeopleVisible = true
                break;
              //  新增网点
              case 'addNot':
                this.addDoTotVisible = true
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
            this.addDoTotVisible = false
          },
          closeAddPeople(){
            this.addPeopleVisible = false
          }
        }
      }
</script>

<style type="text/css" lang="scss">
  @import "../../../styles/mixin.scss";
  @import "./css/index.css";


</style>
