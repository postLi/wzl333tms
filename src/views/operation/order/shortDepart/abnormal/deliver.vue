<template>
  <div class="tab-content">
	<!-- 短驳发车 -->
    <SearchForm :orgid="otherinfo.orgid" @change="getSearchParam" :btnsize="btnsize" />  
	<div class="tab_info">
	  <div class="btns_box">
  		<el-button type="primary" :size="btnsize" icon="el-icon-plus" plain @click="doAction('add')">新增短驳</el-button>
      <el-button type="success" :size="btnsize" icon="el-icon-document" plain @click="doAction('truck')">发车</el-button>
      <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" plain @click="doAction('chanelTruck')">取消发车</el-button>
      <el-button type="danger" :size="btnsize" icon="el-icon-circle-close-outline" plain @click="doAction('chanelRepertory')">取消装车</el-button>
  		<el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('edit')" plain>修改</el-button>
      <el-button type="primary" :size="btnsize" icon="el-icon-printer" @click="doAction('print')" plain>打印</el-button>
      <el-button type="primary" :size="btnsize" icon="el-icon-download" @click="doAction('export')" plain>导出</el-button>
      <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>
	  </div>
    <div class="info_tab">
      <el-table 
      ref="multipleTable"
      :data="repertoryArr"
      stripe
      border
      @row-click="clickDetails"
      @selection-change="getSelection"
      height="100%"
      tooltip-effect="dark"
      style="width:100%;"
      :default-sort = "{prop: 'id', order: 'ascending'}">
      <el-table-column
      fixed width="50" sortable type="selection">
      </el-table-column>
      <el-table-column
      fixed sortable width="110"
      prop="shipSn" label="发货批次">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipStatusName" label="批次状态">
      </el-table-column>
      <el-table-column 
      sortable width="120"
      prop="shipIdentifying" label="车牌号">
      </el-table-column>
      <el-table-column 
      sortable width="120"
      prop="shipIdentifying" label="司机">
      </el-table-column>
      <el-table-column 
      sortable width="120"
      prop="shipIdentifying" label="司机电话">
      </el-table-column>
      <el-table-column 
      sortable width="155"
      prop="repertoryCreateTime" label="短驳时间">
       <template slot-scope="scope">
         {{ scope.row.repertoryCreateTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
      </template>
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="hashours" label="目的网点">
      </el-table-column>
      <el-table-column
      sortable width="155"
      prop="createTime" label="接收时间">
      <template slot-scope="scope">
         {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}
      </template>
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="cargoName" label="短驳费">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="repertoryAmount" label="实到件数">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="repertoryWeight" label="实到重量">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="repertoryVolume" label="实到体积">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="cargoAmount" label="配载总件数">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="cargoWeight" label="配载总重量">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="cargoVolume" label="配载总体积">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipFromCityCode" label="重量装载率">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipToCityCode" label="体积装载率">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipSenderId" label="短驳经办人">
      </el-table-column>
      <el-table-column
      sortable width="120"
      prop="shipReceiverId" label="备注">
      </el-table-column>
      </el-table>
    </div>
     <div class="info_tab_footer">
        共计:{{ total }} 
        <div class="show_pager"> 
            <Pager :total="total" @change="handlePageChange" />
        </div> 
    </div> 
    <!-- <Colorpicker :popVisible="colorpickerVisible"
    @close="closeColorpicker" @success="fetchAllOrderRepertory"></Colorpicker> -->
    </div>
  </div>
</template>

<script>
import { postAllOrderRepertory } from '@/api/operation/repertory'
import { mapGetters } from 'vuex'
import SearchForm from './components/search'
// import Colorpicker from './components/colorpicker'
import Pager from '@/components/Pagination/index'
export default {
  components: {
    Pager,
    SearchForm
    // Colorpicker
  },
  data () {
  	return {
      total: 0,
  	  btnsize: 'mini',
  	  setupTableVisible: false,
      repertoryArr: [],
      selected: [],
      loading: false,
      // colorpickerVisible: false,
      isModify: false,
      selectInfo: {},
      searchQuery: {
        'currentPage': 1,
        'pageSize': 100,
        vo: {
          'orgid': 1
        }
      }
  	}
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    orgid () {
      return this.isModify ? this.selectInfo.orgid : this.searchQuery.vo.orgid || this.otherinfo.orgid
    }
  },
  mounted () {
    this.searchQuery.vo.orgid = this.otherinfo.orgid
    // this.fetchAllOrderRepertory()
    // postAllOrderRepertory(this.searchQuery).then(res => {})
  },
  methods: {
  	getSearchParam (obj) {},
  	doAction (type) {
      // if (type !== 'colorpicker') {
        if (this.selected.length < 1) {
          this.$message({
            message: '请选择一条数据~',
            type: 'warning'
          })
        }
      // }
      switch (type) {
        case 'add':
          this.$router.push({path: '././addShortDepart'})
          break
        case 'truck':
          break
        case 'chanelTruck':
          break
        case 'chanelRepertory':
          break
        case 'edit':
          break
        case 'print':
          this.$message({type: 'warning', message: '暂无此功能，敬请期待~'})
          break
        case 'export':
          this.$message({type: 'warning', message: '暂无此功能，敬请期待~'})
          break
      }
    },
  	setTable () {
    },
    clickDetails (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection (list) {
      this.selected = list
      console.log('selected', this.selected)
    },
    handlePageChange (obj) {
      this.searchQuery.currentPage = obj.pageNum
      this.searchQuery.pageSize = obj.pageSize
    },
    fetchAllOrderRepertory () {
      this.getAllOrderRepertory()
    },
    // closeColorpicker () {
    //   this.colorpickerVisible = false
    // },
    getAllOrderRepertory () {
      this.loading = true
      return postAllOrderRepertory(this.searchQuery).then(data => {
        this.repertoryArr = data.list
        this.total = data.total
        this.loading = false
      })
    }
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
