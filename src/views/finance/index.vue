<template>
  <div class="dashboard-container">
    <div class="caiwu-flow">
      <div class="fin1-content">
        <el-tooltip content="现付" placement="top">
          <el-button>现付</el-button>
        </el-tooltip>
        <el-tooltip content="到付" placement="top">
          <el-button>到付</el-button>
        </el-tooltip>
        <el-tooltip content="月结" placement="top">
          <el-button>月结</el-button>
        </el-tooltip>
        <el-tooltip content="回单付" placement="top">
          <el-button>回单付</el-button>
        </el-tooltip>
        <el-tooltip content="异动费用" placement="top">
          <el-button>异动费用</el-button>
        </el-tooltip>
      </div>
      <div class="fin2-content">
        <el-tooltip content="现付" placement="top">
          <el-button>提货费</el-button>
        </el-tooltip>
        <el-tooltip content="到付" placement="top">
          <el-button>实际提货费</el-button>
        </el-tooltip>
        <el-tooltip content="月结" placement="top">
          <el-button>中转费</el-button>
        </el-tooltip>
        <el-tooltip content="回单付" placement="top">
          <el-button>回扣</el-button>
        </el-tooltip>
        <el-tooltip content="异动费用" placement="top">
          <el-button>异动费用</el-button>
        </el-tooltip>
        <el-tooltip content="其他支出" placement="top">
          <el-button>其他支出</el-button>
        </el-tooltip>
        <el-tooltip content="送货费" placement="top">
          <el-button>送货费</el-button>
        </el-tooltip>
        <el-tooltip content="短驳费" placement="top">
          <el-button>短驳费</el-button>
        </el-tooltip>
        <el-tooltip content="干线费" placement="top">
          <el-button>干线费</el-button>
        </el-tooltip>
        <el-tooltip content="异常理赔" placement="top">
          <el-button>异常理赔</el-button>
        </el-tooltip>
        <el-tooltip content="整车保险费" placement="top">
          <el-button>整车保险费</el-button>
        </el-tooltip>
        <el-tooltip content="发车汇总" placement="top">
          <el-button>发车汇总</el-button>
        </el-tooltip>
        <el-tooltip content="到车汇总" placement="top">
          <el-button>到车汇总</el-button>
        </el-tooltip>
        <el-tooltip content="发站装卸费" placement="top">
          <el-button>发站装卸费</el-button>
        </el-tooltip>
        <el-tooltip content="发站其他费" placement="top">
          <el-button>发站其他费</el-button>
        </el-tooltip>
        <el-tooltip content="到站装卸费" placement="top">
          <el-button>到站装卸费</el-button>
        </el-tooltip>
        <el-tooltip content="到站其他费" placement="top">
          <el-button>到站其他费</el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@media (min-width: 1024px){
// body{background:red;}
  .dashboard {
    &-container {
      padding: 30px;
    }
  }
  .caiwu-flow{
    width: 1223px;
    height: 603px;
    margin: 53px auto 0;
    position: relative;
    background: url("../../assets/flow/finance.jpg") no-repeat;
    .fin1-content{
      width:680px;
      height: 75px;
      line-height: 75px;
      border-radius: 10px;
      text-align: center;
      // background: red;
      position: absolute;
      top:5px;
      left:347px;
      .el-button{
        width: 110px;
        // height: 32px;
        background-color: #cbebff;
        border-radius: 2px;
        border: solid 1px #2ca3f1;
        font-weight: bold;
      }
    }
    .fin2-content{
      width: 681px;
      height: 223px;
      padding-top: 10px;
      // background: red;
      position: absolute;
      top: 110px;
      right: 195px;
      border-radius: 10px;
      padding-left:33px;
      // text-align: center;
      .el-button{
        display: inline-block;
        width: 110px;
        margin:5px;
        padding: none;
        text-align: center;
        background-color: #cbebff;
        border-radius: 2px;
        border: solid 1px #2ca3f1;
        font-weight: bold;
      }
    }
  }
  
    
}

</style>
