<template>
  <div class="customer">
    <div class="customer-top">
      <div class="top-time">
        <div class="block">
          <span class="demonstration">创建时间:</span>
          <el-date-picker
            v-model="value5"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>

      </div>
      <div class="top-state">
        订单状态:
        <el-select v-model="value" placeholder="未受理">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="top-num">
        运单号：
        <input type="text">
      </div>
      <div class="top-right">
        <div class="top-query">
          查询
        </div>
        <div class="top-empty">
          清空
        </div>
      </div>
    </div>


    <!--功能设置-->
    <div class="customer-fun">
      <div class="fun-left">
        <ul>
          <li>新建</li>
          <li>受理</li>
          <li>拒绝</li>
          <li>修改</li>
          <li>作废</li>
          <li>删除</li>
          <li>导出</li>
        </ul>
      </div>
      <div class="fun-right">
        <el-select v-model="value" placeholder="表格设置">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <!--<div class="customer-table">-->
      <!--<el-table-->
        <!--:data="tableData3"-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--prop="date"-->
          <!--label="日期"-->
          <!--width="150">-->
        <!--</el-table-column>-->
        <!--&lt;!&ndash;<el-table-column label="配送信息">&ndash;&gt;-->
          <!--<el-table-column-->
            <!--prop="name"-->
            <!--label="姓名"-->
            <!--width="120">-->
          <!--</el-table-column>-->
          <!--<el-table-column label="地址">-->
            <!--<el-table-column-->
              <!--prop="province"-->
              <!--label="省份"-->
              <!--width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="city"-->
              <!--label="市区"-->
              <!--width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="address"-->
              <!--label="地址"-->
              <!--width="300">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="zip"-->
              <!--label="邮编"-->
              <!--width="120">-->
            <!--</el-table-column>-->
          <!--</el-table-column>-->
        <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
      <!--</el-table>-->
    <!--</div>-->


    <div class=customer-table>
        <table class="edit-table">
          <thead>
          <th>姓名</th><th>年龄</th><th>成绩</th><th>性别</th>
          </thead>
          <tbody>
          <tr><td><input value="张三"/></td><td><input value="30"/></td><td><input value="90"/></td><td><input value="女"/></td></tr>
          </tbody>
        </table>
    </div>

    <div class="customer-page">
      <!--//分页-->
      <div class="block">
        <!--<span class="demonstration">完整功能</span>-->
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
</template>

<script>
  // import REGEX from '../../../utils/validate.js'
  import { REGEX } from '@/utils/validate'
  export default {
    name: 'mange',
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近两个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        options: [{
          value: '选项1',
          label: '已受理'
        }, {
          value: '选项2',
          label: '未受理'
        }, {
          value: '选项3',
          label: '已拒绝'
        }, {
          value: '选项4',
          label: '全部'
        }],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value5: '',
        value: '',
        //分页
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        reg: 'datad'
      }
    },
    mounted() {
      let userId = REGEX
      console.log(userId)
    },
    methods: {
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../../styles/mixin.scss";
  @import "../../../styles/manage-customer.css";
  .edit-table{
    border:1px solid gray;
    border-collapse: collapse;
    th{
      border:1px solid gray;
    }
    tbody{

      tr{
        td{
          border:1px solid gray;
          input{
            border:none;
          }
        }
      }
    }
  }
</style>
