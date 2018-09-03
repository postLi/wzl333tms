<template>
  <div class="controlgoods-manager tab-wrapper">
    <div class="eltab clearfix">
      <router-link to="/operation/service/controlgoods/allGoods" class="tab-label" >全部</router-link>
      <router-link to="/operation/service/controlgoods/noGoods" class="tab-label" >未放货</router-link>
      <router-link to="/operation/service/controlgoods/haveGoods" class="tab-label" >已放货</router-link>
    </div>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
  
</template>

