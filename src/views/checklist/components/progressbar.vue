<template>
  <div class="progressContainer">        
    <div class="progressItem" :class="{'showani':isani, 'cancelAni': cancelAni}"></div>
  </div>
</template>
<script>
export default {
  props: {
    isani: {
      type: Boolean,
      default: false
    },
    cancelAni: {
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
@keyframes showAni{
  0%{
    width: 0;
  }
  11%{
    width: 11%;
  }
  22%{
    width: 22%;
  }
  33%{
    width: 33%;
  }
  44%{
    width: 44%;
  }
 55%{
    width:55%;
  }
  66%{
    width: 66%;
  }
  77%{
    width: 77%;
  }
  88%{
    width: 88%;
  }
  100%{
    width: 100%;
  }
}
.progressContainer{
      position: relative;
      height: 8px;
      width: 100%;
      border-radius: 8px;
      background-color: rgba(0, 0, 102,1);
    }
    .progressItem{
      position: absolute;
      height: 8px;
      width: 100%;
      border-radius: 8px;
      background-color: rgba(0, 203, 102, 1);
      animation: showAni 1.2s ease  forwards;
      animation-play-state: paused;
      &.showani{
        animation-play-state: running;
      }
      &.cancelAni{
        animation-play-state: paused;
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
