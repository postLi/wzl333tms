<template>
  <div class="lntelligentPset-maintain">
    <el-dialog icon="el-icon-edit-outline" :title="popTitle" :isShow="popVisible" class='pickpopDepMain' :close-on-click-modal="false" :before-close="closeMe" :visible.sync="isShow">
      <div class="depmain-div">
        <div class="carDiv" v-if=isSecond>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="doAction('addCar')"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-minus" @click="doAction('subCar')"></el-button>
        </div>
        <div class="tabsDiv" v-loading="loading">
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane name="first">
              <span slot="label"> 系统车型</span>
              <el-table ref="multipleTable1" :data="systemList" stripe border @row-click="clickDetail" height="181" tooltip-effect="dark" @current-change="handleCurChangeSystem" highlight-current-row style="width: 450px" class="tableIntelligent">
                <el-table-column width="50">
                  <template slot-scope="scope">
                    <i class="el-icon-success" style="color:#67C23A;" v-if="scope.row.isSelect"></i>
                  </template>
                </el-table-column>
                <!-- <el-table-column type="selection" width="35"></el-table-column> -->
                <el-table-column prop="name" label="车型">
                </el-table-column>
                <el-table-column prop="weight" width="120" label="承载重(kg)">
                </el-table-column>
                <el-table-column prop="vol" width="120" label="承载方(方)">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="自定义车型" name="second">
              <div class="tableIntelligentPSet">
                <el-table ref="multipleTable" :data="definedList" stripe border @row-click="clickDetails" height="206" highlight-current-row @current-change="handleCurChangeDefined" tooltip-effect="dark" style="width: 450px">
                  <!-- <el-table-column type="selection" width="35"></el-table-column> -->
                  <el-table-column width="50">
                    <template slot-scope="scope">
                      <i class="el-icon-success" style="color:#67C23A;" v-if="scope.row.isSelect"></i>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="车型">
                    <template slot-scope="scope">
                      <!-- <input v-model.trim="scope.row.name" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'name', val)" :maxlength="8" placeholder="车型" @click.stop.prevent.native :disabled="scope.row['selectdCheck']"></input> -->
                      <el-input placeholder="车型" v-model.number="scope.row.name" :size="btnsize" v-number-only:point @change="(val)=>changeFright(scope.$index, 'name', val)" :disabled="scope.row['selectdCheck']" :maxlength="8" @click.stop.prevent.native>
                        <template slot="append">米</template>
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="weight" width="120" label="承载重(kg)">
                    <template slot-scope="scope">
                      <!-- <input v-model.trim="scope.row.weight" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'weight', val)" :maxlength="8" placeholder="承载重(千克)" @click.stop.prevent.native :disabled="scope.row['selectdCheck']"></input> -->
                      <el-input placeholder="承载重" v-model.number="scope.row.weight" :size="btnsize" v-number-only:point @change="(val)=>changeFright(scope.$index, 'weight', val)" :disabled="scope.row['selectdCheck']" :maxlength="8" @click.stop.prevent.native></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="vol" width="120" label="承载方(方)">
                    <template slot-scope="scope">
                      <!-- <input v-model.trim="scope.row.vol" :size="btnsize" v-number-only:point class="nativeinput" @change="(val)=>changeFright(scope.$index, 'vol', val)" :maxlength="8" placeholder="承载方(方)" @click.stop.prevent.native :disabled="scope.row['selectdCheck']"></input> -->
                      <el-input placeholder="承载方" v-model.number="scope.row.vol" :size="btnsize" v-number-only:point @change="(val)=>changeFright(scope.$index, 'vol', val)" :disabled="scope.row['selectdCheck']" :maxlength="8" @click.stop.prevent.native></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <p>注：请填写车费，保证单车毛利的准确性。</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('formName')">确 定</el-button>
        <el-button @click="closeMe">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { REGEX } from '@/utils/validate'
