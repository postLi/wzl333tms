<template>
  <div class="lntelligent-maintain">
    <el-dialog icon="el-icon-edit-outline" :title="popTitle" :isShow="popVisible" class='pickpopDepMain' :close-on-click-modal="false" :before-close="closeMe" :visible.sync="isShow">
      <template>
      </template>
      <div class="depmain-div" v-loading="loading">
        <el-form :inline="true" label-width="80px" :rules="rules" :model="formInline" ref="formName" size="mini">
          <el-form-item label="到达网点" prop="orgId">
            <SelectTree v-model="formInline.orgId" class="orgClass" :disabledOption="[otherinfo.orgid]" @change="checkOrgid"></SelectTree>
          </el-form-item>
        </el-form>
        <el-alert :title="repertoryInfoMessage" type="info" :closable="false">
        </el-alert>
        <div class="loadType">
          <el-radio-group v-model="repertoryInfo">
            <el-radio label="1" border>
              <span>模式一：单车配载</span>
              <el-tooltip class="loadType_tips" effect="dark" content="说明：28TMS按最大效益原则提供AI算法，为您指定的这一辆车提供装车建议方案。" placement="top">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </el-radio>
            <el-radio label="2" border>
              <span>模式二：配载完库存</span>
              <el-tooltip class="loadType_tips" effect="dark" content="说明：28TMS自动帮助您把当前库存的货一次性拉完，为您提供整体装车建议方案。" placement="top">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </el-radio>
          </el-radio-group>
        </div>
        <el-table v-if="repertoryInfo === '1'" ref="multipleTable" :data="usersArr" stripe border @row-click="clickDetails" @selection-change="getSelection" height="207px" tooltip-effect="dark" style="width: 100%; margin-bottom: 10px;" class="tableIntelligent">
          <el-table-column fixed type="selection" width="60">
          </el-table-column>
          <el-table-column fixed prop="name" label="车型" width="90">
          </el-table-column>
          <el-table-column fixed prop="carNo" label="车牌">
            <template slot-scope="scope">
              <el-select v-model="scope.row.carNo" placeholder="请选择车牌号" :size="btnsize" :disabled="scope.row['selectdCheck']" filterable>
                <el-option v-for="item in Trucks" :key="item.truckIdNumber" :label="item.truckIdNumber" :value="item.truckIdNumber">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column fixed prop="weight" width="110" label="承载重(kg)">
          </el-table-column>
          <el-table-column fixed prop="vol" width="90" label="承载方(m³)">
          </el-table-column>
          <el-table-column fixed prop="price" width="120" label="车费">
            <template slot-scope="scope">
               <input type="text"  :size="btnsize" class="nativeinput" v-numberOnly:point :value="scope.row.price" @change="(e)=>changeFright(scope.$index, 'price', e.target.value)" ref="price" :maxlength="10" 
               @click.stop :disabled="scope.row['selectdCheck']" />
              <!-- <el-input v-model.number="scope.row.price" :size="btnsize" v-number-only:point @change="(val)=>changeFright(scope.$index, scope.prop, val)" :disabled="scope.row['selectdCheck']" :maxlength="10" @click.stop.prevent.native></el-input> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="loadTypeRepertory" v-if="repertoryInfo === '2'">
          <h4>1.符合以下条件的货物,一次性配载完.</h4>
          <p>开发中...</p>
          <h4>2.符合以下条件的货物,不纳入配载.</h4>
          <p>开发中...</p>
        </div>
        <!-- <p>注：请填写车费，保证单车毛利的准确性。</p> -->
        <el-alert title="注：请填写车费，保证单车毛利的准确性。" type="error" :closable="false" v-if="isShowFeeTips">
        </el-alert>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('formName')">确 定</el-button>
        <el-button @click="closeMe">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { pickerOptions2, parseTime, objectMerge2, tmsMath } from '@/utils/'
import { REGEX } from '@/utils/validate'
import PopFrame from '@/components/PopFrame/index'
import querySelect from '@/components/querySelect/index'
import { getFindShipByid, putRelevancyShip, putRremoveShip } from '@/api/operation/pickup'
import SelectTree from '@/components/selectTree/index'
import { mapGetters } from 'vuex'
import { getIntnteSMainInfoList, getRepertoryInfo } from '@/api/operation/arteryDepart'
import { getTrucK } from '@/api/operation/load'

