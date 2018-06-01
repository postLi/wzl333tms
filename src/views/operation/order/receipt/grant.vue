<template>
    <div class="tab-content">
        <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />
        <div class="tab_info">
      <div class="btns_box">
          <el-button type="primary" :size="btnsize"  plain @click="doAction('recycle')">回单发放</el-button>
          <el-button type="primary" :size="btnsize"  @click="doAction('cancel')" plain>取消发放</el-button>
          <!-- <el-button type="danger" :size="btnsize" icon="el-icon-delete" @click="doAction('delete')" plain>删除</el-button> -->
          <el-button type="primary" :size="btnsize"  @click="doAction('export')" plain>导出</el-button>
          <el-button type="primary" :size="btnsize"  @click="doAction('import')" plain>打印</el-button>
          <el-button type="primary" :size="btnsize"  plain @click="setTable" class="table_setup">表格设置</el-button>
      </div>
      <div class="info_tab">
        <el-table
          ref="multipleTable"
          :data="dataset"
          stripe
          border
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
            prop="shipId"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            fixed
            sortable
            prop="shipFromOrgid"
            width="120"
            label="开单网点">
          </el-table-column>f
          <el-table-column
            prop="shipToOrgid"
            width="120"
            sortable
            label="目的网点">
          </el-table-column>
          <el-table-column
            prop=""
            sortable
            width="120"
            label="开单日期">
            <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}{m}{d}') }}</template>
          </el-table-column>
          <el-table-column
            prop="shipSn"
            sortable
            width="120"
            label="运单号">
          </el-table-column>
          <el-table-column
            sortable
            prop="shipFromOrgid"
            width="120"
            label="出发城市">
          </el-table-column>
          <el-table-column
            label="到达城市"
            width="120"
            prop="shipToCityCode"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="recStatus"
            label="寄出状态"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            sortable
            prop=""
            width="120"
            label="回收日期">
            <template slot-scope="scope">{{ scope.row.acceptTypeId | parseTime('{y}{m}{d}') }}</template>
          </el-table-column>
          <el-table-column
            prop="receiptId"
            label="回单状态"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="bankCardNumber"
            label="回单类型"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipReceiptNum"
            label="回单数量"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="sendName"
            label="发货人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="recName"
            label="收货人"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoName"
            label="货品名"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoAmount"
            label="件数"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoWeight"
            label="重量"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="cargoVolume"
            label="体积"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="acceptRemark"
            label="回收备注"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipPayWay"
            label="付款方式"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipNowpayFee"
            label="现付"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipArrivepayFee"
            label="到付"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipReceiptpayFee"
            label="回单付"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipMonthpayFee"
            label="月结"
            width="120"
            sortable
            >
          </el-table-column>
          <!-- 这里没有找到对应的字段 -->
          <el-table-column
            prop="cargoName"
            label="多笔付"
            width="120"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="cargoName"
            label="carrierName"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop=""
            label="中转日期"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.transferTime | parseTime('{y}{m}{d}') }}</template>
          </el-table-column>
          <el-table-column
            prop="oddNumbers"
            label="中转单号"
            width="120"
            sortable
            >
          </el-table-column>
           <!-- 这里没有找到对应的字段 -->
          <el-table-column
            prop="cargoName"
            label="到达省"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="shipFromCityCode"
            label="到达市"
            width="120"
            sortable
            >
          </el-table-column>
          <!-- 这里没有找到对应的字段 -->
          <el-table-column
            prop="cargoName"
            label="到达县区"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="sendMobile"
            label="发货人电话"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="sendAddress"
            label="发货地址"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="recMobile"
            label="收货人电话"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="recAddress"
            label="收货地址"
            width="120"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop=""
            label="寄出日期"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.sendTime | parseTime('{y}{m}{d}') }}</template>
          </el-table-column>
          <el-table-column
            prop=""
            label="接收日期"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.acceptTime | parseTime('{y}{m}{d}') }}</template>
          </el-table-column>
          <el-table-column
            prop=""
            label="发放日期"
            width="120"
            sortable
            >
            <template slot-scope="scope">{{ scope.row.giveoutTime | parseTime('{y}{m}{d}') }}</template>
          </el-table-column>
          <el-table-column
            prop="recRemark"
            label="回收备注"
            width="120"
            sortable
            >
          </el-table-column>

        </el-table>
      </div>
      <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>    
    </div>
        <div class="info_tab_footer">共计:{{ total }} <div class="show_pager"> <Pager :total="total" @change="handlePageChange" /></div> </div>
    </div>
</template>
<script>
import SearchForm from './components/search'
import {postReceipt} from '@/api/operation/receipt'
import { mapGetters } from 'vuex'
import Pager from '@/components/Pagination/index'
export default {
    components: {
        SearchForm,
        Pager
    },
    computed: {
        ...mapGetters([
            'otherinfo'
        ]),
        orgid () {
            console.log(this.selectInfo.orgid , this.searchQuery.vo.orgid , this.otherinfo.orgid)
            return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
        }
    },
    mounted () {
        this.searchQuery.vo.orgid = this.otherinfo.orgid
            this.fetchAllreceipt(this.otherinfo.orgid).then(res => {
                // this.loading = false
            })
        },
        data() {
            return {
                btnsize: 'mini',
                component: 'Send',
                selectInfo: {},
                dataset:[],
                // loading:false,
                searchQuery: {
                    "currentPage":1,
                    "pageSize":10,
                    "vo":{
                        "pageType":4
                    }
                },
                total: 0
            }
        },
        methods: {
        fetchAllreceipt() {
            // this.loading = true
            return postReceipt(this.searchQuery).then(data => {
                this.dataset = data.list
                this.total = data.totalCount
                // this.loading = false
                console.log(data);
            })
        },
        fetchData () {
        this.fetchAllreceipt()
        },
        handlePageChange (obj) {
            this.searchQuery.currentPage = obj.pageNum
            this.searchQuery.pageSize = obj.pageSize
        },
        getSearchParam (obj) {
            this.searchQuery.vo.orgid = obj.orgid
            // this.searchQuery.vo.customerMobile = obj.mobile
            // this.searchQuery.vo.customerName = obj.name
            this.fetchAllreceipt()
        },
        setTable(){},
        clickDetails(){},
        getSelection(){}
    }
}
</script>
<style lang="scss">
.tab-content{
    height: calc(100% - 33px);
    display: flex;
    flex-direction:column;
    position: relative;

    .tab_info{
        padding:10px 30px 40px;
        height: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction:column;

        .btns_box{
            margin-bottom:10px;
            .el-button{
                margin-right:0;
            }
            .table_setup{
                float: right;
                margin-right: 0;
            }
        }
        .info_tab{
            width: 100%;
            height: calc(100% - 68px);
            flex-grow: 1;
            .el-table{
                table{
                    th,td{
                        text-align:center;
                    }
                }
                .unauth{
                    color: #f00;
                }
            }
            .el-table td, .el-table th{
                padding: 5px 0;
            }
        }
    }
    .info_tab_footer{
        padding-left: 20px;
        background: #eee;
        height: 40px;
        line-height: 40px;
        box-shadow: 0 -2px 2px rgba(0,0,0,.1);
        position: relative;
        z-index: 10;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .show_pager{
        float: right;
        line-height: 40px;
        height: 40px;
        overflow: hidden;
    }
}
</style>