import PopFrame from '@/components/PopFrame/index'
import querySelect from '@/components/querySelect/index'
import { getIntnteCarInfo, postPzcarinfotms, putPzcarinfotms, deletePzcarinfotms } from '@/api/operation/arteryDepart'
import SelectTree from '@/components/selectTree/index'
import { mapGetters } from 'vuex'

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
    createrId: [Number, String],
    selectTruck: {
      type: [Array, Object],
      default: () => {}
    }
  },
  data() {
    return {
      activeName: 'first',
      isSecond: false,
      selectdCheck: true,
      btnsize: 'mini',
      selected: [],
      selectedSys: [],
      rules: {},
      formLabelWidth: '100',
      usersArr: [{
        num: 10,
        date: '车型'
      },
      {
        num: 10,
        date: '车型'
      },
      {
        num: 10,
        date: '车型'
      },
      {
        num: 10,
        date: '车型'
      }
      ],
      checked1: true,
      popTitle: '参数设置',
      loading: false,
      isEditSuccess: 0,
      formInline: {},
      infoGetSystemList: {
        sign: 1,
        orgid: ''
      },
      infoGetDefinedList: {
        sign: 2,
        orgid: ''
      },
      systemList: [],
      definedList: []
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
      set() {}
    }
  },
  watch: {
    dotInfo(newVal) {
      // this.infoData(this.dotInfo)
    },
    popVisible(newVal) {
      this.infoGetSystemList.orgid = this.otherinfo.orgid
      this.infoGetDefinedList.orgid = this.otherinfo.orgid
      this.fetchGetIntnteCarInfo()
      this.fetchGetIntnteCarDefinedInfo()
    },
    selectTruck: {
      handler(newVal) {}
    }
  },
  mounted() {
    if (this.popVisible) {}
  },
  methods: {
    doAction(type) {
      switch (type) {
        case 'addCar':
          this.addTruck()
          break
        case 'subCar':
          this.subTruck()
          break
      }
    },
    addTruck() { // 添加车辆信息
      if (this.definedList && this.definedList.length > 4) {
        this.$message({
          message: '自定义车型不能超过5种~',
          type: 'warning'
        })
      } else {
        const item = {
          name: '自定义车型',
          weight: 8000,
          vol: 25
        }
        postPzcarinfotms(item).then(data => {
          this.fetchData()
          this.$message.success('添加车型成功！')
        })
          .catch(err => {
            this._handlerCatchMsg(err)
          })
      }
    },
    subTruck() { // 减去车辆信息
      if (this.selected.length !== 1) {
        this.$message({
          message: '请选择一项来进行操作',
          type: 'warning'
        })
      } else {
        if (this.selected[0].cid) {
          deletePzcarinfotms(this.selected[0].cid).then(res => {
            this.loading = false
            this.$message({
              message: '删除成功~',
              type: 'success'
            })
            this.fetchData()
          })
        } else {
          this.definedList = this.definedList.filter(el => {
            if (this.selected.indexOf(el) === -1) {
              return true
            } else {
              return false
            }
          })
        }
      }
    },
    fetchGetIntnteCarInfo() { // 获取系统车型信息
      this.loading = true
      return getIntnteCarInfo(this.infoGetSystemList.orgid, this.infoGetSystemList.sign).then(data => {
        this.systemList = data
        this.loading = false
      })
    },
    fetchGetIntnteCarDefinedInfo() { // 获取自定义车型信息
      this.loading = true
      return getIntnteCarInfo(this.infoGetDefinedList.orgid, this.infoGetDefinedList.sign).then(data => {
        this.definedList = data
        this.loading = false
      })
    },
    changeFright(index, prop, newVal) {
      // newVal = newVal.target.value
      this.definedList[index][prop] = Number(newVal)
      if (prop === 'name') {
        if (this.definedList[index][prop] === '' || this.definedList[index][prop] === undefined) {
          this.$notify({
            title: '提示',
            message: '车型名不能为空',
            type: 'warning'
          })
        }
      } else {
        if (this.definedList[index][prop] === 0) {
          this.$notify({
            title: '提示',
            message: '承载方和承载重不能为0',
            type: 'warning'
          })
          this.definedList[index][prop] = 1
        }
      }
    },
    fetchData() {
      this.fetchGetIntnteCarDefinedInfo()
    },
    closeMe(done) {
      this.reset()
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    },
    reset() {
      this.formInline = Object.assign({}, this.formInline)

      this.formInline.shipSn = ''
      this.formInline.shipGoodsSn = ''
      this.formInline.pickupFee = ''
    },
    submitForm() {
      let zeroCount = 0
      if (this.selectedSys && this.selectedSys.length > 0) { // 选择系统车型时
        this.$emit('savaParamTruck', this.selectedSys)
        this.$message.success('参数设置成功！')
        this.closeMe()
      } else if (this.selected && this.selected.length > 0) { // 选择自定义车型时
        console.log('selected', this.selected)
        this.selected.forEach(e => {
          if (e.weight === 0 || e.vol === 0) {
            zeroCount++ // 记录 承载重和承载方是否有为0的情况
          }
          if (e && e.cid) {
            putPzcarinfotms(e).then(data => {}).catch(err => { // 选择自定义车型 需要保存修改后的当前自定义车型
              this._handlerCatchMsg(err)
            })
          }
        })
        if (zeroCount > 0) {
          this.$notify({
            title: '提示',
            message: '承载方和承载重不能为0',
            type: 'warning'
          })
        } else {
          this.closeMe()
          this.$notify.success({
            title: '成功',
            message: '保存修改车型操作成功'
          })
          this.$emit('savaParamTruck', this.selected)
        }
      }
      // if (this.selectedSys && this.selectedSys.length > 0) {
      //   if (this.selected.length === 0) {
      //     this.$emit('savaParamTruck', this.selectedSys)
      //     this.$message.success('参数设置成功！')
      //     this.closeMe()
      //   }
      // } else {
      //   this.isEditSuccess = 0
      //   if (this.selected && this.selected.length > 0) {
      //     this.selected.forEach(e => {
      //       this.putPzcarinfotms(e) // 保存修改的车型
      //     })
      //   }
      //   if (this.isEditSuccess === 0) { // 循环提交自定义的车型 如果isEditSuccess ===0表示提交成功
      //     this.closeMe()
      //     this.$notify.success({
      //       title: '成功',
      //       message: '保存修改车型操作成功'
      //     })
      //     let arr = []
      //     this.selectedSys.forEach(e => {
      //       arr.push(e)
      //     })
      //     this.selected.forEach(e => {
      //       arr.push(e)
      //     })
      //     this.$emit('savaParamTruck', arr)
      //   }
      // }
    },
    putPzcarinfotms(row) { // 保存修改
      putPzcarinfotms(row).then(data => {}).catch(err => {
        this.isEditSuccess++
        this._handlerCatchMsg(err)
      })
    },
    handleCurChangeSystem(val) {
      this.selectedSys = []
      this.selected = []
      this.selectedSys.push(val)
      console.log('system', val, this.selected)
    },
    handleCurChangeDefined(val) {
      this.selected = []
      this.selectedSys = []
      this.selected.push(val)
      console.log('defined', val, this.selected)
    },
    clickDetail(row, event, column) { // 选择系统车型
      this.systemList.forEach(e => {
        this.$set(e, 'isSelect', false)
      })
      this.$refs.multipleTable1.setCurrentRow(row)
      this.$set(row, 'isSelect', true)
    },
    clickDetails(row, event, column) { // 选择自定义车型
      this.definedList.forEach(e => {
        this.$set(e, 'isSelect', false)
        e.selectdCheck = true
      })
      this.$refs.multipleTable.setCurrentRow(row)
      this.$set(row, 'isSelect', true)
      this.$set(row, 'selectdCheck', false)
    },
    handleClick(tab, event) {
      if (this.activeName === 'second') {
        this.isSecond = true
      } else {
        this.isSecond = false
      }
    }
  }
}

