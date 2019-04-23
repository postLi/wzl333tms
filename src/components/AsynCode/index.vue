<template>
  <div>
    <el-progress :percentage="percentage"></el-progress>
  </div>
</template>

<script>
import {
  asynInterface, // 异步正常测试接口
  asynInterface2, // 异步异常测试接口
  asynInterface3, // 异步进度不变接口
  asynResultByAsynCode // 实时查询异步进程
} from "@/api/asyncode"

export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      percentage: 80
    };
  },
  watch: {
    popVisible: {
      handler(cval, oval) {
        if (cval) {
          this.init();
        }
      },
      immediate: true
    }
  },
  compouted: {
    dialogVisible() {
      return this.popVisible;
    }
  },
  methods: {
    init() {},
    closeMe(done) {
      this.$emit("close");
      if (typeof done === "function") {
        done();
      }
    }
  }
};
</script>