export default {
  components: {
    PopFrame,
    querySelect,
    SelectTree
  },
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    isDepMain: {
      type: Boolean,
      default: false
    },
    dotInfo: {
      type: [Object, Boolean],
      default: false
    },
    createrId: [Number, String]
  },
  data() {
    return {
      selectdCheck: true,
      btnsize: 'mini',
      selected: [],
      rules: {
        orgId: [{ required: true, message: '到达网点不能为空', trigger: 'blur' }]
      },
      formLabelWidth: '100',
      usersArr: [],
      checked1: true,
      popTitle: '智能配载',
      loading: true,
      formInline: {
        orgId: ''
      },
      sendId: {
        pickupId: '',
        shipId: '',
        pickupFee: ''
      },
      searchTable: {
        'pageNum': 1,
        'pageSize': 100
      },
      Trucks: [],
      cacheTruckList: [],
      loadTypeOptions: '1',
      isShowFeeTips: false,
      // isShowRepertoryInfo: false,
      repertoryInfo: '1',
      // infoMessage: '广州至长沙。当前路线的库存票数是：56票，件数：50，重量：2500千克，体积：30方。'
      infoMessage: ''
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ]),
    isShow: {
      get() {
        return this.popVisible
      },
      set() {
        return this.formInline.orgId
      }
    },
    repertoryInfoMessage: {
      get() {
        return (this.infoMessage ? this.infoMessage : '暂无城市信息！请选择到达网点。')
      },
      set() {}
    }
  },
  watch: {
    dotInfo(newVal) {},
    popVisible(newVal) {
      this.infoFetch()
      if (!newVal) {
        this.infoMessage = ''
      }
    },
    orgId(newVal) {

    }
  },
  mounted() {},
  methods: {
    checkOrgid(val) {
      getRepertoryInfo(val).then(data => {
        if (data) {
          this.infoMessage = data
        }
      })
      .catch(err => {
        this._handlerCatchMsg(err)
      })
      // this.infoMessage = '广州至长沙。当前路线的库存票数是：56票，件数：50，重量：2500千克，体积：30方。'
    },
    infoFetch() {
      this.getTrucks(this.otherinfo.orgid)
      this.loading = true
      return getIntnteSMainInfoList(this.searchTable).then(data => {
        this.usersArr = data.list
        this.loading = false
      }).catch(err => {
        this._handlerCatchMsg(err)
        this.loading = false
      })
    },
    changeFright(index, prop, newVal) {
      console.log(index, prop, newVal)
      this.usersArr[index][prop] = Number(newVal)
      const newfreght = this.usersArr[index].price
      if (newfreght === 0) {
        this.usersArr[index].price = newfreght
        this.$notify({
          title: '提示',
          message: '车费不能为0',
          type: 'warning'
        })
      } else if (newfreght < 0) {
        this.usersArr[index].price = newfreght
        this.$notify({
          title: '提示',
          message: '车费不能小于0,默认为初始值',
          type: 'warning'
        })
      } else {
        this.$refs.multipleTable.toggleRowSelection(this.usersArr[index], true)
        return this.usersArr[index].price
      }
    },
    search(item) {
      return !item.pickupBatchNumber
    },
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    },
    reset() {
      this.usersArr = []
      this.formInline.orgId = ''
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断是否填写了车费
          let count = 0
          this.usersArr.forEach(e => {
            if (e.price === '' || e.price === undefined) {
              count++
            }
          })
          if (count > 0) {
            this.isShowFeeTips = true
            return
          } else {
            this.isShowFeeTips = false
          }

          // 跳到动画
          const data = this.usersArr.filter(el => {
            return el.selectdCheck === false
          })
          console.log('===========data', data)
          this.$router.push({
            path: '/operation/order/loadIntelligent/components/intelligentImg',
            query: {
              tab: '智能配载',
              orgId: this.formInline.orgId,
              sendData: JSON.stringify(data)
            }
          },)
          this.closeMe()
        } else {
          return false
        }
      })
    },
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getSelection(selection) {
      // 1.全部置为不可编辑状态
      this.usersArr.forEach(el => {
        el.selectdCheck = true
      })

      // 2.选中的改为可编辑状态
      if (selection) {
        this.selected = selection
        this.selected.forEach(el => {
          el.selectdCheck = false
        })
      } else {
        // 3.剩下的为不可编辑状态
      }
    },
    getTrucks(orgid) {
      if (this.cacheTruckList[orgid]) {
        this.Trucks = this.cacheTruckList[orgid]
      } else {
        getTrucK().then(data => {
          this.Trucks = data.data
          this.cacheTruckList[orgid] = data.data
        }).catch(err => {
          this._handlerCatchMsg(err)
        })
      }
    }
    // querySearchTruck(queryString, cb) {
    //   const truckList = this.Trucks
    //   const results = queryString ? truckList.filter(this.createFilter(new RegExp(queryString, 'gi'), 'truckIdNumber')) : truckList
    //   // 调用 callback 返回车辆列表的数据
    //   cb(results)
    // },
    // createFilter(queryString, prop) {
    //   return (data) => {
    //     if (data[prop]) {
    //       return (queryString.test(data[prop]))
    //     }
    //   }
    // }
  }
}

</script>
<style lang="scss">
.lntelligent-maintain .pickpopDepMain {
  top: 10%;
  bottom: auto;
  .el-dialog {
    min-width: 750px;
    max-width: 750px;
    border-radius: 8px;
    .el-dialog__header {
      border-bottom: 1px solid #ddd;
      text-align: center;
      .el-dialog__title {

        // color: rgb(100, 186, 245);
      }
    }
    .el-dialog__body {
      padding: 10px 35px 0px 35px;
      border-bottom: 1px solid #ddd;
      .depmain-div {
        .el-form-item--mini.el-form-item,
        .el-form-item--small.el-form-item {
          margin-bottom: 10px;
        }
        .el-alert--error {
          margin: 0 0 10px 0;
        }
        .el-alert--info {
          margin: 0 0 10px 0;
        }
        .loadTips {
          padding-top: 0px;
          padding-bottom: 10px;
        }
      }
      .loadType {
        border-bottom: 1px solid #ddd;
        margin: 0 0 10px 0;
        .el-radio-group {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 10px;
          .el-radio {
            flex-grow: 1;
            height: 60px;
            vertical-align: middle;
            line-height: 2.8;
            text-align: center;
          }
        }
        .loadType_tips {
          color: #E6A23C;
        }
      }
      .loadTypeRepertory {
        height: 207px;
        border: 1px solid #eee;
        margin-bottom: 10px;
        padding: 10px;
        h4 {
          font-size: 14px;
          line-height: 36px;
        }
        p {
          text-indent: 1em;
        }
      }
    }
    .el-dialog__footer {
      text-align: right;
    }
  }
}

</style>
