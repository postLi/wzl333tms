<template>
  <div class="short_lll">
    <div class="sTop">
      <el-form :inline="true" :size="btnsize" label-position="right" :rules="rules" :model="searchForm" label-width="100px" class="short_searchinfo clearfix">

      <div class="sTitle">
        <el-form-item label="">
          <el-input v-model="searchForm.memberName" auto-complete="off" maxlength="8"></el-input><span>对账表</span>

          <!--&nbsp;<p>对账表</p>-->
      </el-form-item>
      </div>
      <!--<div class="sTitle"><p>广州网点2018年6月7日-2018年8月12日</p>&nbsp;<p>对账表</p></div>-->
      <div class="sDate">

          <el-form-item label="">
            <el-select v-model="searchForm.status" placeholder="请选择批次">
              <el-option label="未对账" :value="0"></el-option>
              <el-option label="已对账" :value="1"></el-option>
            </el-select>
          </el-form-item>

        <el-date-picker
          v-model="searchTime"
          type="datetimerange"
          :picker-options="pickerOptions2"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        <el-form-item class="">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </div>
      </el-form>
    </div>
    <div class="sMessageTop">
      <el-form :inline="true" :size="btnsize" label-position="center" :rules="rules" :model="searchForm" label-width="100px" class="staff_searchinfo clearfix">

        <el-form-item label="网点名称">
          <el-input v-model="searchForm.memberName" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="业务负责人">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="对账单编号">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="网点编号">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="账户账号">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="账户开户行">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="财务负责人">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="支付宝">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="微信" class="sWetPay">
          <el-input v-model="searchForm.memberPerson" auto-complete="off" maxlength="8"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="sMessageCont">
      <div class="sMessageCont_info">
        <p>应收账款</p>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            fixed
            sortable
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label="序号"
            width="100">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="100">
            <template slot-scope="scope">
              <i icon="delete_lll"></i>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="orgName"
            width="160"
            label="发车时间">
          </el-table-column>
          <el-table-column
            prop="memberName"
            width="160"
            sortable
            label="短驳批次号">
          </el-table-column>
          <el-table-column
            prop="memberPerson"
            sortable
            width="160"
            label="发车网点">
          </el-table-column>
          <el-table-column
            prop="createTime"
            sortable
            width="160"
            label="到达网点">
          </el-table-column>

          <el-table-column
            sortable
            prop="payAmount"
            width="140"
            label="配载件数">
          </el-table-column>
          <el-table-column
            prop="hadPayAmount"
            label="配载重量"
            width="140"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="memberPersonPhone"
            sortable
            width="160"
            label="配载体积">
          </el-table-column>
          <el-table-column
            prop="checkStartTime"
            label="司机"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="checkEndTime"
            label="短驳费"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="140"
            sortable
          >
          </el-table-column>


        </el-table>
      </div>
      <div class="sMessageCont_info">
        <p>已付账款</p>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="usersArr"
          stripe
          border
          @row-dblclick="getDbClick"
          @row-click="clickDetails"
          @selection-change="getSelection"
          height="100%"
          tooltip-effect="dark"
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            fixed
            sortable
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label="序号"
            width="100">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            label=""
            width="100">
            <template slot-scope="scope">
              <i icon="delete_lll"></i>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="orgName"
            width="160"
            label="发车时间">
          </el-table-column>
          <el-table-column
            prop="memberName"
            width="160"
            sortable
            label="短驳批次号">
          </el-table-column>
          <el-table-column
            prop="memberPerson"
            sortable
            width="160"
            label="发车网点">
          </el-table-column>
          <el-table-column
            prop="createTime"
            sortable
            width="160"
            label="到达网点">
          </el-table-column>

          <el-table-column
            sortable
            prop="payAmount"
            width="140"
            label="配载件数">
          </el-table-column>
          <el-table-column
            prop="hadPayAmount"
            label="配载重量"
            width="140"
            sortable
          >
          </el-table-column>

          <el-table-column
            prop="memberPersonPhone"
            sortable
            width="160"
            label="配载体积">
          </el-table-column>
          <el-table-column
            prop="checkStartTime"
            label="司机"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="checkEndTime"
            label="短驳费"
            width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="140"
            sortable
          >
          </el-table-column>


        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
          return {
            pickerOptions2: {
              shortcuts: [
                {
                  text: '今天',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    picker.$emit('pick', [start, end]);
                  }
                },
                {
                  text: '昨天',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                    picker.$emit('pick', [start, end]);
                  }
                },
                {
                text: '过去7天',
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
              }]
            },

            searchTime:  [+new Date() - 60 * 24 * 60 * 60 * 1000, +new Date()],
            searchForm:[],
            usersArr:[],
          };
      },
      methods:{
        clickDetails(row, event, column){
          this.$refs.multipleTable.toggleRowSelection(row)
        },
        getDbClick(row, event){},

      },
      getSelection (selection) {
        this.selected = selection
      },
    }
</script>

<style lang="scss">
.short_lll{
  margin: 0 9px;
  .sTop{

    .short_searchinfo{
      display: flex;
      padding: 20px 0 15px 0;
      .sTitle{
        flex: 1;
        text-align: center;

        span{
          position: relative;
          top: -20px;
          left: 200px;
          font-size: 18px;
          color: #333333;
          font-weight: 600;
        }
        .el-input__inner{
          border-left-color: transparent;
          border-right-color: transparent;
          border-top-color: transparent;
          font-size: 18px;
          color: #333333;
          font-weight: 600;
        }
      }
      .el-form-item__content{
        line-height: 0;
      }
    }
    .el-form-item{
      margin-bottom:0;
    }

  }

  .sMessageTop{
    border: 1px solid #b4b4b4;
    padding: 16px 0 10px 0;

    .el-form-item{
      /*width: 265px;*/
      margin-bottom: 0;
      margin-right: -5px;
      border: 1px solid #b4b4b4;
      border-left-color: transparent;
      .el-input__inner{
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        width: 187px;
        border-radius: 0;
      }
      .el-input__inner:focus{
        border-left: 1px solid #dcdfe6;
      }

    }
    .el-form-item:nth-of-type(6){
      /*border-top-color: transparent;*/
      border-right-color: transparent;
    }
    .el-form-item:nth-of-type(7){
      border-top-color: transparent;
    }
    .el-form-item:nth-of-type(8){
      border-top-color: transparent;
    }
    .el-form-item:nth-of-type(9){
      border-top-color: transparent;
    }
    .el-form-item:nth-of-type(10){
      border-top-color: transparent;
    }
    .el-form-item:nth-of-type(11){
      border-top-color: transparent;
    }
    .el-form-item:nth-of-type(12){
      border-top-color: transparent;
      border-right-color: transparent;
    }
    .sWetPay{
      width: 100%;
      border-top-color: transparent;
      border-right-color: transparent;
      .el-form-item__content{
        width: 90%;
        .el-input{
          .el-input__inner{
            width: 100%;

          }

        }
      }
    }

  }
  .sMessageCont{
    .sMessageCont_info{
      background-color: #e2eaff;
      p{
        text-align: center;
        font-size: 14px;
        color: #668cf0;
        padding: 4px 0 5px 0;
        font-weight: 600;
      }
    }
  }
}
</style>
