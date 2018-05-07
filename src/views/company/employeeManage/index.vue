<template>
    <div class="staff_manage">
        <div class="staff_searchinfo">
            <label>归属网点
                <el-select v-model="value8" filterable placeholder="全部">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </label>
            <label>员工名称：
                <el-input
                  placeholder="请输入内容"
                  v-model="input9"
                  clearable>
                </el-input>
            </label>
            <label>手机号码：
                <el-input
                  placeholder="请输入内容"
                  v-model="input10"
                  clearable>
                </el-input>
            </label>
            <el-button type="info" plain>查询</el-button>
            <el-button type="info" plain>清空</el-button>
        </div>
        <div class="staff_info">
            <div class="btns_box">
                <el-button type="primary" plain @click="dialogFormVisible = true">新增员工</el-button>
                <el-button type="primary" plain>员工授权</el-button>
                <el-button type="primary" plain>修改</el-button>
                <el-button type="primary" plain>删除</el-button>
                <el-button type="primary" plain style="float:right;">表格设置</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    stripe
                    border
                    @row-click="clickDetails"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="id"
                      label="编号">
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

            <div class="addstaff">
                <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="活动名称" :label-width="formLabelWidth">
                      <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域" :label-width="formLabelWidth">
                      <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default{
        data(){
            return{
                dialogFormVisible: false,
                    form: {
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
                options: [{
                  value: '选项1',
                  label: '广州网点'
                }, {
                  value: '选项2',
                  label: '广州网点'
                }, {
                  value: '选项3',
                  label: '广州网点'
                }, {
                  value: '选项4',
                  label: '广州网点'
                }, {
                  value: '选项5',
                  label: '广州网点'
                }],
                value8: '',
                input9: '',
                input10: '',
                tableData3:[
                {
                    id:1,name:'隔壁老王',side:'广州广东',bumen:'财务部',zhiwu:'财务经理',load:'李四',quanxian:'财务管理',sex:'男',phone:'13000000000',date:'2017-9-12',beizhu:''
                }
                ],
            }
        },
        methods: {
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row)
            }
        }

    }
</script>


<style type="text/css" lang="scss">
    .staff_manage{
        .staff_searchinfo{
            padding:10px 30px;
            border-bottom:1px solid #ccc;
            label{
                margin-right:50px;
                .el-input{
                    width:300px;
                }
            }
        }
        .staff_info{
            padding:10px 50px 10px 30px;
            .btns_box{
                margin-bottom:20px;
                .el-button{
                    margin-right:20px;
                }
            }
            .info_news{
                .el-table{
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
</style>