</script>
<style lang="scss">
.lntelligentPset-maintain .pickpopDepMain {
  top: 12%;
  bottom: auto;
  .el-dialog {
    min-width: 550px;
    max-width: 550px;
    border-radius: 8px;
    .el-dialog__header {
      border-bottom: 1px solid #ccc;

      /*text-align: center;*/
      .el-dialog__title {
        color: rgb(100, 186, 245);
      }
    }
    .el-tabs__content {
      .el-table {
        .el-table__fixed-body-wrapper {
          .el-table__row {
            td:not(:first-of-type) {
              padding: 0 0;
              .cell {
                padding-left: 0;
                padding-right: 0;
                .el-input-group__append,
                .el-input-group__prepend {
                  padding: 0 10px;
                }
              }
            }
          }
        }
      }
    }
    .el-dialog__body {
      padding: 20px 35px;
      border-bottom: 1px solid rgb(100, 186, 245);
      .depmain-div {
        .carDiv {
          position: absolute;
          left: 350px;
          top: 80px;
          z-index: 1;
        }
        .tabsDiv {
          position: relative;
        }
        .checklistClass {
          padding-bottom: 10px;
          ul:first-of-type {
            li {
              float: left;
              padding: 0 85px 10px 0;
            }
            li:last-of-type {
              padding-left: 15px;
              padding-right: 0;
            }
          }
          ul:nth-of-type(2) {
            li {
              float: left;
              padding: 0 58px 10px 0;
            }
            li:last-of-type {
              padding-left: -10px;
              padding-right: 0;
            }
          }
        }

        p {
          padding-top: 20px;
          color: rgb(254, 52, 52);
        }
      }
    }
    .el-dialog__footer {
      text-align: right;
    }
  }
}

</style>
