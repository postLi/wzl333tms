<template>
  <!--
    USAGE【表格设置组件】-用法-父组件引入：

    //html
    <el-button type="primary" :size="btnsize" icon="el-icon-setting" plain @click="setTable" class="table_setup">表格设置</el-button>

    <el-table :key="tablekey"></el-table>

    <TableSetup :popVisible="setupTableVisible" :columns="tableColumn" @close="closeSetupTable" @success="setColumn"></TableSetup>

    //script
      import TableSetup from '@/components/tableSetup'
      export default {
        components: {
          TableSetup
        },
        data () {
          return {
            setupTableVisible: false, // 默认弹出框关闭
            tablekey: 0, // 初始化表格视图key
            tableColumn: [] // 后台接口获取到的列表数据
          }
        },
        methods: {
          setTable() {
            this.setupTableVisible = true
          },
          closeSetupTable() { // 关闭弹出框
            this.setupTableVisible = false
          },
          setColumn(obj) { // 重绘表格列表
            this.tableColumn = obj
            this.tablekey = Math.random() // 刷新表格视图
          }
        }
     }
  -->
  <el-dialog title="表格设置" :visible.sync="isShow" append-to-body :close-on-click-modal="false" :before-close="closeMe" class="tms_dialog">
    <div class="tableSetup_warp">
      <!-- 左边列表 -->
      <div class="tableSetup_list">
        <div class="tableSetup_head">
          <div class="tableSetup_head_select">选择：{{leftCheckLen}}</div>
          <el-checkbox :indeterminate="isIndeterminateLeft" v-model="checkAllLeft" @change="handChangeAllLeft">隐藏列  {{leftListLen}} / {{columnListLen}}</el-checkbox>
          <div style="margin: 3px 0;">
            <el-autocomplete class="inline-input" v-model="searchLeft" :fetch-suggestions="querySearchLeft" placeholder="请输入内容" @select="handleSearchLeft" size="mini">
              <i class="el-icon-search el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <span>{{ item.label }}</span>
              </template>
            </el-autocomplete>
          </div>
        </div>
        <div class="tableSetup_content">
          <el-checkbox-group v-model="checkListLeft" @change="handleCheckChangeLeft">
            <transition-group name="el-zoom-in-center" :key="listKey">
              <div class="tableSetup_item" v-for="(column, index) in columnData" :key="index" @dblclick="dbCheckItemLeft(column, index, $event)">
                <el-checkbox :label="column">
                  {{column.label}}
                </el-checkbox>
              </div>
            </transition-group>
          </el-checkbox-group>
        </div>
        <div class="tableSetup_tips">
          <span>双击，可快速左右切换。</span>
        </div>
      </div>
      <!-- 按钮区 -->
      <div class="tableSetup_btn">
        <el-button type="primary" icon="el-icon-arrow-right" @click="doAction('goRight')"></el-button>
        <br>
        <el-button type="primary" icon="el-icon-arrow-left" @click="doAction('goLeft')"></el-button>
      </div>
      <!-- 右边列表 -->
      <div class="tableSetup_list">
        <div class="tableSetup_head">
          <div class="tableSetup_head_select">选择：{{rightCheckLen}}</div>
          <el-checkbox :indeterminate="isIndeterminateRight" v-model="checkAllRight" @change="handChangeAllRight">显示列 {{rightListLen}} / {{columnListLen}}</el-checkbox>
          <div style="margin: 3px 0;">
            <el-autocomplete class="inline-input" v-model="searchRight" :fetch-suggestions="querySearchRight" placeholder="请输入内容" @select="handleSearchRight" size="mini">
              <i class="el-icon-search el-input__icon" slot="suffix"></i>
              <template slot-scope="{ item }">
                <span>{{ item.label }}</span>
              </template>
            </el-autocomplete>
          </div>
        </div>
        <div class="tableSetup_content">
          <el-checkbox-group v-model="checkListRight" @change="handleCheckChangeRight">
            <draggable :move="canDragStart" :list="showColumnData" class="dragArea">
              <transition-group name="el-zoom-in-center">
                <div class="tableSetup_item" v-for="(column, index) in showColumnData" :key="index" @dblclick="dbCheckItemRight(column, index, $event)">
                  <el-checkbox :label="column">
                    {{column.label}}
                  </el-checkbox>
                  <el-switch :value="column.fixed" :active-text="column.fixed?'固定':'活动'" @change="handleSwitch(column, index)"></el-switch>
                </div>
              </transition-group>
            </draggable>
          </el-checkbox-group>
        </div>
        <div class="tableSetup_tips">
          <span>拖拽，可调整上下顺序。</span>
          <br><span>列表最多只能显示{{maxLen}}个字段。</span>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="submitForm()">确 定</el-button>
      <el-button @click="closeMe">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
