<template>
  <div class="abnormal-manager tab-wrapper">
    <div class="eltab clearfix">
        <router-link to="/operation/service/abnormal/abReg" class="tab-label" >异常登记</router-link>
        <router-link to="/operation/service/abnormal/abDeal"  class="tab-label" >异常处理</router-link>
    </div>
    <keep-alive>
       <router-view></router-view>
    </keep-alive>
  </div>
  
</template>
