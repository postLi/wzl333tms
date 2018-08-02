<template>
  <transition name="slide-right">
    <div class="progress-bar">
      <div ref="progress" class="progressItem" v-bind:style="{width:barwidth+'%'}" v-if="isShow">
      </div>
    </div>   
  </transition>
  <!-- <div class="progressContainer" v-if="isShow">        
    <div class="progressItem" v-bind:style="{width:barwidth+'%'}"></div>
  </div> -->
</template>

<script>
  export default {
    data() {
      return {
        isShow: true, // 是否显示进度条
        val: 0, // 进度,
        barwidth: 10
      }
    },
    props: {
      /**
       * 每10毫秒自增幅度
       */
      step: {
        type: Number,
        default: 5
      },
      /**
       * 初始值
       */
      initVal: {
        type: Number,
        default: 0
      },
      /**
       * 到一定进度停止
       */
      stopVal: {
        type: Number,
        default: 100
      },
      /**
       * 进度条继续到成功
       */
      isOk: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
       // 初始化后加载进度，加载到百分之多少由stopVal决定
      this.val = this.initVal
      const step = this.step
      const timer = setInterval(() => {
        this.val = this.val + step
        this.$refs.progress.style.width = this.val + '%'
        // 父组件数据加载完前进度条最多到stopVal的这个百分值
        if (this.val >= this.stopVal) {
          clearInterval(timer)
          return
        }
      }, 100)
    },
    watch: {
      /**
       * 监听组件props变化决定是否继续加载，一般在父组件数据加载完后改变此标志位
       */
      // isOk() {
      //   let val = this.val
      //   const step = this.step
      //   const timer = setInterval(() => {
      //     val = val - step
      //     this.$el.style.width = val + '%'
      //     // 加载到百分百完成
      //     if (val >= 100) {
      //       // 关闭定时器
      //       clearInterval(timer)
      //       // 加载完成关闭进度条
      //       this.isShow = false
      //       // 加载完成的回调
      //       this.$emit('callback', 'load success')
      //       return
      //     }
      //   }, 10)
      // }
    }
  }
</script>

<style lang="scss">
  .progress-bar {
    position:fixed;
    top:175px;
    height: 15px;
    width: 1318px;
    background-color: #999;
  }
  .progressItem{
    position: absolute;
    height: 15px;
    width: 30%;
    background-color: rgba(0, 203, 102, 1);
  }
  .fade {
    &-enter-active, &-leave-active {
      transition: all .9s;
    }
    &-enter, &-leave-active {
      opacity: 0;
      
    }
  }
  
</style>