/**
 * 整体逻辑
 * 1. 进入页面，判断父组件是否有传code值，没有则从router上拿code值；
 * 1.1 通过code拿到数据后需要跟传过来的column进行合并，如果column中有的字段不在后台数据中，则考虑删除掉；
 * 1.2 如果通过code值拿不到数据，则只取column数据
 * 2. 如果获取不到code值，则只读取columns数据；
 * 3. 如果没有columns数据，则不进行tablesetup设置；
 * 4. 提交的数据需格式化，不提交slot等多余属性；
 *
 * ====== 特殊情况 =====
 * 1.一个页面有2个以上的tablesetup组件；（通过传code值区分；如果没有对应的code区分，则传code值为 NOSET）
 */
import draggable from 'vuedraggable'
import { objectMerge2 } from '@/utils/index'
import { getTableSetup, putChangeTableSetup } from '@/api/common'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: []
    },
    code: {
      type: String,
      default: ''
    }
  },
  components: {
    draggable
  },
  computed: {
    isShow: {
      get() {
        return this.popVisible
      },
      set() {}
    }
  },
  data() {
    return {
      orgColumnData: [],
      columnData: [],
      orgShowColumnData: [],
      showColumnData: [],
      list: [],
      rightList: [],
      listKey: 0,
      isIndeterminateLeft: true,
      isIndeterminateRight: true,
      checkAllLeft: false,
      checkAllRight: false,
      checkListLeft: [],
      checkListRight: [],
      searchLeft: '',
      searchRight: '',
      leftListLen: 0,
      rightListLen: 0,
      columnListLen: 0,
      isCheck: true, // 判断显示列数是否超过50个，false-不可选择 true-可以选择,
      maxLen: 50,
      rightCheckLen: 0,
      leftCheckLen: 0,
      thecode: ''// 需要请求的code值
    }
  },
  mounted() {
    // 进来先隐藏全部
    // this.$emit('success', [])

    const code = this.code
    let rcode = this.$route.meta.code

    // 先不从链接上拿数据
    rcode = ''
    this.thecode = ''

   // 1 如果显示声明不用请求服务器则不作处理
    if (code === 'NOSET') {
      this.convertData() // 打开页面就开启表格设置
    } else if (code) {
     // 2 指定显示的code值
      this.thecode = code
    } else if (rcode) {
     // 3 如果有从链接上拿到code值
      this.thecode = rcode
    } else {
     // 4 其余情况则直接处理
      this.convertData()
    }
    // 如果有code值则请求处理
    if (this.thecode) {
      this.fetchTableSetup()
      this.eventBus.$on('tablesetup.change', (code, data) => {
        if (code && code === this.thecode) {
          const find = this.showColumnData.filter(el => el.prop === data.prop)
          if (find.length) {
            find[0].width = data.width
            this.changeTbaleSetup()
          }
        }
      })
    }
  },
  methods: {
    convertData(data) {
      this.initData(data)
      this.callback()
    },
    initData(_data) {
      _data = _data || this.columns
      const MAXLENGTH = this.maxLen
      // 1.检查是否有默认隐藏项
      // 2.当显示项超过50的归类到隐藏项
      const generateData = _ => { // 初始化左边列表
        const data = []
        if (_data.length > 0) {
          let inx = 0
          _data.forEach((e, index) => {
            if (e.hidden) {  // 默认隐藏列
              const obj = objectMerge2(e)
              obj.key = index
              data.push(obj)
            } else {
              inx++
            }
            if (inx > MAXLENGTH) {
              const obj = objectMerge2(e)
              obj.key = index
              obj.hidden = true
              data.push(obj)
            }
          })
        }
        return data
      }
      const generateRightData = _ => { // 初始化右边的列表
        const data = []
        if (_data.length > 0) {
          let inx = 0
          _data.forEach((e, index) => {
            if (!e.hidden && inx < MAXLENGTH) { // 默认显示列
              inx++
              const obj = objectMerge2(e)
              obj.hidden = false
              obj.key = index
              data.push(obj)
            }
          })
        }
        return data
      }
      // 计算左边列表的数量
      const getleftListLen = generateData().length
      // 计算右边列表的数量
      const getRightListLen = generateRightData().length
      // 计算所有列的数量
      // 为啥拿个数量都要函数返回
      const getColumnListLen = _ => {
        return _data.length
      }

      this.orgColumnData = generateData()
      this.columnData = generateData()
      this.orgShowColumnData = generateRightData()
      this.showColumnData = generateRightData()

      this.leftListLen = getleftListLen
      this.rightListLen = getRightListLen
      this.columnListLen = getColumnListLen()
    },
    sort(array) { // 从小到大排序
      return array.sort((a, b) => {
        return a.key - b.key
      })
    },
    doAction(type) {
      switch (type) {
        case 'goRight':
          this.goRight()
          break
        case 'goLeft':
          this.goLeft()
          break
      }
    },
    fetchFail() {
      this.thecode = ''
      this.convertData()
    },
    // 读取服务器上的设置
    fetchTableSetup() {
      return getTableSetup(this.otherinfo.orgid, this.thecode).then(res => {
        var data = res.data
        // 保存原有数据，用来在上传时格式化数据
        this.orgdata = data
        if (data && data.length) {
          if (data.length === 1) {
            data = data[0]
          }
          if (data.length <= 1) {
            this.fetchFail()
            return false
          }
          this.orgdata = data
          // 处理格式化本地数据
          // 如果本地存在不同的列，保留还是删除？

          // 1.先取服务器数据
          const copy = []
          const len = this.columns.length

          // 格式化数据
          data.sort(function(a, b) {
            return a.titleOrder > b.titleOrder ? 1 : -1
          })

          data.forEach(el => {
            const _el = Object.assign({}, el)
            _el.label = _el.label || _el.lable
            for (let i = 0; i < len; i++) {
              if (this.columns[i].prop === el.prop) {
                for (const j in this.columns[i]) {
                  if (typeof _el[j] === 'undefined' || _el[j] === null) {
                    _el[j] = this.columns[i][j]
                  }
                }
                break
              }
            }

            copy.push(_el)
          })

          // 2.合并本地剩余的数据
          this.columns.forEach(el => {
            const find = copy.filter(_el => _el.prop === el.prop)
            if (find.length === 0) {
              copy.push(el)
            }
          })

          copy.sort(function(a, b) {
            return a.fixed ? -1 : 0
          })
          this.convertData(copy)
        } else {
          this.fetchFail()
        }
      }).catch(err => {
        // 如果从服务器上拿取数据出错，则将其当做本地数据处理
        // this.$message.info('获取表格数据失败。')
        // console.log('获取表格数据失败：', this.thecode)
        this.fetchFail()
      })
    },
    changeTbaleSetup() {
      if (this.thecode) {
        return putChangeTableSetup(this.otherinfo.orgid, this.thecode, this.formatColumn(this.showColumnData)).then(res => {
          this.$message.info('保存成功')
          // this.callback()
        }).catch(err => {
          this._handlerCatchMsg(err)
        })
      }
    },
    formatColumn(data) {
      var orgdata = this.orgdata
      var copy = []
      let index = 0

      // 显示的列
      data.forEach(el => {
        var find = orgdata.filter(_el => _el.prop === el.prop)
        if (find.length) {
          const c = {}
          const o = find[0]
          for (const i in o) {
            c[i] = el[i]
          }

          c.hidden = false
          c.titleOrder = ++index
          copy.push(c)
        }
      })

      // 隐藏的列
      this.columnData.forEach(el => {
        var find = orgdata.filter(_el => _el.prop === el.prop)
        if (find.length) {
          const c = {}
          const o = find[0]
          for (const i in o) {
            c[i] = el[i]
          }

          c.hidden = true
          c.titleOrder = ++index
          copy.push(c)
        }
      })

      // 按照data的排序处理
      return copy
    },
    checkRightLen() { // 判断右边列表是否超过50个字段
      if (this.showColumnData.length > this.maxLen) {
        this.$message({ type: 'warning', message: '列表最多只能显示' + this.maxLen + '个字段。' })
        this.isCheck = true
      } else {
        this.isCheck = false
      }
    },
    canDragStart(list) {},
    setColumnLen() { // 更新数据
      this.leftListLen = this.columnData.length
      this.rightListLen = this.showColumnData.length
      // this.orgShowColumnData = objectMerge2([], this.showColumnData)
      // this.orgColumnData = objectMerge2([], this.columnData)
    },
    handChangeAllLeft(val) { // 左边列表全选
      this.checkListLeft = val ? Object.assign([], this.columnData) : []
      // 全选时更新数量
      // 或许用个计算属性会更好，不必手动维护？
      this.leftCheckLen = this.checkListLeft.length
      this.isIndeterminateLeft = false
    },
    handChangeAllRight(val) { // 右边列表全选
      this.checkListRight = val ? Object.assign([], this.showColumnData) : []
      // 全选时更新数量显示
      this.rightCheckLen = this.checkListRight.length
      this.isIndeterminateRight = false
    },
    goRight() { // 将隐藏列勾选的项转移到显示列（左边->右边）
      if ((this.checkListLeft.length + this.rightListLen > this.maxLen) || (this.rightListLen > this.maxLen - 1)) {
        this.$message({ type: 'warning', message: '列表最多只能显示' + this.maxLen + '个字段。' })
        return false
      }
      this.columnData = this.columnData.filter(el => {
        if (this.checkListLeft.indexOf(el) === -1) {
          return true
        } else {
          this.showColumnData.push(el)
          return false
        }
      })
      this.orgColumnData = this.orgColumnData.filter(el => {
        if (this.checkListLeft.indexOf(el) === -1) {
          return true
        } else {
          this.orgShowColumnData.push(el)
          return false
        }
      })
      this.checkListLeft = [] // 清空左边勾选列表
      this.setColumnLen()
      this.leftCheckLen = 0
    },
    goLeft() { // 将显示列勾选的项转移到隐藏列（右边->左边）
      this.checkListRight.forEach((e, index) => {
        this.columnData.push(e) // 将右边勾选的数据项返回到左边
        this.orgColumnData.push(e) // 搜索源数据
        const item = this.showColumnData.indexOf(e)
        if (item !== -1) { // 源数据减去被穿梭的数据
          this.showColumnData.splice(item, 1)
        }
        const orgItem = this.orgShowColumnData.indexOf(e)
        if (orgItem !== -1) { // 搜索源数据减去被穿梭的数据
          this.orgShowColumnData.splice(item, 1)
        }
      })
      this.sort(this.columnData)
      this.checkListRight = [] // 清空右边勾选列表
      this.setColumnLen()
      this.rightCheckLen = 0
    },
    dbCheckItemLeft(row, index, event) { // 双击-左边列表选择项（左边->右边）
      if (this.rightListLen > this.maxLen - 1) {
        this.$message({ type: 'warning', message: '列表最多只能显示' + this.maxLen + '个字段。' })
        return false
      }
      this.showColumnData.push(row)
      this.orgShowColumnData.push(row)
      this.columnData.splice(index, 1)
      this.orgColumnData.splice(index, 1)
      this.setColumnLen()
    },
    dbCheckItemRight(row, index, event) { // 双击-右边列表选择项（右边->左边）
      this.columnData.push(row)
      this.orgColumnData.push(row)
      this.showColumnData.splice(index, 1)
      this.orgShowColumnData.splice(index, 1)
      this.setColumnLen()
      this.sort(this.columnData)
    },
    handleCheckChangeLeft(val) { // 勾选左边列表项
      this.leftCheckLen = val.length
    },
    handleCheckChangeRight(val) { // 勾选右边列表项
      this.rightCheckLen = val.length
    },
    querySearchLeft(queryString, cb) {
      this.searchLeft = queryString
      if (queryString.label === undefined) {
        if (!this.searchLeft) { // 如果搜索框为空则恢复左边列表
          this.columnData = Object.assign([], this.orgColumnData)
          // console.log('querySearchLeft', queryString.label, this.orgColumnData)
        }
      }
      const col = Object.assign([], this.orgColumnData)
      const results = queryString ? col.filter(this.createFilter(queryString)) : col
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchRight(queryString, cb) {
      this.searchRight = queryString
      if (queryString.label === undefined) {
        if (!this.searchRight) { // 如果搜索框为空则恢复右边列表
          this.showColumnData = Object.assign([], this.orgShowColumnData)
        }
      }
      const col = Object.assign([], this.orgShowColumnData)
      const results = queryString ? col.filter(this.createFilter(queryString)) : col
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (data) => {
        return (data.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSearchLeft(val) { // 左边选择操作
      this.searchLeft = val ? val.label : ''
      let array = Object.assign([], this.columnData)
      array.forEach(e => {
        if (e.label === this.searchLeft) {
          array = []
          array.push(e)
        }
      })
      this.columnData = Object.assign([], array)
      array = []
    },
    handleSearchRight(val) { // 右边选择操作
      this.searchRight = val ? val.label : ''
      let array = Object.assign([], this.showColumnData)
      array.forEach(e => {
        if (e.label === this.searchRight) {
          array = []
          array.push(e)
        }
      })
      this.showColumnData = Object.assign([], array)
      array = []
    },
    closeMe(done) {
      this.$emit('close')
      if (typeof done === 'function') {
        done()
      }
    },
    handleChange(value, direction, movedKeys) {
      this.rightList = Object.assign([], value)
    },
    handleSwitch(obj, index) {
      console.log('handleSwitch', obj)
      let find = 0
      let unfind = false
        // 找到最后一个fixed位置
      this.showColumnData.forEach((el, inx) => {
        if (el.fixed && !unfind) {
          find = inx
        } else {
          unfind = true
        }
      })

      if (obj.fixed) {
        this.showColumnData.splice(index, 1)
        this.showColumnData.splice(find, 0, obj)
        obj.fixed = false
      } else {
        // obj.fixed = !obj.fixed

        console.log('find:', find, index)
        this.showColumnData.splice(find + 1, 0, obj)
        this.showColumnData.splice(index + 1, 1)
        obj.fixed = true
      }

      // this.showColumnData.sort(function(a, b) {
      //   return a.fixed ? -1 : 0
      // })

      /* let fixNum = 0
      this.showColumnData.forEach(e => {
        if (e.fixed) {
          console.log('sdfsdf', fixNum)
          fixNum++
        }
      })
      console.log('fixNum', fixNum)
      this.showColumnData[index].titleOrder = fixNum + 1 */
    },
    callback() {
      const data = Object.assign([], this.showColumnData)
      // 修正下数据
      data.forEach(el => {
        if (!el.label && el.lable) {
          el.label = el.lable
        }
      })
      // console.log('表格设置：', this.showColumnData.filter(el => !el.label), this.columnData.filter(el => !el.label))
      this.$emit('success', data)
      this.listKey = Math.random()

      this.closeMe()
    },
    submitForm() {
      // 判断是否要保存数据
      if (this.thecode) {
        this.changeTbaleSetup().then(res => {
          this.callback()
        })
      } else {
        this.callback()
      }
    }
  }
}

</script>
<style lang="scss">
.tms_dialog {
  .el-dialog {
    min-width: 600px;
  }
}

.tableSetup_warp {
  margin: -10px 0;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;

  .tableSetup_list {
    position: relative;
    height: 500px;
    width: 40%;
    min-width: 250px;
    border: 1px solid #eee;
    text-align: left;
    .tableSetup_item {
      position: relative;
      border-bottom: 1px solid #eee;
      padding: 10px;
      .el-checkbox {}
      .el-switch {
        position: absolute;
        right: 30px;
        .el-switch__core {
          width: 63px !important;
        }
        .el-switch__label * {
          font-size: 10px;
        }
        .el-switch__label--right {
          margin-left: -44px;
          color: #fff;
          z-index: 2;
        }
      }
    }
    .tableSetup_item:hover {
      background-color: #eee;
    }

    .tableSetup_head {
      width:100%;
      background-color: #eee;
      padding: 10px 10px 5px 10px;
      box-shadow: 1px 3px 10px #eee;
      position:relative;
      .tableSetup_head_select{
        position:absolute;
        right:10px;
        top:10px;
      }
    }
    .tableSetup_content {
      overflow: auto;
      height: 383px;
    }
    .tableSetup_tips {
      padding: 10px;
      color: #999;
      box-shadow: -1px -3px 10px #eee;
    }
  }
  .tableSetup_btn {
    display: flex;
    flex-direction: column;
    margin-top: 15vh;
  }
  .sortable-ghost {
    border: 1px dashed #f00;
    background: #ffe;
  }
}

</style>
