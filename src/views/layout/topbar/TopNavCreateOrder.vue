<template>
  <div v-has:ORDER_MADD class="createOrder" @click="openCreatePage"><icon-svg icon-class="jia" /> 创建运单</div>
</template>
<script>
import openWindow from '@/utils/openWindow'
export default {
  methods: {
    openCreatePage() {
      // 根据用户配置信息，决定是新开窗口打开还是在当前页面打开
      // 1.当前页面跳转
      // this.$router.push('/operation/order/createOrder')
      // 2.新开窗口查看
      // openWindow('/createOrder', '创建运单', 1200, 666)

      console.log('visitedViews', this.$store.state.tagsView.visitedViews)
      if (this.$store.state.tagsView.visitedViews) {
        const visitedViews = Object.assign([], this.$store.state.tagsView.visitedViews)
        let edits = 0 // 判断是否有改单页面
        let creates = 0 // 判断是否有创建运单页面
        visitedViews.forEach(el => {
          if (el.title.indexOf('改单') !== -1) {
            edits += 1
          } else if (el.title.indexOf('创建运单') !== -1) {
            creates += 1
          }
        })
        if (edits > 0 && creates < 1) { // 如果有改单页面并没有开单页面，就添加“创建运单”tab
          this.$router.push({ path: '/operation/order/createOrder', query: { tab: '创建运单' }})
          console.log('222222222')
        } else if (creates > 0) { // 如果有创建运单页面，就直接跳转到创建运单tab
          this.$router.push('/operation/order/createOrder?tab=创建运单')
          console.log('33333333333')
        } else {
          this.$router.push('/operation/order/createOrder?tab=创建运单')
          console.log('444444444')
        }
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "src/styles/variate.scss";

.createOrder{
  float: right;
  height: $topNavHeight;
  padding: 0 30px;
  text-align: center;
  line-height: $topNavHeight;
  font-size: $topNavFontSize;
  color: #fff;
  cursor: pointer;

  &:hover{
    background-color: rgba(0, 0, 0, .1);
  }
  .svg-icon{
    margin-right: 0px;
    font-size: 1.5em;
    vertical-align: middle;
    fill: #fff;
  }
}
</style>
