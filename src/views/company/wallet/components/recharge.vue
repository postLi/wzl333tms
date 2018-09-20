<template>
  <PopFrame :title="popTitle" :isShow="popVisible" @close="closeMe" class='addpopDepMain' v-loading="loading">
    <template class='addRelationPop-content' slot="content">
      <div ref="ruleForm" class="depmain-div">
        <!--<div class="depmain-top" v-if="hiddenTop">-->
          <!--<el-input-->
            <!--placeholder="请输入内容"-->
            <!--v-model="inputDate"-->
            <!--&gt;-->
          <!--</el-input>-->
          <!--<el-checkbox v-model="checked" text-color="#3e9ff1"></el-checkbox>-->
          <!--<el-checkbox v-model="checked1"></el-checkbox>-->
        <!--</div>-->

        <div class="depmain-content" v-if="showDate">
          <ul>
            <li v-for="item in getMentInfo">
              <span>{{item.dictName}}</span>
            </li>
          </ul>
        </div>
        <div class="depmain-add" v-if="hiddenAdd">
          <el-input
            placeholder="请输入内容"
            v-model="dictName"
          >
          </el-input>
          <el-checkbox v-model="checked1" @change="addDep"></el-checkbox>
          <el-checkbox v-model="checked2"></el-checkbox>
          <ul>
            <li v-for="item in getMentInfo">
              <span>{{item.dictName}}</span>
              <!--<i class="el-icon-close"></i>-->
            </li>
          </ul>
        </div>
        <div class="depmain-edit" v-if="hiddenEdit">
          <ul>
            <li v-for="item in getMentInfo">
              <el-input
                placeholder="请输入内容"
                v-model="item.dictName"
                >
              </el-input>
              <el-checkbox v-model="checked1"></el-checkbox>
              <el-checkbox v-model="checked2"></el-checkbox>
              <!--<i class="el-icon-close"></i>-->
            </li>
          </ul>
        </div>
      </div>
    </template>
    <div slot="footer" class="dialog-footer" v-if="showBotton">
      <el-button type="primary" @click="submitForm('ruleForm')">{{addText}}</el-button>
      <el-button @click="editMe">{{editText}}</el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-if="remBotton">
      <el-button @click="closeMe">{{remText}}</el-button>
    </div>
  </PopFrame>
</template>
<script>
import PopFrame from '@/components/PopFrame/index'
import * as walletApi from '@/api/company/wallet'

export default {
  prop: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PopFrame
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss">

</style>

