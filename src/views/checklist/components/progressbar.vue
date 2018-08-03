<template>
  <div class="progressContainer">        
    <div class="progressItem" :class="{'showani':isani}"></div>
  </div>
</template>
<script>
export default {
  props: {
    isani: {
      type: Boolean,
      default: false
    }
  },
  components: {

  },
  computed: {

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
.progressContainer{
      position: relative;
      height: 15px;
      width: 100%;
      background-color: rgba(0, 0, 102,1);
    }
    .progressItem{
      position: absolute;
      height: 15px;
      width: 0%;
      background-color: rgba(0, 203, 102, 1);
      transition: all 10s ease;
      &.showani{
        width: 100%;
      }
    }

    .progressLabel{
      position: relative;
      top: 6px;
      display: block;
      width: 100%;
      color: #999999;
    }

    .progressLabel .left{

      position: absolute;
      left: 0px;
      top:10px;
    } 

    .progressLabel .right{

      position: absolute;
      right:0px;
      top:10px;
    } 

    .btn-area{
      margin-top: 30px;
    }
</style>
