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

          <li @click="dialogFormVisible = true">新建</li>
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

    <div class=customer-table>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
          <el-table-column
            prop="date"
            label="订单号"
            width="180">
          </el-table-column>
        <el-table-column
          prop="name"
          label="订单状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="关联运单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="关联运单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="关联运单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="关联运单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="关联运单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="关联运单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="关联运单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="关联运单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="关联运单号"
          width="180">
        </el-table-column>
      </el-table>
        <!--<el-table-column-->
          <!--fixed="right"-->
          <!--label="操作"-->
          <!--width="120">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button-->
              <!--@click.native.prevent="deleteRow(scope.$index, tableData4)"-->
              <!--type="text"-->
              <!--size="small">-->
              <!--移除-->
            <!--</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
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


    <div class="create-order">


      <el-dialog title="新增" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <div class="order-content">
            <div class="order-left">
              <span>发货方</span>
              <el-form-item label="发货人：">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="联系号码：">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="发货地址：">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
            </div>
            <div class="order-right">
              <span>收货方</span>
              <el-form-item label="收货方：">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="联系号码：">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="发货地址：">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
            </div>
          </div>

          <div class="order-center">
            <span>货物信息</span>
            <el-table
              :data="tableData1"
              border
              style="width: 100%">

              <el-table-column
                prop="name"
                label="货品名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="件数"
                width="120">

              </el-table-column>
              <el-table-column
                prop="address"
                label="重量"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="体积"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="单价"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="包装"
                width="140">
              </el-table-column>
              <el-table-column
                prop="name"
                label="品种规格"
                width="180">
              </el-table-column>
            </el-table>
          </div>
          <div class="order-bottom">
            <span>订单信息</span>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="出发城市">
                <el-input v-model="formInline.user" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="到达城市">
                <el-input v-model="formInline.user" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="开单网点">
                <el-input v-model="formInline.user" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="目的网点">
                <el-select v-model="formInline.region" placeholder="">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="提货方式">
                <el-select v-model="formInline.region" placeholder="">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="紧急度">
                <el-select v-model="formInline.region" placeholder="">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="代收款">
                <el-input v-model="formInline.user" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="代收款手续费">
                <el-input v-model="formInline.user" placeholder=""></el-input>
              </el-form-item>

              <el-form-item label="付款方式">
                <el-select v-model="formInline.region" placeholder="">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>

        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { REGEX } from '@/utils/validate'
  import CreateOrder from '../createOrder/index'

  export default {
    name: 'mange',
    components: {
      CreateOrder
    },
    data() {
      //创建订单
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData1: [{
          date: '2016-05-02',
          name: '',
          address: ''
        }],
        sizeForm: {
          name: ''
        },
        //创建订单
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
        }],
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        //表格编辑
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      //  新建
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
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

        createData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      // },
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
      // console.log(userId)
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
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      newlyBuild() {

      }
    }
    // }

  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  @import "src/styles/manage-customer.scss";

</style>
