<template>
    <div class="staff_manage">
        <SearchForm @change="getSearchParam" :btnsize="btnsize" />
        <div class="staff_info">
            <div class="btns_box">
                <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('add')">新增员工</el-button>
                <el-button type="primary" :size="btnsize" icon="el-icon-edit-outline" @click="doAction('auth')" plain>员工授权</el-button>
                <el-button type="primary" :size="btnsize" icon="el-icon-edit" @click="doAction('modify')" plain>修改</el-button>
                <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button>
                <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    stripe
                    border
                    @row-click="clickDetails"
                    @selection-change="getSelection"
                    height="100%"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                      fixed
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      fixed
                      prop="id"
                      label="编号">
                    </el-table-column>
                    <el-table-column
                      fixed
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
                      label="角色授权">
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
                    <el-table-column
                      prop="beizhu"
                      label="备注"
                      width="400">
                    </el-table-column>
                  </el-table>
            </div>

            <div class="info_news_footer">共计:{{ tableData3.length }}</div>    
        </div>
        <TableSetup :popVisible="setupTableVisible" @close="closeSetupTable" />
        <AddEmployeer :popVisible.sync="AddEmployeerVisible" @close="closeAddEmployeer" />
        <SetAuth :popVisible.sync="SetAuthVisible" @close="closeAuth" :users="authUser" />
    </div>
</template>

<script type="text/javascript">
import SearchForm from './search'
import TableSetup from './tableSetup'
import AddEmployeer from './add'
import SetAuth from './authorization'

export default{
    components: {
        SearchForm,
        TableSetup,
        AddEmployeer,
        SetAuth
    },
    data(){
        return{
            // 选中的行
            selected: [],
            authUser: [],
            // 按钮大小
            btnsize: 'small',
            // 各个弹窗状态更改
            setupTableVisible: false,
            AddEmployeerVisible: false,
            SetAuthVisible: false,
            searchForm: {

            },
            dialogFormVisible: false,
            tableData3:[
            {
                id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:2,name:'隔壁老王1',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:3,name:'隔壁老王2',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:4,name:'隔壁老王3',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:5,name:'隔壁老王4',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:6,name:'隔壁老王5',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:7,name:'隔壁老王6',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:8,name:'隔壁老王7',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:9,name:'隔壁老王8',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:10,name:'隔壁老王9',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:11,name:'隔壁老王10',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:12,name:'隔壁老王11',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:13,name:'隔壁老王12',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            },
            {
                id:14,name:'隔壁老王13',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
            }
            ],
        }
    },
    methods: {
        doAction (type) {
            // 判断是否有选中项
            if(!this.selected.length && type !== 'add'){
                this.$message({
                    message: '请选择要操作的员工~',
                    type: 'warning'
                })
                return false
            }

            console.log("this.selected:", this.selected)
            

            switch (type) {
                // 添加员工
                case 'add':
                    this.openAddEmployeer()
                    break;
                // 修改员工信息
                case 'modify':
                    if(this.selected.length > 1){
                        this.$message({
                            message: '每次只能修改单条数据~',
                            type: 'warning'
                        })
                    }
                    this.openAddEmployeer()
                    break;
                // 删除员工
                case 'delete':
                        let deleteItem = this.selected.length > 1 ? this.selected.length + '名' : this.selected[0].name
                        this.$confirm('确定要删除 ' + deleteItem + ' 员工吗？', '提示', {
                            confirmButtonText: '删除',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            // 模拟操作，删除选中项
                            this.tableData3 = this.tableData3.filter( el => {
                                return this.selected.indexOf(el) === -1
                            })
                            return new Promise(reslove => {
                                this.selected = []
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                reslove()
                            })
                            
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });          
                        });
                    break;
                // 设置员工权限
                case 'auth':
                    this.authUser = this.selected
                    this.openAuth()
                    break;
            }
        },
        // 设置表格
        setTable () {
            this.setupTableVisible = true
        },
        closeSetupTable () {
            this.setupTableVisible = false
        },
        openAddEmployeer () {
            this.AddEmployeerVisible = true
        },
        closeAddEmployeer () {
            this.AddEmployeerVisible = false
        },
        openAuth () {
            this.SetAuthVisible = true
        },
        closeAuth () {
            this.SetAuthVisible = false
        },
        clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        getSelection (selection) {
            this.selected = selection
        },
        fetchData () {

        },
        // 获取组件返回的搜索参数
        getSearchParam (searchParam) {
            console.log('searchParam: ', searchParam)
            // 根据搜索参数请求后台获取数据
            this.fetchData()
        }
    }

}
</script>


<style type="text/css" lang="scss">
    
    .staff_manage{
        height: 100%;
        display: flex;
        flex-direction:column;

        .staff_info{
            padding:10px 30px 0;
            height: 100%;
            flex-grow: 1;
            display: flex;
            flex-direction:column;

            .btns_box{
                margin-bottom:10px;
                .el-button{
                    margin-right:10px;
                }
                .table_setup{
                    float: right;
                    margin-right: 0;
                }
            }
            .info_news{
                width: 100%;
                height: calc(100% - 90px);
                flex-grow: 1;
                
                .el-table{
                    table{
                        th,td{
                            text-align:center;
                        }
                    }
                }
                .el-table td, .el-table th{
                    padding: 5px 0;
                }
            }
        }
        .info_news_footer{
            padding-left: 20px;
            background: #eee;
            height: 40px;
            line-height: 40px;
            box-shadow: 0 -2px 2px rgba(0,0,0,.1);
            position: relative;
            z-index: 10;
        }
    }
</style>