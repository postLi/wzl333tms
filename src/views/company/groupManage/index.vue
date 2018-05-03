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
                <el-button type="info">新增员工</el-button>
                <el-button type="info">删除员工</el-button>
                <el-button type="info">修改网点</el-button>
                <el-button type="info">新增网点</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="id"
                      label="序号"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="side"
                      label="归属网点"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="bumen"
                      label="归属部门"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="zhiwu"
                      label="职务"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="load"
                      label="登录账号"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="quanxian"
                      label="权限角色"
                      width="120">
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
                      label="创建日期"
                      width="120">
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

  </div>
</template>
<script>
  export default {
    data() {
      return {
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
         }
       },
  };
</script>

<style type="text/css" lang="scss">
    .company{
        height:100%;
        .side_left{
            width: 20%;
            height:100%;
            float:left;
            padding-top:10px;
            .el-tree{
                border:0 none;
                height: 100%;
            }
        }
        .side_right{
            width:80%;
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
    }
    

</style>