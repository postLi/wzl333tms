<template>
  <div class="createOrder-page">
    <Main />
  </div>
</template>
<script>
import { getUserInfo } from "../../../../utils/auth";
import Main from './main'

export default {
  components: {
    Main
  },
  data () {
    return {
      userinfo: {}  
    }
  },
  mounted () {
    this.userinfo = getUserInfo()
  }
}
</script>
