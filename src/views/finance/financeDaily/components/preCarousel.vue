<template>
  <div>
    <transition name="el-zoom-in-bottom">
      <el-carousel :interval="3000" type="card" height="300px">
        <el-carousel-item v-for="item in pictures" :key="item">
          <img :src="item" alt="" @click="prePic(item)">
        </el-carousel-item>
      </el-carousel>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    pictures: {
      type: Array,
      default: () => []
    },
    show: {
    	type: Boolean,
    	default: false
    }
  },
  data() {
    return {}
  },
  methods: {
  	prePic (value) {
      
    }
  }
}

</script>
