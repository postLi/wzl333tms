<template>
  <div class="load-steup">
    <!-- 新增配载 -->
    <div class="load-steup-form" v-loading="loading">
      <el-collapse v-model="loadTruck">
        <el-collapse-item name="loadTruckOne">
          <template slot="title">
            车辆信息 {{truckMessage}}
          </template>
          <div class="clearfix loadFrom">
            <el-form :model="formModel" ref="formModel" class="demo-form-inline" label-width="80px">
              <el-row :gutter="4">
                <el-col :span="4">
                  <el-form-item label="送货费">
                    <el-input v-model="formModel.user" placeholder="送货费"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="分摊方式">
                    <el-select v-model="formModel.region" placeholder="分摊方式">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="车牌号码">
                    <el-select v-model="formModel.region" placeholder="车牌号码">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="司机名称">
                    <el-select v-model="formModel.region" placeholder="司机名称">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="司机电话">
                    <el-select v-model="formModel.region" placeholder="司机电话">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="审批人">
                    <el-input v-model="formModel.user" placeholder="审批人"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="备注">
                    <el-input type="textarea" :rows="1" v-model="formModel.desc"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="load-table">
    	<el-transfer v-model="loadTransfer" :data="loadTransferData">
    		<template slot-scope="scope">
    			<el-table :data="scope">
    				<el-table-column :label="title">{{truckMessage}}</el-table-column>
    			</el-table>
    		</template>
    	</el-transfer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadTruck: '',
      truckMessage: 'sdfsdfsdfsdf',
      formModel: {},
      loadTruck: 'loadTruckOne',
      loading: false,
      loadTransfer: [1],
      loadTransferData: []
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validator(valid => {
        if (valid) {
          console.log('load form truck')
        }
      })
    },
    handleChange () {}
  }
}

</script>
<style lang="scss">
.load-steup {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  .load-steup-form {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px 21px 0 12px;
    .loadFrom {
      padding: 0 20px;
    }
    .el-collapse {
      border: 1px solid #E0E0E0;
    }
    .el-collapse-item__header {
      background: #E9F3FA;
      padding: 2px 0 0 60px;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      color: #333;
      position: relative;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .el-collapse-item__arrow {
      position: absolute;
      left: 30px;
      top: -3px;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    } // .el-form-item__content>.el-input {
    //   width: 70%;
    // }
    // .el-form-item__content>.el-select{
    // 	width:70%;
    // }
    // .el-form-item__content>.el-textarea{
    // 	width: 80%;
    // }
    .el-form-item--mini.el-form-item {
      margin-bottom: 5px;
    }
    .setup-table {
      margin: 0 0 10px;
      min-height: 64px;
      display: flex;

      .setup-left {
        width: 144px;
        text-align: center;
        background: #EBEBEB;
        padding-top: 20px;
        font-size: 14px;
        color: #333;
        font-weight: bold;
      }

      .setup-right {
        padding: 16px;
      }
    }
  }

  .load-steup-footer {
    height: 70px;
    text-align: center;
  }
}

</style>
