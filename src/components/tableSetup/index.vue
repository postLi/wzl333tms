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
            this.tablekey = new Date().getTime() // 刷新表格视图
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
          <el-checkbox :indeterminate="isIndeterminateLeft" v-model="checkAllLeft" @change="handChangeAllLeft">隐藏列 {{leftListLen}} / {{columnListLen}}</el-checkbox>
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
            <draggable :move="canDragStart" @change="setChangeData" :list="showColumnData" class="dragArea">
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
 * ==== 整体逻辑 ====
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
/**
 * ===== 排序逻辑 =====
 * fixed的一直排在最上面
 * 后面变更为fixed的排在原有的fixed后面
 * 取消fixed的排在最后一个fixed元素后面
 * 拖动fixed到其它位置，需重新排序，如果是排在非fixed元素后面，则将其排在最后一个fixed元素后面
 * 拖动非fixed到fixed前面某位置，需重新排序，将其排在最后一个fixed元素后
 * 从左到右边的元素，排在原有数据后面，相反操作同理
 * 从右到左边的元素，取消fixed属性
 */
import draggable from 'vuedraggable'
import { objectMerge2 } from '@/utils/index'
import { getTableSetup, putChangeTableSetup, getOriginTableSetup } from '@/api/common'
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
      thecode: '' // 需要请求的code值
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
      if (!window['tablesetup' + this.thecode]) {
        window['tablesetup' + this.thecode] = true
        this.eventBus.$on('tablesetup.change', (code, data) => {
          if (code && code === this.thecode) {
            if (data.prop) {
              const find = this.showColumnData.filter(el => el.prop === data.prop)
              if (find.length) {
                find[0].width = data.width
                this.changeTableSetup()
              }
            } else {
              data.forEach(dat => {
                const find = this.showColumnData.filter(el => el.prop === dat.prop)
                if (find.length) {
                  find[0].width = dat.width
                }
              })
              this.changeTableSetup()
            }
          }
        })
      }
    }
  },
  methods: {
    convertData(data) {
      this.initData(data)
      this.callback()
    },
    initData(_data) {
      // 针对前端写的表格配置数据也进行简单的排序处理
      // if (process.env.NODE_ENV !== 'production') {
      //   console.warn('表格设置字段：【前端写的数据】', this.columns.length, '个')
      //   let str = ''
      //   this.columns.forEach(e => {
      //     str += "INSERT INTO tms_common_title VALUES ('" + e.label + "', '" + e.prop + "', '" + this.code + "');" + '\n'
      //   })
      //   console.log(str)
      // }
      let fedata = objectMerge2([], this.columns)
      fedata = this.sort(fedata)
      _data = _data || fedata

      // ================ 针对一些属性进行公共处理 =============
      _data.forEach(el => {
        // 1.处理出发城市、到站显示值的问题
        if ((el.prop === 'shipFromCityName' || el.prop === 'shipToCityName') && !el.slot) {
          el.slot = (scope) => {
            const addr = scope.row[el.prop] || ''
            const addrArr = addr.split(',')
            return addrArr[2] || addrArr[1] || addrArr[0] || ''
          }
        }
      })

      const MAXLENGTH = this.maxLen
      // 1.检查是否有默认隐藏项
      // 2.当显示项超过50的归类到隐藏项
      const generateData = _ => { // 初始化左边列表
        const data = []
        if (_data.length > 0) {
          let inx = 0
          _data.forEach((e, index) => {
            if (e.hidden) { // 默认隐藏列
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
      // 1.只需要遍历一遍，分别处理fixed跟非fixed元素即可
      // 2.将俩个数组合并返回即可
      // 3.注意事项：array必须是已经经过titleOrder排序处理后的数组

      const copy = []
      const copy_unfixed = []
      array.forEach(el => {
        if (el.fixed) {
          copy.push(el)
        } else {
          copy_unfixed.push(el)
        }
      })

      return copy.concat(copy_unfixed)
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
      return Promise.all([getOriginTableSetup(this.thecode), getTableSetup(this.otherinfo.orgid, this.thecode)]).then(resAll => {
        var orgData = resAll[0].data
        var data = resAll[1].data
        if (data && data.length) {
          if (Array.isArray(data[0])) {
            data = data[0]
          }
          // 后台返回的字段数量必然大于1个的，小于时就是数据有异常，按照请求失败处理
          if (data.length <= 1) {
            console.log('后台返回表格数据异常:', data)
            this.fetchFail()
            return false
          }
          // 所有不在右边列表的数据，都给个默认值
        // 默认隐藏
        /* {
          "id":635,
          "lable":"序号",
          "prop":"number",
          "titleModule":"ORDER_PICK"
        } */
        /* {
          "id": "1076059305649635328",
          "lable": "重量",
          "prop": "pickupWeight",
          "width": "150",
          "hidden": true,
          "fixed": false,
          "titleOrder": 10,
          "titleModule": "ORDER_PICK",
          "userId": 217,
          "orgId": 1,
          "companyId": 1
        } */
          let len2 = data.length
          const copydata = []
          const copyflag = {}
          data.forEach(el => {
            if (!copyflag[el.prop]) {
              copyflag[el.prop] = true
              copydata.push(el)
            }
          })
          data = copydata
          orgData.forEach(el => {
            let diffTextWithSameProp = ''
            const len = data.filter((el2, inx) => {
            // 文案描述相同，字段不同
              if (el2.lable === el.lable && el.prop !== el2.prop) {
                diffTextWithSameProp = inx
              }
              return el.prop === el2.prop
            }).length
          // 如果找不到，表示需要插入
            if (len === 0) {
            // if (true) {
            console.warn('data[0]', data[0])
              const userId = data[0].userId
              const orgId = data[0].orgId
              const companyId = data[0].companyId

              data.push({
                'id': '',
                'lable': el.lable,
                'prop': el.prop,
                'width': '150',
                'hidden': true,
                'fixed': false,
                'titleOrder': ++len2,
                'titleModule': el.titleModule,
                'userId': userId,
                'orgId': orgId,
                'companyId': companyId
              })
            } else if (diffTextWithSameProp !== '') {
            // 删除用户数据中重复的字段
              // data.splice(diffTextWithSameProp, 1)
            }
          })

          // if (process.env.NODE_ENV !== 'production') {
          //   console.warn('表格设置字段：【后台拿的数据】：', data.length, '个')
          //   let str = ''
          //   data.forEach(e => {
          //     str += "('" + e.lable + "', '" + e.prop + "', '" + this.code + "');" + e.fixed + '\n'
          //   })
          //   console.log(str)
          // }

          // 保存原有数据，用来在上传时格式化数据
          this.orgdata = data
          // 处理格式化本地数据
          // 如果本地存在不同的列，保留还是删除？

          // 1.先取服务器数据
          let copy = []
          const len = this.columns.length

          // 格式化数据顺序
          data.sort(function(a, b) {
            return a.titleOrder > b.titleOrder ? 1 : -1
          })

          // 将服务器上的数据覆盖本地相应的数据
          data.forEach(el => {
            const _el = Object.assign({}, el)
            _el.label = _el.label || _el.lable
            for (let i = 0; i < len; i++) {
              if (this.columns[i].prop === el.prop) {
                // 预处理每个项的数据
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
            // 将本地剩余的项塞到后面
            const find = copy.filter(_el => _el.prop === el.prop)
            if (find.length === 0) {
              const find2 = copy.filter(_el => _el.label === find[0].label)
              console.log('本地项，需要后台添加：', el)
              if (find2.length === 0) {
                copy.push(el)
              }
            }
          })

          copy = this.sort(copy)

          this.convertData(copy)
        } else {
          this.fetchFail()
        }
      }).catch(err => {
        this.fetchFail()
        // this.$message.warning('获取不到表格设置信息，请刷新页面重试。')
      })

      /* return getTableSetup(this.otherinfo.orgid, this.thecode).then(res => {

      }).catch(err => {
        // 如果从服务器上拿取数据出错，则将其当做本地数据处理
        // this.$message.info('获取表格数据失败。')
        // console.log('获取表格数据失败：', this.thecode)
        this.fetchFail()
      }) */
    },
    changeTableSetup() {
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
    setChangeData() {
      // 拖拉后处理数据
      this.reRenderData()
    },
    reRenderData() {
      // 复制数组操作，减少渲染次数
      const copy = objectMerge2([], this.showColumnData)
      // 排序，将fixed逐个往前移动，非fixed往后移
      this.showColumnData = this.sort(copy)
    },
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
          el.fixed = false
          this.showColumnData.push(el)
          return false
        }
      })
      this.orgColumnData = this.orgColumnData.filter(el => {
        if (this.checkListLeft.indexOf(el) === -1) {
          return true
        } else {
          el.fixed = false
          this.orgShowColumnData.push(el)
          return false
        }
      })
      this.checkListLeft = [] // 清空左边勾选列表
      this.setColumnLen()
      this.leftCheckLen = 0
      this.reRenderData()
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
      // this.sort(this.columnData)
      this.checkListRight = [] // 清空右边勾选列表
      this.setColumnLen()
      this.rightCheckLen = 0
      this.reRenderData()
    },
    dbCheckItemLeft(row, index, event) { // 双击-左边列表选择项（左边->右边）
      if (this.rightListLen > this.maxLen - 1) {
        this.$message({ type: 'warning', message: '列表最多只能显示' + this.maxLen + '个字段。' })
        return false
      }
      row.fixed = false
      this.showColumnData.push(row)
      this.orgShowColumnData.push(row)
      this.columnData.splice(index, 1)
      this.orgColumnData.splice(index, 1)
      this.setColumnLen()
      this.reRenderData()
    },
    dbCheckItemRight(row, index, event) { // 双击-右边列表选择项（右边->左边）
      this.columnData.push(row)
      this.orgColumnData.push(row)
      this.showColumnData.splice(index, 1)
      this.orgShowColumnData.splice(index, 1)
      this.setColumnLen()
      // this.sort(this.columnData)
      this.reRenderData()
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
      obj.fixed = !obj.fixed
      this.reRenderData()
      return
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
        if (!this.isloading) {
          this.isloading = true
          this.changeTableSetup().then(res => {
            this.isloading = false
            this.callback()
          }).catch(e => {
            this.isloading = false
          })
        }
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
      width: 100%;
      background-color: #eee;
      padding: 10px 10px 5px 10px;
      box-shadow: 1px 3px 10px #eee;
      position: relative;
      .tableSetup_head_select {
        position: absolute;
        right: 10px;
        top: 10px;
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
