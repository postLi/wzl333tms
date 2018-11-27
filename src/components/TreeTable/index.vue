<template>
  <el-table
    ref="multipleTable" :data="formatData" stripe border @selection-change="getSelection" height="100%"
    tooltip-effect="light" class="lrl-kemu-table" :default-sort="{prop: 'id', order: 'ascending'}"
    style="width: 100%" :row-style="showRow" v-bind="$attrs" @row-click="clickDetails">
    <el-table-column
      sortable
      type="selection"
      width="100">
    </el-table-column>
    <el-table-column v-if="columns.length===0" width="" label=""
                     align="left">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.$index}}
      </template>
    </el-table-column>

    <el-table-column v-else v-for="(column, index) in columns" :key="index" :prop="column.value" :label="column.text"
                     :width="column.width" class-name="col-class">
      <template slot-scope="scope">
        <div class="scope-node"
             :class="'lrl-space-' + scope.row._level + (!scope.row._expanded ? ' hide-space' : '') + (scope.row.islast ? ' lrl-space-last' : '') + (scope.row.isservernt ? ' lrl-space-isservernt' : '') + (iconShow(index,scope.row) ? '' : ' lrl-none-child')">
          <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-circle-plus-outline
" style="font-size: 25px;vertical-align: middle"></i>
          <i v-else class="el-icon-remove-outline min-scope" style="font-size: 25px;vertical-align: middle"></i>
        </span>
          <span style="margin-left: 15px">{{scope.row[column.value]}}</span>
        </div>
      </template>
    </el-table-column>

    <slot>
      <el-table-column label="科目代码">
        <template slot-scope="scope">
          <span>{{ scope.row.subjectCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收支方式">
        <template slot-scope="scope">
          <!--财务科目类型 0 收入, 1 支出-->

          <span>{{ scope.row.subjectType===1?'支出':'收入' }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="是否公共" :render-header="renderHeader" v-if="isParentId">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.isPublic==='1'?'共用':'不共用' }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="操作" width="200" v-if="isParentId">
        <template slot-scope="scope">
          <el-button
            style="color: #f56c6c"
            type="text" icon=""
            size="small"
            @click="handleDelete(scope.row)">
            <span style="border-bottom: 1px solid #f56c6c">删除</span>
          </el-button>
        </template>
      </el-table-column>
    </slot>
  </el-table>

</template>

<script>
  import treeToArray from './eval'
  import {deleteFinSubject} from '@/api/finance/finanInfo'

  export default {
    name: 'treeTable',
    props: {
      data: {
        expandAll: false,
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: String,
        default: "false"
      },
      isParentId: {
        type: Boolean,
        default: false
      },
      // v-if="isParentId"
    },
    data() {
      return {
        selected: [],
        isrecord: false,
        isshow: false,
      }
    },
    watch: {
      expandAll(nVal) {
        console.log(nVal, 'nValnValnValnVal');
        //判断条件为true 和false
        if (nVal === "true") {
          this.formatData.forEach((record) => {
            record._expanded = true
          })

        } else if (nVal === 'false') {
          this.formatData.forEach((record) => {
            record._expanded = false
          })
        }
      },
      isParentId(nVal) {

      },
      data(n) {
        if (n) {
          // console.log(this.data, '1211111')
        }
      }
    },
    mounted() {

    },
    computed: {
      // 格式化数据源
      formatData() {
        let tmp
        if (!Array.isArray(this.data)) {
          tmp = [this.data]
        } else {
          tmp = this.data
        }
        const func = this.evalFunc || treeToArray
        const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
        return func.apply(null, args)
      }
    },
    methods: {
      renderHeader(h, {column, $index}) {
        return h('span', {}, [
          h('span', {}, '是否公共'),
          h('el-popover', {
            props: {
              placement: 'top',
              width: '250',
              trigger: 'hover',
              content: '公共为总公司设置的财务科目~'
            }
          }, [
            h('i', {
              slot: 'reference',
              class: 'el-icon-warning',
              style: 'color:gray;font-size:16px;margin-left:10px;'
            }, '')
          ])
        ])
      },
      handleDelete(row) {
        console.log(this.expandAll, 'expandAll');
        this.$confirm('确定删除科目名称 [' + row.subjectName + '] 吗?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteFinSubject(row.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            if (this.expandAll === 'false') {
              this.$emit('getExpanAll', this.expandAll)
            }
            this.$emit('success')
          }).catch(err => {
            this._handlerCatchMsg(err)
          })
        }).catch(() => {
          this.$message.info('已取消操作')
          this.loading = false
        });
      },
      showRow(row) {
        const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
        row.row._show = show
        // console.log(this.isshow ,'showshowshowshow');
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
      // 切换下级是否展开
      toggleExpanded(trIndex) {
        const record = this.formatData[trIndex]
        record._expanded = !record._expanded
        // console.log( record._expanded = !record._expanded,'recordrecord');
      },
      // 图标显示
      iconShow(index, record) {
        return (index === 0 && record.children && record.children.length > 0)
      },
      getSelection(selection) {
        this.selected = selection
        this.$emit('change', this.selected)
        // console.log(selection, 'selection')
      },
      clickDetails(row) {
        this.$refs.multipleTable.toggleRowSelection(row)
      }

    }
  }
