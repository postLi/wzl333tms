<template>
  <div class="load-intelligent">
    <div class="header-left">
      <el-tabs type="border-card" class="intelligent-card">
        <el-tab-pane label="方案一">

          <el-form :model="intelligentData" :rules="rules" ref="ruleForm" label-width="90px"
                   :inline="true" label-position="right" size="mini" class="intelligentForm_lrl" :key="valkey">
            <div class="load-intelligent-content">
              <div class="content-left">
                <el-form-item label="到达网点" prop="" class="orgidClass">
                  <el-input disabled></el-input>
                </el-form-item>
                <el-form-item label="分摊方式">
                  <selectType type="apportion_type"	clearable size="mini"></selectType>
                </el-form-item>
              </div>
              <div class="content-cent">
                <el-form-item label="车型">
                  <el-input></el-input>
                </el-form-item>
              </div>
              <div class="content-center">

              </div>
            </div>
          </el-form>

        </el-tab-pane>

      </el-tabs>
    </div>
    <div class="header-right">
      <el-button type="primary" @click="submitForm('ruleForm')" icon="el-icon-refresh" plain size="mini">计算配载</el-button>
      <el-button type="success" @click="submitForm('ruleForm')" icon="el-icon-document" plain size="mini">保存配载</el-button>
      <el-button type="danger" @click="" icon="el-icon-circle-close-outline" plain size="mini">取消</el-button>
      <!--<el-breadcrumb separator="|" class="intelligent-right">-->
      <!--<el-breadcrumb-item>保存配载</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>计算配载</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>取消</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    </div>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import SelectType from '@/components/selectType/index'

  export default {
    props:{
      model:{
        type:Array
      }
    },
    components: {
      SelectType
    },
    data() {
      return {
        intelligentData: [],
        valkey: '',
        rules: {}
      }
    },
    computed: {
      ...mapGetters([
        'otherinfo'
      ]),
      orgid() {

      }
    },
    mounted() {

      console.log(this.$route.query.sendDate)
    },
    methods: {}
  }
</script>

<style lang="scss">
  .load-intelligent {
    .header-left {
      .intelligent-card {
        .el-tabs__nav-scroll {
          background-color: rgb(252, 255, 245);
          .el-tabs__item {
            height: 60px;
            color: rgb(73, 154, 209);
          }

        }
        .intelligentForm_lrl{
          .load-intelligent-content{
            .content-left{
              display: inline-grid;
              border-top:2px solid rgb(184,203,213);
              border-right:1px solid rgb(232,233,234);
              border-bottom:1px solid rgb(232,233,234);
              border-left:1px solid rgb(232,233,234);
              padding: 10px;
              .orgidClass{
                .el-input__inner:first-of-type{
                  width: 110%;
                }
              }

            }
          }
        }
      }
    }
    .header-right {
      position: relative;
      top: -125px;
      right: -79%;
    }

  }
</style>