</script>
<style lang="scss">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes c {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lrl-kemu-table {
    .cell {
      overflow: visible;
      line-height: 32px;
      padding: 0;
    }
    td, th {
      /*line-height: 26px;*/
      padding: 0;
    }
    .ms-tree-space:nth-child(1):after {
      /*display: none;*/
    }
    .el-icon-remove-outline {
      border-radius: 50%;
      background: #fff;
    }
    .lrl-space-1 {
      .ms-tree-space:nth-child(1):before {
        display: none;
      }
      .ms-tree-space:nth-child(1):after {
        display: none;
      }
    }
    .lrl-space-2 {
      /*.ms-tree-space:nth-child(1):before, .ms-tree-space:nth-child(2):before{*/
      /*display: none;*/
      /*!*width: 0;*!*/
      /*}*/
      .ms-tree-space:nth-child(2):before {
        display: none;
      }
      .ms-tree-space:nth-child(2):after {
        display: none;
      }
      &.lrl-space-last .ms-tree-space:nth-child(1):after {
        height: 19px;
      }
      &.lrl-none-child .ms-tree-space:nth-child(2):after {
        display: none;
      }
      &.lrl-none-child .ms-tree-space:nth-child(2):before {
        display: block;
        margin-left: -1px;
      }
    }
    .lrl-space-3 {
      /*.ms-tree-space:nth-child(1):before, .ms-tree-space:nth-child(2):before,.ms-tree-space:nth-child(3):before{*/
      /*display: none;*/
      /*}*/
      .ms-tree-space:nth-child(2n+1):before {
        display: none;
      }
      .ms-tree-space:nth-child(3):after {
        display: none;
      }
      &.lrl-space-last .ms-tree-space:nth-child(2):after {
        height: 19px;
      }
      &.lrl-none-child .ms-tree-space:nth-child(3):after {
        display: none;
      }
      &.lrl-none-child .ms-tree-space:nth-child(3):before {
        display: block;
        margin-left: -1px;
      }
    }
    .lrl-space-4 {
      .ms-tree-space:before {
        display: none;
      }
      .ms-tree-space:nth-child(n+3):before {
        display: block;
      }
      .ms-tree-space:nth-child(4) {
        margin-left: -1px;
      }
      .ms-tree-space:nth-child(4):after {
        display: none;
      }
      &.lrl-space-last .ms-tree-space:nth-child(3):after {
        height: 19px;

      }
      &.lrl-space-last {
        &.lrl-none-child .ms-tree-space:nth-child(2):after {
          display: none;
        }
      }
    }
    .hide-space.lrl-space-1 {
      .tree-ctrl {
        i::after {
          /*position: absolute;*/
          /*content: " ";*/
          /*top: 20px;*/
          /*left: 12px;*/
          /*width: 0;*/
          /*border-left: 1px dotted rebeccapurple;*/
          /*!*background: #000;*!*/
          /*height: 15px;*/
        }
      }
    }

  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: "";
      position: absolute;
      top: 9px;
      left: 15px;
      width: 20px;
      height: 1px;
      border-bottom: 1px dotted #2196F3;
      /*background: #000;*/
    }
    &::after {
      position: absolute;
      content: " ";
      top: -9px;
      left: 16px;
      width: 0;
      border-left: 1px dotted #2196F3;
      /*background: #000;*/
      height: 34px;
    }
  }

  /*.hide-space {*/
  /*.ms-tree-space::after,.ms-tree-space::before {*/
  /*display: none;*/
  /*}*/
  /*}*/

  .processContainer {
    width: 100%;
    height: 100%;
  }

  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
